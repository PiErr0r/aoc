
import math, copy, re, hashlib
import itertools as it


def part_1(data):

	layers = []
	i = 0
	mul = 25 * 6
	while i < len(data):
		layers.append(data[i:i + mul])
		i += mul

	suma = mul * 10
	small = None
	for l in layers:
		curr = list(l).count('0')
		if curr < mul:
			mul = curr
			small = l


	ones = 0
	twos = 0
	for l in small:
		if l == '1':
			ones += 1
		elif l == '2':
			twos += 1

	print(ones * twos)

	print('END OF PART1')
	return

def part_2(data):

	layers = []
	mul = 25 * 6
	i = 0
	while i < len(data):
		layers.append(data[i:i + mul])
		i += mul

	img = [" "] * mul
	i = 0
	while i < mul:
		for l in layers:
			if l[i] != '2':
				img[i] = "#" * 2 if l[i] == '1' else ' ' * 2
				break
		i += 1

	i = 0
	print()
	while i < len(img):
		print(''.join(img[i:i + 25]))
		i += 25
	print()
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('08_input') as f:
		data = f.read()
		# data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	