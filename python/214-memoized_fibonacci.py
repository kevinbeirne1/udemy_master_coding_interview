import unittest
from functools import lru_cache
# in python 3.9 and above can also use functools.cache

cache = {}


def memoized_fibonacci_1(n):
    if n in cache:
        return cache[n]
    if n < 2:
        cache[n] = n
        return n
    else:
        cache[n] = memoized_fibonacci_1(n - 1) + memoized_fibonacci_1(n - 2)
        return cache[n]


@lru_cache
def memoized_fibonacci_2(value):
    # O(n ** 2) complexity
    if value <= 1:
        return value
    return memoized_fibonacci_2(value-1) + memoized_fibonacci_2(value-2)


def memoized(f):
    memoize_3_cache = {}
    def check_cache(n):
        if n not in memoize_3_cache:
            memoize_3_cache[n] = f(n)
        return memoize_3_cache[n]
    return check_cache


@memoized
def memoized_fibonacci_3(value):
    # O(n ** 2) complexity
    if value <= 1:
        return value
    return memoized_fibonacci_3(value-1) + memoized_fibonacci_3(value-2)


class classMemoized:

    def __init__(self, f):
        self.f = f
        self.cache = {}

    def __call__(self, x):
        if x not in self.cache:
            self.cache[x] = self.f(x)
        return self.cache[x]


@classMemoized
def memoized_fibonacci_4(value):
    # O(n ** 2) complexity
    if value <= 1:
        return value
    return memoized_fibonacci_4(value-1) + memoized_fibonacci_4(value-2)


class TestFibonacci(unittest.TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        cls.functions = [
            memoized_fibonacci_1, memoized_fibonacci_2,
            memoized_fibonacci_3, memoized_fibonacci_4
        ]
        cls.test_cases = [
            (0, 0), (1, 1), (2, 1), (3, 2), (4, 3), (5, 5), (8, 21), (12, 144),
            (35, 9227465),
        ]

    def test_raises_if_no_value_passed(self):
        for test_function in self.functions:
            with self.subTest():
                with self.assertRaises(TypeError):
                    test_function()

    def test_run_test_cases(self):
        for test_case, expected_result in self.test_cases:
            for test_function in self.functions:
                # with self.subTest(f"function: {test_function.__name__}; test case: {test_case}"):
                    actual = test_function(test_case)
                    self.assertEqual(actual, expected_result)

if __name__ == "__main__":
    unittest.main()