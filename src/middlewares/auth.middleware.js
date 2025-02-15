import jwt from "jsonwebtoken";
import CustomError from "../utils/customError.js";

export const auth = (req, res, next) => {
  let token = req.headers.authorization;
  try {
    if (!token) return next(new CustomError("Access denied. No token provieded.", 401));

    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
    req.user = decoded;
    next();
  } catch (error) {
    next(new CustomError("Invalid or expired token. Please log in again.", 403));
  }
};

export const authorizedRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new CustomError("Unauthorized action", 403))
    next();
  }
};