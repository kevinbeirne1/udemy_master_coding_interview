import unittest


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

    def lookup(self, value):
        current_node = self.root
        while current_node:
            if value == current_node.value:
                return True
            elif current_node.value > value:
                current_node = current_node.left
            else:
                current_node = current_node.right

        return False

    def remove(self, value):
        if not self.lookup(value):
            raise ValueError

        current_node = self.root
        parent_node = None

        while current_node:
            if value < current_node.value:
                parent_node = current_node
                current_node = current_node.left
            elif value > current_node.value:
                parent_node = current_node
                current_node = current_node.right

            elif value == current_node.value:

                # Option 1: No Right child
                if not current_node.right:
                    if not parent_node:
                        self.root = current_node.left
                    elif parent_node.value > value:
                        parent_node.left = current_node.left
                    elif parent_node.value < value:
                        parent_node.right = current_node.left
                    break

                # Option 2: Right child that doesn't have a left
                elif not current_node.right.left:
                    if not parent_node:

                        current_node.left = self.root.left
                        self.root = self.root.right
                    elif value < parent_node.value:
                        parent_node.left = current_node.right
                        current_node.right.left = current_node.left
                    else:
                        parent_node.right = current_node.right
                        current_node.right.left = current_node.left
                    break
                # Option 3: Right child that has a left child

                else:
                    replacement_node = current_node.right.left
                    replacement_parent = current_node.right
                    while replacement_node.left:
                        replacement_parent = replacement_node
                        replacement_node = replacement_node.left
                    if not parent_node:
                        self.root = replacement_node
                    else:
                        if value < parent_node.value:
                            parent_node.left = replacement_node
                        elif value > parent_node.value:
                            parent_node.right = replacement_node

                    replacement_parent.left = replacement_node.right
                    replacement_node.left = current_node.left
                    replacement_node.right = current_node.right
                    break
            # break


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


class TestBinarySearchTreeLookup(unittest.TestCase):

    def setUp(self) -> None:
        self.bst = BinarySearchTree()
        for num in (9, 4, 6, 20, 170, 15, 1):
            self.bst.insert(num)
        """
        Tree structure:
                  9
               /    \
              4      20
             / \    / \
            1   6  15  170
        """

    def test_returns_true_for_root(self):
        actual = self.bst.lookup(9)
        self.assertTrue(actual)

    def test_returns_true_for_left_value(self):
        actual = self.bst.lookup(4)
        self.assertTrue(actual)

    def test_returns_true_for_rightt_value(self):
        actual = self.bst.lookup(20)
        self.assertTrue(actual)

    def test_returns_true_for_left_left_value(self):
        actual = self.bst.lookup(1)
        self.assertTrue(actual)

    def test_returns_true_for_left_right_value(self):
        actual = self.bst.lookup(6)
        self.assertTrue(actual)

    def test_returns_true_for_right_left_value(self):
        actual = self.bst.lookup(15)
        self.assertTrue(actual)

    def test_returns_true_for_right_right_value(self):
        actual = self.bst.lookup(170)
        self.assertTrue(actual)

    def test_return_false_if_lookup_in_empty_tree(self):
        actual = BinarySearchTree().lookup(5)
        self.assertFalse(actual)

    def test_return_false_if_value_not_in_tree(self):
        actual = self.bst.lookup(55)
        self.assertFalse(actual)


