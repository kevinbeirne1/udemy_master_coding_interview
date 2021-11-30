"""
Create a function that reverses a string:
'Hi My name is Andrei' should be:
'ierdnA si eman yM iH'
"""

import unittest


def reverse_string(string):
    # Check input
    if not isinstance(string, str) or len(string) < 2:
        return "Hmmm there seems to be a problem"
    split_string = list(string)
    new_string = []
    for letter in reversed(split_string):
        new_string.append(letter)
    return "".join(new_string)


def reverse_string2(string):
    return "".join(reversed(string))


print(reverse_string('hello there my friend'))
print(reverse_string2('hello there my friend'))
