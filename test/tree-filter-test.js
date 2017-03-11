var tree        = require("../src");
var test        = require('tape');


test("returns the leaf nodes that intersect the specified node", function(t) {
	t.plan(3);
	var tp  = tree.FromLine([[0, 0], [1, 1], [3, 4]]);
	var l0 = tree.LineSegment(0, 0, 1, 1); // TODO a better API
	var l1 = tree.LineSegment(1, 1, 3, 4);

	t.deepEqual(tp.filter(intersects(tree.LineSegment(0, 1, 0, 2))).sort(leafOrder), []);
	t.deepEqual(tp.filter(intersects(tree.LineSegment(1, 0, 0, 1))).sort(leafOrder), [l0]);
	t.deepEqual(tp.filter(intersects(tree.LineSegment(0, 0, 3, 4))).sort(leafOrder), [l0, l1]);
});

function intersects(segment) {
	return function(node) {
		return segment.intersects(node);
	};
}

function leafOrder(a, b) {
	return a.xa - b.xa || a.ya - b.ya || a.xb - b.xb || a.yb - b.yb;
}

