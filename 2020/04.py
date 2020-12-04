
import math, copy, re, hashlib
import itertools as it
from lib import check_data, parse_row, has_all_fields

def rl(arr):
	return range(len(arr))

def part_1(data):

	i = 0
	cnt = 0
	curr_data = dict()
	while i <= len(data):
		if i == len(data) or data[i].strip() == "":
			if has_all_fields(curr_data): 
				cnt += 1
			curr_data = dict()
			i += 1
			continue
		curr_data = parse_row(curr_data, data[i])
		i += 1
	print(cnt)
	print('END OF PART1')
	return

def part_2(data):
	i = 0
	cnt = 0
	curr_data = dict()
	while i <= len(data):
		if i == len(data) or data[i].strip() == "":
			if has_all_fields(curr_data) and check_data(curr_data): 
				cnt += 1
			curr_data = dict()
			i += 1
			continue
		curr_data = parse_row(curr_data, data[i])
		i += 1
	print(cnt)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('04_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	