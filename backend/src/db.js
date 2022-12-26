import mongoose from "mongoose";
import dotenv from "dotenv-defaults";
import User from "./models/ScoreCard";
dotenv.config();
console.log(process.env.MONGO_URL);
export default {
  connect: () => {
    mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((res) => console.log("mongo db connection created"));
  },
};
