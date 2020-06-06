
import math, copy, re

# LENGTH = 20

def rev(s):
	ret = ''
	for i in s[::-1]:
		ret += i
	return ret

def xor(s):
	ret = ''
	for c in s:
		ret += '0' if c == '1' else '1'
	return ret

def get_dragon(a, LENGTH):

	while len(a) < LENGTH:
		b = a
		b = xor(rev(b))
		a = a + '0' + b

	return a[:LENGTH]

def get_checksum(s):
	while True:
		ret = ''
		for i in range(0, len(s), 2):
			ret += '1' if s[i] == s[i + 1] else '0'
		if len(ret) % 2:
			return ret
		else: s = ret

def part_1(data):
	LENGTH = 272
	data = get_dragon(data, LENGTH)
	csum = get_checksum(data)
	print(csum)
	print('END OF PART1')
	return

def part_2(data):
	LENGTH = 35651584
	data = get_dragon(data, LENGTH)
	csum = get_checksum(data)
	print(csum)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('16_input') as f:
		data = f.read()
		# data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	