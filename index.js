const express = require("express");
import "dotenv/config";
import initRouter from "./src/service/initRouter";
const bodyParser = require("body-parser");
const { measureExecutionTime } = require("./src/utils/performanceUtils");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

initRouter(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Sử dụng port: ${port}`);
  console.log(`Server URL: http://localhost:${port}`);
});
