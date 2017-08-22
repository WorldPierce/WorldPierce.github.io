function Obstical(maxHoleSize, spd) {
	// this.top = random(window.innerHeight/2);
	// this.bottom = random(window.innerHeight/2);
	// this. middle = random(window.innerHeight);
	this.x = window.innerWidth;
	this.w = window.innerWidth * .06;
	//space is space cover with innerheight being the entire space
	//space = 510 is smallest we want
	this.space = 505 - maxHoleSize;
	// this.space = (random() * (window.innerHeight - minHoleSize)) + maxHoleSize;
	//this.space = (random() * (window.innerHeight) + (maxHoleSize - minHoleSize);
	this.top = random() * (this.space);
	this.bottom = this.space - this.top;
	this.speed = 5.0 + spd;
	this.img = loadImage("images/forest1860.png");

	

	this.show = function() {

		//fill(255);
		// rect(this.x, 0, this.w, this.top);
		// rect(this.x, window.innerHeight - this.bottom, this.w, this.bottom);
		//console.log(this.space);
		image(this.img, this.x, 0, this.w, this.top);
		image(this.img, this.x, window.innerHeight - this.bottom, this.w, this.bottom);

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