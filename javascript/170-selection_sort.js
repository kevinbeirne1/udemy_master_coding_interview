var Mocha = require('mocha')
var assert = require('chai').assert
var expect = require('chai').expect
var mocha = new Mocha()


function selectionSortIterative(input_list) {
    // Loop through the list. Find the lowest and move index 0
    // Repeat previous loop starting from index 1, and moving lowest to index 1
    // Continue until list sorted

    if (!(input_list instanceof Array)) {
        throw TypeError("An array is required for selectionSortIterative")
    }
    let swap_index = 0
    while (swap_index < input_list.length) {
        let current_lowest = swap_index
        for (let i=swap_index; i<=input_list.length; i++) {
            if (input_list[i] < input_list[current_lowest]) {
                current_lowest = i
            }
        }
        let temp_var = input_list[swap_index]
        input_list[swap_index] = input_list[current_lowest]
        input_list[current_lowest] = temp_var
        swap_index ++
    }
    return input_list
}

function selectionSortRecursive(inputArray) {
    if (!(inputArray instanceof Array)) {
        throw TypeError("An array is required for selectionSortRecursive")
    }
    if (inputArray.length === 1) {
        return inputArray
    }
    let lowest_index = 0
    for (let i=0; i<inputArray.length; i++) {
        if (inputArray[i] < inputArray[lowest_index]) {
            lowest_index = i
        }
    }
    let left = inputArray.slice(0, lowest_index)
    let right = inputArray.slice(lowest_index + 1)

    return [inputArray[lowest_index]].concat(selectionSortRecursive(left.concat(right)))
}

describe('Selection Sort Iterative', () => {
    context('Input Validation', () => {
        it('should throw TypeError if string passed', () => {
            expect(() => {selectionSortIterative('str')}).to.throw(TypeError, "An array is required for selectionSortIterative")
        })

        it('should throw TypeError if int passed', () => {
            expect(() => {selectionSortIterative(1)}).to.throw(TypeError, "An array is required for selectionSortIterative")
        })

        it('should throw TypeError if no parameter passed', () => {
            expect(() => {selectionSortIterative()}).to.throw(TypeError, "An array is required for selectionSortIterative")
        })
    })
    
     context('Number Sorting', () => {
         
        it('should SortIterative a list of length 1', () => {
            let actual = JSON.stringify(selectionSortIterative([1]))
            let expected_output = JSON.stringify([1])
            expect(actual).to.equal(expected_output)
        })

        it('should not change the ordering of a pre-SortIterativeed list of length 3', () => {
            let actual = JSON.stringify(selectionSortIterative([1, 2, 3]))
            let expected_output = JSON.stringify([1, 2, 3])
            expect(actual).to.equal(expected_output)
        })

        it('should re-order a reverse SortIterativeed list of length 3', () => {
            let actual = JSON.stringify(selectionSortIterative([3, 2, 1]))
            let expected_output = JSON.stringify([1, 2, 3])
            expect(actual).to.equal(expected_output)
        })

        it('should re-order a reverse SortIterativeed list of length 6', () => {
            let actual = JSON.stringify(selectionSortIterative([6, 5, 4, 3, 2, 1]))
            let expected_output = JSON.stringify([1, 2, 3, 4, 5, 6])
            expect(actual).to.equal(expected_output)
        })

        it('should re-order a randomly SortIterativeed list of length 8', () => {
            let actual = JSON.stringify(selectionSortIterative([6, 5, 3, 1, 8, 7, 2, 4]))
            let expected_output = JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8])
            expect(actual).to.equal(expected_output)
        })
    })
})

describe('Selection Sort Recursive', () => {
    context('Input Validation', () => {
        it('should throw TypeError if string passed', () => {
            expect(() => {selectionSortRecursive('str')}).to.throw(TypeError, "An array is required for selectionSortRecursive")
        })

        it('should throw TypeError if int passed', () => {
            expect(() => {selectionSortRecursive(1)}).to.throw(TypeError, "An array is required for selectionSortRecursive")
        })

        it('should throw TypeError if no parameter passed', () => {
            expect(() => {selectionSortRecursive()}).to.throw(TypeError, "An array is required for selectionSortRecursive")
        })
    })
    
     context('Number Sorting', () => {
         
        it('should SortRecursive a list of length 1', () => {
            let actual = JSON.stringify(selectionSortRecursive([1]))
            let expected_output = JSON.stringify([1])
            expect(actual).to.equal(expected_output)
        })

        it('should not change the ordering of a pre-SortRecursiveed list of length 3', () => {
            let actual = JSON.stringify(selectionSortRecursive([1, 2, 3]))
            let expected_output = JSON.stringify([1, 2, 3])
            expect(actual).to.equal(expected_output)
        })

        it('should re-order a reverse SortRecursiveed list of length 3', () => {
            let actual = JSON.stringify(selectionSortRecursive([3, 2, 1]))
            let expected_output = JSON.stringify([1, 2, 3])
            expect(actual).to.equal(expected_output)
        })

        it('should re-order a reverse SortRecursiveed list of length 6', () => {
            let actual = JSON.stringify(selectionSortRecursive([6, 5, 4, 3, 2, 1]))
            let expected_output = JSON.stringify([1, 2, 3, 4, 5, 6])
            expect(actual).to.equal(expected_output)
        })

        it('should re-order a randomly SortRecursiveed list of length 8', () => {
            let actual = JSON.stringify(selectionSortRecursive([6, 5, 3, 1, 8, 7, 2, 4]))
            let expected_output = JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8])
            expect(actual).to.equal(expected_output)
        })
    })
})

mocha.run()