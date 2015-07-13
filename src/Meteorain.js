var Meteorain = function () {
	this.meteors = [];
	this.angle   = -30;
	this.shipSpeed = 0.01;
	this.die = null;
}

Meteorain.prototype.generate = function(count, layer) {
	for (var i = 0; i < count; ++i) {
		var meteor = new Meteor();
		meteor.speed = Math.random() * 4;
		meteor.addToLayer(layer);
		this.meteors.push(meteor);
	}
}

Meteorain.prototype.shipMove = function (dx,dy,dz) {
	var newSpeed = this.shipSpeed - dz;
	if (newSpeed > 0) {
		this.shipSpeed = newSpeed;
	}
	for (var i = 0; i < this.meteors.length; ++i) {
		var meteor = this.meteors[i];
		meteor.x += dx;
		meteor.y -= dy;
	}
}

Meteorain.prototype.checkCrash = function () {
	for (var i = 0; i < this.meteors.length; ++i) {
		if (this.meteors[i].checkCrash()) {
			return true;
		}
	}
	return false;
}

Meteorain.prototype.updatePositions = function () {
	for (var i = 0; i < this.meteors.length; ++i) {
		var meteor = this.meteors[i];
		meteor.updatePositionAccordingToAngle(this.angle * Math.PI / 180, this.shipSpeed);
		meteor.checkSensitivity();
	}
}

Meteorain.prototype.setInterval = function (time, layer) {
	var thiz = this;
	this.interval = setInterval( 
		function() { 
			thiz.updatePositions(); 
			thiz.angle     += 0.2  * (0.5 - Math.random()); 
			thiz.shipSpeed += 0.01 * (0.5 - Math.random());
			if (thiz.checkCrash()) {
				if (thiz.die == null) {
					var die = new cc.LabelTTF("Ship crashed!", "Arial", 60);
					var size = cc.winSize;
					die.x = size.width / 2;
					die.y = size.height / 2;
					thiz.die = die;
					layer.addChild(die);
				}
			}
		}, time);
}

Meteorain.prototype.reset = function (layer) {
	for (var i = 0; i < this.meteors.length; ++i) {
		var meteor = this.meteors[i];
		layer.removeChild(meteor.particle);
	}
	if (this.die) {
		layer.removeChild(this.die);
		this.die = null;
	}
	this.angle   = -30;
	this.shipSpeed = 0.01;
	this.meteors = [];
	this.generate(10, layer);
}
