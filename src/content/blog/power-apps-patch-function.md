---
title: "Power Apps - Patch function"
description: "Power Apps, a part of the Microsoft Power Platform, empowers users to build custom business applications without the need for extensive coding knowledge. Among its many…"
date: 2024-02-18
category: "Power Apps"
tags: ["Power Apps","Patch"]
readingMinutes: 5
cover: "/blog-images/power-apps-patch-function/01.webp"
---

Power Apps, a part of the Microsoft Power Platform, empowers users to build custom business applications without the need for extensive coding knowledge. Among its many powerful functions, the Patch function stands out as a versatile tool for modifying data sources, such as SharePoint lists or databases. In this comprehensive guide, we'll delve into the intricacies of the Patch function, exploring its syntax, common use cases, and advanced techniques.

## Understanding the Patch Function

The Patch function in Power Apps is used to modify or create records in a data source. Its syntax is as follows:

### Patch(DataSource, Defaults(DataSource), ChangeRecord1 \[, ChangeRecord2, …\])

- `DataSource`: The data source to be modified.
- `Defaults(DataSource)`: A reference to the default values of the data source.
- `ChangeRecord1, ChangeRecord2, …`: One or more records containing the changes to be applied to the data source.

## Basic Examples

2. Updating a Record:
3. Patch(MyDataSource, LookUp(MyDataSource, ID = 1), {Name: "Updated Name"})
4. This example updates the record in `MyDataSource` where the ID is 1, changing the value of the Name field to "Updated Name".
1. Creating a New Record:
2. Patch(MyDataSource, Defaults(MyDataSource), {Name: "New Record"})
3. This code creates a new record in `MyDataSource` with the Name field set to "New Record", using the default values for other fields.

## Advanced Examples

1. Conditional Updates:
2. Patch(MyDataSource, LookUp(MyDataSource, ID = 1), {Name: If(TextInput1.Text <> "", TextInput1.Text, Defaults(MyDataSource).Name)})
4. This example updates the Name field of the record where the ID is 1. If a TextInput control (`TextInput1`) is not empty, it sets the Name field to the value of the TextInput; otherwise, it retains the existing Name value.
7. Batch Updates:
8. Patch(MyDataSource, Defaults(MyDataSource), {Name: "Record 1"}, {Name: "Record 2"}, {Name: "Record 3"})
10. Here, multiple records are created in `MyDataSource` with the Name fields set to "Record 1", "Record 2", and "Record 3", respectively.
1. Deleting Records:
2. Patch(MyDataSource, LookUp(MyDataSource, ID = 1), {IsDeleted: true})
3. This code soft-deletes the record where the ID is 1 by setting the IsDeleted field to true.

## Best Practices

- Error Handling: Implement error handling mechanisms, such as using the Errors function, to handle potential errors during the Patch operation.

-

- Performance Optimization: Minimize the number of Patch operations by batching updates whenever possible to optimize performance.

-

- Security Considerations: Ensure that appropriate security measures are in place to prevent unauthorized access to sensitive data sources.

### Merge records (outside of a data source)

Patch( { Name: "James", Score: 90 }, { Name: "Jim", Passed: true } )

Merges two records outside of a data source:

- The values in the Name column of each record don't match. The result contains the value (Jim) in the record that's closer to the end of the argument list instead of the value (James) in the record that's closer to the start.
- The first record contains a column (Score) that doesn't exist in the second record. The result contains that column with its value (90).
- The second record contains a column (Passed) that doesn't exist in the first record. The result contains that column with its value (true).

#### Results

{ Name: "Jim", Score: 90, Passed: true }

## Use of As or ThisRecord

Using the As or ThisRecord keyword in the formula avoids ambiguous evaluation context.

In the example below, consider the first lookup in the `If` statement. `(OrderID = A[@OrderID])` is expected to compare the `OrderId` in the lookup scope with the `OrderId` of collection `A` in the `ForAll` scope. In this case, you likely want `A[@OrderId]` to be resolved as a local parameter. But it is ambiguous.

Power Apps currently interprets both the left-hand side `OrderId` and right-hand side `A[@OrderId]` as a field in the lookup scope. Therefore, lookup will always find the first row in `[dbo].[Orders1]` because the condition is always true (that is, any row's `OrderId` is equal to itself.)

ClearCollect( A, Filter( '\[dbo\].\[Orders1\]', OrderId = 8888888 ) ); ForAll( A, If( LookUp( '\[dbo\].\[Orders1\]', OrderId = A\[@OrderId\], "OK" ) = "OK", Patch( '\[dbo\].\[Orders1\]', LookUp( '\[dbo\].\[Orders1\]', OrderId = A\[@OrderId\] ), { OrderName: "val1" } ), Patch( '\[dbo\].\[Orders1\]', Defaults('\[dbo\].\[Orders1\]'), { OrderName: "val2" } ) ) )

### Using As or ThisRecord

Whenever possible use the As operator or the ThisRecord to disambiguate the left-hand side. As is recommended for the above scenario.

When your formula uses multiple scopes with `ForAll`, `Filter`, and `Lookup` on the same data source or table, it is possible that the scope parameters may collide with a same field elsewhere. Therefore, it is recommended to use the As operator or ThisRecord to resolve the field name and avoid ambiguity.

For example, you can use the As operator to disambiguate in the example below.

ClearCollect( A, Filter( '\[dbo\].\[Orders1\]', OrderId = 8888888 ) ); ForAll( A, If( LookUp( '\[dbo\].\[Orders1\]' As B, B.OrderId = A\[@OrderId\], "OK" ) = "OK", Patch( '\[dbo\].\[Orders1\]', LookUp( '\[dbo\].\[Orders1\]' As C, C.OrderId = A\[@OrderId\] ), { OrderName: "val1" } ), Patch( '\[dbo\].\[Orders1\]', Defaults('\[dbo\].\[Orders1\]'), { OrderName: "val2" } ) ) )

Alternatively, you can use ThisRecord for the same purpose.

ClearCollect( A, Filter( '\[dbo\].\[Orders1\]', OrderId = 8888888 ) ); ForAll( A, If( LookUp( '\[dbo\].\[Orders1\]', ThisRecord.OrderId = A\[@OrderId\], "OK" ) = "OK", Patch( '\[dbo\].\[Orders1\]', LookUp( '\[dbo\].\[Orders1\]', ThisRecord.OrderId = A\[@OrderId\] ), { OrderName: "val1" } ), Patch( '\[dbo\].\[Orders1\]', Defaults('\[dbo\].\[Orders1\]'), { OrderName: "val2" } ) ) )

## Conclusion

The Patch function in Power Apps is a powerful way to modify data sources with flexibility and precision. By mastering its syntax and exploring various examples, developers can leverage its capabilities to create dynamic and efficient applications tailored to their business needs.

Whether you're updating existing records, creating new ones, or implementing complex conditional logic, the Patch function empowers you to manipulate data with ease and confidence in your Power Apps projects.
