const express = require('express');
const mongoose = require('mongoose');
const { importExam } = require('./helpers/importExam');
const route = require('./routes');
const cors = require('cors');
require('dotenv').config();
const port = 3001;

const app = express();
app.use(cors());
app.use(express.json());

route(app);

app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal Server Error',
    })
})

mongoose.connect(process.env.MONGO_URL)
    .then(result => {
        console.log('Connect to database successfully')
        app.listen(port, () => {
            console.log(`Online exam app listening on port ${port}`);
            // importExam();
        });
    })
    .catch(err => {
        console.log('Fail to connect to database');
    });
