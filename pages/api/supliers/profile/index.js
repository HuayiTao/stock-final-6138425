import dbConnect from "@/lib/dbConnect";
import Proflie from "@/models/Proflie";

export default async function handler(req, res) {
  await dbConnect();
  console.log("req.method: ", req.method);

  if (req.method === "GET") {
    const docs = await Proflie.find();
    res.status(200).json(docs);
  } else if (req.method === "POST") {
    // console.log(typeof(req.body))
    console.log("POST", req.body);
    const doc = await Proflie.create(req.body);
    res.status(201).json(doc);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}