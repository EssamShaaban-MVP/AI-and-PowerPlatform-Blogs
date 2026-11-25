---
title: "Changing Power Apps Owner using Power Automate"
description: "Change the owner of a Power App with Power Automate and the Power Apps for Admins connector: a simplified step-by-step guide."
date: 2025-03-31
category: "Power Automate"
tags: ["Power Automate","Power Apps","Administration"]
readingMinutes: 2
cover: "/blog-images/changing-power-apps-owner-using-power/01.webp"
---

How to Change the Owner of a Microsoft Power App Using Power Automate

Changing the owner of a Microsoft Power App is important for maintaining access control, managing permissions, and ensuring smooth collaboration. Using Power Automate, you can automate this process easily. Here is a simplified step-by-step guide:

## Create a New Flow in Power Automate

- Navigate to Power Automate and select **Create**.
- Choose **Instant Cloud Flow**.
- Name your Flow clearly (e.g., **"Set App Owner"**) and select **Manually trigger a flow**.
- Click **New Step** and search for the **"Power Apps for Admins"** connector.
- Select the action **"Set App Owner"**.

    ![Figure 1: Create a New Flow in Power Automate](/blog-images/changing-power-apps-owner-using-power/02.webp)

## Configure the Action

- Enter the following information:
    - **Environment Name**: The Environment ID where your app exists. You can get the Environment ID from the PA URL by getting the ID after the https://make.powerautomate.com/environments/id/flows/...... or you can get it from the admin center.
    - **Power App Name**: The ID of the Power App you wish to change ownership. Got to all apps and select the three dots next to your app and check the app details to get the App ID.

        ![Figure 2: Configure the Action](/blog-images/changing-power-apps-owner-using-power/03.webp)

- **New Owner**: Enter the Email ID of the new owner. You can get the Email ID from Microsoft Entra Admin Center.

![Figure 3: Configure the Action](/blog-images/changing-power-apps-owner-using-power/04.webp)

- You can also get the Email ID via Power Apps using the following Power FX

    ![Figure 4: Configure the Action](/blog-images/changing-power-apps-owner-using-power/05.webp)

## Save and Test Your Flow

- Save and run your Flow manually to ensure it executes successfully.

![Figure 5: Save and Test Your Flow](/blog-images/changing-power-apps-owner-using-power/06.webp)

- Verify the ownership change by checking your Power Apps environment.

![Figure 6: Save and Test Your Flow](/blog-images/changing-power-apps-owner-using-power/07.webp)

## Conclusion

Using Power Automate to change the owner of a Power App is straightforward, saving you time and helping maintain your apps efficiently. Automating ownership management ensures better governance and smoother collaboration within your organization. You can also use Power shell and other methods to do that, but I wanted to cover how you can do that using Power Automate with a one action flow.
