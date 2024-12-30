const parent = (i) => ((i - 1) >> 1);
const left = (i) => (i << 1) + 1;
const right = (i) => (i << 1) + 2;

const swap = (A, i, j) => {
	const tmp = A[i];
	A[i] = A[j];
	A[j] = tmp;
}

const heapify = (A, i, fn) => {
	const l = left(i);
	const r = right(i);
	let largest = -1;
	
	if (l < A.heapSize() && fn(A[l], A[i]) < 0)
		largest = l;
	else
		largest = i;
	
	if (r < A.heapSize() && fn(A[r], A[largest]) < 0)
		largest = r;
	
	if (i !== largest) {
		swap(A, i, largest);
		heapify(A, largest, fn);
	}
}

class PriorityQueue extends Array {
	size = 0;
	fn = (a, b) => a - b; // ascending
	constructor(fn) {
		super(0);
		if (fn)
			this.fn = fn;
	}
	heapSize() { return this.size; }
	pop() {
		if (this.size === 0) throw new Error("Empty Queue");
		--this.size;
		const tmp = this[0];
		this[0] = this[this.size];
		super.pop();
		heapify(this, 0, this.fn);
		return tmp;
	}
	front() { return this[0]; }
	empty() { return this.size === 0; }
	push(n) {
		let i = this.size;
		++this.size;
		while (i > 0 && this.fn(this[parent(i)], n) >= 0) {
			this[i] = this[parent(i)];
			i = parent(i);
		}
		this[i] = n;
	}
	*values() {
		for (let i = 0; i < this.q.length; ++i) {
			yield this[i];
		}
	}
}


module.exports = {
	PriorityQueue
}