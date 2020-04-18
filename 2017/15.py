
import math, copy, re

GEN_A = 634
GEN_B = 301

FACTOR_A = 16807
FACTOR_B = 48271

MUL_A = 4
MUL_B = 8

DIV = 2147483647

PAIR_NUM_1 = 40000000
PAIR_NUM_2 = 5000000

def part_1():
	curr_a = GEN_A
	curr_b = GEN_B
	L = 16
	cnt = 0
	for i in range(PAIR_NUM_1):
		curr_a = (curr_a * FACTOR_A) % DIV
		curr_b = (curr_b * FACTOR_B) % DIV
		bin_a = bin(curr_a)[2:][-16:]
		bin_b = bin(curr_b)[2:][-16:]
		if len(bin_a) < L:
			bin_a = (L - len(bin_a)) * '0' + bin_a
		if len(bin_b) < L:
			bin_b = (L - len(bin_b)) * '0' + bin_b
		if bin_a == bin_b: cnt += 1

	print(cnt)
	print('END OF PART1')
	return

def part_2():
	curr_a = GEN_A
	curr_b = GEN_B
	L = 16
	cnt = 0
	for i in range(PAIR_NUM_2):
		while curr_a % MUL_A != 0:
			curr_a = (curr_a * FACTOR_A) % DIV
		while curr_b % MUL_B != 0:
			curr_b = (curr_b * FACTOR_B) % DIV
		bin_a = bin(curr_a)[2:][-16:]
		bin_b = bin(curr_b)[2:][-16:]
		if len(bin_a) < L:
			bin_a = (L - len(bin_a)) * '0' + bin_a
		if len(bin_b) < L:
			bin_b = (L - len(bin_b)) * '0' + bin_b
		if bin_a == bin_b: cnt += 1
		if i % 100000 == 0:
			print(i, cnt)
		curr_a = (curr_a * FACTOR_A) % DIV
		curr_b = (curr_b * FACTOR_B) % DIV


	print(cnt)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	# with open('15_input') as f:
	# 	data = f.read()
	# 	data = data.split('\n')
	# 	data = list(map(int, data.split()))


	# part_1()
	part_2()
	