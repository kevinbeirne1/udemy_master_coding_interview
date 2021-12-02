// Create the below linked list
// 10 --> 5 --> 16 --> null

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.previous = null;
    }

}


class DoublyLinkedList {
    constructor(value) {
        this.head = new Node(value)
        this.tail = this.head;
        this.length = 1;
    }

    append (value) {
        let newNode = new Node(value);
        this.tail.next = newNode;
        newNode.previous = this.tail
        this.tail = newNode;
        this.length ++;
    }

    prepend (value) {
        let newNode = new Node(value);
        newNode.next = this.head;
        this.head.previous = newNode
        this.head = newNode;
        this.length ++;
    }

    insert (index, value) {

        if (index === 0) {
            this.prepend(value);
        }
        else if (index >= this.length) {
            this.append(value);
        }
        else {
            let newNode = new Node(value);
            let leaderNode = this.head;
            for (let i = 1; i < index; i++) {
                leaderNode = leaderNode.next;
            }
            let followerNode = leaderNode.next
            newNode.next = followerNode;
            newNode.previous = leaderNode
            followerNode.previous = newNode;
            leaderNode.next = newNode;

            this.length ++;
        }
    }

    remove (index) {
        if (index === 0) {
            this.head = this.head.next;
        }
        else if (index < this.length) {
            let leaderNode = this.head;
            for (let i = 1; i < index; i++) {
                leaderNode = leaderNode.next;
            }
            let followerNode = leaderNode.next.next

            leaderNode.next = followerNode;
            followerNode.previous = leaderNode;
            if (! leaderNode.next) {
                this.tail = leaderNode;
            }
        }
        this.length --;
    }

}

let myLinkedList = new DoublyLinkedList(10)
myLinkedList.append(5)
console.log("\n")
myLinkedList.append(16)
myLinkedList.prepend(42)
myLinkedList.insert(3, 45)

console.log(myLinkedList.length)
console.log(myLinkedList)
