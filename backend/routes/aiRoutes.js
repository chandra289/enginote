const express = require("express")
const axios = require("axios")

const router = express.Router()

router.post("/chat",async(req,res)=>{

 try{

  const response = await axios.post(
   "http://localhost:8000/chat",
   req.body
  )

  res.json(response.data)

 }catch(err){

  res.status(500).json({error:"AI error"})

 }

})

module.exports = router






