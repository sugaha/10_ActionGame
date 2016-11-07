var slimer;

var slimerLayer = cc.Layer.extend({
   ctor: function() {
      this._super();
      slimer = new slimer();
      this.addChild(slimer);


   }

});


var slimer = cc.Sprite.extend({
   ctor: function() {
      this._super();
      this.initWithFile(res.slimer_frames);
      this.velocity = cc.p(0,0);
      this.FrameCount = 0;

      for (i = 0; i < 7; i++) {　　　　　　
         for (j = 0; j < 10; j++) {
            if (level[i][j] == 7) {
               this.setPosition(tileSize / 2 + tileSize * j, 96 * (7 - i) - tileSize / 2);
               slimerPosition = {
                  x: j,
                  y: i
               };
            }
         }
      }

      // スプライトシートをキャッシュに登録
      cc.spriteFrameCache.addSpriteFrames(res.slimer_plist, res.slimer_frames);

      // スプライトフレームを取得 slimer01,slimer02はplistの中で定義されいいる
      var frame1 = cc.spriteFrameCache.getSpriteFrame("slimer01");
      var frame2 = cc.spriteFrameCache.getSpriteFrame("slimer02");
      var frame3 = cc.spriteFrameCache.getSpriteFrame("slimer03");
      var frame4 = cc.spriteFrameCache.getSpriteFrame("slimer04");
      var frame5 = cc.spriteFrameCache.getSpriteFrame("slimer05");
      var frame6 = cc.spriteFrameCache.getSpriteFrame("slimer06");
      var frame7 = cc.spriteFrameCache.getSpriteFrame("slimer07");
      var frame8 = cc.spriteFrameCache.getSpriteFrame("slimer08");
      var frame9 = cc.spriteFrameCache.getSpriteFrame("slimer09");
      var frame10 = cc.spriteFrameCache.getSpriteFrame("slimer10");
      var frame11 = cc.spriteFrameCache.getSpriteFrame("slimer11");
      var frame12 = cc.spriteFrameCache.getSpriteFrame("slimer12");
  

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


      //スプライトフレームの配列を連続再生するアニメーションの定義
      var animation = new cc.Animation(animationframe, 0.2);
      var action = new cc.RepeatForever(new cc.animate(animation));


      this.initWithFile(res.slimer_frames);
      this.runAction(action);

      this.scheduleUpdate();
   },


   //移動のため
   update: function(dt) {
      this.FrameCount++;
      //ゾンビ移動計算　４フレーム中１
      if(this.FrameCount % 4　== 0){
        var offset_x = slimer.getPosition().x - this.getPosition().x;
        var offset_y = slimer.getPosition().y - this.getPosition().y;
      }
   }

});
