
import math, copy

with open('10_input') as f:
	data = f.read()
	# data = data.split()
	# data = list(map(int, data.split()))

def part_1():
	string = data
	x = 0
	while x < 50:
		# print(string)
		new_string = ''
		curr_len = 1
		for i in range(len(string) - 1):
			if string[i] == string[i + 1]:
				curr_len += 1
				continue 
			else:
				new_string += str(curr_len) + string[i]
				if i == len(string) - 2:
					new_string += '1' + str(string[-1])
				curr_len = 1

		string = new_string
		new_string = ''
		x += 1
	print(len(string))
	return

def part_2():
	return 


if __name__ == '__main__':
	part_1()
	#part_2()
	