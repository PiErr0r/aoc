
import math, copy, re, hashlib
import itertools as it


def part_1(data):

	i = 0
	maxi = len(data) - 1
	while i < maxi:
		# print(i)
		if (data[i].isupper() == data[i + 1].islower() or data[i].islower() == data[i + 1].isupper()) and data[i].lower() == data[i + 1].lower():
			data = data[0:i] + data[i + 2:]
			maxi -= 2
			i -= 1
			if i < 0:
				i = 0
		else:
			i += 1

	print(len(data))
	print('END OF PART1')
	return

def part_2(data):

	shortest = len(data)

	for letter in range(ord('a'), ord('z') + 1):
		new_data = data.replace(chr(letter), '').replace(chr(letter).upper(), '')
		i = 0
		maxi = len(new_data) - 1
		while i < maxi:
			# print(i)
			if (new_data[i].isupper() == new_data[i + 1].islower() or new_data[i].islower() == new_data[i + 1].isupper()) and new_data[i].lower() == new_data[i + 1].lower():
				new_data = new_data[0:i] + new_data[i + 2:]
				maxi -= 2
				i -= 1
				if i < 0:
					i = 0
			else:
				i += 1		
		if (s := len(new_data)) < shortest:
			shortest = s
	print(shortest)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('05_input') as f:
		data = f.read()
		# data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	