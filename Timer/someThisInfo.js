/**
 * The Value of 'this'
 */
/**
 * Define this using arrow function
 */

// two equal results
console.log(this);
const printThis1 = () => {
   console.log(this);
}
printThis1();

const color = {
   printColor() {
      // equal results -> this is the color object itself
      console.log(this);
      const printThis = () => {
         console.log(this);
      }
      printThis();
   }
};
color.printColor();
// -------------------------------------------------

/**
 * Calling 'bind', 'call', 'apply' on the function when invoked
 * 'this' is equal to the first argument of 'bind', 'call', or 'apply'
 */
const printThis = function() {
   console.log(this);
}
printThis.call({ color: 'red' });
printThis(); // 'this' is equal to the window
// -------------------------------------------------

/**
 * All other cases
 * 'this' is equal to whatever is to the left of the '.' in the method call
 */
// Example 1
const colors = {
   printColor() {
      console.log(this); // this is equal to 'colors' object
   }
};
colors.printColor();

// Example 2
const randomObject = {
   a: 1
};
randomObject.printColor = colors.printColor;
randomObject.printColor();