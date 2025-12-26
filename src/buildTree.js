import Node from "./node.js";
import prettyPrint from "./prettyPrint.js";

function buildTree(array){
    const sortedUniqueArray = [...new Set(array)].sort((a, b) => a - b);
    function build(start,end){
        if(start > end) return null;
        const mid = Math.trunc((start + end) / 2);
        const rootNode = new Node(sortedUniqueArray[mid]);
        rootNode.setLeft(build(start,mid-1));
        rootNode.setRight(build(mid+1,end))
        return rootNode;
    }
    return build(0,sortedUniqueArray.length-1)
}

export default buildTree;

/*const test = buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

console.log(test);
prettyPrint(test);*/