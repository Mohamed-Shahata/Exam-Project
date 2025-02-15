import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

const instructorSchema = new Schema({
  name: {
    type: String, required: true
  },
  email: {
    type: String, unqiue: true, required: true
  },
  password: {
    type: String, required: true
  },
  role: {
    type: String, default: "Instructor"
  }
}, { timestamps: true });

instructorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

const Instructor = model("Instructor", instructorSchema);
export default Instructor;