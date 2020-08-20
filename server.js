// IMPORTING NEEDED FUNCTIONS/MODULES
const express = require("express");

// CREATING THE EXPRESS APP, AND USING A PORT
var app = express();
var PORT = process.env.PORT || 3000;

// ALLOWING USE OF URL ECODING AND JSON
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// ADDING THE SERVER ROUTES
// ADDING THE SERVER ROUTES
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// RETURNING THE PORT IT IS ON
app.listen(PORT, () => {
    console.log("App listening on PORT: " + PORT);
})