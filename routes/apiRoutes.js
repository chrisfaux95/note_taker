

var apiRoutes = (app) => {
    app.get("/api/notes", (req, res) => {
        // RETURN JSON OF SAVED NOTES
    })

    app.post("/api/notes", (req, res) => {
        // ADD NEW NOTE TO NOTES
    })

    app.delete("/api/notes/:id", (req, res) => {
        // DELETE SPECIFIED NOTE
    })

    app.post("/api/clear_notes", (req, res) => {
        // DELETE ALL NOTES
    })
}

export default apiRoutes