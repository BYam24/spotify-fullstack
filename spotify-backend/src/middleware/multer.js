import multer from "multer";

//extract song data, img, and mp3 date from front end

const storage = multer.diskStorage({
  filename: function(request, file, callback){
    callback(null, file.originalname)
  }
})

const upload = multer({storage})

export default upload;

//extract file from api request and provide its path