
import math, copy, re, hashlib
import itertools as it
# import lib for year 2020
# from lib import check_data, parse_row, has_all_fields

def rl(arr):
	return range(len(arr))

def parse(data):
	d = {}
	for rule in data:
		cond, res = rule.split("=>")
		d[cond.strip()] = res.strip()
	return d

def get_plant(curr, rules):
	return rules.get(curr, curr[2])

def cnt_plants(s, nil):
	return sum([i - nil if p == "#" else 0 for i, p in enumerate(s)])

def part_1(data):
	initial = data[0].split()[-1]
	nil_pos = 50
	initial = 50 * "." + initial + 50 * "."
	rules = parse(data[2:])

	for _ in range(20):
		print(initial)
		new = ""
		for i, pot in enumerate(initial):
			if i < 2 or i > len(initial) -3:
				new += pot
				continue
			new += get_plant(initial[i - 2: i + 3], rules)
		initial = new
	cnt = cnt_plants(initial, nil_pos)
	print(cnt)
	print('END OF PART1')
	return

def part_2(data):
	# this magic is done by inspecting the output from part1 when you extend the rigth part of the initial string by 140 dots and let it ride for 140 more generations, you will see the pattern
	end_num = 108
	end_str = "###...###....###.......###.........###........###.........###.......###.....###.........###...###.......###........###.....###.......###.........###...####"
	first = 68 - 20
	gens = 50000000000 - end_num
	ff = gens + first
	res = 0
	for i, p in enumerate(end_str):
		if p == "#":
			res += ff + i
	print(res)

	print('END OF PART2')
	return 

if __name__ == '__main__':
	with open('12_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	