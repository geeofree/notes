---
title: "Chapter 1: Numbers"
description: "Integers and their properties"
---

# The Integers
The integers are a set that are comprised of $3$ subsets:

1. **Positive Integers** which is the set comprised of $\{1, 2, 3, 4, ... ,\}$
2. **Natural Numbers** which is the set comprised of $\mathbb{N} = \{0\} \cup \{1, 2, 3, 4, ...,\}$
3. **Negative Integers** which is the set comprised of $\{-1, -2, -3, -4, ...\}$

In summary:

$$
\begin{aligned}
\mathbb{Z} &= \{-1,-2,-3,-4,...\} \cup \mathbb{N}\\
           &= \{..., -4, -3, -2, -1, 0, 1, 2, 3, 4, ... \}
\end{aligned}
$$

# Operations: Addition & Subtraction

## Addition: Two Positive Integers
Adding two positive integers results in a new positive integer, for example:

$$
\begin{aligned}
5 + 7 &= 12\\
10 + 3 &= 13\\
3 + 5 &= 8
\end{aligned}
$$

Observe the very simple rule for addition with $0$, namely:

$$
0 + a = a + 0 = a
$$

Meaning adding any integer ($a$) by $0$ yields that number ($a$).

## Subtraction: Positive Integer + Negative Integer

Adding a positive integer with a negative integer has the following rules:

For any positive integer $a$ and any negative integer $b$:

1. If $a > b$ then $a + b$ is a positive integer.
2. If $a = b$ then $a + b$ is $0$.
3. If $a < b$ then $a + b$ is a negative integer.

**Examples**:

$$
\begin{aligned}
10 + (-5) &= 5\\
3 + (-3) &= 0 \\
10 + (-12) &= -2
\end{aligned}
$$

Adding by a negative number is also called **subtraction** and is commonly denoted using 
the following expression: $a - b$ where $a, b$ are positive integers.

The previous example can then be described as follows:

$$
\begin{aligned}
10 - 5 &= 5\\
3 - 3 &= 0 \\
10 - 12 &= -2
\end{aligned}
$$

## Subtraction: Negative Integers + Negative Integers

Subtracting two negative integers always results in a larger negative integer.

**Examples**:

$$
\begin{aligned}
-1 - 1 &= -2\\
-8 - 7 &= -15\\
-10 + (-18) &= -28
\end{aligned}
$$

## Rules for addition

### Commutativity
If $a, b$ are integers then:

$$
a + b = b + a
$$

**For example**:

$$
\begin{aligned}
5 + 3 = 3 + 5 &= 8\\
-2 + 5 = 5 - 2 &= 3\\
-3 - 4 = -4 - 3 &= -7
\end{aligned}
$$

### Associativity
If $a, b, c$ are integers, then:

$$
(a + b) + c = a + (b + c)
$$

**For example**:

$$
\begin{aligned}
(3 + 5) + 9 = 8 + 9 &= 17\\
3 + (5 + 9) = 3 + 14 &= 17
\end{aligned}
$$

Associativity also works for negative integers:

$$
\begin{aligned}
(-2 - 3) - 4 = -5 - 4 &= -9\\
-2 + (-3 - 4) = -2 - 7 &= -9
\end{aligned}
$$

# Sign Inversion

If $a + b = 0$, then $b = -a$ and $a = -b$.

To prove this:

1. Subtract both sides by $-a$: $-a + a + b = 0 - a$, which yields to $b = -a$. 
   This proves the first part.
2. To prove the second part, invert $b$ to its negative form, then we get $-b = -(-a)$ 
   which yields to $-b = a$, proving the second part of the statement.

The expression $a = -(-a)$ is true because $a + (-a) = 0$. Applying $a + b = 0$ where 
$b = -a$ this means:

1. If $b$ is negative, then $-a$ is positive (which means $-(-a)$ is positive ie. $-b = -(-a)$).
2. If $b$ is positive, then $-a$ is negative.

As a consequence:

$$
-(a + b) = -a + (-b)
$$

or

$$
-(a + b) = -a - b
$$

**Proof**

Remember that if $x, y$ are integers, then $x = -y$ and $y = -x$ means that $x + y = 0$.
To prove the assertion that $-(a + b) = -a - b$, we must show that:

$$
(a + b) + (-a - b) = 0
$$

Where $x = -y = (a + b)$ and $y = -x = (-a - b)$.

This is done by the ff.

$$
\begin{aligned}
(a + b) + (-a - b) &= a + b - a - b\\
                   &= a - a + b - b\\
                   &= 0 + 0\\
                   &= 0
\end{aligned}
$$

Which proves the formula.

**Examples**:

