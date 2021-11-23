// ** reference type **

    var object1 = {value: 10}
    var object2 = object1 // points to object1's location (aka is a reference type)
    var object3 = {value: 10} // points to new object

    object2.value = 15
    console.log('Changing object2 attribute changes object1 attribute')
    console.log(`Object 1 Value: ${object1.value}`)
    console.log(`Object 3 Value: ${object3.value}`)

    object3.value = 20
    console.log('Changing object3 attribute doesnt change object1 attribute')
    console.log(`Object 1 Value: ${object1.value}`)
    console.log(`Object 3 Value: ${object3.value}`)


// ** context vs scope **

    // Scope is where a variable can be accessed
        var scopeName = "Global"; // Global - Accessed by everything
        function getScopeName () {
            var year = 2021; // Local - Accessed only by the function
            console.log(scopeName);
            console.log(year);
            if (true) {
                const greeting = "hello";
                console.log(greeting) // Block - Accessed only by the block
            }
            // console.log(greeting) // Returns ReferenceError: year is not defined
        }
        // console.log(year) // Returns ReferenceError: year is not defined
        getScopeName()

    // Context is the object we're inside of right now
        const object4 = {
            a: function () {
                console.log(this)
            }
        }
        object4.a()

// Instantiation
class Player {
    // constructor is the js equivalent of __init__
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }

    introduce() {
        console.log(`Hi I am ${this.name}, I'm a ${this.type}`);
    }
}

class Wizard extends Player {
    // js method of creating a subclass
    constructor(name, type) {
        super(name, type);
    }

    play() {
        console.log(`WEEEEEEEE I'm a ${this.type}`);
    }
}


const wizard1 = new Wizard('Shelly', 'Healer');
const wizard2 = new Wizard('Shawn', 'Dark Magic');

wizard1.play()
wizard2.introduce()