---
title: "Best practices to optimize your Power Apps development"
description: "Are you ready to take your Power Apps to the next level? As a passionate developer, I’m excited to share some proven strategies that will enhance your app-building journey.…"
date: 2024-02-12
category: "Power Apps"
tags: ["Power Apps","Best Practices","Performance"]
readingMinutes: 15
cover: "/blog-images/best-practices-to-optimize-your-power/01.webp"
---

**Are you ready to take your Power Apps to the next level? As a passionate developer, I’m excited to share some proven strategies that will enhance your app-building journey. Let’s dive in! **

Before diving into development, invest time in thoughtful planning. Understand your app’s purpose, user needs, and data requirements. A well-structured plan sets the foundation for success.

#### 1. Enable Loading Spinner for Galleries

- Loading spinners indicates that content is still being loaded, reducing confusion or the likelihood of users leaving the page.
- In the Gallery panel, under the Advanced tab, change `LoadingSpinner.None` to `LoadingSpinner.Controls` or `LoadingSpinner.Data` based on your needs.

![Figure 1: 1. Enable Loading Spinner for Galleries](/blog-images/best-practices-to-optimize-your-power/02.webp)

#### 2. Insert Images as HTML Text

- If your app uses more than 20 images, insert them as HTML text instead of uploading them through the Media panel.
- This minimizes load time. For example, using an HTML tag results in faster loading compared to uploading images through the Media panel.

![Figure 2: 2. Insert Images as HTML Text](/blog-images/best-practices-to-optimize-your-power/03.webp)

#### 3. Create Reusable Components

- To save time and maintain consistent design, create components for frequently used elements like headers and footers.
- Components allow you to easily reuse elements across screens or apps without recreating them.

![Figure 3: 3. Create Reusable Components](/blog-images/best-practices-to-optimize-your-power/04.webp)

#### 4. Use Concurrent Function for Nonsequential Formulas

- When you have multiple formulas executing in no particular sequence, evaluate them using the Concurrent function.
- Concurrent evaluation speeds up data loading in your app.

```
Concurrent(
    ClearCollect( Product, '[SalesLT].[Product]' ),
    ClearCollect( Customer, '[SalesLT].[Customer]' ),
    ClearCollect( SalesOrderDetail, '[SalesLT].[SalesOrderDetail]' ),
    ClearCollect( SalesOrderHeader, '[SalesLT].[SalesOrderHeader]' )
)
```

#### 5. Prioritize Delegable Calls

- Some functions in Power Apps are delegable (evaluated on the server with better performance), while others are non-delegable (evaluated locally).
- Opt for delegable calls whenever possible to improve efficiency.

In Power Apps, delegation plays a crucial role in optimizing app performance by minimizing data transfer between the app and data sources. Some functions can be delegated to the data source for efficient processing, while others cannot. Let’s focus on the non-delegable Power FX functions:

1. **FirstN**: Retrieves the first N records from a data source. It cannot be delegated, so use it cautiously with large datasets.
2. **Last**: Fetches the last record from a data source. Like FirstN, it’s non-delegable.
3. **LastN**: Similar to Last, but retrieves N records from the end of the dataset.
4. **Choices**: Used for dropdowns or combo boxes. Unfortunately, it’s non-delegable.
5. **Concat**: Combines text values. Remember that it won’t be delegated.
6. **Collect** and **ClearCollect**: These functions are essential for creating collections, but they’re non-delegable.
7. **GroupBy** and **Ungroup**: Useful for aggregating data, but they won’t be delegated.

Remember that non-delegable functions are processed locally within the app. If your data source exceeds 500 records and a function can’t be delegated, Power Apps won’t retrieve all the data, potentially leading to incorrect results. Keep an eye on delegation warnings to manage your app effectively.

For more details, you can explore the [official documentation on delegation](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/delegation-overview).

#### 6. Handle Errors with IfError

- Use the IfError function to test values for errors. It replaces errors with valid values, allowing downstream calculations to continue without delay.
- Enable IfError in Settings > Upcoming features > Experimental.

IfError( Patch( DS1, ... ), Notify( "problem in the first action" ), Patch( DS2, ... ), Notify( "problem in the second action" ) )

