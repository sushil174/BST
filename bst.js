function node(data = null, left = null, right = null) {
    return {
        data,
        left,
        right
    }
}

class Tree {
    constructor(arr) {
        this.arr = arr;
        this.root = null;
        
    }
    buildTree(array = this.arr) {
        let uniqSortedArray = [...new Set(array)].sort(function(a,b){return a-b})

        function createBst(array,start,end) {
            if(start > end) return null
            else {
                const mid = Math.floor((start+end)/2)
                const treeNode = node(array[mid])
                treeNode.left = createBst(array,start, mid - 1);
                treeNode.right = createBst(array,mid+1,end);
                return treeNode
            }
        }
        return this.root = createBst(uniqSortedArray,0,uniqSortedArray.length-1)
    }

    insert(value) {
        let current = this.root
        while(true) {
            if(current.data < value) {
                if(current.right === null){
                    current.right = node(value)
                    return this.root
                }
                else current = current.right
            }
            else {
                if(current.left === null) {
                    current.left = node(value)
                    return this.root
                }
                else current = current.left
            }
        }
    }

    delete(value) {

        // function deleting(ParentNode,value) {
        //     let delNode;
        //     if(value > ParentNode.data) delNode = ParentNode.right
        //     else delNode = ParentNode.left
        //     // console.log(ParentNode)
        //     // console.log(delNode)
        //     if(delNode.left === null && delNode.right === null) {
        //         if(ParentNode.right.data === value) ParentNode.right = null
        //         else ParentNode.left = null
        //     }

        //     else if((delNode.left != null && delNode.right === null) || (delNode.left === null && delNode.right != null)) {
        //         if(delNode.left != null && delNode.right === null) {
        //             ParentNode.left = delNode.left
        //         } else {
        //             ParentNode.right = delNode.right
        //         }
        //         // delete delNode.data
        //         // delete delNode.right
        //         // delete delNode.left
        //     }

        //     else if(delNode.left != null & delNode.right != null) {
        //         // console.log(delNode)
        //         function findCloset(root) {
        //             let parent = root
        //             let temp = root.right
        //             while(temp.left != null) {
        //                 parent = temp
        //                 temp = temp.left
        //             }
        //             return {parent,temp}
        //         }
        //         const BiggestClosed = findCloset(delNode)
        //         deleting(BiggestClosed.parent,BiggestClosed.temp.data)
        //         delNode.data = BiggestClosed.temp.data
        //     }
        // }

        // function getNode(Node,value) {
        //     if(Node === null || (Node.left != null && Node.left.data === value) || (Node.right != null && Node.right.data === value)){
        //         return Node
        //     }
        //     if(Node.data > value) return getNode(Node.left,value)
        //     else return getNode(Node.right,value)
        // } 

        // const ParentNode = getNode(this.root,value)
        // // if(ParentNode === null) console.log("value is not in tree")
        // // else {
        // //     deleting(ParentNode,value)
        // // }
        // deleting(ParentNode,value)


        function remove(root,value) {
            if(root === null) return root
            if(value < root.data) {
                root.left = remove(root.left,value)
            }else if(value > root.data) {
                root.right = remove(root.right,value)
            }else {
                if(root.left === null) return root.right
                if(root.right === null) return root.left

                let current = root.right
                while(current.left != null) {
                    current = current.left
                }
                root.data = current.data
                root.right = remove(root.right,root.data)
            }
            return root
        }

        remove(this.root,value)
    }

    prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
    
}

const tree = new Tree([3,5,6,1,29,12,45,23,9])
const root = tree.buildTree()
tree.prettyPrint(root)
console.log("\n\n\nAfter insert....................\n\n\n")
tree.insert(21)
tree.prettyPrint(root)
// console.log("\n\n\ndeleting...................\n\n\n")
// tree.delete(5)
// tree.prettyPrint(root)




