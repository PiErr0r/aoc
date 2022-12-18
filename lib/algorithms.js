// solves josephus problem: https://en.wikipedia.org/wiki/Josephus_problem
const joseph = (n, q) => {
	let D = 1;
	while (D <= (q-1) * n) {
		D = Math.ceil(D * q / (q-1));
	}
	return q * n + 1 - D
}

// find the cycle in a string or array
const findCycle = (A, cmpFn = (a, b) => a === b) => {
	let slow = 0, fast = 0;
	do {
		slow = (slow + 1) % A.length;
		fast = (fast + 2) % A.length;
		if (cmpFn(A[slow], A[fast])) {
			while (cmpFn(A[slow], A[fast])) {
				--slow;
				--fast;
			}
			return [slow + 1, fast + 1].sort((a, b) => a - b);
		}
	} while (!cmpFn(A[slow], A[fast]));
	return [slow, fast].sort((a, b) => a - b);
}

module.exports = {
	joseph,
	findCycle,
}