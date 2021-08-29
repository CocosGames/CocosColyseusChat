import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import Colyseus from 'db://colyseus-sdk/colyseus.js';

@ccclass('ClientScript')
export class ClientScript extends Component {
    @property hostname = "localhost";
    @property port = 2567;
    @property useSSL = false;

    client!: Colyseus.Client;
    room!: Colyseus.Room;

    async connect (userName:string="") {
        this.client = new Colyseus.Client(`${this.useSSL ? "wss" : "ws"}://${this.hostname}${([443, 80].includes(this.port) || this.useSSL) ? "" : `:${this.port}`}`);
        try {
            this.room = await this.client.joinOrCreate("lobby", {userName:userName});
            this.room.onMessage("messages", (message) => {
                this.node.emit("messages", message);
            });

        } catch (e) {
            console.error(e);
        }
    }

    send (message:string="")
    {
        this.room.send("message", message);
    }
}