// Create the below linked list
// 10 --> 5 --> 16 --> null

class Node {
    constructor(value) {
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

    reverse() {
        /*
        Iterate through the list
        At each node create follower_node
        set follower_node.next = current_node
        making an array of the values
        reverse through the array creating a linked_list node for each
         */
        let follower_node = null;
        this.tail = follower_node;

        let current_node = this.head
        for (let i=0; i < this.length; i++) {
            let next_node = current_node.next;
            current_node.next = follower_node;
            follower_node = current_node;
            current_node = next_node;
        }
        this.head = follower_node;
    }

    toString() {
        return `${this.head}`
    }
}

let myLinkedList = new LinkedList(10)
myLinkedList.append(5)
myLinkedList.append(16)
myLinkedList.prepend(42)
myLinkedList.insert(3, 45)

console.log(myLinkedList.toString())
myLinkedList.reverse()
console.log(myLinkedList.toString())

