BasicGame.Game = function (game) {
	this.DropperPlane = function(index, game, pool)
	{
		var drops = [];
		this.game = game;
		this.pool = pool;
		var x = 0-40;
		var y = ((game.height*index)/20);
		this.plane = game.add.sprite(x,y,'entities_0','objEnemyRight.png');
		this.plane.anchor.setTo(0.5,0.5);
		this.destination = 0;
		this.going = 0;
		this.Path = [];
		this.initiate(0);
	}

	this.DropperPlane.prototype = {
		initiate :function(numberDrops)
		{
			var side = this.game.rnd.realInRange(0,1);
			
			if(side > 0.5){
				this.plane.x = 0-this.plane.body.width;
				this.destination = this.game.world.width+this.game.rnd.integerInRange(50,60);
				this.plane.frameName = 'objEnemyRight.png';
				this.going = 1;
				this.plane.body.velocity.x = (this.game.rnd.integerInRange(300,600));
			}else{
				this.plane.x = this.game.world.width+this.plane.body.width;
				this.destination = 0-this.game.rnd.integerInRange(50,60);
				this.plane.frameName = 'objEnemyLeft.png';
				this.going = 0;
				this.plane.body.velocity.x = -(this.game.rnd.integerInRange(300,600));
			}
			this.generatePath(this.game.rnd.integerInRange(1,3));
		},
		
		generatePath: function(amountPoints)
		{
				var newPoint = 0;
				var prevPoint = 0;
				for(var i = 0; i < amountPoints; i++)
				{
					newPoint = (this.game.width*this.game.rnd.integerInRange(5,195))/200;
					if(newPoint > prevPoint)
					{
						var distance = newPoint - prevPoint;
						if( distance > 64)
						{
							this.Path.push(newPoint);
						}else
						{
							this.Path.push(newPoint+64);
						}
					}else
					{
						var distance = prevPoint - newPoint;
						if( distance > 64)
						{
							this.Path.push(newPoint);
						}else
						{
							this.Path.push(newPoint-64);
						}
					}
					
					prevPoint = newPoint;
				}
				if(this.going == 1)
				{
					this.Path.sort(function(a,b){return a-b});
				}else
				{
					this.Path.sort(function(a,b){return b-a});
				}
		},

		runPath : function()
		{
			if(this.going == 1){
				if(this.plane.x >= this.destination){
					this.initiate(0);
				}
			}else{
				if(this.plane.x <= this.destination){
					this.initiate(0);
				}
			}
			
			this.checkPath();
			
		
		},
		
		checkPath: function()
		{
			if(this.going == 1)
			{
				for(var i = 0; i < this.Path.length; i++)
				{
					if(this.plane.x >= this.Path[i])
					{
						this.Path.splice(i,1);
						this.game.add.tween(this.plane.scale).to({x: 2, y : 2},100,Phaser.Easing.Cubic.In, true).to({x: 1, y : 1},100,Phaser.Easing.Cubic.In, true);
						this.game.add.tween(this.plane).to({angle: 45},100,Phaser.Easing.Cubic.In, true).to({angle: 0},100,Phaser.Easing.Cubic.In, true);
						this.pool.push({x: this.plane.x,y:this.plane.y});
					}
				}
			}else
			{
				for(var i = 0; i < this.Path.length; i++)
				{
					if(this.plane.x <= this.Path[i])
					{
						this.Path.splice(i,1);
						this.game.add.tween(this.plane.scale).to({x: 2, y:2},100,Phaser.Easing.Cubic.In, true).to({x: 1, y : 1},100,Phaser.Easing.Cubic.In, true);
						this.game.add.tween(this.plane).to({angle: 45},100,Phaser.Easing.Cubic.In, true).to({angle: 0},100,Phaser.Easing.Cubic.In, true);
						this.pool.push({x: this.plane.x,y:this.plane.y});
					}
				}
			}
		}
	}
	
};

//Game logic below

