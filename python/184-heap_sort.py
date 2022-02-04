import unittest


def max_heapify(array, size, i):
    if not (
            isinstance(array, list) and
            isinstance(size, int) and isinstance(i, int)
    ):
        raise TypeError('Incorrect variable types')

    if len(array) <= 1:
        return array
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2

    if left < size and array[largest] < array[left]:
        largest = left
    if right < size and array[largest] < array[right]:
        largest = right
    if largest != i:
        array[i], array[largest] = array[largest], array[i]
        max_heapify(array, size, largest)
    return array


def heap_sort_recursive(input_array):
    if len(input_array) <= 1:
        return input_array

    for i in range(len(input_array), -1, -1):
        max_heapify(input_array, len(input_array), i)

    for i in range(len(input_array)):
        input_array[0], input_array[-i] = input_array[-i], input_array[0]
        max_heapify(input_array, len(input_array) - i, 0)
    return input_array


class TestMaxHeapify(unittest.TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        cls.test_cases = [
            (([], 0, 0), []),
            (([1], 1, 0), [1]),
            (([1, 2, 3], 3, 0), [3, 2, 1]),
            (([3, 2, 1], 3, 0), [3, 2, 1]),
            (([4, 3, 2, 1], 4, 0), [4, 3, 2, 1]),
            (([3, 4, 2, 1], 4, 0), [4, 3, 2, 1]),
            (([2, 15, 3], 3, 0), [15, 2, 3]),
            (([2, 20, 15, 3], 4, 0), [20, 3, 15, 2]),

        ]

    def test_raises_with_no_parameters(self):
        with self.assertRaises(TypeError):
            max_heapify()

    def test_raises_with_only_array(self):
        with self.assertRaises(TypeError):
            max_heapify(array=[])

    def test_raises_with_only_size(self):
        with self.assertRaises(TypeError):
            max_heapify(size=1)

    def test_raises_with_only_k(self):
        with self.assertRaises(TypeError):
            max_heapify(k=1)

    def test_raises_without_array(self):
        with self.assertRaises(TypeError):
            max_heapify(size=1, k=1)

    def test_raises_without_size(self):
        with self.assertRaises(TypeError):
            max_heapify(array=[], k=1)

    def test_raises_without_k(self):
        with self.assertRaises(TypeError):
            max_heapify(array=[], size=1)

    def test_raises_if_array_is_not_list(self):
        with self.assertRaises(TypeError):
            max_heapify(array=1, size=1, k=1)

    def test_raises_if_size_is_not_integer(self):
        with self.assertRaises(TypeError):
            max_heapify(array=[], size=1.9, k=1)

    def test_raises_if_k_is_not_integer(self):
        with self.assertRaises(TypeError):
            max_heapify(array=[], size=1, k=1.5)

    def test_max_heapify(self):
        for test_case, expected_result in self.test_cases:
            with self.subTest(f"Test case: {test_case}"):
                actual = max_heapify(*test_case)
                self.assertEqual(actual, expected_result)


class TestHeapSort(unittest.TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        cls.test_cases = [
            ([], []),
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

        cls.functions_to_test = [heap_sort_recursive, ] #heap_sort_iterative]

    def test_no_parameter_raises(self):
        for function_to_test in self.functions_to_test:
            with self.subTest(f"Function: {function_to_test.__name__}"):
                with self.assertRaises(TypeError):
                    function_to_test()

    def test_heap_sort_return(self):
        for function_to_test in self.functions_to_test:
            for test_case, expected_result in self.test_cases:
                with self.subTest(f"function: {function_to_test.__name__}; test case: {test_case}"):
                    actual = function_to_test(test_case)
                    self.assertEqual(actual, expected_result)

    def test_heap_sort_in_place(self):
        for function_to_test in self.functions_to_test:
            for test_case, expected_result in self.test_cases:
                with self.subTest(f"function: {function_to_test.__name__}; test case: {test_case}"):
                    function_to_test(test_case)
                    self.assertEqual(test_case, expected_result)

if __name__ == "__main__":
    unittest.main()