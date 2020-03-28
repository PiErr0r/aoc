
import math, copy

with open('8_input') as f:
	data = f.read()
	data = data.split('\n')
	# data = list(map(int, data.split()))

def part_1():

	diff = 0
	for asd in data:
		string = asd.strip()
		diff += 2
		i = 0
		
		while i < len(string) - 1:
			if string[i] == '\\':
				if string[i + 1] == 'x':
					diff += 3
					i += 4
				else:
					diff += 1
					i += 2
			else:
				i += 1

	print(diff)
	return

def part_2():
	diff = 0
	for asd in data:
		string = asd.strip()
		diff += 4
		i = 0

		while i < len(string) - 1:
			if string[i] == '\\':
				if string[i + 1] == 'x':
					diff += 1
					i += 4
				else:
					diff += 2
					i += 2

			else:
				i += 1

	print(diff)
	return 


if __name__ == '__main__':
	part_1()
	part_2()
	