var std;
(function (std) {
    var TreeNode = (function () {
        function TreeNode(parent, value) {
            this.parent = parent;
            this.value = value;
        }
        TreeNode.prototype.getParent = function () {
            return this.parent;
        };
        TreeNode.prototype.getLeftChild = function () {
            return this.leftChild;
        };
        TreeNode.prototype.getRightChild = function () {
            return this.rightChild;
        };
        TreeNode.prototype.getValue = function () {
            return this.value;
        };
        TreeNode.prototype.size = function () {
            var size = 1;
            if (this.leftChild != null)
                size += this.leftChild.size();
            if (this.rightChild != null)
                size += this.rightChild.size();
            return size;
        };
        TreeNode.prototype.prev = function () {
            var node = null;
            if (this.leftChild != null)
                node = this.leftChild;
            else if (this.parent != null && this.parent.leftChild != this)
                node = this.parent.leftChild;
            if (node != null)
                while (node.rightChild != null)
                    node = node.rightChild;
            return node;
        };
        TreeNode.prototype.next = function () {
            var node = null;
            if (this.rightChild != null)
                node = this.rightChild;
            else if (this.parent != null && this.parent.rightChild != this)
                node = this.parent.rightChild;
            if (node != null)
                while (node.leftChild != null)
                    node = node.leftChild;
            return node;
        };
        TreeNode.prototype.front = function () {
            var node = this;
            while (node.parent != null)
                node = node.parent;
            while (node.leftChild != null)
                node = node.leftChild;
            return node;
        };
        TreeNode.prototype.back = function () {
            var node = this;
            while (node.parent != null)
                node = node.parent;
            while (node.rightChild != null)
                node = node.rightChild;
            return node;
        };
        TreeNode.prototype.setLeft = function (node) {
            this.leftChild = node;
        };
        TreeNode.prototype.setRight = function (node) {
            this.rightChild = node;
        };
        TreeNode.prototype.setValue = function (value) {
            this.value = value;
        };
        return TreeNode;
    })();
    std.TreeNode = TreeNode;
})(std || (std = {}));
