import { MongoClient } from "mongodb";
import { Task } from "../view/generic/TaskListView";
import TaskList from "../model/collections/TaskList";

export default class DatabaseManager {
  private static client: MongoClient | null = null;

  static async connect() {
    const uri = process.env.MONGODB_URL;
    let client = new MongoClient(uri, { useUnifiedTopology: true });
    DatabaseManager.client = client;
    return client.connect();
  }

  static async listDatabases(client: MongoClient) {
    let databasesList = await client
      .db()
      .admin()
      .listDatabases();

    return databasesList.databases.map(db => db.name);
  }

  static async addList(
    listId: number,
    name: string,
    tags: number[] | undefined,
    dateCreated: number
  ) {
    DatabaseManager.connectIfNot();
    let response = await DatabaseManager.client
      .db("TaskManager")
      .collection(listId.toString())
      .insertOne({
        id: -1,
        name: "info",
        listName: name,
        dateCreated: dateCreated,
        tags: tags
      });
    return response;
  }

  static async addTask(name: string, content: string, listId: number) {
    DatabaseManager.connectIfNot();
    let response = await DatabaseManager.client
      .db("TaskManager")
      .collection(listId.toString())
      .insertOne({
        name: name,
        content: content
      });
    return response;
  }

  static async getData() {
    await DatabaseManager.connectIfNot();
    let data: [
      {
        name: string;
        tags: number[];
        dateCreated: Date;
        tasks: Task[];
      }
    ];

    let db = DatabaseManager.client.db("TaskManager");
    let collections = await db.listCollections().toArray();

    data = collections.map(async (list, id) => {
      let collection = db.collection(list.name);

      let tasks = await collection.find({ id: { $ne: -1 } }).toArray();

      tasks = tasks.map(task => {
        return new Task(task);
      });

      let info = await collection.find({ id: -1 }).toArray();
      info = info[0];

      return new TaskList(Object.assign(info, { tasks: tasks }));
    });

    return Promise.all(data);
  }

  static async connectIfNot() {
    if (DatabaseManager.client == null) {
      return DatabaseManager.connect();
    }
  }
}

// exports.connect = function(req, res) {
//   connect();
// };

// exports.listdb = async function(req, res) {
//   try {
//     if (clientGlobal === null) {
//       connect();
//     }
//     res.send(JSON.stringify(await listDatabases(clientGlobal)));
//   } catch (e) {
//     res.send(500, e.toString());
//   }
// };

// exports.createList = async function(req, res) {
//   try {
//     if (clientGlobal === null) {
//       connect();
//     }
//     let data = JSON.parse(req.body);
//     addList(clientGlobal, data.name, data.tags, data.dateCreated);
//   } catch (e) {
//     res.send(500, e.toString());
//   }
// };