BasicGame.Game.prototype = {

        create: function () 
		{

                //        Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
				this.game.add.sprite(0,0,'Backgrounds_set1','background_1.png');
				
				//Logic
				this.difficultyAmpl = 0;
				BasicGame.difficulty2 = -0.34
				BasicGame.totalScore = 0;
				BasicGame.prevScore = 0;
				this.totalCollected = 0;
				this.tillNextLevel = 5;
				this.life = 3;
				this.gameOver = false;
				
				this.game.world.setBounds(0, 0, 320, 480);
				//Ui
				var style = { font: "32px Verdana", fill: "#DE915C", align: "center", stroke: "#0066CC", strokeThickness:5 };
				var style2 = { font: "26px Verdana", fill: "#DE915C", align: "left", stroke: "#0066CC", strokeThickness:3 };

				this.totalScoreText = this.game.add.text(this.game.world.centerX, (this.game.world.height)/18, ''+ BasicGame.totalScore, style);

				this.totalScoreText.anchor.setTo(0.5, 0.5);
				
				this.currentLevelText = this.game.add.text((this.game.world.width*4)/12, (this.game.world.height*14)/15, ''+ BasicGame.level, style2);

				this.currentLevelText.anchor.setTo(0.5, 0.5);
				
				this.simpleText = this.game.add.text((this.game.world.width*2)/14, (this.game.world.height*14)/15, 'Level', style2);

				this.simpleText.anchor.setTo(0.5, 0.5);
				
				this.pauseButton = this.add.button((this.game.width*12)/14, (this.game.height)/12, 'buttons',this.paused, this, 'butPause.png', 'butPause.png', 'butPause.png');
				this.pauseButton.anchor.setTo(0.5,0.5);
				
				this.restartButton = this.add.button((this.game.width)/2, (this.game.height*2)/7, 'buttons',function(){this.restartGame()}, this, 'butRestart.png', 'butRestart.png', 'butRestart.png');
				this.restartButton.anchor.setTo(0.5,0.5);
				this.restartButton.inputEnabled = false;
				
				this.menuButton = this.add.button((this.game.width)/2, (this.game.height*5)/7, 'buttons',function(){this.restartMenu()}, this, 'butMenu.png', 'butMenu.png', 'butMenu.png');
				this.menuButton.anchor.setTo(0.5,0.5);
				this.menuButton.inputEnabled = false;
				
				//this.uiGroup.bringToTop();
				//Player
				
				this.player = this.add.sprite(this.game.world.width/2, (this.game.world.height*9)/10,'entities_0','sprPlayer_0.png');
				this.player.anchor.setTo(0.5,1);
				this.player.body.y = (this.game.world.height*9)/10;
				this.player.body.immovable = true;
				this.player.body.collideWorldBounds=true;
				//Bounds
				
				this.hitBorder = this.add.sprite(this.game.world.width/2,this.game.world.height,'hitBorder');
				this.hitBorder.anchor.setTo(0.5,0.5);
				this.hitBorder.body.y = this.game.world.height;
				this.hitBorder.body.immovable = true;
				this.hitBorder.body.collideWorldBounds=true;
				this.hitBorder.visible = false;
				this.enemies =[];
				this.poolTrash = [];
				this.activeTrash = this.game.add.group();
				switch(BasicGame.difficulty )
				{
					case 1: this.easyGame();break;
					case 2: this.mediumGame();break;
					case 3: this.hardGame();break;
				}
				this.uiGroup = this.game.add.group();
				this.uiGroup.add(this.totalScoreText);
				this.uiGroup.add(this.pauseButton);
				this.uiGroup.add(this.currentLevelText);
				this.uiGroup.add(this.simpleText);
				
				this.uiPauseGroup = this.game.add.group();
				this.uiPauseGroup.add(this.menuButton);
				this.uiPauseGroup.add(this.restartButton);
				this.uiPauseGroup.visible = false;
        },

        update: function () 
		{

                //        Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
				this.player.body.velocity.x = 0;
				if(this.game.input.activePointer.isDown)
				{
					if(this.game.input.x > this.player.x)
					{
						if(this.game.input.x - this.player.x >= 32)
						{
							this.player.body.velocity.x = 400;
						}
					}else 
					{
						if(this.player.x - this.game.input.x >= 32)
						{
							this.player.body.velocity.x = -400;
						}
					}
				}
				for(var i = 0; i< this.enemies.length;i++)
				{
					this.enemies[i].runPath();
				}
				
				if(this.poolTrash.length > 0)
				{
					var objectTrashed = this.poolTrash.pop();
					this.createDebris(objectTrashed);
				}
				
				this.game.physics.collide(this.player, this.activeTrash, this.collisionCollect, null, this);
				this.game.physics.collide(this.hitBorder, this.activeTrash, this.collisionDestroy, null, this);
				if(BasicGame.prevScore < BasicGame.totalScore)
				{
					BasicGame.prevScore += 1;
					this.totalScoreText.setText(BasicGame.prevScore+'');
				}
				this.currentLevelText.setText(BasicGame.level+'');
				if(this.life < 1)
				{
					this.player.destroy();
					this.quitGame();
				}
        },
		
		collisionCollect: function(obj1, obj2)
		{
			if(obj2.collidable == true)
			{
				obj2.collidable = false;
				this.game.add.tween(this.player.scale).to({y:0.5},100,Phaser.Easing.Cubic.In,true).to({y:1},200,Phaser.Easing.Cubic.In,true);
				if(obj2.gainPoints == true)
				{
					this.difficultyLogic();
					obj2.body.velocity.y = -200;
					this.addSparkleAni(obj2);
					obj2.animations.play('sparkle',45,false,true);
				}else
				{
					this.life -= 1;
					obj2.body.velocity.y = -200;
					this.addExplosionAni(obj2);
					obj2.animations.play('explode',45,false,true);
				}
			}
		},
		
		collisionDestroy: function(obj1, obj2)
		{
			if(obj2.collidable == true)
			{
				obj2.collidable = false;
				obj2.body.velocity.y = -200;
				this.addExplosionAni(obj2);
				obj2.animations.play('explode',45,false,true);
			}
		},
		
		difficultyLogic: function()
		{
			if(BasicGame.totalScore < 999999)
			{
				BasicGame.totalScore += this.game.rnd.integerInRange(21,46);
				var txTempy = (this.game.world.height)/18;
				this.game.add.tween(this.totalScoreText).to({y : (txTempy -20)}, 200,Phaser.Easing.Bounce.In).to({y:(txTempy)},200,Phaser.Easing.Bounce.Out).start();
			}else
			{
				BasicGame.totalScore = 999999;
			}
			this.tillNextLevel -= 1;
			if(this.tillNextLevel < 1)
			{
				this.tillNextLevel =5;
				BasicGame.difficutly2 += this.difficultyAmpl;
				BasicGame.level += 1;
				var tempy = this.currentLevelText.y;
				this.game.add.tween(this.currentLevelText).to({y : (tempy -20)}, 200,Phaser.Easing.Bounce.In).to({y:(tempy)},200,Phaser.Easing.Bounce.Out).start();
			}
			
		},

        quitGame: function () 
		{

                //        Here you should destroy anything you no longer need.
                //        Stop music, delete sprites, purge caches, free resources, all that good stuff.

                //        Then let's go back to the main menu.
                this.game.state.start('GameOver');

        },
		
		createDebris: function(item)
		{
			var randomer = this.game.rnd.realInRange(0,1);
			if(randomer <= 0.5+BasicGame.difficulty2)
			{
				this.turnExplosive(item);
			} else
			{
				this.turnCollectable(item);
			}
		},
		
		easyGame: function()
		{
			this.enemies.push(new this.DropperPlane(1,this.game, this.poolTrash));
			this.difficultyAmpl = 0.08
		},
		
		mediumGame: function()
		{
			this.enemies.push(new this.DropperPlane(1,this.game, this.poolTrash));
			this.enemies.push(new this.DropperPlane(3,this.game, this.poolTrash));
			this.difficultyAmpl = 0.04
		},
		
		hardGame:function()
		{
			this.enemies.push(new this.DropperPlane(1,this.game, this.poolTrash));
			this.enemies.push(new this.DropperPlane(3,this.game, this.poolTrash));
			this.enemies.push(new this.DropperPlane(5,this.game, this.poolTrash));
			this.difficultyAmpl = 0.02
		},
		
		defineCollectable: function(item,garbage)
		{
			garbage.body.x = item.y;
			garbage.body.x = item.x;
			garbage.body.velocity.y = this.game.rnd.integerInRange(100,300);
			garbage.body.collideWorldBounds=true;
			garbage.gainPoints = true;
			garbage.collidable = true;
		},
		
		defineExplosive: function(item,garbage)
		{
			garbage.body.x = item.y;
			garbage.body.x = item.x;
			garbage.body.velocity.y = this.game.rnd.integerInRange(100,300);
			garbage.body.collideWorldBounds=true;
			garbage.gainPoints = false;
			garbage.collidable = true;
		},
		
		turnCollectable: function(item)
		{
			var randomers = this.game.rnd.realInRange(0,1);
			if(randomers <= 0.34){var collectable = this.activeTrash.create(0,0,'objects_0','objCat.png');}
			else if(randomers > 0.34 && randomers <= 0.63){var collectable = this.activeTrash.create(0,0,'objects_0','objBag.png');}
			else{var collectable = this.activeTrash.create(0,0,'objects_0','objTelevision.png');}
			this.defineCollectable(item,collectable);
		},
		
		turnExplosive: function(item)
		{
			var randomers = this.game.rnd.realInRange(0,1);
			if(randomers >= 0.49){var explosive = this.activeTrash.create(0,0,'objects_0','objBomb.png');}
			else{var explosive = this.activeTrash.create(0,0,'objects_0','objDinamite.png');}
			this.defineExplosive(item,explosive);
		},
		
		paused: function()
		{
			if(this.uiPauseGroup.visible == false)
			{
				this.uiPauseGroup.visible = true;
				this.restartButton.inputEnabled = true;
				this.menuButton.inputEnabled = true;
				this.player.exists = false;
				for(var j = 0; j < this.enemies.length; j++)
				{
					this.enemies[j].plane.exists = false;
				}
				this.activeTrash.forEach(function(item){item.exists = false;},this);
			}else
			{
				this.uiPauseGroup.visible = false;
				this.restartButton.inputEnabled = false;
				this.menuButton.inputEnabled = false;
				this.player.exists = true;
				for(var j = 0; j < this.enemies.length; j++)
				{
					this.enemies[j].plane.exists = true;
				}
				this.activeTrash.forEach(function(item){item.exists = true;},this);
			}
		},
		
		restartGame: function()
		{
			   this.game.state.start('Game');
		},
		
		restartMenu: function()
		{
			   this.game.state.start('Menu');
		},
		
		addExplosionAni: function(item)
		{
			item.animations.add('explode',Phaser.Animation.generateFrameNames('redEx_',0,5,'.png',1),30,false);
		},
		
		addSparkleAni: function(item)
		{
			item.animations.add('sparkle',Phaser.Animation.generateFrameNames('sparkle_',0,5,'.png',1),30,false);
		},
		
		addShockAni: function(item)
		{
			item.animations.add('shock',Phaser.Animation.generateFrameNames('whiteEx_',0,5,'.png',1),30,false);
		}

};