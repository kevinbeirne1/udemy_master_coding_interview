"""
Google Question
Given an array = [2, 5, 1, 2, 3, 5, 1, 2, 4]
It should return 2

Given an array = [2, 1, 1, 2, 3, 5, 1, 2, 4]
It should return 1

Given an array = [2, 3, 4, 5]
It should return None
"""

import unittest


def first_recurring_character(array):

    """
    - Loop through the list
    - at each item
    - loop through the previous items
    - see if current_item in previous items
    
    O(n ** 2) looping through the list twice at each element
    """
    for i, current_item in enumerate(array):
        for comparison_item in array[:i]:
            if current_item == comparison_item:
                return current_item


def first_recurring_character2(array):
    """
    - Create a dictionary
    - Loop through the list
    - At each item
    - check if item in dictionary
        - if present => return true
    - else dictionary[item] = True

    O(n) - worst case will check each element once
    """
    items_already_seen = {}
    for item in array:
        if items_already_seen.get(item): 
            return item
        else:
            items_already_seen[item] = True


class TestFirstRecurringCharacter(unittest.TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        cls.functions_to_test = [
            first_recurring_character,
            first_recurring_character2,
        ]

        cls.test_cases = [
            ([2, 5, 1, 2, 3, 5, 1, 2, 4], 2),
            ([2, 1, 1, 2, 3, 5, 1, 2, 4], 1),
            ([2, 3, 4, 5], None),
            ([], None),
            ([1, 1], 1),
        ]

    def test_first_recurring_character(self):
        for function_to_test in self.functions_to_test:
            for test_case, expected_result in self.test_cases:
                with self.subTest(f'testing {function_to_test.__name__}'):
                    actual = function_to_test(test_case)
                    self.assertEqual(actual, expected_result)


if __name__ == "__main__":
    unittest.main()
