BasicGame.Menu = function (game) {

        this.music = null;
        this.playButton = null;

};

BasicGame.Menu.prototype = {

        create: function () {

                //        We've already preloaded our assets, so let's kick right into the Main Menu itself
                //        Here all we're doing is playing some music and adding a picture and button
                //        Naturally I expect you to do something significantly better :)
				
                this.music = this.add.audio('titleMusic');
                //this.music.play();
                this.add.sprite(0, 0, 'Backgrounds_set1','background_0.png');

                this.playButton = this.add.button(this.game.width/2, (this.game.height*3)/4, 'buttons', this.goBig, this, 'butPlay.png', 'butPlay.png', 'butPlay.png');
				this.playButton.scale.setTo(0,0);
				this.playButton.anchor.setTo(0.5,0.5);
				
				this.game.add.tween(this.playButton.scale).to({x : 1.2,y:1.2},400,Phaser.Easing.Bounce.Out).to({x:0.75,y:0.75},900,Phaser.Easing.Bounce.In).to({x : 1,y:1},1300,Phaser.Easing.Bounce.Out).start().onComplete.addOnce(this.goPulse, this);

        },

        update: function () {

                //        Do some nice funky main menu effect here

        },

        startGame: function (pointer) {

                //        Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
                this.music.stop();

                //        And start the actual game
                this.game.state.start('LevelSelect');

        },
		
		goPulse: function(){
			this.tweens.removeAll();
			this.game.add.tween(this.playButton.scale).to({x:0.85,y:0.85},1000,Phaser.Easing.Quadratic.Out).to({x : 1,y:1},900,Phaser.Easing.Quadratic.Out).loop().start();
		},
		
		goBig: function(){
			this.tweens.removeAll();
			this.game.add.tween(this.playButton.scale).to({x:3,y:3},300,Phaser.Easing.Quadratic.Out).start().onComplete.addOnce(function(){this.startGame();}, this);
		}
		
		

};