BasicGame.GameOver = function (game) {
};

BasicGame.GameOver.prototype = {

        create: function () {

                //        We've already preloaded our assets, so let's kick right into the Main Menu itself
                //        Here all we're doing is playing some music and adding a picture and button
                //        Naturally I expect you to do something significantly better :)
                this.add.sprite(0, 0, 'Backgrounds_set1','background_0.png');
				this.milestone = {
				two : 12,
				three : 25,
				four : 50
				};
				
				//ui
				//Ui
				var style = { font: "32px Verdana", fill: "#DE915C", align: "center", stroke: "#0066CC", strokeThickness:5 };
				var style2 = { font: "26px Arial", fill: "#DE915C", align: "left", stroke: "#0066CC", strokeThickness:3 };
				
				this.simpleText = this.game.add.text((this.game.world.width*2)/5, (this.game.world.height*2)/16, 'Score', style2);

				this.simpleText.anchor.setTo(0.5, 0.5);

				this.totalScoreText = this.game.add.text((this.game.world.width*7)/9, (this.game.world.height*2)/16, ''+ BasicGame.totalScore, style);

				this.totalScoreText.anchor.setTo(0.5, 0.5);
				
				this.currentLevelText = this.game.add.text((this.game.world.width*7)/9, (this.game.world.height*3)/7, ''+ BasicGame.level, style2);

				this.currentLevelText.anchor.setTo(0.5, 0.5);
				
				this.simpleText2 = this.game.add.text((this.game.world.width*2)/5, (this.game.world.height*3)/7, 'Level', style2);

				this.simpleText2.anchor.setTo(0.5, 0.5);
				
				this.setSkillBar();
				
                this.restartButton = this.add.button((this.game.width*5)/7, (this.game.height*6)/7, 'buttons', this.restartGame, this, 'butRestart.png', 'butRestart.png', 'butRestart.png');
				this.restartButton.anchor.setTo(0.5,0.5);
				this.menuButton = this.add.button((this.game.width*2)/7, (this.game.height*6)/7, 'buttons', this.restartMenu, this, 'butMenu.png', 'butMenu.png', 'butMenu.png');
				this.menuButton.anchor.setTo(0.5,0.5);
		
        },

        update: function () {

                //        Do some nice funky main menu effect here

        },

        restartGame: function () {

                //        And start the actual game
                this.game.state.start('Game');

        },
		
		restartMenu: function()
		{
			  this.game.state.start('Menu');
		},
		
		setSkillBar: function()
		{
			if(BasicGame.level <= this.milestone.two)
			{
				this.skillSet = this.game.add.sprite(this.game.world.width/2, (this.game.world.height*5)/9,'Highscore_ui','uiSkillStars_0.png');
			}else if(BasicGame.level > this.milestone.two && BasicGame.level <= this.milestone.three)
			{
				this.skillSet = this.game.add.sprite(this.game.world.width/2, (this.game.world.height*5)/9,'Highscore_ui','uiSkillStars_1.png');
			}else if(BasicGame.level > this.milestone.three && BasicGame.level <= this.milestone.four)
			{
				this.skillSet = this.game.add.sprite(this.game.world.width/2, (this.game.world.height*5)/9,'Highscore_ui','uiSkillStars_2.png');
			}else if(BasicGame.level > this.milestone.four)
			{
				this.skillSet = this.game.add.sprite(this.game.world.width/2, (this.game.world.height*5)/9,'Highscore_ui','uiSkillStars_3.png');
			}
			this.skillSet.anchor.setTo(0.5,0.5);
		}

};