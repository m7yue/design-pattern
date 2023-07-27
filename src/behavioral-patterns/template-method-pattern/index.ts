// 模版方法模式：父类提供操作模板，有些不同的操作需要子类独自去处理，父类提供操作流程的大致模板和算法

abstract class Sport {
  // 模版方法的执行逻辑
  init() {
    this.stretch(); // 拉伸
    
    this.jog(); // 慢跑
    
    this.deepBreath(); // 深呼吸
    
    this.start(); // 开始运动
  }

  stretch() {
    console.log('拉伸');
  }

  jog() {
    console.log('慢跑');
  }

  deepBreath() {
    console.log('深呼吸');
  }

  start() {
    throw new Error('start not implement!');
  }

  end() {
    console.log('运动结束');
  }
}

class Basketball extends Sport {
  stretch() {
    console.log('我要多拉伸一会')
  }

  start() {
    console.log('先投上几个三分');
  }

  end() {
    console.log('运动结束了，有事先走一步');
  }
} 

const basketball = new Basketball();

// 子类调用，最终会按照父类定义的顺序执行
basketball.init();
basketball.start()