#### 7. Store Data in Collections

- To avoid repeated calls to data sources, store data in a collection or cache lookup table data using the Set function.
- Use the cached data throughout your app.

### Creating a Collection

- You can create a collection using the `ClearCollect` function. For example:

`ClearCollect(MyCollection, DataSource);`

- Replace `MyCollection` with your desired collection name and `DataSource` with the data you want to store.
- You can also create an empty collection using `ClearCollect(MyEmptyCollection, {})`.

### Adding Data to a Collection

- Use the `Collect` function to add records to an existing collection:

`Collect(MyCollection, { ID: 1, Name: "John" });`

- This adds a record with an ID of 1 and a Name of “John” to `MyCollection`.
- You can collect data from different sources, filter it, and transform it before adding it to the collection.

### Avoiding Duplicate Values

- To prevent duplicates, use the `LookUp` function to check if a value already exists in the collection.
- For example, if you’re adding a new item to a collection, you can do this:

`If(IsBlank(LookUp(MyCollection, ID = NewItem.ID)), Collect(MyCollection, NewItem));`

- This checks if the `ID` of `NewItem` already exists in `MyCollection`. If not, it adds `NewItem` to the collection.

### Using Collections as Cache

- You can cache lookup table data in a collection to avoid repeated calls to external data sources.
- Load the lookup table data into a collection when the app starts (e.g., in the `OnStart` property of the app).
- Use this cached collection for lookups, dropdowns, and other scenarios where you’d otherwise query the data source repeatedly.

### Saving Collections Locally

- If you want to save a collection locally (e.g., for offline use), consider using the `SaveData` and `LoadData` functions.
- These functions allow you to serialize the collection data and store it on the device.
- For example:

`SaveData(MyCollection, "MyLocalData");`

- This saves `MyCollection` locally with the name “MyLocalData.”
- When the app loads next time, you can load this data using `LoadData`.

Remember, collections are a versatile tool in Power Apps, allowing you to work with data efficiently and improve app performance!

#### 8. Share Information Between Screens with Global Variables or Collections

- Avoid control dependencies by using global variables or collections to share information between screens.
- For example, store a value in a global variable and use it across screens.

**Global Variables**:

- Global variables are accessible across all screens within your app.
- You can create a global variable using the `Set` function. For example:

`Set(GlobalVar, "Hello, world!");`

To use this variable on another screen, simply reference it:

            Label1.Text = GlobalVar;

Remember that global variables consume app resources, so use them judiciously. If you only need a variable on one screen, consider other options.

**Collections**:

- Collections are in-memory data stores that allow you to store and manipulate data locally.
- They’re particularly useful for caching data or avoiding repeated calls to external data sources.
- Here’s how you can use collections to share information between screens:
- Create a collection using `ClearCollect`:

`ClearCollect(MyCollection, DataSource);`

- Add records to the collection:

`Collect(MyCollection, { ID: 1, Name: "John" });`

- Reference the collection on other screens:

`Label2.Text = LookUp(MyCollection, ID = 1).Name;`

Collections are efficient for scenarios where you want to work with data offline or minimize external calls.

**Context Variables**:

- Context variables are specific to a screen and its context.
- You can create context variables using the `UpdateContext` function:

`UpdateContext({ ContextVar: "Hello from Screen1!" });`

- Use them within the same screen:

`Label3.Text = ContextVar;`

#### 9. Optimize App OnStart Function

- Remove unused variables and media from the OnStart function.
- Streamline initialization processes for better performance.

In Power Apps, optimizing the `OnStart` function is crucial for improving app performance during startup. Let’s explore some best practices:

1. Reduce Code in `OnStart`:
    - The more code you have in the app’s `OnStart` property, the longer the app will take to start.
    - **Initialize global variables** in the `OnVisible` property of the app’s first screen instead.
    - If possible, defer setting variables until the screen where they are needed.
2. Avoid Unnecessary Refreshes:
    - Remove unnecessary `Refresh` calls from the `OnStart`.
    - Refreshing data sources during app initialization can slow down the startup process.
    - Only refresh data sources if they are not already part of the app initialization.
