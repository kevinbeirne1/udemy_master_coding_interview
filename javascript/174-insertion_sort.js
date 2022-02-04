var Mocha = require('mocha');
var assert = require('chai').assert;
var expect = require('chai').expect;
var mocha = new Mocha();

class Node {
    constructor(value) {
        if (value === undefined) {
            throw new TypeError("Node() expects a value for construction.");
        }
        this.value = value;
        this.next = null;
    }

    toString() {
        let tail_string = ""
        if (this.next) {
            tail_string = `, ${this.next}`
        }
        return `${this.value}${tail_string}`
    }
}

class LinkedList {

    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(value){
        if (value === undefined) {
            throw TypeError("LinkedList.append requires a value to be passed");
        }
        let newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
        }
        else {
            this.tail.next = newNode;

        }
        this.tail = newNode;
        this.length ++;
    }

    prepend(value) {
        if (value === undefined) {
            throw TypeError("LinkedList.prepend requires a value to be passed");
        }
        let newNode = new Node(value);
        if (!this.tail) {
            this.tail = newNode;
        }
        else {
            newNode.next = this.head
        }
        this.head = newNode;
        this.length ++;

    }

    insert(index, value) {
        if (index === undefined || value === undefined) {
            throw TypeError("LinkedList.insert requires an index and value to be passed");
        }
        if (index === 0) {
            this.prepend(value);
        }
        else if (index >= this.length) {
            this.append(value)
        }
        else {
            let newNode = new Node(value);
            let current_node = this.head;
            for (let i=0; i<index - 1; i++) {
                current_node = current_node.next
            }
            newNode.next = current_node.next
            current_node.next = newNode

            this.length ++;
        }
    }

    toString() {
        return this.head.toString()
    }

    toArray() {
        let outputArray = []
        let currentNode = this.head
        for (let i=0; i<this.length; i++) {
            outputArray.push(currentNode.value)
            currentNode = currentNode.next
        }
        return outputArray
    }

}

function insertionSortLinkedList(input_array) {
    if (!(input_array instanceof Array)) {
        throw TypeError("An array is required for insertionSort")
    }
    let linked_list = new LinkedList()
    for (let i=0; i<input_array.length; i++) {
        if ((linked_list.length === 0) || (input_array[i] < linked_list.head.value)) {
            linked_list.prepend(input_array[i])
        }
        else if (input_array[i] > linked_list.tail.value) {
            linked_list.append(input_array[i])
        }
        else {
            let currentNode = linked_list.head.next
            for (let j = 1; j < linked_list.length; j++) {
                if (input_array[i] < currentNode.value) {
                    linked_list.insert(j, input_array[i])
                    break
                }
                else {
                    currentNode = currentNode.next
                }
            }
        }
    }
    return linked_list.toArray()
}


function insertionSort(input_array) {
    if (!(input_array instanceof Array)) {
        throw TypeError("An array is required for insertionSort")
    }
    let len = input_array.length

    for (let i=1; i<len; i++) {
        let current = input_array[i]
        let j = i-1
        // console.log(`index: ${i} - ${current}`)
        while (j >= 0 && input_array[j] > current) {
            input_array[j+1] = input_array[j]
            j--;
        }
        input_array[j+1] = current
    }
    return input_array
}

describe('Node', () => {
    context('Creation', () => {
        it('should raise error if no value provided', () => {
            expect(() => {new Node()}).to.Throw()
        });

        it('should have a next_node property === null', () => {
            expect(new Node(3).next).to.equal(null)
        });

        it('should have a value property equal to the value provided', () => {
            expect(new Node(3).value).to.equal(3)
        })
    });

    context('toString', () => {
        it('should return a string of the node value if no children', () => {
            let node = new Node(20)
            expect(node.toString()).to.equal('20')
        })

        it('should return a string of the node value, child if one child', () => {
            let parentNode = new Node(20)
            parentNode.next = new Node(3)
            expect(parentNode.toString()).to.equal('20, 3')
        })

        it('should return a string of the node {value, child, child, child} if 3 childred', () => {
            let parentNode = new Node(5)
            let childNode = new Node(1)
            parentNode.next = childNode

            childNode = parentNode
            parentNode = new Node(10)
            parentNode.next = childNode

            childNode = parentNode
            parentNode = new Node(6)
            parentNode.next = childNode

            childNode = parentNode
            parentNode = new Node(23)
            parentNode.next = childNode

            expect(parentNode.toString()).to.equal('23, 6, 10, 5, 1')
        })

    })

});


