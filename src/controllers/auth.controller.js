import Admin from "../models/admin.js";
import Instructor from "../models/Instructor.js";
import Student from "../models/Student.js";
import bcryptjs from "bcryptjs";
import CustomError from "../utils/customError.js";
import { genrateAccessToken } from "../utils/genrateTokens.js";

export const login = async (req, res, next) => {
  const { email, password, role } = req.body;

  let user;

  switch (role) {
    case "Admin":
      user = await Admin.findOne({ email });
      break;
    case "Instructor":
      user = await Instructor.findOne({ email });
      break;
    case "Student":
      user = await Student.findOne({ email });
      break;

    default:
      return next(new CustomError("Role not found", 400));
  }

  if (!user) return next(new CustomError("Email or password is wrong", 400));

  const isMatch = await bcryptjs.compare(password, user.password);

  if (!isMatch) return next(new CustomError("Email or password is wrong", 400));

  const accessToken = genrateAccessToken({ id: user._id, role: user.role });

  res.status(200).json({ success: true, message: "Login success", accessToken })
}
// export const login = async (req, res, next) => {
//   const { email, password, name } = req.body;

//   await User.create({
//     email, password, name, role: "Admin"
//   })

//   res.status(200).json({ success: true, message: "Login success" })
// }