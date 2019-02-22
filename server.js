const express = require("express");

const projectsRouter = require("./routers/projects-router");
const actionsRouter = require("./routers/actions-router");
const server = express();

server.use(express.json());
server.use("/projects/", projectsRouter);
server.use("/actions/", actionsRouter);
server.get("/", (req, res) => {
  res.send(
    `
        <h2> Sam's Beautiful API</h>
        `
  );
});

module.exports = server;
