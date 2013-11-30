BasicGame.Preloader = function (game) {

        this.background = null;
        this.preloadBar = null;

        this.ready = false;

};

BasicGame.Preloader.prototype = {

        preload: function () {

                //        These are the assets we loaded in Boot.js
                //        A nice sparkly background and a loading progress bar
                this.background = this.add.sprite(0, 0, 'preloader','preloader_background.png');
                this.preloadBar = this.add.sprite((this.game.width)/12, (this.game.height*7)/9, 'preloader','preloader_bar.png');

                //        This sets the preloadBar sprite as a loader sprite, basically
                //        what that does is automatically crop the sprite from 0 to full-width
                //        as the files below are loaded in.
                this.load.setPreloadSprite(this.preloadBar);

                //        Here we load most of the assets our game needs
				//Backgrounds
				this.load.atlas('Backgrounds_set1', 'assets/placeholder/backgrounds/Backgrounds_set1.png', 'assets/placeholder/backgrounds/Backgrounds_set1.json');
				//Sprites
				this.load.atlas('entities_0','assets/placeholder/sprites/entities.png','assets/placeholder/sprites/entities.json');
				this.load.image('hitBorder', 'assets/placeholder/sprites/hitBorder.png');
				//Ui
                this.load.atlas('buttons', 'assets/placeholder/ui/buttons.png', 'assets/placeholder/ui/buttons.json');
				this.load.atlas('Highscore_ui', 'assets/placeholder/ui/score_rewards.png','assets/placeholder/ui/score_rewards.json')
				//Effects
				//Sounds
                this.load.audio('titleMusic', ['assets/audio/main_menu.mp3']);
				//Fonts
                this.load.bitmapFont('caslon', 'assets/fonts/desyrel.png', 'assets/fonts/desyrel.xml');
                //        + lots of other required assets here
				

        },

        create: function () {

                //        Once the load has finished we disable the crop because we're going to sit in the update loop for a short while
                this.preloadBar.cropEnabled = false;

        },

        update: function () {

                //        You don't actually need to do this, but I find it gives a much smoother game experience.
                //        Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
                //        You can jump right into the menu if you want and still play the music, but you'll have a few
                //        seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
                //        it's best to wait for it to decode here first, then carry on.
                
                //        If you don't have any music in your game then put the game.state.start line into the create function and delete
                //        the update function completely.
                
                if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
                {
                        this.ready = false;
						 this.game.state.start('Menu');
                }

        }

};