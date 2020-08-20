const path = require("path")

var htmlRoutes = app => {
    // ROUTE TO NOTES PAGE
    app.get("/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/notes.html"))
    })
    // ROUTE TO HOME PAGE
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    })
}

module.exports = htmlRoutes;