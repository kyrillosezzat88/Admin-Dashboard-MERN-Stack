const cloudinary = require('./ImageUpload');
// upload images to cloudinary
exports.cloudinaryImageUploadMethod = async file => {
    return new Promise(resolve => {
        cloudinary.uploader.upload( file , (err, res) => {
          if (err) return res.status(500).send("upload image error")
            resolve( res.secure_url) 
          }
        ) 
    })
  }
