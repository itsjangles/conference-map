import { Position } from "./position";

export class Player {
    private _position: Position;
    private _id: string;

    public get id(): string {
        return this._id;
    }

    public get position() {
        return this._position;
    }

    public set position(p: Position) {
        this._position = p;
    }

    constructor(id: string) {
        this._id = id;
        this._position = new Position();
    }
}