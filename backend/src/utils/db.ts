import mongoose from "mongoose";
import { Env } from "./env";
let conn: unknown = null;

export default async function connectToDB() {
  try {
    if (conn == null) {
      conn = mongoose
        .connect(Env.MONGO_URI, {
          // serverSelectionTimeoutMS: 5000,
        })
        .then(() => mongoose);
      // `await`ing connection after assigning to the `conn` variable
      // to avoid multiple function calls creating new connections
      await conn;

      // Listen for connection events
      mongoose.connection.on("connected", function () {
        console.log("Mongoose connected to MongoDB");
      });

      mongoose.connection.on("error", function (err) {
        console.log("Mongoose connection error: " + err);
      });

      mongoose.connection.on("disconnected", function () {
        console.log("Mongoose disconnected from MongoDB");
      });
    }
    return conn;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
