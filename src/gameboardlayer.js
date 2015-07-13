var GameBoardLayer = cc.Layer.extend({
	sprite:null,
	ctor:function () {
		//////////////////////////////
		// 1. super init first
		this._super();
		var size = cc.winSize;

		var label = new cc.LabelTTF("Meteor Rain", "Arial", 38);
		// position the label on the center of the screen
		label.x = size.width / 2;
		label.y = 0;
		// add the label as a child to this layer
		this.addChild(label, 5);
		label.runAction(
				cc.spawn(
						cc.moveBy(2.5, cc.p(0, size.height - 40)),
						cc.tintTo(2.5,255,125,0)
				)
		);

		/*
		// add "HelloWorld" splash screen"
		this.sprite = new cc.Sprite(res.HelloWorld_png);
		this.sprite.attr({
			x: size.width / 2,
			y: size.height / 2,
			scale: 0.5,
			rotation: 180
		});
		this.addChild(this.sprite, 0);


		this.sprite.runAction(
				cc.sequence(
						cc.rotateTo(2, 0),
						cc.scaleTo(2, 1, 1)
				)
		);
		*/
		
		var rain = new Meteorain();
		rain.setInterval(1, this);
		
		var layer = this;
		rain.generate(10, layer);
		setInterval(function () { if(rain.meteors.length < 100) { rain.generate(10, layer); } }, 10000);
		
		cc.inputManager.setAccelerometerInterval(1/30);
		cc.inputManager.setAccelerometerEnabled(true);
		cc.eventManager.addListener({
			event: cc.EventListener.ACCELERATION,
			callback: function(accelEvent, event){
				var target = event.getCurrentTarget();
				//cc.log('Accel x: '+ accelEvent.x + ' y:' + accelEvent.y + ' z:' + accelEvent.z + ' time:' + accelEvent.timestamp );

				var w = size.width;
				var h = size.height;

				var x = -10 * accelEvent.x;
				var y = -accelEvent.y;
				var z = accelEvent.z * 0.01;
				rain.shipMove(x,y,z);
			}
		}, this);
		
		
		/////////////////////////////
		// 2. add a menu item with "X" image, which is clicked to quit the program
		//    you may modify it.
		// ask the window size

		// add a "close" icon to exit the progress. it's an autorelease object
		var resetItem = new cc.MenuItemImage(
				res.CloseNormal_png,
				res.CloseSelected_png,
				function () {
					rain.reset(layer);
				}, this);
		resetItem.attr({
			x: size.width - 20,
			y: 20,
			anchorX: 0.5,
			anchorY: 0.5
		});

		var menu = new cc.Menu(resetItem);
		menu.x = 0;
		menu.y = 0;
		this.addChild(menu, 1);
		
		return true;
	}
});