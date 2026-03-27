import {Node, LinkedLists} from "./nodes_LL.js";
import { HashMap } from "./hashmap.js";



const test = new HashMap();
test.set('apple', 'red');
console.log(test.get('apple')); // red
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
console.log(test.keys()); // apple, banana, carrot, dog
console.log(test.values()); // red, yellow, orange, brown
console.log(test.entries());
// test.set('elephant', 'gray')
// test.set('frog', 'green')
// test.set('grape', 'purple')
// test.set('hat', 'black')
// test.set('ice cream', 'white')
// test.set('jacket', 'blue')
// test.set('kite', 'pink')
// test.set('lion', 'golden')
