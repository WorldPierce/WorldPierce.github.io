function Obstical2(pic,spd) {
	this.top = random(window.innerHeight/2);
	this.bottom = random(window.innerHeight/2);
	this. middle = random(window.innerHeight);
	this.x = window.innerWidth;
	this.w = 75;
	this.h = 75;
	this.speed;
	this.img;
	this.isNut = false;

	switch(pic) {
		case 0:
		case 1:
		case 2:
			this.h = 40;
	    	this.w = 40;
	    	this.isNut = true;
	        // this.img = loadImage("images/nuts.png");
	        this.img = loadImage("images/cloud.png");
	        this.speed = Math.floor((Math.random() * 12) + 8) + spd;
	        break;
	    case 3:
	    case 4:
	    case 5:
	  //   	this.w = window.innerWidth * .1;
			// this.h = window.innerHeight * .2;
			this.speed = Math.floor((Math.random() * 12) + 8) + spd;
	        this.img = loadImage("images/forest2.png");
	        break;
	    case 6:
	    case 7: 
	    	this.speed = 20;
	        this.img = loadImage("images/forest2.png");
	        break;
	    default:
	    this.isNut = true;
	    this.img = loadImage("images/cloud.png");
	    this.speed = 12 + spd;
	}

	this.show = function() {

		//fill(255);
		// rect(this.x, 0, this.w, this.top);
		// rect(this.x, window.innerHeight - this.bottom, this.w, this.bottom);
		image(this.img, this.x, this.top, this.w, this.h);
		image(this.img, this.x, window.innerHeight - this.bottom, this.w, this.h);

		//setTimeout(function(){ image(this.img, this.x, window.innerHeight + this.bottom, this.w, this.h); }, 1000);
	}

	this.hits = function(squirrel) {
		if(squirrel.y > this.middle && squirrel.y < this.middle + this.h - 20) {
			//console.log(this.x + " " + squirrel.x);
			if(squirrel.x >= this.x) {
				return true;
			}
		}
		return false;
	}

	this.show1 = function() {
		image(this.img, this.x, this.middle, this.w, this.h);
	}

	this.update = function() {
		this.x -= this.speed;
	}

	this.offScreen = function() {
		return (this.x < -this.w);
		// if(this.x < -w) {
		// 	return true;
		// } else {
		// 	return false;
		// }
	}
}