var box  = require("../src/box.js");
var test = require('tape');

test("children is the two child nodes", two_child_nodes);
test("merges the bounding box of the two children", merge_with_2_children);
test("merges in-place when the bounding box of this subsumes that", this_subsumes_that);
test("merges in-place when the bounding box of that subsumes this", that_subsumes_this);

function two_child_nodes(t) {
	t.plan(1);
	var b0 = box(0, 0, 1, 1, []);
	var    b1 = box(1, 2, 3, 4, []);
	t.deepEqual([b0, b1], b0.merge(b1).children);
}

function merge_with_2_children(t) {
	t.plan(4);
	t.deepEqual([0, 0, 3, 4], extent(box(0, 0, 1, 1, []).merge(box(1, 2, 3, 4, []))));
	t.deepEqual([0, 0, 3, 4], extent(box(0, 0, 3, 4, []).merge(box(1, 1, 1, 2, []))));
	t.deepEqual([0, 0, 3, 4], extent(box(1, 2, 3, 4, []).merge(box(0, 0, 1, 1, []))));
	t.deepEqual([0, 0, 3, 4], extent(box(1, 1, 1, 2, []).merge(box(0, 0, 3, 4, []))));
}

function this_subsumes_that(t) {
	t.plan(2);
	var b0 = box(0, 0, 3, 3, []);
	var b1 = box(1, 1, 2, 2, []);
	t.deepEqual(b0, b0.merge(b1));
	t.deepEqual([b1], b0.children);
}

function that_subsumes_this(t) {
	t.plan(2);
	var b0 = box(0, 0, 3, 3, []);
	var b1 = box(1, 1, 2, 2, []);
	t.deepEqual(b0, b1.merge(b0));
	t.deepEqual([b1], b0.children);
}

function extent(box) {
	return [box.x0, box.y0, box.x1, box.y1];
}

