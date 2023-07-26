const multer = require('multer');

const DiskStorage = multer.diskStorage({
    destination:(req, file , cb) =>{
       return cb(null , './uploads');
    },
    filename:(req, file , cb) =>{
        return cb(null , `${Date.now()}-${file.originalname}`)
    }
})

module.exports = DiskStorage;