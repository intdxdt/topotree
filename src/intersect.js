import "ccw";

// Returns true if the bounding box AB intersects the line segment CD
function intersectBoxSegment(a, b, c, d) {
  if (c[0] > b[0] && d[0] > b[0]
      || c[0] < a[0] && d[0] < a[0]
      || c[1] > b[1] && d[1] > b[1]
      || c[1] < a[1] && d[1] < a[1]) return false;
  var s, t;
  return !(s = ccw(c, d, a))
      || !(t = ccw(c, d, b)) || t > 0 !== (s = s > 0)
      || !(t = ccw(c, d, [b[0], a[1]])) || t > 0 !== s
      || !(t = ccw(c, d, [a[0], b[1]])) || t > 0 !== s;
}

// Returns true if the line segments AB and CD intersect
// TODO apply bounding box check before, for better performance?
// TODO handle collinear segments?
function intersectSegmentSegment(a, b, c, d) {
  return ccw(a, c, d) > 0 !== ccw(b, c, d) > 0
      && ccw(a, b, c) > 0 !== ccw(a, b, d) > 0;
}
