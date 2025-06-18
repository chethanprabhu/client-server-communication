import express from 'express';

const app = express();

let data = "Initial data"

app.get("/", (req, res) => {
    res.send({res: data});
})

app.post("/update", (req, res) => {
    const newData = req.query.sample;
    data = newData;
    res.send({res: newData});
})

app.listen(3000, () => {
    console.log("server started at 3000")
});