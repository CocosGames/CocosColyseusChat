
import { _decorator, Component, Node, director, game, EditBox, Button } from 'cc';
import { ClientScript } from './ClientScript';
const { ccclass, property } = _decorator;


@ccclass('LoginScript')
export class LoginScript extends Component {
    @property(Node) clientNode:Node = null;
    @property(EditBox) nameBox:EditBox = null;
    @property(Button) okButton:Button = null;

    start () {
        if (this.clientNode && !game.isPersistRootNode(this.clientNode))
            game.addPersistRootNode(this.clientNode);
        this.nameBox.focus();
    }

    onNameBoxEdit()
    {
        if (this.nameBox.string.length>0 && !this.okButton.interactable)
            this.okButton.interactable = true;
        else if (this.nameBox.string.length == 0 && this.okButton.interactable)
            this.okButton.interactable = false;
    }

    onOKButtonClick()
    {
        if (this.okButton.interactable && this.nameBox.string.length>0)
        {
            this.okButton.interactable=false;
            this.clientNode.getComponent<ClientScript>(ClientScript).connect(this.nameBox.string);
            director.loadScene("room");
        }
    }
   
}
