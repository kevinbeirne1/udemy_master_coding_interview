var Mocha = require('mocha');
var assert = require('chai').assert;
var expect = require('chai').expect;
var mocha = new Mocha();


class Node {
    constructor(value) {
        if (value === undefined) {
            throw new TypeError("Node() expects a value for construction.")
        }
        this.value = value
        this.left = null
        this.right = null
    }

}

class BinarySearchTree {
    constructor() {
        this.root = null
    }

    insert(value) {
        if (!this.root) {
            this.root = new Node(value)
        }
        else {
            let current_node = this.root
            let previous_node = null
            while (current_node) {
                // Traverse the tree to find where to insert
                previous_node = current_node
                if (current_node.value > value) {
                    current_node = current_node.left
                }
                else {
                    current_node = current_node.right
                }
            }
            if (previous_node.value > value) {
                previous_node.left = new Node(value)
            }
            else if (previous_node.value < value) {
                previous_node.right = new Node(value)
            }
        }
    }

    lookup(value) {
        let current_node = this.root
        while (current_node) {
            if (current_node.value > value) {
                current_node = current_node.left
            }
            else if (current_node.value < value){
                current_node = current_node.right
            }
            else {
                return true
            }
        }
        return false
    }

    remove(value) {
        if (value === undefined) {
            throw new TypeError('remove() expects a value to be provided.')
        }
        else if (!this.lookup(value)) {
            throw new RangeError("Value is not in tree")
        }
        let currentNode = this.root;
        let parentNode = null;

        while (currentNode) {
            if (value < currentNode.value) {
                parentNode = currentNode
                currentNode = currentNode.left
            }

            else if (value > currentNode.value) {
                parentNode = currentNode
                currentNode = currentNode.right
            }
            else if (currentNode.value === value) {
                // We have a match get to work

                //Option 1: No right child:
                if (currentNode.right === null) {
                    if (parentNode === null) {
                        this.root = currentNode.left
                    }
                    else if (parentNode.value > value) {
                        parentNode.left = currentNode.left
                    }
                    else if (parentNode.value < value) {
                        parentNode.right = currentNode.left
                    }
                    return this
                }

                // Option 2: Right child that doesn't have a left
                if (currentNode.right.left === null) {
                    if (parentNode === null) {
                        currentNode.left = this.root.left
                        this.root = currentNode.right
                    }
                    else if (value < parentNode.value) {
                        parentNode.left = currentNode.right
                        currentNode.right.left = currentNode.left
                    }
                    else {
                        parentNode.right = currentNode.right
                        currentNode.right.left = currentNode.left

                    }

                    return this

                }

                // Option 3: Right Child that has a left child
                else {
                    let replacementNode = currentNode.right.left
                    let replacementParent = currentNode.right
                    while (replacementNode.left) {
                        replacementParent = replacementNode
                        replacementNode = replacementNode.left
                    }
                    replacementParent.left = replacementNode.right
                    replacementNode.left = currentNode.left
                    replacementNode.right = currentNode.right
                    if (parentNode === null) {
                        this.root = replacementNode
                    }
                    else if (value < parentNode.value) {
                        parentNode.left = replacementNode
                    }
                    else if (value > parentNode.value) {
                        parentNode.right = replacementNode
                    }
                    return replacementNode

                }
            }
        }
    }

    populateTree(input_array) {
        if (!(input_array instanceof Array)) {
            throw TypeError('An Array instance is required for populateTree')
        }
        for (let value of input_array) {
            this.insert(value)
        }
    }

    DFSInOrder(current_node, visited) {
        if (!visited) {
            current_node = this.root;
            visited = [];
        }
        if (!current_node) {
            return []
        }

        if (current_node.left) {
            this.DFSInOrder(current_node.left, visited)

        }
        visited.push(current_node.value)

        if (current_node.right) {
            this.DFSInOrder(current_node.right, visited)
        }
        return visited
    }
    
    DFSPreOrder(current_node, visited) {
        if (!visited) {
            current_node = this.root;
            visited = [];
        }
        if (!current_node) {
            return []
        }
        visited.push(current_node.value)

        if (current_node.left) {
            this.DFSPreOrder(current_node.left, visited)
        }
        if (current_node.right) {
            this.DFSPreOrder(current_node.right, visited)
        }
        return visited
    }
    
    DFSPostOrder(current_node, visited) {
        if (!visited) {
            current_node = this.root;
            visited = [];
        }
        if (!current_node) {
            return []
        }

        if (current_node.left) {
            this.DFSPostOrder(current_node.left, visited)

        }
        if (current_node.right) { //} && !(current_node.right.value in visited)) {
            this.DFSPostOrder(current_node.right, visited)
        }
        visited.push(current_node.value)
        return visited
    }
}

