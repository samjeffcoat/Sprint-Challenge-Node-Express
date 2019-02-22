const express = require('express');

const server= express();

server.use(express.json());

server.get("/", (req, res) => {
    res.send(
        `
        <h2> Sam's Beautiful API</h>
        `
    );
})

module.exports= server;