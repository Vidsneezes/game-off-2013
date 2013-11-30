

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
			this.generatePath(2);
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

BasicGame.Game.prototype = {

        create: function () 
		{

                //        Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
				this.add.sprite(0,0,'Backgrounds_set1','background_1.png');
				
				this.game.world.setBounds(0, 0, 320, 480);
				//Text
				var style = { font: "25px Arial", fill: "#ff0044", align: "left" };

				this.totalScoreText = this.game.add.text(this.game.world.centerX, (this.game.world.height*2)/36, ''+ BasicGame.totalScore, style);

				this.totalScoreText.anchor.setTo(0.5, 0.5);
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
				
        },

        update: function () 
		{

                //        Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
				if(this.game.input.mousePointer.isDown)
				{
					if(this.game.input.x > this.player.x)
					{
						if(this.game.input.x - this.player.x >= 32)
						{
							this.player.body.velocity.x = 400;
						}else
						{
							this.player.body.velocity.x = 0;
						}
					}else 
					{
						if(this.player.x - this.game.input.x >= 32)
						{
							this.player.body.velocity.x = -400;
						}else
						{
							this.player.body.velocity.x = 0;
						}
					}
				}else
				{
					this.player.body.velocity.x = 0
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
        },
		
		collisionCollect: function(obj1, obj2)
		{
			this.game.add.tween(this.player.scale).to({y:0.5},200,Phaser.Easing.Cubic.In,true).to({y:1},200,Phaser.Easing.Cubic.In,true);
			BasicGame.totalScore += 1;
			this.totalScoreText.setText(BasicGame.totalScore+'');
			obj2.destroy();
		},
		
		collisionDestroy: function(obj1, obj2)
		{
			obj2.body = null;
			obj2.destroy();
		},

        quitGame: function (pointer) 
		{

                //        Here you should destroy anything you no longer need.
                //        Stop music, delete sprites, purge caches, free resources, all that good stuff.

                //        Then let's go back to the main menu.
                this.game.state.start('Over');

        },
		
		createDebris: function(item)
		{
			var randomer = this.game.rnd.realInRange(0,1);
			if(randomer <= 0.34)
			{
				var trash = this.activeTrash.create(0,0,'entities_0','objBomb.png');
				this.defineTrash(item,trash);
			} else if (randomer > 0.34 && randomer < 0.45)
			{
				var trash = this.activeTrash.create(0,0,'entities_0','objCat.png');
				this.defineTrash(item,trash);
			}else
			{
				var trash = this.activeTrash.create(0,0,'entities_0','objBag.png');
				this.defineTrash(item,trash);
			}
		},
		
		easyGame: function()
		{
			this.enemies.push(new this.DropperPlane(1,this.game, this.poolTrash));
		},
		
		mediumGame: function()
		{
			this.enemies.push(new this.DropperPlane(1,this.game, this.poolTrash));
			this.enemies.push(new this.DropperPlane(3,this.game, this.poolTrash));
			this.enemies.push(new this.DropperPlane(5,this.game, this.poolTrash));
		},
		
		hardGame:function()
		{
			this.enemies.push(new this.DropperPlane(1,this.game, this.poolTrash));
			this.enemies.push(new this.DropperPlane(3,this.game, this.poolTrash));
			this.enemies.push(new this.DropperPlane(5,this.game, this.poolTrash));
			this.enemies.push(new this.DropperPlane(7,this.game, this.poolTrash));
		},
		
		defineTrash: function(item,garbage)
		{
			garbage.body.x = item.y;
			garbage.body.x = item.x;
			garbage.body.velocity.y = 100;
			garbage.body.collideWorldBounds=true;
		}

};