import { useRef } from "react";

export function useMemo(callback, deps) {
  const mPointer = useRef([deps]); // Memory pointer (Make sure to read useRef docs)
  const isChanged = mPointer.current[0].some(
    // If dependencies changed
    (item, index) => item !== deps[index]
  );

  if (mPointer.current.length === 1 || isChanged) {
    // If first time or changed, compute and store it
    mPointer.current = [deps, callback()];
  }

  return mPointer.current[1];
}

// using Closures
function memo() {
    const stack = {};
    return (callback, deps) => {
      /* Creating hashkey with dependencies + function source without whitespaces */
      const hash = deps.join("/") + "/" + callback.toString().replace(/\s+/g, "");
  
      if (!stack[hash]) {
        stack[hash] = callback();
      }
  
      return stack[hash];
    };
  };
  
  export const useMemo = memo();