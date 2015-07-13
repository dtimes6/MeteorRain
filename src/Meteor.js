var Meteor = function () {
	this.particle = new cc.ParticleMeteor();
	this.x = -1;
	this.y = -1;
	this.z = -1;
	this.angle = null;
	this.scale = 0;
	this.speed = 0;
}

Meteor.prototype.addToLayer = function (layer) {
	layer.addChild(this.particle);
}

Meteor.prototype.updatePosition = function () {
	this.particle.x = this.x;
	this.particle.y = this.y;
	this.scale = 50.0 / this.z;
	this.particle.setScale(this.scale);
}

Meteor.prototype.checkBoundary = function (angle) {
	var size = cc.winSize;
	if (this.x < -size.width || this.x > size.width * 2 ||
		this.y < 0 ||
		this.z <= 0) {
		this.x = Math.random() * size.width * 3 - size.width;
		this.y = size.height;
		this.z = Math.random() * 1000 + 40;
		this.angle = angle;
		return false;
	}
	return true;
}

Meteor.prototype.updatePositionAccordingToAngle = function (angle, shipSpeed) {
	if (this.checkBoundary(angle)) {
		this.x += this.speed * Math.cos(this.angle);
		this.y += this.speed * Math.sin(this.angle);
		this.z -= shipSpeed;
	}
	this.updatePosition();
}

Meteor.prototype.checkCrash = function () {
	var size = cc.winSize;
	var magic = 0.1;
	if (this.z < 0 && 
		this.x > size.width  * magic && this.x < size.width  * (1 - magic) &&
		this.y > size.height * magic && this.y < size.height * (1 - magic)) {
		return true;
	}
	return false;
}

Meteor.prototype.checkSensitivity = function () {
	var size = cc.winSize;
	if (this.z > 0 && this.z < 255 &&
		this.x > 0 && this.x < size.width &&
		this.y > 0 && this.y < size.height) {
		this.particle.setStartColor(cc.color(0,0,0,255));
		this.particle.setEndColor(cc.color(255,this.z / 2,0,255));
		//this.particle.setEmissionRate(1000.0);
	}
}