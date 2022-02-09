export default class Participant {
    private _name: string;
    private _id: string;
    private _posX: number = 0;
    private _posY: number = 0;
    public get name() {
        return this._name;
    }
    public get id() {
        return this._id;
    }

    public getPosition() {
        return { x: this._posX, y: this._posY };
    }

    public setPosition(x: number, y: number) {
        this._posX = x;
        this._posY = y;
    }

    constructor(name: string, id: string) {
        this._name = name;
        this._id = id;
    }
}