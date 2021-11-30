class HashTable:

    def __init__(self, size):
        self.data = [None for _ in range(size)]

    @staticmethod
    def __hash(key):
        hash_value = 0
        for i, character in enumerate(str(key)):
            hash_value = (hash_value + (ord(character) * i)) % len(key)
        return hash_value

    def set(self, key, value):
        key_index = self.__hash(key)
        if not self.data[key_index]:
            self.data[key_index] = list()
            self.data[key_index].append([key, value])
        else:
            # check for hash collision
            key_already_exists = False
            for i, key_value_pair in enumerate(self.data[key_index]):
                if key_value_pair[0] == key:
                    self.data[key_index][i][1] = value
                    key_already_exists = True
                    break
            # store name if collision
            if not key_already_exists:
                self.data[key_index].append([key, value])

    def get(self, key):
        key_index = self.__hash(key)
        if self.data[key_index]:
            for key_value_pair in self.data[key_index]:
                if key == key_value_pair[0]:
                    return key_value_pair[1]

    def keys(self):
        keys_list = []
        for hash_location in self.data:
            if hash_location:
                for key_value_pair in hash_location:
                    keys_list.append(key_value_pair[0])
        return keys_list


myHashTable = HashTable(50)

myHashTable.set('grapes', 10000)
print(myHashTable.get('grapes'))

myHashTable.set('bread', 100)
myHashTable.set('wine', 50)
print(myHashTable.keys())
