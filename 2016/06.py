
import math, copy

def find_max(string):
	maxi = 0
	letter = None
	for l in string:
		num = string.count(l)
		if num > maxi and l != letter:
			letter = l
			maxi = num
	return letter

def find_min(string):
	mini = len(string)
	letter = None
	for l in string:
		num = string.count(l)
		if num < mini and l != letter:
			letter = l
			mini = num
	return letter

def part_1(data):
	decoded = dict()
	new = ''
	for code in data:
		for i, char in enumerate(code):
			if i in decoded.keys():
				decoded[i] += [char]
			else:
				decoded[i] = [char]

	for S in decoded.values():
		string = ''.join(S)
		maxi = find_max(string)
		new += maxi
	print(new)

	return

def part_2(data):
	decoded = dict()
	new = ''
	for code in data:
		for i, char in enumerate(code):
			if i in decoded.keys():
				decoded[i] += [char]
			else:
				decoded[i] = [char]

	for S in decoded.values():
		string = ''.join(S)
		mini = find_min(string)
		new += mini
	print(new)

	return

	return 


if __name__ == '__main__':
	with open('6_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(data)
	part_2(data)
	