---
title: "Converting Email Files in a SharePoint Library to PDF (Including Attachments)"
description: "In one of our recent projects, we faced a challenging requirement: converting around 17,000 email files stored in a SharePoint document library into PDFs. The complexity was…"
date: 2025-08-08
category: "Power Automate"
tags: ["Power Automate","SharePoint","PDF"]
readingMinutes: 4
cover: "/blog-images/converting-email-files-in-sharepoint/01.webp"
---

In one of our recent projects, we faced a challenging requirement: converting **around 17,000 email files** stored in a SharePoint document library into PDFs.
The complexity was not only the volume, but also the structure. The files were distributed across **over 9,000 nested folders**.

The business requirement was very clear:

- Convert each email file (.msg) to PDF
- Include **all attachments** in the PDF
- Ensure **images** embedded in the email body and attached files remain visible in the converted PDF
- Save the converted PDF **in the same folder path**
- Keep the **same file name**

### A few important notes upfront

- The Encodian connector is **Premium** and **paid**
- Email conversion consumes **1 token per email**
- Each attachment also consumes **1 token**
- For this project, I purchased **25,000 tokens**, which was sufficient for the volume and attachments involved

The entire solution was implemented in **about 3 hours**, and the flow successfully converted all files without a single failure. It was a very solid and predictable outcome.

### Solution Overview

The solution is implemented using a **Power Automate cloud flow** that:

1. Reads email files from SharePoint (including nested folders)
2. Converts them to PDF using Encodian
3. Writes the PDF back to the same folder path

### Step-by-Step Implementation

### 1. Create the Flow

Start by creating a new cloud flow.

- Use a **Manual trigger.**

![Figure 1: 1. Create the Flow](/blog-images/converting-email-files-in-sharepoint/02.webp)

### 2. Get Email Files from SharePoint

Add **Get files (properties only)**.

Configure it as follows:

- **Site Address**: Your SharePoint site
- **Library Name**: The document library containing the emails
- **Include Nested Items**: Yes

If your emails are stored in nested folders, use a **Filter Query** to:

- Target specific folder paths
- Retrieve only .msg files

Example filter query:

(startswith(FileDirRef, '/sites/My\_SharePoint\_Site/Shared Documents/Emails/Subfolder1/2020/Sub')

or

startswith(FileDirRef, '/sites/My\_SharePoint\_Site/Shared Documents/Emails/Subfolder1/2020/Sub1'))

and substringof('.msg', FileLeafRef)

This ensures the flow only processes email files from the intended folders Sub & Sub1.

![Figure 2: 2. Get Email Files from SharePoint](/blog-images/converting-email-files-in-sharepoint/03.webp)

### 3. Loop Through the Files

Add an **Apply to each** action.

- Use the **value** output from **Get files (properties only)**

This loop will handle each email file individually.

![Figure 3: 3. Loop Through the Files](/blog-images/converting-email-files-in-sharepoint/04.webp)

### 4. Get File Content

Inside the loop, add **Get file content**.

- **Site Address**: Same SharePoint site
- **File Identifier**: Identifier from *Get files (properties only)*

This action retrieves the binary content of the email file.

![Figure 4: 4. Get File Content](/blog-images/converting-email-files-in-sharepoint/05.webp)

### 5. Get File Metadata

Add **Get file metadata** (still inside the loop).

- **Site Address**: Same SharePoint site
- **File Identifier**: Identifier from *Get files (properties only)*

This is required to retrieve the **original folder path**, which allows us to save the PDF in the same location.

![Figure 5: 5. Get File Metadata](/blog-images/converting-email-files-in-sharepoint/06.webp)

### 6. Convert Email to PDF Using Encodian

Add the **Encodian – Convert Email** action.

![Figure 6: 6. Convert Email to PDF Using Encodian](/blog-images/converting-email-files-in-sharepoint/07.webp)

### Creating the Encodian Connection (First Time Only)

If this is your first time using Encodian:

- Provide a connection name
- Paste your **API Key** from the Encodian portal
- Select the nearest region for best performance

![Figure 7: Creating the Encodian Connection (First Time Only)](/blog-images/converting-email-files-in-sharepoint/08.webp)

You can retrieve the API key directly from your Encodian profile.

![Figure 8: Creating the Encodian Connection (First Time Only)](/blog-images/converting-email-files-in-sharepoint/09.webp)

### Configure the Convert Email Action

- **File Name**: File name with extension (from Get files)
- **File Content**: Output of Get file content
- **Merge Attachments**: Yes

This ensures the email body and all attachments are merged into a single PDF.

![Figure 9: Configure the Convert Email Action](/blog-images/converting-email-files-in-sharepoint/10.webp)

### 7. Create the PDF File in SharePoint

Finally, add **Create file**.

- **Site Address**: Same SharePoint site
- **Folder Path**: Folder path from Get file metadata
- **File Name**: Output file name from Encodian (PDF)
- **File Content**: Output file content from Encodian

This saves the PDF back into the **same folder** as the original email.

![Figure 10: 7. Create the PDF File in SharePoint](/blog-images/converting-email-files-in-sharepoint/11.webp)

## Final Result

At this point, your flow should be ready to run.

- All emails will be converted to PDF
- Attachments will be merged correctly
- Folder structure is preserved
- The process is stable, fast, and scalable

## This is the complete flow with all action.

![Figure 11: This is the complete flow with all action.](/blog-images/converting-email-files-in-sharepoint/12.webp)

## Subfolder after the flow run completed

![Figure 12: Subfolder after the flow run completed](/blog-images/converting-email-files-in-sharepoint/13.webp)

## Recommendations and Best Practices

1. **Name your actions clearly**
    Use meaningful action names and add notes where possible. This makes maintenance much easier for others.

2. **Process in batches**
    If you have multiple top-level folders, consider running the flow separately for each folder to reduce risk and simplify troubleshooting.

3. **Monitor token consumption**
    Regularly check usage in the Encodian portal to ensure you have enough tokens, especially when attachments are involved.

This approach proved to be reliable, scalable, and significantly easier to maintain than RPA for large-scale email conversion scenarios. If you are dealing with high-volume email archives in SharePoint, this pattern is well worth considering.
