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

    const id = uuidv4();
    const newNote = req.body;

    if (newNote.title && newNote.text) {
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
});

router.delete('/:id', (req, res) =>{
    let deleteNoteId = req.params.id;
    
    fs.readFile(notesFilePath, (err, data) => {
        try {
            const parsedData = JSON.parse(data);
            for (let i=0; i<parsedData.length; i++) {
                if (parsedData[i].id === deleteNoteId){
                    parsedData.splice(i-1,1);
                    fs.writeFileSync(notesFilePath, JSON.stringify(parsedData));                  
                }
            }
            res.status(204);
            res.end();
        } catch (err) {
            res.status(400).json(err);
        }

    });
})

module.exports = router;