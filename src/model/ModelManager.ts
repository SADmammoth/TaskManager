import TaskList from "./collections/TaskList";
import DatabaseManager from "../helpers/DatabaseManager";
import Task from "./entities/Task";

export default class ModelManager {
  static lists: TaskList[] = [];

  static init() {
    ModelManager.createList({ name: "Inbox" });
  }

  static createList(
    data: {
      name: string;
      tags?: number[];
      tasks?: Task[] | [{ name: string; content: string }];
    },
    sendToDB = true
  ) {
    let { name, tags, tasks } = data;
    let task_copy: Task[];
    if (tasks && tasks.length && tasks[0].name) {
      task_copy = (tasks as { name: string; content: string }[]).map(data =>
        ModelManager.createTask(data)
      );
    } else {
      task_copy = tasks as Task[];
    }
    let list = new TaskList(name, tags, task_copy, sendToDB);
    ModelManager.lists.push(list);
    return list;
  }

  static createTask(data: { name: string; content: string }) {
    let { name, content } = data;
    return new Task(name, content);
  }

  static addToList(listId: number, ...tasks: Task[]) {
    ModelManager.lists[listId].addTask(tasks);
  }

  static async loadDataFromDB() {
    let data = await DatabaseManager.getData();
    data.forEach(list => ModelManager.createList(list, false));
  }

  static getListJSON(listId: number) {
    return ModelManager.lists[listId].getJSONTasks();
  }
}
