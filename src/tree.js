import buildTree from "./buildTree.js";
import Node from "./node.js";
import prettyPrint from "./prettyPrint.js";

class Tree{
    constructor(array){
        this.array = array;
        this.root = buildTree(array);
    }
    insert(value){
        if (!this.root) {
            this.root = new Node(value);
            this.array.push(value);
            return;
        }
        let currentRoot = this.root;
        while(currentRoot){
            if(value === currentRoot.data) return;
            if(value < currentRoot.data){
                if(!currentRoot.left){
                    const valNode = new Node(value);
                    currentRoot.setLeft(valNode);
                    this.array.push(value);
                    return
                }
                currentRoot = currentRoot.left;
            }
            else{
                if(!currentRoot.right){
                    const valNode = new Node(value);
                    currentRoot.setRight(valNode);
                    this.array.push(value);
                    return;
                }
                currentRoot = currentRoot.right;
            }
        }
    }
    
}

const testTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(testTree.root);
prettyPrint(testTree.root);
testTree.insert(100);
console.log(testTree.root);
prettyPrint(testTree.root);
testTree.insert(670);
console.log(testTree.root);
prettyPrint(testTree.root);
testTree.insert(0);
console.log(testTree.root);
prettyPrint(testTree.root);
testTree.insert(9);
console.log(testTree.root);
prettyPrint(testTree.root);
testTree.insert(100);
console.log(testTree.root);
prettyPrint(testTree.root);
testTree.insert(66);
console.log(testTree.root);
prettyPrint(testTree.root);
testTree.insert(6350);
console.log(testTree.root);
prettyPrint(testTree.root);
