export default class Task {
  private name: string = "";
  private content: string = "";

  constructor(name: string, content: string) {
    this.edit(name, content);
  }
  edit(name: string, content: string): Boolean {
    let flag = false;
    if (name !== this.name) {
      this.name = name;
      flag = true;
    }

    if (content !== this.content) {
      this.content = content;
      flag = true;
    }
    return flag;
  }

  toString() {
    return `Name: ${this.name}; Content: ${this.content}`;
  }
}
