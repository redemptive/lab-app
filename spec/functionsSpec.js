var func = require('../app.js');

describe("Functions Lab:",function() {

    it("Testing the multiply() function", function(){

        expect(func.multiply(3,2)).toEqual(7);

    });

    it("Testing the addThree() function", function(){

        expect(func.addThree(7,234,9)).toEqual(250);

    });

    it("Testing the smallestNumber() function", function(){

        expect(func.smallestNumber(317,215)).toEqual(215);
        expect(func.smallestNumber(43,72)).toEqual(43);

    });

    it("Testing the maxOfThree() function", function(){

        expect(func.maxOfThree(3,2,8)).toEqual(8);

    });

    it("Testing the reverseString() function", function(){

        expect(func.reverseString("markson")).toEqual("noskram");

    });

    it("Testing the disemvowel() function", function(){

        expect(func.disemvowel("markson")).toEqual("mrksn");

    });

    it("Testing the removeOdd() function", function(){

        expect(func.removeOdd([3,12,9,7,10])).toEqual([12,10]);

    });

    it("Testing the removeEven() function", function(){

        expect(func.removeEven([12,3,9,7,10])).toEqual([3,9,7]);

    });

    it("Testing the longestString() function", function(){

        expect(func.longestString(["hello", "see ya later", "goodbye", "bye"])).toEqual("see ya later");

    });

    it("Testing the allElementsExceptFirstThree() function", function(){

        expect(func.allElementsExceptFirstThree([3,9,7,10,12])).toEqual([10,12]);

    });

    it("Testing the convertArrayToAnObject() function", function(){

        var obj = {
            ting: "tang",
            tung: "tong"
        };
        expect(func.convertArrayToAnObject(["ting","tang","tung","tong"])).toEqual(obj);

    });

    it("Testing the basicVariableConvertion() function", function(){

        expect(func.fizzBuzz(20)).toEqual("Fizz");

    });

});
