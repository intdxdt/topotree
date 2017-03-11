var box  = require("../src/box");
var ccw  = require("../src/ccw");
var test = require('tape');

test("returns zero for three coincident points", function coincident(t) {
	t.plan(4);
	t.equal(ccw(0, 0, 0, 0, 0, 0), 0);
	t.equal(ccw(1, 1, 1, 1, 1, 1), 0);
	t.equal(ccw(2, 1, 2, 1, 2, 1), 0);
	t.equal(ccw(1, 2, 1, 2, 1, 2), 0);
});

test("returns zero for three collinear points", function collinear(t) {
	t.plan(4);
	t.equal(ccw(0, 0, 0, 1, 0, 2), 0);
	t.equal(ccw(0, 0, 0, 2, 0, 1), 0);
	t.equal(ccw(0, 0, 2, 0, 1, 0), 0);
	t.equal(ccw(0, 0, 0, 0, 1, 0), 0);
});

//
// A---B
//  \  |
//   \ |
//    \|
//     C
//
test("returns a value less than zero for a clockwise triangle", function(t) {
	t.plan(1);
	t.ok(ccw(0, 0, 1, 0, 1, 1) < 0);
});

//
//     C
//    /|
//   / |
//  /  |
// A---B
//
test("returns a value greater than zero for a counterclockwise triangle", function(t) {
	t.plan(1);
	t.ok(ccw(0, 1, 1, 1, 1, 0) > 0);
});
