var Mocha = require('mocha')
var assert = require('chai').assert
var expect = require('chai').expect
var mocha = new Mocha()


class Node {
    constructor(value) {
        if (value === undefined) {
            throw new TypeError("Node() expects a value for construction.")
        }
        this.value = value;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.first_node = null;
        this.last_node = null;
        this.length = 0;
    }

    get first () {
        if (!this.first_node) {
            return null
        }
        return this.first_node.value
    }

    get last() {
        if (!this.last_node) {
            return null
        }
        return this.last_node.value
    }

    get next () {
        if (!this.first_node.next) {
            return null
        }
        return this.first_node.next.value
    }

    enqueue(value) {
        /*
        Adds the item to the back of the queue
         */

        if (value === undefined) {
            throw new TypeError('enqueue() expects a value to be provided.')
        }
        let node = new Node(value)

        if (!this.last_node) {
            this.last_node = node
            this.first_node = this.last_node
        }
        else {
            this.last_node.next = node
            this.last_node = node
        }
        this.last_node = node
        this.length ++;
    }

    dequeue() {
        /*
        Removes the first item from the queue and returns the value
         */
        if (this.length === 0) {
            throw new TypeError('cannot dequeue() an empty queue.')
        }
        let old_first = this.first
        this.first_node = this.first_node.next
        this.length --;
        return old_first
    }

    peek() {
        /*
        Returns the value of the first item in the queue without removing it
         */
        if (!this.last_node) {
            throw new TypeError('cannot peek() an empty queue.')
        }
        return this.first
    }

    isEmpty() {
        /*
        Returns true if queue contains no items
         */
        return this.length === 0
    }
}

describe('Node', function() {
  context('Creation', function() {
    it('should raise error if no value provided', () => {
        expect(() => {new Node()}).to.Throw()
    });

    it('should have a next property === null', () => {
        expect(new Node(3).next).to.equal(null)
    });

    it('should have a value property equal to the value provided', () => {
        expect(new Node(3).value).to.equal(3)
    })
  });

});

describe('Queue', () => {
    context('Creation', () => {
    it('should have a first property === null', () => {
        expect(new Queue().first).to.equal(null)
    });

    it('should have a last property === null', () => {
        expect(new Queue().last).to.equal(null)
    });

    it('should have a length property equal to 0', () => {
        expect(new Queue().length).to.equal(0)
    })
  });

    context('Enqueue', () => {
      beforeEach(() => {
          this.stack = new Queue()
      })

      it('should increment the length of the queue', () => {
          let queue = new Queue()
          queue.enqueue(5)
          expect(queue.length).to.equal(1)
          queue.enqueue(99)
          expect(queue.length).to.equal(2)
      })

      it('should throw an error if no value provided', () => {
          expect(() => {new Queue().enqueue()}).to.Throw(TypeError,'enqueue() expects a value to be provided.')
      })

      it('should set the last === equal to the new value when enqueue to empty queue', () => {
          let queue = new Queue()
          queue.enqueue(5)
          expect(queue.last).to.equal(5)
      })

      it('should set first equal to last when enqueue to empty queue', () => {
          let queue = new Queue()
          queue.enqueue(5)
          expect(queue.first).to.equal(queue.last)
      })

      it('should update last to new value when enqueue to non empty list', () => {
          let queue = new Queue()
          queue.enqueue(5)
          queue.enqueue(99)
          expect(queue.last).to.equal(99)
      })

      it('should maintain the link to previous item when push to non empty list', () => {
          let queue = new Queue()
          queue.enqueue(5)
          // let old_last = queue.last
          queue.enqueue(99)
          expect(queue.next).to.equal(queue.last)
      })

      it('should not change first when enqueue to non empty list', () => {
          let queue = new Queue()
          queue.enqueue(5)
          queue.enqueue(99)
          expect(queue.first).to.equal(5)
      })
  })

    context('Dequeue', () => {
        beforeEach(() => {
            this.queue = new Queue();
            this.queue.enqueue(5);
            this.queue.enqueue(7);
            this.queue.enqueue(9);
        })

        it('should decrement the length of the queue', () => {
            this.queue.dequeue();
            expect(this.queue.length).to.equal(2);

            this.queue.dequeue();
            expect(this.queue.length).to.equal(1);

            this.queue.dequeue();
            expect(this.queue.length).to.equal(0);
        })

        it('should throw an error if dequeue() an empty queue', () => {
            expect(() => {
                new Queue().dequeue();
            }).to.Throw(TypeError,'cannot dequeue() an empty queue.')
        })

        it('should set the first equal to the next node', () => {
            let next = this.queue.next;
            this.queue.dequeue();
            expect(this.queue.first).to.equal(next);

            next = this.queue.next;
            this.queue.dequeue();
            expect(this.queue.first).to.equal(next);
        })

        it('should set first equal to last when only one item left in queue after dequeue', () => {
            this.queue.dequeue();
            expect(this.queue.first).to.not.equal(this.queue.last);

            this.queue.dequeue();
            expect(this.queue.first).to.equal(this.queue.last);
        })

        it('should return the value of old first item in the queue', () => {
            let first = this.queue.first;
            expect(this.queue.dequeue()).to.equal(first);

            first = this.queue.first;
            expect(this.queue.dequeue()).to.equal(first);

            first = this.queue.first;
            expect(this.queue.dequeue()).to.equal(first);
        })

        it('should not change last when dequeue to a queue with more than 1 item', () => {
            let original_last = this.queue.last;
            this.queue.dequeue();
            expect(this.queue.last).to.equal(original_last);
        })
    })

    context('Peek', () => {
        before(() => {
            this.queue = new Queue();
            this.queue.enqueue(5);
            this.queue.enqueue(7);
            this.queue.enqueue(9);
        })

        it('should not change the length of the queue', () => {
            let old_length = this.queue.length
            this.queue.peek()
            expect(this.queue.length).to.equal(old_length)
        })

        it('should not change the first item of the queue', () => {
            let old_first = this.queue.first
            this.queue.peek()
            expect(this.queue.first).to.equal(old_first)
        })

        it('should not change the last item of the queue', () => {
            let old_last = this.queue.last
            this.queue.peek()
            expect(this.queue.last).to.equal(old_last)
        })

        it('should return the value of the first item in the queue', () => {
            let first = this.queue.first
            expect(this.queue.peek()).to.equal(first)
        })

        it('should throw an error if peek() an empty queue', () => {
            expect(() => {
                new Queue().peek();
            }).to.Throw(TypeError,'cannot peek() an empty queue.')
        })
    })

    context('isEmpty', () => {
        it('should return true if queue is empty', () => {
            expect(new Queue().isEmpty()).to.equal(true)
        })
        it('should return false if queue is not empty', () => {
            let queue = new Queue()
            queue.enqueue(4)
            expect(queue.isEmpty()).to.equal(false)
        })
    })
});

mocha.run()