import express from "express";
import cors from "cors"; // Allows switching from dot.env to process.env
// import "./loadEnvironment.mjs";
// import wingsuitSimulator from "./routes/wingsuit-simulator.mjs"; // Routes for Wingsuit Simulator

const PORT = process.env.PORT || 5051;
const app = express();

app.use(cors())
// app.use("/wingsuit-simulator", wingsuitSimulator)

app.listen(PORT, () => {
    console.log("Running on port:", PORT);
});