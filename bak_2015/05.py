
import math, copy

with open('5_input') as f:
	data = f.read()
	data = data.split()
	# data = list(map(int, data.split()))

def has_vowels(string):
	cnt = 0
	for letter in string:
		if letter in 'aeiou':
			cnt += 1
			if cnt == 3:
				return True
	return False

def has_not_bad(string):
	bad_strings = ['ab', 'cd', 'pq', 'xy']
	for bs in bad_strings:
		if bs in string:
			return False
	return True

def has_double(string):
	for i in range(len(string) - 1):
		if string[i] == string[i + 1]:
			return True
	return False

def has_double_pair(string):
	for i in range(len(string) - 1):
		if string[i : i + 2] in string[:i] or string[i : i + 2] in string[i + 2:]:
			return True
	return False

def has_letter_between(string):
	for i in range(len(string) - 2):
		if string[i] == string[i + 2]:
			return True
	return False

def part_1():
	nice = naughty = 0

	for string in data:
		if has_vowels(string.strip()) and has_not_bad(string.strip()) and has_double(string.strip()):
			nice += 1
		else:
			naughty += 1
	print(nice)
	return

def part_2():
	nice = naughty = 0

	for string in data:
		if has_double_pair(string.strip()) and has_letter_between(string.strip()):
			nice += 1
		else:
			naughty += 1
	print(nice)
	return 

if __name__ == '__main__':
	# part_1()
	part_2()
	