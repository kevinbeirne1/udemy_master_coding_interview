var Mocha = require('mocha');
var assert = require('chai').assert;
var expect = require('chai').expect;
var mocha = new Mocha();


function heapSort(inputArray, maxHeaped = null) {
    if (!(inputArray instanceof Array)) {
        throw TypeError("An array is required for heapSort")
    }
    if (inputArray.length === 1) {
        return inputArray
    }
    if (!maxHeaped) {
        inputArray = maxHeapify(inputArray)
    }
    inputArray = siftDown(inputArray)

    let highest = inputArray[0]
    let lastIndex = inputArray.length - 1
    inputArray[0] = inputArray[lastIndex]
    inputArray[lastIndex] = highest

    return heapSort(inputArray.slice(0, -1), maxHeaped=true).concat(inputArray[lastIndex])

}

function siftDown(inputArray) {
    if (!(inputArray instanceof Array)) {
        throw TypeError("An array is required for siftDown")
    }

    if (inputArray.length === 1) {
        return inputArray
    }

    let parent = 0
    let left = 1
    let right = 2
    while ((inputArray[left] > inputArray[parent]) || (inputArray[right] > inputArray[parent])) {
        let temp = inputArray[parent]

        if (inputArray[right] > inputArray[left]) {
            inputArray[parent] = inputArray[right]
            inputArray[right] = temp
            parent = right
        }
        else {
            inputArray[parent] = inputArray[left]
            inputArray[left] = temp
            parent = left
        }

        left = 2 * parent + 1
        right = left + 1
    }
    return inputArray
}

function maxHeapify(inputArray) {
    if (!(inputArray instanceof Array)) {
        throw TypeError("An array is required for maxHeapify")
    }
    for (let i=1; i<inputArray.length; i++){
        let parentIndex = Math.ceil(i / 2) - 1
        let currentIndex = i
        while (parentIndex >= -1 && inputArray[parentIndex] < inputArray[currentIndex]) {
            let temp = inputArray[currentIndex]
            inputArray[currentIndex] = inputArray[parentIndex]
            inputArray[parentIndex] = temp

            currentIndex = parentIndex
            parentIndex = Math.ceil(parentIndex / 2) - 1
        }
    }
    return inputArray
}

describe('maxHeapify', () => {
    context('Input Checks', () => {
        it('should throw a TypeError if no value passed', () => {
            expect(() => {maxHeapify()}).to.throw(TypeError, "An array is required for maxHeapify");
        })
    })

    context('Functionality', () => {
        it('should return input if length ===1', () => {
            let testArray = [1]
            let actualArray = JSON.stringify(maxHeapify(testArray))
            let expectedArray = JSON.stringify(testArray)
            expect(actualArray).to.equal(expectedArray)
        })

        it('should not change valid maxHeap of length === 2', () => {
            let testArray = [1]
            let actualArray = JSON.stringify(maxHeapify(testArray))
            let expectedArray = JSON.stringify(testArray)
            expect(actualArray).to.equal(expectedArray)
        })

        it('should change invalid maxHeap of length === 2', () => {
            let testArray = [1, 2]
            let actualArray = JSON.stringify(maxHeapify(testArray))
            let expectedArray = JSON.stringify([2, 1])
            expect(actualArray).to.equal(expectedArray)
        })

        it('should change invalid maxHeap of length === 3', () => {
            let testArray = [1, 2, 3]
            let actualArray = JSON.stringify(maxHeapify(testArray))
            let expectedArray = JSON.stringify([3, 1, 2])
            expect(actualArray).to.equal(expectedArray)
        })

        it('should change invalid maxHeap of length === 4', () => {
            let testArray = [1, 2, 3, 4]
            let actualArray = JSON.stringify(maxHeapify(testArray))
            let expectedArray = JSON.stringify([4, 3, 2, 1])
            expect(actualArray).to.equal(expectedArray)
        })

        it('should change invalid maxHeap of length === 4', () => {
            let testArray = [6, 5, 3, 1, 8, 7, 2, 4 ]
            let actualArray = JSON.stringify(maxHeapify(testArray))
            let expectedArray = JSON.stringify([8, 6, 7, 4, 5, 3, 2, 1])
            expect(actualArray).to.equal(expectedArray)
        })
    })
})

