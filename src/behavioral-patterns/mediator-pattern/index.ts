// 中介者模式
// 减少组件之间的直接依赖关系，将它们通过一个中介者对象进行交互

const A = {
  score: 10,

  newScore(score) {
    this.score = score;
    return this.getRank();
  },

  getRank() {
    const scores = [this.score, B.score, C.score].sort((a, b) => {
        return a < b ? 1 : -1;
    });

    return scores.indexOf(this.score) + 1
  }
};

const B = {
  score: 20,
  newScore(score) {
    this.score = score;
    // 通过中介者获取
    return rankMediator(this);
  }
};

const C = {
  score: 30,
  newScore(score) {
    this.score = score;
    return rankMediator(this);
  }
};

// 中介者，计算排名 维护A、B、C
function rankMediator(person) {
  const scores = [A.score, B.score, C.score].sort((a, b) => {
      return a < b ? 1 : -1;
  });

  return scores.indexOf(person.score) + 1
}

// A通过自身来处理
console.log('A rank', A.newScore(100)) // 1

// B和C交由中介者处理 
console.log('B rank', B.newScore(200)) // 2
console.log('C rank', C.newScore(50)); // 3
