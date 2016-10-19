var res = {
   player_sheet: "res/sir_awesome_frames.png",
   player_plist: "res/player.plist",
   ground_png: "res/background_front.png",
   background_png: "res/background_back.png",
   ui_panel_png:"res/ui_panels.png",
   ui_gauge_png:"res/ui_gauge_fill.png",
   bat_frames: "res/bat_frames.png",
   slime_frames:"res/slime_green_frames.png",
   zombie_frames:"res/zombie_frames.png",
   leftbutton_png: "res/leftbutton.png",
   rightbutton_png: "res/rightbutton.png",

};

var g_resources = [];
for (var i in res) {
   g_resources.push(res[i]);
}