3. Use Named Formulas:
    - Replace variable and collection initialization in `App.OnStart` with **named formulas** in `App.Formulas`.
    - This helps reduce loading time for both Power Apps Studio and your app.
    - Named formulas allow you to organize and reuse complex expressions efficiently.
4. Consider Concurrent Execution:
    - When there is no dependency between parts of a formula, use the `Concurrent` function.
    - It allows multiple actions to run simultaneously, potentially improving performance.
    - For example, you can collect data from different sources concurrently.

Here’s an example of optimizing your existing code snippet:

```powerapps
// Power Apps collections are limited to a size of 2,000 records
Concurrent(
    ClearCollect(ANPR_MAIN, Sort('ANPR - LiveFeeds', 'Captured On DTTM', SortOrder.Descending)),
    ClearCollect(DISTINCT_CAR_PLATES, RenameColumns(Distinct('ANPR - LiveFeeds', crbd6_carplate), "Value", "Result")),
    ClearCollect(ANPR_LOOKUP, 'ANPR - Vehicle Registration Plate Mappings')
);

Concurrent(
    ClearCollect(DISTINCT_DRIVER_NAME, RenameColumns(Distinct(ANPR_LOOKUP, Full_Name_or_Service), "Value", "Result")),
    ClearCollect(
        ANPR_joined_dataset,
        AddColumns(
            ANPR_MAIN,
            "Full_Name_or_Service",
            LookUp(
                ANPR_LOOKUP,
                crbd6_carplate = ANPR_LOOKUP[@crbd6_car_plate_no_no_spaces],
                Full_Name_or_Service
            )
        )
    )
);
```

Remember to adapt these optimizations based on your specific app requirements.

#### 10. Generate PDFs of Screens or Galleries

- Use Power Apps to create PDFs of screens, galleries, or containers.
- This feature can be valuable for generating reports or capturing specific app views.

In Power Apps, you can now generate PDF documents from screens, galleries, and containers using the experimental PDF function. This feature allows you to create PDF files directly within your app. Let’s explore how to use it:

1. Enable the PDF Function:
    - First, you need to turn on the PDF function in your app settings. Here’s how:
        - Sign in to Power Apps and create a canvas app or open an existing one.
        - In Power Apps Studio, go to the command bar and select **Settings**.
        - Choose **Upcoming features** and enable the **PDF function** (which is disabled by default).
2. Generate a PDF File:
    - You can use the PDF function in various properties (e.g., `OnSelect`, `OnVisible`, or `OnHidden`) to create a PDF file.
    - For example, let’s say you have a button. In its `OnSelect` property, use the following formula:```powerapps
        PDF(SubmitInspectionScreen);
        ```
        -   Replace `SubmitInspectionScreen` with the name of the screen you want to generate the PDF from.
        -   The PDF file will be stored in memory for future use.
3.  View the PDF:
    -   To view the generated PDF, use a **PDF viewer control** in your app.
    -   Set the `Document` property of the PDF viewer control to the variable where you stored the PDF:```powerapps
        Set(myPDF, PDF(SubmitInspectionScreen));
        ```

4. Additional Tips:
- The PDF function can only target the currently visible screen.
- You can pass the entire screen or specify a container or gallery to limit the content.
- Use this feature to create invoices, reports, or any other printable documents directly within your app.

![Figure 4: 10. Generate PDFs of Screens or Galleries](/blog-images/best-practices-to-optimize-your-power/05.webp)

Remember that this feature is experimental, so it’s not meant for production use. However, it provides an exciting way to enhance your app’s functionality!

#### 11. Limit the Number of Controls and Data Connections

Limiting the number of controls and data connections in your Power Apps is crucial for performance, maintainability, and user experience. Let’s explore why it’s important and how to approach it:

1. Performance Optimization:
    - **Fewer Controls**: Having too many controls (such as buttons, labels, galleries, etc.) on a single screen can slow down app loading and responsiveness.
    - **Control Generation Time**: Power Apps generates an HTML document object model (DOM) for each control. The more controls you add, the longer it takes to generate the DOM.
    - **Delayed Loading**: If you exceed a certain number of controls (around 500), consider enabling **delayed loading** for non-visible controls. This way, only visible controls load initially, improving startup performance.
