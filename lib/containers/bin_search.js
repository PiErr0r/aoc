function binSearch(arr, n, fn = (a, b) => a - b) {
	let l = 0, r = arr.length - 1;
	let m = 0, res;
	while (l <= r) {
		m = Math.floor(l + (r - l) / 2);
		res = Math.sign(fn(n, arr[m]));

		if (res === 0) {
			return [m, 0];
		} else if (res === 1) {
			l = m + 1;
		} else { // res === -1
			r = m - 1;
		}
	}
	return [m, Math.sign(fn(n, arr[m]))];
}

module.exports = {
	binSearch
};