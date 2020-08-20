// IMPORTING NEEDED FUNCTIONS/MODULES
import express, { urlencoded, json } from "express";
import { default as apiRoutes } from "./routes/apiRoutes";
import { default as htmlRoutes } from "./routes/htmlRoutes";

// CREATING THE EXPRESS APP, AND USING A PORT
var app = express();
var PORT = process.env.PORT || 3000;

// ALLOWING USE OF URL ECODING AND JSON
app.use(urlencoded({ extended: true}));
app.use(json());

// ADDING THE SERVER ROUTES
apiRoutes(app);
htmlRoutes(app);

// RETURNING THE PORT IT IS ON
app.listen(PORT, () => {
    console.log("App listening on PORT: " + PORT);
})