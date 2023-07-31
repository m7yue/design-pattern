# design-pattern

## 设计模式五大原则
### 单一职责原则（SRP）
单一职责原则（SRP）要求一个类只负责一个职责。这样可以提高代码的内聚性和可维护性。
```ts
// 不符合 SRP 原则的代码
class UserService {
  getUserInfo() {
    // 获取用户信息的逻辑
  }
  updateUserPassword() {
    // 修改用户密码的逻辑
  }
  updateUserAvatar() {
    // 修改用户头像的逻辑
  }
}

// 符合 SRP 原则的代码
class UserService {
  getUserInfo() {
    // 获取用户信息的逻辑
  }
}

class UserPasswordService {
  updateUserPassword() {
    // 修改用户密码的逻辑
  }
}

class UserAvatarService {
  updateUserAvatar() {
    // 修改用户头像的逻辑
  }
}
```

### 开放封闭原则（OCP）
开放封闭原则（OCP）要求软件实体应该对扩展开放，对修改关闭。这样可以降低代码的耦合度，提高代码的可维护性和可扩展性。
```ts
// 不符合 OCP 原则的代码
class Payment {
  pay(amount: number) {
    if (amount > 0) {
      // 支付逻辑
    } else {
      // 报错逻辑
    }
  }
}

// 符合 OCP 原则的代码
class Payment {
  pay(amount: number) {
    if (amount > 0) {
      this.doPay(amount);
    } else {
      this.reportError("Invalid amount");
    }
  }
  // 抽象方法，子类需要实现
  protected abstract doPay(amount: number): void;
  protected abstract reportError(errorMsg: string): void;
}

class AlipayPayment extends Payment {
  protected doPay(amount: number) {
    // 支付宝支付逻辑
  }
  protected reportError(errorMsg: string) {
    // 报错逻辑
  }
}

class WechatPayPayment extends Payment {
  protected doPay(amount: number) {
    // 微信支付逻辑
  }
  protected reportError(errorMsg: string) {
    // 报错逻辑
  }
}
```

### 里氏替换原则（LSP）
里氏替换原则（LSP）要求子类可以替换父类并且不影响程序的正确性。这样可以确保程序的稳定性和可维护性。

基类的不可修改的会影响流程的方法或属性，不应该被子类修改， 否则，无法保证子类的行为和基类的行为一致。
在设计中，尽量避免在子类中覆盖父类的方法，而是通过新增方法或属性来扩展子类的行为，这样可以保持程序的稳定性和可维护性。
也就是说，对于基类来说，应当保证子类的覆写方法不能影响正常的行为，即可以限制哪些方法可以被子类继承；
```ts
// 不符合 LSP 原则的代码
class Sport {
  init() {
    this.stretch(); // 拉伸
        
    this.start(); // 开始运动
  }

  stretch() {
    console.log('拉伸');
  }

  start() {
    console.log('start');
  }
}

class Basketball extends Sport {
  stretch() {
    throw new Error('拉伸报错，基类 init 执行报错')
  }
}
const basketball = new Basketball();
basketball.init();


// 符合 LSP 原则的代码
class Sport {
  init() {
    this.stretch(); // 拉伸
  
    this.start(); // 开始运动
  }

  stretch() {
    console.log('拉伸');
  }

  start() {
    console.log('start');
  }
}

class Basketball extends Sport {
  stretch() {
    console.log('ok, 现在 init 正常运行')
  }
}
const basketball = new Basketball();
basketball.init();
```


### 接口隔离原则（ISP）
接口隔离原则（ISP）要求客户端不应该依赖它不需要的接口。这样可以降低代码的耦合度，提高代码的可维护性和可扩展性。
```ts
// 不符合 ISP 原则的代码
interface UserService {
  getUserInfo();
  updateUserPassword();
  updateUserAvatar();
}

class UserServiceImpl implements UserService {
  getUserInfo() {
    // 获取用户信息的逻辑
  }
  updateUserPassword() {
    // 修改用户密码的逻辑
  }
  updateUserAvatar() {
    // 修改用户头像的逻辑
  }
}


// 符合 ISP 原则的代码
interface UserInfoService {
  getUserInfo();
}

interface UserPasswordService {
  updateUserPassword();
}

interface UserAvatarService {
  updateUserAvatar();
}

class UserInfoServiceImpl implements UserInfoService {
  getUserInfo() {
    // 获取用户信息的逻辑
  }
}

class UserPasswordServiceImpl implements UserPasswordService {
  updateUserPassword() {
    // 修改用户密码的逻辑
  }
}

class UserAvatarServiceImpl implements UserAvatarService {
  updateUserAvatar() {
    // 修改用户头像的逻辑
  }
}
```

### 依赖反转原则（DIP）
依赖反转原则（DIP）要求高层模块不应该依赖低层模块，而是应该依赖于抽象。这样可以确保程序的稳定性和可维护性。
```ts
// 不符合 DIP 原则的代码
class OrderService {
  constructor(private paymentService) {}
  createOrder() {
    const paymentService = new paymentService()
    // 创建订单的逻辑
    paymentService.pay();
  }
}

class PaymentService {
  pay() {
    // 支付逻辑
  }
}


// 符合 DIP 原则的代码
interface PaymentService {
  pay();
}

class AlipayPaymentService implements PaymentService {
  pay() {
    // 支付宝支付逻辑
  }
}

class WechatPayPaymentService implements PaymentService {
  pay() {
    // 微信支付逻辑
  }
}

class OrderService {
  constructor(private paymentService: PaymentService) {}
  createOrder() {
    // 创建订单的逻辑
    this.paymentService.pay();
  }
}

const paymentService = new AlipayPaymentService();
const orderService = new OrderService(paymentService);
```