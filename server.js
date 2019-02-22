const express = require("express");

const projectsRouter = require("./routers/projects-router");

const server = express();

server.use(express.json());
server.use("/projects/", projectsRouter);
server.get("/", (req, res) => {
  res.send(
    `
        <h2> Sam's Beautiful API</h>
        `
  );
});

module.exports = server;
