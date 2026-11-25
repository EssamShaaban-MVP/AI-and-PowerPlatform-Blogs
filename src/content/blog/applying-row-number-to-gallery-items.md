---
title: "Applying Row Number to Gallery Items"
description: "Creating a row number sequence within a Power Apps gallery is a powerful technique. It ensures consistent numbering even when items are dynamically added or removed. Let’s…"
date: 2024-02-27
category: "Power Apps"
tags: ["Power Apps","Gallery"]
readingMinutes: 1
cover: "/blog-images/applying-row-number-to-gallery-items/01.webp"
---

Creating a row number sequence within a Power Apps gallery is a powerful technique. It ensures consistent numbering even when items are dynamically added or removed. Let’s dive into the details:

## 1. Set Up Your Data Source

Before creating the gallery, ensure you have a data source (such as a SharePoint list, Excel table, or custom collection) that contains the items you want to display. Each item should have a unique identifier (e.g., an “ID” field).

## 2. Create a Custom Collection for Numbering

We’ll create a custom collection to store the numbered items. Here’s how:

1. Set the screen’s OnVisible property:

Clear(colNumberedItems); // colNumberedItems is a custom collection

ForAll(yourDataSource,

```PowerApps
       Collect(colNumberedItems,
               Last(FirstN(AddColumns(yourDataSource, "RowNumber", CountRows(colNumberedItems) + 1),
                            CountRows(colNumberedItems) + 1)
               )
       )
)
```

```PowerApps
Replace yourDataSource with the name of your data source.
```

```PowerApps
3. Design Your Gallery:Create a gallery and bind it to colNumberedItems. Inside the gallery, add a label control to display the row number. Set the label’s Text property as follows:
```

```PowerApps
LookUp(colNumberedItems, ID = ThisItem.ID).RowNumberReplace ID with your data source’s unique identifier.4. Test and Preview:Save, publish, and preview your app. Now, when you add or delete items from the gallery, the numbering will adjust automatically.5. Optional: User-Defined Sequence:If you want users to input a specific sequence, consider using a text input control. For example:Items = ForAll(Sequence(Value(txtEnterNumber.Text)), Blank())Here, txtEnterNumber is a text input control where users can specify the desired sequence.Remember to adapt these steps to your specific use case and data source. Happy app building!
```
