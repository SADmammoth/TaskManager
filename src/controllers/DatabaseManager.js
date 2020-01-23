import { MongoClient } from "mongodb";

let clientGlobal = null;

async function main() {
  const uri = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(uri);
  await client.connect();
  clientGlobal = client;
}

async function listDatabases(client) {
  let databasesList = await client
    .db()
    .admin()
    .listDatabases();

  return databasesList.databases.map(db => db.name);
}

async function addList(client, name, tags, dateCreated) {
  await client
    .db("TaskManager")
    .createCollection(name)
    .insertOne({ name: "info", dateCreated: dateCreated, tags: tags });
}

exports.connect = function(req, res) {
  main();
};

exports.listdb = async function(req, res) {
  try {
    if (clientGlobal === null) {
      main();
    }
    res.send(JSON.stringify(await listDatabases(clientGlobal)));
  } catch (e) {
    res.send(500, e.toString());
  }
};

exports.createList = async function(req, res) {
  try {
    if (clientGlobal === null) {
      main();
    }
    let data = JSON.parse(req.body);
    addList(clientGlobal, data.name, data.tags, data.dateCreated);
  } catch (e) {
    res.send(500, e.toString());
  }
};
