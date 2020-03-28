
import math, copy, time

with open('7_input') as f:
	data = f.read()
	data = data.split('\n')
	# data = list(map(int, data.split()))

circuit = dict()
rewire = None

def get_int(in1, in2, op):
	in1_n = in1[0] == '-'
	in2_n = in2[0] == '-'
	in1 = in1[1:] if in1_n else in1
	in2 = in2[1:] if in2_n else in2
	if in1.isdigit() and in2.isdigit():
		if op == 'AND':
			val = ((-1 if in1_n else 1) * int(in1)) & ((-1 if in2_n else 1) * int(in2))
		elif op == 'OR':
			val = ((-1 if in1_n else 1) * int(in1)) | ((-1 if in2_n else 1) * int(in2))
		elif op == 'RSHIFT':
			val = ((-1 if in1_n else 1) * int(in1)) >> ((-1 if in2_n else 1) * int(in2))
		elif op == 'LSHIFT':
			val = ((-1 if in1_n else 1) * int(in1)) << ((-1 if in2_n else 1) * int(in2))
		return dict(value = str(val), op = None)

	else:
		in1_new = in2_new = None
		if not in1.isdigit() and in1 in circuit.keys():
			in1_new = circuit[ in1 ][ 'value' ]
		if not in2.isdigit() and in2 in circuit.keys():
			in2_new = circuit[ in2 ][ 'value' ]

		if in1_new is None and in2_new is None:
			return dict(value=None, op=op, in1=in1, in2=in2)			

		tmp = get_int(in1 if in1_new is None else in1_new, in2 if in2_new is None else in2_new , op)
		if tmp['value'] is not None:
			return tmp
		else:
			return dict(value=None, op=op, in1=in1 if in1_new is None else in1_new, in2=in2 if in2_new is None else in2_new)

def not_op(inp):
	if inp.isdigit():
		val = ~int(inp)
		return dict(value = str(val), op = None)
	else:
		inp_new = None
		if inp in circuit.keys():
			inp_new = circuit[ inp ]['value']

		if inp_new is None:
			return dict(value = None, op = 'NOT', inp = inp)
		tmp = not_op(inp_new)
		if tmp['value'] is not None:
			return tmp
		else:
			return dict(value = None, op = 'NOT', inp = inp_new)

def get_num(inp):
	if inp.isdigit():
		return dict(value = inp_new, op = None)
	else:
		inp_new = circuit[ inp ]
		if inp_new.isdigit():
			return dict(value = inp_new, op = None)
		else:
			tmp = get_num(inp_new)
			if tmp['value'] is not None:
				return tmp
			else:
				return dict(value = inp_new, op = '->')


def setup():
	for cmd in data:
		c = cmd.split()

		if len(c) == 3:
			[inp, _, out ] = c
			if inp.isdigit():
				circuit[ out ] = dict(value = inp, op = None)
			else:
				circuit[ out ] = dict(value=inp, op='->')

		elif len(c) == 4:
			[n, inp, _, out] = c
			circuit[ out ] = not_op(inp)
 
		elif len(c) == 5:
			[in1, op, in2, _, out] = c
			circuit[ out ] = get_int(in1, in2, op)

def part_1():
	setup()
	cnt = 0
	while True:

		all_values = True
		print(cnt)
		cnt = 0
		for key, value in circuit.items():

			if value['value'] is None:
				cnt += 1
				all_values = False
				if value['op'] == 'NOT':
					circuit[ key ] = not_op(value['inp'])
				else:
					circuit[ key ] = get_int(value['in1'], value['in2'], value['op'])

			elif value['op'] is '->':
				all_values = False
				circuit[ key ] = get_num(value['value'])

		if all_values:
			break

	if circuit['a']['value'].isdigit():
		print(circuit['a']['value'])
		rewire = circuit['a']['value']
	else:
		print(circuit[ circuit['a']['value'] ]['value'])
		rewire = circuit[ circuit['a']['value'] ]['value']
		
	return


def part_2():
	part_1()
	# circuit = dict()
	# circuit['b'] = dict(value=rewire, op=None)
	# part_1()
	return 


if __name__ == '__main__':
	# part_1()
	part_2()
	