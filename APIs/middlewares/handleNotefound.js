const handleBadRequest=(req,res)=>{
    return res.status(400).json({message:"bad request made"});
}
const handleNotefound=(req,res)=>{
    return res.status(404).json({message:"request not found"});
}
const handleInternalServerError=(req,res)=>{
    return res.status(500).json({message:"internal server error"});
}
module.exports={handleBadRequest,handleNotefound,handleInternalServerError}