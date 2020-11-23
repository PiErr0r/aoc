
import math


def part_1():
	with open('2_input') as f:
		data = f.read()

	data = data.split('\n')
	# data = list(map(int, data.split()))
	area = 0
	for box in data:
		[l, w, h] = list(map(int, box.split('x')))
		array_a = [2*l*w , 2*w*h , 2*h*l]
		min_a = min(array_a) / 2 
		area += sum(array_a) + min_a

	print(area)

def part_2():
	with open('2_input') as f:
		data = f.read()

	data = data.split('\n')
	length = 0

	for box in data:
		[l, w, h] = list(map(int, box.split('x')))
		arr_p = [2 * (l + w), 2 * (w + h), 2 * (l + h)]		
		min_p = min(arr_p)
		bow = l * w * h
		length += min_p + bow

	print(length)


if __name__ == '__main__':
	#part_1()
	part_2()