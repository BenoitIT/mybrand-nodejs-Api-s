export const handleBadRequest=(req,res)=>{
    return res.status(400).json({message:"bad request made"});
}
export const handleNotefound=(req,res)=>{
    return res.status(404).json({message:"request not found"});
}
export const handleInternalServerError=(req,res)=>{
    return res.status(500).json({message:"internal server error"});
}
