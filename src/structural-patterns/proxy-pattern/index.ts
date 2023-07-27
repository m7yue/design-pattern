// 代理模式
// 代理模式是一种非常常见的设计模式，它可以为其他对象提供一种代理，以控制对这个对象的访问。

// 当客户不方便直接访问一个对象或者不满足需要的时候，提供一个代理对象来控制对这个对象的访问，客户实际上访问的是代理对象。
// 代理对象对请求做出一些处理之后， 再把请求转交给本体对象
// 代理和本体的接口具有一致性，本体定义了关键功能，而代理是提供或拒绝对它的访问，或者在访问本体之前做一 些额外的事情

{
  // 主题接口
  class Subject {
    request() {
      console.log('Subject：处理请求');
    }
  }

  // 真实主题类
  class RealSubject extends Subject {
    request() {
      console.log('RealSubject：处理请求');
    }
  }

  // 代理类
  class Proxy extends Subject {
    realSubject: RealSubject

    constructor(realSubject) {
      super();
      this.realSubject = realSubject;
    }

    request() {
      if (this.checkAccess()) {
        this.realSubject.request();
        this.logAccess();
      }
    }

    checkAccess() {
      console.log('Proxy：检查访问权限');
      return true;
    }

    logAccess() {
      console.log('Proxy：记录访问日志');
    }
  }

  // 使用代理访问真实对象
  const realSubject = new RealSubject();
  const proxy = new Proxy(realSubject);

  proxy.request();
}

