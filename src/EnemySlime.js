var slimeg;

var slimegLayer = cc.Layer.extend({
   ctor: function() {
      this._super();
      slimeg = new Slimeg();
      this.addChild(slimeg);


   }

});


var Slimeg = cc.Sprite.extend({
   ctor: function() {
      this._super();
      this.initWithFile(res.slimeg_frames);
      this.velocity = cc.p(0,0);
      this.FrameCount = 0;

      for (i = 0; i < 7; i++) {　　　　　　
         for (j = 0; j < 10; j++) {
            if (level[i][j] == 6) {
               this.setPosition(tileSize / 2 + tileSize * j, 96 * (7 - i) - tileSize / 2);
               slimegPosition = {
                  x: j,
                  y: i
               };
            }
         }
      }

      // スプライトシートをキャッシュに登録
      cc.spriteFrameCache.addSpriteFrames(res.slimeg_plist, res.slimeg_frames);

      // スプライトフレームを取得 slimeg01,slimeg02はplistの中で定義されいいる
      var frame1 = cc.spriteFrameCache.getSpriteFrame("slimeg01");
      var frame2 = cc.spriteFrameCache.getSpriteFrame("slimeg02");
      var frame3 = cc.spriteFrameCache.getSpriteFrame("slimeg03");
      var frame4 = cc.spriteFrameCache.getSpriteFrame("slimeg04");
      var frame5 = cc.spriteFrameCache.getSpriteFrame("slimeg05");
      var frame6 = cc.spriteFrameCache.getSpriteFrame("slimeg06");
      var frame7 = cc.spriteFrameCache.getSpriteFrame("slimeg07");
      var frame8 = cc.spriteFrameCache.getSpriteFrame("slimeg08");
      var frame9 = cc.spriteFrameCache.getSpriteFrame("slimeg09");
      var frame10 = cc.spriteFrameCache.getSpriteFrame("slimeg10");
      var frame11 = cc.spriteFrameCache.getSpriteFrame("slimeg11");
      var frame12 = cc.spriteFrameCache.getSpriteFrame("slimeg12");
      var frame13 = cc.spriteFrameCache.getSpriteFrame("slimeg13");
      var frame14 = cc.spriteFrameCache.getSpriteFrame("slimeg14");
      var frame15 = cc.spriteFrameCache.getSpriteFrame("slimeg15");
      var frame16 = cc.spriteFrameCache.getSpriteFrame("slimeg16");


      //スプライトフレームを配列に登録
      var animationframe = [];
      animationframe.push(frame1);
      animationframe.push(frame2);
      animationframe.push(frame3);
      animationframe.push(frame4);
      animationframe.push(frame5);
      animationframe.push(frame6);
      animationframe.push(frame7);
      animationframe.push(frame8);
      animationframe.push(frame9);
      animationframe.push(frame10);
      animationframe.push(frame11);
      animationframe.push(frame12);
      animationframe.push(frame13);
      animationframe.push(frame14);
      animationframe.push(frame15);
      animationframe.push(frame16);

      //スプライトフレームの配列を連続再生するアニメーションの定義
      var animation = new cc.Animation(animationframe, 0.2);
      var action = new cc.RepeatForever(new cc.animate(animation));


      this.initWithFile(res.slimeg_frames);
      this.runAction(action);

      this.scheduleUpdate();
   },


   //移動のため
   update: function(dt) {
      this.FrameCount++;
      //ゾンビ移動計算　４フレーム中１
      if(this.FrameCount % 4　== 0){
        var offset_x = slimeg.getPosition().x - this.getPosition().x;
        var offset_y = slimeg.getPosition().y - this.getPosition().y;
      }
   }

});
