// 策略模式
// 定义: 定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。
// 核心: 将算法的使用和算法的实现分离开来。一个基于策略模式的程序至少由两部分组成：
// 第一个部分是一组策略类，策略类封装了具体的算法，并负责具体的计算过程。
// 第二个部分是环境类Context，Context接受客户的请求，随后把请求委托给某一个策略类。要做到这点，说明Context 中要维持对某个策略对象的引用
// 实现: 策略模式可以用于组合一系列算法，也可用于组合一系列业务规则
// 优缺点
// 优点: 可以有效地避免多重条件语句，将一系列方法封装起来也更直观，利于维护
// 缺点: 往往策略集会比较多，我们需要事先就了解定义好所有的情况

const ERROR_MSGS = {
  default: '输入数据格式不正确',
  minLength: '输入数据长度不足',
  isNumber: '请输入数字',
  required: '内容不为空',
};

const RULES = {
  minLength(value: string, length: number, errorMsg?: string) {
    if (value.length < length) {
      return errorMsg || ERROR_MSGS['minLength'];
    }
  },
  isNumber(value: string, errorMsg: string) {
    if (!/\d+/.test(value)) {
      return errorMsg || ERROR_MSGS['isNumber'];
    }
  },
  required(value: string, errorMsg: string) {
    if (value === '') {
      return errorMsg || ERROR_MSGS['required'];
    }
  },
};

class Validator {
  items: (() => string)[]

  addRule(value: string, rule: string, errorMsg?: string) {
    let arg = [value];

    if (rule.indexOf('minLength') !== -1) {
      const temp = rule.split(':');
      arg.push(temp[1]);
      rule = temp[0];
    }

    arg.push(errorMsg);

    this.items.push(() => {
      return RULES[rule](...arg);
    });
  }

  validate() {
    let res = [];
    
    for (let i = 0; i < this.items.length; i++) {
      const errMsg = this.items[i]();
      res.push(errMsg || true);
    }

    return res;
  }
}

const validate = new Validator();
validate.addRule('ccc', 'isNumber', '只能为数字');
validate.addRule('', 'required');
validate.addRule('123', 'minLength:5', '最少5位');
validate.addRule('12345', 'minLength:5', '最少5位');


const result = validate.validate();

console.log(result);