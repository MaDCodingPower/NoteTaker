const router = require("express").Router(); 
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");  
const notesData = require("../db/db.json");



router.get('/notes', (res, req) => {
    console.info(`${req.method} request received, retrieving current data.`);
    res.sendFile(path.join(__dirname, "../db/db.json"))
})

router.post('/notes', (req, res) => {
    const { title, text } = req.body;


    if (title && text){
        const newNote = {
            title,
            text,
            id: uuidv4()
        }
    }
})