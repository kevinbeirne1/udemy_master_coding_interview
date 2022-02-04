var Mocha = require('mocha');
var assert = require('chai').assert;
var expect = require('chai').expect;
var mocha = new Mocha();


function quickSort(inputArray) {
    if (!(inputArray instanceof Array)) {
        throw TypeError("An array is required for quickSort")
    }
    if (inputArray.length <= 1){
        return inputArray
    }

    let midPoint = Math.ceil(inputArray.length / 2);
    let pivotIndex = inputArray.length - 1;
    let currentIndex = 0;
    let pivot = inputArray[pivotIndex];

    while (currentIndex !== pivotIndex) {
        if (inputArray[currentIndex] <= pivot){
            currentIndex ++;
        }
        else {
            let temp = inputArray[currentIndex]
            inputArray[currentIndex] = inputArray[pivotIndex - 1]
            inputArray[pivotIndex - 1] = pivot
            inputArray[pivotIndex] = temp
            pivotIndex --;
        }
    }

    let left = inputArray.slice(0, pivotIndex)
    let right = inputArray.slice(pivotIndex + 1)
    return [].concat(quickSort(left), [pivot], quickSort(right))

}

describe('quickSort ', () => {
    context('Input checks', () => {
        it('should throw a TypeError if no value passed', () => {
            expect(() => {quickSort()}).to.throw(TypeError, "An array is required for quickSort");
        })

        it('should throw TypeError if non array passed', () => {
            expect(() => {quickSort(Object())}).to.throw(TypeError, "An array is required for quickSort");

        })
    })


    context('Number sorting', () => {
        it('should sort a list of length 1', () => {
            let actual = JSON.stringify(quickSort([1]))
            let expected_output = JSON.stringify([1])
            expect(actual).to.equal(expected_output)
        })

        it('should not change the ordering of a pre-sorted list of length 3', () => {
            let actual = JSON.stringify(quickSort([1, 2, 3]))
            let expected_output = JSON.stringify([1, 2, 3])
            expect(actual).to.equal(expected_output)
        })

        it('should re-order a reverse sorted list of length 3', () => {
            let actual = JSON.stringify(quickSort([3, 2, 1]))
            let expected_output = JSON.stringify([1, 2, 3])
            expect(actual).to.equal(expected_output)
        })

        it('should re-order a reverse sorted list of length 6', () => {
            let actual = JSON.stringify(quickSort([6, 5, 4, 3, 2, 1]))
            let expected_output = JSON.stringify([1, 2, 3, 4, 5, 6])
            expect(actual).to.equal(expected_output)
        })

        it('should re-order a randomly sorted list of length 8', () => {
            let actual = JSON.stringify(quickSort([6, 5, 3, 1, 8, 7, 2, 4]))
            let expected_output = JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8])
            expect(actual).to.equal(expected_output)
        })

        it('should re-order a randomly sorted list of length 11', () => {
            let actual = JSON.stringify(quickSort([99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0]))
            let expected_output = JSON.stringify([0, 1, 2, 4, 5, 6, 44, 63, 87, 99, 283])
            expect(actual).to.equal(expected_output)
        })
    })
})


mocha.run()