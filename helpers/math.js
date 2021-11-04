const is = (n) => n !== undefined && n !== null;
const int = (n) => Math.trunc(Number(n));
const float = (n) => Number(n);
// if b is undefined or null return randint(0, a);
const randint = (a, b) => ((is(b) ? a : 0) + Math.floor(Math.random() * ((is(b) ? b : a) - (is(b) ? a : 0))));

module.exports = {
	int,
	float, 
	randint
}