2. Data Connections:
    - **Connector Limit**: There is no strict limit on the number of connectors or data sources you can add to an app. However, for performance reasons, avoid connecting to more than 30 data sources from the same app.
3. Balancing Act:
    - While limiting controls is important, ensure a balance. Too few controls can lead to cluttered screens or complex formulas.
    - Prioritize essential controls and data connections while keeping the app manageable.

Remember that optimizing controls and data connections contributes to a smoother user experience and efficient app performance.

## 12. Use themes

**

![Figure 5: 12. Use themes](/blog-images/best-practices-to-optimize-your-power/06.webp)

**

Themes play a crucial role in enhancing the aesthetics and user experience of your Power Apps. Let’s delve into why they are important and how to use them effectively:

1. What Are Themes?
    - **Themes** in Power Apps are predefined sets of styles that impact the user interface (UI).
    - They modify various style elements, including color, typography, borders, and shadows.
    - Modern themes adhere to Microsoft’s Fluent design language, ensuring a consistent and visually appealing look.
2. Importance of Themes:
    - **Consistency**: Themes help maintain a consistent visual style across your app. When users navigate different screens, a unified look enhances usability.
    - **Branding**: Custom themes allow you to reinforce your organization’s identity. By aligning colors and styles with your brand, you create a cohesive experience.
    - **Engagement**: Well-designed apps are more engaging. Themes contribute to the overall aesthetics, making your app enjoyable to use.
    - **Adaptability**: Themes make your app adaptable to changes. If you need to rebrand or adjust colors, updating the theme ensures consistency.
3. Using Modern Themes:
    - Modern themes simplify customization:
        - Enable modern controls and themes in your app settings.
        - Select one of the six default modern themes (e.g., Light, Dark, Steel) from the Themes pane.
        - The selected theme automatically applies to all modern controls in your app.
    - Note that classic themes are not available when modern controls and themes are enabled.
4. Referencing Themes in Power Fx:
    - Each theme object includes:
        - **Name**: The theme’s identifier.
        - **Colors**: A collection of 16 colors representing the brand ramp for the theme.
    - Reference the currently active theme using `App.Theme`.
    - Manually style classic controls based on the current theme (e.g., `Button.Fill = App.Theme.Colors.Primary`).

In summary, themes enhance your app’s aesthetics, maintain consistency, and contribute to a delightful user experience.

#### 13. Document Your App