describe('Linked List', () => {
    context('Creation', () => {
        it('should have a head property === null', () => {
            expect(new LinkedList().head).to.equal(null)
        });

        it('should have a tail property === null', () => {
            expect(new LinkedList().tail).to.equal(null)
        });

        it('should have a length property equal to 0', () => {
            expect(new LinkedList().length).to.equal(0)
        })
    });

    context('Append', () => {
        it('should throw if no value passed', () => {
            let list = new LinkedList()
            expect(() => list.append()).to.throw(TypeError, "LinkedList.append requires a value to be passed")

        })

        it('should set node as head on empty list', () => {
            let list = new LinkedList()
            list.append(4)
            expect(list.head).to.be.instanceOf(Node)
        })

        it('should set node as tail on empty list', () => {
            let list = new LinkedList()
            list.append(4)
            expect(list.tail).to.be.instanceOf(Node)
        })

        it('should set tail === head for empty list', () => {
            let list = new LinkedList()
            list.append(4)
            expect(list.tail).to.equal(list.head)
        })

        it('should set the tail.value === value', () => {
            let list = new LinkedList()
            list.append(4)
            expect(list.tail.value).to.equal(4)
            list.append(6)
            expect(list.tail.value).to.equal(6)
        })

        it('should not change head on non empty list', () => {
            let list = new LinkedList()
            list.append(4)
            let old_head = list.head
            list.append(6)
            expect(list.head).to.equal(old_head)
        })

        it('should increment the length', () => {
            let list = new LinkedList()
            list.append(4)
            expect(list.length).to.equal(1)
            list.append(5)
            expect(list.length).to.equal(2)
            list.append(6)
            expect(list.length).to.equal(3)
        })

        it('should maintain the link to items already in the list', () => {
            let list = new LinkedList()
            list.append(4)
            let old_tail = list.tail

            list.append(5)
            expect(old_tail.next).to.equal(list.tail)
            list.append(6)
            expect(old_tail.next.next).to.equal(list.tail)
        })
    })
    
    context('Prepend', () => {
        it('should throw if no value passed', () => {
            let list = new LinkedList()
            expect(() => list.prepend()).to.throw(TypeError, "LinkedList.prepend requires a value to be passed")

        })

        it('should set node as head on empty list', () => {
            let list = new LinkedList()
            list.prepend(4)
            expect(list.head).to.be.instanceOf(Node)
        })

        it('should set node as tail on empty list', () => {
            let list = new LinkedList()
            list.prepend(4)
            expect(list.tail).to.be.instanceOf(Node)
        })

        it('should set tail === head for empty list', () => {
            let list = new LinkedList()
            list.prepend(4)
            expect(list.tail).to.equal(list.head)
        })

        it('should set the head.value === value', () => {
            let list = new LinkedList()
            list.prepend(4)
            expect(list.head.value).to.equal(4)
            list.prepend(6)
            expect(list.head.value).to.equal(6)
        })

        it('should not change tail on non empty list', () => {
            let list = new LinkedList()
            list.prepend(4)
            let old_tail = list.tail
            list.prepend(6)
            expect(list.tail).to.equal(old_tail)
        })

        it('should increment the length', () => {
            let list = new LinkedList()
            list.prepend(4)
            expect(list.length).to.equal(1)
            list.prepend(5)
            expect(list.length).to.equal(2)
            list.prepend(6)
            expect(list.length).to.equal(3)
        })

        it('should maintain the link to items already in the list', () => {
            let list = new LinkedList()
            list.prepend(4)
            let old_head = list.head

            list.prepend(5)
            expect(list.head.next).to.equal(old_head)
            list.prepend(6)
            expect(list.head.next.next).to.equal(old_head)
        })
    })

    context('Insert', () => {
        beforeEach(() => {
            this.list = new LinkedList()
            for (let i=1; i<6; i++) {
                this.list.append(i)
            }
        });

        it('it should throw if no parameters passed', () => {
            expect(() => this.list.insert()).to.throw(TypeError, "LinkedList.insert requires an index and value to be passed")
        });


        it('it should throw if only one parameter passed', () => {
            expect(() => this.list.insert(4)).to.throw(TypeError, "LinkedList.insert requires an index and value to be passed")
        });

        it('should change the head if index === 0', () => {
            this.list.insert(0, 10)
            expect(this.list.head.value).to.equal(10)
        })

        it('should not change the head if index !== 0', () => {
            let original_head = this.list.head
            this.list.insert(3, 20)
            expect(this.list.head).to.equal(original_head)
        })

        it('should change the tail if index === list.length', () => {
            this.list.insert(this.list.length, 20)
            expect(this.list.tail.value).to.equal(20)
        })

        it('should change the tail if index > list.length', () => {
            this.list.insert(this.list.length + 20, 20)
            expect(this.list.tail.value).to.equal(20)

        })

        it('should set index 1 to passed value', () => {
            this.list.insert(1, 20);
            expect(this.list.head.next.value).to.equal(20);
        })

        it('should insert to index 1 and maintain link to the list', () => {
            let expected_node = this.list.head.next;
            this.list.insert(1, 20);
            expect(this.list.head.next.next).to.equal(expected_node);
        })


        it('should set index 3 to passed value', () => {
            this.list.insert(3, 20);
            let node_value = this.list.head.next.next.next.value
            expect(node_value).to.equal(20);
        })

        it('should insert to index 3 and maintain link to the list', () => {
            let expected_node = this.list.head.next.next.next.next;
            this.list.insert(3, 20);
            let actual_node = this.list.head.next.next.next.next.next;
            expect(actual_node).to.equal(expected_node);
        })


        it('should increment the length of the list', () => {
            let expected_length = this.list.length;

            this.list.insert(0, 1);
            expected_length ++;
            expect(this.list.length).to.equal(expected_length)

            this.list.insert(10, 1);
            expected_length ++;
            expect(this.list.length).to.equal(expected_length)

            this.list.insert(3, 1);
            expected_length ++;
            expect(this.list.length).to.equal(expected_length)
        })

    })

    context('toString', () => {
        it('should return string of head node', () => {
            let list = new LinkedList();
            for (let i=1; i<6; i++) {
                list.append(i);
            }
            let expected_string = list.head.toString();
            expect(list.toString()).to.equal(expected_string);
        })
    })

    context('toArray', () => {
        it('should return an empty Array if empty list', () => {
            let list = new LinkedList()
            expect(JSON.stringify(list.toArray())).to.equal(JSON.stringify([]))
        })

        it('should return an instance of Array', () => {
            let list = new LinkedList()
            expect(list.toArray()).is.instanceOf(Array)
        })

        it('should return an array if one item in the list', () => {
            let list = new LinkedList()
            list.append(4)
            let actualArray = JSON.stringify(list.toArray())
            let expectedArray = JSON.stringify([4])
            expect(actualArray).is.equal(expectedArray)
        })

        it('should return an array if two items in the list', () => {
            let list = new LinkedList()
            list.append(4)
            list.append(6)
            let actualArray = JSON.stringify(list.toArray())
            let expectedArray = JSON.stringify([4, 6])
            expect(actualArray).is.equal(expectedArray)
        })

        it('should return an array if six items in the list', () => {
            let list = new LinkedList()
            for (i=0; i<6; i++) {
                list.append(i)
            }
            let actualArray = JSON.stringify(list.toArray())
            let expectedArray = JSON.stringify([0, 1, 2, 3, 4, 5])
            expect(actualArray).is.equal(expectedArray)
        })
    })

});


