import unittest


def factorial_recursive(value):
    if value <= 1:
        return 1
    return value * factorial_recursive(value - 1)


def factorial_iterative(value):
    factorial = 1
    for i in range(2, int(value) + 1):
        factorial *= i
    return factorial


class TestFactorial(unittest.TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        cls.functions = [factorial_recursive, factorial_iterative]

    def test_raises_if_no_value_passed(self):
        for test_function in self.functions:
            with self.subTest():
                with self.assertRaises(TypeError):
                    test_function()

    def test_factorial_1(self):
        for test_function in self.functions:
            with self.subTest():
                actual = test_function(1)
                self.assertEqual(actual, 1)

    def test_factorial_2(self):
        for test_function in self.functions:
            with self.subTest():
                actual = test_function(2)
                self.assertEqual(actual, 2)

    def test_factorial_3(self):
        for test_function in self.functions:
            with self.subTest():
                actual = test_function(3)
                self.assertEqual(actual, 6)

    def test_factorial_5(self):
        for test_function in self.functions:
            with self.subTest():
                actual = test_function(5)
                self.assertEqual(actual, 120)

    def test_factorial_10(self):
        for test_function in self.functions:
            with self.subTest():
                actual = test_function(10)
                self.assertEqual(actual, 3628800)


if __name__ == "__main__":
    unittest.main()