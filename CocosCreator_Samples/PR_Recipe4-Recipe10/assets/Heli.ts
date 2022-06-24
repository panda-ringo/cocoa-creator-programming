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

    @property(cc.Prefab)
    shot_prefab: cc.Prefab = null;

    private input_key: boolean[] = [ false, false, false, false ];
    private shot_array: cc.Node[] = new Array<cc.Node>(30);
    // 弾を撃った時のキーフラグ変数
    private shot_key: boolean = false;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // キーボードが押された時のイベントを登録
        // キーボードが押されると、this.onKeyDown関数が呼び出される
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        // キーボードのキーから離されると、this.onKeyUp関数が呼び出される
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        // コリジョン判定機能を有効にする
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;    // コリジョンデバッグ描画ON
    }

    start () {
        // 配列変数の初期化
        for (let i = 0; i < this.shot_array.length; ++i) {
            this.shot_array[ i ] = null;
        }
    }

    player_shot() {
        for (let i = 0; i < this.shot_array.length; ++i) {
            if (this.shot_array[ i ] != null) {
                // shot_array配列に弾のノードが見つかったら、弾のX座標を加算する
                this.shot_array[ i ].x += 20;
                if (this.shot_array[ i ].x >= 960) {
                    // 弾のX座標が画面外になったら弾のノードを破棄する
                    this.shot_array[ i ].destroy(); // ノードのdestroy関数を呼び出すとノードが破棄される
                    this.shot_array[ i ] = null;    // 弾ノードを管理する配列変数にnullをセットし空にする
                }
            }
        }
    }

    // キー入力の状態を判定して、ヘリコプター画像を入力方向へ移動させる関数
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

        // 弾を撃った時の処理
        if (this.shot_key) {
            // 作った弾のノードをshot_array変数で管理するための処理
            for (let i = 0; i < this.shot_array.length; ++i) {
                if (this.shot_array[ i ] == null) { // shot_array変数に空いている要素を探す条件文
                    let scene: cc.Scene = cc.director.getScene();
                    let node: cc.Node = cc.instantiate(this.shot_prefab);   // 弾のプレハブからインスタンスを作る
                    node.parent = scene;    // 作ったインスタンスをシーンへ追加する
                    node.setPosition(this.node.x, this.node.y); // 作ったノードのXY座標にヘリコプターのXY座標をセットする        
                    this.shot_array[ i ] = node;    // 空いていた配列要素に作ったノードを追加する
                    this.shot_key = false;          // 弾を撃ったフラグをfalseにして弾を撃ってないことにする
                    break;                          // for文を抜ける
                }
            }
        }
    }

    update (dt) {
        // この関数が呼び出されると、キー入力を判定してヘリコプターが移動する
        this.player_input();
        // この関数が呼び出されると、弾が移動する
        this.player_shot();
    }

    onKeyUp (event: cc.Event.EventKeyboard) {  // キーを押した時の処理
        switch(event.keyCode) {
            case cc.macro.KEY.up: // 『↑』キーの場合
                this.input_key[ 0 ] = false;
                break;
            case cc.macro.KEY.down:
                this.input_key[ 1 ] = false;
                break;
            case cc.macro.KEY.right: // 『→』キーの場合
                this.input_key[ 2 ] = false;
                break;
            case cc.macro.KEY.left: //  『←』キーの場合
                this.input_key[ 3 ] = false;
                break;
            case cc.macro.KEY.x:  //  Xキーの場合
                this.shot_key = true;
                break;
        }
    }

    // キーダウン（押した時）した時のイベント処理
    onKeyDown (event: cc.Event.EventKeyboard) {
        switch(event.keyCode) {
            case cc.macro.KEY.up:    // 『↑』キーの場合
                this.input_key[ 0 ] = true;
                break;
            case cc.macro.KEY.down:  // 『下』キーの場合
                this.input_key[ 1 ] = true;
                break;
            case cc.macro.KEY.right: // 『→』キーの場合
                this.input_key[ 2 ] = true;
                break;
            case cc.macro.KEY.left:  //  『←』キーの場合
                this.input_key[ 3 ] = true;
                break;
        }
    }

    onCollisionEnter (other) {
    }
}
