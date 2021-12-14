const copy = (a) => (a.map(b => Array.isArray(b) ? copy(b) : b));
const entries = (o) => Object.entries(o);
const in_ = (a, arr) => arr.indexOf(a) !== -1;
const inBB = (row, col, data) => 0 <= row && row < data.length && 0 <= col && col < data[0].length;
const keys = (o) => Object.keys(o);
const sort = (arr, fn = (a, b) => a-b) => arr.sort(fn);
const values = (o) => Object.values(o);




module.exports = {
	copy,
	entries,
	in_,
	inBB,
	keys,
	sort,
	values,
}