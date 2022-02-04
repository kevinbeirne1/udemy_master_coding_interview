import unittest


def selection_sort_iterative(input_list):
    for swap_index in range(len(input_list)):
        current_lowest = swap_index
        for i in range(swap_index, len(input_list)):
            if input_list[i] < input_list[current_lowest]:
                current_lowest = i
        input_list[swap_index], input_list[current_lowest] = input_list[current_lowest], input_list[swap_index]
        swap_index += 1
    return input_list


def selection_sort_recursive(input_list):
    if len(input_list) == 1:
        return input_list

    current_lowest = 0
    for i, n in enumerate(input_list):
        if n < input_list[current_lowest]:
            current_lowest = n
    input_list[0], input_list[current_lowest] = input_list[current_lowest], input_list[0]
    return input_list[0:1] + selection_sort_recursive(input_list[1:])


class TestSelectionSort(unittest.TestCase):

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

        cls.functions_to_test = [selection_sort_iterative, selection_sort_recursive]

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
