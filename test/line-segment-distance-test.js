var box         = require("../src/box.js");
var LineSegment = require("../src/lnsegment");
var test        = require('tape');

var ε = 1e-6;

//
// A---C---B
//
test("returns zero for a point along the segment", function(t) {
	t.plan(6);
	t.equal(new LineSegment(0, 0, 0, 1).distance([0, ε]), 0);
	t.equal(new LineSegment(0, 0, 0, 1).distance([0, .5]), 0);
	t.equal(new LineSegment(0, 0, 0, 1).distance([0, 1 - ε]), 0);
	t.equal(new LineSegment(0, 0, 1, 0).distance([ε, 0]), 0);
	t.equal(new LineSegment(0, 0, 1, 0).distance([.5, 0]), 0);
	t.equal(new LineSegment(0, 0, 1, 0).distance([1 - ε, 0]), 0);
});

//
// A------BC
//
test("returns zero for a point at a segment endpoint", function(t) {
	t.plan(6);
	t.equal(new LineSegment(0, 0, 0, 1).distance([0, 0]), 0);
	t.equal(new LineSegment(0, 0, 0, 1).distance([0, ε]), 0);
	t.equal(new LineSegment(0, 0, 0, 1).distance([0, 1]), 0);
	t.equal(new LineSegment(0, 0, 0, 1).distance([0, 1 - ε]), 0);
	t.equal(new LineSegment(0, 0, 1, 0).distance([0, 0]), 0);
	t.equal(new LineSegment(0, 0, 1, 0).distance([1, 0]), 0);
});

//
//     C
// A-------B
//
test("returns the squared distance for a point closest to the edge", function(t) {
	t.plan(4);
	t.equal(new LineSegment(0, 0, 0, 4).distance([1, 2]), 1);
	t.equal(new LineSegment(0, 0, 0, 4).distance([-1, 2]), 1);
	t.equal(new LineSegment(0, 0, 0, 10).distance([2, 5]), 4);
	t.equal(new LineSegment(0, 0, 0, 10).distance([-2, 5]), 4);
});

//
//           C
// A-------B
//
test("returns the squared distance for a point closest to an endpoint", function(t) {
	t.plan(6);
	t.equal(new LineSegment(0, 0, 0, 10).distance([0, 11]), 1);
	t.equal(new LineSegment(0, 0, 0, 10).distance([1, 11]), 2);
	t.equal(new LineSegment(0, 0, 0, 10).distance([-1, 11]), 2);
	t.equal(new LineSegment(0, 0, 0, 10).distance([0, -1]), 1);
	t.equal(new LineSegment(0, 0, 0, 10).distance([1, -1]), 2);
	t.equal(new LineSegment(0, 0, 0, 10).distance([-1, -1]), 2);
});
