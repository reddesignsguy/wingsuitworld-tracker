const express = require('express');
const cors = require('cors'); // Allows switching from dot.env to process.env // middleware!
// import "./loadEnvironment.mjs";
// import wingsuitSimulator from "./routes/wingsuit-simulator.mjs"; // Routes for Wingsuit Simulator

const app = express();
const PORT = process.env.PORT || 5051;
const players = require('./players.js')

app.use(cors());
app.use('/player', players);
// app.use("/wingsuit-simulator", wingsuitSimulator)

app.listen(PORT, () => {
    console.log("Running on port:", PORT);
});

// Prettier for js