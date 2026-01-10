---
title: Cheatsheet -- Python & Pandas
description: Cheatsheet
---

### Python Syntax & Operators

| Category | Operator | Description | Example |
| :--- | :--- | :--- | :--- |
| **Arithmetic** | `+` `-` `*` `/` | Basic Math | `10 / 2 = 5.0` |
| | `//` | Floor Division (removes decimal) | `10 // 3 = 3` |
| | `%` | Modulus (remainder) | `10 % 3 = 1` |
| | `**` | Exponentiation (Power) | `2 ** 3 = 8` |
| **Assignment** | `=` | Assign value | `x = 5` |
| | `+=` `-=` | Increment/Decrement | `x += 1` |
| | `:=` | Walrus (assign inside expression) | `if (n := len(a)) > 10:` |
| **Comparison** | `==` `!=` | Equal / Not Equal | `x == 5` |
| | `>` `<` | Greater / Less than | `x > 10` |
| **Logical** | `and` | Both must be True | `True and False` -> `False` |
| | `or` | One must be True | `True or False` -> `True` |
| | `not` | Inverts Boolean | `not True` -> `False` |
| **Identity** | `is` | Same object in memory? | `x is None` |
| **Membership**| `in` | Exists in sequence? | `'a' in 'apple'` |

### Data Structures

| Type | Syntax | Mutable? | Access |
| :--- | :--- | :--- | :--- |
| **List** | `[1, 2, "a"]` | Yes | `x[0]` |
| **Tuple** | `(1, 2, "a")` | No | `x[0]` |
| **Dict** | `{'k': 'v'}` | Yes | `x['k']` |
| **Set** | `{1, 2, 3}` | Yes | N/A (Unordered) |

### Pandas Cheat Sheet

#### 1. Inspection
```python
df.head(n)          # First n rows
df.shape            # (rows, columns)
df.info()           # Index, Datatype, Memory info
df.describe()       # Statistical summary
df.columns          # List of column names
```

#### 2. Selection
```python
df['col']           # Returns Series
df[['c1', 'c2']]    # Returns DataFrame
df.iloc[0]          # Selection by position (Integer)
df.loc['index_val'] # Selection by Label
df[df['col'] > 5]   # Boolean conditional selection
```

#### 3. Cleaning & Manipulation
```python
df.isnull().sum()            # Count nulls per column
df.dropna()                  # Drop rows with nulls
df.fillna(value)             # Fill nulls
df.astype(dtype)             # Change data type
df.sort_values(by='col')     # Sort
df.groupby('col').mean()     # Group and aggregate
```

#### 4. Combining Data
| Method | Use Case |
| :--- | :--- |
| `pd.concat([df1, df2])` | Stacking dataframes vertically or horizontally. |
| `df1.merge(df2)` | Database-style join on a common column. |
| `df1.join(df2)` | Joining based on the Index. |

---

### **Zen of Python (abridged)**
> *Explicit is better than implicit.*
> *Simple is better than complex.*
> *Readability counts.*