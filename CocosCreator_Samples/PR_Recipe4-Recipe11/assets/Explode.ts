// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Explode extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // 弾が当たった敵のノード
    private enemy: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        // アニメーションコンポーネントを取得し、アニメーション再生
        let anim: cc.Animation = this.getComponent(cc.Animation);
        anim.play("explode_anim");
    }

    // update (dt) {}

    //
    // 爆発アニメーションの最終フレームで呼び出される関数
    //
    onAnimStop () : void {
        this.node.destroy();
    }

    //
    // 爆発アニメーションの途中で呼び出される関数
    // 弾が当たった敵ノードを破棄する。当たった敵ノードは、setEnemyで通知されている前提
    //
    onEnemyDestroy() : void {
        this.enemy.destroy();
    }

    //
    // 敵に弾が当たった時に、当たった敵のノードを知らせる関数
    // Enemy.tsのonCollisionEnter関数内で呼び出しされる
    //
    setEnemy(enemy: cc.Node) : void {
        this.enemy = enemy;
    }
}
