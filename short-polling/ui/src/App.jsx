import React, { useEffect, useState } from "react";
import { getData } from "./service";

const App = () => {
    const [state, setState] = useState("");

    //original call
    useEffect(() => {
        (async() => {
            const res = await getData();
            setState(res.data);
        })();
    }, [])

    //short polling call
    useEffect(() => {
        setInterval(async () => {
            const res = await getData();
            setState(res.data);
        }, 10000);
    }, [])

    return (
        <>
            <h1>{state}</h1>
        </>
    )
}

export default App;