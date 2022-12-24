
const fs = require('fs');
const { exec } = require("child_process");
const { D4, D6, D8, MOD } = require("../lib");
const { joseph, findCycle } = require("../lib");
const { cache } = require("../lib");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../lib");
const { ord, chr, count, debug, disp, disp3, crt, gcd, lcm, modPow, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib");


let CURR = 0;
const N = (y, x, curr) => !curr.has([y-1,x-1]) && !curr.has([y-1,x]) && !curr.has([y-1,x+1]);
const _N = (y, x) => `${y-1}-${x}`;
const N_ = (y, x) => [y-1, x]
const S = (y, x, curr) => !curr.has([y+1,x-1]) && !curr.has([y+1,x]) && !curr.has([y+1,x+1]);
const _S = (y, x) => `${y+1}-${x}`;
const S_ = (y, x) => [y+1, x]
const W = (y, x, curr) => !curr.has([y+1,x-1]) && !curr.has([y,x-1]) && !curr.has([y-1,x-1]);
const _W = (y, x) => `${y}-${x-1}`;
const W_ = (y, x) => [y, x-1]
const E = (y, x, curr) => !curr.has([y+1,x+1]) && !curr.has([y,x+1]) && !curr.has([y-1,x+1]); 
const _E = (y, x) => `${y}-${x+1}`;
const E_ = (y, x) => [y, x+1]
const FNS = [N, S, W, E];
const _FNS = [_N, _S, _W, _E];
const FNS_ = [N_, S_, W_, E_];

function part1(data) {
	data = table(data);
	let curr = new set(); 
	iter(data, (row, i) => {
		iter(row, (col, j) => {
			if (col === '#')
				curr.add([i, j]);
		})
	});
	let res;
	range(1000)(_ => {
		const nw = new DD(0);
		iter(curr.items(), ([y, x]) => {
			let cnt = 0;
			iter(D8, ([dx, dy]) => {
				if (curr.has([y + dy, x + dx]))
					++cnt;
			});
			if (cnt === 0) {
				nw[`${y}-${x}`]++;
				// nw.add([y, x]);
			} else {
				if (FNS[(CURR + 0) % 4](y, x, curr))
					nw[_FNS[(CURR + 0) % 4](y, x)]++;
				else if (FNS[(CURR + 1) % 4](y, x, curr))
					nw[_FNS[(CURR + 1) % 4](y, x)]++;
				else if (FNS[(CURR + 2) % 4](y, x, curr))
					nw[_FNS[(CURR + 2) % 4](y, x)]++;
				else if (FNS[(CURR + 3) % 4](y, x, curr))
					nw[_FNS[(CURR + 3) % 4](y, x)]++;
				else
					nw[`${y}-${x}`]++;
			}
		});
		const nn = new set();
		let EM = 0;
		iter(curr.items(), ([y, x]) => {
			let cnt = 0;
			iter(D8, ([dx, dy]) => {
				if (curr.has([y + dy, x + dx]))
					++cnt;
			});
			if (cnt === 0) {
				nn.add([y, x]);
				++EM;
			} else {
				if (FNS[(CURR + 0) % 4](y, x, curr))
					if (nw[_FNS[(CURR + 0) % 4](y, x)] >= 2)
						nn.add([y, x])
					else nn.add(FNS_[(CURR + 0) % 4](y, x))
				else if (FNS[(CURR + 1) % 4](y, x, curr))
					if (nw[_FNS[(CURR + 1) % 4](y, x)] >= 2)
						nn.add([y, x])
					else nn.add(FNS_[(CURR + 1) % 4](y, x))
				else if (FNS[(CURR + 2) % 4](y, x, curr))
					if (nw[_FNS[(CURR + 2) % 4](y, x)] >= 2)
						nn.add([y, x])
					else nn.add(FNS_[(CURR + 2) % 4](y, x))
				else if (FNS[(CURR + 3) % 4](y, x, curr))
					if (nw[_FNS[(CURR + 3) % 4](y, x)] >= 2)
						nn.add([y, x])
					else nn.add(FNS_[(CURR + 3) % 4](y, x))
				else {
					nn.add([y, x])
					++EM;
				}
			}
		});
		if (curr.size === EM) {
			res = _ + 1;
			return true;
		}
		debug(_, curr.size, EM)
		curr = nn;
		CURR = (CURR + 1) % 4;
		// debug(nn)
		if (false) {
			let mxx = -Infinity, mxy = -Infinity, mnx = Infinity, mny = Infinity; 
			iter(curr.items(), ([y, x]) => {
				// debug("!", y, x)
				mnx = min(x, mnx);
				mxx = max(x, mxx);
				mny = min(y, mny);
				mxy = max(y, mxy);
			})
			const H = empty(mxy - mny + 1, mxx - mnx + 1).map(r => r.map(c => '.'));
			iter(curr.items(), ([y, x]) => {
				H[y-mny][x-mnx] = '#';
			});
			debug(_, curr.size)
			disp(H)
		}
	});
	let mxx = -Infinity, mxy = -Infinity, mnx = Infinity, mny = Infinity; 
	iter(curr.items(), ([y, x]) => {
		// debug("!", y, x)
		mnx = min(x, mnx);
		mxx = max(x, mxx);
		mny = min(y, mny);
		mxy = max(y, mxy);
	});
	// res = (mxy - mny + 1) * (mxx - mnx + 1) - curr.size;

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res;

	debug(res);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
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