$$
\begin{aligned}
-(3 + 5) = -3 - 5 &= -8\\
-(-2 + 3) = -(-2) - 3 = 2 - 3 &= -1\\
-(3 - 7) = -3 - (-7) = -3 + 7 &= 4
\end{aligned}
$$

# Law of Cancellation in Addition

If we have the relationship between three numbers:

$$
a + b = c
$$

then we can derive other relationships between them. For instance, adding $-b$ on both sides 
of this equation we get:

$$
\begin{aligned}
a + b - b &= c - b\\
a + 0 &= c - b
\end{aligned}
$$

Similarly we can conclude that,

$$
\begin{aligned}
a - a + b &= c - a\\
0 + b &= c - a
\end{aligned}
$$

For instance, if

$$
x + 3 = 5
$$

then

$$
\begin{aligned}
x + 3 &= 5\\
x + 3 - 3 &= 5 - 3\\
x + 0 &= 2 \\
x &= 2
\end{aligned}
$$

# Operations: Multiplication
Multiplication means adding a number to itself several times.

Let $a, b$ be some numbers, then their multiplication would be:

$$
a \cdot b
$$

or simply denoted as just:

$$
ab
$$

where $a$ is added to itself $b$ number of times.

**For example**:

$$
\begin{aligned}
4 + 4 = 4 \cdot 2 &= 8\\
2 + 2 + 2 = 2 \cdot 3 &= 6\\
13 + 13 + 13 + 13 = 13 \cdot 4 &= 52
\end{aligned}
$$

## Rules for Multiplication

For any integer $a$, the rules of multiplying by $1$ and $0$ are:

$$
\begin{aligned}
1a = a\\
0a = 0
\end{aligned}
$$

Let $a, b, c$ be some number, then these properties follow:

### Commutativity

$$
ab = ba
$$

### Associativity

$$
(ab)c = a(bc)
$$

Using these properties we can now do something which is often useful: 
*multiplying constants*.

**For example:**

$$
\begin{aligned}
(2a)(3b) &= 2(a(3b))\\
         &= 2(3a)b\\
         &= (2\cdot3)ab\\
         &= 6ab
\end{aligned}
$$

### Distributivity

$$
a(b + c) = ab + ac
$$

### Inverse

$$
(-1)a = -a
$$

$$
-(ab) = (-a)b = a(-b)
$$

### Two Negatives make a Positive

$$
(-a)(-b) = ab
$$

# Powers
Multiplying a number with itself several times is called getting the **power** of that 
number.

**For example:**

$$
\begin{aligned}
aa &= a^{2}\\
aaa &= a^{3}\\
aaaaa &= a^{4}
\end{aligned}
$$

Or in general, given some number $a$ and a positive integer $n$:

$$
a^{n} = aaa...a
$$

## Rules for Powers

If $m, n$ are positive integers, then:

### Adding Powers

$$
a^{m + n} = a^{m}a^{n}
$$

**For example:**

$$
\begin{aligned}
a^{2}a^{3} &= (aa)(aaa) = a^{2 + 3} = aaaaa = a^{5}\\
(4x)^{2} &= 4x \cdot 4x = 4\cdot4xx = 16x^{2}\\
(7x)(2x)(5x) &= 7\cdot2\cdot5xxx = 70x^{3}
\end{aligned}
$$

### Multiplying Powers

$$
(a^{m})^{n} = a^{mn}
$$

> The following three formulas are used constantly. They are so important that they 
> should be thoroughly memorized!

$$
(a + b)^{2} = a^{2} + 2ab + b^{2}
$$

$$
(a - b)^{2} = a^{2} - 2ab + b^{2}
$$

$$
(a + b)(a - b) = a^{2} - b^{2}
$$

# Rational Numbers
Given two numbers $m, n$ where $n \neq 0$. A rational number is the fraction of these two 
numbers:

$$
\frac{m}{n}
$$

**For example**:

$$
\frac{1}{4},
\frac{2}{5},
\frac{7}{3}
$$

## Rule for Cross-Multiplying

Let $m, n, r, s$ be integers and assume that $n \neq 0$ and $s \neq 0$. Then:

$$
\frac{m}{n} = \frac{r}{s} \Leftrightarrow ms = rn
$$

**For example**:

$$
\frac{1}{2} = \frac{2}{4}
$$

because

$$
1\cdot4 = 2\cdot2
$$

We shall make no distinction between an integer $m$ and the rational number $\frac{m}{1}$.
Therefore:

$$
m = \frac{m}{1}
$$

## Cancellation Rule for Fractions

Let $a$ be a non-zero integer. Let $m, n$ be integers, where $n \neq 0$. Then:

$$
\frac{am}{an} = \frac{m}{n}
$$

Also observe that:

$$
\frac{-m}{n} = \frac{m}{-n}
$$

