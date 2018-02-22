

// 1. Write a function called 'multiply' that multiplies two numbers and returns the result
function multiply(value1,value2){
    return value1 * value2;
}

// 2. Write a function called 'addThree' that adds three numbers together and returns the result
function addThree(value1,value2,value3){
    return value1 + value2 + value3;
}

// 3. Write a function called 'smallestNumber' that returns the smaller of 2 numbers
function smallestNumber(value1,value2){
    if(value1 < value2){
        return value1;
    }else {
        return value2;
    }

    // ADVANCED:
    // return (value1 < value2) ? value1 : value2;

    // NICEST:
    // return Math.min(value1, value2);
}

// 4. Write a function called 'maxOfThree' that returns the largest of 3 numbers
function maxOfThree(value1,value2,value3){
    return Math.max(value1,value2,value3);
}

// 5. Write a function called 'reverseString' that returns the reverse a string
function reverseString(string){
    return string.split("").reverse().join("");
}

// 6. Write a function called 'disemvowel' that returns the vowels from the string parameter
function disemvowel(string){
    return string.replace(/[aeiou]/gi, '');
}

// 7. Write a function called 'removeOdd' that removes all ODD number from an array
function removeOdd(array){
    return array.filter(function(item) {
        return item % 2 === 0;
    });
}

// 8. Write a function called 'removeEven' that removes all EVEN number from an array
function removeEven(array){
    return array.filter(function(item) {
        return item % 2 === 1;
    });
}

// 9. Write a function called 'longestString' that takes an array of strings and returns the string with the longest character length
function longestString(array) {
    return array.reduce(function(prev, next) {
        if (prev.length >= next.length) {
            return prev;
        } else {
            return next;
        };
    });

    // ADVANCED:
    // return array.reduce(function(prev, next) {
    //     return (prev.length >= next.length) ? prev : next;
    // });
}

// 10. Write a function called 'allElementsExceptFirstThree' that discards the first 3 elements of an array,
// e.g. [1, 2, 3, 4, 5, 6] becomes [4, 5, 6]
function allElementsExceptFirstThree(array){
    return array.splice(3, array.length-3);
}

// 11. Write a function called 'convertArrayToAnObject' that turns an array (with an even number of elements) into a hash, by
// pairing up elements. e.g. ['a', 'b', 'c', 'd'] becomes
// {'a' => 'b', 'c' => 'd'}
function convertArrayToAnObject(array){
    var object = {};
    var keys = array.filter(function(item, index) {
        return index % 2 === 0;
    })
    var values = array.filter(function(item, index) {
        return index % 2 === 1;
    })
    for (var i in keys) {
        object[keys[i]] = values[i];
    }
    return object;
}

// 12. Write a function called 'fizzBuzz' that takes any number and returns a value based on these rules

// But for multiples of three print "Fizz" instead of the number
// For the multiples of five print "Buzz".
// For numbers which are multiples of both three and five print "FizzBuzz".
function fizzBuzz(number){
    for (var i=1; i < number; i++) {
        if( (i%3) === 0 && (i%5) === 0 ) {
            return "FizzBuzz";
        } else if ( (i%3) === 0 ) {
            return  "Fizz";
        } else if ( (i%5) === 0 ) {
            return  "Buzz";
        }
    }
}

module.exports = {
    multiply: multiply,
    addThree: addThree,
    smallestNumber: smallestNumber,
    maxOfThree: maxOfThree,
    reverseString: reverseString,
    disemvowel: disemvowel,
    removeOdd: removeOdd,
    removeEven: removeEven,
    longestString: longestString,
    allElementsExceptFirstThree: allElementsExceptFirstThree,
    convertArrayToAnObject: convertArrayToAnObject,
    fizzBuzz: fizzBuzz
}
