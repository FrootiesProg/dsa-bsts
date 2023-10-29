class Node {
  constructor(val, left = null, right = null) {
    this.val = val; // Node value
    this.left = left; // Left child node
    this.right = right; // Right child node
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root; // Root node of the BST
  }

  // Insert a node iteratively into the BST
  insert(val) {
    // If BST is empty, set root as the new node
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }

    let current = this.root;
    while (true) {
      if (val < current.val) {
        // If value is less than current value
        // If left child doesn't exist, insert it
        if (!current.left) {
          current.left = new Node(val);
          return this;
        }
        current = current.left;
      } else {
        // If value is greater than or equal to current value
        // If right child doesn't exist, insert it
        if (!current.right) {
          current.right = new Node(val);
          return this;
        }
        current = current.right;
      }
    }
  }

  // Insert a node recursively into the BST
  insertRecursively(val, currentNode = this.root) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }

    if (val < currentNode.val) {
      if (!currentNode.left) {
        currentNode.left = new Node(val);
      } else {
        this.insertRecursively(val, currentNode.left);
      }
    } else {
      if (!currentNode.right) {
        currentNode.right = new Node(val);
      } else {
        this.insertRecursively(val, currentNode.right);
      }
    }
    return this;
  }

  // Find a node with given value using iteration
  find(val) {
    let current = this.root;
    while (current) {
      if (val === current.val) return current; // Node found
      current = val < current.val ? current.left : current.right;
    }
    return undefined; // Node not found
  }

  // Find a node with given value using recursion
  findRecursively(val, currentNode = this.root) {
    if (!currentNode) return undefined;
    if (val === currentNode.val) return currentNode;
    return val < currentNode.val
      ? this.findRecursively(val, currentNode.left)
      : this.findRecursively(val, currentNode.right);
  }

  // DFS Pre-Order Traversal
  dfsPreOrder(node = this.root, nodes = []) {
    if (node) {
      nodes.push(node.val); // Visit node
      this.dfsPreOrder(node.left, nodes); // Traverse left subtree
      this.dfsPreOrder(node.right, nodes); // Traverse right subtree
    }
    return nodes;
  }

  // DFS In-Order Traversal
  dfsInOrder(node = this.root, nodes = []) {
    if (node) {
      this.dfsInOrder(node.left, nodes);
      nodes.push(node.val);
      this.dfsInOrder(node.right, nodes);
    }
    return nodes;
  }

  // DFS Post-Order Traversal
  dfsPostOrder(node = this.root, nodes = []) {
    if (node) {
      this.dfsPostOrder(node.left, nodes);
      this.dfsPostOrder(node.right, nodes);
      nodes.push(node.val);
    }
    return nodes;
  }

  // BFS Traversal
  bfs() {
    if (!this.root) return [];
    const nodes = [];
    const queue = [this.root]; // Use a queue for BFS traversal

    while (queue.length) {
      let currentNode = queue.shift();
      nodes.push(currentNode.val);
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }
    return nodes;
  }

  // Remove a node with given value
  remove(val) {
    this.root = this._removeNode(this.root, val);
    return this;
  }

  // Helper function to recursively remove a node
  _removeNode(node, val) {
    // Base case: node is null
    if (!node) return null;

    if (val === node.val) {
      // Node with no child
      if (!node.left && !node.right) return null;
      // Node with only right child
      if (!node.left) return node.right;
      // Node with only left child
      if (!node.right) return node.left;
      // Node with two children
      let minValue = this._findMin(node.right);
      node.val = minValue;
      node.right = this._removeNode(node.right, minValue);
      return node;
    } else if (val < node.val) {
      node.left = this._removeNode(node.left, val);
      return node;
    } else {
      node.right = this._removeNode(node.right, val);
      return node;
    }
  }

  // Helper function to find the minimum value in a subtree
  _findMin(node) {
    while (node.left) {
      node = node.left;
    }
    return node.val;
  }

  // Check if the BST is balanced
  isBalanced() {
    const checkBalance = (node) => {
      if (!node) return { height: -1, balanced: true };

      let left = checkBalance(node.left);
      let right = checkBalance(node.right);

      if (
        !left.balanced ||
        !right.balanced ||
        Math.abs(left.height - right.height) > 1
      ) {
        return { height: 0, balanced: false };
      }
      return {
        height: Math.max(left.height, right.height) + 1,
        balanced: true,
      };
    };

    return checkBalance(this.root).balanced;
  }

  // Find the second highest value in the BST
  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) return undefined;

    let current = this.root;
    let parent;

    // Traverse to the far right (highest value)
    while (current.right) {
      parent = current;
      current = current.right;
    }

    // If highest node has a left child, then the second highest
    // is the farthest right node of that left subtree
    if (current.left) {
      current = current.left;
      while (current.right) {
        current = current.right;
      }
      return current.val;
    }
    // Otherwise, the parent of the highest node is the second highest
    return parent.val;
  }
}

module.exports = BinarySearchTree;
