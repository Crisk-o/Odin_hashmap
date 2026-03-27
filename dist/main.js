/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/hashmap.js"
/*!************************!*\
  !*** ./src/hashmap.js ***!
  \************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   HashMap: () => (/* binding */ HashMap)\n/* harmony export */ });\n/* harmony import */ var _nodes_LL_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nodes_LL.js */ \"./src/nodes_LL.js\");\n\r\n\r\nclass HashMap{\r\n    constructor(){\r\n        this.size = 0;\r\n        this.loadFactor = 0.75;\r\n        this.capacity = 16;\r\n        this.buckets = Array.from({length: this.capacity}, () => new _nodes_LL_js__WEBPACK_IMPORTED_MODULE_0__.LinkedLists());\r\n    }\r\n\r\n    // takes key and returns a hashcode.\r\n    // if key already exists, overwrite old value with new value.\r\n    hash(key){\r\n        let hashCode = 0;\r\n        const primeNumber = 31;\r\n        for(let i = 0; i < key.length; i++){\r\n            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;\r\n        }\r\n        return hashCode ;\r\n    }\r\n\r\n    // Associates the specified value with the specified key\r\n    set(key, value){\r\n        let index = this.hash(key); //INDEX IS USED TO FIND \"BUCKET\"/\"FOLDER\"/\"DIRECTORY\"\r\n        if(index < 0 || index >= this.buckets.length) \r\n            throw new Error(\"Trying to access index out of bounds\");\r\n\r\n        const bucket = this.buckets[index]; // BUCKET IS THE FOUND \"FOLDER\"\r\n        // IF FOUND FOLDER CONTAINS GIVEN KEY, GET KEY. KEY IS DOOR TO LL. OPEN DOOR TO FIND NODE WITH SPEC. VALUE. OVERWRITE VALUE.\r\n        if(this.has(key)){ \r\n            // node.info holds [key, value] pair as an array. key=0, value=1.\r\n            const node = bucket.findNodeByKey(key);\r\n            node.info[1] = value;\r\n        }else{\r\n        // IF NOT FOUND. ADD A NEW KEY(NODE W/KEY VALUE PAIR) \r\n            bucket.prepend([key, value]);\r\n            this.size++;\r\n            //growth logic\r\n            if(this.size > this.capacity * this.loadFactor)\r\n                this.resize();\r\n        }\r\n    }\r\n    // for use in the set function to increase the capacity/# of buckets\r\n    resize(){\r\n        let oldBuckets = this.buckets;\r\n        this.capacity *= 2;\r\n        this.buckets = Array.from({length: this.capacity}, () => new _nodes_LL_js__WEBPACK_IMPORTED_MODULE_0__.LinkedLists());\r\n        this.size = 0;\r\n        //LOOP THROUGH EVERY OLD BUCKET\r\n        for(let i = 0; i < oldBuckets.length; i++){\r\n            let current = oldBuckets[i].root;\r\n            // LOOP THROUGH EVERY LL CONTAINED IN EACH BUCKET.\r\n            while(current !== null){\r\n                const [key, value] = current.info;\r\n                // RE-SET THE KEY,VALUE PAIRS INTO A NEW, LARGER BUCKET ARRAY.\r\n                this.set(key, value);  \r\n                current = current.nextNode;\r\n            }\r\n        }\r\n    }\r\n\r\n\r\n    // PROVIDED A KEY, GETS VALUE FROM NODE, IF EXISTS.\r\n    get(key){\r\n        let index = this.hash(key);\r\n        if(index < 0 || index >= this.buckets.length)\r\n            throw new Error(\"Trying to access index out of bounds\");\r\n        const bucket = this.buckets[index];\r\n        const node = bucket.findNodeByKey(key);\r\n\r\n        if(!node)\r\n            return null;\r\n        \r\n        return node.info[1];\r\n    }\r\n\r\n    has(key){\r\n        // FINDS INDEX FOR PROVIDED KEY.\r\n        const index = this.hash(key);\r\n        // GO TO INDEX POSITION IN BUCKETS ARRAY OF LL\r\n        const bucket = this.buckets[index]\r\n        // RETURN T/F IF KEY IS FOUND IN BUCKET AT INDEX.\r\n        return bucket.contains(key);\r\n    }\r\n    // given key, if it is in hash map, remove entry with that key and return true, else false.\r\n    remove(key){\r\n        if(this.has(key)){\r\n            // delete the key and its entries\r\n            const index = this.hash(key);\r\n            const bucket = this.buckets[index];\r\n            bucket.removeAt(index);\r\n            this.size--;\r\n            return true;\r\n        }  \r\n        return false;\r\n    }\r\n    // returns number of stored keys in the hash map\r\n    length(){\r\n        // let count = 0;\r\n        // for(let i = 0; i < this.buckets.length; i++){\r\n        //     count += this.buckets[i].size();\r\n        // }\r\n        // return count;\r\n        return this.size;\r\n    }\r\n    // removes all entries in the hash map\r\n    clear(){\r\n        this.buckets = Array.from({length: this.capacity}, () => new _nodes_LL_js__WEBPACK_IMPORTED_MODULE_0__.LinkedLists());\r\n        this.size = 0;\r\n    }\r\n    // returns an array containing all keys inside hash map\r\n    keys(){\r\n        let keyArray = [];\r\n        // for(let i = 0; i < this.buckets.length; i++){\r\n        //     if(this.buckets[i].root !== null){\r\n        //         let current = this.buckets[i].root;            \r\n        //         while(current !== null && current.info != current.nextNode.info){\r\n        //             keyArray.push(current.info[0]);\r\n        //             current = current.nextNode;\r\n        //         }\r\n        //     }\r\n        // }\r\n        return keyArray;\r\n    }\r\n\r\n    //returns array containg all the values\r\n    values(){\r\n        let valueArray = [];\r\n        //LOOP THROUGH EVERY OLD BUCKET\r\n        for(let i = 0; i < this.buckets.length; i++){\r\n            let current = this.buckets[i].root;\r\n            // LOOP THROUGH EVERY LL CONTAINED IN EACH BUCKET.\r\n            while(current !== null){\r\n                const [key, value] = current.info;\r\n                valueArray.push(value);  \r\n                current = current.nextNode;\r\n            }\r\n        }\r\n        return valueArray;\r\n    }\r\n    // returns array that contains each key,value pair. \r\n    // Ex: [[firstKey, firstValue], [secondKey, secondValue]]\r\n    entries(){\r\n        let keyValArr = new Array(this.buckets.length);\r\n        //LOOP THROUGH EVERY BUCKET\r\n        for(let i = 0; i < this.buckets.length; i++){\r\n            let current = this.buckets[i].root;\r\n            // LOOP THROUGH EVERY LL CONTAINED IN EACH BUCKET.\r\n            while(current !== null){\r\n                const [key, value] = current.info;\r\n                keyValArr.push([key, value]);  \r\n                current = current.nextNode;\r\n            }\r\n        }\r\n        return keyValArr;\r\n\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack://odin_hashmap/./src/hashmap.js?\n}");

