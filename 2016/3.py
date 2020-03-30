
import math, copy



def is_proper(tr):
	[a, b, c] = tr
	if a + b <= c:
		return False
	if a + c <= b:
		return False
	if b + c <= a:
		return False
	return True

def part_1(data):
	cnt = 0
	for nums in data:
		tr = list(map(int, nums.split()))
		if is_proper(tr):
			cnt += 1
	print(cnt)
	return

def part_2(data):
	cnt = 0
	i = 0
	while i < len(data) - 6:
		
		tr = [data[i], data[i + 3], data[i + 6]]
		if is_proper(tr):
			cnt += 1
		if (i + 1) % 3 == 0:
			i += 7
		else:
			i += 1

	print(cnt)
	return 


if __name__ == '__main__':
	with open('3_input') as f:
		data = f.read()
		data1 = data.split('\n')
		data2 = list(map(int, data.split()))

	# part_1(data1)
	part_2(data2)
	