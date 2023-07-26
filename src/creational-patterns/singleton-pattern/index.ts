// 单例模式
// 利用闭包, 提供一个访问它的全局访问点

type Ctor = new (...args: any[]) => any

const Singleton = <T extends Ctor>(ctor: T) => {
  let instance: T | null = null;

  return class {
    constructor(...args: any[]) {
      if (!instance) {
        instance = new ctor(...args);
      }

      return instance;
    }
  } as T; 
};

class Logger {
  constructor() {
    this._init()
  }
  _init() {
    console.log('init do something! ')
  }
}

const SingletonLogger = Singleton(Logger);

// 只会执行一次 init, new 多次获取的是同一个实例
const a = new SingletonLogger();
const b = new SingletonLogger();

console.log(a === b)

