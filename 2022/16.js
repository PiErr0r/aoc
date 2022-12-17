
const fs = require('fs');
const { exec } = require("child_process");
const { D4, D6, D8, MOD } = require("../lib");
const { cache } = require("../lib");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../lib");
const { ord, chr, count, debug, disp, crt, gcd, lcm, modPow, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib/itertools");
// const { parsePacket, ops, HEX, ALU, VARS, resetVars } = require('./lib_2021'); // specific to AOC 2021

const allOpen = (data) => keys(data).every(valve => data[valve].open);

let MX = 0;

const mergeZeroes = (data) => {
	const merged = new set();
	const K = keys(data).sort();
	iter(K, k => {
		if (data[k].rate !== 0 || merged.has(k)) return;
		iter(data[k].children, ([valve, dist]) => {
			if (data[valve].rate !== 0) return;
			if (valve === 'AA') return;
			merged.add(valve);
			const children = data[valve].children.filter(c => c[0] !== k).map(c => [c[0], c[1] + 1]);
			data[k].children = data[k].children.filter(c => c[0] !== valve);
			iter(children, ([key, dist]) => {
				if (data[k].children.find(c => c[0] === key) === undefined) {
					data[k].children.push([key, dist]);
				}
			});
			iter(keys(data), kk => {
				if (kk === k) return;
				let i;
				if ((i = data[kk].children.findIndex(c => c[0] === valve)) !== -1) {
					const tmp = data[kk].children[i];
					data[kk].children[i] = [k, tmp[1] + 1];
				}
			})
		});
	});
	iter([...merged], k => {
		delete data[k];
	})
}

const removeZeroes = (data) => {
	iter(keys(data), k => {
		while (data[k].children.some(c => data[c[0]].rate === 0)) {
			let children = []
			let curr = new set();
			iter(data[k].children, ([valve, dist]) => {
				if (data[valve].rate !== 0) {
					children.push([valve, dist]);
					curr.add(valve);
					return;
				}
				iter(data[valve].children, ([vChild, vDist]) => {
					if (curr.has(vChild) || vChild === k) return;
					curr.add(vChild);
					children.push([vChild, dist + vDist]);
				});
			});
			data[k].children = [...children];
		}
	})
}

const dfs = (data, curr, round, total, p) => {
	if (allOpen(data) || round >= 30) return [total, p];
	let mx = 0, a = '', b = '';
	iter(data[curr].children, ([valve, dist]) => {
		let tmp;
		if (!data[curr].open && round + dist <= 29 && data[curr].rate) {
			data[curr].open = 1;
			[tmp, a] = dfs(data, valve, round + dist + 1, total + (30 - round) * data[curr].rate, p + '+' + `${round}:${curr}`);
			data[curr].open = 0;
		}
		if (tmp > mx) b = a;
		mx = max(mx, tmp || 0);
		if (round + dist < 30 && !p.endsWith(valve)) {
			if (data[curr].open)
				data[curr].open++;
			[tmp, a] = dfs(data, valve, round + dist, total, p + '-' + `${round}:${curr}`);
			if (data[curr].open)
				data[curr].open--;
		}
		if (tmp > mx) b = a;
		mx = max(mx, tmp || 0);
	});
	if (mx > total) p = b;
	if (mx > MX) {
		MX = max(mx, MX);
		debug("#", MX, p);
	}
	return [max(mx, total), p];
}

function part1(data) {

	data = lines(data)
		.map(r => r.split(' '))
		.map(([a, b, ...c]) => [a, int(b), ...c])
		.reduce((acc, curr) => {
			const [valve, rate, ...children] = curr;
			// debug(rate)
			acc[valve] = { rate, children, open: rate === 0 };
			return acc;
		}, {});

	iter(keys(data), k => {
		data[k].children = data[k].children.map(c => [c, 1])
	});
	mergeZeroes(data);
	removeZeroes(data);
	iter(keys(data), k => {
		if (k !== 'AA' && data[k].open) {
			delete data[k];
		}
	})

	iter(keys(data), valve => {
		sort(data[valve].children, (a, b) => data[a[0]].rate - data[b[0]].rate);
	});

	let [res, _] = dfs(data, 'AA', 1, 0, '');

	debug(res, _);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const dfs2 = (data, curr, currEl, round, roundEl, total, p, pEl) => {
	if (allOpen(data) || round >= 26 || roundEl >= 26) return [total, p, pEl];
	let mx = 0, a = '', b = '', _, c;
	const TMP1 = 26;
	const TMP2 = TMP1 - 1;
	iter(data[curr].children, ([valve, dist], i) => {
		c = currEl === curr && data[currEl].children.slice(i).length ? data[currEl].children.slice(i) : data[currEl].children;
		iter(c || data[currEl].children, ([eValve, eDist]) => {
			if (curr === currEl && valve === eValve) return;
			let tmp;
			if (!data[curr].open && round + dist <= TMP2 && data[curr].rate) {
				data[curr].open = 1;
				if (!data[currEl].open && roundEl + eDist <= TMP2 && data[currEl].rate) {
					data[currEl].open = 1;
					[tmp, a, _] = dfs2(data, valve, eValve, round + dist + 1, roundEl + eDist + 1, total + (26 - round) * data[curr].rate + (26 - roundEl) * data[currEl].rate, p + '+' + `${round}:${curr}`, pEl + '+' + `${roundEl}:${currEl}`);
					data[currEl].open = 0;
				}
				if (roundEl + eDist < TMP1 && !pEl.endsWith(eValve)) {
					if (data[currEl].open)
						data[currEl].open++;
					[tmp, a, _] = dfs2(data, curr, eValve, round + dist, roundEl + eDist, total + (26 - round) * data[curr].rate, p + '+' + `${round}:${curr}`, pEl + '-' + `${roundEl}:${currEl}`)
					if (data[currEl].open)
						data[currEl].open--;
				}
				data[curr].open = 0;
			}
			if (tmp > mx) b = a;
			mx = max(mx, tmp || 0);
			if (round + dist < TMP1 && !p.endsWith(valve)) {
				if (data[curr].open)
					data[curr].open++;
				if (!data[currEl].open && roundEl + eDist <= TMP2 && data[currEl].rate) {
					data[currEl].open = 1;
					[tmp, a, _] = dfs2(data, valve, currEl, round + dist, roundEl + eDist + 1, total + (26 - roundEl) * data[currEl].rate, p + '-' + `${round}:${curr}`, pEl + '+' + `${roundEl}:${currEl}`);
					data[currEl].open = 0;
				}
				if (roundEl + eDist < TMP1 && !pEl.endsWith(eValve)) {
					if (data[currEl].open)
						data[currEl].open++;
					[tmp, a, _] = dfs2(data, valve, eValve, round + dist, roundEl + eDist, total, p + '-' + `${round}:${curr}`, pEl + '-' + `${roundEl}:${currEl}`);
					if (data[currEl].open)
						data[currEl].open--;
				}
				// [tmp, a] = dfs2(data, valve, eValve, round + dist, total, p + '-' + `${round}:${curr}`);
				if (data[curr].open)
					data[curr].open--;
			}
			if (tmp > mx) b = a;
			mx = max(mx, tmp || 0);
		})
	});
	if (mx > total) p = b;
	if (mx > MX) {
		MX = max(mx, MX);
		debug("#", MX, p, pEl);
	}
		// debug("#", MX, p, pEl);
	return [max(mx, total), p];
}

const calcPressure = (valves, turned) => {
	let pressure = 0;
	// debug(turned)
	iter(turned.items(), valve => {
		// debug('###',pressure, valve, valves[valve])
		pressure += valves[valve].rate;
	});
	return pressure;
}

const solve = (data) => {
	let states = [[0, new set(), 'AA', 'AA']];
	const goodCnt = keys(data).reduce((acc, curr) => {
		if (data[curr].rate !== 0) 
			acc += data[curr].rate;
		return acc;
	}, 0);
	range(26)(M => {
		debug("min", M);
		const nStates = [];
		iter(states, ([pressure, turned, me, ele]) => {
			// if (turned.size / 2 >= goodCnt) {
			// 	nStates.push([pressure + calcPressure(turned), turned, me, ele]);
			// }
			const mes = data[me].children.map(c => [c, turned]);
			const eles = data[ele].children.map(c => [c, turned]);
			if (!turned.has(me) && data[me].rate > 0) {
				mes.push([me, set.or(turned, [me])]);
			}
			if (!turned.has(ele) && data[ele].rate > 0) {
				eles.push([ele, set.or(turned, [ele])]);
			}
			iter(mes, ([nMe, meT]) => {
				iter(eles, ([nEle, eleT]) => {
					nStates.push([
						pressure + calcPressure(data, turned),
						set.or(turned, set.or(meT, eleT)),
						nMe,
						nEle,
					])
				})
			});
		});
		sort(nStates, (a, b) => b[0] - a[0]);
		states = nStates.slice(0, M < 5 ? 14000 : 4000)
	})
	return states[0][0];
}

function part2(data) {

	data = lines(data)
		.map(r => r.split(' '))
		.map(([a, b, ...c]) => [a, int(b), ...c])
		.reduce((acc, curr) => {
			const [valve, rate, ...children] = curr;
			acc[valve] = { rate, children, open: rate === 0 };
			return acc;
		}, {});

	let res = solve(data);

	debug(res); // 2304
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("16_input").toString("utf-8");

	// part1(data);
	part2(data);
	process.exit(0);
}

main();
