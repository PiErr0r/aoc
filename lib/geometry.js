
const manDist = (a, b) => {
	if (a.length !== b.length) console.log(`Error in "manDist" vectors a=${a} and b=${b} have different lengths`);
	let res = 0;
	for (let i = 0; i < a.length; ++i) {
		res += Math.abs(a[i] - b[i]);
	}
	return res;
}

const shoelace = (pts) => {
	let res = 0;
	for (let i = 0; i < pts.length; ++i) {
		res += pts[i][0] * pts[(i || pts.length) - 1][1];
		res -= pts[i][1] * pts[(i || pts.length) - 1][0];
	}
	return Math.abs(res / 2);
}

const circumference = (pts) => {
	let len = 0;
	let prev = pts[pts.length - 1];
	for (let i = 0; i < pts.length; ++i) {
		len += manDist(pts[i], prev);
		prev = pts[i];
	};
	return len;
}

const areaInt = (pts) => {
	// Pick's theorem
	return shoelace(pts) + circumference(pts) / 2 + 1;
}

module.exports = {
	areaInt,
	circumference,
	manDist,
	shoelace
}