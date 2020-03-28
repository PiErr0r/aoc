
import math, copy, json

with open('12_input') as f:
	data = f.read()
	# data = data.split()
	# data = list(map(int, data.split()))

def parse_json(js, no_red = False):

	if type(js) == str:
		return 0
	suma = 0
	if type(js) == list:
		for i in js:
			if type(i) == int:
				suma += i
			else:
				suma += parse_json(i, no_red)
	elif type(js) == dict:
		for i, val in js.items():
			if no_red and val == 'red':
				return 0
			if type(js[i]) == int:
				suma += js[i]
			else:
				suma += parse_json(js[i], no_red)
	return suma 


def part_1():
	json_data = json.loads(data)
	# print(json_data)
	tmp = parse_json(json_data)
	print(tmp)
	return

def part_2():
	json_data = json.loads(data)
	# print(json_data)
	tmp = parse_json(json_data, True)
	print(tmp)
	return


if __name__ == '__main__':
	part_1()
	part_2()
	