// 职责链模式
// 定义: 使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系，将这些对象连成一条链，并沿着这条链 传递该请求，直到有一个对象处理它为止
// 核心: 请求发送者只需要知道链中的第一个节点，弱化发送者和一组接收者之间的强联系，可以便捷地在职责链中增加或删除一个节点，同样地，指定谁是第一个节点也很便捷

abstract class Handler {
  private nextHandler?: Handler;

  setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  handle(request: string): void {
    if (this.canHandle(request)) {
      this.onHandle(request);
    }
    else if (this.nextHandler) {
      console.log(`${this.constructor.name} cannot handle request ${request}.`);
      this.nextHandler.handle(request);
    }
    else {
      console.log(`No handler can handle request ${request}.`);
    }
  }

  abstract canHandle(request: string): boolean;

  abstract onHandle(request: string): void;
}

class HandlerA extends Handler {
  canHandle(request: string): boolean {
    return request === 'A';
  }

  onHandle(request: string): void {
    console.log(`${this.constructor.name} handles request ${request}.`);
  }
}

class HandlerB extends Handler {
  canHandle(request: string): boolean {
    return request === 'B';
  }

  onHandle(request: string): void {
    console.log(`${this.constructor.name} handles request ${request}.`);
  }
}

class HandlerC extends Handler {
  canHandle(request: string): boolean {
    return request === 'C';
  }

  onHandle(request: string): void {
    console.log(`${this.constructor.name} handles request ${request}.`);
  }
}


const handlerA = new HandlerA();
const handlerB = new HandlerB();
const handlerC = new HandlerC();

handlerA.setNext(handlerB).setNext(handlerC)

console.log('======== start ========')
handlerA.handle('A'); // Handle Request A
console.log('======== end ========\n')

console.log('======== start ========')
handlerA.handle('B'); // Handle Request B
console.log('======== end ========\n')

console.log('======== start ========')
handlerA.handle('C'); // Handle Request C
console.log('======== end ========\n')

console.log('======== start =======')
handlerA.handle('D'); // null
console.log('======== end ========\n')
