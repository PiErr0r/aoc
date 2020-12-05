
import math, copy, re, hashlib
import itertools as it
# import lib for year 2020
from lib import check_data, parse_row, has_all_fields

def rl(arr):
	return range(len(arr))

def get_r_c(data):
	r_data = data[:7]
	lr = len(r_data)
	c_data = data[7:]
	lc = len(c_data)
	r, c = 0 , 0
	for i in range(lr):
		r += (0 if r_data[i] == 'F' else (1 << (lr - i - 1)))
	for i in range(lc):
		c += (0 if c_data[i] == 'L' else (1 << (lc - i - 1)))
	return r, c

def part_1(data):

	max_id = 0
	ids = set()
	for i in data:
		r, c = get_r_c(i)
		curr_id = r * 8 + c
		ids |= {curr_id}
		if  curr_id > max_id:
			max_id = curr_id
	print(max_id)
	print('END OF PART1')
	part_2(max_id, ids)
	return

def part_2(max_id, ids):
	print(max(set(list(range(max_id))) - ids))
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('05_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	# part_2(copy.deepcopy(data))
	