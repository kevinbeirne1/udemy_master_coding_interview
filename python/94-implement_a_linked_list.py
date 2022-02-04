# Create the below linked list
# 10 --> 5 --> 16 --> null

import unittest


class Node:

    def __init__(self, value):
        self.value = value
        self.next = None

    def __repr__(self):
        return f"{self.value}, {self.next}" if self.next else f"{self.value}"

    # def __iter__(self):
    #     yield self.next

class LinkedList:

    def __init__(self, value):
        self.head = Node(value)
        self.tail = self.head
        self.length = 1

    def append(self, value):
        new_node = Node(value)
        self.tail.next = new_node
        self.tail = new_node
        self.length += 1

    def prepend(self, value):
        new_node = Node(value)
        new_node.next = self.head
        self.head = new_node
        self.length += 1

    def insert(self, index: int, value):
        """
        Going to assume positive integer received for index
        """

        if index == 0:
            self.prepend(value)
        elif index >= self.length:
            self.append(value)
        else:
            new_node = Node(value)
            leader_node = self.head
            for _ in range(1, index):
                leader_node = leader_node.next

            new_node.next = leader_node.next
            leader_node.next = new_node
            self.length += 1

    def __iter__(self):
        node = self.head
        while node is not None:
            yield node
            node = node.next

    def remove(self, index):
        if index == 0:
            self.head = self.head.next
        elif index < self.length:
            leader_node = self.head
            for _ in range(1, index):
                leader_node = leader_node.next
            leader_node.next = leader_node.next.next
            if not leader_node.next:
                self.tail = leader_node
        self.length -= 1

    def reverse(self):
        current_node = self.head
        follower = None
        # self.tail = follower
        # for _ in range(self.length):
        #     next_node = current_node.next
        #     current_node.next = follower
        #     follower = current_node
        #     current_node = next_node
        # self.head = follower
        list_copy = self.copy()
        for node in self:
            node.next = follower
            follower = node
            print(follower)
        self.head, self.tail = self.tail, self.head
        # print(self.head.value, self.head.next)
        # print(self.tail.value, self.tail.next)


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
        self.prepopulated_list = LinkedList(20)
        self.prepopulated_list.append(21)
        self.prepopulated_list.append(22)

    def test_new_linked_list_raises_error_without_value(self):
        with self.assertRaises(TypeError):
            LinkedList()

    def test_new_linked_list_assigns_node_instance_to_head(self):
        actual = LinkedList(20).head
        self.assertIsInstance(actual, Node)

    def test_new_linked_list_length_equals_ones(self):
        actual = LinkedList(20).length
        self.assertEqual(actual, 1)

    def test_new_linked_list_head_is_tail(self):
        test_list = LinkedList(20)
        actual = test_list.tail
        expected = test_list.head
        self.assertIs(actual, expected)

    def test_append_increments_length(self):
        test_list = LinkedList(20)
        for i in range(5):
            with self.subTest():
                test_list.append(i)
                actual = test_list.length
                expected = i + 2
                self.assertEqual(actual, expected)

    def test_append_assigns_new_tail(self):
        test_list = LinkedList(20)
        test_list.append(1)

        tail = test_list.tail
        head = test_list.head

        self.assertIsNot(head, tail)
        self.assertEqual(tail.value, 1)

    def test_append_doesnt_change_head(self):
        test_list = LinkedList(20)
        expected = test_list.head
        test_list.append(1)

        actual = test_list.head

        self.assertIs(actual, expected)

    def test_prepend_increments_length(self):
        test_list = LinkedList(20)
        for i in range(5):
            with self.subTest():
                test_list.prepend(i)
                actual = test_list.length
                expected = i + 2
                self.assertEqual(actual, expected)

    def test_prepend_assigns_new_head(self):
        test_list = LinkedList(20)
        test_list.prepend(1)

        tail = test_list.tail
        head = test_list.head

        self.assertIsNot(head, tail)
        self.assertEqual(head.value, 1)

    def test_prepend_doesnt_change_tail(self):
        test_list = LinkedList(20)
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

    def test_remove_decrements_length(self):
        original_length = self.prepopulated_list.length
        for i in range(2):
            with self.subTest():
                self.prepopulated_list.remove(i)
                actual = self.prepopulated_list.length
                expected = original_length - 1 - i
                self.assertEqual(actual, expected)

    def test_remove_at_start_of_list(self):
        test_list = self.prepopulated_list
        expected = test_list.head.next
        test_list.remove(0)
        actual = test_list.head
        self.assertEqual(actual, expected)

    def test_remove_in_middle_of_list(self):
        test_list = self.prepopulated_list
        test_list.remove(1)
        actual = test_list.tail
        expected = test_list.head.next
        self.assertEqual(actual, expected)

    def test_remove_at_the_end_of_list(self):
        test_list = self.prepopulated_list
        expected = test_list.head.next
        test_list.remove(2)
        actual = test_list.tail
        self.assertEqual(actual, expected)

    def test_reverse(self):
        test_list = self.prepopulated_list
        test_list.reverse()
        expected = "22, 21, 20"
        actual = str(test_list)
        self.assertEqual(actual, expected)

    def test_dunder_iter(self):
        test_list = self.prepopulated_list
        for node in test_list:
            # print(node.value)
            pass

if __name__ == "__main__":
    unittest.main()

test = LinkedList(10)
test.append(5)
test.append(16)
test.prepend(42)
test.remove(0)
print(test)
print(test.head)

