import unittest


class Node:
    def __init__(self, value):
        self.value = value
        self.previous = None
        self.next = None

    def __repr__(self):
        return f"{self.value}" if not self.next else f"{self.value}, {self.next}"


class DoublyLinkedList:

    def __init__(self, value):
        self.head = Node(value)
        self.tail = self.head
        self.length = 1

    def append(self, value):
        new_node = Node(value)
        self.tail.next = new_node
        new_node.previous = self.tail
        self.tail = new_node
        self.length += 1

    def prepend(self, value):
        new_node = Node(value)
        new_node.next = self.head
        self.head.previous = new_node
        self.head = new_node
        self.length += 1

    def insert(self, index, value):
        if index == 0:
            self.prepend(value)
        elif index >= self.length:
            self.append(value)
        else:
            new_node = Node(value)
            leader_node = self.head
            for _ in range(index - 1):
                leader_node = leader_node.next
            follower_node = leader_node.next
            new_node.next = follower_node
            new_node.previous = leader_node
            leader_node.next = new_node
            follower_node.previous = new_node
            self.length += 1

    def remove(self, index):
        if index == 0:
            self.head = self.head.next
            self.head.previous = None
        elif index == self.length - 1:
            self.tail = self.tail.previous
            self.tail.next = None
        else:
            leader_node = self.head
            for _ in range(index - 1):
                leader_node = leader_node.next
            follower_node = leader_node.next.next
            leader_node.next = follower_node
            follower_node.previous = leader_node
        self.length -= 1

    def __repr__(self):
        return f"{self.head}"


class TestNode(unittest.TestCase):

    def test_new_node_raises_error_without_value(self):
        with self.assertRaises(TypeError):
            Node()

    def test_node_created_with_integer_value(self):
        # Shouldn't raise on error
        Node(20)

    def test_node_created_with_float_value(self):
        # Shouldn't raise on error
        Node(20.2)

    def test_node_created_with_string_value(self):
        # Shouldn't raise on error
        Node('20')

    def test_node_assigns_value_to_value_attribute(self):
        actual = Node(20).value
        self.assertEqual(actual, 20)

    def test_node_has_next_property(self):
        actual = Node(20).next
        self.assertEqual(actual, None)


class TestLinkedList(unittest.TestCase):

    def setUp(self) -> None:
        self.prepopulated_list = DoublyLinkedList(20)
        self.prepopulated_list.append(21)
        self.prepopulated_list.append(22)

    def test_new_linked_list_raises_error_without_value(self):
        with self.assertRaises(TypeError):
            DoublyLinkedList()

    def test_new_linked_list_assigns_node_instance_to_head(self):
        actual = DoublyLinkedList(20).head
        self.assertIsInstance(actual, Node)

    def test_new_linked_list_length_equals_ones(self):
        actual = DoublyLinkedList(20).length
        self.assertEqual(actual, 1)

    def test_new_linked_list_head_is_tail(self):
        test_list = DoublyLinkedList(20)
        actual = test_list.tail
        expected = test_list.head
        self.assertIs(actual, expected)

    def test_append_increments_length(self):
        test_list = DoublyLinkedList(20)
        for i in range(5):
            with self.subTest():
                test_list.append(i)
                actual = test_list.length
                expected = i + 2
                self.assertEqual(actual, expected)

    def test_append_assigns_new_tail(self):
        test_list = DoublyLinkedList(20)
        test_list.append(1)

        tail = test_list.tail
        head = test_list.head

        self.assertIsNot(head, tail)
        self.assertEqual(tail.value, 1)

    def test_append_doesnt_change_head(self):
        test_list = DoublyLinkedList(20)
        expected = test_list.head
        test_list.append(1)

        actual = test_list.head

        self.assertIs(actual, expected)

    def test_prepend_increments_length(self):
        test_list = DoublyLinkedList(20)
        for i in range(5):
            with self.subTest():
                test_list.prepend(i)
                actual = test_list.length
                expected = i + 2
                self.assertEqual(actual, expected)

    def test_prepend_assigns_new_head(self):
        test_list = DoublyLinkedList(20)
        test_list.prepend(1)

        tail = test_list.tail
        head = test_list.head

        self.assertIsNot(head, tail)
        self.assertEqual(head.value, 1)

    def test_prepend_doesnt_change_tail(self):
        test_list = DoublyLinkedList(20)
        expected = test_list.tail
        test_list.prepend(1)

        actual = test_list.tail

        self.assertIs(actual, expected)

    def test_insert_increments_length(self):
        original_length = self.prepopulated_list.length
        for i in range(1, 5):
            with self.subTest():
                self.prepopulated_list.insert(i*i, i)
                actual = self.prepopulated_list.length
                expected = i + original_length
                self.assertEqual(actual, expected)

    def test_insert_at_start_of_list(self):
        test_list = self.prepopulated_list
        test_list.insert(0, 1)
        actual = test_list.head.value
        self.assertEqual(actual, 1)
        self.assertEqual(test_list.length, 4)

    def test_insert_in_middle_of_list(self):
        test_list = self.prepopulated_list
        old_head = test_list.head
        test_list.insert(1, 1)
        actual = test_list.head.next.value
        new_head = test_list.head
        print(test_list)
        self.assertEqual(actual, 1)
        self.assertIs(old_head, new_head)

    def test_insert_at_the_end_of_list(self):
        test_list = self.prepopulated_list
        old_tail = test_list.tail
        test_list.insert(3, 1)
        actual = test_list.tail.value
        new_tail = test_list.tail
        self.assertEqual(actual, 1)
        self.assertIsNot(old_tail, new_tail)
        self.assertEqual(test_list.length, 4)


if __name__ == "__main__":
    unittest.main()
