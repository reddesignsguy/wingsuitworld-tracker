const express = require('express');
const cors = require('cors'); // Allows switching from dot.env to process.env // middleware!
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
const profile = require('./routes/profile.js');
const user = require('./routes/user.js');

app.use(cors());
app.use(express.json())
app.use('/profile', profile);
app.use('/user', user);

app.listen(PORT, () => {
    console.log("Running on port:", PORT);
});

// Prettier for js