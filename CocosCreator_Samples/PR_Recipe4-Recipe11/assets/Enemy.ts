// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

// 他のスクリプトで定義されているクラスを使う時の宣言
// EnemyPoint.tsとExplode.tsをインポートして、EnemyPointクラスと
// Explodeクラスを、このプログラム内で利用することを宣言している
import EnemyPoint from "./EnemyPoint";
import Explode from "./Explode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Enemy extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    // 爆発プレハブをPropertyパネルで設定するためのプロパティ変数
    @property(cc.Prefab)
    explode_prefab: cc.Prefab = null;

    // 爆発プレハブをinstantiateでインスタンス化した時の爆発ノードを保存する変数
    private explode: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
    }

    update (dt) {
    }

    
    //
    // 弾が当たった時に呼び出される関数
    //（この関数はCocos Creatorで決められた予約関数なので、関数名は変えてはいけない）
    //
    onCollisionEnter (other: cc.BoxCollider, my_collider: cc.CircleCollider) {
        //this.node.destroy();    // 敵ノードを破棄（消す）
        let scene: cc.Scene = cc.director.getScene();                   // 現在のシーンを取得
        this.explode = cc.instantiate(this.explode_prefab);             // 爆発のプレハブからインスタンスを作る
        this.explode.parent = scene;                                    // 作ったインスタンスをシーンへ追加する
        this.explode.setPosition(this.node.x, this.node.y);             // 作ったノードのXY座標にヘリコプターのXY座標をセットする
        let explodeObj: Explode = this.explode.getComponent(Explode);   // 爆発ノードからスクリプトコンポーネント取得
        explodeObj.setEnemy(this.node);                                 // 弾が当たった敵ノードを爆発ノードへ通知
    }
}
