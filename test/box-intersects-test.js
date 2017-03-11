var box  = require("../src/box.js");
var test = require('tape');

var ε = 1e-6;

//
// A---+ C---+
// |   | |   |
// |   | |   |
// |   | |   |
// +---B +---D
//
test("returns false for non-overlapping boxes",function (t) {
	t.plan(2);
	t.equal(box(0, 0, 1, 1).intersects(box(2, 0, 2, 1)), false);
	t.equal(box(0, 0, 1, 1).intersects(box(1 + ε, 0, 1 + ε, 1)), false);
});

//
// A--C-+--+
// |  | |  |
// |  | |  |
// |  | |  |
// +--+-B--D
//
test("returns true for overlapping boxes",function (t) {
	t.plan(1);
	t.equal(box(0, 0, 1, 1).intersects(box(1 - ε, 0, 1 - ε, 1)), true);
});

//
// A---C---+
// |   |   |
// |   |   |
// |   |   |
// +---B---D
//
test("returns true for boxes that share an edge",function (t) {
	t.plan(2);
	t.equal(box(0, 0, 1, 1).intersects(box(1, 0, 2, 1)), true);
	t.equal(box(0, 0, 1, 1).intersects(box(0, 1, 1, 2)), true);
});

//
// A---+
// |   |
// |   |
// |   |
// +--CB---+
//     |   |
//     |   |
//     |   |
//     +---D
//
test("returns true for boxes that share a corner",function (t) {
	t.plan(2);
	t.equal(box(0, 0, 1, 1).intersects(box(1, 1, 2, 2)), true);
	t.equal(box(0, 0, 1, 1).intersects(box(1, -1, 2, 0)), true);
});
