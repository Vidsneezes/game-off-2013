BasicGame.GameOver = function (game) {

        this.music = null;
        this.replayButton = null;
		this.menuButton = null;
		this.skillBar = null;

};

BasicGame.MainMenu.prototype = {

        create: function () {

                //        We've already preloaded our assets, so let's kick right into the Main Menu itself
                //        Here all we're doing is playing some music and adding a picture and button
                //        Naturally I expect you to do something significantly better :)

                this.music = this.add.audio('titleMusic');
                this.music.play();
                this.add.sprite(0, 0, 'Backgrounds_set1','background_0');

                this.playButton = this.add.button(this.game.width/5, (this.game.height*3)/4, 'buttons', this.startGame, this, 'butPlay.png', 'butPlay.png', 'butPlay.png');
		
        },

        update: function () {

                //        Do some nice funky main menu effect here

        },

        startGame: function (pointer) {

                //        Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
                this.music.stop();

                //        And start the actual game
                this.game.state.start('Game');

        }

};