via this proof which uses the cross-multiplying rule:

$$
(-m)(-n) = mn
$$

## Divisibility
The cancellation rule corrolary provides the notion of divisibility where given some 
integer $d$, it is the common divisor of $m, n$.

$$
\frac{m}{n} = \frac{dm}{dn} = \frac{r}{s}
$$

**For example**:

$$
\frac{2}{3} = \frac{5\cdot2}{5\cdot3} = \frac{10}{15}
$$

## Common Denominator

Let $\frac{m}{n}$ and $\frac{r}{s}$ be rational numbers, expressed as quotients of 
integers. We can put these rational numbers over a common denominator $ns$ by writing.

$$
\frac{m}{n} = \frac{ms}{ns}
$$

and

$$
\frac{r}{s} = \frac{nr}{ns}
$$

**For example**:

We can put $\frac{3}{5}$ and $\frac{5}{7}$ over the common denominator $5\cdot7 = 35$, 
we write:

$$
\frac{3}{5} = \frac{3\cdot7}{5\cdot7} = \frac{21}{35}
$$

and

$$
\frac{5}{7} = \frac{5\cdot5}{7\cdot5} = \frac{25}{35}
$$

This leads us to the formula for adding rational numbers:

$$
\frac{a}{d} + \frac{b}{d} = \frac{a + b}{d}
$$

**For example**:

$$
\frac{-3}{8} + \frac{2}{8} = \frac{-3 + 2}{8} = \frac{-1}{8}
$$

When the rational numbers do not have a common denominator then we can get the formula by 
each side via their respective denominators ie.

$$
\frac{m}{n} = \frac{sm}{sn}
$$

and

$$
\frac{r}{s} = \frac{nr}{ns}
$$

**For example**:

$$
\frac{3}{5} + \frac{5}{7} = \frac{3\cdot7}{5\cdot7} + \frac{5\cdot5}{7\cdot5} = \frac{21}{35} + \frac{25}{35} = \frac{21 + 25}{35} = \frac{46}{35}
$$

Observe that dividing by $0$ has the property:

$$
\frac{0}{n} = 0
$$

For any integer $n \neq 0$.

## Multiplying Rational Numbers
Multiplying rational numbers simply involves multiplying their numerators and multiplying 
their denominators respectively.

$$
\frac{m}{n} \cdot \frac{r}{s} = \frac{mn}{rs}
$$

**For example**:

$$
\frac{3}{5} \cdot \frac{7}{8} = \frac{3\cdot7}{5\cdot8} = \frac{21}{40}
$$

Powers should work the same:

$$
(\frac{r}{s})^{n} = \frac{r^{n}}{s^{n}}
$$

**For example**:

$$
(\frac{2}{5})^{3} = \frac{2^{3}}{5^{3}} = \frac{8}{125}
$$

# Multiplicative Inverses
Rational numbers satisfy one property which is not satisfied by integers, namely:

*If $a$ is a rational number $\neq 0$, then there exists a rational number denoted by,*
*$a^{-1}$, such that*

$$
a^{-1}a = aa^{-1} = 1
$$

Indeed, if $a = \frac{m}{n}$ where $m, n$ are integers and $n \neq 0$, then $a^{-1} - \frac{n}{m}$ 
because:

$$
\frac{m}{n} \cdot \frac{n}{m} = \frac{mn}{mn} = 1
$$

We call $a^{-1}$ the **multiplicative inverse of $a$**.

**Example**:

The multiplicative inverse of $\frac{1}{2} = \frac{2}{1} = 2$ because:

$$
2\cdot\frac{1}{2} = 1
$$

The multiplicative inverse of $\frac{2}{3} = \frac{3}{2}$ and the multiplicative inverse of 
$-\frac{5}{7} = -\frac{7}{5}$.

*Observe that if $a$ and $b$ are rational numbers such that:*

$$
ab = 1
$$

*then*

$$
b = a^{-1}
$$

**Proof**: We multiply both sides of the relation $ab = 1$ by $a^{-1}$ and get:

$$
a^{-1}ab = a^{-1}\cdot1 = a^{-1}
$$

Which means

$$
b = a^{-1}
$$

This rule allows us to divide fractions with other fractions, for example:

$$
\frac{\frac{3}{4}}{\frac{5}{7}} = \frac{3}{4}(\frac{5}{7})^{-1} = \frac{3}{4}\cdot\frac{7}{5} = \frac{21}{20}
$$

## Cross-multiplication
Let $a, b, c, d$ be rational numbers where $b,d \neq 0$.

$$
\frac{a}{b} = \frac{c}{d} \rightarrow ad = bc
$$

$$
ad = bc \rightarrow \frac{a}{b} = \frac{c}{d} 
$$
