const express = require("express");
const http = require("http");
const app = express();
const port = 4000;
const routes = require("./routes/routes");
const scraper = require("./potusScraper");
app.use(routes);
const server = http.createServer(app);

server.listen(port, () => console.log(`Listening on port ${port}`));
