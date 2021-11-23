strings = ['a', 'b', 'c', 'd']

# A byte of ram storage holds 8 bits worth of information
# On a 32 bit computer, each needs 4 bytes of storage (32 bits / 8 bits per byte)
# 4*4 = 16 bytes of storage

# push - add item to the end of the list
strings.append('e')  # O(1)
# NOTE: append can be O(N). Source code is written with static arrays.
#       When the static array is full, it needs to iterate over the
#       array and copy it to new RAM registers
print(strings)

# pop - remove last item from the list
strings.pop()
strings.pop()  # O(1)
print(strings)

# unshift equivalent - list insert
strings = ['x'] + strings  # O(n) - python creates a new list
print(strings)

# splice - add item in the middle of a list
strings.insert(2, 'alien')  # O(n)
print(strings)

