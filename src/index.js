require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")
const axios = require("axios")

const customersRoute = require("../Routes/customers")
const authRoute = require("../Routes/auth")

const app = express();
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8080
const dbUrl = process.env.DB_URL;

async function connectToMongo() {
    mongoose.set("strictQuery", false);
    try {
        await mongoose.connect(dbUrl);
        console.log("Successfully connected to MongoDB database");
        console.log("Connected to database:", mongoose.connection.name); // Logs the database name
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}


connectToMongo().catch(err => console.log("Some error"));

app.get("/", (req, res) => {
    res.status(201).send({ message: "This is the home route for the application" })
})

app.use("/api/customers", customersRoute)
app.use("/api/auth", authRoute);

app.listen(PORT, (req, res) => {
    console.log(`Server started on PORT ${PORT}`);
})

setInterval(() => {
    axios.get('https://visionaibackend.onrender.com/')
        .then(response => {
            console.log('Pinged backend to keep it alive.');
        })
        .catch(error => {
            console.error('Error pinging backend:', error);
        });
}, 2 * 60 * 1000);