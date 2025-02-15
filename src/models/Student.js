import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

const studentSchema = new Schema({
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
    type: String, default: "Student"
  }
}, { timestamps: true });

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

const Student = model("Student", studentSchema);
export default Student;