import math
import unittest


def merge_sort_recursive(input_array):
    if len(input_array) == 1:
        return input_array

    mid_index = math.ceil(len(input_array) / 2)
    left = input_array[:mid_index]
    right = input_array[mid_index:]

    return merge_array(
        merge_sort_recursive(left),
        merge_sort_recursive(right)
    )


def merge_array(array1, array2=None):
    if not array2:
        return array1
    i, j = 0, 0
    output_array = []
    while i < len(array1) or j < len(array2):
        if j == len(array2):
            output_array.append(array1[i])
            i += 1
        elif i == len(array1):
            output_array.append(array2[j])
            j += 1
        elif array1[i] < array2[j]:
            output_array.append(array1[i])
            i += 1
        else:
            output_array.append(array2[j])
            j += 1
    return output_array


class TestMergeArray(unittest.TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        cls.test_cases = [
            ([[1]], [1]),
            ([[1, 2], [3]], [1, 2, 3]),
            ([[1, 2], [3, 4]], [1, 2, 3, 4]),
            ([[2, 4], [1, 3]], [1, 2, 3, 4]),
        ]

    def test_no_parameter_raises(self):
        with self.assertRaises(TypeError):
            merge_array()

    def test_merge_array(self):
        for test_case, expected_result in self.test_cases:
            with self.subTest(f'test case: {test_case}'):
                actual = merge_array(*test_case)
                self.assertEqual(actual, expected_result)

class TestMergeSort(unittest.TestCase):

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

        cls.functions_to_test = [merge_sort_recursive, ] #merge_sort_iterative]

    def test_no_parameter_raises(self):
        for function_to_test in self.functions_to_test:
            with self.subTest(f"Function: {function_to_test.__name__}"):
                with self.assertRaises(TypeError):
                    function_to_test()

    def test_merge_sort(self):
        for function_to_test in self.functions_to_test:
            for test_case, expected_result in self.test_cases:
                with self.subTest(f"function: {function_to_test.__name__}; test case: {test_case}"):
                    actual = function_to_test(test_case)
                    self.assertEqual(actual, expected_result)


if __name__ == "__main__":
    unittest.main()