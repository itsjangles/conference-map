import { RawData } from "ws";

export class Utils {
    public formatMessage(type: string, data: any, id?: string) {
        return {type, data};
    }

    public static parseMessage(msg: RawData) {
        const data = JSON.parse(msg.toString());
        return [data.type, data.pos, data.id];
    }

    public parsePosition(msg: string) {

    }
}