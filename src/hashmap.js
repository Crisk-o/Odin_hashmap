import {Node, LinkedLists} from "./nodes_LL.js";

export class HashMap{
    constructor(){
        this.size = 0;
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.buckets = Array.from({length: this.capacity}, () => new LinkedLists());
    }

    // takes key and returns a hashcode.
    // if key already exists, overwrite old value with new value.
    hash(key){
        let hashCode = 0;
        const primeNumber = 31;
        for(let i = 0; i < key.length; i++){
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode ;
    }

    // Associates the specified value with the specified key
    set(key, value){
        let index = this.hash(key); //INDEX IS USED TO FIND "BUCKET"/"FOLDER"/"DIRECTORY"
        if(index < 0 || index >= this.buckets.length) 
            throw new Error("Trying to access index out of bounds");

        const bucket = this.buckets[index]; // BUCKET IS THE FOUND "FOLDER"
        // IF FOUND FOLDER CONTAINS GIVEN KEY, GET KEY. KEY IS DOOR TO LL. OPEN DOOR TO FIND NODE WITH SPEC. VALUE. OVERWRITE VALUE.
        if(this.has(key)){ 
            // node.info holds [key, value] pair as an array. key=0, value=1.
            const node = bucket.findNodeByKey(key);
            node.info[1] = value;
        }else{
        // IF NOT FOUND. ADD A NEW KEY(NODE W/KEY VALUE PAIR) 
            bucket.prepend([key, value]);
            this.size++;
        
            //growth logic
            if(this.size > this.capacity * this.loadFactor)
                this.resize();
        }

    }
    // for use in set function to increase the capacity/# of buckets
    resize(){
        let oldBuckets = this.buckets;
        this.capacity *= 2;
        this.buckets = Array.from({length: this.capacity}, () => new LinkedLists());
        this.size = 0;
        //LOOP THROUGH EVERY OLD BUCKET
        for(let i = 0; i < oldBuckets.length; i++){
            let current = oldBuckets[i].root;
            // LOOP THROUGH EVERY LL CONTAINED IN EACH BUCKET.
            while(current !== null){
                const [key, value] = current.info;
                let index = this.hash(key);
                this.buckets[index].prepend([key, value]);
                this.size++;

                current = current.nextNode;
            }
        }
    }


    // PROVIDED A KEY, GETS VALUE FROM NODE, IF EXISTS.
    get(key){
        let index = this.hash(key);
        if(index < 0 || index >= this.buckets.length)
            throw new Error("Trying to access index out of bounds");
        const bucket = this.buckets[index];
        const node = bucket.findNodeByKey(key);

        if(!node)
            return null;
        
        return node.info[1];
    }

    has(key){
        // FINDS INDEX FOR PROVIDED KEY.
        const index = this.hash(key);
        if(index < 0 || index >= this.buckets.length)
                throw new Error("Trying to access index out of bounds");
        // GO TO INDEX POSITION IN BUCKETS ARRAY OF LL
        const bucket = this.buckets[index]
        // RETURN T/F IF KEY IS FOUND IN BUCKET AT INDEX.
        return bucket.containsKey(key);
    }
    // given key, if it is in hash map, remove entry with that key and return true, else false.
    // delete the key and its entries
    remove(key){
        if(this.has(key)){
            let index = this.hash(key);
            this.buckets[index].removeKey(key);
            this.size--;
            return true;
        }  
        return false;
    }
    // returns number of stored keys in the hash map
    length(){
        return this.size;
    }
    // removes all entries in the hash map
    clear(){
        this.buckets = Array.from({length: this.capacity}, () => new LinkedLists());
        this.size = 0;
    }
    // returns an array containing all keys inside hash map
    keys(){
        let keyArray = [];
        for(let i = 0; i < this.buckets.length; i++){
            if(this.buckets[i].root !== null){
                let key = this.buckets[i].root.info[0];
                keyArray.push(key);
            }
        }
        return "Keys: " + keyArray.join(", ");
    }

    //returns array containg all the values
    values(){
        let valueArray = [];
        //LOOP THROUGH EVERY BUCKET
        for(let i = 0; i < this.buckets.length; i++){
            if(this.buckets[i].root !== null){
                let value = this.buckets[i].root.info[1];
                valueArray.push(value);
            }
        }
        return "Values: " + valueArray.toString();
    }
    // returns array that contains each key,value pair. 
    entries(){
        let keyValArr = [];
        //LOOP THROUGH EVERY BUCKET
        for(let i = 0; i < this.buckets.length; i++){
            if(this.buckets[i].root !== null){
                keyValArr.push(this.buckets[i].root.info);
            }
        }
        return "Key,Values: [" + keyValArr.join("] -> [") + "] ";
    }
}

