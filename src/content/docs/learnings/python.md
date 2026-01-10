---
title: Python - From Scratch to Expert
description: A guide to python.
---

## I. Python Fundamentals

### 1. Arithmetic & Order of Operations
Python follows the **PEMDAS** rule for operator precedence.
* **P**arentheses `()`
* **E**xponents `**`
* **M**ultiplication `*`, **D**ivision `/`, **F**loor Division `//`, **M**odulus `%` (evaluated left-to-right)
* **A**ddition `+`, **S**ubtraction `-` (evaluated left-to-right)

### 2. Variables & Functions
* **Comments:** Use `#` for single-line comments.
* **Docstrings:** Use `""" description """` immediately after defining a function to document it.
* **Function Template:**
    ```python
    def function_name(input_variable=default_value):
        # computational statements
        return output_variable
    ```
    * *Note:* You can assign **default values** to parameters to prevent errors if arguments are missing during the call.
* **Scope:** Python defines scope via indentation (whitespace).
    * **LEGB Rule:** Python looks for variables in this order: **L**ocal -> **E**nclosing -> **G**lobal -> **B**uilt-in.

### 3. Data Types & "Peculiarities"
* **Strings:**
    * Immutable (cannot be changed after creation).
    * Can have length 0 (`""`).
    * **Math:** `String * Integer` repeats the string. `String * Float` raises an error.
    * **Casting:** `float("3.5")` works, but `float("three")` fails.
* **Booleans:**
    * Used in conditional logic.
    * `True` equates to 1, `False` to 0.

### 4. Operators
**Conditional Operators**
| Symbol | Meaning |
| :--- | :--- |
| `==` | Equal to |
| `!=` | Not equal to |
| `<` / `<=` | Less than / Less than or equal |
| `>` / `>=` | Greater than / Greater than or equal |

**Logical & Identity Operators**
* **Logical:** `and`, `or`, `not`
* **Identity:** `is`, `is not` (Checks if two variables point to the same object in memory, not just equal values).
* **Membership:** `in`, `not in` (Checks if a value exists in a sequence like a list or string).

---

## II. Data Structures

### 1. Strings & Slicing
* **Escape Characters:**
    * `\n`: Newline
    * `\t`: Tab
    * `\'`: Single quote (inside single-quoted string)
    * `\\`: Backslash
* **Slicing Syntax:** `iterable[start:stop:step]`
    * First `x` entries: `[:x]`
    * Last `y` entries: `[-y:]`
    * Reverse string: `[::-1]`

### 2. Lists vs. Dictionaries
* **Lists:** Ordered, mutable sequences. Accessed by integer index.
* **Dictionaries:** Key-Value pairs `{key: value}`. Unordered (conceptually). Accessed by Key.
    * *Note:* Keys must be immutable (strings, numbers, tuples).

---

## III. Pandas for Data Science

### 1. Core Components
* **DataFrame:** A table consisting of rows (records) and columns.
* **Series:** A single column (sequence of data). A DataFrame is essentially a collection of Series sharing an index.

### 2. Data Selection (Indexing)
* **`df.iloc[]` (Index-based):** Selects by integer position (0 to length-1).
    * Example: `df.iloc[0]` (First row).
* **`df.loc[]` (Label-based):** Selects by the name of the index/column.
    * Example: `df.loc['row_name', 'column_name']`.
* **Conditionals:** `df.loc[df.column_name == 'value']`.

### 3. Data Cleaning & Handling Nulls
* **Detection:** `pd.isnull()` (or `df.isnull()`) and `pd.notnull()`.
* **Correction:**
    * `fillna(value)`: Fills NaN with a specific value.
    * `replace(old, new)`: Swaps specific values.
* **Renaming:** `df.rename(columns={'old_name': 'new_name'})`.

### 4. Data Transformation
* **Summary:** `df.describe()` gives count, mean, std, min, max, etc.
* **Sorting:** `df.sort_values(by='column')`.
* **Mapping:**
    * `map()`: Used on **Series** to substitute each value with another.
    * `apply()`: Used on **Series** or **DataFrame** to apply a function across an axis.
* **Grouping:** `df.groupby('column').mean()` splits data into groups, applies a function, and combines results.

### 5. Combining Data
* **`concat()`**: Stacks dataframes (top-to-bottom or side-by-side). Good for similar structures.
* **`join()`**: Combines based on **index**.
* **`merge()`**: Combines based on **column values** (SQL-style joins: inner, outer, left, right).

---

