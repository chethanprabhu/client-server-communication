import express from 'express';
import cors from "cors";

const app = express();

app.use(cors()); //a middleware to disable cors error and allow everthing

let data = "Initial data"

app.get("/", (req, res) => {
    res.send({data: data});
})

app.post("/update", (req, res) => {
    const newData = req.query.sample;
    data = newData;
    res.send({data: newData});
})

app.listen(3000, () => {
    console.log("server started at 3000")
});