require('./config/db'); // DB connection

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const UserRouter = require('./api/User');

require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

app.use('/user', UserRouter); // Routes

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
