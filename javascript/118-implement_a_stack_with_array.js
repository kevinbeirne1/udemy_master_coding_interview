var Mocha = require('mocha')
var assert = require('chai').assert
var expect = require('chai').expect
var mocha = new Mocha()


class Stack {
    constructor() {
        this.stack = [];
    }

    get length () {
        return this.stack.length
    }

    get top (){
        if (this.stack.length === 0) {
            return null
        }
        return this.stack[this.stack.length - 1]
    }

    get bottom () {
        if (this.stack.length === 0) {
            return null
        }
        return this.stack[0]
    }

    get next () {
        if (this.stack.length <= 1) {
            return null
        }
        return this.stack[this.stack.length - 2]
    }


    push(value) {
        /*
        Adds the item to the top of the stack
         */
        if (value === undefined) {
            throw new TypeError('push() expects a value to be provided.')
        }
        this.stack.push(value)
    }

    pop() {
        /*
        Removes the top item from the stack and returns the value
         */
        if (this.length === 0) {
            throw new TypeError('cannot pop() an empty stack.')
        }
        return this.stack.pop()
    }

    peek() {
        /*
        Returns the value of the top item in the stack without removing it
         */
        if (!this.top) {
            throw new TypeError('cannot peek() an empty stack.')
        }
        return this.top
    }

    isEmpty() {
        /*
        Returns true is stack contains no items
         */
        return this.length === 0
    }
}

describe('Stack', () => {
    context('Creation', () => {
    it('should have a top property === null', () => {
        expect(new Stack().top).to.equal(null)
    });

    it('should have a bottom property === null', () => {
        expect(new Stack().bottom).to.equal(null)
    });

    it('should have a length property equal to 0', () => {
        expect(new Stack().length).to.equal(0)
    })
  });

    context('Push', () => {
      beforeEach(() => {
          this.stack = new Stack()
      })

      it('should increment the length of the stack', () => {
          let stack = new Stack()
          stack.push(5)
          expect(stack.length).to.equal(1)
          stack.push(99)
          expect(stack.length).to.equal(2)
      })

      it('should throw an error if no value provided', () => {
          expect(() => {new Stack().push()}).to.Throw(TypeError,'push() expects a value to be provided.')
      })

      it('should set the top === equal to the new value', () => {
          let stack = new Stack()
          stack.push(5)
          expect(stack.top).to.equal(5)
      })

      it('should set top equal to bottom when push to empty stack', () => {
          let stack = new Stack()
          stack.push(5)
          expect(stack.bottom).to.equal(5)
      })


      it('should update top to pushed value when push to non empty list', () => {
          let stack = new Stack()
          stack.push(5)
          stack.push(99)
          expect(stack.top).to.equal(99)
      })

      it('should maintain the link to previous item when push to non empty list', () => {
          let stack = new Stack()
          stack.push(5)
          let old_top = stack.top
          stack.push(99)
          expect(stack.next).to.equal(old_top)
      })

      it('should not change bottom when push to non empty list', () => {
          let stack = new Stack()
          stack.push(5)
          stack.push(99)
          expect(stack.bottom).to.equal(5)
      })
  })

    context('Pop', () => {
        beforeEach(() => {
            this.stack = new Stack();
            this.stack.push(5);
            this.stack.push(7);
            this.stack.push(9);
        })

        it('should decrement the length of the stack', () => {
            this.stack.pop();
            expect(this.stack.length).to.equal(2);

            this.stack.pop();
            expect(this.stack.length).to.equal(1);

            this.stack.pop();
            expect(this.stack.length).to.equal(0);
        })

        it('should throw an error if pop() an empty stack', () => {
            expect(() => {
                new Stack().pop();
            }).to.Throw(TypeError,'cannot pop() an empty stack.')
        })

        it('should set the top equal to the next node', () => {
            let next = this.stack.next;
            this.stack.pop();
            expect(this.stack.top).to.equal(next);

            next = this.stack.next;
            this.stack.pop();
            expect(this.stack.top).to.equal(next);
        })

        it('should set top equal to bottom when only one item left in stack after pop', () => {
            this.stack.pop();
            expect(this.stack.top).to.not.equal(this.stack.bottom);

            this.stack.pop();
            expect(this.stack.top).to.equal(this.stack.bottom);
        })

        it('should return the value of old top item in the stack', () => {
            let top_value = this.stack.top;
            expect(this.stack.pop()).to.equal(top_value);

            top_value = this.stack.top;
            expect(this.stack.pop()).to.equal(top_value);

            top_value = this.stack.top;
            expect(this.stack.pop()).to.equal(top_value);
        })

        it('should not change bottom when pop to a stack with more than 1 item', () => {
            let original_bottom = this.stack.bottom;
            this.stack.pop();
            expect(this.stack.bottom).to.equal(original_bottom);
        })
    })

    context('Peek', () => {
        before(() => {
            this.stack = new Stack();
            this.stack.push(5);
            this.stack.push(7);
            this.stack.push(9);
        })

        it('should not change the length of the stack', () => {
            let old_length = this.stack.length
            this.stack.peek()
            expect(this.stack.length).to.equal(old_length)
        })

        it('should not change the top item of the stack', () => {
            let old_top = this.stack.top
            this.stack.peek()
            expect(this.stack.top).to.equal(old_top)
        })

        it('should not change the bottom item of the stack', () => {
            let old_bottom = this.stack.bottom
            this.stack.peek()
            expect(this.stack.bottom).to.equal(old_bottom)
        })

        it('should return the value of the top item in the stack', () => {
            let top_value = this.stack.top
            expect(this.stack.peek()).to.equal(top_value)
        })

        it('should throw an error if peek() an empty stack', () => {
            expect(() => {
                new Stack().peek();
            }).to.Throw(TypeError,'cannot peek() an empty stack.')
        })
    })

    context('isEmpty', () => {
        it('should return true if stack is empty', () => {
            expect(new Stack().isEmpty()).to.equal(true)
        })
        it('should return false if stack is not empty', () => {
            let stack = new Stack()
            stack.push(4)
            expect(stack.isEmpty()).to.equal(false)
        })
    })
});

mocha.run()