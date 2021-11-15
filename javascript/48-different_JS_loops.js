const {performance} = require('perf_hooks');
const nemo = ['nemo'];
const everyone = ['dory', 'bruce', 'marlin', "nemo", 'gill', 'bloat', 'nigel', 'squirt', 'darla', 'hank'];


function findNemo (array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === 'nemo') {
            console.log('Found NEMO')
        }
    }
}

const findNemo1 = (array) => {
    array.forEach((fish) => {
        if (fish === 'nemo') {
            console.log('Found Nemo!')
        }
    })
}

const findNemo2 = (array) => {
    for (let fish of array) {
        if (fish === 'nemo') {
            console.log(fish)
        }
    }
}

findNemo(everyone);
findNemo1(everyone);
findNemo2(everyone);
