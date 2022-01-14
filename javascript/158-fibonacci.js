var Mocha = require('mocha')
var assert = require('chai').assert
var expect = require('chai').expect
var mocha = new Mocha()


function fibonacciIterative(value) {
    if (value === undefined) {
        throw TypeError('No value specified')
    }
    let [current, next] = [0, 1]
    for (let i=0; i<value; i++){
        let old = current
        current = next
        next = current + old
    }
    return current
}

function fibonacciRecursive(value) {
    if (value === undefined) {
        throw TypeError('No value specified')
    }
    if (value <= 1) {
        return value
    }
    return fibonacciRecursive(value-1) + fibonacciRecursive(value - 2)

}

describe("Test fibonacciIterative", ()=> {
    it('should throw TypeError if no value provided', () => {
        expect(() => {fibonacciIterative()}).to.throw(TypeError, 'No value specified')
    })

    it('should return 0 for value === 0', () => {
        expect(fibonacciIterative(0)).to.equal(0)
    })

    it('should return 1 for value === 1', () => {
        expect(fibonacciIterative(1)).to.equal(1)
    })

    it('should return 1 for value === 2', () => {
        expect(fibonacciIterative(2)).to.equal(1)
    })

    it('should return 21 for value === 8', () => {
        expect(fibonacciIterative(8)).to.equal(21)
    })

    it('should return 144 for value === 12', () => {
        expect(fibonacciIterative(12)).to.equal(144)
    })
})

describe("Test fibonacciRecursive", ()=> {
    it('should throw TypeError if no value provided', () => {
        expect(() => {fibonacciRecursive()}).to.throw(TypeError, 'No value specified')
    })

    it('should return 0 for value === 0', () => {
        expect(fibonacciRecursive(0)).to.equal(0)
    })

    it('should return 1 for value === 1', () => {
        expect(fibonacciRecursive(1)).to.equal(1)
    })

    it('should return 1 for value === 2', () => {
        expect(fibonacciRecursive(2)).to.equal(1)
    })

    it('should return 21 for value === 8', () => {
        expect(fibonacciRecursive(8)).to.equal(21)
    })

    it('should return 144 for value === 12', () => {
        expect(fibonacciRecursive(12)).to.equal(144)
    })
})


mocha.run()
