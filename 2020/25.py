
import math, copy, re, hashlib
import itertools as it
# import lib for year 2020
from lib import check_data, parse_row, has_all_fields

div = 20201227
sub = 7

def rl(arr):
	return range(len(arr))

def part_1(data):

	i = 0
	value = 1
	[v1, v2] = data
	l1, l2 = None, None
	while l1 is None or l2 is None:
		value *= sub
		value %= div
		if value == v1 and l1 is None:
			l1 = i + 1
		if value == v2 and l2 is None:
			l2 = i + 1
		i += 1
	print(l1, l2)
	print(v1, v2)
	v11 = v22 = 1
	for i in range(l2):
		v11 *= v1
		v11 %= div
	for i in range(l1):
		v22 *= v2
		v22 %= div
	print(v11, v22)

	print('END OF PART1')
	return

def part_2(data):
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('25_input') as f:
		data = f.read()
		# data = data.split('\n')
		data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	