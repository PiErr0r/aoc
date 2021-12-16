
const fs = require('fs');
const { exec } = require("child_process");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../lib");
const { ord, chr, count, debug, disp, crt, gcd, lcm, modPow, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
const { HEX, ops, parsePacket } = require('./lib_2021');

function part1(data) {

	let asd = '04005AC33890';
	let tmp = asd.split('').map(a => HEX[a]).join('');
	debug(tmp)

	let bits = data.split('').map(a => HEX[a]).join('');
	let res = 0;
	while (bits.length) {
		const version = num(bits.slice(0, 3), 2);
		const type = num(bits.slice(3, 6), 2);		
		res += version;
		bits = bits.slice(6);
		if (type === 4) {
			while (bits[0] !== '0') {
				bits = bits.slice(5);
			};
			bits = bits.slice(5);
		} else {
			const lid = num(bits.slice(0,1));
			bits = bits.slice(1);
			bits = bits.slice(lid === 0 ? 15 : 11)
		}
	}
	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let bits = data.split('').map(a => HEX[a]).join('');
	let res = parsePacket(bits)[0][0];
	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("16_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
