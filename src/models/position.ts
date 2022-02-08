export class Position {
    private _h: number = 0;
    private _w: number = 0;
    public get h(): number {
        return this._h;
    }
    public get w(): number {
        return this._w;
    }

    constructor(...args:Array<number | Position>) {
        if(args.length === 0) {
            this._h = 0;
            this._w = 0;
        } else if(args.length === 1 && args[0] instanceof Position) {
            this._h = args[0]._h;
            this._w = args[0]._w;
        } else if(args.length === 2 && typeof args[0] === "number" && typeof args[1] === "number") {
            this._h = args[0];
            this._w = args[1];
        } else {
            throw "Invalid constructor arguments";
        }
    }
}