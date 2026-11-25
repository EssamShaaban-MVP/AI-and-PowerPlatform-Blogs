---
title: "Export and email a Power BI report with Power Automate"
description: "With Power Automate, you can automate exporting and distributing Power BI reports in different formats and scenarios. In this article, you create your own flow from scratch.…"
date: 2024-01-20
category: "Power BI"
tags: ["Power BI","Power Automate"]
readingMinutes: 3
cover: "/blog-images/export-and-email-power-bi-report-with/01.webp"
---

With Power Automate, you can automate exporting and distributing Power BI reports in different formats and scenarios. In this article, you create your own flow from scratch. Use the Export to File for Power BI Reports action to automatically distribute a Power BI report via email.

![Figure 1: Export and email a Power BI report with Power Automate](/blog-images/export-and-email-power-bi-report-with/01.webp)

Power Automate is a no-code way to interact with the Export To File API in the user interface. See [Export to File for Power BI Reports](https://learn.microsoft.com/en-us/connectors/powerbi/#export-to-file-for-power-bi-reports) to start interacting with the API directly.

## Create a flow from scratch

In this task, you create a simple flow from scratch. The flow exports a Power BI report as a PDF, and attaches it to an email that is sent on a weekly basis.

1. Sign in to [Power Automate](https://powerautomate.microsoft.com/).
2. Select Create > Scheduled cloud flow.

![Figure 2: Create a flow from scratch](/blog-images/export-and-email-power-bi-report-with/02.webp)

3\. In Build a scheduled flow, give your flow a name.

 4\. In Run this flow, select the starting date and time for your flow and the repetition frequency.

 5\. In On these days, select which days you want your flow to run, and select Create.

![Figure 3: Create a flow from scratch](/blog-images/export-and-email-power-bi-report-with/03.webp)

6. In Recurrence, select Edit > Show advanced options. Enter a value in At these hours and At these minutes to set a specific time for your flow to run.

![Figure 4: Create a flow from scratch](/blog-images/export-and-email-power-bi-report-with/04.webp)

7. Select New Step.
8. In Choose an operation, search for Power BI and select Export To File for Power BI Reports.

![Figure 5: Create a flow from scratch](/blog-images/export-and-email-power-bi-report-with/05.webp)

9. In Export to File for Power BI Reports, select a Workspace and Report from the dropdowns.
10. Select the desired Export Format for your Power BI report.

![Figure 6: Create a flow from scratch](/blog-images/export-and-email-power-bi-report-with/06.webp)

11. Optionally, indicate specific pages to export in the Pages pageName -1 field. The page name parameter is different from the display page name. To find the page name, navigate to the page in the Power BI service, and copy the last portion of the URL as shown in the example.

https://app.powerbi.com/groups/workspaceGuid/reports/reportGuid/xxxxxxxxxx

12. Optionally, indicate a specific bookmark to display in the Bookmark Name field. You can find the bookmark name in the report URL after bookmarkGuid=, as shown in the example. Only *report* bookmarks are supported, not *personal* bookmarks. You can specify other parameters for the Power BI report. Find detailed descriptions of these parameters in the [Export to File for Power BI Reports](https://learn.microsoft.com/en-us/connectors/powerbi/#export-to-file-for-power-bi-reports).

https://app.powerbi.com/groups/workspaceGuid/reports/reportGuid/ReportSection?bookmarkGuid=xxxxxxxxxx

13. Select New Step.
14. In Choose an operation, search for Outlook and select Send an email (V2).
15. In Send an email (V2), complete the To, Subject, and Body fields for your email.
16. Select Show advanced options. In Attachments Name – 1, enter a name for your attachment. Add a file extension to the file name (for example, .PDF) that matches your desired Export Format.
17. In Attachment Content, select File Content to attach your exported Power BI report.

![Figure 7: Create a flow from scratch](/blog-images/export-and-email-power-bi-report-with/07.webp)

18. When you're done, select Next step or Save. Power Automate creates and evaluates the flow, and lets you know if it finds errors.
19. If there are errors, select Edit flow to fix them. Otherwise, select the Back arrow to view the flow details and run the new flow. When you run the flow, Power Automate exports a Power BI report in the specified format and sends it as an email attachment as scheduled.

## Row-level security in Power Automate

Optionally, if you want to send the report based on row-level security (RLS), you need to add the following details:

![Figure 8: Row-level security in Power Automate](/blog-images/export-and-email-power-bi-report-with/08.webp)

- Identities Username - 1 = The effective username reflected by a token for applying RLS rules. For an on-premises model, username can be composed of alpha-numerical characters, or any of the following characters: `'.', '-', '_', '!', '#', '^', '~', '\', and '@'`. For cloud models, username can be composed of all ASCII characters. Also, username can be up to 256 characters, and can't contain spaces.
- Identities Semantic model - 1 = You can get this value by going to the settings of the semantic model, and then copying the semantic model ID from the address bar, as shown in this example and in the following image:

    `https://app.powerbi.com/groups/me/settings/datasets/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

![Figure 9: Row-level security in Power Automate](/blog-images/export-and-email-power-bi-report-with/09.webp)

- Identities Roles Item - 1 = RLS name defined in the report
