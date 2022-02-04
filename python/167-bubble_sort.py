import unittest


def bubble_sort_recursive(input_list):
    if len(input_list) == 1:
        # Exit Case
        return input_list

    output_list = input_list[:]
    for i in range(len(input_list) - 1):
        # bubble each item in current list
        if output_list[i] > output_list[i+1]:
            output_list[i], output_list[i+1] = output_list[i+1], output_list[i]

    if output_list == input_list:
        # End recursion if unchanged
        return input_list
    return bubble_sort_recursive(output_list[:-1]) + [output_list[-1]]


def bubble_sort_iterative(input_list):
    largest_sorted_digit = len(input_list)
    while largest_sorted_digit > 1:
        previous_list = input_list[:]
        for i in range(largest_sorted_digit - 1):
            if input_list[i] > input_list[i + 1]:
                input_list[i], input_list[i+1] = input_list[i+1], input_list[i]
        if previous_list == input_list:
            return input_list
        largest_sorted_digit -= 1
    return input_list


class TestBubbleSort(unittest.TestCase):

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

        cls.functions_to_test = [bubble_sort_iterative, bubble_sort_recursive]

    def test_no_parameter_raises(self):
        for function_to_test in self.functions_to_test:
            with self.subTest(f"Function: {function_to_test.__name__}"):
                with self.assertRaises(TypeError):
                    function_to_test()

    def test_bubble_sort(self):
        for function_to_test in self.functions_to_test:
            for test_case, expected_result in self.test_cases:
                with self.subTest(f"function: {function_to_test.__name__}; test case: {test_case}"):
                    actual = function_to_test(test_case)
                    self.assertEqual(actual, expected_result)


if __name__ == "__main__":
    unittest.main()
