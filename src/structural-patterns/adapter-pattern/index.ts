// 适配器模式
// 定义: 是解决两个软件实体间的接口不兼容的问题，对不兼容的部分进行适配
// 核心: 解决两个已有接口之间不匹配的问题
// 实现: 比如一个简单的数据格式转换的适配器

// 渲染数据，格式限制为数组
const renderData = (data: unknown[]) => {
  data.forEach(function(item) {
    console.log(item);
  });
}

const isArray = (data): data is Array<unknown> => {
  return Object.prototype.toString.call(data) === '[object Array]'
}

// 对非数组的进行转换适配
const arrayAdapter = (data: unknown) => {
  if (typeof data !== 'object') {
    return [];
  }

  if (isArray(data)) {
    return data;
  }

  let temp = [];

  for (const item in Reflect.ownKeys(data)) {
    temp.push(data[item]);
  }

  return temp;
}

const data = {
  0: 'A',
  1: 'B',
  2: 'C'
};

renderData(arrayAdapter(data)); // A B C