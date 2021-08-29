
import { _decorator, Component, Node, Button, EditBox } from 'cc';
import { ClientScript } from './ClientScript';
const { ccclass, property } = _decorator;

 
@ccclass('RoomScript')
export class RoomScript extends Component {

    @property(EditBox) lobbyBox:EditBox = null;
    @property(EditBox) messageBox:EditBox = null;
    @property(Button) sendButton:Button = null;
    @property(Node) clientNode:Node = null;

    start () {
        this.clientNode = this.node.parent.getChildByName("ClientNode");
        this.clientNode.on("messages", (message)=>{
            this.lobbyBox.string+=message+"\n";
        });
        this.messageBox.focus();
    }

    onMessageBoxEdit()
    {
        if (this.messageBox.string.length>0 && !this.sendButton.interactable)
            this.sendButton.interactable = true;
        else if (this.messageBox.string.length == 0 && this.sendButton.interactable)
            this.sendButton.interactable = false;
    }

    onSendButtonClick()
    {
        if (this.sendButton.interactable && this.messageBox.string.length>0)
        {
            this.sendButton.interactable = false;
            this.clientNode.getComponent<ClientScript>(ClientScript).send(this.messageBox.string);
            this.messageBox.string = "";
        }
    }
}
