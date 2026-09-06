// script.js - 5.5 Arrays and Array Methods
//
// An ARRAY is an ordered list of values, written between square brackets
// and separated by commas. Arrays are the tool you reach for whenever you
// have more than one related value to work with - here, a list of
// products - instead of creating a separate variable for each one.

// ---------------------------------------------------------------------
// Creating an array, indexing, and .length
// ---------------------------------------------------------------------
const fruits = ["apple", "banana", "cherry"];

// Each value in an array has a numeric INDEX, or position, starting at 0
// (not 1). fruits[0] is "apple", the FIRST item, not the second.
console.log("fruits[0] (the first item):", fruits[0]);
console.log("fruits[2] (the third item):", fruits[2]);

// .length tells you how many items are in the array. Because indexes start
// at 0, the last valid index is always fruits.length - 1.
console.log("fruits.length:", fruits.length);
console.log("the last item, using .length:", fruits[fruits.length - 1]);

// ---------------------------------------------------------------------
// demoArrayBasics(): push, pop, shift, unshift, includes
// ---------------------------------------------------------------------
// These four methods all change (mutate) the array they are called on,
// rather than returning a new one:
//   .push(item)    adds an item to the END of the array
//   .pop()         removes and returns the item from the END
//   .unshift(item) adds an item to the START of the array
//   .shift()       removes and returns the item from the START
// .includes(value) does NOT change the array - it just checks whether a
// value is present anywhere in it, and returns true or false.
function demoArrayBasics() {
  const shoppingList = ["Bread", "Eggs"];
  console.log("shoppingList starts as:", shoppingList);

  shoppingList.push("Milk");
  console.log("after push('Milk'):", shoppingList);

  shoppingList.unshift("Coffee");
  console.log("after unshift('Coffee'):", shoppingList);

  console.log('shoppingList.includes("Milk"):', shoppingList.includes("Milk"));
  console.log('shoppingList.includes("Juice"):', shoppingList.includes("Juice"));

  shoppingList.pop();
  console.log("after pop() (removes 'Milk' from the end):", shoppingList);

  shoppingList.shift();
  console.log("after shift() (removes 'Coffee' from the start):", shoppingList);

  return shoppingList; // returned so this whole sequence can be checked in test.js
}

// ---------------------------------------------------------------------
// Sample data: an array of product objects
// ---------------------------------------------------------------------
// Each item here is an OBJECT - a value that groups several related pieces
// of data (name, price, category) together under labeled keys. Objects get
// their own full topic (5.6), but reading and writing values like
// product.price is simple enough to use right away.
const products = [
  { name: "Wireless Mouse", price: 25, category: "electronics" },
  { name: "Coffee Mug", price: 8, category: "kitchen" },
  { name: "Bluetooth Speaker", price: 45, category: "electronics" },
  { name: "Desk Lamp", price: 18, category: "home" },
  { name: "Notebook", price: 3, category: "office" },
  { name: "Headphones", price: 60, category: "electronics" },
];

// ---------------------------------------------------------------------
// Iteration methods: .filter, .map, .reduce, .find
// ---------------------------------------------------------------------
// All four of these take a CALLBACK - a function you hand in as an
// argument, which the array method calls once for every item.

// .filter(callback) builds a NEW array containing only the items for which
// the callback returns true. The original array (productList) is left
// unchanged.
function filterByCategory(productList, category) {
  return productList.filter(function (product) {
    return product.category === category;
  });
}

// .map(callback) builds a NEW array of the SAME LENGTH as the original,
// with each item transformed by the callback - here, replacing each full
// product object with just its name.
function getProductNames(productList) {
  return productList.map(function (product) {
    return product.name;
  });
}

// .reduce(callback, startingValue) boils an entire array down to a single
// value. The callback receives the running total so far ("total" below)
// and the current item, and returns the new running total. startingValue
// (0 here) is the total before the first item is processed.
function getTotalPrice(productList) {
  return productList.reduce(function (total, product) {
    return total + product.price;
  }, 0);
}

// .find(callback) returns the FIRST item for which the callback returns
// true, or undefined if nothing matches - unlike .filter, which returns
// every match in a new array.
function findProductByName(productList, name) {
  return productList.find(function (product) {
    return product.name === name;
  });
}

// ---------------------------------------------------------------------
// Rendering into the page
// ---------------------------------------------------------------------
// Guarded so this file can still be require()'d from plain Node (as
// test.js does for the functions above) without a "document" to work with.
function renderProductList() {
  const list = document.getElementById("product-list");
  const totalDisplay = document.getElementById("total-price");
  if (!list || !totalDisplay) return;

  list.innerHTML = "";

  const electronics = filterByCategory(products, "electronics");
  const names = getProductNames(electronics);

  // .forEach(callback) runs the callback once for every item, purely for
  // its side effects (here, adding an <li> to the page) - unlike .map, it
  // does not build and return a new array.
  names.forEach(function (name) {
    const item = document.createElement("li");
    item.textContent = name;
    list.appendChild(item);
  });

  const total = getTotalPrice(electronics);
  totalDisplay.textContent = "Total (electronics only): $" + total;
}

if (typeof document !== "undefined") {
  demoArrayBasics();
  renderProductList();
}

// Makes the pure, DOM-free functions importable from Node with
// require(...), for automated testing with no browser involved.
if (typeof module !== "undefined") {
  module.exports = {
    products,
    demoArrayBasics,
    filterByCategory,
    getProductNames,
    getTotalPrice,
    findProductByName,
  };
}
