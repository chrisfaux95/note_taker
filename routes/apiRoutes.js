const fs = require("fs");

var apiRoutes = (app) => {
    app.get("/api/notes", (req, res) => {
        // RETURN JSON OF SAVED NOTES
        // console.log("GET NOTES")
        let notes = loadDB()
        // console.log(notes)
        res.json(notes)

    })

    app.post("/api/notes", (req, res) => {
        // ADD NEW NOTE TO NOTES
        // console.log("ADD NEW NOTE")
        let notes = loadDB();
        let currentNote = req.body;
        let id = 0;
        while(!checkID(notes,id)){
            id = Math.floor(Math.random()*100000);
        }
        currentNote.id = id;
        notes.push(currentNote);
        console.log(notes);
        saveDB(JSON.stringify(notes));
    })

    app.delete("/api/notes/:id", (req, res) => {
        // DELETE SPECIFIED NOTE
        console.log("DELETE NOTE")

    })

    app.post("/api/clear_notes", (req, res) => {
        // DELETE ALL NOTES
        console.log("CLEAR NOTES")
        saveDB(JSON.stringify([]))
    })
}

function loadDB() {
    return JSON.parse(fs.readFileSync("db/db.json"));
}

function saveDB(json) {
    fs.writeFile("db/db.json", json, (err) => {
        if (err) throw err;
        console.log("Saved!");
    })
}

function checkID(list, id) {
    for(let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            return false;
        }
    }
   return true;
}

module.exports = apiRoutes;