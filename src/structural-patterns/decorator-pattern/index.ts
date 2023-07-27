// 在不影响其他对象的情况下，动态地将功能添加到对象中
// 为对象添加新功能
// 不改变原有的结构和功能
// React HOC ES6 装饰器

// es6 方法装饰器
function logMethods() {
  return function (target: any, methodName: string, desc?: PropertyDescriptor) {
    let orgMethods = desc.value;
    desc.value = function (...args: any[]) {
      args = args.map((value) => {
        return String(value);
      })
      orgMethods.apply(this, args);
    }
  }
}

class HttpClient{
  constructor(){}
    
  @logMethods()
  getData(...args: any[]){
   console.log('我是类里面的方法');
  }
}
let http = new HttpClient();
http.getData();
