import mongoose from "mongoose";
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  //   id: Number, // Number is shorthand for {type: Number}
  name: String,
  subject: String,
  score: Number,
});
const ScoreCard = mongoose.model("User", UserSchema);
export default ScoreCard;
