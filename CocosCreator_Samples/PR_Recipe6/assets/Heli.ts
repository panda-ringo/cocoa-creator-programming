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

    private input_key: Array<boolean> = [ false, false, false, false ];

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    start () {

    }

    player_input() {
        // カーソルキーの入力判定
        if ( this.input_key[ 0 ] != false && this.input_key[ 2 ] != false ) {
            // 上と右のカーソルキーが押されている
            this.node.y += 5;
            this.node.x += 5;
        } else if ( this.input_key[ 0 ] != false && this.input_key[ 3 ] != false ) {
            // 上と左のカーソルキーが押されている
            this.node.y += 5;
            this.node.x -= 5;
        } else if ( this.input_key[ 0 ] != false ) {
            // 上のカーソルキーが押されている
            this.node.y += 5;
        } else if ( this.input_key[ 1 ] != false ) {
            // 下のカーソルキーが押されている
            this.node.y -= 5;
        }
    
        if ( this.input_key[ 1 ] != false && this.input_key[ 2 ] != false ) {
            // 下と右のカーソルキーが押されている
            this.node.y -= 5;
            this.node.x += 5;
        } else if ( this.input_key[ 1 ] != false && this.input_key[ 3 ] != false ) {
            // 下と左のカーソルキーが押されている
            this.node.y -= 5;
            this.node.x -= 5;
        } else if ( this.input_key[ 2 ] != false ) {
            // 右のカーソルキーが押されている
            this.node.x += 5;
        } else if ( this.input_key[ 3 ] != false ) {
            // 左のカーソルキーが押されている
            this.node.x -= 5;
        }
    }

    update (dt) {
        // カーソルキーの入力判定
        this.player_input();

        // 上下の画面外判定
        if (this.node.y >= 640) {
            this.node.y = 640;
        } else if (this.node.y <= 0) {
            this.node.y = 0;
        }

        // 左右の画面外判定
        if (this.node.x >= 960) {
            this.node.x = 960;
        } else if (this.node.x <= 0) {
            this.node.x = 0;
        }
    }

    onKeyUp (event: cc.Event.EventKeyboard) {  // キーを押した時の処理
        if (event.keyCode == cc.macro.KEY.right ) {
            this.input_key[ 2 ] = false;
        }
        if (event.keyCode == cc.macro.KEY.left ) {
            this.input_key[ 3 ] = false;
        }
        if (event.keyCode == cc.macro.KEY.up ) {
            this.input_key[ 0 ] = false;
        }
        if (event.keyCode == cc.macro.KEY.down ) {
            this.input_key[ 1 ] = false;
        }
    }

    onKeyDown (event: cc.Event.EventKeyboard) {  // キーを押した時の処理
        // UP38 DW40 L37 R39
        /*
        if (event.keyCode == cc.macro.KEY.up ) {
//            this.node.y += 10;           // このコードでY方向（上）へ移動する
            this.input_key[ 0 ] = event.keyCode;
        }
        if (event.keyCode == cc.macro.KEY.down ) {
//            this.node.y -= 10;           // このコードでY方向（下）へ移動する
            this.input_key[ 1 ] = event.keyCode;
        }
        console.log(event.keyCode);
        if (event.keyCode == cc.macro.KEY.right ) {
//            this.node.x += 10;           // このコードでX方向（右）へ移動する
            this.input_key[ 2 ] = event.keyCode;
        }
        if (event.keyCode == cc.macro.KEY.left ) {
//            this.node.x -= 10;           // このコードでX方向（左）へ移動する
            this.input_key[ 3 ] = event.keyCode;
        }
        */

        switch(event.keyCode) {
            case cc.macro.KEY.up: // 『↑』キーの場合
                this.node.y += 10;           // このコードでY方向（上）へ移動する
                this.input_key[ 0 ] = true;
                break;
            case cc.macro.KEY.down:
                this.node.y -= 10;           // このコードでY方向（下）へ移動する
                this.input_key[ 1 ] = true;
                break;
            case cc.macro.KEY.right: // 『→』キーの場合
                this.node.x += 10;           // このコードでX方向（右）へ移動する
                this.input_key[ 2 ] = true;
                break;
            case cc.macro.KEY.left: //  『←』キーの場合
                this.node.x -= 10;           // このコードでX方向（左）へ移動する
                this.input_key[ 3 ] = true;
                break;
        }
    }
}
