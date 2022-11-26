
import math, copy, re, hashlib
import itertools as it
# import lib for year 2020
# from lib import check_data, parse_row, has_all_fields

FST = 20151125
MUL = 252533
MOD = 33554393

def rl(arr):
	return range(len(arr))

def mod_pow(n):
	res = FST
	tmp = MUL
	while n:
		if (n & 1): res = res * tmp % MOD
		n >>= 1
		tmp = (tmp * tmp) % MOD
	return res

def get_n(row, col):
	n = col * (col + 1) // 2
	n -= row
	return n

def part_1(data):

	row = int(data[1][-4:])
	col = int(data[2][-5:-1])
	col += row - 1
	n = get_n(row, col)
	print(mod_pow(n))
	print('END OF PART1')
	return

def part_2(data):
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('25_input') as f:
		data = f.read()
		data = data.split(',')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	