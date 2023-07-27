// 观察者模式

type SubscribeCallback<T extends Subject> = (subject: T) => void

type SubjectMap<T extends Subject = Subject> = WeakMap<T, SubscribeCallback<T>[]>

class Observer {
  name: string

  subjectMap: SubjectMap

  constructor(name: string) {
    this.name = name

    this.subjectMap = new WeakMap()
  }

  subscribe<T extends Subject>(subject: T, cb: SubscribeCallback<T>) {
    if (this.subjectMap.has(subject)) {
      this.subjectMap.get(subject).push(cb)
    }
    else {
      subject.attach(this)
      this.subjectMap.set(subject, [cb])
    }

    return () => {
      this.unsubscribe(subject, cb)
    }
  }

  unsubscribe<T extends Subject>(subject: T, cb: SubscribeCallback<T>) {
    if (this.subjectMap.has(subject)) {
      const cbs = this.subjectMap.get(subject)
      const index = cbs.indexOf(cb)

      if (index > -1) {
        cbs.splice(index, 1)
      }

      if (cbs.length === 0) {
        subject.detach(this)
      }
    }
  }

  recive(subject: Subject) {
    const subjectCallbacks = this.subjectMap.get(subject)

    for(let i=0; i<subjectCallbacks.length; i++) {
      subjectCallbacks[i](subject)
    }
  }
}

class Subject {
  name: string

  state: unknown

  observers: Observer[]

  constructor(name: string, state: unknown) {
    this.name = name

    this.state = state;

    this.observers = [];
  }

  getState() {
    return this.state;
  }

  setState(state) {
    this.state = state;
    this.notify();
  }

  attach(observer) {
    this.observers.push(observer);
  }
  
  detach(observer) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }
  
  notify() {
    for(const observer of this.observers) {
      observer.recive(this);
    }
  }
}


let subject1 = new Subject('subject1', {
  a: 1
});

let subject2 = new Subject('subject2', {
  a: 2
});

let observer1 = new Observer('observer1');
let observer2 = new Observer('observer2');

observer1.subscribe(subject1, (subject) => {
  console.log(`observer1 recive from ${subject.name}: ${JSON.stringify(subject.state)}`)
})

 observer1.subscribe(subject2, (subject) => {
  console.log(`observer1 recive from ${subject.name}: ${JSON.stringify(subject.state)}`)
})

observer2.subscribe(subject1, (subject) => {
  console.log(`observer2 recive from ${subject.name}: ${JSON.stringify(subject.state)}`)
})

observer2.subscribe(subject2, (subject) => {
  console.log(`observer2 recive from ${subject.name}: ${JSON.stringify(subject.state)}`)
})


subject1.setState({a: 11})
subject1.setState({a: 22})