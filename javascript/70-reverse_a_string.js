// Create a function that reverses a string:
// 'Hi My name is Andrei' should be:
// 'ierdnA si eman yM iH'

function reverse(str) {
    // check input
    if (!str || str.length <2 || typeof str !== 'string') {
        return 'hmm this is not good';
    }

    let reversed_string_array = []
    for (let i=0; i<str.length; i++) {
        let index = str.length - 1 - i
        reversed_string_array[i] = str[index]
    }
    return reversed_string_array.join("")
}

function reverse2(str) {
    return str.split('').reverse().join("")
}

const reverse3 = str => [...str].reverse().join("")


console.log(reverse('test a word'))
console.log(reverse2('test a word'))
console.log(reverse3('test a word'))
