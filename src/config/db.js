import mongoose from "mongoose";


const connection_db = async () => {
  return await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connection successfully"))
    .catch((err) => console.log("Error connaction: ", err))
};

export default connection_db;