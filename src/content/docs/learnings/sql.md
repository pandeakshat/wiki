---
title: SQL
description: A guide to SQL.
---

SQL, or Structured Query Language, is a language designed to query, manipulate, and transform data from a relational database. 

SQL Databases -  SQLite, MySQL, Postgres, Oracle and Microsoft SQL Server.

A relational database represents a collection of related (two-dimensional) tables.


SQL Query
A query in itself is just a statement which declares what data we are looking for, where to find it in the database, and optionally, how to transform it before it is returned.

To retrieve data from a SQL database, we need to write `SELECT` statement

Select query for a specific columns
	`SELECT column, another_column, … FROM mytable;`

Select query for all columns
	`SELECT * FROM mytable;`


In order to filter certain results from being returned, we need to use a `WHERE` clause
Select query with constraints
	`SELECT column, another_column, … FROM mytable WHERE _condition_ AND/OR _another_condition_ AND/OR …;`

| Operator            | Condition                                            | SQL Example                   |
| ------------------- | ---------------------------------------------------- | ----------------------------- |
| =, !=, <, <=, >, >= | Standard numerical operators                         | col_name != 4                 |
| BETWEEN … AND …     | Number is within range of two values (inclusive)     | col_name BETWEEN 1.5 AND 10.5 |
| NOT BETWEEN … AND … | Number is not within range of two values (inclusive) | col_name NOT BETWEEN 1 AND 10 |
| IN (…)              | Number exists in a list                              | col_name IN (2, 4, 6)         |
| NOT IN (…)          | Number does not exist in a list                      | col_name NOT IN (1, 3, 5)     |

| Operator   | Condition                                                                                             | Example                                                                 |
| ---------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| =          | Case sensitive exact string comparison (_notice the single equals_)                                   | col_name = "abc"                                                        |
| != or <>   | Case sensitive exact string inequality comparison                                                     | col_name != "abcd"                                                      |
| LIKE       | Case insensitive exact string comparison                                                              | col_name LIKE "ABC"                                                     |
| NOT LIKE   | Case insensitive exact string inequality comparison                                                   | col_name NOT LIKE "ABCD"                                                |
| %          | Used anywhere in a string to match a sequence of zero or more characters (only with LIKE or NOT LIKE) | col_name LIKE "%AT%"  <br>(matches "AT", "ATTIC", "CAT" or even "BATS") |
| _          | Used anywhere in a string to match a single character (only with LIKE or NOT LIKE)                    | col_name LIKE "AN_"  <br>(matches "AND", but not "AN")                  |
| IN (…)     | String exists in a list                                                                               | col_name IN ("A", "B", "C")                                             |
| NOT IN (…) | String does not exist in a list                                                                       | col_name NOT IN ("D", "E", "F")                                         |
All strings must be quoted so that the query parser can distinguish words in the string from SQL keywords.

Select query with unique results
	`SELECT **DISTINCT** column, another_column, … FROM mytable WHERE _condition(s)_;`

Select query with ordered results
	`SELECT column, another_column, … FROM mytable WHERE condition(s) ORDER BY column ASC/DESC;`

Select query with limited rows
	`SELECT column, another_column, … FROM mytable WHERE _condition(s)_ ORDER BY column ASC/DESC LIMIT num_limit OFFSET num_offset;`

---

Database normalization is useful because it minimizes duplicate data in any single table, and allows for data in the database to grow independently of each other

Tables that share information about a single entity need to have a _primary key_ that identifies that entity _uniquely_ across the database.

Select query with INNER JOIN on multiple tables
	`SELECT column, another_table_column, … FROM mytable INNER JOIN another_table ON mytable.id = another_table.id WHERE _condition(s)_ ORDER BY column, … ASC/DESC LIMIT num_limit OFFSET num_offset;`
	
 `INNER JOIN` is a process that matches rows from the first table and the second table which have the same key (as defined by the `ON` constraint) to create a result row with the combined columns from both tables. 

--- 

If the two tables have asymmetric data, which can easily happen when data is entered in different stages, then we would have to use a `LEFT JOIN`, `RIGHT JOIN` or `FULL JOIN` instead to ensure that the data you need is not left out of the results.

Select query with LEFT/RIGHT/FULL JOINs on multiple tables
	`SELECT column, another_column, … FROM mytable INNER/LEFT/RIGHT/FULL JOIN another_table ON mytable.id = another_table.matching_id WHERE _condition(s)_ ORDER BY column, … ASC/DESC LIMIT num_limit OFFSET num_offset;`

