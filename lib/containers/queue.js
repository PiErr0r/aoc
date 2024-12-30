class Queue {
	q = [];
	constructor(q) {
		if (Array.isArray(q)) {
			this.q = [...q];
		} else if (q != null) {
			this.q.push(q);
		}
	}
	pop() 	{ return this.q.shift(); }
	front() { return this.q[0];	}
	back() 	{ return this.q[ this.q.length - 1 ]; }
	size() 	{ return this.q.length; }
	empty() { return this.q.length === 0; }
	push(n) { this.q.push(n); }
	*values() {
		for (let i = 0; i < this.q.length; ++i) {
			yield this.q[i];
		}
	}
}

class FastQueue extends Queue {
	constructor(q) {
		super(q);
		this.ii = 0;
	}
	pop() 	{ return this.q[ this.ii++ ]; }
	front() { return this.q[ this.ii ]; }
	size()	{ return this.q.length - this.ii; }
	empty() { return this.q.length === this.ii; }
	push(n) { this.q[ ++this.ii ] = n; }
	*values() {
		for (let i = this.ii; i < this.q.length; ++i) {
			yield this.q[i];
		}
	}
}

class FastQueueWrapper {
	q = [];
	ii = 0;
	constructor(q, type = null) {
		// think of how to use typed arrays since they dont have splice method
		if (true || type === null) {
			return new FastQueue(q);
		} else if (typeof type === 'function') {
			this.q = new type(q);
		}
	}
	pop() 	{ return this.q[ this.ii++ ]; }
	front() { return this.q[ this.ii ]; }
	back() 	{ return this.q[ this.q.length - 1 ]; }
	size()	{ return this.q.length - this.ii; }
	empty() { return this.q.length === this.ii; }
	push(n) { this.q[ ++this.ii ] = n; }
	*values() {
		for (let i = this.ii; i < this.q.length; ++i) {
			yield this.q[i];
		}
	}
}

module.exports = {
	FastQueue: FastQueueWrapper,
	Queue,
}