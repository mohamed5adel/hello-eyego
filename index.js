const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Hello Eyego</title>
        <style>
          body {
            background-color: blue;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
          h1 {
            color: white;
            font-size: 3em;
            font-weight: bold;
            font-family: Arial, sans-serif;
          }
        </style>
      </head>
      <body>
        <h1>Hello Eyego</h1>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
