import Instructor from "../models/Instructor.js";
import Student from "../models/Student.js";
import CustomError from "../utils/customError.js";

export const addInstructor = async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await Instructor.findOne({ email });
  if (user) return next(new CustomError("Instructor already exists", 409));

  await Instructor.create({
    name, email, password
  });
  res.status(201).json({ success: true, message: "Create Instructor" });
}

export const addStudent = async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await Student.findOne({ email });
  if (user) return next(new CustomError("Student already exists", 409));

  await Student.create({
    name, email, password, role: "Student"
  });
  res.status(201).json({ success: true, message: "Create Student" });
};

export const removeInstructor = async (req, res, next) => {
  const { instructorId } = req.params;

  const user = await Instructor.findById(instructorId);
  if (!user) return next(new CustomError("Instructor not found", 404));

  await user.deleteOne();
  res.status(201).json({ success: true, message: "Delete Instructor" });
}

export const removeStudent = async (req, res, next) => {
  const { studentId } = req.params;

  const user = await Student.findById(studentId);
  if (!user) return next(new CustomError("Student not found", 404));

  await user.deleteOne();
  res.status(201).json({ success: true, message: "Delete Student" });
};