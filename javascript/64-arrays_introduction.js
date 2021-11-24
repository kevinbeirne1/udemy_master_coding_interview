const strings = ['a', 'b', 'c', 'd']
// A byte of ram storage holds 8 bits worth of information
// On a 32 bit computer, each needs 4 bytes of storage (32 bits / 8 bits per byte)
// 4*4 = 16 bytes of storage

// push - add item to the end of the list
strings.push('e') // O(1)
console.log(strings)
// NOTE: push can be O(N). Source code is written with static arrays.
//       When the static array is full, it needs to iterate over the 
//       array and copy it to new RAM registers


// pop - remove last item from the list
strings.pop()
strings.pop() // O(1)
console.log(strings)

// unshift - insert item at the start of the array
strings.unshift('x') // O(n)
console.log(strings)

// splice - insert item in the middle of an array
strings.splice(2, 0, "alien")
console.log(strings)