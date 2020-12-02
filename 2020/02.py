
import math, copy, re, hashlib
import itertools as it

def rl(arr):
	return range(len(arr))

def part_1(data):
	cnt = 0
	for condition in data:
		[low_high, letter, password] = condition.split()
		letter = letter[0]
		[low, high] = list(map(int, low_high.split('-')))
		if password.count(letter) >= low and password.count(letter) <= high:
			cnt += 1
			
	print(cnt)
	print('END OF PART1')
	return

def part_2(data):
	cnt = 0
	for condition in data:
		[low_high, letter, password] = condition.split()
		letter = letter[0]
		[low, high] = list(map(int, low_high.split('-')))
		is_low = is_high = 0
		if low - 1 < len(password) and password[low - 1] == letter:
			is_low = 1
		if high - 1 < len(password) and password[high - 1] == letter:
			is_high = 1
		cnt += (is_low^is_high)

	print(cnt)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('02_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	