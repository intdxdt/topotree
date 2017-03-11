var box         = require("../src/box.js");
var LineSegment = require("../src/lnsegment");
var test        = require('tape');

test("stores the coordinates as [xa, ya] -> [xb, yb]", function(t) {
	t.plan(4);
	var seg = new LineSegment(1, 2, 3, 4);
	t.equal(seg.xa, 1);
	t.equal(seg.ya, 2);
	t.equal(seg.xb, 3);
	t.equal(seg.yb, 4);
});

test("box returns the bounding box", function(t) {
	t.plan(4);
	var box = new LineSegment(4, 3, 2, 1).box();
	t.equal(box.x0, 2);
	t.equal(box.y0, 1);
	t.equal(box.x1, 4);
	t.equal(box.y1, 3);
});


