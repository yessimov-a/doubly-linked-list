const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    append(data) {
        if (this.length === 0) {
            let node = new Node(data);
            this._head = node;
            this._tail = node;
        } else {
            let current = this._head;
            while (current.next) {
                current = current.next;
            };
            let newNode = new Node(data, current);
            current.next = newNode;
            this._tail = newNode;
        }
        this.length += 1;
        return this;
    }

    head() {
        return this.length === 0 ? null : this._head.data;
    }

    tail() {
        return this.length === 0 ? null : this._tail.data;
    }

    at(index) {
        let i = 0;
        let node = this._head;
        while (i !== index) {
            node = node.next
            i++
        }
        return node.data
    }

    insertAt(index, data) {
        if (index < 0 || index > this.length - 1 && index !== 0) return console.log("Wrong index to insert");
        if (this.length === 0) {
            this.append(data);
            return;
        }
        let i = 0;
        let node = this._head;
        let newNode;
        while (i !== index) {
            node = node.next;
            i++;
        }
        if (index === 0) {
            if (this.length === 1) {
                newNode = new Node(data, null, node);
                node.prev = newNode;
                this._head = newNode;
            }
        } else if (index === this.length - 1) {
            let prevNode = this._tail.prev;
            let currentNode = this._tail;
            newNode = new Node(data, prevNode, currentNode);
            prevNode.next = newNode;
            this._tail.prev = newNode;
        } else {
            let currentNode = node;
            let prevNode = node.prev;
            node = new Node(data, node.prev, node);
            prevNode.next = node;
            currentNode.prev = node;
        }
        this.length += 1;
        return this;
    }

    isEmpty() {
        return this.length === 0;
    }

    clear() {
        this._head = null;
        this._tail = null;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        if (index < 0 || index > this.length - 1) return "Wrong index to delete";
        let i = 0;
        let node = this._head;
        if (this.length === 1) {
            this.clear();
            return this;
        } else if (index === 0) {
            this._head = node.next;
            this._head.prev = null;
        } else if (index === this.length - 1) {
            this._tail = this._tail.prev;
            this._tail.next = null;
        } else {
            while (i !== index) {
                node = node.next
                i++
            };
            let prevNode = node.prev;
            let nextNode = node.next;
            prevNode.next = nextNode;
            nextNode.prev = prevNode;
        }
        this.length -= 1;
        return this;
    }

    reverse() {
        if (this._head === null) {
            return null;
        }

        let currentNode = this._head;
        this._tail = currentNode;

        while (currentNode !== null) {
            let prev = currentNode.prev;
            currentNode.prev = currentNode.next;
            currentNode.next = prev;

            if (currentNode.prev) {
                currentNode = currentNode.prev;
            } else {
                this._head = currentNode;
                break;
            }
        }
        return this;
    };

    indexOf(data) {
        let i = 0;
        let node = this._head;
        while (i < this.length) {
            if (node.data === data) {
                return i;
            }
            node = node.next
            i++
        };
        return -1;
    }
}

module.exports = LinkedList;
