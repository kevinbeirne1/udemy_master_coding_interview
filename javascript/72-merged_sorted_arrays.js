// mergeSortedArrays([0, 3, 4, 31], [4, 6, 30])
// [0, 3, 4, 4, 6, 30, 31]

function mergeSortedArrays(array1, array2) {
    let combined_array = [...array1, ...array2];

    return combined_array.sort((a, b) => a - b);
    // O(a+b)
}

function mergeSortedArrays2(array1, array2) {
    // Create new array
    // Look at the first item in both arrays
    // Add the lowest one to the new array
    // Increment the index for that array
    // If that index === array#.length add the rest of the other array
    let new_array = []
    let arr1_index = 0
    let arr2_index = 0
    while (new_array.length < array1.length + array2.length) {
        if (arr1_index >= array1.length) {
            new_array.push(...array2.slice(arr2_index))
        }
        else if (arr2_index >= array2.length) {
            new_array.push(...array1.slice(arr1_index))
        }
        else {
            if (array1[arr1_index] <= array2[arr2_index]){
                new_array.push(array1[arr1_index]);
                arr1_index ++;
            }
            else {
                new_array.push(array2[arr2_index]);
                arr2_index ++;
            }
        }
    }
    return new_array

}

let arr1 = [0, 3, 4, 31];
let arr2 = [4, 6, 30];
let arr3 = [];


console.log(mergeSortedArrays(arr1, arr2));
console.log(mergeSortedArrays2(arr1, arr2));