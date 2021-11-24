import unittest


class MyArray:

    def __init__(self):
        self.length = 0
        self.data = {}

    def get(self, index):
        try:
            return self.data[index]
        except KeyError:
            raise IndexError('list index out of range')

    def push(self, new_item):
        self.data[self.length] = new_item
        self.length += 1

    def pop(self):
        last_item = self.data[self.length - 1]
        del self.data[self.length - 1]
        self.length -= 1
        return last_item

    def delete(self, index):
        self.__shift_items(index)
        del self.data[self.length - 1]
        self.length -= 1

    def __shift_items(self, index):
        for i in range(index, self.length - 1):
            self.data[i] = self.data[i+1]

    def __len__(self):
        return self.length


class TestMyArray(unittest.TestCase):

    def setUp(self) -> None:
        self.empty_array = MyArray()
        self.pre_populated_array = MyArray()
        for word in ['hi', 'there', 'hello', 'you', '!']:
            self.pre_populated_array.push(word)

    def test_get_on_empty_array_raises_index_error(self):
        with self.assertRaises(IndexError) as e_info:
            self.empty_array.get(0)
            
    def test_empty_array_has_length_zero(self):
        actual = len(self.empty_array)
        self.assertEqual(actual, 0)

    def test_single_push_adds_item_to_data(self):
        self.empty_array.push('first_item')
        actual = self.empty_array.get(0)
        expected = 'first_item'
        self.assertEqual(actual, expected)

    def test_single_push_increments_length(self):
        self.empty_array.push('first_item')
        actual = len(self.empty_array)
        self.assertEqual(actual, 1)

    def test_pop_deletes_the_last_word(self):
        self.pre_populated_array.get(4)  # shouldn't raise
        self.pre_populated_array.pop()
        with self.assertRaises(IndexError):
            self.pre_populated_array.get(4)

    def test_delete_shifts_array_indexes(self):
        self.pre_populated_array.delete(0)
        expected_results = ['there', 'hello', 'you', '!']
        for i, expected_result in enumerate(expected_results):
            with self.subTest():
                actual = self.pre_populated_array.get(i)
                self.assertEqual(actual, expected_result)


unittest.main()
