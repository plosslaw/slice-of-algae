# Problem Statement
You are given an array of n integers, their values range from [0, n - 1]

Determine if there are any duplicate integers in the array and if so return the duplicate integers as an array, else return empty array

Find a solution that takes O(n) time O(1) space and does not modify the original array

# Solution
Treat array as a group of linked lists, perform cycle detection on each linked list
- if linked list starts and end at the same node, no duplicate found
- else, the duplicate integer is the starting node of the cycle
