---
title: Cheatsheet -- SQL
description: Cheatsheet
---


# SQL Cheatsheet

### Query Anatomy
```sql
SELECT DISTINCT column_name AS alias, AGG_FUNC(col)
FROM table_name
JOIN other_table ON table_name.id = other_table.foreign_id
WHERE condition
GROUP BY column_name
HAVING agg_condition
ORDER BY column_name ASC/DESC
LIMIT number OFFSET number;
```

### Order of Execution
1. `FROM` & `JOIN`
2. `WHERE`
3. `GROUP BY`
4. `HAVING`
5. `SELECT`
6. `DISTINCT`
7. `ORDER BY`
8. `LIMIT`

### Filtering Operators
| Operator | Syntax | Notes |
| :--- | :--- | :--- |
| **Range** | `BETWEEN x AND y` | Inclusive |
| **List** | `IN (a, b, c)` | Acts like multiple ORs |
| **Pattern** | `LIKE 'A%'` | `%` = any length, `_` = single char |
| **Nulls** | `IS NULL` / `IS NOT NULL` | Never use `= NULL` |

### Joins
| Type | Diagram Logic | Result |
| :--- | :--- | :--- |
| `INNER` | ( A ∩ B ) | Only matches |
| `LEFT` | ( A ) ∪ ( A ∩ B ) | All Left + Matches |
| `RIGHT` | ( B ) ∪ ( A ∩ B ) | All Right + Matches |
| `FULL` | ( A ∪ B ) | Everything |

### Aggregation
| Function | Usage |
| :--- | :--- |
| `COUNT(*)` | Rows in group |
| `SUM(col)` | Total of col |
| `AVG(col)` | Average of col |
| `MIN(col)` | Min of col |
| `MAX(col)` | Max of col |

### Data Types (Common)
| Type | Description |
| :--- | :--- |
| `INT` / `INTEGER` | Whole numbers |
| `FLOAT` / `REAL` | Decimals |
| `VARCHAR(n)` | String with max length `n` |
| `TEXT` | Long text strings |
| `BOOLEAN` | True/False (or 1/0) |
| `DATE` | YYYY-MM-DD |
| `TIMESTAMP` | Date + Time |

### Table Constraints
* `PRIMARY KEY`: Unique ID for row.
* `FOREIGN KEY`: Links to another table's PK.
* `UNIQUE`: No duplicates allowed.
* `NOT NULL`: Cannot be empty.
* `DEFAULT`: Value if none provided.
* `CHECK`: Validates data (e.g., `CHECK (price > 0)`).