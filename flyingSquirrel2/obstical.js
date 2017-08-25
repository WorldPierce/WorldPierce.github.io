function Obstical(maxHoleSize, spd) {
	// this.top = random(window.innerHeight/2);
	// this.bottom = random(window.innerHeight/2);
	// this. middle = random(window.innerHeight);
	this.x = width;
	this.w = window.innerWidth * .04;
	//space is space cover with innerheight being the entire space
	//space = 510 is smallest we want
	this.space = height - maxHoleSize;
	// this.space = (random() * (window.innerHeight - minHoleSize)) + maxHoleSize;
	//this.space = (random() * (window.innerHeight) + (maxHoleSize - minHoleSize);
	this.top = random() * (this.space);
	this.bottom = this.space - this.top;
	this.speed = 6.0 + spd;
	this.img = loadImage("images/forest1860.png");
	

	this.hits = function(squirrel) {
		if(squirrel.y + 10 < this.top || squirrel.y > height - this.bottom) {
			if(squirrel.x > this.x && squirrel.x < this.x + this.w) {
				return true;
			}
		}
		return false;
	}

	

	this.show = function() {

		//fill(255);
		// rect(this.x, 0, this.w, this.top);
		// rect(this.x, window.innerHeight - this.bottom, this.w, this.bottom);
		//console.log(window.innerHeight);
		image(this.img, this.x, 0, this.w, this.top);
		image(this.img, this.x, height - this.bottom, this.w, this.bottom);

		//setTimeout(function(){ image(this.img, this.x, window.innerHeight + this.bottom, this.w, this.h); }, 1000);
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