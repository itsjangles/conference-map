import morgan from 'morgan';
import express, { Request, Response } from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import Guid from 'guid';

import { Map } from './map';
import { Position } from './models/position';
import { MapData } from './models/mapdata';
import { Utils } from './util';
// import { EventEmitter } from 'ws';

const app = express();
const server = http.createServer(app);
const ws = new WebSocket.Server({ server });

// const emitter = new EventEmitter();
const validPos = (mapData: MapData, pos: Position) => {
    return pos.h <= mapData.position.h && pos.w <= mapData.position.w;
};

const batchTimeout = 5000; // For batching position updates

app.use(morgan("dev"));
const map = new Map();
app.set("mapData", map.GetConfig());
app.set("map", map);
app.get("/map", (_: Request, res: Response) => {
    const mapData = app.get("mapData") as MapData;
    if (mapData.grid.length !== mapData.position.h * mapData.position.w) {
        res.status(500);
        res.send(`Error: map size doesn't match expected dimensions\nlength ${mapData.grid.length}, h ${mapData.position.h} w ${mapData.position.w}`);
    } else {
        res.send(mapData);
    }
    res.end();
});

const broadcast = (data: any, sender: WebSocket) => {
    const all = data.type === "mapUpdate";
    ws.clients.forEach(client => {
        if (client !== sender) {
        client.send(JSON.stringify(data));
        }
    });
};

ws.on("connection", (socket: WebSocket) => {
    const userid = Guid.create().toString();
    // emitter.on(userid, message => {
    //     socket.send(message);
    // });
    socket.on("message", (msg) => {
        try {
            const [type, data, id] = Utils.parseMessage(msg);
            if (type === "position") {
                if (validPos(app.get("mapData"), data)) {
                    broadcast({ type: "mapUpdate", data: { position: data, id } }, socket);
                } else {
                    socket.send("Submitted position is invalid");
                }
            } else {
                socket.emit("error", "Unknown message type");
            }
        } catch (err) {
            socket.emit("error", err);
        }
    });

    socket.on("error", (err: Error) => {
        socket.send(err.message);
    });

    // socket.on("close", () => {
    //     emitter.removeAllListeners(userid);
    // });

    socket.send(JSON.stringify({ "message": "Welcome!", "id": userid }));
});

server.listen(3000, () => { console.log("Server ready") });