
import math, copy

with open('16_input') as f:
	data = f.read()
	data = data.split('\n')
	# data = list(map(int, data.split()))

result = {
	'children': 3,
	'cats': 7,
	'samoyeds': 2,
	'pomeranians': 3,
	'akitas': 0,
	'vizslas': 0,
	'goldfish': 5,
	'trees': 3,
	'cars': 2,
	'perfumes': 1
}

aunts = dict()
more = ['cats', 'trees']
less = ['pomeranians', 'goldfish']

def setup():
	for aunt in data:
		aunt = aunt.split()
		name = aunt[0] + aunt[1][:-1]
		aunts[name] = {
			aunt[2][:-1]: int(aunt[3][:-1]),	
			aunt[4][:-1]: int(aunt[5][:-1]),
			aunt[6][:-1]: int(aunt[7]),
		}

def part_1():
	setup()

	for aunt, poss in aunts.items():
		is_aunt = True
		for item in result.keys():
			if item in poss.keys():
				if result[item] != poss[item]:
					is_aunt = False
					break
		if is_aunt:
			print(aunt)
			break	


	return

def part_2():
	setup()

	for aunt, poss in aunts.items():		
		is_aunt = True
		for item in result.keys():
			if item in poss.keys():
				if item in less:
					if result[item] <= poss[item]:
						is_aunt = False
						break
				elif item in more:
					if result[item] >= poss[item]:
						is_aunt = False
						break
				else:
					if result[item] != poss[item]:
						is_aunt = False
						break
		if is_aunt:
			print(aunt)
			# break	
	return 


if __name__ == '__main__':
	# part_1()
	part_2()
	