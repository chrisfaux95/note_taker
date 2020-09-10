const fs = require("fs");
const { get } = require("http");

var apiRoutes = (app) => {
    app.get("/api/notes", (req, res) => {
        // RETURN JSON OF SAVED NOTES
        console.log("GET NOTES");
        let notes = loadDB()
        // console.log(notes)
        res.json(notes)

    })

    app.post("/api/notes", (req, res) => {
        // ADD NEW NOTE TO NOTES
        console.log("ADD NEW NOTE");
        console.log(req.body);
        if (req.body.id) {
            updateNote(req.body);
        } else {
            createNote(req.body);
        }

    });

    app.delete("/api/notes/:id", (req, res) => {
        // DELETE SPECIFIED NOTE
        console.log("DELETE NOTE");
        // console.log(req.params.id)
        let notes = loadDB();
        notes = notes.filter(e => e.id != req.params.id);
        saveDB(JSON.stringify(notes));
        res.json(notes);

    })

    app.post("/api/clear_notes", (req, res) => {
        // DELETE ALL NOTES
        console.log("CLEAR NOTES");
        let notes = JSON.stringify([]);
        saveDB(notes);
        res.json([]);
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
    const idCheck = (e) => e.id === id;
    return list.some(idCheck);
}

function createNote(body) {
    let notes = loadDB();
    let currentNote = body;
    // generates a unique id for the note
    // (will keep running until unique)
    let id = getRandomID();
    while (checkID(notes, id)) {
        id = getRandomID();
    }
    // adds the unique id;
    currentNote.id = id;
    notes.push(currentNote);
    // console.log(notes);
    saveDB(JSON.stringify(notes));
}

function updateNote(body) {
    console.log("Update Notes")
    let notes = loadDB();
    let currentNote = body;
    let currentID = parseInt(body.id)
    console.log(currentNote);
    // check if current note id actually exists in notes
    let noteIndex = notes.findIndex((e) => e.id === currentID);
    console.log(noteIndex);
    if (noteIndex === -1) {
        notes.push(currentNote);
    } else {
        notes[noteIndex] = currentNote;
    }
    saveDB(JSON.stringify(notes));
}

function getRandomID() {
    return Math.floor(Math.random() * 100000);
}

module.exports = apiRoutes;