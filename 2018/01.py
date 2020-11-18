
import math, copy, re, hashlib
import itertools as it


def part_1(data):
	res = 0
	for i in data:
		res += i
	print(res)
	print('END OF PART1')
	return

def part_2(data):
	res = 0
	d = {0:1}
	maxi = len(data)
	i = 0
	while True:
		res += data[i]
		try:
			d[res]
			break
		except:
			d[res] = 1
		i = (i + 1) % maxi
	print(res)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('01_input') as f:
		data = f.read()
		# data = data.split('\n')
		data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	