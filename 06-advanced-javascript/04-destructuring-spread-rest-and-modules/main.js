// main.js - 6.4 Destructuring, Spread/Rest and Modules
//
// This file is loaded as an ES module (see index.html's
// <script type="module" src="main.js">), which is what allows the `import`
// statement below to work at all in the browser.
import { formatCurrency, sumPrices, sumAll } from "./utils.js";

// ---------------------------------------------------------------------------
// Part 1: object destructuring - with a default value AND a renamed variable
// ---------------------------------------------------------------------------
const order = {
  customer: "Bilal",
  id: 1042,
  // no `note` property here on purpose, to demonstrate the default value below
};

// `customer: buyerName` pulls the `customer` property out into a
// DIFFERENTLY NAMED variable, `buyerName` (renaming). `note = "..."`
// supplies a default value that is only used because order.note does not
// exist at all - if it did, that value would be used instead.
const { customer: buyerName = "Guest", id: orderId, note = "No special instructions" } = order;

// ---------------------------------------------------------------------------
// Part 2: array destructuring - with a default value for a missing item
// ---------------------------------------------------------------------------
const groceryItems = [
  { name: "Bread", price: 2.5 },
  { name: "Milk", price: 1.75 },
];
const electronicsItems = [{ name: "USB Cable", price: 6.0 }];

// Positional destructuring: the empty slot between the commas SKIPS the
// second element entirely. groceryItems only has 2 items, so the third
// position doesn't exist - `thirdGroceryItem` falls back to its default.
const [firstGroceryItem, , thirdGroceryItem = { name: "N/A", price: 0 }] = groceryItems;

// ---------------------------------------------------------------------------
// Part 3: spread - merging two arrays, and two objects
// ---------------------------------------------------------------------------
// Spreading both arrays into a new array combines their items into one new
// array, without changing either original array.
const allItems = [...groceryItems, ...electronicsItems];

const defaultReceiptOptions = { currencySymbol: "$", taxRate: 0.05 };
const customReceiptOptions = { taxRate: 0.08 }; // this particular store charges more tax

// Spreading two objects together merges their properties into a new object.
// When the same key appears in both (here, taxRate), the LAST one spread
// wins - so customReceiptOptions.taxRate (0.08) overrides
// defaultReceiptOptions.taxRate (0.05). currencySymbol is kept as-is from
// defaultReceiptOptions, since customReceiptOptions never mentions it.
const receiptOptions = { ...defaultReceiptOptions, ...customReceiptOptions };

// ---------------------------------------------------------------------------
// Part 4: rest parameters + spreading an array into a function call
// ---------------------------------------------------------------------------
// sumAll (from utils.js) is declared as `function sumAll(...nums)` - a rest
// parameter that gathers any number of individual arguments into one real
// array. To turn OUR array of prices back into individual arguments for it,
// we spread it into the call with `...allPrices`.
const allPrices = allItems.map(function (item) {
  return item.price;
});
const subtotal = sumAll(...allPrices);

// sumPrices does the same addition, but takes a single array argument
// directly instead of using rest parameters - both styles are common in
// real code, so this file uses both to compare them side by side.
const subtotalCheck = sumPrices(allPrices);

const tax = subtotal * receiptOptions.taxRate;
const total = subtotal + tax;

// ---------------------------------------------------------------------------
// Render the finished receipt to the page
// ---------------------------------------------------------------------------
function renderReceipt() {
  const receiptEl = document.getElementById("receipt");

  const itemsHtml = allItems
    .map(function (item) {
      return "<li>" + item.name + " - " + formatCurrency(item.price) + "</li>";
    })
    .join("");

  receiptEl.innerHTML =
    "<p>Customer: " + buyerName + " (Order #" + orderId + ")</p>" +
    "<p>Note: " + note + "</p>" +
    "<ul id='receipt-items'>" + itemsHtml + "</ul>" +
    "<p>Subtotal: " + formatCurrency(subtotal) + "</p>" +
    "<p>Tax (" + (receiptOptions.taxRate * 100) + "%): " + formatCurrency(tax) + "</p>" +
    "<p><strong>Total: " + formatCurrency(total) + "</strong></p>";
}

renderReceipt();

// Exported only so a test could import and check these computed values
// directly, in addition to reading them back off the rendered page. (This
// topic's own test.js tests utils.js instead - see its README section on
// testing - but exporting these costs nothing and mirrors how a bigger app
// would keep its data logic testable separately from its DOM rendering.)
export {
  buyerName,
  orderId,
  note,
  allItems,
  firstGroceryItem,
  thirdGroceryItem,
  receiptOptions,
  subtotal,
  subtotalCheck,
  tax,
  total,
};
