
import math, copy, re

def cleanup(data, char_count = False):
	ret = ''
	garbage = False
	i = 0
	L = len(data)
	cnt = 0
	while i < L:
		if not garbage:
			if data[i] == '<':
				garbage = True
			else: ret += data[i]
		else:
			if data[i] == '!':
				i += 1
			elif data[i] == '>':
				garbage = False
			elif char_count:
				cnt += 1
		i += 1

	return ret if not char_count else cnt



def part_1(data):
	data = cleanup(data)
	depth = 0
	suma = 0
	for i in data:
		if i == '{':
			depth += 1
		elif i == '}':
			suma += depth
			depth -= 1
	print(suma)
	return

def part_2(data):
	cnt = cleanup(data, True)
	print(cnt)
	return 


if __name__ == '__main__':
	with open('9_input') as f:
		data = f.read()
		# data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	