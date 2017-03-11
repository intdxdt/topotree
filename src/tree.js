var heap        = require("./heap");
var Box         = require("./box");
var LineSegment = require("./lnsegment");
/**
 * exports
 * @type Tree
 */
module.exports = Tree;

/**
 * Tree
 * @param root
 * @constructor
 */
function Tree(root) {
	if(!(this instanceof Tree)) {
		return new Tree(root)
	}
	this.root = root;
}
/**
 * export Box on tree
 * @type {Box}
 */
Tree.Box = Box;
/**
 * export LineSegment on tree
 * @type {LineSegment}
 */
Tree.LineSegment = LineSegment;
/**
 * creates a new tree from line
 * @param line
 * @returns {Tree}
 * @constructor
 */
Tree.FromLine = function(line) {
	return new Tree(treeFromBoxes(boxesFromLine(line)));
};
/**
 * creates a new tree from lines
 * @param lines
 * @returns {Tree}
 * @constructor
 */
Tree.FromLines = function(lines) {
	var boxes = [];
	var i     = -1;
	var n     = lines.length;

	while(++i < n) {
		var p0;
		var line = lines[i];
		var j    = 0;
		var m    = line.length;
		var p1   = line[0];

		while(++j < m) {
			p0 = p1;
			p1 = line[j];
			boxes.push(new LineSegment(p0[0], p0[1], p1[0], p1[1]).box());
		}
	}

	function bound(boxes) {
		var x0 = Infinity;
		var y0 = Infinity;
		var x1 = -Infinity;
		var y1 = -Infinity;
		var i  = -1;
		var n  = boxes.length;
		var box;

		while(++i < n) {
			box = boxes[i];

			if(box.x0 < x0) {
				x0 = box.x0;
			}

			if(box.y0 < y0) {
				y0 = box.y0;
			}

			if(box.x1 > x1) {
				x1 = box.x1;
			}

			if(box.y1 > y1) {
				y1 = box.y1;
			}
		}

		return new Box(x0, y0, x1, y1, boxes);
	}

	return new Tree((function split(children) {
		var box = bound(children),
		    n   = children.length;
		return n < 10 ? box : split(children.sort(box.x1 - box.x0 > box.y1 - box.y0 ? ascendingX : ascendingY).slice(0, n >>= 1)).merge(split(children.slice(n)));
	})(boxes, 0));
};

Tree.prototype.leaves = function() {
	return this.filter(tree_true);
};

Tree.prototype.filter = function(filter) {
	var leaves = [],
	    node,
	    nodes  = [this.root];

	while((node = nodes.pop()) != null) {
		if(filter(node)) {
			if(node.children) {
				var i = -1, n = node.children.length;
				while(++i < n) {
					nodes.push(node.children[i]);
				}
			}
			else {
				leaves.push(node);
			}
		}
	}

	return leaves;
};

Tree.prototype.intersect = function(tree, intersect) {
	var intersections = [];
	intersectChild(this.root, tree.root, 0);
	return intersections;

	function intersectChild(A, B, depth) {
		var a, b, n, i;
		if(depth & 1) {
			a = A;
			b = B;
		}
		else {
			a = B;
			b = A;
		}

		if(intersect(A, B)) {
			if(A.children) {
				for(i = 0, n = A.children.length; i < n; ++i) {
					intersectChild(B, A.children[i]);
				}
			}
			else if(B.children) {
				for(i = 0, n = B.children.length; i < n; ++i) {
					intersectChild(B.children[i], A);
				}
			}
			else {
				intersections.push([a, b]);
			}
		}
	}
};

Tree.prototype.search = function(score) {
	var minNode;
	var minScore       = Infinity;
	var candidateNode  = this.root;
	var candidateScore = score(candidateNode);
	var candidates     = heap(tree_ascendingScore);
	var candidate      = {s: candidateScore, n: candidateNode};

	do {
		if((candidateNode = candidate.n).children) {
			candidateNode.children.forEach(function(c) {
				candidates.push({s: score(c), n: c});
			});
		}
		else if((candidateScore = score(candidateNode)) < minScore) {
			minNode  = candidateNode;
			minScore = candidateScore;
		}
	} while((candidate = candidates.pop()) && candidate.s < minScore);

	return minNode;
};

function ascendingX(a, b) {
	return a.x0 - b.x0;
}

function ascendingY(a, b) {
	return a.y0 - b.y0;
}

function boxesFromLine(line) {
	var boxes = [];
	var x = 0, y = 1, ln;
	for(var i = 0; i < line.length - 1; i++) {
		ln = new LineSegment(
			line[i][x], line[i][y], line[i + 1][x], line[i + 1][y]
		);
		boxes.push(ln.box())
	}
	return boxes;
}

function treeFromBoxes(boxes) {
	var i0, i1, n0;

	while((n0 = boxes.length) > 1) {
		var boxes1 = new Array(Math.ceil(n0 / 2));

		for(i0 = 0, i1 = 0; i0 < n0 - 1; i0 += 2, i1 += 1) {
			boxes1[i1] = boxes[i0].merge(boxes[i0 + 1]);
		}

		if(i0 < n0) {
			boxes1[i1] = boxes[i0];
		}
		boxes = boxes1;
	}

	return boxes[0];
}

function tree_true() {
	return true;
}

function tree_ascendingScore(a, b) {
	return a.s - b.s;
}
