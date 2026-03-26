import {Node, LinkedLists} from nodes_LL;

class HashMap{
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
    // for use in the set function to increase the capacity/# of buckets
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
                // RE-SET THE KEY,VALUE PAIRS INTO A NEW, LARGER BUCKET ARRAY.
                this.set(key, value);  
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
        // GO TO INDEX POSITION IN BUCKETS ARRAY OF LL
        const bucket = this.buckets[index]
        // RETURN T/F IF KEY IS FOUND IN BUCKET AT INDEX.
        return bucket.contains(key);
    }
    // given key, if it is in hash map, remove entry with that key and return true, else false.
    remove(key){
        if(this.has(key)){
            // delete the key and its entries
            const index = this.hash(key);
            const bucket = this.buckets[index];
            bucket.removeAt(index);
            this.size--;
            return true;
        }  
        return false;
    }
    // returns number of stored keys in the hash map
    length(){
        // let count = 0;
        // for(let i = 0; i < this.buckets.length; i++){
        //     count += this.buckets[i].size();
        // }
        // return count;
        return this.size;
    }
    // removes all entries in the hash map
    clear(){

    }
    // returns an array containing all keys inside hash map
    keys(){

    }

    //returns array containg all the values
    values(){

    }
    // returns array that contains each key,value pair. 
    // Ex: [[firstKey, firstValue], [secondKey, secondValue]]
    entries(){

    }
}



const test = new HashMap();
test.set('apple', 'red');
