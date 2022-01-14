import unittest


def fibonacci_recursive(value):
    if value <= 1:
        return value
    return fibonacci_recursive(value-1) + fibonacci_recursive(value-2)


def fibonacci_iterative(value):
    first, second = 0, 1
    for i in range(value):
        first, second = second, first + second
    return first


class TestFibonacci(unittest.TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        cls.functions = [fibonacci_recursive, fibonacci_iterative]
        cls.test_cases = [
            (0, 0), (1, 1), (2, 1), (3, 2), (4, 3), (5, 5), (8, 21), (12, 144)
        ]

    def test_raises_if_no_value_passed(self):
        for test_function in self.functions:
            with self.subTest():
                with self.assertRaises(TypeError):
                    test_function()

    def test_run_test_cases(self):
        for test_case, expected_result in self.test_cases:
            for test_function in self.functions:
                with self.subTest(f"function: {test_function.__name__}; test case: {test_case}"):
                    actual = test_function(test_case)
                    self.assertEqual(actual, expected_result)

if __name__ == "__main__":
    unittest.main()
