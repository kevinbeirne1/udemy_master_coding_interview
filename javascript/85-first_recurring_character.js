// Google Question
// Given an array = [2, 5, 1, 2, 3, 5, 1, 2, 4]
// It should return 2

// Given an array = [2, 1, 1, 2, 3, 5, 1, 2, 4]
// It should return 1

// Given an array = [2, 3, 4, 5]
// It should return undefined



function firstRecurringCharacter(array) {
    /*
    - Loop through the list
    - at each item
    - loop through the previous items
    - see if current_item in previous items

    O(n**2) Time Complexity (looping through the list twice at each element)
    O(1) Space Complexity
    */
    for (let i=0; i < array.length; i++) {
        for (let j=0; j < i; j++) {
            if (array[i] === array[j]) {
                return array[i]
            }
        }
    }
}

function firstRecurringCharacter2(array) {
    /*
    - Create a dictionary
    - Loop through the list
    - At each item
    - check if item in dictionary
    - if present => return true
    - else dictionary[item] = true/1

    O(n) - Time Complexity
    O(n) - Space Complexity (creates a new dictionary for each element)
     */
    let items_already_seen = {}
    for (let i=0; i < array.length; i++) {
        let current_item = array[i];
        if (items_already_seen[current_item]) {
            return current_item;
        }
        else {
            items_already_seen[current_item] = true;
        }

    }
}

console.log(firstRecurringCharacter2([2, 5, 1, 2, 3, 5, 1, 2, 4]))
console.log(firstRecurringCharacter2([2, 1, 1, 2, 3, 5, 1, 2, 4]))
console.log(firstRecurringCharacter2([2, 3, 4, 5]))