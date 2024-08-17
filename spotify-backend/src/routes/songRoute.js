import {
  addSong,
  listSong,
  removeSong,
} from "../controllers/songController.js";

import express from "express";
import upload from "../middleware/multer.js";

const songRouter = express.Router();

songRouter.post(
  "/add",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  addSong
); //audio, image are field name, check if we send any file using the fields then save the object in request.file object| Using that object we can get song audio

songRouter.get("/list", listSong);

songRouter.post("/remove", removeSong);

export default songRouter;
