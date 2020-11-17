from intcode import IntCode
import math, copy, re, hashlib
import itertools as it

orig_list_1 = [0, 1, 2, 3, 4]
orig_list_2 = [5, 6, 7, 8, 9]

def part_1(data):

	perms = it.permutations(orig_list_1)
	thruster = 0
	for p in perms:
		output = 0
		for phase in p:
			amp_data = [phase]
			if output is not None:
				amp_data += [output]
			amp = IntCode(data, amp_data)
			amp.calculate()
			output = amp.get_output()

		if output > thruster:
			thruster = output

	print(thruster)
	print('END OF PART1')
	return

def amps_loop(amps, in_p):
	for amp in amps:
		amp.unpause([in_p])
		amp.calculate()
		in_p = amp.get_output()

	return (in_p, amps[4].is_halted())

def part_2(data):
	perms = it.permutations(orig_list_2)
	thruster = 0
	for p in perms:
		amps = [IntCode(data, [i]) for i in p]
		output = 0
		halted = False
		while not halted:
			output, halted = amps_loop(amps, output)

		if output > thruster:
			thruster = output

	print(thruster)

	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('07_input') as f:
		data = f.read()
		# data = data.split('\n')
		data = list(map(int, data.split(',')))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	