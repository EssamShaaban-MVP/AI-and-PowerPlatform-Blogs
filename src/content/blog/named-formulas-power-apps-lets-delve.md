---
title: "Named Formulas in Power Apps"
description: "Let’s delve into the fascinating world of Named Formulas in Power Apps. These powerful constructs allow you to simplify app development, enhance maintainability, and improve…"
date: 2024-02-15
category: "Power Apps"
tags: ["Power Apps","Named Formulas","Power Fx"]
readingMinutes: 2
cover: "/blog-images/named-formulas-power-apps-lets-delve/01.webp"
---

**

![Figure 1: Named Formulas in Power Apps](/blog-images/named-formulas-power-apps-lets-delve/01.webp)

**

Let’s delve into the fascinating world of Named Formulas in Power Apps. These powerful constructs allow you to simplify app development, enhance maintainability, and improve performance.

## Named Formulas: An Introduction

Named Formulas are inspired by an old concept from Excel—the “Name Manager.” In Excel, you can assign names to cells and refer to those names throughout your workbook. This indirection allows you to move cell references by name rather than by location. Now, this concept has made its way into Power **Fx**, the expressive formula language used in Power Apps.

### What Are Named Formulas?

1. Definition:
    - Named Formulas are like custom properties you create for your app.
    - They encapsulate logic and calculations, much like how **F = m \* a** in physics calculates force.
    - These formulas don’t specify when or how they should be calculated; they are purely declarative recipes.
2. Advantages:
    - **Availability**: The value of a Named Formula is always accessible. No timing dependencies or incorrect values.
    - **Interdependence**: Named Formulas can refer to each other, as long as they avoid circular references.
    - **Parallel Calculation**: They can be calculated concurrently.
    - **Automatic Updates**: As control properties or database records change, Named Formulas automatically update their values.

### Example Named Formulas

#### Custom properties related to user information

```PowerFx
UserEmail = User().Email;
UserInfo = LookUp(Users, 'Primary Email' = UserEmail);UserTitle = UserInfo.Title;
UserPhone = Switch(
    UserInfo.'Preferred Phone',
    'Preferred Phone (Users)'.'Mobile Phone',
    UserInfo.'Mobile Phone',
    UserInfo.'Main Phone'
);
```

```PowerFx

```

- `UserEmail`, `UserInfo`, `UserTitle`, and `UserPhone` are Named Formulas.
- They calculate values based on other data, and we can use them throughout the app.
- Imagine switching from the Dataverse Users table to the Office 365 connector without changing formulas elsewhere—Named Formulas make it possible!

### Complex calculations

Named Formula: TotalCost \= Quantity \* UnitPrice + (Quantity \* UnitPrice \* TaxRate); // Use TotalCost in a label or text box: Label1.Text \= "Total Cost: " & TotalCost

C#

Copy

### Data validation

NamedFormula: IsValidEmail \= IsMatch(TextInput1.Text, EmailRegex); // Use IsValidEmail to enable or disable a button: Button1.DisplayMode \= If(IsValidEmail, DisplayMode.Edit, DisplayMode.Disabled)

C#

Copy

### Data transformation

NamedFormula: FullName \= Concat(FirstName, " ", LastName) // Use FullName in a display field or email template: GreetingLabel.Text \= "Hello, " & FullName

C#

Copy

### Conditional formatting

### Named Formula: Overdue \= DateDiff(Today(), DueDate) \> 0 // Use Overdue to set the background color of a label: Label2.Fill \= If(Overdue, Red, LightGray)

### Why Use Named Formulas?

1. **Always Available**: No need to wait for App.OnStart or worry about timing.
2. **Up-to-Date**: Values automatically update as data changes.
3. **Declarative Logic**: Focus on what needs to be done, not how or when.
4. **Parallel Computation**: Named Formulas can work together efficiently.

Remember, while Set and state variables have their place, Named Formulas offer unique benefits for app development. They’re like having your own custom properties at your disposal.
