import mongoose from "mongoose"
export const ConnectDb=(url)=>{
    return mongoose.connect(url)
}
