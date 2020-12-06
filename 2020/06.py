
import math, copy, re, hashlib
import itertools as it
# import lib for year 2020
from lib import check_data, parse_row, has_all_fields

def rl(arr):
	return range(len(arr))

def part_1(data):

	i = 0
	cnt = 0
	s = ""
	while i <= len(data):
		if i == len(data) or data[i].strip() == "":
			a = set(list(s))
			cnt += len(a)
			s = ""
			i += 1
			continue
		s += data[i].strip()
		i += 1

	print(cnt)
	print('END OF PART1')
	return

def part_2(data):
	i = 0
	cnt = 0
	s = ""
	prev = 0
	while i <= len(data):
		if i == len(data) or data[i].strip() == "":
			a = set(list(s))
			for j in a:
				if s.count(j) == i - prev:
					cnt += 1
					
			s = ""
			i += 1
			prev = i
			continue
		s += data[i].strip()
		i += 1

	print(cnt)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('06_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	