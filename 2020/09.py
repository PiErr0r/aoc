
import math, copy, re, hashlib
import itertools as it
# import lib for year 2020
from lib import check_data, parse_row, has_all_fields

PRE_AMB = 25

def rl(arr):
	return range(len(arr))

def can_sum(arr, num):
	i = 0
	while i < PRE_AMB:
		j = 0
		while j < PRE_AMB:
			if i == j:
				j += 1
				continue
			if arr[i] + arr[j] == num:
				return True
			j += 1
		i += 1
	return False

def part_1(data):
	i = PRE_AMB + 1
	while i < len(data):
		if not can_sum(data[i-PRE_AMB:i], data[i]):
			break
		i += 1
	print(data[i])
	print('END OF PART1')
	part_2(data, data[i])
	return

def part_2(data, n):
	sums = {}
	s, i = 0, 0
	while i < len(data):
		s += data[i]
		if s == n:
			first, last = 0, i
		try:
			first = sums[s-n]
			last = i
			break
		except:
			sums[s] = i
		i += 1
	
	mini , maxi = math.inf, 0
	for i in range(first, last + 1):
		if data[i] > maxi: 
			maxi = data[i]
		if data[i] < mini:
			mini = data[i]
	print(maxi + mini)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('09_input') as f:
		data = f.read()
		# data = data.split('\n')
		data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	# part_2(copy.deepcopy(data))
	