var tree = require("../src");
var test = require('tape');

var ε = 1e-6;

test("returns the nearest leaf node to the given point", function(t) {
	t.plan(6);
	var tp = tree.FromLine([[0, 0], [0, 1], [1, 1]]);
	var l0 = tree.LineSegment(0, 0, 0, 1); // TODO a better API
	var l1 = tree.LineSegment(0, 1, 1, 1);

	t.deepEqual(tp.search(nearest([0, -1])), l0);
	t.deepEqual(tp.search(nearest([0, 0])), l0);
	t.deepEqual(tp.search(nearest([0, .5])), l0);
	t.deepEqual(tp.search(nearest([.5, .5 - ε])), l0);
	t.deepEqual(tp.search(nearest([.5, .5 + ε])), l1);
	t.deepEqual(tp.search(nearest([1, 1])), l1);
});

function nearest(point) {
	return function(node) {
		return node.distance(point);
	};
}