describe('Insertion Sort', () => {
    context('Input Validation', () => {
        it('should throw TypeError if string passed', () => {
            expect(() => {insertionSort('str')}).to.throw(TypeError, "An array is required for insertionSort")
        })

        it('should throw TypeError if int passed', () => {
            expect(() => {insertionSort(1)}).to.throw(TypeError, "An array is required for insertionSort")
        })

        it('should throw TypeError if no parameter passed', () => {
            expect(() => {insertionSort()}).to.throw(TypeError, "An array is required for insertionSort")
        })
    })
    
     context('Number sorting', () => {
         
        it('should sort a list of length 1', () => {
            let actual = JSON.stringify(insertionSort([1]))
            let expected_output = JSON.stringify([1])
            expect(actual).to.equal(expected_output)
        })

        it('should not change the ordering of a pre-sorted list of length 3', () => {
            let actual = JSON.stringify(insertionSort([1, 2, 3]))
            let expected_output = JSON.stringify([1, 2, 3])
            expect(actual).to.equal(expected_output)
        })

        it('should re-order a reverse sorted list of length 3', () => {
            let actual = JSON.stringify(insertionSort([3, 2, 1]))
            let expected_output = JSON.stringify([1, 2, 3])
            expect(actual).to.equal(expected_output)
        })

        it('should re-order a reverse sorted list of length 6', () => {
            let actual = JSON.stringify(insertionSort([6, 5, 4, 3, 2, 1]))
            let expected_output = JSON.stringify([1, 2, 3, 4, 5, 6])
            expect(actual).to.equal(expected_output)
        })

        it('should re-order a randomly sorted list of length 8', () => {
            let actual = JSON.stringify(insertionSort([6, 5, 3, 1, 8, 7, 2, 4]))
            let expected_output = JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8])
            expect(actual).to.equal(expected_output)
        })
    })
})


mocha.run()