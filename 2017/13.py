
import math, copy, re


def setup(data):
	FIREWALL = dict()
	for scanner in data:
		[layer, rng] = list(map(int, scanner.split(': ')))
		FIREWALL[layer] = dict(rng = rng, direction = 1, pos = 0)
	return FIREWALL

def move_scanner(FIREWALL):
	for layer in FIREWALL.keys():
		direction = FIREWALL[layer]['direction']
		if FIREWALL[layer]['pos'] == 0:
			direction = 1
		elif FIREWALL[layer]['pos'] == FIREWALL[layer]['rng'] - 1:
			direction = -1
		FIREWALL[layer]['direction'] = direction
		FIREWALL[layer]['pos'] += direction

	return FIREWALL



def part_1(data):
	FIREWALL = setup(data)
	max_pos = max(FIREWALL.keys())
	my_pos = 0
	severity = 0
	while my_pos <= max_pos:
		if my_pos in FIREWALL.keys():
			if FIREWALL[my_pos]['pos'] == 0:
				severity += my_pos * FIREWALL[my_pos]['rng']
		FIREWALL = move_scanner(FIREWALL)
		my_pos += 1
	print(severity)
	print(__name__)
	return

def part_2(data):
	FIREWALL = setup(data)
	delay = 0
	while True:
		good_delay = True
		for layer in FIREWALL.keys():
			if (delay + layer) % (FIREWALL[layer]['rng'] * 2 - 2) == 0:
				good_delay = False
				break
		if good_delay:
			break
		delay += 1
	print(delay)

	return


if __name__ == '__main__':
	with open('13_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	