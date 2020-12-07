
import math, copy, re, hashlib
import itertools as it
# import lib for year 2020
from lib import check_data, parse_row, has_all_fields

START = 'shiny gold'

def rl(arr):
	return range(len(arr))

def get_parents(bags, key):
	res = set()
	for p in bags[key]:
		res |= {p}
		res |= get_parents(bags, p)
	return res
def part_1(data):
	bags = dict()
	for i in data:
		[parent, children] = i.split('contain')
		c = list(map(lambda x: x.strip(), children.split(',')))
		p = ' '.join(parent.split()[0:2])
		for j in c:
			child = " ".join(j.split()[1:3])
			try:
				bags[child] |= {p}
			except:
				bags[child] = {p}
			if p not in bags.keys():
				bags[p] = set()

	# print(bags)
	ans = get_parents(bags, START)
	print(len(ans))
	print('END OF PART1')
	return

def get_children(bags, key):
	res = 0
	for i in bags[key]:
		res += i[0] + i[0] * get_children(bags, i[1])
	return res

def part_2(data):
	bags = dict()
	for i in data:
		[parent, children] = i.split('contain')
		c = list(map(lambda x: x.strip(), children.split(',')))
		p = ' '.join(parent.split()[0:2])
		if len(c) == 1 and c[0][:2] == "no":
			c_set = set()
		else:
			c_set = {(int(j.split()[0]), " ".join(j.split()[1:3])) for j in c}

		try:
			bags[p] |= c_set
		except:
			bags[p] = c_set
		for child in c_set:
			if child[1] not in bags.keys():
				bags[child[1]] = set()

	ans = get_children(bags, START)
	print(ans)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('07_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	