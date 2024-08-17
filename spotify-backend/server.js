import express from "express";
import cors from "cors";
import "dotenv/config";
import songRouter from "./src/routes/songRoute.js";
import connectDB from "./src/config/mongodb.js";
import connectCloudinary from "./src/config/cloudinary.js";
import albumRouter from "./src/routes/albumRoute.js";

//app config
const app = express();
const port = process.env.port || 4000; //port from env variable or from 4000 if not avail
connectDB();
connectCloudinary();

//middlewares
app.use(express.json());
app.use(cors());

//initializing routes
app.use("/api/song", songRouter); //suppose we have execute the function addSong in songController.js, then we will call api/song/add because in songRoute.js we defined the path add
app.use("/api/album", albumRouter);

app.get("/", (request, response) => response.send("API Working"));

app.listen(port, () => console.log(`Server Started on Port ${port}`));
