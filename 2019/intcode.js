

function padNum(n, pad) {
	n = n.toString();
	while (n.length < pad) {
		n = `0${n}`;
	}
	return n;
}

class IntCode {
	constructor(data, inputData = [], debug = false, dispPause = false) {
		this.data = data;
		this.pos = 0;
		this.relPos = 0;

		this.inputData = inputData;
		this.outParam = [];
		this.pause = false;
		this.debug = debug;
		this.dispPause = dispPause;

		this.regs = {};

		this.fnc = {
			"01": (x) => this.add(    ...this.getMode(x, 3)),
			"02": (x) => this.mul(    ...this.getMode(x, 3)),
			"03": (x) => this.input(  ...this.getMode(x, 1)),
			"04": (x) => this.output( ...this.getMode(x, 1)),
			"05": (x) => this.jnz(    ...this.getMode(x, 2)),
			"06": (x) => this.jz(     ...this.getMode(x, 2)),
			"07": (x) => this.lt(     ...this.getMode(x, 3)),
			"08": (x) => this.eq(     ...this.getMode(x, 3)),
			"09": (x) => this.relBase(...this.getMode(x, 1)),
			"99": (x) => this.halt()
		}
	}

	isHalted() {
		return this.pos === -1;
	}

	isPaused() {
		return this.pause;
	}

	unpause(inputData = []) {
		this.inputData = this.inputData.concat(inputData);
		this.pause = false;
	}

	calculate() {
		while (this.pos !== -1 && !this.pause) {
			const param = this.data[ this.pos ];
			const opcode = padNum(param % 100, 2);
			// console.log(param, opcode, this.pos, this.data)
			this.fnc[ opcode ](param);
		}
	}

	getOutput(last = 1) {
		if (last === -1) { // flush output
			const tmp = Array.from(this.outParam);
			this.outParam = [];
			return tmp;
		} else {
			return this.outParam[ this.outParam.length - last ];
		}
	}

	getMode(n, retN) {
		const ns = padNum(n, 5);
		return ns
			.split('')            // get array
			.slice(0, 3)          // first 3 items
			.reverse()            // reverse
			.slice(0, retN)       // first retN items
			.map(a => Number(a)); // map to int
	}

	getAddress(mode, offset) {
		switch (mode) {
			case 0:
				return this.data[ this.pos + offset ];
			case 1:
				return this.pos + offset;
			case 2:
				return this.data[ this.pos + offset ] + this.relPos;
			default:
				throw new Error(`FAIL: Unrecognized mode passed to getAddress! Expected one of: [0, 1, 2] but got: ${mode}`);
		}
	}

	getData(addr) {
		if (addr < 0) {
			throw new Error(`FAIL: Negative address!`);
		}

		if (addr >= this.data.length) {
			return this.regs[addr] ?? 0;
		} else {
			return this.data[addr];
		}
	}

	setData(addr, value) {
		if (addr < 0) {
			throw new Error(`FAIL: Negative address!`);
		}

		if (addr >= this.data.length) {
			this.regs[addr] = value;
		} else {
			this.data[addr] = value;
		}
	}

	lt(fAddr = 0, sAddr = 0, resAddr = 0) {
		const fPos = this.getAddress(fAddr, 1);
		const sPos = this.getAddress(sAddr, 2);
		const resPos = this.getAddress(resAddr, 3);

		const cond = this.getData(fPos) < this.getData(sPos);
		this.setData(resPos, Number(cond));
		this.pos += 4;
	}

	eq(fAddr = 0, sAddr = 0, resAddr = 0) {
		const fPos = this.getAddress(fAddr, 1);
		const sPos = this.getAddress(sAddr, 2);
		const resPos = this.getAddress(resAddr, 3);		

		const cond = this.getData(fPos) === this.getData(sPos);
		this.setData(resPos, Number(cond));
		this.pos += 4;
	}

	jnz(fAddr = 0, sAddr = 0) {
		const fPos = this.getAddress(fAddr, 1);
		const sPos = this.getAddress(sAddr, 2);
		const cond = this.getData(fPos) !== 0;

		if (cond) {
			this.pos = this.getData(sPos);
		} else {
			this.pos += 3;
		}
	}

	jz(fAddr = 0, sAddr = 0) {
		const fPos = this.getAddress(fAddr, 1);
		const sPos = this.getAddress(sAddr, 2);
		const cond = this.getData(fPos) === 0;

		if (cond) {
			this.pos = this.getData(sPos);
		} else {
			this.pos += 3;
		}
	}

	add(fAddr = 0, sAddr = 0, resAddr = 0) {
		const fPos = this.getAddress(fAddr, 1);
		const sPos = this.getAddress(sAddr, 2);
		const resPos = this.getAddress(resAddr, 3);		

		const f = this.getData(fPos);
		const s = this.getData(sPos);
		const res = f + s;

		this.setData(resPos, res);
		this.pos += 4;
	}

	mul(fAddr = 0, sAddr = 0, resAddr = 0) {
		const fPos = this.getAddress(fAddr, 1);
		const sPos = this.getAddress(sAddr, 2);
		const resPos = this.getAddress(resAddr, 3);		

		const f = this.getData(fPos);
		const s = this.getData(sPos);
		const res = f * s;

		this.setData(resPos, res);
		this.pos += 4;
	}

	input(pAddr = 0) {
		if (this.inputData.length) {
			const inPos = this.getAddress(pAddr, 1);
			const inVal = this.inputData.shift();
			this.setData(inPos, inVal);
			this.pos += 2;
		} else {
			if (this.dispPause) {
				console.log("PAUSED");
			}
			this.pause = true;
		}
	}

	output(pAddr = 0) {
		const outPos = this.getAddress(pAddr, 1);
		const outVal = this.getData(outPos);
		this.outParam.push(outVal);
		if (this.debug) {
			console.log("DEBUG:", outVal);
		}
		this.pos += 2;
	}

	relBase(pAddr = 0) {
		const relPos = this.getAddress(pAddr, 1);
		const relVal = this.getData(relPos);
		this.relPos += relVal;
		this.pos += 2;
	}

	halt() {
		if (this.dispPause)
			console.log("HALT");
		this.pos = -1;
	}

}

module.exports.IntCode = IntCode;