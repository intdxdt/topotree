var Box  = require("../src/box.js");
var test = require('tape');


//
// A---+
// |   |
// | C |
// |   |
// +---B
//
test("returns zero for a point inside the box",function pt_in_box(t) {
	t.plan(1);
	t.equal(Box(0, 0, 1, 1).distance([.5, .5]), 0);
});

//
// A---+
// |   |
// |   C
// |   |
// +---B
//
test("returns zero for a point on the box edge",function pt_on_edge(t) {
	t.plan(1);
	t.equal(Box(0, 0, 1, 1).distance([1, .5]), 0);
});

//
// A---+
// |   |
// |   | C
// |   |
// +---B
//
test("returns the squared distance for a point closest to an edge",function pt_close_to_edge(t) {
	t.plan(12);
	t.equal(Box(0, 0, 1, 1).distance([-1, 0]), 1);
	t.equal(Box(0, 0, 1, 1).distance([-1, .5]), 1);
	t.equal(Box(0, 0, 1, 1).distance([-1, 1]), 1);
	t.equal(Box(0, 0, 1, 1).distance([2, 0]), 1);
	t.equal(Box(0, 0, 1, 1).distance([2, .5]), 1);
	t.equal(Box(0, 0, 1, 1).distance([2, 1]), 1);
	t.equal(Box(0, 0, 1, 1).distance([-2, 0]), 4);
	t.equal(Box(0, 0, 1, 1).distance([-2, .5]), 4);
	t.equal(Box(0, 0, 1, 1).distance([-2, 1]), 4);
	t.equal(Box(0, 0, 1, 1).distance([3, 0]), 4);
	t.equal(Box(0, 0, 1, 1).distance([3, .5]), 4);
	t.equal(Box(0, 0, 1, 1).distance([3, 1]), 4);
});

//
// A---+
// |   |
// |   |
// |   |
// +---B
//       C
//
test("returns the squared distance for a point closest to a corner",function pt_close_to_corner(t) {
	t.plan(6);
	t.equal(Box(0, 0, 1, 1).distance([2, 2]), 2);
	t.equal(Box(0, 0, 1, 1).distance([3, 3]), 8);
	t.equal(Box(0, 0, 1, 1).distance([2, -1]), 2);
	t.equal(Box(0, 0, 1, 1).distance([-1, -1]), 2);
	t.equal(Box(0, 0, 1, 1).distance([0, 0]), 0);
	t.equal(Box(0, 0, 1, 1).distance([1, 1]), 0);
});

