
import math, copy

with open('11_input') as f:
	data = f.read()
	# data = data.split()
	# data = list(map(int, data.split()))

def has_2_double(string):
	cnt = i = 0

	while i < len(string) - 1:
		if string[i] == string[i + 1]:
			cnt += 1 
			i += 2
		if cnt == 2:
			return True
		i += 1
	return False

def has_inc(string):
	for i in range(len(string) - 2):
		letter = ord(string[i])
		if string[i + 1] == chr(letter + 1) and string[i + 2] == chr(letter + 2):
			return True
	return False

def has_bad(string):
	for i in 'iol':
		if i in string:
			return True
	return False

def inc_str(string):
	last = string[-1]
	str_arr = list(string)

	if last == 'z':
		last = 'a'
		str_arr = list(inc_str(string[:-1])) + [last]
	else:
		str_arr[-1] = chr( ord(last) + 1 )

	return ''.join(str_arr)

def part_1(data):
	start_str = data
	l = len(start_str)
	i = l
	while True:
		start_str = inc_str(start_str)
		if not has_bad(start_str) and has_2_double(start_str) and has_inc(start_str):
			print(start_str)
			break
	return

def part_2():
	data = 'hepxxyzz'
	part_1(data)
	return 


if __name__ == '__main__':
	# part_1(data)
	part_2()
	