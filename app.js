const express = require("express");
const path = require("path");
const demoRouter = require("./routes/demoRoutes");
const patientRouter = require("./routes/patientRoutes");
const productRouter = require("./routes/productRoutes");
const { create } = require("express-handlebars");

// Start express app
const app = express();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

// Set up view engine
const hbs = create({
    helpers: {
        // helper functions
    },
    defaultLayout: "main",
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Routers
app.use("/patients", patientRouter);
app.use("/products", productRouter);

app.get("/", (req, res) => {
    res.redirect("/patients");
});

module.exports = app;
