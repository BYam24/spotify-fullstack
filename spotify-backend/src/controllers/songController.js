import { v2 as cloudinary } from "cloudinary";
import songModel from "../models/songModel.js";
import { request } from "express";

// want to post http://localhost:4000/api/song
//creating addSong API function
const addSong = async (request, response) => {
  try {
    const name = request.body.name;
    const desc = request.body.desc;
    const album = request.body.album;

    const audioFile = request.files.audio[0];
    const imageFile = request.files.image[0];
    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "video",
    });
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    // console.log(name, desc, album, audioUpload, imageUpload)

    // prints out... where we can use the urls

    // testing name testing description testing album {
    //   asset_id: '5fa7b60e56b4115097fcfedf33ed0ad6',
    //   public_id: 'dhqzfvramw1seiz8dwcy',
    //   version: 1721505022,
    //   version_id: 'bf2085c934b76bc0a3e92ac436f4f24d',
    //   signature: '8f046224d953ea74175845b05b3e293338d64109',
    //   width: 0,
    //   height: 0,
    //   format: 'mp3',
    //   resource_type: 'video',
    //   created_at: '2024-07-20T19:50:22Z',
    //   tags: [],
    //   pages: 0,
    //   bytes: 3329599,
    //   type: 'upload',
    //   etag: '26567a0178b6b1bf5ced6353f39aedfb',
    //   placeholder: false,
    //   url: 'http://res.cloudinary.com/dp8sjxntj/video/upload/v1721505022/dhqzfvramw1seiz8dwcy.mp3',
    //   secure_url: 'https://res.cloudinary.com/dp8sjxntj/video/upload/v1721505022/dhqzfvramw1seiz8dwcy.mp3',
    //   playback_url: 'https://res.cloudinary.com/dp8sjxntj/video/upload/sp_auto/v1721505022/dhqzfvramw1seiz8dwcy.m3u8',
    //   asset_folder: '',
    //   display_name: 'dhqzfvramw1seiz8dwcy',
    //   audio: {
    //     codec: 'mp3',
    //     bit_rate: '128000',
    //     frequency: 44100,
    //     channels: 2,
    //     channel_layout: 'stereo'
    //   },
    //   video: {},
    //   is_audio: true,
    //   bit_rate: 128021,
    //   duration: 208.065306,
    //   original_filename: 'song1',
    //   api_key: '121976887463214'
    // } {
    //   asset_id: '8a56bce0091d63d46e099374d39b5fef',
    //   public_id: 'kbgm8rzsocafra5v4fxm',
    //   version: 1721505023,
    //   version_id: '179ef7356ebcae42c12692007ec075f7',
    //   signature: 'd1e1d45e21e1814f5fcd855ad1cf5b177b0fd942',
    //   width: 300,
    //   height: 300,
    //   format: 'jpg',
    //   resource_type: 'image',
    //   created_at: '2024-07-20T19:50:23Z',
    //   tags: [],
    //   bytes: 17034,
    //   type: 'upload',
    //   etag: '4417a4763a1fd1068a94097a390b7e41',
    //   placeholder: false,
    //   url: 'http://res.cloudinary.com/dp8sjxntj/image/upload/v1721505023/kbgm8rzsocafra5v4fxm.jpg',
    //   secure_url: 'https://res.cloudinary.com/dp8sjxntj/image/upload/v1721505023/kbgm8rzsocafra5v4fxm.jpg',
    //   asset_folder: '',
    //   display_name: 'kbgm8rzsocafra5v4fxm',
    //   original_filename: 'img13',
    //   api_key: '121976887463214'
    // }
    const duration = `${Math.floor(audioUpload.duration / 60)}: ${Math.floor(
      audioUpload.duration % 60
    )}`;

    const songData = {
      name,
      desc,
      album,
      image: imageUpload.secure_url,
      file: audioUpload.secure_url,
      duration,
    };

    //song will be saved into MongoDB, navigate to atlas > Data Service > Collections > Spotify
    //songModel is a mongoose object
    const song = songModel(songData);
    await song.save();

    //this is the response
    response.json({ success: true, message: "Song Added" });
  } catch (error) {
    response.json({ success: false });
  }
};

//want to get http://localhost:4000/api/song/list
//Creating listSong API function
const listSong = async (request, response) => {
  try {
    const allSongs = await songModel.find({});
    response.json({ success: true, songs: allSongs });
  } catch {
    response.json({ success: false });
  }
};

const removeSong = async (request, response) => {
  try {
    await songModel.findByIdAndDelete(request.body.id);
    response.json({ success: true, message: "Song removed" });
  } catch {
    response.json({ success: false });
  }
};

export { addSong, listSong, removeSong };
