// db.ts
import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI as string)
    .then((response) => {
      console.log("mongodb connection successful");
    })
    .catch((err) => console.error(err));
};
