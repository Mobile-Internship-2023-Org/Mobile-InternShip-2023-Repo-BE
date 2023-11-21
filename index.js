const express = require("express");
const app = express();
import "dotenv/config";
import initRouter from "./src/service/initRouter";

const port = process.env.GET;

initRouter(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
