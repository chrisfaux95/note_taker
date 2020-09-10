const fs = require("fs");
const { createContext } = require("vm");

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
        if (req.body.id) {
            updateNote(req.body);
        } else {
            createNote(req.body);
        }

    });

    app.delete("/api/notes/:id", (req, res) => {
        // DELETE SPECIFIED NOTE
        console.log("DELETE NOTE")
        console.log(req.params.id)

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
    for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            return false;
        }
    }
    return true;
}

function createNote(body) {
    let notes = loadDB();
    let currentNote = body;
    // generates a unique id for the note
    // (will keep running until unique)
    let id = 0;
    while (!checkID(notes, id)) {
        id = Math.floor(Math.random() * 100000);
    }
    // adds the unique id;
    currentNote.id = id;
    notes.push(currentNote);
    console.log(notes);
    saveDB(JSON.stringify(notes));
}


module.exports = apiRoutes;