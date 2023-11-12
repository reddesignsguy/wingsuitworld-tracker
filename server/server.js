const express = require('express');
const cors = require('cors'); // Allows switching from dot.env to process.env // middleware!
// import "./loadEnvironment.mjs";
// import wingsuitSimulator from "./routes/wingsuit-simulator.mjs"; // Routes for Wingsuit Simulator

const app = express();
const PORT = process.env.PORT || 5051;
const players = require('./players.js');
const users = require('./users.js');

app.use(cors());
app.use(express.json())
app.use('/player', players);
app.use('/user', users);

app.listen(PORT, () => {
    console.log("Running on port:", PORT);
});

// Prettier for js