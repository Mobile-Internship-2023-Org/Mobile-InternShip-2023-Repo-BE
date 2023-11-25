const express = require("express");
const app = express();
import "dotenv/config";
import initRouter from "./src/service/initRouter";
const bodyParser = require("body-parser");

const serverURL = `http://localhost:${port}`;

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

initRouter(app);

app.listen(port, () => {
  console.log(`Port: ${port}`);
  console.log(`Server URL: ${serverURL}`);
});
