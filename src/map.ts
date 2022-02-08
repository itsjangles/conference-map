
import { MapData } from "./models/mapdata";
import { Player } from "./models/player";

export class Map {
    private mapDim = [4, 4];
    private mapGrid: string[];
    private _players: Player[] = [];
    constructor() {
        const r = "r"; //meeting room
        const c = "c"; //main conference room

        const mapGrid = [
            r, r, r, r,
            c, c, c, c,
            c, c, c, c,
            r, r, r, r
        ];

        var count = 0;
        for (let x in mapGrid) {
            if (mapGrid[x] === r) {
                mapGrid[x] = (count++).toString();
            }
        }
        this.mapGrid = mapGrid;
    }

    public GetConfig(): MapData {
        return new MapData(this.mapDim[0],this.mapDim[1], this.mapGrid);
    }

    public get players(): Player[] {
        return this._players.slice();
    }
}

