var Mocha = require('mocha')
var assert = require('chai').assert
var expect = require('chai').expect
var mocha = new Mocha()

function factorialRecursive(value) {
    if (value === undefined) {
        throw TypeError("Value is required for factorial")
    }
    if (value > 1) {
        return value * factorialRecursive(value - 1)
    }
    return 1
}

function factorialIterative(value) {
    if (value === undefined) {
        throw TypeError("Value is required for factorial")
    }
    let answer = 1
    for (let i=2; i<=value; i++) {
        answer *= i
    }
    return answer

}

describe('Factorial', () => {

    it('should throw a TypeError if no value passed', () => {
        expect(() => {factorialRecursive()}).to.throw(TypeError, "Value is required for factorial");
    })

    it('should calculate 1!', () => {
        expect(factorialRecursive(1)).to.equal(1)
    })

    it('should calculate 2!', () => {
        expect(factorialRecursive(2)).to.equal(2)
    })

    it('should calculate 3!', () => {
        expect(factorialRecursive(3)).to.equal(6)
    })

    it('should calculate 5!', () => {
        expect(factorialRecursive(5)).to.equal(120)
    })

    it('should calculate 10!', () => {
        expect(factorialRecursive(10)).to.equal(3628800)
    })

})

describe('FactorialIterative', () => {

    it('should throw a TypeError if no value passed', () => {
        expect(() => {factorialIterative()}).to.throw(TypeError, "Value is required for factorial");
    })

    it('should calculate 1!', () => {
        expect(factorialIterative(1)).to.equal(1)
    })

    it('should calculate 2!', () => {
        expect(factorialIterative(2)).to.equal(2)
    })

    it('should calculate 3!', () => {
        expect(factorialIterative(3)).to.equal(6)
    })

    it('should calculate 5!', () => {
        expect(factorialIterative(5)).to.equal(120)
    })

    it('should calculate 10!', () => {
        expect(factorialIterative(10)).to.equal(3628800)
    })

})

mocha.run()