# merge_sorted_arrays([0, 3, 4, 31], [4, 6, 30])
# [0, 3, 4, 4, 6, 30, 31]

import unittest


def merge_sorted_arrays(array1, array2):
    # O((a+b)*log(a+b)) -
    return sorted(array1 + array2)


def merge_sorted_arrays2(array1, array2):
    """
    if array1_index >= len(array1) =>
        add the rest of array2 to new_array
    else if array2_index >= len(array2) =>
        add the rest of array1 to new_array

    else if array1[0] >= array2[0] =>
        new_array.append(array1[0])
        array1_index += 1
    and vice versa for array2

    if array1_index >= len(array1) => add the rest of array2 to new_array

    """
    new_array = []
    array1_index, array2_index = 0, 0
    while len(new_array) < len(array1) + len(array2):
        if array1_index >= len(array1):
            new_array += array2[array2_index:]
        elif array2_index >= len(array2):
            new_array += array1[array1_index:]
        else:
            if array1[array1_index] <= array2[array2_index]:
                new_array += [array1[array1_index]]
                array1_index += 1
            else:
                new_array += [array2[array2_index]]
                array2_index += 1
    return new_array


class TestMergeSortedArrays(unittest.TestCase):

    def setUp(self) -> None:
        self.functions_to_test = [
            # merge_sorted_arrays,
            merge_sorted_arrays2,
        ]

        self.test_cases = [
            (([0, 3, 4, 31], [4, 6, 30]), [0, 3, 4, 4, 6, 30, 31]),
            (([0, 3, 4, 31], []), [0, 3, 4, 31]),
            (([], [0, 3, 4, 31]), [0, 3, 4, 31]),
            (([], []), [])
        ]

    def test_merge_sorted_arrays(self):
        for function_to_test in self.functions_to_test:
            for test_case, expected in self.test_cases:
                with self.subTest():
                    self.assertEqual(function_to_test(*test_case), expected)

    def test_returns_list(self):
        for function_to_test in self.functions_to_test:
            with self.subTest():
                actual = function_to_test([], [])
                self.assertEqual(list, type(actual))


if __name__ == "__main__":
    unittest.main()
