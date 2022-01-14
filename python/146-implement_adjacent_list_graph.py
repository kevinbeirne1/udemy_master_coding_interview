import unittest


class Graph:

    def __init__(self):
        self.adjacent = {}

    @property
    def number_of_nodes(self):
        return len(self.adjacent)

    def add_vertex(self, node):
        if not self.adjacent.get(node):
            self.adjacent[node] = set()

    def add_edge(self, node1, node2):
        self.adjacent[node1].add(node2)
        self.adjacent[node2].add(node1)


class TestGraphCreation(unittest.TestCase):

    def test_has_number_of_nodes_property(self):
        graph = Graph()
        actual = graph.number_of_nodes
        self.assertEqual(actual, 0)

    def test_has_adjacent_property_that_is_dict(self):
        graph = Graph()
        actual = graph.adjacent
        self.assertIsInstance(actual, dict)

    def test_adjacent_property_is_empty(self):
        graph = Graph()
        actual = len(graph.adjacent)
        self.assertEqual(actual, 0)


class TestAddVertex(unittest.TestCase):

    def setUp(self) -> None:
        self.graph = Graph()

    def test_raises_if_no_node_passed(self):
        with self.assertRaises(TypeError):
            self.graph.add_vertex()

    def test_increments_number_of_nodes(self):
        nodes = [2, 3, 4]
        for i, node in enumerate(nodes, 1):
            with self.subTest():
                self.graph.add_vertex(node)
                actual = self.graph.number_of_nodes
                self.assertEqual(actual, i)

    def test_doesnt_increments_number_of_nodes_if_node_already_added(self):
        test_cases = [(2, 1), (2, 1), (3, 2), (2, 2)]
        for node, node_count in test_cases:
            with self.subTest():
                self.graph.add_vertex(node)
                actual = self.graph.number_of_nodes
                self.assertEqual(actual, node_count)

    def test_doesnt_overwrite_adjacents_if_node_already_exists(self):
        expected = {1, 2, 3}
        self.graph.adjacent[3] = expected
        self.graph.add_vertex(3)
        actual = self.graph.adjacent[3]
        self.assertEqual(actual, expected)

    def test_node_adjacency_returns_set(self):
        self.graph.add_vertex(1)
        actual = self.graph.adjacent[1]
        self.assertEqual(actual, set())

    def test_accepts_0_as_valid_node(self):
        self.graph.add_vertex(0)
        actual = self.graph.number_of_nodes
        self.assertEqual(actual, 1)


class TestAddEdge(unittest.TestCase):

    def setUp(self) -> None:
        self.graph = Graph()
        for i in range(7):
            self.graph.add_vertex(i)

    def test_raises_if_no_values_passes(self):
        with self.assertRaises(TypeError):
            self.graph.add_edge()

    def test_raises_if_only_one_value_passed(self):
        with self.assertRaises(TypeError):
            self.graph.add_edge(1)

    def test_adds_1st_node_to_adjacent_list_of_2nd_node(self):
        self.graph.add_edge(1, 2)
        actual = self.graph.adjacent[1]
        expected = {2}
        self.assertEqual(actual, expected)

    def test_adds_2nd_node_to_adjacent_list_of_1st_node(self):
        self.graph.add_edge(1, 2)
        actual = self.graph.adjacent[2]
        expected = {1}
        self.assertEqual(actual, expected)

    def test_accepts_0_as_valid_node1(self):
        self.graph.add_edge(0, 2)
        actual = self.graph.adjacent[0]
        expected = {2}
        self.assertEqual(actual, expected)

    def test_accepts_0_as_valid_node2(self):
        self.graph.add_edge(2, 0)
        actual = self.graph.adjacent[2]
        expected = {0}
        self.assertEqual(actual, expected)

    def test_adds_multiple_adjacent_nodes(self):
        self.graph.add_edge(1, 2)
        self.graph.add_edge(1, 3)
        actual = self.graph.adjacent[1]
        expected = {2, 3}
        self.assertEqual(actual, expected)

    def test_doesnt_duplicate_nodes_in_adjacent_list(self):
        self.graph.add_edge(1, 2)
        self.graph.add_edge(1, 2)
        actual = self.graph.adjacent[1]
        expected = {2}
        self.assertEqual(actual, expected)

    def test_can_create_multi_node_tree(self):
        edges = [[0, 1], [0, 2], [1, 2], [1, 3], [3, 4], [2, 4], [4, 5], [5, 6]]
        for edge in edges:
            self.graph.add_edge(*edge)
            
        expected_adjacency = {
                0: {1, 2},
                1: {0, 2, 3},
                2: {0, 1, 4},
                3: {1, 4},
                4: {2, 3, 5},
                5: {4, 6},
                6: {5},
            }
        actual = self.graph.adjacent
        self.assertEqual(actual, expected_adjacency)


if __name__ == "__main__":
    unittest.main()
