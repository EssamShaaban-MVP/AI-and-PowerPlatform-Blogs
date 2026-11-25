---
title: "Power Apps - Patch, Update and Collect"
description: "In the realm of programming, versatility is key. Just as there are numerous ways to accomplish tasks in any proficient programming language, Power Apps offers multiple…"
date: 2024-02-18
category: "Power Apps"
tags: ["Power Apps","Patch","Power Fx"]
readingMinutes: 5
cover: "/blog-images/power-apps-patch-update-and-collect-in/01.webp"
---

In the realm of programming, versatility is key. Just as there are numerous ways to accomplish tasks in any proficient programming language, Power Apps offers multiple avenues for data manipulation. With various functions at our disposal, such as Patch, Update, and Collect, it's crucial to understand their strengths and nuances to make informed decisions. Let's explore these functions in detail and demystify their applications.

## Understanding Data Manipulation

Power Apps, aligned with the Power Platform's endorsement of Power FX, provides developers with a plethora of options for data manipulation. Primarily focused on data sources and collections, these functions offer flexibility and adaptability. Here's a breakdown of the key functions:

- **Patch**: Modifies or creates records in data sources or collections.
- **Update**: Replaces records in data sources or collections.
- **UpdateIf**: Modifies records based on specified conditions.
- **SubmitForm**: Modifies or creates records primarily within forms.
- **Collect**: Creates new collections.
- **ClearCollect**: Clears existing collections and creates new ones.
- **Remove**: Removes records from data sources or collections.
- **RemoveIf**: Removes records based on specified conditions.
- **Table**: Creates tables, primarily used in variables.

## Key Use Cases and Examples

## Modify Record

### 1. Patch Function

The Patch function is your go-to tool for modifying or creating records in a data source. It allows you to update existing records or add new ones. Here’s the basic syntax:

```
Patch(DataSource, BaseRecordsTable, ChangeRecordTable1, [, ChangeRecordTable2, ...])
```

- **DataSource**: The data source containing the records you want to modify or create.
- **BaseRecordsTable**: A table of records to modify or create.
- **ChangeRecordTable(s)**: One or more tables of records that contain properties to modify for each record in the BaseRecordsTable.

For example, let’s say you have a dummyData collection with an ID, Title, and number field. To modify a record with ID 1, you can use:

```
Patch(dummyData, LookUp(dummyData, ID = 1), {Title: "Num1", number: 1})
```

### 2. UpdateIf Function

The UpdateIf function allows you to conditionally update records. It works like this:

```
UpdateIf(dummyData, Condition, {Title: "Num1", number: 1})
```

- **Condition**: A logical expression that determines which records to update.

### 3. Update Function

The Update function is useful when you want to update a specific record. Here’s how it looks:

```
Update(dummyData, LookUp(dummyData, ID = 1), {Title: "Num1", number: 1}, first)
```

- **first**: Specifies that only the first matching record should be updated.

### 4. SubmitForm Function

The SubmitForm function is commonly used in forms. It submits changes made to form controls to the data source. For example:

```
SubmitForm(dummyDataForm)
```

This submits any changes made in the dummyDataForm to the dummyData collection.

## Create Record

### 1. Collect Function

The Collect function is a straightforward way to create records in a collection. It allows you to add new records with specified field values. Here’s the basic syntax:

```
Collect(CollectionName, { Field1: Value1, Field2: Value2, ... })
```

**CollectionName: The name of the collection where you want to add the record.**

- **Field1**, **Field2**, etc.: The field names and corresponding values for the new record.

For example, if you have a collection called dummyData, you can create a new record like this:

```
Collect(dummyData, { Title: "Num1", number: 1 })
```

### 2. Patch Function

The Patch function is more versatile. It allows you to modify existing records or create new ones in a data source. Here’s how you can use it to create a new record:

```
Patch(DataSource, Defaults(DataSource), { Title: "Num1", number: 1 })
```

**DataSource: The data source (e.g., SharePoint, SQL Server) where you want to create the record.**

- **Defaults(DataSource)**: Retrieves default values for the data source (useful for creating new records).
- **{ Title: “Num1”, number: 1 }**: The field names and values for the new record.

### 3. Table Function

The Table function is handy when you want to create a single-row table (essentially a record). It simplifies the process by allowing you to define field values directly. For instance:

```
Set(varDummyData, Table({ Title: "Num1", number: 1 }, { Title: "Num2", number: 2 }))
```

**Here, varDummyData** **holds a table with two records, each containing the specified field values.**

## Conclusion

Choose the method that best suits your needs. If simplicity is your goal, go with Collect. If you’re working with data sources, consider using Patch. And for single-row arrays, the Table function is your friend.

## Deleting Records

### 1. Remove Function

The Remove function allows you to delete a specific record from a data source or collection. Here’s the basic syntax:

```
Remove(DataSource, RecordToDelete)
```

- **DataSource**: The data source (e.g., collection, SharePoint list) from which you want to remove the record.
- **RecordToDelete**: The record you want to delete.

For instance, if you have a dummyData collection and want to remove the record with ID 1, you can use:

```
Remove(dummyData, LookUp(dummyData, ID = 1))
```

### 2. RemoveIf Function

The RemoveIf function provides more flexibility. It allows you to conditionally delete records based on a specified condition. The syntax is as follows:

```
RemoveIf(DataSource, Condition)
```

- **DataSource**: The data source containing the records.
- **Condition**: A logical expression that determines which records to delete.

For example, to remove all records with an ID greater than 10:

```
RemoveIf(dummyData, ID > 10)
```

### 3. Choosing Between Remove and RemoveIf

- Use Remove when you want to delete a specific record by directly referencing it.
- Use RemoveIf when you need to apply a condition to selectively delete records.

## Practical Examples

1. **Removing a Specific Record**: Suppose you have a button in your app, and you want to delete the currently selected record from a data table. In the button’s OnSelect property, use:

```
Remove(dummyData, DataTable1.Selected)
```

2. **Conditional Removal**: Let’s say you want to delete all records where the Status field is set to “Inactive.” Use:

```
RemoveIf(dummyData, Status = "Inactive")
```
