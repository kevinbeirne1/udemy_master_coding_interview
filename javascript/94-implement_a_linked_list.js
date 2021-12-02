// Create the below linked list
// 10 --> 5 --> 16 --> null

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }

}


class LinkedList {
    constructor(value) {
        this.head = new Node(value)
        this.tail = this.head;
        this.length = 1;
    }

    append (value) {
        let newNode = new Node(value);
        this.tail.next = newNode;
        this.tail = newNode;
        this.length ++;
    }

    prepend (value) {
        let newNode = new Node(value);
        newNode.next = this.head;
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
            newNode.next = leaderNode.next;
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
            leaderNode.next = leaderNode.next.next;
            if (! leaderNode.next) {
                this.tail = leaderNode;
            }
        }
        this.length --;
    }
}

let myLinkedList = new LinkedList(10)
console.log("\n")
myLinkedList.append(5)
console.log("\n")
myLinkedList.append(16)
myLinkedList.prepend(42)
myLinkedList.insert(3, 45)

console.log(myLinkedList.length)
console.log(myLinkedList)
