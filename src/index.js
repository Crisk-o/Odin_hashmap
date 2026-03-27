import {Node, LinkedLists} from "./nodes_LL.js";
import { HashMap } from "./hashmap.js";



const test = new HashMap();
test.set('apple', 'red');
console.log(test.get('apple')); // red
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
console.log(test.entries()); // carrot banana apple dog (order may be diff.)
test.set('elephant', 'gray');
test.set('frog', 'green');
console.log(test.get("dog")); // brown
test.set("dog", "black"); // update key: "dog" with value "brown" to "black"
console.log(test.entries());
console.log(test.get("dog")); // black
test.set('grape', 'purple');
test.set('hat', 'black'); 
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
test.set('moon', 'silver') // capacity increases here
console.log("ALL ENTRIES: \n" + test.entries()); //
test.remove('dog');
test.remove('hat');
console.log("AFTER 'DOG' & 'HAT' KEY REMOVALS:\n" + test.entries());
test.clear();
console.log(test.entries()) // should be empty!
