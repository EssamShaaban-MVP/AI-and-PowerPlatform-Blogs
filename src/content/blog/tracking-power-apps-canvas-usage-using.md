---
title: "Tracking Power Apps Canvas Usage Using Power FX"
description: "Monitoring user activity in Power Apps canvas apps can provide valuable insights for improving app performance and user experience. By implementing a custom usage tracking…"
date: 2025-03-06
category: "Power Apps"
tags: ["Power Apps","Power Fx","Canvas Apps"]
readingMinutes: 6
cover: "/blog-images/tracking-power-apps-canvas-usage-using/01.webp"
---

## Introduction

Monitoring user activity in Power Apps canvas apps can provide valuable insights for improving app performance and user experience. By implementing a custom usage tracking solution, you can capture details about who is using the app, on what device, and in which environment. This data helps in troubleshooting issues and making data-driven decisions to enhance the app over time.

### Why Track Usage?

- **Understand user behavior:** Knowing who uses your app and their device type can help you identify usage patterns and user needs​. For example, you might discover most users are on mobile, influencing your design decisions.
- **Improve performance:** If you log device types, you can detect if certain devices or form factors correlate with performance issues. This allows you to optimize the app for those scenarios.
- **Make data-driven decisions:** Usage data (e.g. frequency of launches, device breakdown) can guide feature improvements and prioritization.
- **Maintain long-term logs:** The built-in Power Apps analytics only retain data for a short period (about 28 days)​. Custom logging to your own data source (like SharePoint) lets you keep historical usage records beyond this limit for long-term analysis.

### How It Works

On app start, a Power FX formula writes an entry to a SharePoint list using the `Patch` function. The entry includes key details about the session:

- **User Email:** Captured via `User().Email` (which returns the current user's email/UPN​).
- **Device Type:** Determined by checking the operating system and screen width. If the app detects iOS or Android, it classifies the device as **Mobile** or **Tablet** based on screen size, otherwise it labels it as **PC**. This uses the `Host.OSType` property (which can return values like "iOS", "Android", "Windows", etc.​) combined with the app's width.
- **App Environment:** A label (e.g. Development, UAT, Production) to identify which environment the app is running in.
- **App Name:** The name of the app for which usage is being tracked.

The `Patch` function creates a new record in the SharePoint list every time the app starts​.

The `IfError` is used to handle any errors during this logging process and provide feedback via notifications.

### Step 1: Create a SharePoint List

1. In SharePoint, create a custom list called **PowerAppsUsageTracking** (or a name of your choice).
2. Add the following columns to the list:
    - **Title** (Single line of text): will store the user’s email. (You can use the default Title column for this purpose.)
    - **AppName** (Single line of text): to store the name of the Power App.
    - **EnvironmentType** (Single line of text): to indicate the environment (e.g. Development, UAT, Production).
    - **Device** (Single line of text): to store the device type (e.g. Mobile, Tablet, PC).

![Figure 1: Step 1: Create a SharePoint List](/blog-images/tracking-power-apps-canvas-usage-using/01.webp)

### Step 2: Add the SharePoint List to Your App

- Open your canvas app in Power Apps studio and go to the **Data** pane.
- Select **\+ Add data** and add a connection to SharePoint.
- Choose your `PowerAppsUsageTracking` list from the SharePoint site where you created it. This will add the list as a data source for your app.

![Figure 2: Step 2: Add the SharePoint List to Your App](/blog-images/tracking-power-apps-canvas-usage-using/02.webp)

### Step 3: Add Power FX Code to the App's OnStart Property

Use the app’s **OnStart** property to log usage each time the app is launched. Select the App object in the Tree View, find the **OnStart** property, and insert the following formula:

![Figure 3: Step 3: Add Power FX Code to the App's OnStart Property](/blog-images/tracking-power-apps-canvas-usage-using/03.webp)

#### powerfx

IfError(
    Patch(
        PowerAppsUsageTracking, // SharePoint List Name
        Defaults(PowerAppsUsageTracking),
        {
            Title: User().Email, // Logs the user's email
            AppName: "IT Expert", // Replace with your app's name
            EnvironmentType: "Production", // Set environment (e.g. Development/UAT/Production)
            Device: Switch(
                Lower(Host.OSType),
                "ios", If(App.Width >= 600, "Tablet", "Mobile"),
                "android", If(App.Width >= 600, "Tablet", "Mobile"),
                "PC" // Default for other OS types (treated as PC)
            )
        }
    ),
    Notify("Usage data logged successfully!", NotificationType.Success),
    Notify("Failed to log usage data", NotificationType.Error)
);

**What this code does:** On app start, it attempts to create a new record in the SharePoint list `PowerAppsUsageTracking` with the current user's email, the app name, the environment, and the device type. If the patch succeeds, a success notification is shown; if it fails, an error notification is shown.

### Code Breakdown

- `User().Email`: Returns the current user’s email address (User Principal Name)​. This is stored in the Title column as the identifier of who opened the app.
- `AppName`: A hard-coded string for the app’s name. *(Tip: replace `"IT Expert"` with your actual app name.)*
- `EnvironmentType`: A string indicating the environment (e.g. "Development", "UAT", "Production"). This can be manually set or driven by an environment variable if the app is part of a solution, so you don't have to change it for each environment.
- `Device`: This uses a `Switch` on `Lower(Host.OSType)` to determine the device category. If the OS is iOS or Android, it further checks `App.Width` to decide between "Tablet" (width ≥ 600) or "Mobile". For any other OS (Windows, Mac, etc.), it defaults to "PC". The `Host.OSType` property provides the name of the operating system (common values include "iOS", "Android", "Windows", etc.​).
- `Defaults(PowerAppsUsageTracking)`: This generates a base record for the SharePoint list so that `Patch` knows to create a new item in that data source.
- `IfError(...)`: Wraps the Patch call to catch any errors. On success, it triggers a green notification confirming the log (“Usage data logged successfully!”). On failure, it triggers a red notification (“Failed to log usage data”).

### Best Practices

- Use environment variables for environment type: Instead of hard-coding the environment name, consider using an environment variable (if your app is in a solution). This way, the app can automatically detect whether it's in Dev, UAT, or Prod and set EnvironmentType accordingly.
- Privacy compliance: Be mindful of your organization’s privacy and data retention policies. You are logging user identifiers (emails) and device info. Ensure this practice aligns with any user privacy guidelines and include disclaimers if necessary.
- Avoid redundant logging: If the app can be restarted or reloaded frequently (for example, if users tend to reopen it multiple times in a short span), you might end up with multiple log entries for the same user in a short period. To prevent spamming the list, you could implement a check (e.g. only log once per user per day, or use a flag in a variable that clears after some duration). This keeps the log data meaningful and easier to analyze.

### Conclusion

Implementing usage tracking with Power FX is a straightforward yet effective way to gain insights into how your Power Apps are used. By patching data to a SharePoint list on app start, you create a custom analytics trail that persists beyond the default 28-day window of Power Apps analytics​.

This approach can help you monitor adoption, troubleshoot issues (e.g. if only a specific device type encounters problems), and continually improve your app based on real usage data. With a few steps to set up the SharePoint list and Power FX code, you can enhance your canvas app with valuable usage logging that supports long-term analysis and optimization.
