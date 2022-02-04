var Mocha = require('mocha')
var assert = require('chai').assert
var expect = require('chai').expect
var mocha = new Mocha()


function memoizedFibonacci() {
    let cache = {}

    return function fib(n) {
        if (n === undefined) {
            throw TypeError('No value specified')
        }
        if (n in cache) {
            return cache[n]
        }

        if (n <= 1) {
            cache[n] = n
            return n // value
        }
        else {
            cache[n] = fib(n - 1) + fib(n - 2)
            return cache[n]
        }
    }
}

let fibonacci = memoizedFibonacci()

describe("Test memoized recursive fibonacci", ()=> {
    it('should throw TypeError if no value provided', () => {
        expect(() => {fibonacci()}).to.throw(TypeError, 'No value specified')
    })

    it('should return 0 for value === 0', () => {
        expect(fibonacci(0)).to.equal(0)
    })

    it('should return 1 for value === 1', () => {
        expect(fibonacci(1)).to.equal(1)
    })

    it('should return 1 for value === 2', () => {
        expect(fibonacci(2)).to.equal(1)
    })

    it('should return 21 for value === 8', () => {
        expect(fibonacci(8)).to.equal(21)
    })

    it('should return 144 for value === 12', () => {
        expect(fibonacci(12)).to.equal(144)
    })

    it('should return 9227465 for value === 35', () => {
        expect(fibonacci(35)).to.equal(9227465)
    })
})


mocha.run()
