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

    find(value) {
        let current = this.root
        while(current != null) {
            if(value < current.data) current = current.left
            else if(value > current.data) current = current.right
            else break;
        }
        return current
    }

    depth(value) {
        let current = this.root
        let edges = 0
        while(current != null) {
            if(value < current.data) current = current.left
            else if(value > current.data) current = current.right
            else break;
            edges += 1
        }
        if(current === null) return "node not in tree"
        return edges
    }

    height(root = this.root) {
        if(root === null) return -1
        // let edge = 1
        // let a = edge + this.height(root.left)
        // let b = edge + this.height(root.right)
        // let max = Math.max(a,b)
        // return max 

        let a = this.height(root.left)
        let b = this.height(root.right)
        return Math.max(a,b) + 1
    }

    isBalanced(){
        let diff = Math.abs(this.height(this.root.left) - this.height(this.root.right))
        return diff <= 1
    }

    levelOrder(callback) {
        if(typeof callback != 'function') {
            throw new Error("plz enter function");
        }
        const current = this.root
        let ans = []
        let q = []
        q.push(current)
        while(q.length != 0) {
            let currentNode = q[0]
            if(currentNode.left != null) q.push(currentNode.left)
            if(currentNode.right != null) q.push(currentNode.right)
            callback(currentNode)
            q.shift()

        }

        // function func(q) {
        //     if(q.length === 0) return
        //     let currentNode = q[0]
        //     if(currentNode.left != null) q.push(currentNode.left)
        //     if(currentNode.right != null) q.push(currentNode.right)
        //     console.log(currentNode.data)
        //     q.shift()
        //     func(q)
        // }
        // func([this.root])

        return ans
    }

    
    preOrder(callback) {
        if(typeof callback != 'function') {
            throw new Error("plz enter function");
        }
        let current = this.root;
        function order(root) {
            if(root === null) return
            callback(root)
            order(root.left)
            order(root.right)
        }
        order(current)
    }

    inOrder(callback) {
        if(typeof callback != 'function') {
            throw new Error("plz enter function");
        }
        let current = this.root;
        function order(root) {
            if(root === null) return
            order(root.left)
            callback(root)
            order(root.right)
        }
        order(current)
    }

    postOrder(callback) {
        if(typeof callback != 'function') {
            throw new Error("plz enter function");
        }
        let current = this.root;
        function order(root) {
            if(root === null) return
            order(root.left)
            order(root.right)
            callback(root)
        }
        order(current)
    }

    rebalance() {
        let arr = []
        this.inOrder((e) => {
            this.arr.push(e.data)
        })
        this.buildTree(arr)
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

const tree = new Tree([1,2,3,4,5,6,7,8,9])
const root = tree.buildTree()
tree.prettyPrint(root)
console.log(tree.height())
console.log(tree.isBalanced())
// console.log("\nlevelorder\n")
// tree.levelOrder((e) => {
//     console.log(e.data)
// })
// console.log("\npreorder\n")
// tree.preOrder((e)=> {
//     console.log(e.data)
// })

// console.log("\ninorder\n")
// tree.inOrder((e)=> {
//     console.log(e.data)
// })

// console.log("\npostorder\n")
// tree.postOrder((e)=> {
//     console.log(e.data)
// })



