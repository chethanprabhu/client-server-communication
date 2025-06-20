import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

const data = {res: "Initial data"};

let Q = [];

app.get("/getData", (req, res) => {
    const query = req.query.prevData;

    //If current data is equal to query data sent from client then no need to send again. Add to Queue
    if(query === data.res) {
        Q.push(res);
    } else {
        res.send(data);
    }
})

app.post("/updateData", (req, res) => {
    data.res = req.query.newData;

    //Whenever the update happens first check if any request is pending in Q. If yes then resolve those first.
    while(Q.length) {
        const cur = Q.shift();

        cur.send(data);
    }

    res.send("Updated the data successfully");
})

app.listen(3000, () => {
    console.log("server started at port 3000");
})