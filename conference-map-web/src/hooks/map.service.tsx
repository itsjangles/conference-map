import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import Participant from "../models/participant";

function MapService() {

}

export const useMap = function () {
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [id, setId] = useState("");
    const ws = useRef<Socket>();

    useEffect(() => {
        ws.current = io(`ws://localhost:3333/?id=${id}`);
        // ws.current = new WebSocket(`ws://localhost:3333/?id=${id}`);
        const socket = ws.current;

        socket.on("connect", () => console.log("Connected"));
        socket.on("disconnect", () => { console.log("Disconnected") });

        return () => {
            socket.close();
        };
    }, [id]);

    useEffect(() => {
        ws.current && (ws.current.on("message", msg => {
            const m = JSON.parse(msg.data);
            console.log(m);

            if (m.type === "connected") {
                setId(m.id);
            }
        }));
    });

    return { participants, id };
};

export default MapService;