/***/ },

/***/ "./src/index.js"
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _nodes_LL_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nodes_LL.js */ \"./src/nodes_LL.js\");\n/* harmony import */ var _hashmap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hashmap.js */ \"./src/hashmap.js\");\n\r\n\r\n\r\n\r\n\r\nconst test = new _hashmap_js__WEBPACK_IMPORTED_MODULE_1__.HashMap();\r\ntest.set('apple', 'red');\r\nconsole.log(test.get('apple')); // red\r\ntest.set('banana', 'yellow')\r\ntest.set('carrot', 'orange')\r\ntest.set('dog', 'brown')\r\nconsole.log(test.get('carrot'));\r\n// console.log(test.keys());\r\n// test.set('elephant', 'gray')\r\n// test.set('frog', 'green')\r\n// test.set('grape', 'purple')\r\n// test.set('hat', 'black')\r\n// test.set('ice cream', 'white')\r\n// test.set('jacket', 'blue')\r\n// test.set('kite', 'pink')\r\n// test.set('lion', 'golden')\r\n// console.log(test.entries());\r\n\n\n//# sourceURL=webpack://odin_hashmap/./src/index.js?\n}");

/***/ },

/***/ "./src/nodes_LL.js"
/*!*************************!*\
  !*** ./src/nodes_LL.js ***!
  \*************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LinkedLists: () => (/* binding */ LinkedLists),\n/* harmony export */   Node: () => (/* binding */ Node)\n/* harmony export */ });\nclass Node{\r\n    constructor(info){\r\n        // [key, value]\r\n        this.info = info;\r\n        this.nextNode = null;\r\n    }\r\n    toString() { return `Node(${this.info}) `; }\r\n}\r\n\r\nclass LinkedLists{\r\n    // give constructor a node to be the head/root\r\n    // constructor(rootNode){\r\n    //     if(rootNode === null){\r\n    //         this.root = null;\r\n    //     }\r\n    //     this.root = rootNode;\r\n    // }\r\n    constructor(){\r\n        this.root = null;\r\n    }\r\n    //gets root Node\r\n    head(){\r\n        if(this.root == null){\r\n            return undefined;\r\n        }\r\n        return this.root;\r\n    }\r\n    //gets tail Node\r\n    tail(){\r\n        let head = this.root;\r\n        if(head == null){\r\n            return undefined;\r\n        }\r\n        while(head.nextNode !== null){\r\n            head = head.nextNode;\r\n        }\r\n        return head.toString();\r\n    }\r\n    // creates a node w/ provided value, \r\n    // newNode placed at beginning of LL.\r\n    prepend(value){\r\n        let newNode = new Node(value);\r\n        if(this.root === null){\r\n            this.root = newNode;\r\n        }\r\n        newNode.nextNode = this.root;\r\n        this.root = newNode;\r\n    }\r\n    // create node, place at end of LL.\r\n    append(value){\r\n        let head = this.root;\r\n        let newNode = new Node(value);\r\n        if(head === null){\r\n            head = newNode;\r\n        }\r\n        while(head.nextNode !== null){ // go to end of\r\n            head = head.nextNode;\r\n        }\r\n        head.nextNode = newNode;\r\n    }\r\n    \r\n    printLL(){\r\n        let current = this.root;\r\n        while(current !== null){\r\n            console.log(current.toString());\r\n            current = current.nextNode;\r\n        }\r\n        console.log(\" \");\r\n    }\r\n\r\n    size(){\r\n        let count = 0;\r\n        let head = this.root;\r\n        if(head === null)\r\n            return 0;\r\n        while(head !== null){\r\n            count ++;\r\n            head = head.nextNode;\r\n        }\r\n        return count;\r\n    }\r\n    atIndex(index){\r\n        let count = 0;\r\n        let head = this.root;\r\n        const size = this.size();\r\n        if(index >= size){\r\n            return undefined;\r\n        }\r\n        while(count != index && head.nextNode !== null){\r\n            head = head.nextNode;\r\n            count++;\r\n        }\r\n        return `Node at index ${index} is ${head.toString()}`;\r\n    }\r\n    // FINDS A NODE GIVEN A KEY. \r\n    findNodeByKey(key){\r\n        let current = this.root;\r\n        while(current !== null){\r\n            if(current.info[0] === key){\r\n                return current; \r\n            }\r\n            current = current.nextNode;\r\n        }\r\n        return null;\r\n    }\r\n    //removes head node and returns its value\r\n    pop(){\r\n        if(this.root === null){\r\n            return \"head is undefined\";\r\n        }\r\n        let headVal = this.root.info;\r\n        let newHead = this.root.nextNode;\r\n        this.root = newHead;\r\n        return headVal;\r\n\r\n    }\r\n    // returns t/f if value is in LL\r\n    contains(value){\r\n        let head = this.root;\r\n        if(head === null){\r\n            return false;\r\n        }\r\n        while(head !== null){\r\n            if(head.info[1] === value){\r\n                return true;\r\n            }\r\n            head = head.nextNode;\r\n        }\r\n        return false;\r\n    }\r\n    // returns index of node w/ value. Returns undef if not in LL.\r\n    findIndex(value){\r\n        let index = 0;\r\n        let head = this.root;\r\n        if(head === null)\r\n            return -1;\r\n\r\n        while(head !== null){\r\n            if(head.info === value){\r\n                return index;\r\n            }\r\n            index++;\r\n            head = head.nextNode;\r\n        }\r\n        return -1;\r\n    }\r\n    // inserts given values at given index. Retain order of LL.\r\n    insertAt(index, ...values){\r\n        let size = this.size();\r\n        if(index >= size){\r\n            throw RangeError();\r\n        }\r\n        let prev = null;\r\n        let count = 0;\r\n        let current = this.root;\r\n        // move to given index\r\n        while(count != index && current.nextNode !== null){\r\n            prev = current;\r\n            current = current.nextNode;\r\n            prev.nextNode = current;\r\n            count++;\r\n        }\r\n        // create one node/value and make connections\r\n        // current node will be AT the index. prev is node right before index.\r\n        for(let i = 0; i < values.length; i++){\r\n            const newNode = new Node(values[i]);\r\n            prev.nextNode = newNode;\r\n            prev = newNode;\r\n            newNode.nextNode = current; \r\n        }\r\n        return prev;\r\n    }\r\n    removeAt(index){\r\n        if(index == 0){\r\n            this.pop();\r\n        }\r\n        let size = this.size();\r\n        if(index >= size){\r\n            throw RangeError();\r\n        }\r\n        let prev = null;\r\n        let count = 0;\r\n        let current = this.root;\r\n        while(count != index && current.nextNode !== null){\r\n            prev = current;\r\n            current = current.nextNode;\r\n            prev.nextNode = current;\r\n            count++;\r\n        }\r\n        // current node will be AT the index. prev is node right before index.\r\n        current = current.nextNode;\r\n        prev.nextNode = current; // should overwrite the value;\r\n    }\r\n\r\n    toString(){\r\n        let result = \"\";\r\n        let head = this.root;\r\n        if(head === null)\r\n            return \"\";\r\n        while(head !== null){\r\n            result = result + head.toString() + \"-> \";\r\n            head = head.nextNode;\r\n        }\r\n        return result + \"null\\n\";\r\n    }\r\n\r\n}\n\n//# sourceURL=webpack://odin_hashmap/./src/nodes_LL.js?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;