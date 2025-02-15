import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

const adminSchema = new Schema({
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
    type: String, default: "Admin"
  }
}, { timestamps: true });

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

const Admin = model("Admin", adminSchema);
export default Admin;