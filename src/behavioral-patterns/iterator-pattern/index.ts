// 迭代器模式
// 定义: 迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。
// 核心: 在使用迭代器模式之后，即使不关心对象的内部构造，也可以按顺序访问其中的每个元素

const createArrayIterator = <T>(array: T[]): Iterator<T> => {
  let index = 0;

  return {
    next() {
      if (index >= array.length) {
        return { value: undefined, done: true };
      }

      const value = array[index];
      index++;

      return { value, done: false };
    },
  };
}

type MyIterable<T> = {
  iterator: () => Iterator<T>;
};

const createArrayCollection = <T>(array: T[]): Iterable<T> => {
  return {
    [Symbol.iterator](){
      return createArrayIterator(array)
    }
  };
}

const array = [1, 2, 3, 4, 5];
const collection = createArrayCollection(array);

for (const item of collection) {
  console.log(item);
}