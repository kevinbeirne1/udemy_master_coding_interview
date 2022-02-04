import unittest
from collections import deque

class Node:

    def __init__(self, value):
        self.value = value
        self.right = None
        self.left = None

    def __str__(self):
        children = ""
        if self.left or self.right:
            children = f" [{self.left} - {self.right}]"
        return f"{self.value}{children}"


class BinarySearchTree:

    def __init__(self):
        self.root = None

    def __str__(self):
        return f"{self.root}"

    def insert(self, value):
        new_node = Node(value)
        current_node = self.root
        if not self.root:
            self.root = new_node
        else:
            while current_node:
                if current_node.value > value:
                    if not current_node.left:
                        current_node.left = new_node
                        break
                    current_node = current_node.left
                elif current_node.value < value:
                    if not current_node.right:
                        current_node.right = new_node
                        break
                    current_node = current_node.right

    def populate_tree(self, input_array):
        for value in input_array:
            self.insert(value)

    def depth_first_search_pre_order(self, node=None, visited=None):
        if not self.root:
            return []
        if not isinstance(visited, list):
            visited = []
            node = self.root

        visited.append(node.value)
        if node.left:
            self.depth_first_search_pre_order(node.left, visited)
        if node.right:
            self.depth_first_search_pre_order(node.right, visited)
        return visited

    def depth_first_search_in_order(self, node=None, visited=None):
        if not self.root:
            return []
        if not isinstance(visited, list):
            visited = []
            node = self.root

        if node.left:
            self.depth_first_search_in_order(node.left, visited)
        visited.append(node.value)

        if node.right:
            self.depth_first_search_in_order(node.right, visited)
        return visited
    
    def depth_first_search_post_order(self, node=None, visited=None):
        if not self.root:
            return []
        if not isinstance(visited, list):
            visited = []
            node = self.root

        if node.left:
            self.depth_first_search_post_order(node.left, visited)

        if node.right:
            self.depth_first_search_post_order(node.right, visited)

        visited.append(node.value)
        return visited

class TestNode(unittest.TestCase):

    def test_raises_error_if_no_value_provided(self):
        with self.assertRaises(TypeError):
            Node()

    def test_has_a_left_property(self):
        node = Node(3)
        actual = node.left
        self.assertEqual(actual, None)

    def test_has_a_right_property(self):
        node = Node(3)
        actual = node.right
        self.assertEqual(actual, None)

    def test_sets_value_property(self):
        node = Node(3)
        actual = node.value
        self.assertEqual(actual, 3)


class TestBinarySearchTreeCreation(unittest.TestCase):

    def test_has_root_property(self):
        bst = BinarySearchTree()
        actual = bst.root
        self.assertEqual(actual, None)


class TestBinarySearchTreeInsert(unittest.TestCase):

    def setUp(self) -> None:
        self.bst = BinarySearchTree()
        self.bst.root = Node(20)

    def test_sets_root_to_node_on_empty_tree(self):
        tree = BinarySearchTree()
        tree.insert(20)
        actual = tree.root
        self.assertIsInstance(actual, Node)

    def test_sets_root_passed_value_on_empty_tree(self):
        tree = BinarySearchTree()
        tree.insert(20)
        actual = tree.root.value
        self.assertEqual(actual, 20)

    def test_doesnt_change_the_root_on_non_empty_tree(self):
        expected = self.bst.root.value
        self.bst.insert(5)
        actual = self.bst.root.value
        self.assertEqual(actual, expected)

    def test_put_value_less_root_to_left_branch_on_non_empty_tree(self):
        self.bst.insert(5)
        actual = self.bst.root.left.value
        self.assertEqual(actual, 5)

    def test_put_value_greater_root_to_right_branch_on_non_empty_tree(self):
        self.bst.insert(25)
        actual = self.bst.root.right.value
        self.assertEqual(actual, 25)

    def test_put_insert_multiple_values_in_row(self):
        self.bst.insert(5)
        self.bst.insert(25)

        left = self.bst.root.left.value
        self.assertEqual(left, 5)
        right = self.bst.root.right.value
        self.assertEqual(right, 25)

    def test_doesnt_overwrite_left_branch_when_insert_on_non_empty_tree(self):
        self.bst.insert(5)
        expected = self.bst.root.left.value
        self.bst.insert(1)
        actual = self.bst.root.left.value
        self.assertEqual(actual, expected)

    def test_doesnt_overwrite_right_branch_when_insert_on_non_empty_tree(self):
        self.bst.insert(25)
        expected = self.bst.root.right.value
        self.bst.insert(40)
        actual = self.bst.root.right.value
        self.assertEqual(actual, expected)

    def test_inserts_left_left_branch_on_3rd_level(self):
        self.bst.insert(5)
        self.bst.insert(1)
        actual = self.bst.root.left.left.value
        self.assertEqual(actual, 1)

    def test_inserts_left_right_branch_on_3rd_level(self):
        self.bst.insert(5)
        self.bst.insert(10)
        actual = self.bst.root.left.right.value
        self.assertEqual(actual, 10)

    def test_inserts_right_left_branch_on_3rd_level(self):
        self.bst.insert(30)
        self.bst.insert(25)
        actual = self.bst.root.right.left.value
        self.assertEqual(actual, 25)

    def test_inserts_right_right_branch_on_3rd_level(self):
        self.bst.insert(30)
        self.bst.insert(35)
        actual = self.bst.root.right.right.value
        self.assertEqual(actual, 35)

    def test_inserts_right_left_right_left_branch_on_5th_level(self):
        self.bst.insert(40)
        self.bst.insert(35)
        self.bst.insert(39)
        self.bst.insert(37)

        actual = self.bst.root.right.left.right.left.value
        self.assertEqual(actual, 37)


