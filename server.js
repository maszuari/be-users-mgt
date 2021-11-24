const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
const db = require("./app/models");
const Role = db.role;

// parse requests of content-type - application/json
app.use(express.json());

//Parse URL-encoded bodies
app.use(express.urlencoded({
    extended: true
}));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Hello test." });
});

app.get("/api/syncdb", (req, res) => {
    db.sequelize.sync({ force: true }).then(() => {
        console.log('Drop and Resync Db');
        initial();
    });
    res.json({ message: "Dropped and Resynced Db" });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// Set inital data in the database.
function initial() {
    Role.create({
        id: 1,
        name: "admin"
    });

    Role.create({
        id: 2,
        name: "registeredUser"
    });
}