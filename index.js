const express = require('express');
const mongoose = require('mongoose');
const IndexRoutes = require('./routers/index');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

//set body parser
app.use(bodyParser.urlencoded({ extended: false}))

//connecting to database
mongoose
    .connect(process.env.MONGO_URI ,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(()=> console.log('Connected To DB'))
    .catch(err=> console.log(err)
);

app.use('/' , IndexRoutes)

//starting server
app.listen(process.env.PORT || 5000 , ()=>{
    console.log('server Started')
})