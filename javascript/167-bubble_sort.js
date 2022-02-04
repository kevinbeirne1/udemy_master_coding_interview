var Mocha = require('mocha')
var assert = require('chai').assert
var expect = require('chai').expect
var mocha = new Mocha()

function bubbleSortIterative(input_list) {
    if (!(input_list instanceof Array)) {
        throw TypeError('An array is required for bubbleSortIterative')
    }
    let largest_sorted_index = input_list.length
    while (largest_sorted_index > 1) {
        let previous_list = JSON.parse(JSON.stringify(input_list))
        for (let i=0; i<largest_sorted_index; i++) {
            if (input_list[i] > input_list[i+1]) {
                let temp_var = input_list[i]
                input_list[i] = input_list[i+1]
                input_list[i+1] = temp_var
            }
        }
        if (JSON.stringify(previous_list) === JSON.stringify(input_list)){
            return input_list
        }
        largest_sorted_index --;
    }
    return input_list

}

function bubbleSortRecursive(input_list){
    if (!(input_list instanceof Array)) {
        throw TypeError('An array is required for bubbleSortRecursive')
    }
    if (input_list.length === 1) {
        return input_list
    }
    for (let i=0; i<input_list.length; i++) {
        if (input_list[i] > input_list[i+1]) {
            let temp_var = input_list[i]
            input_list[i] = input_list[i+1]
            input_list[i+1] = temp_var
        }
    }
    let last_digit = input_list.slice(-1)
    let remainder = input_list.slice(0, -1)
    return bubbleSortRecursive(remainder).concat(last_digit)
}


describe('Bubble Sort Iterative', () => {
    context('Input checks', () => {
        it('should throw a TypeError if no value passed', () => {
            expect(() => {bubbleSortIterative()}).to.throw(TypeError, "An array is required for bubbleSortIterative");
        })
    })


    context('Number sorting', () => {
        it('should sort a list of length 1', () => {
            let actual = JSON.stringify(bubbleSortIterative([1]))
            let expected_output = JSON.stringify([1])
            expect(actual).to.equal(expected_output)
        })

        it('should not change the ordering of a pre-sorted list of length 3', () => {
            let actual = JSON.stringify(bubbleSortIterative([1, 2, 3]))
            let expected_output = JSON.stringify([1, 2, 3])
            expect(actual).to.equal(expected_output)
        })

        it('should re-order a reverse sorted list of length 3', () => {
            let actual = JSON.stringify(bubbleSortIterative([3, 2, 1]))
            let expected_output = JSON.stringify([1, 2, 3])
            expect(actual).to.equal(expected_output)
        })

        it('should re-order a reverse sorted list of length 6', () => {
            let actual = JSON.stringify(bubbleSortIterative([6, 5, 4, 3, 2, 1]))
            let expected_output = JSON.stringify([1, 2, 3, 4, 5, 6])
            expect(actual).to.equal(expected_output)
        })

        it('should re-order a randomly sorted list of length 8', () => {
            let actual = JSON.stringify(bubbleSortIterative([6, 5, 3, 1, 8, 7, 2, 4]))
            let expected_output = JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8])
            expect(actual).to.equal(expected_output)
        })
    })
})




describe('Bubble Sort Recursive', () => {
    context('Input checks', () => {
        it('should throw a TypeError if no value passed', () => {
            expect(() => {bubbleSortRecursive()}).to.throw(TypeError, "An array is required for bubbleSortRecursive");
        })
    })


    context('Number sorting', () => {
        it('should sort a list of length 1', () => {
            let actual = JSON.stringify(bubbleSortRecursive([1]))
            let expected_output = JSON.stringify([1])
            expect(actual).to.equal(expected_output)
        })

        it('should sort a list of length 2', () => {
            let actual = JSON.stringify(bubbleSortRecursive([2, 1]))
            let expected_output = JSON.stringify([1, 2])
            expect(actual).to.equal(expected_output)
        })

        it('should not change the ordering of a pre-sorted list of length 3', () => {
            let actual = JSON.stringify(bubbleSortRecursive([1, 2, 3]))
            let expected_output = JSON.stringify([1, 2, 3])
            expect(actual).to.equal(expected_output)
        })

        it('should re-order a reverse sorted list of length 3', () => {
            let actual = JSON.stringify(bubbleSortRecursive([3, 2, 1]))
            let expected_output = JSON.stringify([1, 2, 3])
            expect(actual).to.equal(expected_output)
        })

        it('should re-order a reverse sorted list of length 6', () => {
            let actual = JSON.stringify(bubbleSortRecursive([6, 5, 4, 3, 2, 1]))
            let expected_output = JSON.stringify([1, 2, 3, 4, 5, 6])
            expect(actual).to.equal(expected_output)
        })

        it('should re-order a randomly sorted list of length 8', () => {
            let actual = JSON.stringify(bubbleSortRecursive([6, 5, 3, 1, 8, 7, 2, 4]))
            let expected_output = JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8])
            expect(actual).to.equal(expected_output)
        })
    })
})


mocha.run()