import unittest


def quick_sort_recursive(input_array):
    if len(input_array) <= 1:
        return input_array
    pivot_index = len(input_array) - 1
    pivot = input_array[pivot_index]
    comparision_index = 0

    while comparision_index < pivot_index:
        if input_array[comparision_index] > pivot:
            temp = input_array[comparision_index]
            input_array[comparision_index] = input_array[pivot_index - 1]
            input_array[pivot_index - 1] = input_array[pivot_index]
            input_array[pivot_index] = temp
            pivot_index -= 1
        else:
            comparision_index += 1

    left = input_array[:comparision_index]
    right = input_array[comparision_index + 1:]

    return quick_sort_recursive(left) + [pivot] + quick_sort_recursive(right)


class TestQuickSort(unittest.TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        cls.test_cases = [
            ([1], [1]),
            ([1, 2, 3], [1, 2, 3]),
            ([3, 2, 1], [1, 2, 3]),
            ([6, 5, 4, 3, 2, 1], [1, 2, 3, 4, 5, 6]),
            ([6, 5, 3, 1, 8, 7, 2, 4], [1, 2, 3, 4, 5, 6, 7, 8]),
            ([1, 2, 3, 5, 6, 7, 8, 4], [1, 2, 3, 4, 5, 6, 7, 8]),
            (
                [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0],
                [0, 1, 2, 4, 5, 6, 44, 63, 87, 99, 283]
             )
        ]

        cls.functions_to_test = [quick_sort_recursive, ] #merge_sort_iterative]

    def test_no_parameter_raises(self):
        for function_to_test in self.functions_to_test:
            with self.subTest(f"Function: {function_to_test.__name__}"):
                with self.assertRaises(TypeError):
                    function_to_test()

    def test_quick_sort(self):
        for function_to_test in self.functions_to_test:
            for test_case, expected_result in self.test_cases:
                with self.subTest(f"function: {function_to_test.__name__}; test case: {test_case}"):
                    actual = function_to_test(test_case)
                    self.assertEqual(actual, expected_result)


if __name__ == "__main__":
    unittest.main()
