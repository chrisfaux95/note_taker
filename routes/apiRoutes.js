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
    let id = 0;
    while (!checkID(notes, id)) {
        id = Math.floor(Math.random() * 100000);
    }
    // adds the unique id;
    currentNote.id = id;
    notes.push(currentNote);
    // console.log(notes);
    saveDB(JSON.stringify(notes));
}

function updateNote(body) {
    let notes = loadDB();
    let currentNote = body;
    // check if current note id actually exists in notes
    let noteIndex = notes.findIndex((e) => e.id === currentNote.id);
    if (noteIndex === -1) {
        notes.push(currentNote);
    } else {
        notes[noteIndex].title = currentNote.title;
        notes[noteIndex].text = currentNote.text;
    }
    saveDB(JSON.stringify(notes));
}

module.exports = apiRoutes;