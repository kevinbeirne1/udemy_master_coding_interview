# Data Structures and Algorithms
This repo collates the exercises and problems created as part of the Udemy course ["Master the Coding Interview: Data Structures + Algorithms"](https://www.udemy.com/course/master-the-coding-interview-data-structures-algorithms/)

## Contents
- [Why](#why)
- [Repo Structure](#repo-structure)
- [Big O](#big-o)
- [Interview](#interview)
- [Data Structures](#data-structures)


## Why
Up to this point I have had only cursory engagement with data structures and algorithms. 
On the recommendation of a friend I decided to take this course. 

## Repo Structure
The repo has python and javascript directories that contains code for the same problems solved in both javascript and python. 
The udemy course is taught in javascript, and at this point in time python is my primary coding language
I decided to try challenge myself by solving in both languages to increase my proficiency in Javascript, and to better understand how to translate concepts from one language to the other

## Big O
See [Big_O-Cheat_sheet.md](https://github.com/kevinbeirne1/udemy_master_coding_interview/blob/main/Big_O-Cheat_sheet.md) for concise summary of Big O information
### Big O Rules
- *Calculate for worst case*

If looping through list assume the target item is not in the list (or is the last element) and assume that the target list is infinitely large.
Eg: 
```
for item in list:
    if item == "name":
        break
 ```
We assume the function will check every element before exiting the loop with break. 
This code is more efficient than a loop without the `break` but it is still O(n).
In the worst case scenario we have to check every item in the list 

- *Multiple Inputs get different terms*

If function has multiple inputs we have to use O(a), O(b), etc. instead of O(n)
Eg:
```
for item in list1:
    pass
for item in list2:
    pass
```
In this case we loop `list1` in O(a) time complexity and `list2` in O(b).
So our final O(n) would be `O(a + b)`

- *Drop constants*

If time complexity is `2 * O(n)` we drop the constants and say that time complexity is `O(n)`. 
Assuming worst case of a very large n, the constants have less of an impact of the time complexity.
As n -> infinity, `2 * infinity` is still infinity, and we can therefore say the time complexity is going to be O(n)

- *Ignore lower order terms*

If time complexity is `O(n**2) + O(n) + O(1)` we ignore `O(n)` and `O(1)`. 
As n increases the lower order terms will have minimal impact on time complexity.
Eg: at n = 5: O(n) -> 25 + 5 + 1, the `O(n**2)` already accounts for ~83% of the time complexity

- *Nested Loops*

If loops are nested we multiply the time complexity of each level.
Eg:
```
for item1 in list:
    for item2 in list:
        pass
```
is O(n**2) 

```
for item1 in list1:
    for item2 in list2:
        pass
```
is O(a * b)

## Interview
See [interview_cheat_sheet.md](https://github.com/kevinbeirne1/udemy_master_coding_interview/blob/main/interview_cheat_sheet.md) for more information


### Interviewer's Objectives
The interviewer is looking to gauge the persons
- Analytics Skills
- Coding Skills
- Technical Knowledge
- Communication Skills
How the person communicates during the technical interview will give the interviewer a sense of the levels for each.

## Data Structures
**NOTE** This is not an exhaustive list, merely the ones most likely to be used/asked in an interview

- ### ARRAYS
Data stored in a list with no gaps in memory. 
Accessing by index, appending to and pop from the end of the list is very quick. 
Deleting/Inserting an item requires iterating over the list and shifting all the memory locations/keys. 

| Operation | Time Complexity |
|--- | --- |
| Append | O(1) |
| Pop | O(1) |
| Access | O(1) |
| Insert | O(n) |
| Delete | O(n) |
| Search | O(n) |

- ### HASH TABLES
Data 'randomly' stored using a hash function to generate a memory location from the key. 
Accessing by the key, insertion and deletion are very quick.
Occasionally a hash collision can increase time complexity but only rarely.

| Operation | Time Complexity |
|--- | --- |
| Search | O(1) |
| Insert | O(1) |
| Delete | O(1) |

- ### LINKEDLIST
Each item in the list points to the next item. Append and prepend to list is very quick.

| Operation | Time Complexity |
|-----------|-----------------|
| Append    | O(1)            |
| Prepend   | O(1)            |
| Lookup    | O(n)            |
| Insert    | O(n)            |
| Delete    | O(n)            |


- ### STACK
Last In First Out (LIFO) data struction, is akin to a stack of plates. 
Each new item goes to the top of the stack, and we take from the top when removing.

| Operation | Time Complexity |
|-----------|-----------------|
| Push      | O(1)            |
| Pop       | O(1)            |
| Peek      | O(1)            |
| Lookup    | O(n)            |

- ### QUEUE
First In First Out (FIFO) data struction, is akin to a line at a cash register. 
Each new item goes to the back of the queue, and we take from the front when removing.

| Operation | Time Complexity |
|-----------|-----------------|
| Enqueue   | O(1)            |
| Dequeue   | O(1)            |
| Peek      | O(1)            |
| Lookup    | O(n)            |

- ### BINARY SEARCH TREE
Starting from a single node, which can have up to two direct children. 
All numbers to the left side of the node are less than the node value.
All numbers to the right are greater than the node value. 
Each subsequent child node has the same structure

```
Example:
     9
   /   \
  4     20
 / \   /  \
1   6 15  40
```

| Operation | Time Complexity |
|-----------|-----------------|
| Lookup    | O(log(n))       |
| Insert    | O(log(n)        |
| Delete    | O(log(n)        |