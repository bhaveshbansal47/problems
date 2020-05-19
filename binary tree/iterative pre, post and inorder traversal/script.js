// Stack class 

class Stack {
    constructor() {
        this.items = [];
    }

    push(element) {
        this.items.push(element);
    }

    pop() {
        if (this.items.length == 0)
            return "Underflow";
        return this.items.pop();
    }

    peek() {
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length == 0;
    }

    printStack() {
        var str = "";
        for (var i = 0; i < this.items.length; i++)
            str += this.items[i] + " ";
        return str;
    }
    size() {
        return this.items.length;
    }

}

var nodearray = [];

class Node {
    constructor(data, left, right) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Pair {
    constructor(node, state) {
        this.node = node;
        this.state = state;
    }
}

function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}
function construct(arr) {
    var root = new Node(arr[0], null, null);
    var rtp = new Pair(root, 1);
    var st = new Stack();
    var nodest = new Stack();
    nodest.push(0);
    nodearray.push([0, arr[0]]);
    st.push(rtp);
    var idx = 0;
    while (st.size() > 0) {
        var top = st.peek();
        if (top.state == 1) {
            idx++;
            if (arr[idx] != null) {
                top.node.left = new Node(arr[idx], null, null);
                var lp = new Pair(top.node.left, 1);
                nodest.push(nodest.peek() * 2 + 1);
                nodearray.push([nodest.peek(), arr[idx]]);
                st.push(lp);
            } else {
                top.node.left = null;
            }

            top.state++;
        } else if (top.state == 2) {
            idx++;
            if (arr[idx] != null) {
                top.node.right = new Node(arr[idx], null, null);
                var rp = new Pair(top.node.right, 1);
                nodest.push(nodest.peek() * 2 + 2);
                nodearray.push([nodest.peek(), arr[idx]]);
                st.push(rp);
            } else {
                top.node.right = null;
            }
            top.state++;
        } else {
            st.pop();
            nodest.pop();
        }
    }
    return root;
}
var output;
var prearray = [];
var postarray = [];
var inarray = [];
function iterativePrePostInTraversal(node) {
    // write your code here
    output = "";
    var rtp = new Pair(node, 1);
    var st = new Stack();
    var nodest = new Stack();
    nodest.push(0);
    st.push(rtp);

    var preorder = "";
    var postorder = "";
    var inorder = "";
    while (st.size() > 0) {
        var top = st.peek();
        if (top.state == 1) {
            preorder += top.node.data + " ";
            prearray.push(nodest.peek())
            top.state++;

            if (top.node.left != null) {
                var lp = new Pair(top.node.left, 1);
                st.push(lp);
                nodest.push(nodest.peek() * 2 + 1);
            }
        } else if (top.state == 2) {
            inorder += top.node.data + " ";
            inarray.push(nodest.peek());
            top.state++;

            if (top.node.right != null) {
                var rp = new Pair(top.node.right, 1);
                st.push(rp);
                nodest.push(nodest.peek() * 2 + 2);
            }
        } else {
            postorder += top.node.data + " ";
            postarray.push(nodest.peek());
            top.state++;

            st.pop();
            nodest.pop();
        }
    }

    output += preorder + "\n";
    output += postorder + "\n";
    output += inorder + "\n";

}

var newcomment = {};
newcomment.problemtype = "binary tree";
newcomment.problemname = "iterative pre, post and inorder traversal";
function getsolution() {
    newcomment.solutionlang = document.querySelector("#languages").value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/solution", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4 || xhr.status != 200) return;
        document.querySelector("#solution").value = xhr.responseText;

    };
    xhr.send(JSON.stringify(newcomment));
}
var tree_type = "normal";

function maketree() {
    setTimeout(() => {
        nodearray = [];
        var input = document.querySelector("#input").value;
        var arr = input.split("\n")[1].split(" ");
        console.log(arr);
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == "n") {
                arr[i] = null;
            } else {
                arr[i] = parseInt(arr[i]);
            }
        }
        console.log(arr);
        // var arr = [50, 25, 12, null, null, 37, 30, null, null, 40, null, null, 75, 62, 60, null, null, 70, null, null, 87, null, null];
        var root = construct(arr);
        iterativePrePostInTraversal(root);
        nodearray = nodearray.sort(sortFunction);
        console.log(nodearray);
        var tree = [];
        for (var i = 0, j = 0; i < nodearray.length && j <= nodearray[nodearray.length - 1][0]; i++, j++) {
            if (j == nodearray[i][0]) {
                tree.push(nodearray[i][1]);
            } else {
                while (j != nodearray[i][0]) {
                    tree.push(null);
                    j++;
                }
                tree.push(nodearray[i][1]);
            }
        }
        console.log(tree);
        for (var i = 0; i < tree.length; i++) {
            if (tree_type == "pre") {
                tree[prearray[i]] += "<br>Preorder-" + (i + 1);
            } else if (tree_type == "post") {
                tree[postarray[i]] += "<br>Postorder-" + (i + 1);
            } else if (tree_type == "in") {
                tree[inarray[i]] += "<br>Inorder-" + (i + 1);
            }else{
                break;
            }
        }

        for (var i = 0; i < tree.length; i++) {
            var html = "";
            if (i == 0) {
                html += "<ul><li id = 'node0'><a href='#'>" + tree[i] + "</a><ul></ul></li></ul>";
                document.querySelector(".tree").innerHTML = html;
            } else {
                if (tree[Math.floor((i - 1) / 2)] != null && tree[i] != null) {
                    html += "<li id = 'node" + i + "'><a href='#'>" + tree[i] + "</a><ul></ul></li>";
                    document.querySelector("#node" + Math.floor((i - 1) / 2) + " ul").innerHTML += html;
                } else if (tree[i] == null && tree[Math.floor((i - 1) / 2)] != null) {
                    html += "<li id = 'node" + i + "'><a hef='#'>null</a></li>";
                    document.querySelector("#node" + Math.floor((i - 1) / 2) + " ul").innerHTML += html;
                }
            }
        }
        document.querySelector("#output").value = output;
    }, 1000);
}


