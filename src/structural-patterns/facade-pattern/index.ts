// 外观模式
// 定义: 为子系统中的一组接口提供一个一致的界面，定义一个高层接口，这个接口使子系统更加容易使用
// 核心: 可以通过请求外观接口来达到访问子系统，也可以选择越过外观来直接访问子系统
// 实现: 外观模式在JS中，可以认为是一组函数的集合

class SubsystemA {
  operationA(): void {
    console.log("SubsystemA is doing something...");
  }
}

class SubsystemB {
  operationB(): void {
    console.log("SubsystemB is doing something...");
  }
}

class SubsystemC {
  operationC(): void {
    console.log("SubsystemC is doing something...");
  }
}

class Facade {
  private subsystemA: SubsystemA;
  private subsystemB: SubsystemB;
  private subsystemC: SubsystemC;

  constructor() {
    this.subsystemA = new SubsystemA();
    this.subsystemB = new SubsystemB();
    this.subsystemC = new SubsystemC();
  }

  operation(): void {
    console.log("Facade is providing a simple interface to the complex system...");
    this.subsystemA.operationA();
    this.subsystemB.operationB();
    this.subsystemC.operationC();
  }
}

// 使用
const facade = new Facade();
facade.operation();