"use strict";

// you can write to stdout for debugging purposes, e.g.
console.log("This is a debug message");


function findLargestUniqueSbs (str) {
    let ans = 0;
    let l= 0, r = 0;
    let charMap = new Map();
    while(l<=r && r<str.length){
        if(charMap.get(str[r])){
            while(l<r && charMap.get(str[r])){
                charMap.set(str[l], false);
                l++;
            }
        }
        charMap.set(str[r], true);
        ans = Math.max(ans, r-l+1);
        r++;
    }
    return ans;
}


const str1 = "abcabcbb";
const str2 = "bbbbbb";

// console.log(findLargestUniqueSbs(str1));
// console.log(findLargestUniqueSbs(str2));

// T.C - O(N)
// S.C - O(N)//O(1) if we use string


function findActualIntervals (intervals = []) {
    let actualIntervals = [];
    if(intervals.length === 0){
        return actualIntervals;
    }
   
    let sortedIntervals = intervals.sort(([as, ae], [bs, be]) => {
        if(as<bs){
            return -1;
        } else if(as>bs){
            return 1;
        } else if(ae<be){
            return -1;
        } else {
            return 1;
        }
    })
    // console.log(sortedIntervals);
    let [currSrt, currEnd] = sortedIntervals[0];
    for(let i = 1; i< sortedIntervals.length; i++){
        // if its overlapping with previous
        let [srt, end] = sortedIntervals[i];
        if(srt <= currEnd){
            // update currsrt and currEnd
            currEnd = Math.max(currEnd, end);
        } else {
        // if not update currStr, currEnd, and push the earlier values into actualIntervals
            actualIntervals.push([currSrt, currEnd]);
            [currSrt, currEnd] = [srt, end];
        }
    }
    // at end of loop update actualIntervals
    actualIntervals.push([currSrt, currEnd]);
    return actualIntervals;
}


const intervals = [ [1, 4], [3,7],[11, 14],[9, 15]];
console.log(findActualIntervals(intervals));