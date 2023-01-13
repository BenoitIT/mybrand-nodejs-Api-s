const mongoose=require('mongoose')
const ConnectDb=(url)=>{
    return mongoose.connect(url)
}
module.exports={ConnectDb}
