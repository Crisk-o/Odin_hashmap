export class Node{
    constructor(info){
        // [key, value]
        this.info = info;
        this.nextNode = null;
    }
    toString() { return `Node(${this.info}) `; }
}

export class LinkedLists{
    constructor(){
        this.root = null;
    }
    //gets root Node
    head(){
        if(this.root == null){
            return undefined;
        }
        return this.root;
    }
    //gets tail Node
    tail(){
        let head = this.root;
        if(head == null){
            return undefined;
        }
        while(head.nextNode !== null){
            head = head.nextNode;
        }
        return head.toString();
    }
    // creates a node w/ provided value, 
    // newNode placed at beginning of LL.
    prepend(value){
        let newNode = new Node(value);
        // code below was creating an infinite loop. 
        // newNode.nextNode was pointing back to itself b/c root = newNode and then newNode.nextNode = root as well. 
        // if(this.root === null){
        //     this.root = newNode;
        // }
        newNode.nextNode = this.root;
        this.root = newNode;
    }
    // create node, place at end of LL.
    append(value){
        let head = this.root;
        let newNode = new Node(value);
        if(head === null){
            head = newNode;
        }
        while(head.nextNode !== null){ // go to end of
            head = head.nextNode;
        }
        head.nextNode = newNode;
    }
    
    printLL(){
        let current = this.root;
        while(current !== null){
            console.log(current.toString());
            current = current.nextNode;
        }
        console.log(" ");
    }

    size(){
        let count = 0;
        let head = this.root;
        if(this.root === null)
            return 0;
        while(head !== null){
            count ++;
            head = head.nextNode;
        }
        return count;
    }
    atIndex(index){
        let count = 0;
        let head = this.root;
        // const size = this.size();
        if(index >= this.size){
            return undefined;
        }
        while(count != index && head.nextNode !== null){
            head = head.nextNode;
            count++;
        }
        return `Node at index ${index} is ${head.toString()}`;
    }
    // FINDS A NODE GIVEN A KEY. 
    findNodeByKey(key){
        let current = this.root;
        while(current !== null){
            if(current.info[0] === key){
                return current; 
            }
            current = current.nextNode;
        }
        return null;
    }
    //removes head node and returns its value
    shift(){
        if(this.root === null){
            return null;
        }
        let headVal = this.root.info;
        this.root = this.root.nextNode;
        return headVal;

    }
    // returns t/f if value is in LL
    contains(value){
        let head = this.root;
        if(head === null){
            return false;
        }
        while(head !== null){
            if(head.info[1] === value){
                return true;
            }
            head = head.nextNode;
        }
        return false;
    }
    containsKey(key){
        let head = this.root;
        if(head === null){
            return false;
        }
        while(head !== null){
            if(head.info[0] === key){
                return true;
            }
            head = head.nextNode;
        }
        return false;
    }
    // returns index of node w/ value. Returns undef if not in LL.
    findIndex(value){
        let index = 0;
        let head = this.root;
        if(head === null)
            return -1;

        while(head !== null){
            if(head.info === value){
                return index;
            }
            index++;
            head = head.nextNode;
        }
        return -1;
    }
    // inserts given values at given index. Retain order of LL.
    insertAt(index, ...values){
        let size = this.size();
        if(index >= size){
            throw RangeError();
        }
        let prev = null;
        let count = 0;
        let current = this.root;
        // move to given index
        while(count != index && current.nextNode !== null){
            prev = current;
            current = current.nextNode;
            prev.nextNode = current;
            count++;
        }
        // create one node/value and make connections
        // current node will be AT the index. prev is node right before index.
        for(let i = 0; i < values.length; i++){
            const newNode = new Node(values[i]);
            prev.nextNode = newNode;
            prev = newNode;
            newNode.nextNode = current; 
        }
        return prev;
    }
    removeAt(index){
        if(index === 0){
            this.shift();
        }
        let size = this.size();
        if(index >= size){
            throw RangeError();
        }
        let prev = null;
        let count = 0;
        let current = this.root;
        while(count < index && current !== null){
            prev = current;
            current = current.nextNode;
            prev.nextNode = current;
            count++;
        }
        // current node will be AT the index. prev is node right before index.
        current = current.nextNode;
        prev.nextNode = current; // should overwrite the value;
    }
    removeKey(key){
        if(this.root === null){ return null; }
        if(this.root.info[0] === key){
            this.root = this.root.nextNode
        }
        let current = this.root;
        while(current !== null){
            if(current.info[0] === key){
                current = current.nextNode.nextNode; // skips a link in the chain and overwrites it
                return true;
            }
            current = current.nextNode;
        }
        return false;
    }

    toString(){
        let result = "";
        let head = this.root;
        if(head === null)
            return "";
        while(head !== null){
            result = result + head.toString() + "-> ";
            head = head.nextNode;
        }
        return result + "null\n";
    }

}