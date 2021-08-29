const multer=require('multer')
const sharp = require('sharp');

module.exports.uploadImage = () =>{
    
    const imageStorage = multer.diskStorage({
        destination:(req,file,cb)=>{cb(null, 'images/doctors');},
        filename:(req, file, cb) =>{cb(null, file.originalname)}
    });

    const imageFileFilter=(req, file,cb)=>{
        if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
            return cb(new Error('You can upload only image files'), false);
        }
        cb(null, true)
    }
    return multer({storage:imageStorage, fileFilter:imageFileFilter});
}