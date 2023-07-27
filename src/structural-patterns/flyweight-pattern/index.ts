// 享元模式
// 共享内存（主要考虑内存，而非效率）

// Flyweight（享元）
class IphoneFlyweight {
  model: string

  screen: number

  memory: number

  constructor(model: string, screen: number, memory: number) {
    this.model = model;
    this.screen = screen;
    this.memory = memory;
  }
}

const flyweightFactory = (function () {
  let iphonesCache: Map<string, IphoneFlyweight> = new Map(); // 缓存
  return {
    get: function(model: string, screen: number, memory: number) {
      const key = model + screen + memory;
      if (!iphonesCache[key]) {
        iphonesCache.set(key, new IphoneFlyweight(model, screen, memory));
      }
      return iphonesCache.get(key);
    }
  };
})();

class Iphone {
  model: string

  screen: number

  memory: number

  SN: number

  phone: IphoneFlyweight

  constructor(model: string, screen: number, memory: number, SN: number) {
    const phone = flyweightFactory.get(model, screen, memory);

    this.model = phone.model
    this.screen = phone.screen
    this.memory = phone.memory

    this.SN = SN
  }
}


let phones = [];
for (let i = 0; i < 4; i++) {
  let memory = i % 2 == 0 ? 16 : 32;
  phones.push(new Iphone("iphoneSE", 5.0, memory, i));
}
console.log(phones);