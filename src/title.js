//myScene.js
var MyLayer = cc.Layer.extend({
    ctor: function() {
        this._super();

        var size = cc.director.getWinSize();

        //音楽再生エンジン
        audioEngine = cc.audioEngine;
        //bgm再生
        if (!audioEngine.isMusicPlaying()) {
          //audioEngine.playMusic("res/bgm_main.mp3", true);
          //audioEngine.playMusic(res.umi_mp3, true);
        }

                var TitleBG =
                cc.Sprite.create(res.background_png);
                TitleBG.setPosition(size.width / 2, size.height /2);
                TitleBG.setScale(1);
                this.addChild(TitleBG, 0);

                var Title = cc.Sprite.create(res.title_png);
                Title.setPosition(size.width / 2, size.height /1.4);
                Title.setScale(0.8);
                this.addChild(Title, 0);

                var left = cc.Sprite.create(res.curtain_left);
                left.setPosition(size.width / 7.5, size.height /2);
                left.setScale(1.16);
                this.addChild(left, 0);

                var right = cc.Sprite.create(res.curtain_right);
                right.setPosition(size.width / 1.15, size.height /2);
                right.setScale(1.16);
                this.addChild(right, 0);

                var logo = cc.Sprite.create(res.logo_png);
                logo.setPosition(size.width / 2, size.height /4);
                logo.setScale(1.16);
                this.addChild(logo, 0);
/*
                var Ready = cc.Sprite.create(res.ready_png);
                Ready.setPosition(size.width / 2.1, size.height /3.3);
                Ready.setScale(0.8);
                this.addChild(Ready, 0);
*/
var spark = cc.Layer.extend({
ctor: function() {
cc.spriteFrameCache.addSpriteFrames(res.title_plist, res.sparkle_frames);

// スプライトフレームを取得 player01,player02はplistの中で定義されいいる
var frame1 = cc.spriteFrameCache.getSpriteFrame("spark01");
var frame2 = cc.spriteFrameCache.getSpriteFrame("spark02");
var frame3 = cc.spriteFrameCache.getSpriteFrame("spark03");
var frame4 = cc.spriteFrameCache.getSpriteFrame("spark04");
var frame5 = cc.spriteFrameCache.getSpriteFrame("spark05");
var frame6 = cc.spriteFrameCache.getSpriteFrame("spark06");
var frame7 = cc.spriteFrameCache.getSpriteFrame("spark07");

//スプライトフレームを配列に登録
var animationframe = [];
animationframe.push(frame1);
animationframe.push(frame2);
animationframe.push(frame3);
animationframe.push(frame4);
animationframe.push(frame5);
animationframe.push(frame6);
animationframe.push(frame7);

//スプライトフレームの配列を連続再生するアニメーションの定義
var animation = new cc.Animation(animationframe, 0.2);
//永久ループのアクションを定義
var action = new cc.RepeatForever(new cc.animate(animation));

//実行
this.initWithFile(res.sparkle_frames);
this.runAction(action);

this.scheduleUpdate();
},
});

        // タップイベントリスナーを登録する
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);

        return true;
    },

    onTouchBegan: function(touch, event) {
        return true;
    },
    onTouchMoved: function(touch, event) {},
    onTouchEnded: function(touch, event) {
        // 次のシーンに切り替える
        cc.director.runScene(new gameScene());
    },
});

var MyScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new MyLayer();
        this.addChild(layer);
    }
});
