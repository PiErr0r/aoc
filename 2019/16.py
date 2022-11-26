
import math, copy, re, hashlib
import itertools as it
# import lib for year 2020
# from lib import check_data, parse_row, has_all_fields

PAT = [0, 1, 0, -1]

def rl(arr):
	return range(len(arr))

def FFT(data):
	res = ''
	Z = ord('0')
	for i in range(len(data)):
		rp = 1
		pi = 0
		S = 0
		for char in data:
			if rp == i + 1:
				pi = (pi + 1) % 4
				rp = 0
			rp += 1
			num = ord(char) - Z
			S += num * PAT[pi]
			
		res += chr(Z + (abs(S) % 10))
	return res

def part_1(data):
	for phase in range(100):
		data = FFT(data)

	print(data[:8])
	print('END OF PART1')
	return

def FFT_mod(data):
	S = 0
	res = [0 for i in range(len(data))]
	print(data[:10])
	for i in reversed(data):
		S = (S + i) % 10
		res[i] = S
	return res

def FFT_modxx(data):
	res = ''
	S = 0
	Z = ord('0')
	# print(len(data))
	for i in reversed(data):
		S = (S + ord(i) - Z) % 10
		res = str(S) + res
	# print("END")
	return res

def mod_add(a, b):
	Z = ord('0')
	res = ''
	assert(len(a) == len(b))
	for i in range(len(a)):
		ac = ord(a[i]) - Z
		bc = ord(b[i]) - Z
		res += chr(Z + (ac + bc) % 10)
	return res

def FFT_new(data):
	Z = ord('0')
	res = ''
	first = True
	for i in reversed(data):
		if first:
			first = False
			res = i
			continue
		tmp = chr(Z + (ord(i) + ord(res[0]) - 2 * Z) % 10)
		res = tmp + res
	return res

def part_2xx(data):
	data = '02935109699940807407585447034323'
	ld = len(data)
	l = ld * 10000
	diff = l - int(data[:7])
	reps = diff // ld + 1
	print(reps)
	for phase in range(100):
		data = FFT_new(data)	
	print(data)

	goal = reps * ld - diff
	S = sum(list(map(int, data))) % 10
	while len(data) < reps * ld:
		S = (S + int(data[0])) % 10
		data = str(S) + data

	# for i in range(reps + 1):
	# 	try:
	# 		ind = res.index('78725270')
	# 		print(reps, ind)
	# 	except:
	# 		pass
	# 	res = mod_add(res, data)
	# 	print(res)
	print(data)
	print(data[ goal: goal + 8 ])
	print('END OF PART2')
	return 

def part_2(data):
	# data = '02935109699940807407585447034323'
	ld = len(data)
	l = ld * 10000
	diff = l - int(data[:7])
	reps = diff // ld + 1
	goal = reps * ld - diff
	data = data * reps
	data = list(map(int, data))
	# print(diff, len(data), int(data[:7]))

	for phase in range(100):
		print(phase)
		data = FFT_mod(data)

	print(''.join(map(str,data[ goal: goal + 8 ])))
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('16_input') as f:
		data = f.read()
		# data = data.split('\n')
		# data = list(map(int, data.split()))


	# part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	