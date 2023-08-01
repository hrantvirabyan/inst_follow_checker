const express = require('express')
const app= express()
const fetch=require("node-fetch")
const cors = require('cors')

app.get(cors())

app.get("/", async (req,res) =>{
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1")
    res.json(await response.json())
})

app.listen(4000, () =>{
    console.log("Listening on port 3000")
})