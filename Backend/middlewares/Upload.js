const multer = require('multer');

//type of images 
const FILE_TYPE_MAP = {
    'image/png':'png',
    'image/jpg':'jpg',
    'image/jpeg':'jpeg'
}

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        //check image type valid or not 
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadErr = new Error("Invalid Image Type");
        if(isValid) uploadErr = null
        cb(uploadErr,'public/uploads')
    },
    filename:(req , file , cb) => {
        const fileName = file.originalname.replace(" ","-");
        const extention = FILE_TYPE_MAP[file.mimetype];
        cb(null,`${fileName}-${Date.now()}.${extention}`)
    }
});

const uploadImages = multer({storage});

module.exports = uploadImages;