
const empty = (a, b, c) => (
	a && b && c
	? new Array(a).fill(0).map(aa => new Array(b).fill(0).map(cc => new Array(c).fill(0)))
	: a && b
	? new Array(a).fill(0).map(aa => new Array(b).fill(0))
	: new Array(a).fill(0));

module.exports = {
	empty,
}