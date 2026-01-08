---
title: Python - From Scratch to Expert
description: A guide to python.
---

# Arithmetic 

Python utilizes the **PEMDAS** rule for arithmetic operations, i.e., 
**P**arenthesis
**E**xponential
**M**ultiplication
**D**ivision
**A**ddition
**S**ubtraction, 
in that order (top to bottom).

|Operator|Name|Description|
|---|---|---|
|`a + b`|Addition|Sum of `a` and `b`|
|`a - b`|Subtraction|Difference of `a` and `b`|
|`a * b`|Multiplication|Product of `a` and `b`|
|`a / b`|True division|Quotient of `a` and `b`|
|`a // b`|Floor division|Quotient of `a` and `b`, removing fractional parts|
|`a % b`|Modulus|Integer remainder after division of `a` by `b`|
|`a ** b`|Exponentiation|`a` raised to the power of `b`|
|`-a`|Negation|The negative of `a`|

In Python, comments are denoted using # at the beginning.

Python function template -
def function_name (input_variable):
	 ---computational statements---
	 return output_variable

In Python, scope is managed/defined using indentations (tab-space) with local/global scope applicable (inside a function/class or global declaration)

Peculiar and Important Factors around Data Types 
- Cannot Multiply String with Float (but String * Integer works)
- Type casting is possible, however it does not "automatically" do calculations for complicated conversions (character string to float does not work, but numerical string to float will)
- Strings can have 0 length (empty quotation marks)
- Boolean data type can be utilized using conditional operators in assignment (>, <, not)

Conditional Operators

| **Symbol** | **Meaning**              |
| ---------- | ------------------------ |
| ==         | equals                   |
| !=         | does not equal           |
| <          | less than                |
| <=         | less than or equal to    |
| >          | greater than             |
| >=         | greater than or equal to |

List Slicing -
- to pull the first `x` entries, you use `[:x]`
- to pull the last `y` entries, you use `[-y:]`

Docstrings (""" """) are utilized to provide descriptions for functions (defined)


Print statement in python have an attribute (sep) that can be utilized. Default is a single space.

It is possible to add default values to functions input_variable to avoid errors.


| Operator                                                                                                                                                                                                                                                                                                            | Description                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `(expressions...)`,<br><br>`[expressions...]`, `{key: value...}`, `{expressions...}`                                                                                                                                                                                                                                | Binding or parenthesized expression, list display, dictionary display, set display                                                          |
| `x[index]`, `x[index:index]`, `x(arguments...)`, `x.attribute`                                                                                                                                                                                                                                                      | Subscription, slicing, call, attribute reference                                                                                            |
| [`await x`](https://docs.python.org/3/reference/expressions.html#await)                                                                                                                                                                                                                                             | Await expression                                                                                                                            |
| `**`                                                                                                                                                                                                                                                                                                                | Exponentiation [[5]](https://docs.python.org/3/reference/expressions.html#id23)                                                             |
| `+x`, `-x`, `~x`                                                                                                                                                                                                                                                                                                    | Positive, negative, bitwise NOT                                                                                                             |
| `*`, `@`, `/`, `//`, `%`                                                                                                                                                                                                                                                                                            | Multiplication, matrix multiplication, division, floor division, remainder [[6]](https://docs.python.org/3/reference/expressions.html#id24) |
| `+`, `-`                                                                                                                                                                                                                                                                                                            | Addition and subtraction                                                                                                                    |
| `<<`, `>>`                                                                                                                                                                                                                                                                                                          | Shifts                                                                                                                                      |
| `&`                                                                                                                                                                                                                                                                                                                 | Bitwise AND                                                                                                                                 |
| `^`                                                                                                                                                                                                                                                                                                                 | Bitwise XOR                                                                                                                                 |
| `\|`                                                                                                                                                                                                                                                                                                                | Bitwise OR                                                                                                                                  |
| [`in`](https://docs.python.org/3/reference/expressions.html#in), [`not in`](https://docs.python.org/3/reference/expressions.html#not-in), [`is`](https://docs.python.org/3/reference/expressions.html#is), [`is not`](https://docs.python.org/3/reference/expressions.html#is-not), `<`, `<=`, `>`, `>=`, `!=`, `== | Comparisons, including membership tests and identity tests                                                                                  |
| [`not x`](https://docs.python.org/3/reference/expressions.html#not)                                                                                                                                                                                                                                                 | Boolean NOT                                                                                                                                 |
| [`and`](https://docs.python.org/3/reference/expressions.html#and)                                                                                                                                                                                                                                                   | Boolean AND                                                                                                                                 |
| [`or`](https://docs.python.org/3/reference/expressions.html#or)                                                                                                                                                                                                                                                     | Boolean OR                                                                                                                                  |
| [`if`](https://docs.python.org/3/reference/expressions.html#if-expr) – `else`                                                                                                                                                                                                                                       | Conditional expression                                                                                                                      |
| [`lambda`](https://docs.python.org/3/reference/expressions.html#lambda)                                                                                                                                                                                                                                             | Lambda expression                                                                                                                           |
| `:=`                                                                                                                                                                                                                                                                                                                | Assignment expression                                                                                                                       |


In python, attributes can be called using dot (.) with attribute name (e.g., imag). Methods can also be called with variables but require parentheses at the end (e.g., bit_length() )

Zen of Python:
	Readability counts.  
	Explicit is better than implicit.

String helper-

|What you type...|What you get|example|`print(example)`|
|---|---|---|---|
|`\'`|`'`|`'What\'s up?'`|`What's up?`|
|`\"`|`"`|`"That's \"cool\""`|`That's "cool"`|
|`\\`|`\`|`"Look, a mountain: /\\"`|`Look, a mountain: /\`|
|`\n`||`"1\n2 3"`|`1`  <br>`2 3`|

Strings are very similar to lists but are immutable.

Dictionaries are a built-in data structure that form {'key' : value} pairs

