
import math, copy, re


def part_1(data):
	valid = 0
	for row in data:
		row = row.split()
		if len(set(row)) == len(row):
			valid += 1
	print(valid)

	return

def part_2(data):
	valid = 0
	for row in data:
		row = row.split()
		row = [''.join(sorted(x)) for x in row]
		print(row)
		if len(set(row)) == len(row):
			valid += 1
	print(valid)
	return 


if __name__ == '__main__':
	with open('4_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(data)
	part_2(data)
	