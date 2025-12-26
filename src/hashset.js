import linkedList from "./linkedList.js";

class HashSet{
    constructor(){
        this.size = 0;
        this.capacity = 16;
        this.loadFactor = 0.75;
        this.buckets = new Array(this.capacity).fill(null);
    }
    _normalizeKey(key){
        return String(key);
    }
    _resize(){
        const keysArray = this.keys();
        this.size = 0;
        this.capacity = this.capacity * 2;
        this.buckets = new Array(this.capacity).fill(null);
        keysArray.forEach(key=>{
            this.add(key);
        })
    }
    hash(key){
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }
    add(key){
        key = this._normalizeKey(key);
        const index = this.hash(key);
        if(!this.buckets[index]) this.buckets[index] = linkedList();
        const list = this.buckets[index];
        let current = list.getHead();
        while(current){
            if(current.value === key) return;
            current = current.nextNode;
        }
        list.append(key);
        this.size++;
        if(this.size / this.capacity > this.loadFactor) this._resize();
    }
    has(key){
        key = this._normalizeKey(key);
        const index = this.hash(key);
        if(!this.buckets[index]) return false;
        const list = this.buckets[index];
        let current = list.getHead();
        while(current){
            if(current.value === key) return true;
            current = current.nextNode;
        }
        return false;
    }
    clear(){
        this.size = 0;
        this.capacity = 16;
        this.buckets = new Array(this.capacity).fill(null);
        this.loadFactor = 0.75;
    }
    keys(){
        const keysArray = [];
        this.buckets.forEach(bucket=>{
            if(bucket){
                let current = bucket.getHead();
                while(current){
                    keysArray.push(current.value);
                    current = current.nextNode;
                }
            }
        })
        return keysArray;
    }
    values(){ return this.keys();}
    entries(){
        const entriesArray = [];
        this.buckets.forEach(bucket=>{
            if(bucket){
                let current = bucket.getHead();
                while(current){
                    entriesArray.push([current.value,current.value]);
                    current = current.nextNode;
                }
            }
        })
        return entriesArray;
    }
    delete(key){
        key = this._normalizeKey(key);
        const index = this.hash(key);
        if(!this.buckets[index]) return false;
        const list = this.buckets[index];
        const removed = list.removeByPredicate(value => value === key);
        if (!removed) return false;
        this.size--;
        if (list.size() === 0) this.buckets[index] = null;
        return true;
    }
}

export default HashSet;