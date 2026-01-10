---
title: SQL
description: A guide to SQL.
---

## I. Introduction to SQL
**SQL** (Structured Query Language) is the standard language for relational database management systems (RDBMS).
* **Common RDBMS:** PostgreSQL, MySQL, SQLite, Oracle, Microsoft SQL Server.
* **Relational Model:** Data is organized into **tables** (rows and columns). Tables are related to one another via unique keys.

---

## II. Retrieving Data (The `SELECT` Statement)

### 1. Basic Selection
The core of SQL is the query. It declares *what* you want, not *how* to get it.
```sql
SELECT * FROM mytable;                       -- Select all columns
SELECT col1, col2 FROM mytable;              -- Select specific columns
SELECT DISTINCT col1 FROM mytable;           -- Select unique values (removes duplicates)
```

### 2. Filtering Results (`WHERE`)
The `WHERE` clause filters rows *before* they are grouped or aggregated.

**Comparison Operators**
| Operator | Description | Example |
| :--- | :--- | :--- |
| `=`, `!=`, `<>` | Equal, Not Equal | `age != 20` |
| `>`, `<`, `>=`, `<=` | Greater/Less than | `price >= 100` |
| `BETWEEN .. AND` | Inclusive range | `year BETWEEN 1990 AND 2000` |
| `IN (...)` | Matches any value in a list | `status IN ('Active', 'Pending')` |
| `IS NULL` | Checks for missing values | `email IS NULL` |

**Text Pattern Matching (`LIKE`)**
| Symbol | Meaning | Example |
| :--- | :--- | :--- |
| `%` | Wildcard (0 or more characters) | `'A%'` (Starts with A) |
| `_` | Wildcard (exactly 1 character) | `'A_'` (A followed by one char) |
| `ILIKE` | Case-insensitive `LIKE` (Postgres specific) | `name ILIKE 'john'` |

### 3. Sorting & Pagination
```sql
SELECT col1, col2 FROM mytable
ORDER BY col1 ASC, col2 DESC    -- Sort direction
LIMIT 10 OFFSET 5;              -- Skip first 5, take next 10
```

---

## III. Multi-Table Queries (Joins)

Normalization splits data into multiple tables to reduce redundancy. **Joins** allow us to reconstruct that data.

| Join Type | Description |
| :--- | :--- |
| **INNER JOIN** | Returns rows only when there is a match in *both* tables. |
| **LEFT JOIN** | Returns *all* rows from the left table, and matching rows from the right. (Fills unmatched with `NULL`). |
| **RIGHT JOIN** | Returns *all* rows from the right table, and matching rows from the left. |
| **FULL JOIN** | Returns rows when there is a match in *one* of the tables. (All rows from both). |

**Syntax:**
```sql
SELECT t1.col, t2.col
FROM table1 AS t1
INNER JOIN table2 AS t2 
    ON t1.id = t2.t1_id; -- The Join Condition
```

---

## IV. Aggregation & Grouping

Aggregation collapses many rows into a single summary row.

### 1. Aggregate Functions
| Function | Description |
| :--- | :--- |
| `COUNT(*)` | Count total rows. |
| `COUNT(col)` | Count non-NULL rows in a column. |
| `SUM(col)` | Total sum of numeric column. |
| `AVG(col)` | Mean value. |
| `MIN(col)` / `MAX(col)` | Smallest / Largest value. |

### 2. The `GROUP BY` Clause
Used to group rows that have the same values into summary rows.
```sql
SELECT department, COUNT(*) as emp_count
FROM employees
GROUP BY department;
```

### 3. The `HAVING` Clause
**Critical Distinction:**
* `WHERE` filters rows **before** grouping.
* `HAVING` filters groups **after** aggregation.

```sql
SELECT department, AVG(salary)
FROM employees
GROUP BY department
HAVING AVG(salary) > 50000; -- Only show departments with high avg salary
```

---

## V. Advanced SQL

### 1. Set Operations
Combines the results of two separate queries.
* `UNION`: Combines unique rows.
* `UNION ALL`: Combines all rows (including duplicates) - *Faster than UNION*.
* `INTERSECT`: Rows common to both queries.
* `EXCEPT` (or `MINUS`): Rows in the first query but not the second.

### 2. CTEs (Common Table Expressions)
A way to create a temporary result set for use within the main query. It makes code more readable than nested subqueries.
```sql
WITH regional_sales AS (
    SELECT region, SUM(amount) as total_sales
    FROM orders
    GROUP BY region
)
SELECT * FROM regional_sales WHERE total_sales > 100000;
```

---

## VI. Managing Data (DML & DDL)

### 1. Modifying Data (DML)
* **INSERT:** `INSERT INTO table (c1, c2) VALUES (v1, v2);`
* **UPDATE:** `UPDATE table SET c1 = val WHERE condition;`
* **DELETE:** `DELETE FROM table WHERE condition;`

### 2. Defining Structures (DDL)
* **CREATE TABLE:**
    ```sql
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(50) UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    ```
* **ALTER TABLE:** `ALTER TABLE users ADD COLUMN email TEXT;`
* **DROP TABLE:** `DROP TABLE IF EXISTS users;`

---
