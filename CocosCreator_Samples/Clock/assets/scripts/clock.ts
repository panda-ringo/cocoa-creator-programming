// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    private hoursToDeg: number = -360 / 12;
    private minutesToDeg: number = -360 / 60;
    private secondsToDeg: number = -360 / 60;

    @property(cc.Label)
    label: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    update (dt) {
        let now_dt: Date = new Date();      // 現在の日時を取得
        var children = this.node.children;  // Clock_BG（Node Treeパネル上）の下の子ノードを取得する

        for (var i = 0; i < children.length; ++i) {
            children[i].zIndex = -3;
            if (children[i].name == "long_hand") {
                // 長針のノードの場合の処理（分）
                // 360度を60分割した角度（要は1分毎の角度）を現在の分に掛けて現在の分の角度を計算
                children[i].angle = now_dt.getMinutes() * this.minutesToDeg;
            } else if (children[i].name == "short_hand") {
                // 短針のノードの場合の処理（時）
                // 現在の分により、短針の角度を徐々に次の時間まで動くよう微調整角度を計算
                let addVal: number = ( now_dt.getMinutes() / 12 ) * 6;
                // 現在の時に合わせて角度を計算。１時間あたり-30度づつ角度が変わるが、addValの数値を減算して、角度を微調整する
                // 例えば、現在の時刻が30分だとすると、30 / 12 * 6 = 15、現在の時が6時の場合、
                // 6 * -30（１時間毎に進む角度）= -180度
                // -180 - 15 = -195度が短針の角度（6時と7時の中間あたりに短針がくる）になる
                children[i].angle = ( now_dt.getHours() * this.hoursToDeg ) - addVal;
            } else if (children[i].name == "sec_hand") {
                // 秒針のノードの場合の処理
                // 360度を60分割した角度（要は1秒毎の角度）を現在の秒に掛けて現在の秒の角度を計算
                children[i].angle =now_dt.getSeconds() * this.secondsToDeg;
            }
        }
    }
}
