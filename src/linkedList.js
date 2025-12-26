import node from "./node.js";

function linkedList(){
    let head = null;
    let tail = null;
    let size = 0;
    return{
        append(value){
            const newNode = node(value);
            if(size === 0){
                head = newNode;
                tail = newNode;
            }
            else{
                tail.nextNode = newNode;
                tail = newNode;
            }
            size++
        },
        prepend(value){
            const newNode = node(value,head);
            head = newNode;
            if(size === 0) tail = newNode;
            size++
        },
        size(){
            return size;
        },
        getHead(){
            if(size === 0) return undefined;
            return head;
        },
        getTail(){
            if(size === 0) return undefined;
            return tail;
        },
        at(index){
            if(index < 0 || index >= size) return undefined;
            let current = head;
            for(let i = 0; i < index; i++) current = current.nextNode;
            return current.value
        },
        pop(){
            if(size === 0) return undefined;
            if(size === 1){
                let removed = head;
                head = null;
                tail = null
                size = 0
                return removed.value;
            }
            let removed = head;
            head = head.nextNode;
            size--
            return removed.value;
        },
        contains(value){
            let current = head;
            while(current !== null){
                if(current.value === value) return true;
                current = current.nextNode;
            }
            return false;
        },
        findIndex(value){
            let current = head;
            let index = 0;
            while(current !== null){
                if(current.value === value) return index;
                current = current.nextNode;
                index++;
            }
            return -1;
        },
        toString(){
            if(size === 0) return "";
            let current = head;
            let string = "";
            while(current !== null){
                string += `( ${current.value} ) -> `;
                current = current.nextNode;
            }
            return string + 'null'
        },
        printAllNodes(){
            if(size === 0) return "";
            let current = head;
            let string = "";
            while(current !== null){
                string += `( ${JSON.stringify(current)} ) -> `;
                current = current.nextNode;
            }
            return string + 'null'
        },
        insertAt(index, ...values){
            if(index < 0 || index > size) throw new RangeError('Index cannot be less than 0 or greater than size of list!');
            if(values.length === 0) return;
            if(index === 0){
                const wasEmpty = (size === 0);
                for(let i = values.length - 1; i >= 0; i--) {
                    head = node(values[i],head);
                    size++
                }
                if (wasEmpty) {
                    tail = head;
                    while (tail.nextNode) tail = tail.nextNode;
                }
                return
            }
            let previous = head;
            for(let i = 0; i < index - 1; i++) previous = previous.nextNode;

            const remainder = previous.nextNode;
            let lastInserted = previous;
            for(const value of values){
                const newNode = node(value, null);
                lastInserted.nextNode = newNode;
                lastInserted = newNode;
                size++;
            }

            lastInserted.nextNode = remainder;

            if(remainder === null) tail = lastInserted;
        },
        removeAt(index){
            if(index < 0 || index >= size) throw new RangeError('Index for removeAt cannot be less than 0 or greater than the size of the list!');
            let current = head;
            if(index === 0){
                if(size === 1){
                    head = null;
                    tail = null;
                    size = 0;
                    return current;
                }
                head = current.nextNode;
                size--;
                return current;
            }
            let prev = current;
            for(let i = 0; i < index; i++){
                prev = current;
                current = current.nextNode;
            }
            prev.nextNode = current.nextNode;
            if(index + 1 === size) tail = prev;
            size--;
            return current;
        },
        removeByPredicate(predicate) {
            if (size === 0) return false;

            let current = head;
            let prev = null;

            while (current) {
                if (predicate(current.value)) {
                if (prev === null) head = current.nextNode;
                else prev.nextNode = current.nextNode;

                if (current === tail) tail = prev;

                size--;
                return true;
                }

                prev = current;
                current = current.nextNode;
            }

            return false;
        },
        init(){
            head = null;
            tail = null;
            size = 0;
        }
    }
}

export default linkedList;