"""
Given 2 arrays, create a function that lets a user know (true/false) whether two arrays contain common items
For Example:
const array1 = ['a', 'b', 'c', 'x']
const array2 = ['z', 'y', 'i']
should return false.
-----------
const array1 = ['a', 'b', 'c', 'x']
const array2 = ['z', 'y', 'x']
should return true.
"""
import unittest


def contains_common_item(arr1, arr2):
    """
    Loop through the first array
    For each item in the first array loop through the second array
    If first array item == second array item return True
    else return False

    O(a*b) Time Complexity
    O(1) Space Complexity
    """
    for first_array_item in arr1:
        for second_array_item in arr2:
            if first_array_item == second_array_item:
                return True
    return False


def contains_common_item_2(arr1, arr2):
    """
    loop through first array and create dictionary object where the keys are the items in the array
    loop through the second array and check if item in second array exists in the created dictionary
    """
    array1_dict = {}
    for item in arr1:
        array1_dict[item] = True

    for item2 in arr2:
        if array1_dict.get(item2, False):
            return True

    return False


def contains_common_item_3(arr1, arr2):
    """
    convert array 1 to a set object
    loop through the second array and check if item in second array exists in the created set
    """
    array1_set = set(arr1)

    for item2 in arr2:
        if item2 in array1_set:
            return True
    return False


def contains_common_item_4(arr1, arr2):
    """
    convert array 1 to a set object
    loop through the second array and check if item in second array exists in the created set
    """
    array1_set = set(arr1)

    for item2 in arr2:
        if item2 in array1_set:
            return True
    return False


def contains_common_item_5(arr1, arr2):
    """
    Use any function to check item in list
    """
    return any(True for item in arr1 if item in arr2)


class TestContainsCommonItem(unittest.TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        cls.array1 = ['a', 'b', 'c', 'x']
        cls.array2 = ['z', 'y', 'x']
        cls.array3 = ['z', 'y', 'i']
        cls.functions_to_test = [
            contains_common_item,
            contains_common_item_2,
            contains_common_item_3,
            contains_common_item_4,
            contains_common_item_5,
        ]

    def test_single_item_matches(self):
        for function in self.functions_to_test:
            with self.subTest():
                actual = function(self.array1, self.array2)
                self.assertTrue(actual)

    def test_no_item_matches(self):
        actual = contains_common_item(self.array1, self.array3)
        self.assertFalse(actual)


unittest.main()
# contains_common_item_2(['a', 'b', 'c', 'x'], ['z', 'y', 'x'])
