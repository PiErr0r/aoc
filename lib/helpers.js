const copy = (a) => (a.map(b => Array.isArray(b) ? copy(b) : typeof b === 'object' ? JSON.parse(JSON.stringify(b)) : b));
const in_ = (a, arr) => arr.indexOf(a) !== -1;
const inBB = (row, col, data) => 0 <= row && row < data.length && 0 <= col && col < data[0].length;
/**
 * sort(arr, (a, b) => {})
 * It should return a number where:
 * 	-1 => a should come before b
 *   1 => a should come after b
 *   0 => a and b are considered equal
 **/
const sort = (arr, fn = (a, b) => a-b) => arr.sort(fn);

module.exports = {
	copy,
	entries: Object.entries,
	in_,
	inBB,
	keys: Object.keys,
	sort,
	values: Object.values,
}