const express = require('express')
const app= express()
const fetch=require("node-fetch")
const cors = require('cors')

app.get(cors())

app.get("/", async (req,res) =>{
    const response = await fetch(`https://www.instagram.com/web/search/topsearch/?query=$davidjingo_`)
    res.json(await response.json())
})

app.listen(3000, () =>{
    console.log("Listening on port 3000")
})