export default class Tag {
  readonly id: number;
  readonly name: string = "";

  constructor(id: number, name: string) {
    this.id = id;
    if (name != "" && name != this.name) {
      this.name = name;
    }
  }
}
