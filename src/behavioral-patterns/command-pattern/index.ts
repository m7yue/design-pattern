// 命令模式
// 三个角色： 命令发起者（CommandTriger），命令接收者（CommandReciver），命令执行者(ConmmandInvoker 及 command 自身)

class Command<T extends (...args:any[]) => any = (...args:any[]) => any> {
  name: string

  handler: T

  constructor(name: string, handler: T) {
    this.name = name

    this.handler = handler;
  }

  execute(...args: unknown[]) {
    this.handler(...args);
  }
}

class CommandTriger {
  reciver: CommandReciver

  constructor(recevier) {
    this.reciver = recevier;
  }
  trige(type) {
    this.reciver.receive(type);
  }
}

class CommandReciver {
  commandMap: Map<string, Command>

  constructor() {
    // 命令池
    this.commandMap = new Map();
  }

  receive(type) {
    this.commandMap.get(type)?.execute();
  }

  add(command) {
    this.commandMap.set(command.name, command);
  }
}


const command = new Command('cmd', () => {
  console.log('cmd handler')
})

const reciver = new CommandReciver()
reciver.add(command)

const triger = new CommandTriger(reciver)
triger.trige(command.name)