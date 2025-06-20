import { useEffect, useState } from "react"
import { getData } from "./services"

function App() {

  const [data, setData] = useState("");
  
  useEffect(() => {
    (async() => {
      const data = await getData({prevData: "Initial data"});
      setData(data.res);
    })();
  }, []);

  return (
    <h1>{data}</h1>
  )
}

export default App;
