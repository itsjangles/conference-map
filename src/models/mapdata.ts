import { Position } from "./position";

export class MapData {
    private _pos: Position;
    private _grid: string[];
    public get position(): Position {
        return this._pos;
    }
    public get grid(): string[] {
        return this._grid;
    }

    constructor(w: number, h: number, d: string[]) {
        this._pos = new Position(h, w);
        this._grid = d.slice();
    }
}