describe('Node', function() {
  context('Creation', function() {
    it('should raise error if no value provided', () => {
        expect(() => {new Node()}).to.Throw()
    });

    it('should have a left property === null', () => {
        expect(new Node(3).left).to.equal(null)
    });

    it('should have a right property === null', () => {
        expect(new Node(3).right).to.equal(null)
    });

    it('should have a value property equal to the value provided', () => {
        expect(new Node(3).value).to.equal(3)
    })
  });

});

describe('BinarySearchTree', function() {
    context('Creation', function () {

        it('should have a root property === null', () => {
            expect(new BinarySearchTree().root).to.equal(null)
        });
    });

    context('Insert', () => {
        beforeEach(() => {
            this.bst = new BinarySearchTree();
            this.bst.root = new Node(20)
        })

        it('should set the root to a Node instance on empty tree ', () => {
            let tree = new BinarySearchTree()
            tree.insert(20);
            expect(tree.root).is.instanceOf(Node)
        })

        it('should set the root value to the passed value on empty tree', () => {
            let tree = new BinarySearchTree()
            tree.insert(20);
            expect(tree.root.value).equals(20)
        })

        it('should not change the root value on non empty tree', () => {
            this.bst.insert(5)
            expect(this.bst.root.value).equals(20)
        })

        it('should put (num < root) to left branch on non empty tree', () => {
            this.bst.insert(5)
            expect(this.bst.root.left.value).equals(5)
        })

        it('should put (num > root) to right branch on non empty tree', () => {
            this.bst.insert(25)
            expect(this.bst.root.right.value).equals(25)
        })

        it('should be able insert multiple values in a row', () => {
            this.bst.insert(5)
            this.bst.insert(25)
            expect(this.bst.root.left.value).equals(5)
            expect(this.bst.root.right.value).equals(25)
        })

        it('should not overwrite left branch when insert on non empty tree', () => {
            this.bst.insert(5)
            this.bst.insert(1)
            expect(this.bst.root.left.value).equals(5)

        })

        it('should not overwrite right branch when insert on non empty tree', () => {
            this.bst.insert(25)
            this.bst.insert(40)
            expect(this.bst.root.right.value).equals(25)
        })

        it('should insert a left-left branch on the 3rd level on empty tree', () => {
            this.bst.insert(5)
            this.bst.insert(1)
            expect(this.bst.root.left.left.value).equals(1)
        })

        it('should insert a left-right branch on the 3rd level on empty tree', () => {
            this.bst.insert(5)
            this.bst.insert(10)
            expect(this.bst.root.left.right.value).equals(10)
        })

        it('should insert a right-left branch on the 3rd level on empty tree', () => {
            this.bst.insert(30)
            this.bst.insert(25)
            expect(this.bst.root.right.left.value).equals(25)
        })

        it('should insert a right-right branch on the 3rd level on empty tree', () => {
            this.bst.insert(30)
            this.bst.insert(35)
            expect(this.bst.root.right.right.value).equals(35)
        })

        it('should insert a right-left-right-left branch on the 3rd level on empty tree', () => {
            this.bst.insert(40)
            this.bst.insert(35)
            this.bst.insert(39)
            this.bst.insert(37)

            expect(this.bst.root.right.left.right.left.value).equals(37)
        })

    });

    context('Lookup', function () {
        beforeEach(() => {
            this.bst = new BinarySearchTree();
            this.bst.insert(9)
            this.bst.insert(4);
            this.bst.insert(6);
            this.bst.insert(20);
            this.bst.insert(170);
            this.bst.insert(15);
            this.bst.insert(1);
            /*
            Tree structure:
                    9
                 /    \
                4      20
               / \    / \
              1   6  15  170
             */
        })

        it('should return true for root value', () => {
            expect(this.bst.lookup(9)).to.equal(true)
        })

        it('should return true for 1st level value on left branch', () => {
            expect(this.bst.lookup(4)).to.equal(true)
        })

        it('should return true for 1st level value on right', () => {
            expect(this.bst.lookup(20)).to.equal(true)
        })

        it('should return true for 2nd level value on left-left branch', () => {
            expect(this.bst.lookup(1)).to.equal(true)
        })

        it('should return true for 2nd level value on left-right branch', () => {
            expect(this.bst.lookup(6)).to.equal(true)
        })

        it('should return true for 2nd level value on right-left branch', () => {
            expect(this.bst.lookup(15)).to.equal(true)
        })

        it('should return true for 2nd level value on right-right branch', () => {
            expect(this.bst.lookup(170)).to.equal(true)
        })

        it('should return false if value not in tree', () => {
            expect(this.bst.lookup(55)).to.equal(false)
        })

        it('should return false if lookup in empty tree', () => {
            expect(new BinarySearchTree().lookup(55)).to.equal(false)
        })
    });

    context('Remove', function () {
        beforeEach(() => {
            this.bst = new BinarySearchTree();
            this.bst.insert(9)
            this.bst.insert(4);
            this.bst.insert(6);
            this.bst.insert(20);
            this.bst.insert(170);
            this.bst.insert(15);
            this.bst.insert(1);
            /*
            Tree structure:
                    9
                 /    \
                4      20
               / \    / \
              1   6  15  170
             */
        })

        it('should throw an error if no value provided', () => {
            expect(() => {
                this.bst.remove()
            }).to.Throw(TypeError, 'remove() expects a value to be provided.')
        })

        it('should return error if value not in tree', () => {
            expect(() => {
                this.bst.remove(55)
            }).to.Throw(RangeError, "Value is not in tree")
        })

        it('should return error if empty tree', () => {
            expect(() => {
                new BinarySearchTree().remove(55)
            }).to.Throw(RangeError, "Value is not in tree")
        })

        it('should remove root if only one node', () => {
            let newTree = new BinarySearchTree()
            newTree.insert(9)
            newTree.remove(9)
            expect(newTree.root).to.equal(null)
        })

        it('should move right to root if only two nodes', () => {
            let newTree = new BinarySearchTree()
            newTree.insert(9)
            newTree.insert(15)
            newTree.remove(9)
            expect(newTree.root.value).to.equal(15)
        })

        it('should move left to root if only two nodes', () => {
            let newTree = new BinarySearchTree()
            newTree.insert(9)
            newTree.insert(7)
            newTree.remove(9)
            expect(newTree.root.value).to.equal(7)
        })

        it('should remove left branch when only two nodes', () => {
            let newTree = new BinarySearchTree()
            newTree.insert(9)
            newTree.insert(7)
            newTree.remove(7)
            expect(newTree.root.left).to.equal(null)
        })

        it('should remove right branch when only two nodes', () => {
            let newTree = new BinarySearchTree()
            newTree.insert(9)
            newTree.insert(11)
            newTree.remove(11)
            expect(newTree.root.right).to.equal(null)
        })

        it('should change the root when remove root with 3 balanced nodes', () => {
            let newTree = new BinarySearchTree()
            newTree.insert(10)
            newTree.insert(15)
            newTree.insert(5)
            newTree.remove(10)
            expect(newTree.root.value).to.equal(15)

        })

        it('should change the right when remove root with 3 balanced nodes', () => {
            let newTree = new BinarySearchTree()
            newTree.insert(10)
            newTree.insert(15)
            newTree.insert(5)
            newTree.remove(10)
            expect(newTree.root.right).to.equal(null)
        })

        it('should remove root-left-left leaf on 3 tier tree', () => {
            this.bst.remove(1)
            expect(this.bst.root.left.left).to.equal(null)
        })

        it('should remove root-left-right leaf on 3 tier tree', () => {
            this.bst.remove(6)
            expect(this.bst.root.left.right).to.equal(null)
        })

        it('should remove root-left-left leaf on 3 tier tree', () => {
            this.bst.remove(1)
            expect(this.bst.root.left.left).to.equal(null)
        })

        it('should remove root-left-right leaf on 3 tier tree', () => {
            this.bst.remove(6)
            expect(this.bst.root.left.right).to.equal(null)
        })

        it('should remove root-right-left leaf on 3 tier tree', () => {
            this.bst.remove(15)
            expect(this.bst.root.right.left).to.equal(null)
        })

        it('should remove root-right-right leaf on 3 tier tree', () => {
            this.bst.remove(170)
            expect(this.bst.root.right.right).to.equal(null)
        })

        it('should delete root and replace on 3 tier tree', () => {
            this.bst.remove(9)
            expect(this.bst.root.value).to.equal(15)
        })

        it('should delete root and maintain the link to right node on 3 tier tree', () => {
            this.bst.remove(9)
            expect(this.bst.root.right.value).to.equal(20)
        })

        it('should delete 2nd tier right and change the node.value on 3 tier tree', () => {
            this.bst.remove(20)
            expect(this.bst.root.right.value).to.equal(170)
        })

        it('should delete 2nd tier right and change the node.right value on 3 tier tree', () => {
            this.bst.remove(20)
            expect(this.bst.root.right.right).to.equal(null)
        })

        it('should delete 2nd tier right and maintain the node.left value on 3 tier tree', () => {
            this.bst.remove(20)
            expect(this.bst.root.right.left.value).to.equal(15)
        })

        it('should delete 2nd tier left and change node.value on 3 tier tree', () => {
            this.bst.remove(4)
            expect(this.bst.root.left.value).to.equal(6)
        })

        it('should delete 2nd tier left and change node.right on 3 tier tree', () => {
            this.bst.remove(4)
            expect(this.bst.root.left.right).to.equal(null)
        })

        it('should delete 2nd tier left and maintain node.left on 3 tier tree', () => {
            this.bst.remove(4)
            expect(this.bst.root.left.left.value).to.equal(1)
        })

        it('should delete root and shift on 4 tier tree', () => {
            this.bst.insert(12)
            this.bst.remove(9)
            expect(this.bst.root.value).to.equal(12)
        })

        it('should delete root and shift on 4 tier tree', () => {
            this.bst.insert(12)
            this.bst.remove(9)
            expect(this.bst.root.right.value).to.equal(20)
            expect(this.bst.root.right.left.value).to.equal(15)
            expect(this.bst.root.right.left.left).to.equal(null)
        })

        it('should delete left branch and shift on 4 tier tree', () => {
            this.bst.insert(5)
            this.bst.remove(4)
            expect(this.bst.root.left.right.value).to.equal(6)
            expect(this.bst.root.left.value).to.equal(5)
        })


    });

    context('PopulateTree', () => {
        beforeEach(() => {
            this.tree = new BinarySearchTree()
        })

        it('should throw a TypeError if no value passed', () => {
            expect(() => {this.tree.populateTree()}).to.throw(TypeError, "An Array instance is required for populateTree");
        })

        it('should throw TypeError if non array passed', () => {
            expect(() => {this.tree.populateTree()}).to.throw(TypeError, "An Array instance is required for populateTree");
        })

        it('should insert a single item into the Tree', () => {
            let values = [1]
            this.tree.populateTree(values)
            expect(this.tree.root.value).to.equal(1)
        })

        it('should insert multiple items into a Tree', () => {
            let values = [4, 1, 6]
            this.tree.populateTree(values)
            expect(this.tree.root.value).to.equal(4)
            expect(this.tree.root.left.value).to.equal(1)
            expect(this.tree.root.right.value).to.equal(6)

        })
    })

})


