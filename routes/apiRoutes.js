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
        console.log("ADD NEW NOTE")
        let notes = loadDB();
        notes.push(req.body);
        console.log(notes);
        saveDB(JSON.stringify(notes));

        // console.log(req.body)
    })

    app.delete("/api/notes/:id", (req, res) => {
        // DELETE SPECIFIED NOTE
    })

    app.post("/api/clear_notes", (req, res) => {
        // DELETE ALL NOTES
    })
}

function loadDB() {
    return JSON.parse(fs.readFileSync("db/db.json"));
}

function saveDB(json) {
    fs.writeFileSync("db/db.json", json)
}

module.exports = apiRoutes;