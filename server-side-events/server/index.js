import express from "express";

const app = express();

app.get("/sse", (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    res.write('data: Welcome to Server sent event \n\n');
  
    const intervalId = setInterval(() => {
      res.write(`data: Server Time ${new Date().toLocaleDateString()} \n\n`);
    }, 5000);
  
    req.on('close', () => {
      clearInterval(intervalId);
    })
})

app.listen(3000);