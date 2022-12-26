import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv-defaults";
import routes from "./routes";
import db from "./db";
import bodyParser from "body-parser";
import path from "path";
dotenv.config();
const port = process.env.PORT || 4000;
console.log(process.env.MONGO_URL);
db.connect();
const app = express();
app.use(cors());

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../frontend", "build")));
}
app.use(bodyParser.json());
app.use("/api", routes);
app.listen(port, () => console.log("listening"));
// export default {
//   connect: () => {
//     mongoose
//       .connect(process.env.MONGO_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       })
//       .then((res) => console.log("mongo db connection created"));
//   },
// };
