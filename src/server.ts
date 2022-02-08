// const express = require('express');
// const morgan = require('morgan');

import morgan from 'morgan';
import express, { Request, Response } from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

import { Map } from './map';
import { Position } from './models/position';
import { MapData } from './models/mapdata';

const app = express();
const server = http.createServer(app);
const ws = new WebSocket.Server({ server });

const validPos = (mapData: MapData, pos: Position) => {
    return pos.h <= mapData.position.h && pos.w <= mapData.position.w;
};

app.use(morgan("dev"));
app.set("mapData", new Map().GetConfig());
app.get("/map", (req: Request, res: Response) => {
    const mapData = app.get("mapData") as MapData;
    if (mapData.grid.length !== mapData.position.h * mapData.position.w) {
        res.status(500);
        res.send(`Error: map size doesn't match expected dimensions\nlength ${mapData.grid.length}, h ${mapData.position.h} w ${mapData.position.w}`);
    } else {
        res.send(mapData);
    }
    res.end();
});
// app.post("/position", (req: Request, res: ) => {
//     // Set the user's position
//     const pos = { h: req.body.h, w: req.body.w };
//     if (validPos(app.get("mapData"), pos)) {

//     } else {
//         res.send("Submitted position is invalid");
//         res.status(400);
//     }
//     res.end();
// });

ws.on("connection", (socket: WebSocket) => {
    socket.on("message", (msg) => {
        const data = JSON.parse(msg.toString());
        // const pos = { h: data.h, w: data.w };
        if (validPos(app.get("mapData"), data.pos)) {
            console.dir(data.pos);
        } else {
            socket.send("Submitted position is invalid");
        }
    });
});
server.listen(3000, () => { console.log("Server ready") });