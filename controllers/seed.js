import mango from "../models/mango.js";

export const createData=async (req,res)=>{
   try{
    const {id,name,age,city}=req.body;
    const data=await mango.create({
        id,
        name,
        age,
        city,
    });
    res.status(201).json({
        message:"Success !",
        data,
    });

   }catch(error){
    return res.status(500).json({
        message:error.message,
    });
   }
}