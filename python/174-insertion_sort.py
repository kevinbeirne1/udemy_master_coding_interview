import unittest
from collections import deque


def insertion_sort(input_list):
    for i in range(1, len(input_list)):
        item = input_list[i]
        insertion_point = i - 1
        while insertion_point >= 0 and item < input_list[insertion_point]:
            input_list[insertion_point + 1] = input_list[insertion_point]
            insertion_point -= 1
        input_list[insertion_point + 1] = item
    return input_list

def insertion_sort_linked_list(input_list):
    # don't think that this is technically an insertion sort as it requires
    # creating an intermediate linked list
    if not input_list:
        return input_list
    output_list = deque([input_list[0]])
    for item in input_list[1:]:
        if item > output_list[-1]:
            output_list.append(item)
        elif item < output_list[0]:
            output_list.appendleft(item)
        else:
            for i, num in enumerate(output_list):
                if item < output_list[i + 1]:
                    output_list.insert(i + 1, item)
                    break
    return list(output_list)


class TestInsertionSort(unittest.TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        cls.test_cases = [
            ([1], [1]),
            ([1, 2, 3], [1, 2, 3]),
            ([3, 2, 1], [1, 2, 3]),
            ([6, 5, 4, 3, 2, 1], [1, 2, 3, 4, 5, 6]),
            ([6, 5, 3, 1, 8, 7, 2, 4], [1, 2, 3, 4, 5, 6, 7, 8]),
            ([1, 2, 3, 5, 6, 7, 8, 4], [1, 2, 3, 4, 5, 6, 7, 8]),
        ]

        cls.functions_to_test = [insertion_sort_linked_list, insertion_sort]

    def test_no_parameter_raises(self):
        for function_to_test in self.functions_to_test:
            with self.subTest(f"Function: {function_to_test.__name__}"):
                with self.assertRaises(TypeError):
                    function_to_test()

    def test_insertion_sort(self):
        for function_to_test in self.functions_to_test:
            for test_case, expected_result in self.test_cases:
                with self.subTest(f"function: {function_to_test.__name__}; test case: {test_case}"):
                    actual = function_to_test(test_case)
                    self.assertEqual(actual, expected_result)


if __name__ == "__main__":
    unittest.main()
