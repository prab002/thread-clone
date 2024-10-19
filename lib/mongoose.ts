import mongoose from "mongoose";

let isConnected = false; // track the connection status

export const connectToDb = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL)
    throw new Error("MONGODB_URL is not defined 🧨");

  if (isConnected) return console.log("data is connected as you wish 💻✨");

  try {
    const db = await mongoose.connect(process.env.MONGODB_URL);
    
    if (db) {   
      isConnected = true;
      console.log("=> using new database connection");
    }
  } catch (error) {
    console.log("=> error connecting to database", error);
  }
};
