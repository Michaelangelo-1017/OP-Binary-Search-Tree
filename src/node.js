class Node{
    constructor(data, left = null, right = null){
        this.data = data;
        this.left = left;
        this.right = right;
    }
    setLeft(val){
        this.left = val;
    }
    setRight(val){
        this.right = val;
    }
    setData(val){
        this.data = val;
    }
}
export default Node;