- Documenting your Power Apps is essential for maintaining clarity, facilitating collaboration, and ensuring smooth development. Here are some approaches and tools to help you document your Power Apps effectively:
    1. Enhanced Code Review:
        - Conduct a walkthrough of your app’s code, highlighting complex functions and critical components.
        - Consider recording a video session (via Skype or other platforms) where stakeholders can ask questions.
        - Cover key areas like the `OnStart` function, `OnVisible` properties of screens, and critical button actions.
    2. Hierarchical Documentation:
        - Create a hierarchical format for documenting Power Apps controls.
        - Include details such as control properties, associated code, and any special notes or explanations.
        - This format is easier to maintain than video walkthroughs.
    3. Super Hacker Method:
        - Download all the source code for your Power App using Flow.
        - Consider automating this process and storing the code in a version control system like GitHub.
        - This method provides a comprehensive view of controls, code, and configuration details.
    4. PowerDocu (Open-Source Tool):
        - **PowerDocu** is a free open-source tool designed specifically for documenting canvas apps and flows.
        - It automatically generates technical documentation, making it easier for you to describe your app’s components and relationships.
    5. Microsoft Learn Module:
        - Explore the **Document and Test Your Power Apps Application** module on Microsoft Learn.
        - [Learn best practices for testing and documenting your Power Apps application](https://learn.microsoft.com/en-us/training/modules/document-test-powerapps-app/).

    Remember to tailor your documentation approach based on your app’s complexity, team collaboration, and maintenance requirements. Happy documenting!

#### 14. Design for Mobile Responsiveness

![Figure 6: 14. Design for Mobile Responsiveness](/blog-images/best-practices-to-optimize-your-power/07.webp)

- Designing for mobile responsiveness in Power Apps ensures that your app looks and functions well across different devices and screen sizes. Let’s explore how to achieve this:
    1. Disable Scale to Fit:
        - By default, Power Apps scales your app to fit the screen where it’s running. To enable responsiveness, turn off the **Scale to fit** setting.
        - This step also turns off the aspect ratio lock, allowing your app to adapt to various screen shapes.
    2. Understand App and Screen Dimensions:
        - Use formulas that reference the **Width** and **Height** properties of the screen.
        - These properties dynamically adjust based on the device or browser window size.
        - The default formulas for these properties are:
            - `Width = Max(App.Width, App.DesignWidth)`
            - `Height = Max(App.Height, App.DesignHeight)`
    3. Write Formulas for Dynamic Layout:
        - Instead of using fixed coordinates, express control positions and sizes using formulas.
        - Consider the overall screen size and relative positioning of controls.
        - Use properties like **Width**, **Height**, **Alignment**, and **Stretch** to adapt controls to different screens.
    4. Responsive Containers:
        - Leverage responsive layout containers:
            - **Horizontal containers**: Arrange controls side by side.
            - **Vertical containers**: Stack controls vertically.
        - These containers adjust automatically based on available space.
    5. Test on Different Devices:
        - Regularly test your app on various devices (desktop, mobile, tablet).
        - Ensure controls adapt correctly to different screen sizes and orientations.
    6. Use Responsive Screen Templates:
        - Explore the new responsive screen templates provided by Power Apps.
        - These templates simplify the process of creating responsive layouts.

    For more detailed guidance, you can watch tutorials like:

    - [](https://powerusers.microsoft.com/t5/Webinars-and-Video-Gallery/Tutorial-on-quot-How-to-build-Responsive-Power-Apps-quot/td-p/1205239)[How to Build Responsive Power Apps](https://powerusers.microsoft.com/t5/Webinars-and-Video-Gallery/Tutorial-on-quot-How-to-build-Responsive-Power-Apps-quot/td-p/1205239)
    - [](https://powerusers.microsoft.com/t5/Webinars-and-Video-Gallery/Tutorial-on-quot-How-to-build-Responsive-Power-Apps-quot/td-p/1205239)[Add Responsive Design to Your Power Apps](https://powerusers.microsoft.com/t5/Webinars-and-Video-Gallery/Add-Responsive-Design-to-your-Power-Apps-Make-existing-Apps/td-p/1459471)
    - [](https://powerusers.microsoft.com/t5/Webinars-and-Video-Gallery/Tutorial-on-quot-How-to-build-Responsive-Power-Apps-quot/td-p/1205239)[Power Apps Responsive Containers & Screen Templates](https://powerusers.microsoft.com/t5/Webinars-and-Video-Gallery/Power-Apps-Responsive-Containers-amp-Screen-Templates/td-p/748360)

    Remember, responsive design ensures a seamless user experience across different devices!

#### 15. Name Your Controls with the Right Meaning

- **Why?** Descriptive control names enhance readability and maintainability.
- **How?**
- **Use meaningful names**: Instead of generic names like “Button1” or “Label2,” give controls descriptive names like “SubmitButton” or “CustomerNameLabel.”
- **Avoid abbreviations**: Be explicit in your naming. For example, use “EmployeeFullName” instead of “EmpName.”
- **Group related controls**: If you have multiple controls for a specific purpose (e.g., input fields for address), group them with similar prefixes (e.g., “AddressLine1,” “AddressCity,” etc.).

#### 16. Adding Comments in Your Formulas for Better Understanding

- **Why?** Comments provide context and explanations for complex formulas.
- **How?**
    - **Use double slashes (//)**: Place comments after a double slash to explain specific lines of code.
    - **Describe intent**: Explain why a particular formula is used or what it achieves.
    - **Document assumptions**: If a formula relies on certain assumptions or conditions, mention them in comments.
    - **Example**:

        ```powerapps
        // Calculate total price
        ClearCollect(
            colCartItems,
            Filter(
                tblProducts,
                ProductCategory = "Electronics"
            )
        );
        ```

**17. Test, Test, Test!**

Continuous testing is your ally. Identify bottlenecks early and iterate.

\---------------------------------------------------------------------

**Remember, following these practices not only improves your app’s quality but also makes collaboration easier for you and your team!**