`LEFT JOIN` simply includes rows from A regardless of whether a matching row is found in B. 
`RIGHT JOIN` is the same, but reversed, keeping rows in B regardless of whether a match is found in A.
`FULL JOIN` simply means that rows from both tables are kept, regardless of whether a matching row exists in the other table.

---

Select query with constraints on NULL values
	`SELECT column, another_column, … FROM mytable **WHERE column IS/IS NOT NULL** AND/OR _another_condition_ AND/OR …;`

An alternative to `NULL` values in your database is to have _data-type appropriate default values_, like 0 for numerical data, empty strings for text data, etc. But if your database needs to store incomplete data, then `NULL` values can be appropriate if the default values will skew later analysis

---

Select query with expression aliases

`SELECT **_col_expression_ AS _expr_description_**, … FROM mytable;`

Example query with both column and table name aliases

`SELECT column **AS better_column_name**, … FROM a_long_widgets_table_name **AS mywidgets** INNER JOIN widget_sales ON mywidgets.id = widget_sales.widget_id;`


Select query with aggregate functions over all rows

`**SELECT AGG_FUNC(_column_or_expression_) AS aggregate_description**, … FROM mytable WHERE _constraint_expression_;`

| Function                                | Description                                                                                                                                                                                     |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **COUNT(*****)**, **COUNT(**column**)** | A common function used to counts the number of rows in the group if no column name is specified. Otherwise, count the number of rows in the group with non-NULL values in the specified column. |
| **MIN(**column**)**                     | Finds the smallest numerical value in the specified column for all rows in the group.                                                                                                           |
| **MAX(**column**)**                     | Finds the largest numerical value in the specified column for all rows in the group.                                                                                                            |
| **AVG(**column)                         | Finds the average numerical value in the specified column for all rows in the group.                                                                                                            |
| **SUM(**column**)**                     | Finds the sum of all numerical values in the specified column for the rows in the group.                                                                                                        |
Select query with aggregate functions over groups

`SELECT AGG_FUNC(_column_or_expression_) AS aggregate_description, … FROM mytable WHERE _constraint_expression_ **GROUP BY column**;`

Select query with HAVING constraint

`SELECT group_by_column, AGG_FUNC(_column_expression_) AS aggregate_result_alias, … FROM mytable WHERE _condition_ GROUP BY column **HAVING _group_condition_**;`


Complete SELECT query

`SELECT DISTINCT column, AGG_FUNC(_column_or_expression_), … FROM mytable JOIN another_table ON mytable.column = another_table.column WHERE _constraint_expression_ GROUP BY column HAVING _constraint_expression_ ORDER BY _column_ ASC/DESC LIMIT _count_ OFFSET _COUNT_;`

# Query order of execution

## 1. `FROM` and `JOIN`s

The `FROM` clause, and subsequent `JOIN`s are first executed to determine the total working set of data that is being queried. This includes subqueries in this clause, and can cause temporary tables to be created under the hood containing all the columns and rows of the tables being joined.

## 2. `WHERE`

Once we have the total working set of data, the first-pass `WHERE` constraints are applied to the individual rows, and rows that do not satisfy the constraint are discarded. Each of the constraints can only access columns directly from the tables requested in the `FROM` clause. Aliases in the `SELECT` part of the query are not accessible in most databases since they may include expressions dependent on parts of the query that have not yet executed.

## 3. `GROUP BY`

The remaining rows after the `WHERE` constraints are applied are then grouped based on common values in the column specified in the `GROUP BY` clause. As a result of the grouping, there will only be as many rows as there are unique values in that column. Implicitly, this means that you should only need to use this when you have aggregate functions in your query.

## 4. `HAVING`

If the query has a `GROUP BY` clause, then the constraints in the `HAVING` clause are then applied to the grouped rows, discard the grouped rows that don't satisfy the constraint. Like the `WHERE` clause, aliases are also not accessible from this step in most databases.

## 5. `SELECT`

Any expressions in the `SELECT` part of the query are finally computed.

## 6. `DISTINCT`

Of the remaining rows, rows with duplicate values in the column marked as `DISTINCT` will be discarded.

## 7. `ORDER BY`

If an order is specified by the `ORDER BY` clause, the rows are then sorted by the specified data in either ascending or descending order. Since all the expressions in the `SELECT` part of the query have been computed, you can reference aliases in this clause.

## 8. `LIMIT` / `OFFSET`

Finally, the rows that fall outside the range specified by the `LIMIT` and `OFFSET` are discarded, leaving the final set of rows to be returned from the query.