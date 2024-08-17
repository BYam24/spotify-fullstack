//config mongodb database
import mongoose, { mongo } from "mongoose";

const connectDB = async () =>{
  mongoose.connection.on('connected', () => { //whenever connected run
    console.log("connection established")
  })
  await mongoose.connect(`${process.env.MONGODB_URI}/spotify`); //spotify is the project name

}

export default connectDB;