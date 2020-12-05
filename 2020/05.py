
import math, copy, re, hashlib
import itertools as it
# import lib for year 2020
from lib import check_data, parse_row, has_all_fields

def rl(arr):
	return range(len(arr))

def part_1(data):

	max_id = 0
	min_id = math.inf
	id_sum = 0
	for i in data:
		curr_id = int(i.replace("F", "0").replace("B", "1").replace("L", "0").replace("R","1"), 2)
		id_sum += curr_id
		if  curr_id > max_id:
			max_id = curr_id
		if curr_id < min_id:
			min_id = curr_id
	print(max_id)
	print('END OF PART1')
	part_2(max_id, min_id, id_sum)
	return

def ss(n):
	return n * (n + 1) // 2

def part_2(max_id, min_id, id_sum):

	print(ss(max_id) - ss(min_id - 1) - id_sum)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('05_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	# part_2(copy.deepcopy(data))
	