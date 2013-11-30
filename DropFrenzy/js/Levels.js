BasicGame.Levels = function (game) {

        this.music = null;
        this.playButton = null;

};

BasicGame.Levels.prototype = {

        create: function () {
                this.add.sprite(0, 0, 'Backgrounds_set1','background_0.png');

                this.easyButton = this.add.button(this.game.width/2, (this.game.height*1)/4, 'buttons', function(){this.goBig(this.easyButton.scale,1);}, this, 'butEasy.png', 'butEasy.png', 'butEasy.png');
				this.easyButton.scale.setTo(0,0);
				this.easyButton.anchor.setTo(0.5,0.5);
				
				 this.mediumButton = this.add.button(this.game.width/2, (this.game.height*2)/4, 'buttons',  function(){this.goBig(this.mediumButton.scale,2);}, this, 'butMedium.png', 'butMedium.png', 'butMedium.png');
				this.mediumButton.scale.setTo(0,0);
				this.mediumButton.anchor.setTo(0.5,0.5);
				
				 this.hardButton = this.add.button(this.game.width/2, (this.game.height*3)/4, 'buttons',  function(){this.goBig(this.hardButton.scale,3);}, this, 'butHard.png', 'butHard.png', 'butHard.png');
				this.hardButton.scale.setTo(0,0);
				this.hardButton.anchor.setTo(0.5,0.5);
				
				this.startTweening(this.easyButton.scale,0);
				this.startTweening(this.mediumButton.scale,500);
				this.startTweening(this.hardButton.scale,1000);
				
				this.clicked = false;
        },

        update: function () {

                //        Do some nice funky main menu effect here

        },

        startGame: function () {
                //        And start the actual game
                this.game.state.start('Game');

        },
		
		startTweening: function(item, delay){
			delay = delay || 0;
			this.game.add.tween(item).to({x : 5,y:5},400,Phaser.Easing.Bounce.Out,false,delay).to({x : 0.85,y:0.85},1300,Phaser.Easing.Bounce.Out).start().onComplete.add(function(){this.game.add.tween(item).to({x:0.85,y:0.85},1000,Phaser.Easing.Quadratic.Out).to({x : 1,y:1},900,Phaser.Easing.Quadratic.Out).loop().start();}, this);
		},
		
		goBig: function(item, difficulty){ 
			if(this.clicked == false)
			{
			this.clicked = true;
			this.tweens.removeAll();
			this.easyButton.scale.setTo(0,0);
			this.mediumButton.scale.setTo(0,0);
			this.hardButton.scale.setTo(0,0);
			BasicGame.difficulty = difficulty;
			this.game.add.tween(item).to({x:3,y:3},1000,Phaser.Easing.Quadratic.Out).start().onComplete.addOnce(this.startGame, this);
			}
		}
		
		

};