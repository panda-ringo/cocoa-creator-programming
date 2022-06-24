// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Prefab)
    enemy_prefab: cc.Prefab = null;     // 敵のプレハブ

    private enemy: cc.Node = null;     // 今出現している敵のノード
    private timer: number = 0;         // 敵を定期的に出現させるためのタイマー

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    update (dt) {
        this.timer += 1;    // タイマーを１づつ加算
        let scene: cc.Scene = cc.director.getScene();
        if (this.timer >= 100 && this.enemy == null) {
            // timer値が100（100フレーム）以上で、出現中の敵ノードがnullでなければ敵出現
            let node: cc.Node = cc.instantiate(this.enemy_prefab);   // 弾のプレハブからインスタンスを作る
            node.parent = scene;                                     // 作ったインスタンスをシーンへ追加する
            node.setPosition(this.node.x, this.node.y);              // 作ったノードのXY座標にヘNULLノードのXY座標をセットする
            this.enemy = node;                                       // 出現中の敵ノードとして保存
        } else if (this.enemy != null && this.enemy.isValid == false) {
            // 敵ノードが出現中で且つ、敵ノードが破棄(isValidで破棄しているか判定している)されていれば
            this.timer = 0;     // タイマーを初期化
            this.enemy = null;  // 出現中の敵ノードを初期化
        }
    }
}
