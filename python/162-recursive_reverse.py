import unittest


def recursive_reverse(input_string):
    if len(input_string) <= 1:
        return input_string
    return input_string[-1] + recursive_reverse(input_string[:-1])


class TestRecursiveReverse(unittest.TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        cls.test_cases = [
            ("", ""), ("a", "a"), ("ab", "ba"), ("abcde", "edcba")
        ]

    def test_raises_if_no_value_passed(self):
        with self.assertRaises(TypeError):
            recursive_reverse()

    def test_recursive_reverse(self):
        for test_case, expected in self.test_cases:
            with self.subTest(f"Test case: {test_case}"):
                actual = recursive_reverse(test_case)
                self.assertEqual(actual, expected)


if __name__ == "__main__":
    unittest.main()
