
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
* Enum to be used across code.
*/
var Movement = {
    Direction: {
        LEFT: "left",
        RIGHT: "right",
        UP: "up",
        DOWN: "down"
    },
    Displacement: {
        alongX: 100,
        alongY: 81
    }
};

var gem_array = [];

/** 
* Enemies our player must avoid
*/
var Enemy = function() {
    /**
	* Variables applied to each of our instances go here,
    * we've provided one for you to get started
    * The image/sprite for our enemies, this uses
    * a helper we've provided to easily load images
	*/
	
    this.sprite = 'images/enemy-bug.png';
	this.speed = Math.floor(Math.random() * 400);
}


/**
* Update the enemy's position, required method for game
* Parameter: dt, a time delta between ticks
* @param {Number} dt Delta
*/
Enemy.prototype.update = function(dt) {
    /**
	* You should multiply any movement by the dt parameter
    * which will ensure the game runs at the same speed for
    * all computers.
	*/
    this.x += this.speed * dt; 
	if(this.x >= 505){
		this.x = 0;
    }
	
	/**
	* Reset player to beginning position and collisions
	*/
    if(player.x >= this.x - 50 && player.x <= this.x + 50 
		&& player.y >= this.y - 50 && player.y <= this.y + 50){
               player.x = 200;
			   player.y = 400;
           
       }
}

/**
* Draw the enemy on the screen, required method for game
*/
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}

/**
* Now write your own player class and set initial default position and sprite.
*/
var Player = function() {
	this.sprite = "images/char-boy.png";
	this.x = 200;
	this.y = 400;
	
}

/**
* Updates player resource.
*/
Player.prototype.update = function(dt) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/**
*this renders the Player.
*/
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/**
* This will make the Player move according to the pressed keys: up, down, right or left.
*/
Player.prototype.handleInput = function(allowedKeys) {
	
	if (this.y >= 100 && allowedKeys === Movement.Direction.LEFT) {
		this.x -= Movement.Displacement.alongX;
	}  

	if(this.y >= 100 && allowedKeys === Movement.Direction.UP) {
		this.y -= Movement.Displacement.alongY;
	}
	
	if(this.x <= 350 && allowedKeys === Movement.Direction.RIGHT) {
		this.x += Movement.Displacement.alongX;
	}
	
	if(this.y <= 370 && allowedKeys === Movement.Direction.DOWN) {
		this.y += Movement.Displacement.alongY;
	}
}

/**
* Draw the gem on the screen, required method for game
*/
var Gem = function() {
	this.sprite = 'images/gem-blue.png';
   	this.randomPosition();
}

/**
* this will display the position of the Gem randomly on the canvas
*/
Gem.prototype.randomPosition = function() {
	this.x = getRandomInt(1, 5) * 101;
	this.y = getRandomInt(1, 4) * 73;  
}

/**
* Checks collisions between Player and Gem, draw the gems collected after the collision between the
* Player and the Gems.
* Then, it will display the Gems above and back to zero, where the Player can collect more, up tp 6 Gems.
*/
Gem.prototype.update = function() {		
	if(player.x >= this.x - 80 && player.x <= this.x + 80 && player.y >= this.y - 80 && player.y <= this.y + 80) {
			
		this.randomPosition();
		if(gem_array.length <= 5){
			gem_array.push(this.sprite);
			for(var i = 0; i < gem_array.length; i++){
				ctx.drawImage(Resources.get('images/gem-orange.png'), i * 33.33, 0);
					
			}
		} else{
			ctx.clearRect ( 0 , 0, 200, 100);
			gem_array = [];
		
		}
   }   
}

/**
* This renders the blue gem at x and y.
*/
Gem.prototype.render = function() {
	 ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


/**
* Now instantiate your objects.
*/

/**
* Place the player object in a variable called player
*/
var player = new Player();

/** gem object */
var gem = new Gem();




/**
* Place all enemy objects in an array called allEnemies
*/
var allEnemies = [];
var len = 4;
for(var i = 0; i < len; i++) {
	var e = new Enemy();
	e.x = (i + 1) * 70;
	e.y = (i + 1) * 70;
	allEnemies.push(e);
}




/**
* This listens for key presses and sends the keys to your
* Player.handleInput() method. You don't need to modify this.
*/
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
