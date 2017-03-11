var box         = require("../src/box.js");
var LineSegment = require("../src/lnsegment");
var test        = require('tape');

var ε = 1e-6;
//
// A---+
// |   |
// |   |
// |   |
// +---B
//
// C---D
//
// Note: depends on the bounding box not intersecting!
//
test("returns false for a line segment outside the box", function(t) {
	t.plan(10);
	t.equal(new LineSegment(0, 1 + ε, 1, 1 + ε).box().intersects(box(0, 0, 1, 1)), false);
	t.equal(new LineSegment(0, 2, 1, 2).box().intersects(box(0, 0, 1, 1)), false);
	t.equal(new LineSegment(0, -ε, 1, -ε).box().intersects(box(0, 0, 1, 1)), false);
	t.equal(new LineSegment(0, -1, 1, -1).box().intersects(box(0, 0, 1, 1)), false);
	t.equal(new LineSegment(-1, 0, -1, 1).box().intersects(box(0, 0, 1, 1)), false);
	t.equal(new LineSegment(2, 0, 2, 1).box().intersects(box(0, 0, 1, 1)), false);
	t.equal(new LineSegment(1, -ε, 0, -ε).box().intersects(box(0, 0, 1, 1)), false);
	t.equal(new LineSegment(1 + ε, 0, 1 + ε, 1).box().intersects(box(0, 0, 1, 1)), false);
	t.equal(new LineSegment(1 + ε, 1, 1 + ε, 0).box().intersects(box(0, 0, 1, 1)), false);
	t.equal(new LineSegment(1 + ε, 0, 2, 0).box().intersects(box(0, 0, 1, 1)), false);
});

//
// A---+
// |   |
// C---D
// |   |
// +---B
//
test("returns true for a line segment inside the box", function(t) {
	t.plan(9);
	t.equal(new LineSegment(0, ε, 1, ε).intersects(box(0, 0, 1, 1)), true);
	t.equal(new LineSegment(0, .5, 1, .5).intersects(box(0, 0, 1, 1)), true);
	t.equal(new LineSegment(.5, 0, .5, 1).intersects(box(0, 0, 1, 1)), true);
	t.equal(new LineSegment(0, 0, 1, 1).intersects(box(0, 0, 1, 1)), true);
	t.equal(new LineSegment(ε, ε, 1 - ε, 1 - ε).intersects(box(0, 0, 1, 1)), true);
	t.equal(new LineSegment(-ε, -ε, 1 + ε, 1 + ε).intersects(box(0, 0, 1, 1)), true);
	t.equal(new LineSegment(1, 1, 0, 0).intersects(box(0, 0, 1, 1)), true);
	t.equal(new LineSegment(0, 1, 1, 0).intersects(box(0, 0, 1, 1)), true);
	t.equal(new LineSegment(1, 0, 0, 1).intersects(box(0, 0, 1, 1)), true);
});

//
// AC--D
// |   |
// |   |
// +---B
//
test("returns true for a line segment adjacent to a box edge", function(t) {
	t.plan(8);
	t.equal(new LineSegment(0, 0, 1, 0).intersects(box(0, 0, 1, 1)), true);
	t.equal(new LineSegment(0, ε, 1, ε).intersects(box(0, 0, 1, 1)), true);
	t.equal(new LineSegment(1, 0, 0, 0).intersects(box(0, 0, 1, 1)), true);
	t.equal(new LineSegment(1, ε, 0, ε).intersects(box(0, 0, 1, 1)), true);
	t.equal(new LineSegment(1, 0, 1, 1).intersects(box(0, 0, 1, 1)), true);
	t.equal(new LineSegment(1 - ε, 0, 1 - ε, 1).intersects(box(0, 0, 1, 1)), true);
	t.equal(new LineSegment(1, 1, 1, 0).intersects(box(0, 0, 1, 1)), true);
	t.equal(new LineSegment(1 - ε, 1, 1 - ε, 0).intersects(box(0, 0, 1, 1)), true);
});

//
// A---C---D
// |   |
// |   |
// +---B
//
test("returns true for a line segment touching a box corner", function(t) {
	t.plan(3);
	t.equal(new LineSegment(1, 0, 2, 0).intersects(box(0, 0, 1, 1)), true);
	t.equal(new LineSegment(0, 0, -1, 0).intersects(box(0, 0, 1, 1)), true);
	t.equal(new LineSegment(1 - ε, 0, 2, 0).intersects(box(0, 0, 1, 1)), true);
});

