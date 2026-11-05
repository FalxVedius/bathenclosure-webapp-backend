const express = require('express');
const { generateAnswer } = require('./controllers/openaiController');


// app setup
const app = express();


// middleware
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.get("/", function (req,res){
    res.send("Server is ready : Update 1.05")
})

app.get("/api/test", function (req,res){
    res.send("You received a message from the backend")
})

app.listen(process.env.PORT || 8080, () => console.log('Listening for request on port 4000'));

// routes
app.post('/openai/answer', generateAnswer);