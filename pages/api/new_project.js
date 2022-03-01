import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vql6v.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    );
    const db = client.db();
    const projectsCollection = db.collection("projects");
    await projectsCollection.insertOne(req.body);

    client.close();

    res.status(201).send({ Message: "New project inserted" });
  }
};

export default handler;