//
// A   C
// |   |
// |   |
// |   |
// B   D
//
// Note: depends on the bounding box not intersecting!
//
test("returns false for two line segments with a separating axis", function(t) {
	t.plan(9);
	t.equal(new LineSegment(0, 0, 0, 1).box().intersects(new LineSegment(1, 0, 1, 1).box()), false);
	t.equal(new LineSegment(0, 0, 0, 1).box().intersects(new LineSegment(ε, 0, ε, 1).box()), false);
	t.equal(new LineSegment(0, 0, 0, 1).box().intersects(new LineSegment(-1, 0, -1, 1).box()), false);
	t.equal(new LineSegment(0, 0, 0, 1).box().intersects(new LineSegment(-ε, 0, -ε, 1).box()), false);
	t.equal(new LineSegment(0, 0, 0, 1).box().intersects(new LineSegment(0, -1, 1, -1).box()), false);
	t.equal(new LineSegment(0, 0, 0, 1).box().intersects(new LineSegment(0, -ε, 1, -ε).box()), false);
	t.equal(new LineSegment(0, 0, 0, 1).box().intersects(new LineSegment(0, 1 + ε, 1, 1 + ε).box()), false);
	t.equal(new LineSegment(0, 0, 0, 1).box().intersects(new LineSegment(0, 2, 1, 2).box()), false);
	t.equal(new LineSegment(0, 0, 1, 1).box().intersects(new LineSegment(0, 3, 1, 2).box()), false);
});

//
// A  D
//  \ |
//   \C
//    \
//     \
//      B
//
test("returns false for two non-intersecting line segments without a separating axis", function(t) {
	t.plan(1);
	t.equal(new LineSegment(0, 0, 2, 2).intersects(new LineSegment(1, 0, 1, 1 - ε)), false);
});

//
// A  D
//  \ |
//   \|
//    C
//     \
//      B
//
test("returns true for two line segments that touch at a point along a segment", function(t) {
	t.plan(2);
	t.equal(new LineSegment(0, 0, 2, 2).intersects(new LineSegment(1, 0, 1, 1)), true);
	t.equal(new LineSegment(1, 0, 1, 1).intersects(new LineSegment(0, 0, 2, 2)), true);
});

//
// A---BC---D
//
test("returns true for two line segments that share an endpoint", function(t) {
	t.plan(6);
	t.equal(new LineSegment(0, 0, 0, 1).intersects(new LineSegment(0, 0, -1, 0)), true);
	t.equal(new LineSegment(0, 0, -1, 0).intersects(new LineSegment(0, 0, 0, 1)), true);
	t.equal(new LineSegment(0, 0, 0, 1).intersects(new LineSegment(0, 1, 0, 2)), true);
	t.equal(new LineSegment(0, 0, 0, 1).intersects(new LineSegment(0, 1, 1, 1)), true);
	t.equal(new LineSegment(0, 1, 0, 2).intersects(new LineSegment(0, 0, 0, 1)), true);
	t.equal(new LineSegment(0, 1, 1, 1).intersects(new LineSegment(0, 0, 0, 1)), true);
});

//
// A---C---B---D
//
test("returns true for two line segments that are collinear and touch at one point", function(t) {
	t.plan(1);
	t.equal(new LineSegment(0, 0, 1, 0).intersects(new LineSegment(1, 0, 2, 0)), true);
});

//
// A---C---B---D
//
test("returns true for two line segments that are collinear and overlap", function(t) {
	t.plan(5);
	t.equal(new LineSegment(0, 0, 3, 0).intersects(new LineSegment(1, 0, 2, 0)), true);
	t.equal(new LineSegment(0, 0, 3, 0).intersects(new LineSegment(2, 0, 1, 0)), true);
	t.equal(new LineSegment(3, 0, 0, 0).intersects(new LineSegment(1, 0, 2, 0)), true);
	t.equal(new LineSegment(3, 0, 0, 0).intersects(new LineSegment(2, 0, 1, 0)), true);
	t.equal(new LineSegment(0, 0, 1, 0).intersects(new LineSegment(1 - ε, 0, 2, 0)), true);
});

//
// A---B   C---D
//
// Note: depends on the bounding box not intersecting!
//
test("returns false for two line segments that are collinear and overlap", function(t) {
	t.plan(2);
	t.equal(new LineSegment(0, 0, 1, 0).box().intersects(new LineSegment(1 + ε, 0, 2, 0).box()), false);
	t.equal(new LineSegment(0, 0, 1, 0).box().intersects(new LineSegment(2, 0, 1 + ε, 0).box()), false);
});

//
// C  A---B
//  \
//   \
//    \
//     D
//
test("returns false for two line segments where three points are collinear but the segments do not overlap", function(t) {
	t.plan(1);
	t.equal(new LineSegment(0, 0, 2, 2).intersects(new LineSegment(1, 0, 2, 0)), false);
});

//
// A  D
//  \ |
//   \|
//    +
//    C\
//      B
//
test("returns true for two line segments that cross", function(t) {
	t.plan(4);
	t.equal(new LineSegment(0, 0, 2, 2).intersects(new LineSegment(1, 0, 1, 1 + ε)), true);
	t.equal(new LineSegment(0, 0, 2, 2).intersects(new LineSegment(1, 1 + ε, 1, 0)), true);
	t.equal(new LineSegment(2, 2, 0, 0).intersects(new LineSegment(1, 0, 1, 1 + ε)), true);
	t.equal(new LineSegment(2, 2, 0, 0).intersects(new LineSegment(1, 1 + ε, 1, 0)), true);
});

