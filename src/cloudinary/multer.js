import multer from "multer";
    // destination:(req,file,cb)=>{
    //     cb(null,'/uploads')
    // },
    // filename:(req,file,cb)=>{
    //     cb(null,Date.now().toString()+file.originalname)
    // }
    export default multer({
        storage: multer.diskStorage({}),
        fileFilter: (req, file, cb) => {
          cb(null, true);
        },
      });
