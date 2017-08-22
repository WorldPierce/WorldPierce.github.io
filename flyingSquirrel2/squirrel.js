function Squrriel() {
	this.y = window.innerHeight/2;
	this.x = 250;
	this.gravity = 0.6;
	this.lift = -15;
	this.velocity = 0;
	this.img = loadImage("images/sq.png");

	this.show = function() {
		// fill(255);
		// ellipse(this.x, this.y, 32, 32);
		image(this.img, this.x, this.y, 35, 35);
	}

	this.up = function() {
		this.velocity += this.lift;
		//this.velocity += -this.gravity;
	}

	this.update = function() {
		this.velocity += this.gravity;
		this.velocity *= 0.95;
		this.y += this.velocity;

		if(this.y > window.innerHeight) {
			this.y = window.innerHeight;
			this.velocity = 0;
		}
		if(this.y < 0) {
			this.y = 0;
			this.velocity = 0;
		}
	}

	this.glide = function() {
		this.velocity += -0.6;
	}
}