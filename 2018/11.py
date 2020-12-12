
import math, copy, re, hashlib
import itertools as it
# import lib for year 2020
# from lib import check_data, parse_row, has_all_fields

def rl(arr):
	return range(len(arr))

def power(y, x, data):
	id = x + 10
	p = (id * y + data) * id
	p = (p % 1000) // 100
	p -= 5
	return p


def get_p(y, x, data, size = 3):
	total = 0
	for i in range(size):
		for j in range(size):
			total += power(y + i, x + j, data)
	return total

def part_1(data):
	data = int(data)

	maxi = 0
	maxi_cor = None
	for i in range(300 - 3):
		for j in range(300 - 3):
			curr_p = get_p(i, j, data, 3)
			if curr_p > maxi:
				maxi = curr_p
				maxi_cor = (j, i)
	print(maxi_cor)
	print('END OF PART1')
	return

def part_2(data):
	data = int(data)

	maxi = 0
	maxi_cor = None
	for size in range(1, 300):
		for i in range(300 - size):
			for j in range(300 - size):
				curr_p = get_p(i, j, data, size)
				if curr_p > maxi:
					maxi = curr_p
					maxi_cor = (j, i, size)
					print(maxi_cor, size)
	print(maxi_cor)
	# brute force :( and lucky that it was this small
	# run it and wait until the program stops producing bigger output
	# 234, 108, 16
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('11_input') as f:
		data = f.read()
		# data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	