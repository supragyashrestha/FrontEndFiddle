// LRU Cache

// create modify get remove

/*
  Get and modify operations - Hash Map
  LRU - N size of Map
  stack to maiantain LRU

  

[2, 5, 4, 3, 6]

O(N)
O(1)
O(N)

Doubly Linked Linked List

Node - {
  val: [value],
  prev: *Node,
  next: *Node
}

HashMap {
  x: *Node
}

*lastNode -> To easily remove last ele
SIZE -> current size




1 -> 2 -> 3 -> 4 -> 5

1 -> 2 -> 4 -> 5 -> 3

O(1)
O(1)
O(N)


*/


// n = 5
// insert 1
// Insert 2
// Insert 3
// Insert 4
// Insert 5
// Insert 3
// Insert 6



class Node {
    constructor(key, val) {
      this.val = val;
      this.key = key;
      this.prev = null;
      this.next = null;
    }
  }
  
  class NotFoundNode {
    constructor (){
      this.notFound = true;
    }
  
    getValue() {
      return 'Not Found in cache';
    }
  }
  
  class getLRUCache {
    constructor (size) {
      this.hashMap = new Map();
      this.size = 0;
      this.maxSize = size;
      this.currNode = null;
      this.lastNode = null;
    }
  
    insertValue (key, value) {
      if(!this.hashMap.has(key)){
        this.insertAtFront(key, value);
      } else {
        let prevNode = this.hashMap.get(key);
        let ppNode = prevNode.prev;
        let npNode = prevNode.next;
        ppNode && (ppNode.next = npNode);
        npNode && (npNode.prev = ppNode);
        // delete(prevNode);
        this.hashMap.delete(key);
        this.insertAtFront(key, value);
        this.size = this.size - 1;
      }
    }
  
    insertAtFront (key, value){
      let newNode = new Node(key, value);
      if(this.maxSize === this.size){
        // delete lastNode
        let nodeToDelete = this.lastNode;
        this.lastNode = this.lastNode.next;
        this.hashMap.delete(nodeToDelete.key);
        this.size = this.size - 1;
      }
      if(this.currNode) {
        this.currNode.next = newNode;
      }
      newNode.prev = this.currNode;
      // ensure currNode is always pointing to last node
      this.currNode = newNode;
      this.size = this.size + 1;
      this.hashMap.set(key, value);
  
      // if size is one ie lastNode would be updated
      if(this.size === 1){
        this.lastNode = newNode;
      }
    }
  
    ///  curr  <-> newNode
  
    getValue(key) {
      if(this.hashMap.has(key)){
        return this.hashMap.get(key);
      } else {
        this.insertValue(key, new NotFoundNode());
        return this.hashMap.get(key).getValue();
        // throw Error('Not Found');
      }
    }
  
    removeValue(key){
      if(this.hashMap.has(key)){
        let prevNode = this.hashMap.get(key);
        let ppNode = prevNode.prev;
        let npNode = prevNode.next;
        ppNode && (ppNode.next = npNode);
        npNode && (npNode.prev = ppNode);
        // delete(prevNode);
        this.hashMap.delete(key);
        this.size = this.size - 1;
        return true;
      } else {
        return new NotFoundNode().getValue();
      }
    }
  }
  
  
  let newCache = new getLRUCache(5);
  newCache.insertValue(1, '1');
  newCache.insertValue(2, '2');
  newCache.insertValue(3, '3');
  newCache.insertValue(4, '4');
  newCache.insertValue(5, '5');
  newCache.insertValue(3, '3-new');
  console.log(newCache.getValue(4));
  console.log(newCache.getValue(1));
  console.log(newCache.getValue(3));
  console.log(newCache.getValue(1));
  newCache.insertValue(6, '6');
  console.log(newCache.getValue(1));
  newCache.removeValue(4);
  console.log(newCache.getValue(4));