describe('depthFirstSearchInOrder ', () => {

    context('Tree Traversal', () => {

        beforeEach(() => {
            this.tree = new BinarySearchTree()
        })

        it('should return empty array for empty tree', () => {
            this.tree.populateTree([])
            let actual = JSON.stringify(this.tree.DFSInOrder())
            let expected_output = JSON.stringify([])
            expect(actual).to.equal(expected_output)
        })

        it('should return the root in a single item tree', () => {
            this.tree.populateTree([1])
            let actual = JSON.stringify(this.tree.DFSInOrder())
            let expected_output = JSON.stringify([1])
            expect(actual).to.equal(expected_output)
        })

        it('should return a list for 2 item tree', () => {
            let values = [4, 1]
            this.tree.populateTree(values)
            let actual = JSON.stringify(this.tree.DFSInOrder())
            let expected_output = JSON.stringify([1, 4])
            expect(actual).to.equal(expected_output)
        })

        it('should return a list for 2 item right tree', () => {
            let values = [1, 4]
            this.tree.populateTree(values)
            let actual = JSON.stringify(this.tree.DFSInOrder())
            let expected_output = JSON.stringify([1, 4])
            expect(actual).to.equal(expected_output)
        })

        it('should return a list for 3 item tree', () => {
            let values = [4, 1, 6]
            this.tree.populateTree(values)
            let actual = JSON.stringify(this.tree.DFSInOrder())
            let expected_output = JSON.stringify([1, 4, 6])
            expect(actual).to.equal(expected_output)
        })

        it('should return a list for 4 item tree', () => {
            let values = [4, 2, 6, 1]
            this.tree.populateTree(values)
            let actual = JSON.stringify(this.tree.DFSInOrder())
            let expected_output = JSON.stringify([1, 2, 4, 6])
            expect(actual).to.equal(expected_output)
        })

        it('should return a list for 7 item tree', () => {
            let values = [9, 4, 6, 20, 170, 15, 1]
            this.tree.populateTree(values)
            let actual = JSON.stringify(this.tree.DFSInOrder())
            let expected_output = JSON.stringify([1, 4, 6, 9, 15, 20, 170])
            expect(actual).to.equal(expected_output)
        })
    })
})

