import { v2 as cloudinary } from "cloudinary";
import albumModel from "../models/albumModel.js";

const addAlbum = async (request, response) => {
  try {
    const name = request.body.name;
    const desc = request.body.desc;
    const bgColour = request.body.bgColour;

    const imageFile = request.file;

    //upload to cloudinary storage
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const albumData = {
      name,
      desc,
      bgColour,
      image: imageUpload.secure_url,
    };

    const album = albumModel(albumData);

    await album.save();
    response.json({ success: true, message: "Album added" });
  } catch {
    response.json({ success: false });
  }
};

const listAlbum = async (request, response) => {
  try {
    const allAlbums = await albumModel.find({}); //we do not filter by keeping {} empty so that we retrieve all
    response.json({ success: true, albums: allAlbums });
  } catch (error) {
    response.json({ success: false });
  }
};

const removeAlbum = async (req, res) => {
  try {
    await albumModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Album removed" });
  } catch (error) {
    res.json({ success: false });
  }
};

export { addAlbum, listAlbum, removeAlbum };