describe('siftDown', () => {
    context('Input checks', () => {
        it('should throw a TypeError if no value passed', () => {
            expect(() => {siftDown()}).to.throw(TypeError, "An array is required for siftDown");
        })

        it('should throw TypeError if non array passed', () => {
            expect(() => {siftDown(Object())}).to.throw(TypeError, "An array is required for siftDown");
        })
    })

    context('Sifting', () => {
        it('should return a list of 1', () => {
            let actual = JSON.stringify(siftDown([1]))
            let expected_output = JSON.stringify([1])
            expect(actual).to.equal(expected_output)
        })

        it('should not alter a valid maxHeap of length === 2', () => {
            let actual = JSON.stringify(siftDown([2, 1]))
            let expected_output = JSON.stringify([2, 1])
            expect(actual).to.equal(expected_output)
        })

        it('should alter an invalid maxHeap of length === 2', () => {
            let actual = JSON.stringify(siftDown([1, 2]))
            let expected_output = JSON.stringify([2, 1])
            expect(actual).to.equal(expected_output)
        })

        it('should not alter a valid maxHeap of length === 3', () => {
            let actual = JSON.stringify(siftDown([3, 1, 2]))
            let expected_output = JSON.stringify([3, 1, 2])
            expect(actual).to.equal(expected_output)
        })

        it('should alter an invalid maxHeap of length === 3', () => {
            let actual = JSON.stringify(siftDown([1, 2, 3]))
            let expected_output = JSON.stringify([3, 2, 1])
            expect(actual).to.equal(expected_output)
        })

        it('should alter an invalid maxHeap of length === 5', () => {
            let actual = JSON.stringify(siftDown([1, 6, 7, 4, 5, 3, 2]))
            let expected_output = JSON.stringify([7, 6, 3, 4, 5, 1, 2])
            expect(actual).to.equal(expected_output)
        })
    })

})

describe('heapSort ', () => {
    context('Input checks', () => {
        it('should throw a TypeError if no value passed', () => {
            expect(() => {heapSort()}).to.throw(TypeError, "An array is required for heapSort");
        })

        it('should throw TypeError if non array passed', () => {
            expect(() => {heapSort(Object())}).to.throw(TypeError, "An array is required for heapSort");
        })
    })


    context('Number sorting', () => {
        it('should sort a list of length 1', () => {
            let actual = JSON.stringify(heapSort([1]))
            let expected_output = JSON.stringify([1])
            expect(actual).to.equal(expected_output)
        })

        it('should not change the ordering of a pre-sorted list of length 3', () => {
            let actual = JSON.stringify(heapSort([1, 2, 3]))
            let expected_output = JSON.stringify([1, 2, 3])
            expect(actual).to.equal(expected_output)
        })

        it('should re-order a reverse sorted list of length 3', () => {
            let actual = JSON.stringify(heapSort([3, 2, 1]))
            let expected_output = JSON.stringify([1, 2, 3])
            expect(actual).to.equal(expected_output)
        })

        it('should re-order a reverse sorted list of length 6', () => {
            let actual = JSON.stringify(heapSort([6, 5, 4, 3, 2, 1]))
            let expected_output = JSON.stringify([1, 2, 3, 4, 5, 6])
            expect(actual).to.equal(expected_output)
        })

        it('should re-order a randomly sorted list of length 8', () => {
            let actual = JSON.stringify(heapSort([6, 5, 3, 1, 8, 7, 2, 4]))
            let expected_output = JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8])
            expect(actual).to.equal(expected_output)
        })

        it('should re-order a randomly sorted list of length 11', () => {
            let actual = JSON.stringify(heapSort([99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0]))
            let expected_output = JSON.stringify([0, 1, 2, 4, 5, 6, 44, 63, 87, 99, 283])
            expect(actual).to.equal(expected_output)
        })
    })
})


mocha.run()