describe('depthFirstSearchPostOrder ', () => {

    context('Tree Traversal', () => {

        beforeEach(() => {
            this.tree = new BinarySearchTree()
        })

        it('should return empty array for empty tree', () => {
            this.tree.populateTree([])
            let actual = JSON.stringify(this.tree.DFSPostOrder())
            let expected_output = JSON.stringify([])
            expect(actual).to.equal(expected_output)
        })

        it('should return the root in a single item tree', () => {
            this.tree.populateTree([1])
            let actual = JSON.stringify(this.tree.DFSPostOrder())
            let expected_output = JSON.stringify([1])
            expect(actual).to.equal(expected_output)
        })

        it('should return a list for 3 item tree', () => {
            let values = [4, 1]
            this.tree.populateTree(values)
            let actual = JSON.stringify(this.tree.DFSPostOrder())
            let expected_output = JSON.stringify([1, 4])
            expect(actual).to.equal(expected_output)
        })

        it('should return a list for 3 item tree', () => {
            let values = [4, 1, 6]
            this.tree.populateTree(values)
            let actual = JSON.stringify(this.tree.DFSPostOrder())
            let expected_output = JSON.stringify([1, 6, 4])
            expect(actual).to.equal(expected_output)
        })

        it('should return a list for 4 item tree', () => {
            let values = [4, 2, 6, 1]
            this.tree.populateTree(values)
            let actual = JSON.stringify(this.tree.DFSPostOrder())
            let expected_output = JSON.stringify([1, 2, 6, 4])
            expect(actual).to.equal(expected_output)
        })

        it('should return a list for 7 item tree', () => {
            let values = [9, 4, 6, 20, 170, 15, 1]
            this.tree.populateTree(values)
            let actual = JSON.stringify(this.tree.DFSPostOrder())
            let expected_output = JSON.stringify([1, 6, 4, 15, 170, 20, 9])
            expect(actual).to.equal(expected_output)
        })

        it('should work on an unbalanced tree', () => {
            let values =  [4, 7, 6, 9, 10]
            this.tree.populateTree(values)
            let actual = JSON.stringify(this.tree.DFSPostOrder())
            let expected_output = JSON.stringify([6, 10, 9, 7, 4])
            expect(actual).to.equal(expected_output)
        })
    })
})


