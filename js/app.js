
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    	console.log(ctx);
}


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	//speed = 505 / dt;
	//Math.random();
	var randomNumber = Math.floor(Math.random() * 500);
    this.x = this.x + randomNumber * dt; 
	if(this.x >= 505){
		this.x = 0;
    }
	
	
	//Reset player to beginning position and collisions
    if(player.x >= this.x - 40 && player.x <= this.x + 40 
		&& player.y >= this.y - 40 && player.y <= this.y + 40){
               player.x = 200;
			   player.y = 400;
           
       }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}

// Now write your own player class

var Player = function(){
	this.sprite = "images/char-boy.png";
	this.x = 200;
	this.y = 400;
}
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function(dt){
    
	

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(allowedKeys){

	if(this.x >= 100  && allowedKeys == 'left'){
	this.x -= 100;
	
	}
	if(this.y >= 100 && allowedKeys == 'up'){
	this.y -= 81;
	}
	if(this.x <= 350 && allowedKeys == 'right'){
	this.x += 100;
	}
	if(this.y <= 370 && allowedKeys == 'down'){
	this.y += 81;
	}
}





// Now instantiate your objects.

// Place the player object in a variable called player
var player = new Player();

// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var len = 3;
for(var i = 0; i < len; i++) {
	var e = new Enemy();
	e.x = (i + 1) * 100;
	e.y = (i + 1) * 70;
	allEnemies.push(e);
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
