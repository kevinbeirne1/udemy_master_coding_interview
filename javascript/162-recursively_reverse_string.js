var Mocha = require('mocha')
var assert = require('chai').assert
var expect = require('chai').expect
var mocha = new Mocha()

function recursiveReverse(input_string) {
    if (input_string === undefined) {
        throw TypeError('No string passed')
    }
    if (input_string.length <= 1) {
        return input_string
    }
    let last_letter = input_string.slice(-1)
    let remainder = input_string.slice(0, -1)
    return last_letter + recursiveReverse(remainder)
}

describe('RecursiveReverse', () => {
    it('should throw TypeError if no string passed', () => {
        expect(() => {recursiveReverse()}).to.throw(TypeError, 'No string passed')
    })

    it('should accept empty string', () => {
        expect(recursiveReverse("")).to.equal("");
    })

    it('should return "a" from "a"', () => {
        expect(recursiveReverse("a")).to.equal("a");
    })

    it('should return "ba" from "ab"', () => {
        expect(recursiveReverse("ab")).to.equal("ba");
    })

    it('should return "edcba" from "abcde"', () => {
        expect(recursiveReverse("abcde")).to.equal("edcba");
    })
})


mocha.run()