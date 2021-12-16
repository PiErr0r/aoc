const { int, num } = require("../lib");
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;

const HEX = {
	'0': '0000',
	'1': '0001',
	'2': '0010',
	'3': '0011',
	'4': '0100',
	'5': '0101',
	'6': '0110',
	'7': '0111',
	'8': '1000',
	'9': '1001',
	'A': '1010',
	'B': '1011',
	'C': '1100',
	'D': '1101',
	'E': '1110',
	'F': '1111',
}

const ops = {
	'0': (arr) => arr.reduce((a, c) => a += c, 0),
	'1': (arr) => arr.reduce((a, c) => a *= c, 1),
	'2': (arr) => min(...arr),
	'3': (arr) => max(...arr),
	'5': (arr) => Number(arr[0] > arr[1]),
	'6': (arr) => Number(arr[0] < arr[1]),
	'7': (arr) => Number(arr[0] === arr[1]),
}

const parsePacket = (bits) => {
	let res = [], L = 0, op;

	while (bits.length > 4) { // this allegedly ignores padding but be mindful in future
		const version = num(bits.slice(0, 3), 2);
		const type = num(bits.slice(3, 6), 2);		
		bits = bits.slice(6);
		L += 6;

		if (type === 4) {
			const nums = [];
			let end;
			do {
				end = bits[0];
				const n = bits.slice(1, 5);
				bits = bits.slice(5);
				nums.push(n);
				L += 5;
			} while (end !== '0');

			res.push(num(nums.join(''), 2));
		} else {
			op = ops[type];
			const lid = num(bits.slice(0,1));
			bits = bits.slice(1);
			L++;

			if (lid === 0) {
				L += 15
				const len = num(bits.slice(0, 15), 2);
				bits = bits.slice(15);
				let [R, _] = parsePacket(bits.slice(0, len));
				res.push(op(R));
				bits = bits.slice(len);
				L += len;
			} else {
				L += 11;
				const n = num(bits.slice(0, 11), 2);
				bits = bits.slice(11);
				let [R, len] = parsePacket(bits);
				R = [op(R.slice(0, n).map(int)), ...R.slice(n)];
				res.push(...R);
				bits = bits.slice(len);
				L += len;
			}
		}
	}
	return [res, L];
}

module.exports = {
	HEX, ops, parsePacket
}