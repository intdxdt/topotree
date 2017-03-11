var box  = require("../src/box.js");
var heap = require("../src/heap");
var test = require('tape');

test("size returns the number of elements in the heap", function(t) {
	t.plan(8);
	var h = heap(ascending);
	t.equal(h.size(), 0);
	h.push("foo");
	t.equal(h.size(), 1);
	h.push("foo");
	t.equal(h.size(), 2);
	h.push("bar");
	t.equal(h.size(), 3);
	h.pop();
	t.equal(h.size(), 2);
	h.pop();
	t.equal(h.size(), 1);
	h.pop();
	t.equal(h.size(), 0);
	h.pop();
	t.equal(h.size(), 0);
});

test("push returns the size of the heap", function(t) {
	t.plan(2);
	var h = heap(ascending);
	t.equal(h.push("foo"), 1);
	t.equal(h.push("bar"), 2);
});

test("pop returns the smallest element according to the specified comparator", function(t) {
	t.plan(6);
	var ha = heap(ascending),
	    hd = heap(descending);
	ha.push("foo");
	ha.push("bar");
	hd.push("foo");
	hd.push("bar");
	t.equal(ha.pop(), "bar");
	t.equal(ha.pop(), "foo");
	t.is(ha.pop(), undefined);
	t.equal(hd.pop(), "foo");
	t.equal(hd.pop(), "bar");
	t.is(hd.pop(), undefined);
});

test("pop returns undefined on an empty heap", function(t) {
	t.plan(1);
	t.is(heap(ascending).pop(), undefined);
});

test("can sort a large array of numbers", function(t) {
	var h = heap(ascending),
	    n = 1e2,
	    a = new Array(n),
	    b, i;
	t.plan(n);
	for(i = 0; i < n; ++i) {
		a[i] = i;
	}
	shuffle(b = a.slice());
	for(i = 0; i < n; ++i) {
		h.push(b[i]);
	}
	for(i = 0; i < n; ++i) {
		t.equal(h.pop(), a[i]);
	}
});

function ascending(a, b) {
	return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

function descending(a, b) {
	return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}

function shuffle(array) {
	var m = array.length, t, i;
	while(m) {
		i        = Math.random() * m-- | 0;
		t        = array[m];
		array[m] = array[i];
		array[i] = t;
	}
	return array;
}

