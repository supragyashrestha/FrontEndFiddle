/*
Stock Price Fluctuations
========================

You are given a stream of records about a particular stock. Each record contains a timestamp and the corresponding price of the stock at that timestamp.

Unfortunately due to the volatile nature of the stock market, the records do not come in order. Even worse, some records may be incorrect. Another record with the same timestamp may appear later in the stream correcting the price of the previous wrong record.

Design an algorithm that:

Updates the price of the stock at a particular timestamp, correcting the price from any previous records at the timestamp.
Finds the latest price of the stock based on the current records. The latest price is the price at the latest timestamp recorded.
Finds the maximum price the stock has been based on the current records.
Finds the minimum price the stock has been based on the current records.
Implement the StockPrice class:

StockPrice() Initializes the object with no price records.
void update(int timestamp, int price) Updates the price of the stock at the given timestamp.
int current() Returns the latest price of the stock.
int maximum() Returns the maximum price of the stock.
int minimum() Returns the minimum price of the stock.
 
Example
-------

StockPrice stockPrice = new StockPrice();
stockPrice.update(1, 10);
stockPrice.update(2, 5);
stockPrice.current(); // 5
stockPrice.maximum(); // 10
stockPrice.update(1, 3);
stockPrice.maximum(); // 5
stockPrice.update(4, 2);
stockPrice.minimum(); // 2

*/


class StockPrice {
    constructor () {
      this.maxmPrice = 0;
      this.minmPrice = 0;
      this.minHeap;
      this.maxHeap;
      this.priceMap = new Map();
      this.latestTimeStamp = 0;
      this.removedValues = [];
    }
    // Space Complexity - O(N)
  
    // Optimised opproach - using minHeap and maxHeap
  
    update (timestamp, price){
      // O(1)
      // Optimised - O(N)
      
      this.priceMap.set(timestamp, price);
      this.latestTimeStamp = Math.max(timestamp, this.latestTimeStamp);
  
  
      // otimised Approach
      if(this.priceMap.has(timestamp)){
        let earlierValue = this.priceMap.get(timestamp);
        //this.maxHeap.remove(earlierValue);
        this.removedValues.push(earlierValue);
      }
      this.priceMap.set(timestamp, price);
      this.maxHeap.add(price);
      this.minHeap.add(price);
    }
  
    /*
    heap: partial order, O(1)/O(log n)/O(n)
  
      1
     2 3
    4
  
      1
     3 2
    4
  
    BST: total order, O(log n)
  
    */
  
    current () {
      // O(1)
      let currentPrice = this.priceMap.get(this.latestTimeStamp);
      console.log(currentPrice);
      return currentPrice;
    }
  
    maximum () {
      // iterate over the map and get maximum stockPrice
      // O(N)
      let maxPrice = 0;
      this.priceMap.forEach(price => {
        maxPrice = Math.max(price, maxPrice);
      })
      console.log(maxPrice);
      return maxPrice;
  
  
      // map<T,P>
      // heap<Pair<T,P>, comparator(P)>
  
      // Optimised Approach - O(log(N))
  
      // iterate till return
      // get the top element in maxHeap
      // check in hasHMap whether the timestamp and price is matching
      // if it matched return the price
      // if it doesn't remove/pop the top (O(Log(N)) and iterate again
  
      // Best time Complexity - O(1), 
      // Worst Time Complexity - O(Nlog(N))
    }
  
    minimum () {
      // iterate over the map and get maximum stockPrice
      // O(N)
      
      // Optimised Approach - O(log(N))
      let minPrice = Number.MAX_SAFE_INTEGER;
      this.priceMap.forEach(price => {
        minPrice = Math.min(price, minPrice);
      })
      console.log(minPrice);
      return minPrice;
    }
  }
  
  let stockPrice = new StockPrice();
  stockPrice.update(1, 10);
  stockPrice.update(2, 5);
  stockPrice.current(); // 5
  stockPrice.maximum(); // 10
  stockPrice.update(1, 3);
  stockPrice.maximum(); // 5
  stockPrice.update(4, 2);
  stockPrice.minimum(); // 2
  
  
  