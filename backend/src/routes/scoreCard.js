import { Router } from "express";
import mongoose from "mongoose";
import ScoreCard from "../models/ScoreCard";
let check = false;
const saveUser = async (name, subject, score) => {
  const existing = await ScoreCard.findOne({
    $and: [{ name: name }, { subject: subject }],
  });
  //   console.log(existing);
  if (existing) {
    // throw new Error(`data ${name} exists!!`);

    await ScoreCard.updateOne(
      { name: name, subject: subject },
      { score: score }
    );
    return "Updating";
  }
  try {
    const newUser = new ScoreCard({ name, subject, score });
    console.log("Created user", newUser);
    newUser.save();
    return "Adding";
  } catch (e) {
    throw new Error("User creation error: " + e);
  }
};
const deleteDB = async () => {
  try {
    await ScoreCard.deleteMany({});
    console.log("Database deleted");
  } catch (e) {
    throw new Error("Database deletion failed");
  }
};

const queryHandle = async (type, queryString) => {
  try {
    if (type === "name") {
      const existing = await ScoreCard.find({ name: queryString });
      console.log(existing);
      if (existing.length === 0) {
        return false;
      }
      return existing;
    } else if (type === "subject") {
      const existing = await ScoreCard.find({ subject: queryString });
      console.log(existing);
      if (existing.length === 0) {
        return false;
      }
      return existing;
    }
  } catch (e) {
    throw new Error("queryHandle failed");
  }
};

const db = mongoose.connection;
// db.on("error", (err) => console.log(err));
// db.once("open", async () => {
//   await deleteDB();
//   await saveUser("Ric", "LA", 100);
//   await saveUser("Ricky", "web", 100);
//   await saveUser("IU", "web", 90);
// });

const router = Router();
router.delete("/cards", (req, res) => {
  //   console.log("in delete");
  deleteDB();
  res.send({ message: "Database cleared" });
});
router.post("/card", async (req, res) => {
  //   console.log("in card");
  const tmp = await saveUser(req.body.name, req.body.subject, req.body.score);

  res.send({
    message: `${tmp} (${req.body.name}, ${req.body.subject}, ${req.body.score})`,
    card: true,
  });
});

router.get("/cards", async (req, res) => {
  const type = req.query.type;
  const queryString = req.query.queryString;
  const output = await queryHandle(type, queryString);

  if (!output) {
    res.json({
      messages: null,
      message: `${type} (${queryString}) not found.`,
    });
  } else {
    let ms = [];
    for (let i = 0; i < output.length; i++) {
      ms[
        i
      ] = `Found card with ${type}: ${output[i].name}, ${output[i].subject}, ${output[i].score}`;
    }
    console.log(output);
    res.send({
      message: false,
      messages: ms,
    });
  }
});

export default router;