describe('depthFirstSearchPreOrder ', () => {

    context('Tree Traversal', () => {

        beforeEach(() => {
            this.tree = new BinarySearchTree()
        })

        it('should return empty array for empty tree', () => {
            this.tree.populateTree([])
            let actual = JSON.stringify(this.tree.DFSPreOrder())
            let expected_output = JSON.stringify([])
            expect(actual).to.equal(expected_output)
        })

        it('should return the root in a single item tree', () => {
            this.tree.populateTree([1])
            let actual = JSON.stringify(this.tree.DFSPreOrder())
            let expected_output = JSON.stringify([1])
            expect(actual).to.equal(expected_output)
        })

        it('should return a list for 3 item tree', () => {
            let values = [4, 1]
            this.tree.populateTree(values)
            let actual = JSON.stringify(this.tree.DFSPreOrder())
            let expected_output = JSON.stringify([4, 1])
            expect(actual).to.equal(expected_output)
        })

        it('should return a list for 3 item tree', () => {
            let values = [4, 1, 6]
            this.tree.populateTree(values)
            let actual = JSON.stringify(this.tree.DFSPreOrder())
            let expected_output = JSON.stringify([4, 1, 6])
            expect(actual).to.equal(expected_output)
        })

        it('should return a list for 4 item tree', () => {
            let values = [4, 2, 6, 1]
            this.tree.populateTree(values)
            let actual = JSON.stringify(this.tree.DFSPreOrder())
            let expected_output = JSON.stringify([4, 2, 1, 6])
            expect(actual).to.equal(expected_output)
        })

        it('should return a list for 7 item tree', () => {
            let values = [9, 4, 6, 20, 170, 15, 1]
            this.tree.populateTree(values)
            let actual = JSON.stringify(this.tree.DFSPreOrder())
            let expected_output = JSON.stringify([9, 4, 1, 6, 20, 15, 170])
            expect(actual).to.equal(expected_output)
        })
    })
})

mocha.run()