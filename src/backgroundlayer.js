
var BackgroundLayer = cc.LayerColor.extend({
	sprite:null,
	ctor:function () {
		var color = cc.color(0,0,0, 255);
		var layer = this;
		
		this._super(color);
		
		var dr = 1;	
		var dg = 1;
		var db = 1;
		
		var tick = function () {
			var colorShift = [
				function() {
					color.r += dr;
					if (color.r == 64 || color.r == 0) {
						dr = -dr;
					}
				},
				function() {
					color.g += dg;
					if (color.g == 64 || color.g == 0) {
						dg = -dg;
					}
				},
				function() {
					color.b += db;
					if (color.b == 64 || color.b == 0) {
						db = -db;
					}
				}];
			var sel = Math.floor(Math.random() * 1000) % 3;
			colorShift[sel]();
			layer.setColor(color);
		}
		setInterval(tick, 1);
	}
});