class TestBinarySearchTreeRemove(unittest.TestCase):

    def setUp(self) -> None:
        self.bst = BinarySearchTree()
        for num in (9, 4, 6, 20, 170, 15, 1):
            self.bst.insert(num)
        """
        Tree structure:
                  9
               /    \
              4      20
             / \    / \
            1   6  15  170
        """

    def test_raise_if_no_value_provided(self):
        with self.assertRaises(TypeError):
            self.bst.remove()

    def test_raises_if_value_not_in_tree(self):
        with self.assertRaises(ValueError):
            self.bst.remove(55)

    def test_raises_if_empty_tree(self):
        tree = BinarySearchTree()
        with self.assertRaises(ValueError):
            tree.remove(55)

    def test_removes_root_if_only_one_node(self):
        tree = BinarySearchTree()
        tree.insert(9)
        tree.remove(9)
        actual = tree.root
        self.assertEqual(actual, None)

    def test_moves_right_to_root_if_only_two_nodes(self):
        tree = BinarySearchTree()
        tree.insert(9)
        tree.insert(15)
        tree.remove(9)
        actual = tree.root.value
        self.assertEqual(actual, 15)

    def test_moves_left_to_root_if_only_two_nodes(self):
        tree = BinarySearchTree()
        tree.insert(9)
        tree.insert(7)
        tree.remove(9)
        actual = tree.root.value
        self.assertEqual(actual, 7)

    def test_removes_left_branch_if_only_two_nodes(self):
        tree = BinarySearchTree()
        tree.insert(9)
        tree.insert(7)
        tree.remove(7)
        actual = tree.root.left
        self.assertEqual(actual, None)

    def test_removes_right_branch_if_only_two_nodes(self):
        tree = BinarySearchTree()
        tree.insert(9)
        tree.insert(11)
        tree.remove(11)
        actual = tree.root.right
        self.assertEqual(actual, None)

    def test_changes_root_when_remove_root_with_3_balanced_nodes(self):
        tree = BinarySearchTree()
        tree.insert(10)
        tree.insert(15)
        tree.insert(5)
        tree.remove(10)
        actual = tree.root.value
        self.assertEqual(actual, 15)

    def test_changes_right_when_remove_root_with_3_balanced_nodes(self):
        tree = BinarySearchTree()
        tree.insert(10)
        tree.insert(15)
        tree.insert(5)
        tree.remove(10)
        actual = tree.root.right
        self.assertEqual(actual, None)

    def test_remove_root_left_left_leaf_on_3_tier_tree(self):
        self.bst.remove(1)
        actual = self.bst.root.left.left
        self.assertEqual(actual, None)

    def test_remove_root_left_right_leaf_on_3_tier_tree(self):
        self.bst.remove(6)
        actual = self.bst.root.left.right
        self.assertEqual(actual, None)

    def test_remove_root_right_left_leaf_on_3_tier_tree(self):
        self.bst.remove(15)
        actual = self.bst.root.right.left
        self.assertEqual(actual, None)

    def test_remove_root_right_right_leaf_on_3_tier_tree(self):
        self.bst.remove(170)
        actual = self.bst.root.right.right
        self.assertEqual(actual, None)

    def test_remove_root_right_on_3_tier_tree_changes_right_right(self):
        self.bst.remove(20)
        actual = self.bst.root.right.right
        self.assertEqual(actual, None)

    def test_remove_root_right_on_3_tier_tree_changes_right(self):
        self.bst.remove(20)
        actual = self.bst.root.right.value
        self.assertEqual(actual, 170)

    def test_remove_root_right_on_3_tier_tree_maintains_right_left(self):
        expected = self.bst.root.right.left
        self.bst.remove(20)
        actual = self.bst.root.right.left
        self.assertEqual(actual, expected)

    def test_remove_root_left_on_3_tier_tree_changes_left_right(self):
        self.bst.remove(4)
        actual = self.bst.root.left.right
        self.assertEqual(actual, None)

    def test_remove_root_left_on_3_tier_tree_changes_left(self):
        self.bst.remove(4)
        actual = self.bst.root.left.value
        self.assertEqual(actual, 6)

    def test_remove_root_left_on_3_tier_tree_maintains_left_left(self):
        expected = self.bst.root.left.left
        self.bst.remove(4)
        actual = self.bst.root.left.left
        self.assertEqual(actual, expected)

    def test_delete_root_on_3_tier_tree(self):
        self.bst.remove(9)
        actual = self.bst.root.value
        self.assertEqual(actual, 15)

    def test_delete_root_changes_root_on_4_tier_tree(self):
        self.bst.insert(12)
        self.bst.remove(9)
        actual = self.bst.root.value
        self.assertEqual(actual, 12)

    def test_delete_root_causes_shift_on_4_tier_tree(self):
        self.bst.insert(12)
        self.bst.remove(9)
        right = self.bst.root.right.value
        self.assertEqual(right, 20)
        right_left = self.bst.root.right.left.value
        self.assertEqual(right_left, 15)
        right_left_left = self.bst.root.right.left.left
        self.assertEqual(right_left_left, None)

    def test_delete_left_and_shift_on_4_tier_tree(self):
        self.bst.insert(5)
        self.bst.remove(4)
        left_right = self.bst.root.left.right.value
        self.assertEqual(left_right, 6)
        left = self.bst.root.left.value
        self.assertEqual(left, 5)

    def test_delete_root_causes_shift_on_5_tier_tree(self):
        self.bst.insert(10)
        self.bst.insert(12)
        self.bst.remove(9)
        # print(self.bst)
        right = self.bst.root.right.value
        self.assertEqual(right, 20)
        right_left = self.bst.root.right.left.value
        self.assertEqual(right_left, 15)
        right_left_left = self.bst.root.right.left.left.value
        self.assertEqual(right_left_left, 12)
        right_left_right = self.bst.root.right.left.right
        self.assertEqual(right_left_right, None)
        right_left_left_left = self.bst.root.right.left.left.left
        self.assertEqual(right_left_left_left, None)
        right_left_left_right = self.bst.root.right.left.left.right
        self.assertEqual(right_left_left_right, None)


if __name__ == "__main__":
    unittest.main()
