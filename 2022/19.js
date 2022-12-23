
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

const getData = (data) => lines(data).map(r => r.split(' ')).map((r, i) => [i + 1, r[6], r[12], r[18], r[21], r[27], r[30]].map(a => int(a))).reduce((acc, curr) => {
	const [bp, rOre, rClay, rObsOre, rObsClay, rGeoOre, rGeoObs] = curr;
	acc[bp] = { bp, rOre, rClay, rObsOre, rObsClay, rGeoOre, rGeoObs };
	return acc;
}, {});

const dfs = (R, G, D, t) => {
	const _dfs = cache((R, G, t, fl) => {
		--t;
		if (t === 0) {
			return G.geode;
		}
	    // if s.geodes + s.time_left * s.geode_robots + s.time_left * (s.time_left - 1) / 2 <= floor {
	    //     return 0;
	    // }
	    // debug(R, G, t, fl)
	    if (G.geode + t * R.geode + t * (t - 1) / 2 <= floor) {
	    	return 0;
	    }
		// if (t === 10) {
		// 	debug(t, fl, R, G)
		// }
		const tGeo = G.obs >= D.rGeoObs && G.ore >= D.rGeoOre;
		const tObs = G.clay >= D.rObsClay && G.ore >= D.rObsOre;
		const tClay = G.ore >= D.rClay;
		const tOre = G.ore >= D.rOre;
		let best = fl;
		G.ore += R.ore;
		G.clay += R.clay;
		G.obs += R.obs;
		G.geode += R.geode;
		if (tGeo) {
			const g = {...G};
			g.obs -= D.rGeoObs; g.ore -= D.rGeoOre;
			const r = {...R};
			r.geode += 1;
			best = max(best, _dfs.p(r, g, t, best));
		}
		if (tObs) {
			const g = {...G};
			g.ore -= D.rObsOre; g.clay -= D.rObsClay;
			const r = {...R};
			r.obs += 1;
			best = max(best, _dfs.p(r, g, t, best));
		}
		if (tClay) {
			const g = {...G};
			g.ore -= D.rClay;
			const r = {...R};
			r.clay += 1;
			best = max(best, _dfs.p(r, g, t, best));
		}
		if (tOre) {
			const g = {...G};
			g.ore -= D.rOre;
			const r = {...R};
			r.ore += 1;
			best = max(best, _dfs.p(r, g, t, best));
		}
		best = max(best, _dfs.p({...R}, {...G}, t, best));
		return best;
	});
	return _dfs(R, G, t, 0);
}

const bfs = (R, G, D, t, bp) => {
	const V = new set();
	let states  = [[R.ore, R.clay, R.obs, R.geode, G.ore, G.clay, G.obs, G.geode, t]];
	let best = 0;
	let cnt = 0;
	while (states.length) {
		const ns = [];
		const [rore, rclay, robs, rgeode, gore, gclay, gobs, ggeode, tt] = states.shift();
		best = max(best, ggeode);
	    if (ggeode + tt * rgeode + tt * (tt - 1) / 2 <= best) {
	    	continue
	    }
		if (tt === 0 || V.has([rore, rclay, robs, rgeode, gore, gclay, gobs, ggeode, tt])) {
			continue;
		}
		V.add([rore, rclay, robs, rgeode, gore, gclay, gobs, ggeode, tt]);
		const tGeo = gobs >= D.rGeoObs && gore >= D.rGeoOre;
		const tObs = gclay >= D.rObsClay && gore >= D.rObsOre;
		const tClay = gore >= D.rClay;
		const tOre = gore >= D.rOre;
		let Gore = gore + rore;
		let Gclay = gclay + rclay;
		let Gobs = gobs + robs;
		let Ggeode = ggeode + rgeode;
		states.push([rore, rclay, robs, rgeode, Gore, Gclay, Gobs, Ggeode, tt - 1]);
		if (tClay) {
			states.push([rore, rclay + 1, robs, rgeode, Gore - D.rClay, Gclay, Gobs, Ggeode, tt - 1]);
		}
		if (tObs) {
			states.push([rore, rclay, robs + 1, rgeode, Gore - D.rObsOre, Gclay - D.rObsClay, Gobs, Ggeode, tt - 1]);
		}
		if (tGeo) {
			states.push([rore, rclay, robs, rgeode + 1, Gore - D.rGeoOre, Gclay, Gobs - D.rGeoObs, Ggeode, tt - 1]);
		}
		if (tOre) {
			states.push([rore + 1, rclay, robs, rgeode, Gore - D.rOre, Gclay, Gobs, Ggeode, tt - 1])
			if (cnt === 0) {
				// sort(states, (a, b) => b[7] - a[7] || b[6] - a[6]);
				// states = states.slice(0, 60000);
				if (tt <= 10) {
					states = states.filter(a => a[8] < 8 ? a[7] !== 0 && a[3] !== 0 : true)
				}
				if (states.length >= 500000 && tt <= 12) {
					debug("BAD STUFF!!!")
					sort(states, (a, b) => b[7] - a[7] || b[6] - a[6]);
					states = states.slice(0, 500000);
				} else {
					if (randint(100) < 20)
						sort(states, (a, b) => a[8] - b[8]);
					else 
						sort(states, (a, b) => b[7] - a[7] || b[6] - a[6]);
				}

			}
			++cnt;
			cnt %= 10000;
		}
	}
	return best;
}

function part1(data) {
	// Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 14 clay. Each geode robot costs 3 ore and 16 obsidian.
	data = getData(data);
	// debug(data); return;
	let res = 0, res2 = 1;
	iter(keys(data), bp => {
		if (bp > 3) return true;
		const R = { ore: 1, clay: 0, obs: 0, geode: 0 };
		const G = { ore: 0, clay: 0, obs: 0, geode: 0 };
		// const r = bfs(R, G, data[bp], 24);
		debug("GO", bp)
		const r = bfs(R, G, data[bp], 32, bp);
		debug(bp, r)
		res += bp * r;
		res2 *= r;
	})
	// bp 1 => 11
	// bp 2 => 22
	// bp 3 => 17
	// 4114 part2
	// for part 1 uncomment bfs for 24 and sort with slice in there, also remove return true
	debug({res, res2});
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
	let data = fs.readFileSync("19_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