class TestPopulateTree(unittest.TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        cls.test_cases = [
            ([1], "1"),
            ([4, 1], "4 [1 - None]"),
            ([4, 1, 6], "4 [1 - 6]"),
            ([9, 4, 6, 20, 170, 1, 15], "9 [4 [1 - 6] - 20 [15 - 170]]"),

        ]

    def test_raises_if_no_parameter_passed(self):
        with self.assertRaises(TypeError):
            BinarySearchTree().populate_tree()

    def test_populate_tree(self):
        for test_case, expected_result in self.test_cases:
            with self.subTest(f"Test case: {test_case}"):
                tree = BinarySearchTree()
                tree.populate_tree(test_case)


class TestDepthFirstSearchInOrder(unittest.TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        cls.test_cases = [
            ([], []),
            ([1], [1]),
            ([4, 1], [1, 4]),
            ([1, 4], [1, 4]),
            ([4, 2, 6, 1], [1, 2, 4, 6]),
            ([4, 7, 6, 9, 10], [4, 6, 7, 9, 10]),
            ([9, 4, 6, 20, 170, 15, 1], [1, 4, 6, 9, 15, 20, 170]),
        ]

    def test_breadth_first_search_in_order(self):
        for test_case, expected_result in self.test_cases:
            with self.subTest(f"Test case: {test_case}"):
                tree = BinarySearchTree()
                tree.populate_tree(test_case)
                actual = tree.depth_first_search_in_order()
                self.assertEqual(actual, expected_result)


class TestDepthFirstSearchPreOrder(unittest.TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        cls.test_cases = [
            ([], []),
            ([1], [1]),
            ([4, 1], [4, 1]),
            ([1, 4], [1, 4]),
            ([4, 2, 6, 1], [4, 2, 1, 6]),
            ([4, 7, 6, 9, 10], [4, 7, 6, 9, 10]),
            ([9, 4, 6, 20, 170, 15, 1], [9, 4, 1, 6, 20, 15, 170]),
        ]

    def test_breadth_first_search_pre_order(self):
        for test_case, expected_result in self.test_cases:
            with self.subTest(f"Test case: {test_case}"):
                tree = BinarySearchTree()
                tree.populate_tree(test_case)
                actual = tree.depth_first_search_pre_order()
                self.assertEqual(actual, expected_result)


class TestDepthFirstSearchPostOrder(unittest.TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        cls.test_cases = [
            ([], []),
            ([1], [1]),
            ([4, 1], [1, 4]),
            ([1, 4], [4, 1]),
            ([4, 2, 6, 1], [1, 2, 6, 4]),
            ([4, 7, 6, 9, 10], [6, 10, 9, 7, 4]),
            ([9, 4, 6, 20, 170, 15, 1], [1, 6, 4, 15, 170, 20, 9]),
        ]

    def test_breadth_first_search_post_order(self):
        for test_case, expected_result in self.test_cases:
            with self.subTest(f"Test case: {test_case}"):
                tree = BinarySearchTree()
                tree.populate_tree(test_case)
                actual = tree.depth_first_search_post_order()
                self.assertEqual(actual, expected_result)


if __name__ == "__main__":
    unittest.main()
