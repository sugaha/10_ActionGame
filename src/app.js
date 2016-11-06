var size;
//1:地面　2:UI　3:プレイヤ　4:ゾンビ 5:こうもり 6:スライム
var level = [
   [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
   [0, 0, 5, 0, 0, 0, 0, 5, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 1, 1, 0, 0, 0, 1, 0, 0],
   [0, 0, 0, 0, 3, 0, 0, 6, 4, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var tileSize = 96;
var playerPosition; //マップ内のプレイやの位置(ｘ、ｙ)を保持する
var playerSprite; //プレイヤーのスプライト
var leftBtn; //左ボタン
var rightBtn; //右ボタン
var kenBtn;//剣ボタン
var jumpBtn; //ジャンプ
var winSize;
var work_action;
var atack_action;
var jump_action;
var key_seigyo = false;

var gameScene = cc.Scene.extend({
   onEnter: function() {
      this._super();

      winSize = cc.director.getWinSize();

      var background = new backgroundLayer();
      this.addChild(background);
      var level = new levelLayer();
      this.addChild(level);
      var player = new playerLayer();
      this.addChild(player);
      var enemys = new enemyLayer();
      this.addChild(enemys);
      if (!audioEngine.isMusicPlaying()) {
      //audioEngine.playMusic("res/bgm_main.mp3", true);
      audioEngine.playMusic(res.main_bgm, true);
    }
   }
});


var backgroundLayer = cc.Layer.extend({
   ctor: function() {
      this._super();

      var backgroundSprite = cc.Sprite.create(res.background_png);
      var size = backgroundSprite.getContentSize();
      //console.log(size);
      this.addChild(backgroundSprite);
      //console.log(winSize.width,winSize.height);
      backgroundSprite.setPosition(winSize.width / 2, winSize.height / 2);
      //背景画像を画面の大きさに合わせるためのScaling処理
      backgroundSprite.setScale(winSize.width / size.width, winSize.height / size.height);


      var groundSprite = cc.Sprite.create(res.ground_png);
      var size = backgroundSprite.getContentSize();
      //console.log(size);
      this.addChild(groundSprite);
      //console.log(winSize.width,winSize.height);
      groundSprite.setPosition(winSize.width / 2.5, winSize.height / 4.5);
      //背景画像を画面の大きさに合わせるためのScaling処理
      groundSprite.setScale(1.1);


      var left = cc.Sprite.create(res.curtain_left);
      left.setPosition(size.width / 12, size.height /1.7);
      left.setScale(1.16);
      this.addChild(left, 0);

      var right = cc.Sprite.create(res.curtain_right);
      right.setPosition(size.width / 1.5, size.height /1.7);
      right.setScale(1.16);
      this.addChild(right, 0);

      var shouhi = cc.Sprite.create(res.syouhi);
      shouhi.setPosition(size.width / 2.5, size.height /0.97);
      shouhi.setScale(1);
      this.addChild(shouhi, 0);

      var shouhi2 = cc.Sprite.create(res.syouhi);
      shouhi2.setPosition(size.width / 7, size.height /0.97);
      shouhi2.setScale(1);
      this.addChild(shouhi2, 0);

      var Hp = cc.Sprite.create(res.hitpoint);
      Hp.setPosition(size.width / 10.5, size.height /0.97);
      Hp.setScale(1);
      this.addChild(Hp, 0);

      var Hp2 = cc.Sprite.create(res.hitpoint);
      Hp2.setPosition(size.width / 7, size.height /0.97);
      Hp2.setScale(1);
      this.addChild(Hp2, 0);

      var Hp3 = cc.Sprite.create(res.hitpoint);
      Hp3.setPosition(size.width / 5.5, size.height /0.97);
      Hp3.setScale(1);
      this.addChild(Hp3, 0);

      var waza = cc.Sprite.create(res.bear);
      waza.setPosition(size.width / 2.9, size.height /0.97);
      waza.setScale(1);
      this.addChild(waza, 0);

      var waza2 = cc.Sprite.create(res.bear);
      waza2.setPosition(size.width / 2.6, size.height /0.97);
      waza2.setScale(1);
      this.addChild(waza2, 0);

      var waza3 = cc.Sprite.create(res.bear);
      waza3.setPosition(size.width / 2.3, size.height /0.97);
      waza3.setScale(1);
      this.addChild(waza3, 0);

   }

});

var levelLayer = cc.Layer.extend({
   ctor: function() {
      this._super();
      var size = cc.director.getWinSize();
      for (i = 0; i < 7; i++) {　　　　　　
         for (j = 0; j < 10; j++) {
            switch (level[i][j]) {
               case 1:
                  var groundSprite = cc.Sprite.create(res.block_png);
                  groundSprite.setPosition(tileSize / 2 + tileSize * j, 96 * (8 - i) - tileSize / 1.5);
                  this.addChild(groundSprite);
                  break;
               case 2:
                  var uiSprite = cc.Sprite.create(res.ui_panel_png);
                  uiSprite.setPosition(tileSize / 1 + tileSize * j, 96 * (7.8 - i) - tileSize / 2);
                  this.addChild(uiSprite);
                  break;
            }
         }
      }
   }
});


var player;
var playerLayer = cc.Layer.extend({
   ctor: function() {
      this._super();
      player = new Player();
      this.addChild(player);
      //ショッピングカートを操作するレイヤー

      //左ボタン
      leftBtn = cc.Sprite.create(res.leftbutton_png);
      this.addChild(leftBtn, 0);
      leftBtn.setPosition(60, 40);
      leftBtn.setOpacity(128);
      leftBtn.setTag(1);
      //右ボタン
      rightBtn = cc.Sprite.create(res.rightbutton_png);
      this.addChild(rightBtn, 0);
      rightBtn.setPosition(150, 40);
      rightBtn.setOpacity(128);
      rightBtn.setTag(2);

      //剣ボタン
      kenBtn = cc.Sprite.create(res.kenbutton_png);
      this.addChild(kenBtn, 0);
      kenBtn.setPosition(winSize.width - 160, 40);
      kenBtn.setOpacity(128);
      kenBtn.setTag(4);

      //ジャンプボタン
      jumpBtn = cc.Sprite.create(res.rightbutton_png);
      jumpBtn.setRotation(-90);
      this.addChild(jumpBtn, 0);
      jumpBtn.setPosition(winSize.width - 60, 40);
      jumpBtn.setOpacity(128);
      jumpBtn.setTag(3);


      cc.eventManager.addListener(listener, leftBtn);
      cc.eventManager.addListener(listener.clone(), rightBtn);
      cc.eventManager.addListener(listener.clone(), kenBtn);
      cc.eventManager.addListener(listener.clone(), jumpBtn);

      cc.eventManager.addListener(keylistener, this);

   }

});


var Player = cc.Sprite.extend({
   ctor: function() {
      this._super();
      this.workingFlag = false;
      this.xSpeed = 0;
      this.ySpeed = 0;
      this.atackFlag = false;
      this.jumpFlag = false;
      for (i = 0; i < 7; i++) {　　　　　　
         for (j = 0; j < 10; j++) {
            if (level[i][j] == 3) {
               this.setPosition(tileSize / 2 + tileSize * j, 96 * (7 - i) - tileSize / 2);
               playerPosition = {
                  x: j,
                  y: i
               };
            }
         }
      }
      //this.schedule(this.working,0.08);
      /*
        // 2.　SpriteFrame　を利用しての歩行アニメーション
          //スプライトフレームを格納する配列
          var animationframe = [];
          //スプライトフレームを作成
          var frame1 = new cc.SpriteFrame(res.player01_png, cc.rect(0, 0, 96, 96));
          var frame2 = new cc.SpriteFrame(res.player02_png, cc.rect(0, 0, 96, 96));
          //スプライトフレームを配列に登録
          animationframe.push(frame1);
          animationframe.push(frame2);
          //スプライトフレームの配列を連続再生するアニメーションの定義
          var animation = new cc.Animation(animationframe, 0.08);
          //永久ループのアクションを定義
          var action = new cc.RepeatForever(new cc.animate(animation));
          //実行
          this.runAction(action);
      */
      /*
          //３．テクスチャーからスプライトフレームを切り出す方法
              //スプライトフレームを格納する配列
              var texture = cc.textureCache.addImage(res.player_sheet);
              //スプライトフレームを作成
              var frame1 = new cc.SpriteFrame.createWithTexture(texture, cc.rect(0, 0, 96, 96));
              var frame2 = new cc.SpriteFrame.createWithTexture(texture, cc.rect(96, 0, 96, 96));
              //スプライトフレームを配列に登録
              var animationframe = [];
              animationframe.push(frame1);
              animationframe.push(frame2);
              //スプライトフレームの配列を連続再生するアニメーションの定義
              var animation = new cc.Animation(animationframe, 0.08);
              //永久ループのアクションを定義
              var action = new cc.RepeatForever(new cc.animate(animation));
              //実行
              this.runAction(action);
      */


      // スプライトシートをキャッシュに登録
      cc.spriteFrameCache.addSpriteFrames(res.player_plist, res.player_sheet);
      this.initWithFile(res.player_sheet);

      // スプライトフレームを取得 player01,player02はplistの中で定義されいいる
      var frame1 = cc.spriteFrameCache.getSpriteFrame("player01");
      var frame2 = cc.spriteFrameCache.getSpriteFrame("player02");
      var frame3 = cc.spriteFrameCache.getSpriteFrame("player03");
      var frame4 = cc.spriteFrameCache.getSpriteFrame("player04");

      var frame5 = cc.spriteFrameCache.getSpriteFrame("player05");
      var frame6 = cc.spriteFrameCache.getSpriteFrame("player06");
      var frame7 = cc.spriteFrameCache.getSpriteFrame("player07");

      var frame8 = cc.spriteFrameCache.getSpriteFrame("player08");
      var frame9 = cc.spriteFrameCache.getSpriteFrame("player09");
      var frame10 = cc.spriteFrameCache.getSpriteFrame("player10");
      var frame11 = cc.spriteFrameCache.getSpriteFrame("player11");


      //スプライトフレームを配列に登録
      var work_animationframe = [];
      work_animationframe.push(frame1);
      work_animationframe.push(frame2);
      work_animationframe.push(frame3);
      work_animationframe.push(frame4);

      //スプライトフレーム（攻撃）を配列に登録
      var atack_animationframe = [];
      atack_animationframe.push(frame5);
      atack_animationframe.push(frame6);
      atack_animationframe.push(frame7);

      //スプライトフレーム（攻撃）を配列に登録
      var jump_animationframe = [];
      jump_animationframe.push(frame8);
      jump_animationframe.push(frame9);
      jump_animationframe.push(frame10);
      jump_animationframe.push(frame11);

      //スプライトフレームの配列を連続再生するアニメーションの定義
      var work_animation = new cc.Animation(work_animationframe, 0.2);

      //スプライトフレームの配列を連続再生するアニメーションの定義
      var atack_animation = new cc.Animation(atack_animationframe, 0.2);
      atack_action = new cc.RepeatForever(new cc.animate(atack_animation));
      //atack_player = this.atack_action;

      //スプライトフレームの配列を連続再生するアニメーションの定義
      var jump_animation = new cc.Animation(jump_animationframe, 0.4);
      jump_action = new cc.RepeatForever(new cc.animate(jump_animation));

      //永久ループのアクションを定義
      work_action = new cc.RepeatForever(new cc.animate(work_animation));
      work_player = this.work_action;
      this.runAction(work_action);

      this.runAction(atack_action);
      this.stopAction(atack_action);

      this.runAction(jump_action);
      this.stopAction(jump_action);
      //永久ループのアクションを定義
      //var atackact = new cc.RepeatForever(new cc.animate(atackani));

      //実行


      /*//攻撃実行
      if(this.atackFlag == true){
      this.initWithFile(res.player_sheet);
      this.runAction(atackact);

    }*/

      this.scheduleUpdate();
   },


   //移動のため
   update: function(dt) {
      console.log(this.jumpFlag,this.workingFlag, this.ySpeed);

      if (this.xSpeed > 0) { //スピードが正の値（右方向移動）
         //　向きを判定させる
         this.setFlippedX(false);
      }
      if (this.xSpeed < 0) { //スピードが負の値（左方向移動）
         this.setFlippedX(true);
      }
      //プレイヤーを降下させる処理　ジャンプボタンが押されてないときで、プレイヤが空中にある場合
      if (this.jumpFlag == false) {
         if (this.getPosition().y < tileSize * 1.6) this.ySpeed = 0;
         else this.ySpeed = this.ySpeed - 0.5;

      }
      //位置を更新する
      this.setPosition(this.getPosition().x + this.xSpeed, this.getPosition().y + this.ySpeed);
      //衝突判定
      //var playerRect = this.player.getBoundingBox();
      //敵と衝突しているか
      //for(var i = 0; i < this.)
   }

   //攻撃のため
   /*update: function(dt) {
      console.log(this.atackFlag, this.ySpeed);

      if (this.xSpeed > 0) { //スピードが正の値（右方向移動）
         //　向きを判定させる
         this.setFlippedX(false);
      }
      if (this.xSpeed < 0) { //スピードが負の値（左方向移動）
         this.setFlippedX(true);
      }
      //プレイヤーを攻撃させる処理　攻撃ボタンが押されてないときで、プレイヤが空中にある場合
      if (this.jumpFlag == false) {
         if (this.getPosition().y < tileSize * 1.6) this.ySpeed = 0;
         else this.ySpeed = this.ySpeed - 0.5;

      }
      //位置を更新する
      this.setPosition(this.getPosition().x + this.xSpeed, this.getPosition().y + this.ySpeed);

   }*/


});


//タッチリスナーの実装
var listener = cc.EventListener.create({
   event: cc.EventListener.TOUCH_ONE_BY_ONE,
   // swallowTouches: true,

   onTouchBegan: function(touch, event) {
     key_seigyo = true;
      var target = event.getCurrentTarget();
      var location = target.convertToNodeSpace(touch.getLocation());
      var spriteSize = target.getContentSize();
      var spriteRect = cc.rect(0, 0, spriteSize.width, spriteSize.height);
      //タッチした場所が、スプライトの内部に収まっていたら
      if (cc.rectContainsPoint(spriteRect, location)) {
         console.log(target.getTag() + "Btnがタッチされました");

         //タッチしたスプライトが左ボタンだったら
         if (target.getTag()　 == 1) {
            player.xSpeed = -2.5;
            player.workingFlag = true;
            leftBtn.setOpacity(255);
            rightBtn.setOpacity(128);

            player.stopAction(atack_action);
            player.stopAction(jump_action);
            player.stopAction(work_action);
            player.runAction(work_action);
         } else {
            //タッチしたスプライトが右ボタンだったら
            if (target.getTag()　 == 2) {
               player.xSpeed = 2.5;
               player.workingFlag = true;
               rightBtn.setOpacity(255);
               leftBtn.setOpacity(128);

               player.stopAction(atack_action);
               player.stopAction(jump_action);
               player.stopAction(work_action);
               player.runAction(work_action);
            }
         }

         //タッチしたスプライトがジャンプボタンだったら
         if (target.getTag()　 == 3) {
            if (player.jumpFlag == false && player.ySpeed == 0) player.ySpeed = 9;
            player.jumpFlag = true;
            jumpBtn.setOpacity(255);
            player.stopAction(work_action);
            player.stopAction(atack_action);
            player.stopAction(jump_action);
            player.runAction(jump_action);
         }
         //タッチしたスプライトが剣ボタンだったら
         if (target.getTag()　 == 4) {
            if (player.atackFlag == false && player.ySpeed == 0) //player.ySpeed = 9;
            player.atackFlag = true;
            kenBtn.setOpacity(255);

            player.stopAction(work_action);
            player.stopAction(jump_action);
            player.stopAction(atack_action);
            player.runAction(atack_action);
            audioEngine.playEffect(res.ken_mp3);

          }
      }
      return true;
   },
   //タッチを止めたときは、移動スピードを0にする
   onTouchEnded: function(touch, event) {
      player.workingFlag = false;
      player.jumpFlag = false;
      player.atackFlag = false;
      player.xSpeed = 0;
      //player.ySpeed = 0;
      leftBtn.setOpacity(128);
      rightBtn.setOpacity(128);
      kenBtn.setOpacity(128);
      jumpBtn.setOpacity(128);
   }

});

//キーボードリスナーの実装
var keylistener = cc.EventListener.create({
   event: cc.EventListener.KEYBOARD,
   // swallowTouches: true,

   onKeyPressed: function(keyCode, event) {
     if(key_seigyo == false){
      if (keyCode == 65) { // a-Keyで左に移動
         player.xSpeed = -2.5;
         leftBtn.setOpacity(255);
         rightBtn.setOpacity(128);

         player.stopAction(atack_action);
         player.stopAction(jump_action);
         player.stopAction(work_action);
         player.runAction(work_action);
      }
      if (keyCode == 68) { // d-Keyで右に移動
         player.xSpeed = 2.5;
         rightBtn.setOpacity(255);
         leftBtn.setOpacity(128);

         player.stopAction(atack_action);
         player.stopAction(jump_action);
         player.stopAction(work_action);
         player.runAction(work_action);

      }
      if (keyCode == 87) { // w-Keyで攻撃
        if (player.atackFlag == false && player.ySpeed == 0)
        player.atackFlag = true;
        kenBtn.setOpacity(255);

        player.stopAction(work_action);
        player.stopAction(jump_action);
        player.stopAction(atack_action);
        player.runAction(atack_action);

        audioEngine.playEffect(res.ken_mp3);

      }
      if (keyCode == 32 ) { // スペースキーか上矢印キーでジャンプ
         if (player.jumpFlag == false && player.ySpeed == 0) player.ySpeed = 9;
         player.jumpFlag = true;
         jumpBtn.setOpacity(255);

         player.stopAction(work_action);
         player.stopAction(atack_action);
         player.stopAction(jump_action);
         player.runAction(jump_action);
      }
      return true;
    }
   },

   onKeyReleased: function(keyCode, event) {
      player.atackFlag= false;
      player.jumpFlag = false;
      key_seigyo = false;
      player.xSpeed = 0;
      //player.ySpeed = 0;
      leftBtn.setOpacity(128);
      rightBtn.setOpacity(128);
      kenBtn.setOpacity(128);
      jumpBtn.setOpacity(128);
   },

});
