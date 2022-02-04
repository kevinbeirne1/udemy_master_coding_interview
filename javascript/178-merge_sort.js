var Mocha = require('mocha');
var assert = require('chai').assert;
var expect = require('chai').expect;
var mocha = new Mocha();


function mergeSort(input_array) {
    if (!(input_array instanceof Array)) {
        throw TypeError("An array is required for mergeSort")
    }
    
    if (input_array.length === 1) {
        return input_array
    }
    
    let midPoint = Math.ceil(input_array.length / 2)
    let left = input_array.slice(0, midPoint)
    let right = input_array.slice(midPoint)

    return mergeArray(
        mergeSort(left), 
        mergeSort(right)
    )

}

function mergeArray(array1, array2) {

    if (!(array1 instanceof Array) || ((array2 !== undefined) && !(array2 instanceof Array))) {
        throw TypeError("An array is required for mergeArray")
    }
    if (!array2) {
        return array1
    }
        let output_array = []
        let i = 0
        let j = 0
        while ((i < array1.length) || (j < array2.length)) {
            let left_first = array1[i]
            let right_first = array2[j]
            if (right_first < left_first || left_first === undefined) {
                j++;
                output_array.push(right_first);
            }
            else {
                i++;
                output_array.push(left_first);
            }
        }
        return output_array
    // }
}

describe('mergeArray', () => {
    context('Input checks', () => {
        it('should throw a TypeError if no value passed', () => {
            expect(() => {mergeArray()}).to.throw(TypeError, "An array is required for mergeArray");
        })

        it('should throw a TypeError if value1 is not Array instance', () => {
            expect(() => {mergeArray(1, [1, 2, 3])}).to.throw(TypeError, "An array is required for mergeArray");
        })

        it('should throw a TypeError if value2 is not Array instance', () => {
            expect(() => {mergeArray([1, 2, 3], 1)}).to.throw(TypeError, "An array is required for mergeArray");
        })

        it('should not throw a TypeError if both parameters Array instances', () => {
            expect(() => {mergeArray([1,2,3], [1,2,3])}).to.not.throw(TypeError, "An array is required for mergeArray");
        })

        it('should not throw a TypeError if only parameter is passed', () => {
            expect(() => {mergeArray([1,2,3])}).to.not.throw(TypeError, "An array is required for mergeArray");
        })
    })

    context('merge Arrays', () => {
        it('should return the input if one array passed', () => {
            let testArray = [1]
            let expectedArray = JSON.stringify(testArray)
            let actualArray = JSON.stringify(mergeArray(testArray))
            expect(actualArray).to.equal(expectedArray)
        })

        it('should merge two arrays of length === 1', () => {
            let expectedArray = JSON.stringify([1, 2])
            let actualArray = JSON.stringify(mergeArray([1], [2]))
            expect(actualArray).to.equal(expectedArray)
        })

        it('should merge arrays of length === 2 & 1', () => {
            let expectedArray = JSON.stringify([1, 2, 3])
            let actualArray = JSON.stringify(mergeArray([1, 2], [3]))
            expect(actualArray).to.equal(expectedArray)
        })

        it('should merge two arrays of length === 2', () => {
            let expectedArray = JSON.stringify([1, 2, 3, 4])
            let actualArray = JSON.stringify(mergeArray([1, 2], [3, 4]))
            expect(actualArray).to.equal(expectedArray)
        })

        it('should merge and sort two arrays of length === 2', () => {
            let expectedArray = JSON.stringify([1, 2, 3, 4])
            let actualArray = JSON.stringify(mergeArray([2, 4], [1, 3]))
            expect(actualArray).to.equal(expectedArray)
        })
    })
})


describe('MergeSort ', () => {
    context('Input checks', () => {
        it('should throw a TypeError if no value passed', () => {
            expect(() => {mergeSort()}).to.throw(TypeError, "An array is required for mergeSort");
        })

        it('should throw TypeError if non array passed', () => {
            expect(() => {mergeSort(Object())}).to.throw(TypeError, "An array is required for mergeSort");

        })
    })


    context('Number sorting', () => {
        it('should sort a list of length 1', () => {
            let actual = JSON.stringify(mergeSort([1]))
            let expected_output = JSON.stringify([1])
            expect(actual).to.equal(expected_output)
        })

        it('should not change the ordering of a pre-sorted list of length 3', () => {
            let actual = JSON.stringify(mergeSort([1, 2, 3]))
            let expected_output = JSON.stringify([1, 2, 3])
            expect(actual).to.equal(expected_output)
        })

        it('should re-order a reverse sorted list of length 3', () => {
            let actual = JSON.stringify(mergeSort([3, 2, 1]))
            let expected_output = JSON.stringify([1, 2, 3])
            expect(actual).to.equal(expected_output)
        })

        it('should re-order a reverse sorted list of length 6', () => {
            let actual = JSON.stringify(mergeSort([6, 5, 4, 3, 2, 1]))
            let expected_output = JSON.stringify([1, 2, 3, 4, 5, 6])
            expect(actual).to.equal(expected_output)
        })

        it('should re-order a randomly sorted list of length 8', () => {
            let actual = JSON.stringify(mergeSort([6, 5, 3, 1, 8, 7, 2, 4]))
            let expected_output = JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8])
            expect(actual).to.equal(expected_output)
        })

        it('should re-order a randomly sorted list of length 11', () => {
            let actual = JSON.stringify(mergeSort([99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0]))
            let expected_output = JSON.stringify([0, 1, 2, 4, 5, 6, 44, 63, 87, 99, 283])
            expect(actual).to.equal(expected_output)
        })
    })
})


mocha.run()