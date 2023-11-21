const express = require("express");
const app = express();
import "dotenv/config";
import initRouter from "./src/service/initRouter";
const bodyParser = require("body-parser");

const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

initRouter(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
