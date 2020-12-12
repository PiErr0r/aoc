
import math, copy, re, hashlib
import itertools as it
# import lib for year 2020
# from lib import check_data, parse_row, has_all_fields

def rl(arr):
	return range(len(arr))

def parse(data):
	ret = {}
	for rule in data:
		reqs, res = tuple(map(lambda x: x.strip(), rule.split("=>")))
		reqs = list(map(lambda x: x.strip(), reqs.split(",")))
		val, key = res.split()
		ret[key] = [int(val), [], 0]
		for r in reqs:
			v, k = r.split()
			ret[key][1].append((int(v), k))
	return ret


ore_cnt = 0

def get_ores(d, key):
	global ore_cnt
	[value, reqs, curr] = d[key]
	for r in reqs:
		v, k = r
		if k == "ORE":
			ore_cnt += v
			break
		while v > d[k][2]:
			d = get_ores(d, k)
		d[k][2] -= v
	d[key][2] += value
			
	return d


def get_ores2(d, key, need = 1):
	"""
	Optimized get_ores fnc
	"""
	global ore_cnt
	[value, reqs, curr] = d[key]
	if curr >= need:
		d[key][2] -= need
		return d
	for r in reqs:
		v, k = r
		if k == "ORE":
			mul = math.ceil((need - curr) / value)
			# print("###",key, curr, need)
			ore_cnt += v * mul
			d[key][2] += value * mul
			return d
		else:
			# print(key, v, need, k)
			c_need = math.ceil((need - curr) / value) * v
			if c_need > d[k][2]:
				d = get_ores2(d, k, c_need)
			d[k][2] -= c_need
	mul = math.ceil((need - curr) / value)
	d[key][2] += value * mul
	return d

def part_1(data):
	data = parse(data)

	get_ores2(data, "FUEL")
	for i in data.keys():
		[a, b, c] = data[i]
		# print(i, a, c, b)
	print(ore_cnt)

	print('END OF PART1')
	return

def part_2(data):
	global ore_cnt
	goal = 1000000000000
	mini, maxi = 0, 1000000000000
	while mini < maxi:
		c = (mini + maxi) // 2
		# print(c, maxi, mini)
		ore_cnt = 0
		d = parse(data)
		get_ores2(d, "FUEL", c)
		if goal - ore_cnt > 0:
			mini = c + 1
		elif goal - ore_cnt < 0:
			maxi = c - 1
		else: break
	print(d["FUEL"])
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('14_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	