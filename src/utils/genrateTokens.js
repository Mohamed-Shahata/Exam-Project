import jwt from "jsonwebtoken";

export const genrateAccessToken = ({ id, role }) => {
  return jwt.sign({ id, role }, process.env.SECRET_ACCESS_TOKEN, { expiresIn: "1h" });
}