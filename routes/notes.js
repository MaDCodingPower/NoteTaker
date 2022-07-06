const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");  
const notesData = require("../db/db.json");
const notesFilePath = path.join(__dirname, "../db/db.json");

router.get('/', (req, res) => {
    console.info(`${req.method} request received, retrieving current data.`);
    res.sendFile(notesFilePath);
});


router.post('/', (req, res) => {
    console.info(`${req.method} request received, updating current data.`);
    req.body.id = uuidv4();
    const newNote = req.body;
    if (req.body.title && req.body.text && req.body.id) {
        fs.readFile(notesFilePath, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(400).json(err);
            }
            try {
                const parsedData = JSON.parse(data);
                parsedData.push(newNote);
                fs.writeFileSync(notesFilePath, JSON.stringify(parsedData));
                res.status(201);
                res.end();
            } catch (err) {
                console.log(err);
                res.status(400).json(err);
            }
        });
    }
    }
)

router.delete('/:id', (req, res) =>{
    let deleteNoteId = req.params.id;
    fs.readFile(notesFilePath, (err, data) => {
        try {
            const parsedData = JSON.parse(data);
            // Is there a data structure that you could use, that prevents you 
            // from needing to loop through an array to find if an id exists?
            for (let i=0; i<parsedData.length; i++)
            {
                
                if (parsedData[i].id === deleteNoteId){
                    parsedData.splice(i-1,1);
                    fs.writeFileSync(notesFilePath, JSON.stringify(parsedData));
                }
            }
        } catch (err) {
            res.status(400).json(err);
        }

        });
    })

module.exports = router;