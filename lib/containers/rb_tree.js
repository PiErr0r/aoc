const { debug } = require("../logging");

const BLACK = 'b';
const RED = 'r';

class _RBNode {
	#color = BLACK;
	#key = null;
	get color() { return this.#color; }
	get key() { return this.#key; }
	get L() { return this; }
	get R() { return this; };
	get P() { return this; }
	set color(_) {}
	set key(_) {}
	set L(_) {} 
	set R(_) {} 
	set P(_) {}
	toString() {
		return "NIL";
	}
	toJSON = this.toString;
}

const NIL = new class NIL extends _RBNode {};

class RBNode extends _RBNode {
	#color = BLACK;
	#key = "";
	#L;	#R;	#P;
	constructor(color = null, key = null) {
		super()
		if (color) {
			if (color !== BLACK && color !== RED) throw new Error(`Unknown color: ${color}.`);
			this.#color = color;
		}
		if (key !== null) this.#key = key;
		this.#L = NIL;
		this.#R = NIL;
		this.#P = NIL;
	}

	get color() { return this.#color; }
	get key() { return this.#key; }
	get L() { return this.#L; }
	get R() { return this.#R; }
	get P() { return this.#P; }
	set color(_color) { 
		if (_color !== BLACK && _color !== RED) throw new Error(`Unknown color: ${_color}.`);
		this.#color = _color; 
	}
	set key(_key) { this.#key = _key; }
	set L(node) { this.#L = node; }
	set R(node) { this.#R = node; }
	set P(node) { this.#P = node; }
	#getChild(child) {
		if (child === NIL) return "NIL";
		return `{color: ${child.color}, key: ${child.key}}`;
	}

	toJSON = this.toString;
	toString() {
		if (this === NIL) return "NIL";
		return `${this.#key}|${this.#color}|L=${this.#getChild(this.L)} R=${this.#getChild(this.R)} P=${this.#getChild(this.P)}`
	}
}


class RBTree {
	root = null;
	constructor() {
		this.root = NIL;
	}

	search(k) {
		return this.#search(this.root, k);
	}

	#search(x, k) {
		if (x === NIL) 
			return null;
		if (x.key === k) 
			return x;
		return k < x.key ?
			this.#search(x.L, k) :
			this.#search(x.R, k);
	}

	minimum(node = null) {
		let x = node ?? this.root;
		while (x.L !== NIL) x = x.L;
		return x;
	}

	maximum(node = null) {
		let x = node ?? this.root;
		while (x.R !== NIL) x = x.R;
		return x;
	}

	successor(k) {
		const x = this.search(k);
		if (x === null) return null;
		return this.#successor(x);
	}

	#successor(x, k) {
		if (x.R !== NIL)
			return this.minimum(x.R)
		let y = x.P;
		while (y !== NIL && x === y.R) {
			x = y;
			y = y.P;
		}
		return y;
	}

	predecessor(k) {
		const x = this.search(k);
		if (x === null) return null;
		return this.#predecessor(x, k);
	}

	#predecessor(x, k) {
		if (x.L !== NIL)
			return this.maximum(x.L);
		let y = x.P;
		while (y !== NIL && x === y.L) {
			x = y;
			y = y.P;
		}
		return y;
	}

	#leftRotate(x) {
		if (x === NIL) return;
		if (x.R === NIL) {
			console.log("#leftRotate: Throw new Error(?)");
			return;
		}

		const y = x.R;
		x.R = y.L;
		if (y.L !== NIL)
			y.L.P = x
		y.P = x.P;
		if (x.P === NIL)
			this.root = y;
		else if (x === x.P.L)
			x.P.L = y;
		else
			x.P.R = y;

		y.L = x;
		x.P = y;
	}

	#rightRotate(y) {
		if (y === NIL) return;
		if (y.L === NIL) {
			console.log("#rightRotate: Throw new Error(?)");
			return;
		}

		const x = y.L;
		y.L = x.R;
		if (x.R !== NIL)
			x.R.P = y;
		x.P = y.P;
		if (y.P === NIL)
			this.root = x;
		else if (y === y.P.R)
			y.P.R = x;
		else
			y.P.L = x;

		x.R = y;
		y.P = x;
	}

	insert(zKey) {
		const z = new RBNode(RED, zKey);
		let y = NIL;
		let x = this.root;
		while (x !== NIL) {
			y = x;
			if (z.key < x.key) 
				x = x.L;
			else 
				x = x.R;
		}
		z.P = y;

		if (y === NIL)
			this.root = z;
		else if (z.key < y.key)
			y.L = z;
		else
			y.R = z;

		z.L = NIL;
		z.R = NIL;

		this.#insertFixup(z);
	}

	#insertFixup(z) {
		while (z.P.color === RED) {
			if (z.P === z.P.P.L) {
				const y = z.P.P.R;
				if (y.color === RED) {
					z.P.color = BLACK;
					y.color = BLACK;
					z.P.P.color = RED;
					z = z.P.P;
				} else {
					if (z === z.P.R) {
						z = z.P;
						this.#leftRotate(z);
					}
					z.P.color = BLACK;
					z.P.P.color = RED;
					this.#rightRotate(z.P.P);
				}
			} else {
				const y = z.P.P.L;
				if (y.color === RED) {
					z.P.color = BLACK;
					y.color = BLACK;
					z.P.P.color = RED;
					z = z.P.P;
				} else {
					if (z === z.P.L) {
						z = z.P;
						this.#rightRotate(z);
					}
					z.P.color = BLACK;
					z.P.P.color = RED;
					this.#leftRotate(z.P.P);
				}
			}
		}
		this.root.color = BLACK;
	}

	#transplant(u, v) {
		if (u.P === NIL)
			this.root = v;
		else if (u === u.P.L)
			u.P.L = v;
		else
			u.P.R = v;
		v.P = u.P;
	}

	delete(z) {
		if (z === NIL) 
			return;
		if (z instanceof RBNode) 
			this.#delete(z);
		else {
			z = this.search(z);
			if (z === null) return;
 			this.#delete(z);
		}
	}

	#delete(z) {
		let x;
		let y = z;
		let yOriginalColor = y.color;
		let bothEmpty = false;
		if (z.L === NIL && z.R === NIL) {
			x = z;
			bothEmpty = true;
		} else 
		if (z.L === NIL) {
			x = z.R;
			this.#transplant(z, z.R);
		} else if (z.R === NIL) {
			x = z.L;
			this.#transplant(z, z.L);
		} else {
			y = this.minimum(z.R);
			// debug(y)
			yOriginalColor = y.color;
			x = y.R;
			if (y.P === z) {
				if (x === NIL) x = new RBNode();
				x.P = y;
			} else {
				this.#transplant(y, y.R);
				y.R = z.R;
				y.R.P = y;
			}
			this.#transplant(z, y);
			y.L = z.L;
			y.L.P = y;
			y.color = z.color;
		}
		if (yOriginalColor === BLACK) {
			// debug(x)
			this.#deleteFixup(x);
		}
		if (bothEmpty) {
			// debug("AAA")
		// debug(yOriginalColor)
			this.#transplant(z, NIL)
		}
	}

	#deleteFixup(x) {
		// debug("!!", x, x !== this.root && x.color === BLACK)
		while (x !== this.root && x.color === BLACK) {
			// debug(x === x.P.L, "HELLO", x)
			if (x === x.P.L) {
				let w = x.P.R;
				if (w.color === RED) {
					w.color = BLACK;
					x.P.color = RED;
					this.#leftRotate(x.P);
					w = x.P.R;
				}
				if (w.L.color === BLACK && w.R.color === BLACK) {
					w.color = RED;
					x = x.P;
				} else {
					if (w.R.color === BLACK) {
						w.L.color = BLACK;
						w.color = RED;
						this.#rightRotate(w);
						w = x.P.R;
					}
					w.color = x.P.color;
					x.P.color = BLACK;
					w.R.color = BLACK;
					this.#leftRotate(x.P);
					x = this.root;
				}
			} else {
				let w = x.P.L;
				if (w.color === RED) {
					w.color = BLACK;
					x.P.color = RED;
					this.#rightRotate(x.P);
					w = x.P.L;
				}
				if (w.R.color === BLACK && w.L.color === BLACK) {
					w.color = RED;
					x = x.P
				} else {
					if (w.L.color === BLACK) {
						w.R.color = BLACK;
						w.color = RED;
						this.#leftRotate(w);
						w = x.P.L;
					}
					w.color = x.P.color;
					x.P.color = BLACK;
					w.L.color = BLACK;
					this.#rightRotate(x.P);
					x = this.root;
				}
			}
		}
		x.color = BLACK;
	}

	static print(T, color = true) {
		RBTree.#print(T.root, color);
	}

	static #print(root, color, space = 0) {
		if (root !== NIL) {
			RBTree.#print(root.R, color, space + 4);
			let S = "";
			for (let i = 0; i < space; ++i) {
				S += " ";
			}
			console.log(`${S}${root.key}${color ? ":" + root.color : ""}`);
			RBTree.#print(root.L, color, space + 4);
		}
	}
}


module.exports = {
	RBTree,
}