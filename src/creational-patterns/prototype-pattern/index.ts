// 原型模式

// 创建一个原型对象
const carPrototype = {
  wheels: 4,
  color: 'red',
  start() {
    console.log('Starting the car...');
  },
  stop() {
    console.log('Stopping the car...');
  },
};

// 使用Object.create()方法克隆, 复用原型
const car = Object.create(carPrototype);
console.log(car); // Output: {}
console.log(car.wheels) // 4
console.log(car.color) // 'red'

car.wheels = 6;
car.color = 'blue';
console.log(car)
console.log(car.wheels); // Output: 6
console.log(car.color); // Output: blue

car.start(); // Output: Starting the car...
car.stop(); // Output: Stopping the car...
