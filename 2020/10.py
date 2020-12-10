
import math, copy, re, hashlib
import itertools as it
# import lib for year 2020
from lib import check_data, parse_row, has_all_fields

def rl(arr):
	return range(len(arr))

def part_1(data):
	ones, twos, threes = 0, 0, 0
	data.sort()
	data = [0] + data[::] + [data[-1] + 3]
	i = 1
	while i < len(data):
		if data[i] - data[i - 1] == 1:
			ones += 1
		if data[i] - data[i - 1] == 2:
			twos += 1	
		if data[i] - data[i - 1] == 3:
			threes += 1
		i += 1 
	print(ones, twos, threes)
	print(ones * threes)
	print('END OF PART1')
	return

def get_sums(n, nums):
	if n < 0:
		return 0 
	if n == 1 or n == 0 or len(nums) == 0:
		return 1
	if n == nums[0]:
		return 0
	s1 = get_sums(n - nums[0], nums)
	s2 = get_sums(n, nums[1:])
	return s1 + s2

def part_2(data):
	data.sort()
	data = [0] + data[::] + [data[-1] + 3]
	arr = [1, 2, 3]
	i = 1
	res = 1
	while i < len(data):
		cnt = 0
		while data[i] - data[i - 1] == 1:
			cnt += 1
			i += 1
		if cnt >= 1:
			res *= get_sums(cnt + 1, arr)
		i += 1
	print(res)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('10_input') as f:
		data = f.read()
		# data = data.split('\n')
		data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	