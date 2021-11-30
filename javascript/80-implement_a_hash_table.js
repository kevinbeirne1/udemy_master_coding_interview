class HashTable {
    constructor(size) {
        this.data = new Array(size);
    }

    _hash(key) {
        let hash = 0;
        for (let i=0; i<key.length; i++) {
            hash = (hash + key.charCodeAt(i) * i) % this.data.length;
        }
        return hash;
    }

    set(key, value) {
        let key_index = this._hash(key);
        if (!this.data[key_index]) {
            this.data[key_index] = [];
        }
        let key_already_exists = false;
        for (let i=0; i<this.data[key_index].length; i++) {
            if (this.data[key_index][i][0] === key) {
                this.data[key_index][i][1] = value;
                key_already_exists = true;
                break
            }
        }
        if (!key_already_exists) {
            this.data[key_index].push([key, value])
        }
    }

    get(key) {
        let key_index = this._hash(key);
        if (this.data[key_index]) {
            for (let i = 0; i < this.data[key_index].length; i++) {
                if (this.data[key_index][i][0] === key) {
                    return this.data[key_index][i][1]
                }
            }
        }
    }

    keys() {
        let keys_list = []
        for (let i=0; i<this.data.length; i++) {
            if (this.data[i]) {
                for (let j=0; j<this.data[i].length; j++)
                    keys_list.push(this.data[i][j][0])

            }
        }
        return keys_list
    }
}

const myHashTable = new HashTable(50);

myHashTable.set('grapes', 10000);
console.log(myHashTable.get('grapes'));

myHashTable.set('flowers', 40);
myHashTable.set('bread', 200);
console.log(myHashTable.keys());