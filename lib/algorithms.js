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

/**
What does it mean for the ranges to overlap? It means there exists some number C which is in both ranges, i.e.
x_start <= C <= x_end
and
y_start <= C <= y_end
To avoid confusion, considering the ranges are: [x_start:x_end] and [y_start:y_end]
Now, if we are allowed to assume that the ranges are well-formed (so that x_start <= x_end and y_start <= y_end) then it is sufficient to test
x_start <= y_end && y_start <= x_end
*/

const rangeOverlap = (r1, r2) => {
	r1.sort((a ,b) => a - b);
	r2.sort((a ,b) => a - b);
	const [r1Lo, r1Hi] = r1;
	const [r2Lo, r2Hi] = r2;
	return r1Lo <= r2Hi && r2Lo <= r1Hi;
}

module.exports = {
	findCycle,
	joseph,
	rangeOverlap,
}