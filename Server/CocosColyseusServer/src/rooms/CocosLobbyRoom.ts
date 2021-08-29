import {Client, LobbyRoom, Room} from "colyseus";

export class CocosLobbyRoom extends LobbyRoom {
    // this room supports only 4 clients connected
    maxClients = 4;

    // @ts-ignore
    onCreate (options: any): Promise<void> {
        console.log("ChatRoom created!", options);

        this.onMessage("message", (client, message) => {
            console.log("ChatRoom received message from", client.sessionId, ":", message);
            this.broadcast("messages", `(${client.userData}): ${message}`);
        });
    }

    onJoin (client: Client, options: any) {
        client.userData = options.userName;
        this.broadcast("messages", `${ client.userData } joined.`);
    }

    onLeave (client: Client) {
        this.broadcast("messages", `${ client.userData } left.`);
    }

    onDispose () {
        console.log("Dispose ChatRoom");
    }

}
