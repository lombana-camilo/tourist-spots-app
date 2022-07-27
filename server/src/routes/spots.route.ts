import { Router } from "express";

const spots = Router()

spots.get("/",(req,res)=>{
   res.send("Spots page")
})

export default spots
