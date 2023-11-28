
const fs = require('fs');
const { exec } = require("child_process");
const { D4, D6, D8, MOD } = require("../lib");
const { joseph, findCycle } = require("../lib");
const { cache } = require("../lib");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../lib");
const { ord, chr, count, debug, disp, disp3, crt, gcd, lcm, modPow, modPowBig, modInv, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib");
const { IntCode } = require('./intcode');

const initNIC = (NIC) => {
	iter(NIC, (pc, i) => {
		pc.calculate();
		pc.unpause([-1]);
	})
}

const getOutput = (NIC, addreses) => {
	let res = [];
	iter(NIC, (pc, i) => {
		pc.calculate();
		const out = pc.getOutput(-1);
		range(0, out.length, 3)(j => {
			if (out[j] === 255) {
				res.push(...out);
				return;
			}
			addreses[out[j]].push(...out.slice(j + 1, j + 3));
		})
	});
	return res;
}

const sendInputs = (NIC, addreses) => {
	iter(NIC, (pc, i) => {
		const data = addreses[i];
		if (data.length === 0) return;
		pc.unpause([...data]);
	})
}

function part1(data) {

	let res = 0;
	data = ints(data);

	const NIC = empty(50).map((_, i) => new IntCode([...data], [i], false));
	initNIC(NIC);
	let addreses = empty(50).map(_ => [-1]);

	while (true) {
		let packet = getOutput(NIC, addreses);
		if (packet.length) {
			res = packet[2]
			break;
		}
		sendInputs(NIC, addreses)
		addreses = addreses = empty(50).map(_ => []);
	}

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	data = ints(data);

	const NIC = empty(50).map((_, i) => new IntCode([...data], [i]));
	let NAT = [-1, -1];
	initNIC(NIC);
	let addreses = empty(50).map(_ => [-1]);
	const deliveredY = new set();

	while (true) {
		let packet = getOutput(NIC, addreses);
		if (packet.length) {
			NAT = packet.slice(1, 3);
			NAT = packet.slice(packet.length - 2)
		}
		if (addreses.every(addr => addr.length === 0)) {
			if (deliveredY.has(NAT[1])) {
				res = NAT[1];
				break;
			}
			deliveredY.add(NAT[1]);
			addreses[0] = [...NAT];
		}
		sendInputs(NIC, addreses)
		addreses = addreses = empty(50).map(_ => []);
	}
	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("23_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
