import linkedList from "./linkedList.js";

class HashMap{
    constructor(){
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.size = 0;
        this.buckets = new Array(this.capacity).fill(null);

    }
    _normalizeKey(key){
        return String(key);
    }
    _resize(){
        const allEntries = this.entries();
        this.capacity = this.capacity * 2;
        this.buckets = new Array(this.capacity).fill(null);
        this.size = 0;
        allEntries.forEach(([key,value])=>{
            this.set(key,value);
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
    set(key,value){
        key = this._normalizeKey(key);
        const index = this.hash(key);
        if(this.buckets[index] === null) this.buckets[index] = linkedList();
        const list = this.buckets[index];
        let current = list.getHead();
        while(current){
            if(current.value.key === key) {
                current.value.value = value;
                return;
            }
            current = current.nextNode;
        }
        list.append({key,value});
        this.size++
        if(this.size / this.capacity > this.loadFactor) this._resize();
    }
    get(key){
        key = this._normalizeKey(key);
        const index = this.hash(key);
        if(this.buckets[index] === null) return null;
        const list = this.buckets[index];
        let current = list.getHead();
        while(current){
            if(current.value.key === key) return current.value.value;
            current = current.nextNode;
        }
        return null;
    }
    has(key){
        key = this._normalizeKey(key);
        const index = this.hash(key);
        if(this.buckets[index] === null) return false;
        const list = this.buckets[index];
        let current = list.getHead();
        while(current){
            if(current.value.key === key) return true;
            current = current.nextNode;
        }
        return false;
    }
    remove(key){
        key = this._normalizeKey(key);
        const index = this.hash(key);
        if(this.buckets[index] === null) return false;
        const list = this.buckets[index];
        if (!list) return false;
        const removed = list.removeByPredicate(pair => pair.key === key);
        if (!removed) return false;

        this.size--;
        if (list.size() === 0) this.buckets[index] = null;
        return true;
    }
    length(){
        return this.size;
    }
    clear(){
        this.size = 0;
        this.capacity = 16
        this.buckets = new Array(this.capacity).fill(null);
    }
    keys(){
        const keysArray = [];
        this.buckets.forEach(bucket=>{
            if(bucket){
                let current = bucket.getHead();
                while(current){
                    keysArray.push(current.value.key);
                    current = current.nextNode;
                }
            }
        })
        return keysArray;
    }
    values(){
        const valuesArray = [];
        this.buckets.forEach(bucket=>{
            if(bucket){
                let current = bucket.getHead();
                while(current){
                    valuesArray.push(current.value.value);
                    current = current.nextNode;
                }
            }
        })
        return valuesArray;
    }
    entries(){
        const entriesArray = [];
        this.buckets.forEach(bucket=>{
            if(bucket){
                let current = bucket.getHead();
                while(current){
                    entriesArray.push([current.value.key, current.value.value]);
                    current = current.nextNode;
                }
            }
        })
        return entriesArray;
    }
}

export default HashMap;