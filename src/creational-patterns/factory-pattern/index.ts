//  工厂模式

// 定义接口
interface AnimalInterface {
  speak: () => void;
}

// 定义接口抽象
class Animal implements AnimalInterface {
  speak() {
    throw new Error('This method must be implemented.');
  }
}

class Dog extends Animal {
  speak(): void {
    console.log('Woof!');
  }
}

class Cat extends Animal {
  speak(): void {
    console.log('Meow!');
  }
}

type AnimalType = 'Dog' | 'Cat'

// 用 const 声明会有问题, 会报  断言要求使用显式类型注释声明调用目标中的每个名称。
function assertAnimalType(animalType: unknown): asserts animalType is AnimalType {
  if (animalType !== 'Dog' && animalType !== 'Cat') {
    throw new Error(`Invalid animal type: ${animalType}.`);
  }
}

class AnimalFactory {
  createAnimal(type: AnimalType): Animal {
    assertAnimalType(type)

    switch (type) {
      case 'Dog':
        return new Dog();
      case 'Cat':
        return new Cat();
    }
  }
}

const animalFactory = new AnimalFactory();

const dog = animalFactory.createAnimal('Dog');
const cat = animalFactory.createAnimal('Cat');

dog.speak(); // "Woof!"
cat.speak(); // "Meow!"


// 场景
// jQuery-$('div')
// React.createElement
// vue 异步组件


// 构造函数和创建者分离原则
// 符合开放封闭原则