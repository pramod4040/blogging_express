require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const routes = require("./routes")


// Database Connection 
mongoose.connect(process.env.MONGO_DATABASE_URL)
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
});

// database.once('connected', () => {
//     console.log("Database Connected");
// })

// Express
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/", function(req, res) {
    res.send("All Good");
});

app.use('/api', routes);


const PORT = 4000
app.listen(PORT, function() {
    console.log(`Blogging site is listening on ${PORT}`)
})