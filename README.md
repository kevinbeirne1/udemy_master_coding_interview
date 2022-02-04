# Data Structures and Algorithms
This repo collates the exercises and problems created as part of the Udemy course ["Master the Coding Interview: Data Structures + Algorithms"](https://www.udemy.com/course/master-the-coding-interview-data-structures-algorithms/)

## Contents
- [Why](#why)
- [Repo Structure](#repo-structure)
- [Big O](#big-o)
- [Interview](#interview)
- [Data Structures](#data-structures)
    - [Arrays](#arrays)
    - [Hash Tables](#hash-tables)
    - [Linked Lists](#linked-lists)
    - [Stacks](#stacks)
    - [Binary Search Trees](#binary-search-trees)
    - [Binary Heaps](#binary-heaps)
    - [Graphs](#graphs)
- [Algorithms](#algorithms)
  - [Recursion](#recursion)
  - [Sorting](#sorting)
  - [Searching](#searching)
  - [Memoization](#memoization)


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

- ### LINKED LISTs
Each item in the list points to the next item. Append and prepend to list is very quick.

| Operation | Time Complexity |
|-----------|-----------------|
| Append    | O(1)            |
| Prepend   | O(1)            |
| Lookup    | O(n)            |
| Insert    | O(n)            |
| Delete    | O(n)            |


- ### STACKs
Last In First Out (LIFO) data struction, is akin to a stack of plates. 
Each new item goes to the top of the stack, and we take from the top when removing.

| Operation | Time Complexity |
|-----------|-----------------|
| Push      | O(1)            |
| Pop       | O(1)            |
| Peek      | O(1)            |
| Lookup    | O(n)            |

- ### QUEUEs
First In First Out (FIFO) data struction, is akin to a line at a cash register. 
Each new item goes to the back of the queue, and we take from the front when removing.

| Operation | Time Complexity |
|-----------|-----------------|
| Enqueue   | O(1)            |
| Dequeue   | O(1)            |
| Peek      | O(1)            |
| Lookup    | O(n)            |

- ### BINARY SEARCH TREES
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

- ### BINARY HEAPS
Can be either a max or min heap. 
Min Heap: Tree where each parent node is greater than both it's children
Min Heap: Tree where each parent node is less than both it's children


| Operation | Time Complexity |
|-----------|-----------------|
| Lookup    | O(n)            |
| Insert    | O(log(n)        |
| Delete    | O(log(n)        |

- ### GRAPHS
Graphs can be described by a number of terms:

    - Cyclic/Acyclic: Can/can't return to the start point without doubling back
    - Directed/Undirected: Can/can't move only in specified direction between nodes
    - Weighted/Unweighted: Vertex between nodes has/hasn't a weight associated

## Algorithms

- ### RECURSION
A function that calls itself. Recursion needs a break case to prevent infinite loop and a subsequent stack overflow.
Any recursive function can be written as an iterative function. 
Recursion is often preferred when the number of loops is unknown/variable, eg tree traversal, sorting, searching, etc.

- ### SORTING

  - #### Use Cases 

| Sort Type | When to Use                                           |
|-----------|-------------------------------------------------------|
| Bubble    | Only for teaching tool                                |
| Selection | Only for teaching tool                                |
| Insertion | Small Dataset and mostly sorted                       |
| Merge     | If time complexity is key factor                      |
| Quick     | If space complexity is key factor                     |
| Heap      | If both time and space complexity are key             |
| Counting  | When dealing with fixed range of integers             |
| Radix     | When dealing with with range of multi-figure integers |



  - #### Bubble Sort
Loop through the list comparing each item to the next. 
If current item greater swap positions with next item. 
Continue comparing items until reach the end of the list, and then restart the process
The larger items will bubble up to the end of the list, with each iteration.
```
eg:
6, 5, 3, 1, 8, 7, 2, 4

1st Loop
    [6 > 5] 3, 1, 8, 7, 2, 4 -> 5, 6, 3, 1, 8, 7, 2, 4
    5, [6 > 3] 1, 8, 7, 2, 4 -> 5, 3, 6, 1, 8, 7, 2, 4
    5, 3, [6 > 1] 8, 7, 2, 4 -> 5, 3, 1, 6, 8, 7, 2, 4
    5, 3, 1, [6 < 8] 7, 2, 4 -> 5, 3, 1, 6, 8, 7, 2, 4
    5, 3, 1, 6 [8 > 7], 2, 4 -> 5, 3, 1, 6, 7, 8, 2, 4
    ...

2nd Loop
    [5 > 3] 1, 6, 7, 2, 4, 8 -> 3, 5, 1, 6, 7, 2, 4, 8
    ...
    3, 1, 5, 6, 2, [7 > 4], 8 -> 3, 1, 5, 6, 2, 4, 7, 8

...
```
Time complexity of O(n ** 2), space complexity of O(1)

  - #### Selection Sort
Loop through the list finding the smallest item. 
Swap that item with the 0 index item.
Search for the next smallest item and swap that with the next index.
Continue until at the end of the list

```
eg: 8, 5, 2, 6, 9, 3, 1, 4, 0, 7

8, 5, 2, 6, 9, 3, 1, 4, [0], 7
^________________________|
0, 5, 2, 6, 9, 3, [1], 4, 8, 7
   ^_______________|
0, 1, [2], 6, 9, 3, 5, 4, 8, 7
       ^
0, 1, 2, 6, 9, [3], 5, 4, 8, 7
         ^______|
0, 1, 2, 3, 9, 6, 5, [4], 8, 7
            ^_________|
...
```
Time complexity of O(n ** 2), space complexity of O(1)


  - #### Insertion Sort
Start at the first item at the list and leave in position.
Move to next item, if greater than previous item leave where it is and move to the next.
If it's less, shift all that numbers greater than it in the sorted array to the right, and insert it there.
Continue through all the items, inserting each into the correct position in the previous sorted items

``` 
eg: 6, 5, 3, 1, 8, 7, 2, 4

  {6}, 5, 3, 1, 8, 7, 2, 4  --> [6], 5, 3, 1, 8, 7, 2, 4
   ^
  [6], {5}, 3, 1, 8, 7, 2, 4  --> [5, 6], 3, 1, 8, 7, 2, 4
 ^______|
  [5, 6], {3}, 1, 8, 7, 2, 4  --> [3, 5, 6], 1, 8, 7, 2, 4
 ^_________|
  [3, 5, 6], {1}, 8, 7, 2, 4  --> [1, 3, 5, 6], 8, 7, 2, 4
 ^____________|
 
 ```
Time complexity of O(n ** 2), space complexity of O(1).
Time complexity approaches O(n) if data is almost sorted


  - #### Merge Sort
Repeatedly divide the list is half until each sublist contains only one item.
Compare the first two items and put them in an ordered list.
Repeat for each individual pair.
Compare the items of the first and second two item sublists and put them in an ordered sublist
Repeat for each pair of two item sublists
Repeat the comparision of larger sublists until all the items have been merged

```
eg: 6, 5, 3, 1, 8, 7, 2, 4

SUBDIVIDE:

[6, 5, 3, 1, 8, 7, 2, 4] --> [6, 5, 3, 1], [8, 7, 2, 4]

[6, 5, 3, 1], [8, 7, 2, 4] --> [6, 5], [3, 1], [8, 7], [2, 4]

[6, 5], [3, 1], [8, 7], [2, 4] --> [6], [5], [3], [1], [8], [7], [2], [4]

COMPARE AND MERGE
1st Layer:
  [6] > [5] --> [5, 6]
  [3] > [1] --> [1, 3] 
  [8] > [7] --> [7, 8] 
  [2] < [4] --> [2, 4]

[6], [5], [3], [1], [8], [7], [2], [4] --> [5, 6], [1, 3], [7, 8], [2, 4]


2nd Layer:
  
  Merge: [5, 6], [1, 3]
    [5] > [1] --> [1, ...]
    [5] > [3] --> [1, 3, ...]
    [5] < [ ] --> [1, 3, 5, ...]
    [7] < [ ] --> [1, 3, 5, 7]
  
  Merge: [7, 8], [2, 4]
    [7] > [2] --> [2, ...]
    [7] > [4] --> [2, 4, ...]
    [7] < [ ] --> [2, 4, 7, ...]
    [8] < [ ] --> [2, 4, 7, 8]

[5, 6], [1, 3], [7, 8], [2, 4] --> [1, 3, 5, 7] --> [2, 4, 7, 8]


3rd Layer:
  Merge: [1, 3, 5, 7], [2, 4, 7, 8]
    [1] > [2] --> [1, ...]
    [3] > [2] --> [1, 2, ...]
    [3] < [4] --> [1, 2, 3, ...]
    [5] > [4] --> [1, 2, 3, 4 ...]
    ...
[1, 3, 5, 7], [2, 4, 7, 8] --> [1, 2, 3, 4, 5, 6, 7, 8]
```

Time complexity of O(n log(n)), space complexity of O(n)

  - #### Quick Sort
A pivot point is chosen. 
The list is iterated through and all items less than pivot go to it's left, and greater to it's right.
QuickSort is then recursively applied to the sublists to the left and right of the pivot


Note: There are many ways of choosing the pivot and separating the numbers to the left/right
```
eg: 6, 5, 3, 1, 8, 7, 2, 4 

4 picked as the partion
Iterate through the list and separate left/right


6, 5, 3, 1, 8, 7, 2, [4] --> 2, 5, 3, 1, 8, 7, [4], 6 
^_____________________|
    {4 < 6} --> swaped 2 & 6, then swaped 4 & 6
    
2, 5, 3, 1, 8, 7, [4], 6 --> 2, 5, 3, 1, 8, 7, [4], 6
^__________________|

2, 5, 3, 1, 8, 7, [4], 6 --> 2, 7, 3, 1, 8, [4], 5, 6
   ^_______________|
   
2, 7, 3, 1, 8, [4], 5, 6 --> 2, 8, 3, 1, [4], 7, 5, 6
   ^____________|
   
2, 8, 3, 1, [4], 7, 5, 6 --> 2, 1, 3, [4], 8, 7, 5, 6
   ^_________|

Process Repeat on sublists [2, 1, 3] & [8, 7, 5, 6]

```
Average Time Complexity O(n log(n)), space complexity of O(log(n)). 
Choice of pivot and whether the data is already sorted can lead to O(n ** 2) time complexity.
For example if the list is already sorted and pivot is chosen as the last item, there will be no divide and
conquer.


- #### Heap Sort
A Max Binary Heap is created from the Array (Min Heap can also be used to do heapsort).
The root node is swapped with the last node in the heap. 
This new last node is removed from consideration.
The new root is sifted down until a valid Max Heap.
The process repeats until all items are sorted

```
eg 6, 5, 3, 1, 8, 7, 2, 4 

BUILD MAX HEAP:
    
    
    6            6            8             8                 
   / \          / \          / \          /   \
  5   3   -->  8   3   -->  6   3   ...  6     7 
 / \          / \          / \          / \   / \
1   8        1   5        1   5        4   5 3   2
                                      /
                                     1 

  In array format: 
  6, 5, 3, 1, 8, 7, 2, 4 --> 8, 6, 7, 4, 5, 3, 2, 1

SWAP ROOT AND LAST:
       1                 
     /   \
    6     7 
   / \   / \
  4   5 3   2
 /
8 

  In array format: 
  8, 6, 7, 4, 5, 3, 2, 1 --> 1, 6, 7, 4, 5, 3, 2, [8] 
  
SIFT DOWN ROOT:
     1              7              7                             
   /   \          /   \          /   \ 
  6     7   -->  6     1   -->  6     3   
 / \   / \      / \   / \      / \   / \                   
4   5 3   2    4   5 3   2    4   5 1   2     

  In array Format:
  1, 6, 7, 4, 5, 3, 2, [8] --> 7, 6, 3, 4, 5, 1, 2, [8] 

REPEAT
     2              6              6                             
   /   \          /   \          /   \ 
  6     3   -->  2     3   -->  5     3   
 / \   /        / \   /        / \   /                    
4   5 1        4   5 1        4   2 1        

  In array Format:
  1, 6, 7, 4, 5, 3, 2, [8] --> 6, 5, 3, 4, 2, 1, [7, 8] 
```

Time complexity always O(n log(n)). Space complexity O(1)

- #### Counting Sort
Can use for array of integers.
Create an empty array O, equal in length to input array I.
Create an empty array A of length largest integer + 1.
Loop through the input array I, and for each item A[i] += 1 
Loop through array A, adding the previous items to the current item
Loop through items in I, setting O[A[i] - 1] = item, and decrementing A[i]


``` 
eg 1, 2, 4, 5, 2, 3, 3, 4, 0, 2, 5

Create an empty array O equal in length to I:
O = [None] * 11

Five is largest no --> Create an empty array O of length (5 + 1) 
A = [-1] * 6

Loop through I and increment the values in A:
i = 1, A[1] += 1 -> A = [0, 1, 0, 0, 0, 0]
i = 2, A[2] += 1 -> A = [0, 1, 1, 0, 0, 0]
...
A = [1, 1, 3, 2, 2, 2]

Loop through the array, adding previous items
A = [1, 2, 5, 7, 9, 11]

Loop through I, setting O[A[i] - 1] and decrementing A[i]
i = 1, A[1] = 2, O[A[i] - 1] -> O[1] = 1 --> O = [None, 1, None * 9]
i = 2, A[2] = 5, O[A[i] - 1] -> O[4] = 2 --> O = [None, 1, None, None, 2, None * 6]
i = 4, A[2] = 9, O[A[i] - 1] -> O[8] = 4 --> 
i = 5, A[5] = 11, O[A[i] - 1] -> O[10] = 5 --> 
i = 2, A[2] = 4, O[A[i] - 1] -> O[3] = 2 --> 

```

Time complexity O(n + k), where k is the largest integer. Space complexity of O(k)

- #### Radix Sort
Similar sorting mechanism to counting sort except is done by ordering by the ones place, then 10s, 1000s, etc

## Searching

- ### Linear Search
When data is in a linear structure (eg array), search through the data by looking at every item

- ### Binary Search
When the data is a binary search tree, only have to search through log(n) of the items to try find a match

- ### Breadth First Search/Traversal
Visit all the immediate child/neighbour nodes. 
Only move on to the next tier/layer after all the previous children have been visited

Good for finding the shortest path to a node. Space complexity required is a drawback

```
       9                 
     /   \
    4     20 
   / \   / \
  1   6 15  170
  
BFS Order of visit: 
  9 -> 4 -> 20 -> 1 -> 6 -> 15 -> 170
  ```

Worst Case Space complexity of O(n), as all elements may have to be added to a queue.
Time complexity of O(n)

- ### Depth First Search/Traversal
Follow a branch down to it's furthest depth. 
Then back track to the nearest unvisited fork and follow that to it's furthest

Good for checking if a path exists between two nodes. Gets slower the deeper the graph

```
       9                 
     /   \
    4     20 
   / \   / \
  1   6 15  170
  
  
DFS Order of visit: 
  1 -> 6 -> 4 -> 5 -> 7 -> 3 -> 2
  

Tree can be traversed
  - In Order: in increasing size 
      1, 4, 6, 9, 15, 20, 170
  - Pre Order: Starting at root to lowest left, then moving right
      9, 4, 1, 6, 20, 15, 170
  - Post Order: Starting at lowest left, traverse all children then move up
      1, 6, 4, 15, 170, 20, 9
  ```
If using recursion, worst case Space complexity of O(h). 
The max number of recursions is equal to the height of the tree.
Time complexity of O(n)

- ### Dijkstra's Algorithm
Find the shortest path between two nodes

  1. Create an empty set for visited nodes.
  2. Create a min binary heap as queue
     (Min binary heap will mean that the next closest node will always be at index 0)
  3. Assign a tentative distance to all starting nodes as infinity.
  4. Select the first node in the queue
  5. If the selected node is visited remove from queue and move to next in queue
  6. For the current node, look at all unvisited neighbouring nodes. 
  Calculate their cost/distance through the current node
  7. If the neighbours calculated distance is less than it's tentative distance.
  The calculated distance becomes the new tentative. Add this neighbour node to the queue
  8. When all unvisited neighbour distances are updated. 
     Add the current node to visited and move the node in the queue

## Memoization
When running a recursive and/complex algorithim, store the return value in a cache to prevent repeating a calculation.

