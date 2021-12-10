import unittest


class Node:

    def __init__(self, value):
        self.value = value
        self.next = None


class Stack:

    def __init__(self):
        self.stack = []

    @property
    def top(self):
        return None if not self.stack else self.stack[-1]

    @property
    def bottom(self):
        return None if not self.stack else self.stack[0]

    @property
    def length(self):
        return len(self.stack)

    def push(self, value):
        self.stack.append(value)

    def pop(self):
        if not self.top:
            raise IndexError
        return self.stack.pop()

    def peek(self):
        if not self.top:
            raise IndexError
        return self.top

    def is_empty(self):
        return not bool(self.length)


class TestStackCreation(unittest.TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        cls.stack = Stack()

    def test_has_top_property_equal_to_none(self):
        actual = self.stack.top
        self.assertEqual(actual, None)

    def test_has_bottom_property_equal_to_none(self):
        actual = self.stack.bottom
        self.assertEqual(actual, None)

    def test_has_length_property_equal_to_0(self):
        actual = self.stack.length
        self.assertEqual(actual, 0)


class TestStackPush(unittest.TestCase):

    def setUp(self) -> None:
        self.stack = Stack()
        
    def test_increments_stack_length(self):
        self.stack.push(5)
        actual = self.stack.length
        self.assertEqual(actual, 1)

        self.stack.push(7)
        actual = self.stack.length
        self.assertEqual(actual, 2)

    def test_raises_error_if_no_value_provided(self):
        with self.assertRaises(TypeError):
            self.stack.push()

    def test_sets_top_equal_to_new_value(self):
        self.stack.push(5)
        actual = self.stack.top
        self.assertEqual(actual, 5)

    def test_sets_bottom_equal_to_top_when_push_to_empty_stack(self):
        self.stack.push(5)
        actual = self.stack.bottom
        expected = self.stack.top
        self.assertEqual(actual, expected)

    def test_top_updates_to_new_value_when_push_to_non_empty_stack(self):
        self.stack.push(5)
        self.stack.push(7)
        actual = self.stack.top
        self.assertEqual(actual, 7)

    def test_bottom_not_changed_when_push_to_non_empty_stack(self):
        self.stack.push(5)
        expected = self.stack.bottom
        self.stack.push(7)
        actual = self.stack.bottom
        self.assertEqual(actual, expected)

class TestStackPop(unittest.TestCase):

    def setUp(self) -> None:
        self.stack = Stack()
        self.stack.push(5)
        self.stack.push(7)
        self.stack.push(9)

    def test_decrements_stack_length(self):
        for expected_length in [2, 1, 0]:
            with self.subTest():
                self.stack.pop()
                actual = self.stack.length
                self.assertEqual(actual, expected_length)

    def test_raises_error_if_pop_empty_stack(self):
        with self.assertRaises(IndexError):
            Stack().pop()

    def test_sets_top_equal_to_next_node(self):
        expected = 7
        self.stack.pop()
        actual = self.stack.top
        self.assertEqual(actual, expected)

    def test_sets_bottom_equal_to_top_when_one_item_in_stack_after_pop(self):
        expected = self.stack.bottom
        self.stack.pop()
        self.stack.pop()
        actual = self.stack.top
        self.assertEqual(actual, expected)

    def test_returns_the_value_of_the_old_top_item(self):
        for _ in range(3):
            expected = self.stack.top
            actual = self.stack.pop()
            self.assertEqual(actual, expected)

    def test_bottom_not_changed_when_pop_to_stack_with_more_than_one_item(self):
        expected = self.stack.bottom
        self.stack.pop()
        actual = self.stack.bottom
        self.assertEqual(actual, expected)


class TestStackPeek(unittest.TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        cls.stack = Stack()
        cls.stack.push(5)
        cls.stack.push(7)

    def test_does_not_change_top(self):
        expected = self.stack.top
        self.stack.peek()
        actual = self.stack.top
        self.assertEqual(actual, expected)

    def test_does_not_change_bottom(self):
        expected = self.stack.bottom
        self.stack.peek()
        actual = self.stack.bottom
        self.assertEqual(actual, expected)

    def test_does_not_change_length(self):
        expected = self.stack.length
        self.stack.peek()
        actual = self.stack.length
        self.assertEqual(actual, expected)

    def test_returns_value_of_top_item_in_stack(self):
        expected = self.stack.top
        actual = self.stack.peek()
        self.assertEqual(actual, expected)

    def test_raises_error_if_peek_empty_stack(self):
        with self.assertRaises(IndexError):
            Stack().peek()


class TestStackIsEmpty(unittest.TestCase):

    def test_returns_true_if_stack_empty(self):
        actual = Stack().is_empty()
        self.assertTrue(actual)

    def test_returns_false_if_stack_not_empty(self):
        stack = Stack()
        stack.push(5)
        actual = stack.is_empty()
        self.assertFalse(actual)


if __name__ == "__main__":
    unittest.main()