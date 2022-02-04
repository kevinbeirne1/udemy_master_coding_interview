import unittest


class Node:

    def __init__(self, value):
        self.value = value
        self.next = None

    def __repr__(self):
        return f"Node({self.value}) - next: {self.next}"

class Queue:

    def __init__(self):
        self.first_node = None
        self.last_node = None
        self.length = 0

    @property
    def last(self):
        return self.last_node.value if self.last_node else None

    @property
    def first(self):
        return self.first_node.value if self.first_node else None

    @property
    def next(self):
        return self.first_node.next.value if self.first_node.next else None

    def enqueue(self, value):
        new_node = Node(value)
        if self.last_node:
            self.last_node.next = new_node
        self.last_node = new_node
        if not self.first_node:
            self.first_node = self.last_node
        self.length += 1

    def dequeue(self):
        if self.length == 0:
            raise IndexError
        old_first = self.first
        self.first_node = self.first_node.next
        self.length -= 1
        return old_first

    def peek(self):
        return self.first

    def is_empty(self):
        return not bool(self.length)


class TestQueueCreation(unittest.TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        cls.queue = Queue()

    def test_has_first_property_equal_to_none(self):
        actual = self.queue.first
        self.assertEqual(actual, None)

    def test_has_last_property_equal_to_none(self):
        actual = self.queue.last
        self.assertEqual(actual, None)

    def test_has_length_property_equal_to_0(self):
        actual = self.queue.length
        self.assertEqual(actual, 0)


class TestQueueEnqueue(unittest.TestCase):

    def setUp(self) -> None:
        self.queue = Queue()
        
    def test_increments_stack_length(self):
        self.queue.enqueue(5)
        actual = self.queue.length
        self.assertEqual(actual, 1)

        self.queue.enqueue(7)
        actual = self.queue.length
        self.assertEqual(actual, 2)

    def test_raises_error_if_no_value_provided(self):
        with self.assertRaises(TypeError):
            self.queue.enqueue()

    def test_sets_last_equal_to_new_value(self):
        self.queue.enqueue(5)
        actual = self.queue.last
        self.assertEqual(actual, 5)

    def test_sets_first_equal_to_last_when_enqueue_to_empty_queue(self):
        self.queue.enqueue(5)
        actual = self.queue.first
        expected = self.queue.last
        self.assertEqual(actual, expected)

    def test_last_updates_to_new_value_when_enqueue_to_non_empty_queue(self):
        self.queue.enqueue(5)
        self.queue.enqueue(7)
        actual = self.queue.last
        self.assertEqual(actual, 7)

    def test_first_not_changed_when_enqueue_to_non_empty_queue(self):
        self.queue.enqueue(5)
        expected = self.queue.first
        self.queue.enqueue(7)
        actual = self.queue.first
        self.assertEqual(actual, expected)
    
    def test_link_maintained_between_items_when_enqueue(self):
        self.queue.enqueue(5)
        self.queue.enqueue(7)
        expected = self.queue.last
        actual = self.queue.next
        self.assertEqual(actual, expected)


class TestStackDequeue(unittest.TestCase):

    def setUp(self) -> None:
        self.queue = Queue()
        self.queue.enqueue(5)
        self.queue.enqueue(7)
        self.queue.enqueue(9)

    def test_decrements_queue_length(self):
        for expected_length in [2, 1, 0]:
            with self.subTest():
                self.queue.dequeue()
                actual = self.queue.length
                self.assertEqual(actual, expected_length)

    def test_raises_error_if_dequeue_empty_queue(self):
        with self.assertRaises(IndexError):
            Queue().dequeue()

    def test_sets_first_equal_to_next_node(self):
        expected = 7
        self.queue.dequeue()
        actual = self.queue.first
        self.assertEqual(actual, expected)

    def test_sets_first_equal_to_last_when_one_item_in_queue_after_dequeue(self):
        expected = self.queue.last
        self.queue.dequeue()
        self.queue.dequeue()
        actual = self.queue.first
        self.assertEqual(actual, expected)

    def test_returns_the_value_of_the_old_first_item(self):
        for _ in range(3):
            expected = self.queue.first
            actual = self.queue.dequeue()
            self.assertEqual(actual, expected)

    def test_last_not_changed_when_dequeue_to_queue_with_more_than_one_item(self):
        expected = self.queue.last
        self.queue.dequeue()
        actual = self.queue.last
        self.assertEqual(actual, expected)


class TestStackPeek(unittest.TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        cls.queue = Queue()
        cls.queue.enqueue(5)
        cls.queue.enqueue(7)

    def test_does_not_change_first(self):
        expected = self.queue.first
        self.queue.peek()
        actual = self.queue.first
        self.assertEqual(actual, expected)

    def test_does_not_change_last(self):
        expected = self.queue.last
        self.queue.peek()
        actual = self.queue.last
        self.assertEqual(actual, expected)

    def test_does_not_change_length(self):
        expected = self.queue.length
        self.queue.peek()
        actual = self.queue.length
        self.assertEqual(actual, expected)

    def test_returns_value_of_first_item_in_queue(self):
        expected = self.queue.first
        actual = self.queue.peek()
        self.assertEqual(actual, expected)

    def test_returns_none_if_peek_empty_queue(self):
        actual = Queue().peek()
        self.assertEqual(actual, None)


class TestStackIsEmpty(unittest.TestCase):

    def test_returns_true_if_queue_empty(self):
        actual = Queue().is_empty()
        self.assertTrue(actual)

    def test_returns_false_if_queue_not_empty(self):
        stack = Queue()
        stack.enqueue(5)
        actual = stack.is_empty()
        self.assertFalse(actual)


if __name__ == "__main__":
    unittest.main()
