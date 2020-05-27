/*
 * Function 1: Return the string "hello world".
 * Yep - that's literally it.
 */

function helloWorld(){
    return "hello world";
}

/*
 * Function 2: Given a number (int or float), square it and convert to string.
 * Return the string.
 * Examples:
 *  5 -> '25'
 *  1.2 -> '1.44'
 */

function squareToString(num){
    numSquared = num * num;
    strNumSquared = numSquared + "";
    
    return strNumSquared;
}

/*
 * Function 3: Reverse a string. We will only give you strings as input.
 * Examples:
 *  'hello' -> 'olleh'
 *  'fdas' -> 'sadf'
 */

function reverseString(str){
    return str.split('').reverse().join('');
}

 /*
  * Function 4: Given a dictionary, compute the average length of the values.
  * If a value is an integer, covert it to a string, and use the length of the
  * converted string in your computation.
  * Example:
  *     {
  *         'hello': 'world',
  *         'timothy': 'chen',
  *         'allen': 'cheng',
  *         2:'hi',
  *         3: 51
  *     }
  * ^ This will return 3.6.
  */

 function avgLenOfVals(dict){

    totalValueLength = 0;
    numberOfPairs = 0;
    for (key in dict) {
        numberOfPairs++;
        value = dict[key] + "";
        totalValueLength += value.length;
    }

    if (totalValueLength == 0)
        return 0;
        
    return totalValueLength/numberOfPairs;
 }

/*
 * Function 5: stringToArr -> Given a string that has comma + whitespace
 *     separated values, and creates an array containing all the elements.
 *      Example:
 *          'hello, my,   name, is ,dickerson' ->
 *          ['hello','my','name','is','dickerson']
 *      Then, apply the second argument of the function (another function)
 *      to the array. Return this result.
 *      You will have to write your own tests to see if this function works.
 *
 */

function applyFunToArray(str, fun){
    str = str.split(",").join("");
    arr = str.split(" ");
    
    countEmptyStrings = 0;
    for (i = 0; i < arr.length; i++) {
        if (arr[i] == "")
            countEmptyStrings++;
    }
    
    realArrLength = arr.length - countEmptyStrings;
    var result = new Array(realArrLength);
    
    resultIndex = 0;
    for (i = 0; i < arr.length; i++) {
        if (arr[i] != "") {
            result[resultIndex++] = arr[i];
        }        
    }
    return fun(result);
}

module.exports = {
    helloWorld: helloWorld,
    squareToString: squareToString,
    reverseString: reverseString,
    avgLenOfVals: avgLenOfVals,
    applyFunToArray: applyFunToArray
}
