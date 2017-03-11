var Box = require("./box");
var ccw = require("./ccw");
/**
 * @type {LineSegment}
 */
module.exports = LineSegment;

function LineSegment(xa, ya, xb, yb) {
	if(!(this instanceof LineSegment)) {
		return new LineSegment(xa, ya, xb, yb)
	}
	this.xa = xa;
	this.ya = ya;
	this.xb = xb;
	this.yb = yb;
}

LineSegment.prototype.box = function() {
	var x0 = this.xa;
	var y0 = this.ya;
	var x1 = this.xb;
	var y1 = this.yb;
	var t;

	if(x0 > x1) {
		t  = x0;
		x0 = x1;
		x1 = t;
	}

	if(y0 > y1) {
		t  = y0;
		y0 = y1;
		y1 = t;
	}
	return new Box(x0, y0, x1, y1, [this]);
};

LineSegment.prototype.distance = function(point) {
	var x  = point[0];
	var y  = point[1];
	var dx = this.xb - this.xa;
	var dy = this.yb - this.ya;
	var d2 = dx * dx + dy * dy;
	var t  = d2 && ((x - this.xa) * dx + (y - this.ya) * dy) / d2;

	if(t <= 0) {
		dx = this.xa;
		dy = this.ya;
	}
	else if(t >= 1) {
		dx = this.xb;
		dy = this.yb;
	}
	else {
		dx = this.xa + t * dx;
		dy = this.ya + t * dy;
	}
	dx -= x;
	dy -= y;
	return dx * dx + dy * dy;
};

LineSegment.prototype.intersects = function(that) {
	var fn = lineSegment_intersectsSegment;
	if(that.children) {
		fn = lineSegment_intersectsBox;
	}
	return fn(this, that);
};

// Note: requires that seg and box have overlapping bounding boxes!
function lineSegment_intersectsBox(seg, box) {
	var s, t;
	return !((s = ccw(seg.xa, seg.ya, seg.xb, seg.yb, box.x0, box.y0))
	&& (t = ccw(seg.xa, seg.ya, seg.xb, seg.yb, box.x1, box.y1)) && t > 0 === (s = s > 0)
	&& (t = ccw(seg.xa, seg.ya, seg.xb, seg.yb, box.x1, box.y0)) && t > 0 === s
	&& (t = ccw(seg.xa, seg.ya, seg.xb, seg.yb, box.x0, box.y1)) && t > 0 === s);
}

// Note: requires that seg1 and seg2 have overlapping bounding boxes!
function lineSegment_intersectsSegment(seg1, seg2) {
	var s, t;
	return !((s = ccw(seg1.xb, seg1.yb, seg2.xa, seg2.ya, seg2.xb, seg2.yb))
		&& (t = ccw(seg1.xa, seg1.ya, seg2.xa, seg2.ya, seg2.xb, seg2.yb)) && s > 0 === t > 0)
		&& !((s = ccw(seg1.xa, seg1.ya, seg1.xb, seg1.yb, seg2.xb, seg2.yb))
		&& (t = ccw(seg1.xa, seg1.ya, seg1.xb, seg1.yb, seg2.xa, seg2.ya)) && s > 0 === t > 0);
}

