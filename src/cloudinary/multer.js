import multer from "multer"
const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now().toString()+file.originalname)
    }
})
export const upload=multer({storage:fileStorage})