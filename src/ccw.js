/**
 * Created by titus on 10/03/17.
 */
module.exports = ccw;
// Three points are a counter-clockwise turn if ccw > 0, clockwise if ccw < 0,
// and collinear if ccw = 0 because ccw is a determinant that gives twice the
// signed area of the triangle ABC. Assumes the origin [0,0] is the top-left.
function ccw(xa, ya, xb, yb, xc, yc) {
	return (yb - ya) * (xc - xa) - (xb - xa) * (yc - ya);
}


