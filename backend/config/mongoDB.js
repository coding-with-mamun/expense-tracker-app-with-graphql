import mongoose from "mongoose";

// create connection
const mongoDBConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connection successful`.bgGreen);
  } catch (error) {
    console.log(`${error.message}`.bgRed);
    process.exit(1);
  }
};

// export connection
export default mongoDBConnection;
