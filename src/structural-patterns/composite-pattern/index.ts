// 组合模式
// 定义: 是用小的子对象来构建更大的 对象，而这些小的子对象本身也许是由更小 的“孙对象”构成的。
// 核心: 可以用树形结构来表示这种“部分- 整体”的层次结构。调用组合对象 的execute方法，程序会递归调用组合对象 下面的叶对象的execute方法
// 但要注意的是，组合模式不是父子关系，它是一种HAS-A（聚合）的关系，将请求委托给 它所包含的所有叶对象。基于这种委托，就需要保证组合对象和叶对象拥有相同的 接口也要保证用一致的方式对待 列表中的每个叶对象，即叶对象属于同一类，不需要过多特殊的额外操作

// 优点: 可以方便地构造一棵树来表示对象的部分-整体 结构。在树的构造最终 完成之后，只需要通过请求树的最顶层对 象，便能对整棵树做统一一致的操作。

// 缺点: 创建出来的对象长得都差不多，可能会使代码不好理解，创建太多的对象对性能也会有一些影响

// 整体和单个节点的操作时一致的
// 整体和单个节点的数据结构也保持一致

// 文件夹 组合对象
{
  interface FileOrFolder {
    name: string;
    parent: Folder | null;
    scan(): void;
  }

  class Folder implements FileOrFolder {
    name: string;
    parent: Folder | null;
    files: FileOrFolder[] = [];

    constructor(name: string) {
      this.name = name;
      this.parent = null;
    }

    add(...files: FileOrFolder[]) {
      for (let i = 0; i<files.length; i++) {
        const file = files[i]
        file.parent = this;
        this.files.push(file);
      }
    }

    scan(): void {
      for (let i = 0; i < this.files.length; i++) {
        this.files[i].scan();
      }
    }

    remove(file?: FileOrFolder): void {
      if (typeof file === 'undefined') {
        this.files = [];
        return;
      }

      for (let i = 0; i < this.files.length; i++) {
        if (this.files[i] === file) {
          this.files.splice(i, 1);
        }
      }
    }
  }

  // 文件 叶对象
  class File implements FileOrFolder {
    name: string;
    parent: Folder | null;

    constructor(name: string) {
      this.name = name;
      this.parent = null;
    }

    add() {
      console.log('文件里面不能添加文件');
    }

    scan(): void {
      const name = [this.name];
      let parent = this.parent;

      while (parent) {
        name.unshift(parent.name);
        parent = parent.parent;
      }

      console.log(name.join('/'));
    }
  }

  const web = new Folder('Web');
  const fe = new Folder('前端');
  const css = new Folder('CSS');
  const js = new Folder('js');
  const rd = new Folder('后端');

  web.add(fe, rd)

  const file1 = new File('HTML权威指南.pdf');
  const file2 = new File('CSS权威指南.pdf');
  const file3 = new File('JavaScript权威指南.pdf');
  const file4 = new File('MySQL基础.pdf');
  const file5 = new File('Web安全.pdf');
  const file6 = new File('Linux菜鸟.pdf');

  css.add(file2);
  fe.add(file1, file3, css, js);
  rd.add(file4, file5);
  
  web.add(file6);

  rd.remove(file4);

  // 扫描
  web.scan();
}

// 虚拟DOM（但数据类型比较简单）