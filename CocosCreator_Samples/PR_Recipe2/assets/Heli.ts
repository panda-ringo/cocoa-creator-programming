// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Heli extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Prefab)
    enemy_prefab: cc.Prefab = null;

    private radius: number = 0;
    private value: number = 5;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        //cc.director.getPhysicsManager().enabled = true;
        let scene: cc.Scene = cc.director.getScene();
        var node = cc.instantiate(this.enemy_prefab);
        node.parent = scene;
        node.setPosition(0, 0);
    }

    start () {

    }

    update (dt) {
        if (this.node.x >= 960) {
            this.value = -5;
        } else if (this.node.x <= 0) {
            this.value = 5;
        }
        this.node.x += this.value;           // このコードでX方向へ移動する
        //this.node.y += 2;           // このコードでY方向へ移動する
        //this.node.rotation += 3;    // このコードで回転する
        //this.node.scaleX += 0.0025; // このコードでX方向に拡大する
        //this.node.scaleY += 0.0025; // このコードでY方向に拡大する
        //this.node.scaleX -= 0.0025; // このコードでX方向に縮小する
        //this.node.scaleY -= 0.0025; // このコードでY方向に縮小する
        //if (this.node.x >= 900) this.node.x = 900;
        //if (this.node.y >= 600) this.node.y = 600;    // わざとxに600を代入して、あとで修正する
        let cs: number = Math.cos(this.radius) * 10;
        let si: number = Math.sin(this.radius) * 10;
        this.radius += 0.05;
//        this.node.x = this.node.x + ( 1 - cs );
//        this.node.y = this.node.y + ( 1 - si );
//        this.node.x = this.node.x + cs;
//        this.node.y = this.node.y + si;
    }

    onKeyDown (event: cc.Event.EventKeyboard) {  // キーを押した時の処理
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                console.log('Press a key');
                break;
            case cc.macro.KEY.right: // 『→』キーの場合
                this.node.x += 3;           // このコードでX方向へ移動する
                break;
            case cc.macro.KEY.left: //  『←』キーの場合
                this.node.x -= 3;           // このコードでX方向へ移動する
                break;
            case cc.macro.KEY.up: // 『↑』キーの場合
            case cc.macro.KEY.space: // 『スペース』キーの場合
                this.node.y += 3;           // このコードでX方向へ移動する
                break;
            case cc.macro.KEY.down:
                this.node.y -= 3;           // このコードでX方向へ移動する
                break;
        }
    }
}
