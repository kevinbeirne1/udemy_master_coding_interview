// Log all pairs of array
// ie get all permutations

const boxes = [1, 2, 3, 4, 5]

function log_pairs (array) {
    // Included two ways of looping over the array
    let pairs = []
    for (let i=0; i<array.length; i++){
        let item = array[i]
        array.forEach((other_item) => {
            pairs.push([item, other_item])
        })
    }
    console.log(pairs)
}

log_pairs(boxes)