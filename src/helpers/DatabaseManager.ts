import { MongoClient } from "mongodb";
export default class DatabaseManager {
  private static client: MongoClient | null = null;

  static async connect() {
    const uri = process.env.MONGODB_URL;
    const client = new MongoClient(uri);
    await client.connect();
    this.client = client;
  }

  static async listDatabases(client: MongoClient) {
    let databasesList = await client
      .db()
      .admin()
      .listDatabases();

    return databasesList.databases.map(db => db.name);
  }

  static async addList(
    name: string,
    tags: any[] | undefined,
    dateCreated: Date
  ) {
    this.connectIfNot();
    let response = await this.client
      .db("TaskManager")
      .createCollection(name)
      .insertOne({
        id: -1,
        name: "info",
        dateCreated: dateCreated,
        tags: tags
      });
    return response;
  }

  static async getData() {
    let data: [
      {
        listId: number;
        name: string;
        dateCreated: Date;
        tasks: [{ name: string; content: string }];
      }
    ];

    let collections = await this.client.db("TaskManager").getCollectionInfos();
    data = collections.map(async (list, id) => {
      let collection = await this.client
        .db("TaskManager")
        .getCollection(list.name);
      let tasks = collection.find({ id: { $gt: -1 } }).map(task => {
        return { name: task.name, content: task.content };
      });
      let info = collection.find({ id: -1 });
      return {
        name: list,
        tags: info.tags,
        dateCreated: info.dateCreated,
        tasks: tasks
      };
    });
    return data;
  }

  static async connectIfNot() {
    if (this.client == null) {
      this.connect();
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
