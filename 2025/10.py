import numpy as np
from math import floor
from scipy.optimize import linprog, milp, LinearConstraint

def parse_data(data):
	[a, *b_, c] = data.split(' ')
	lights = a.replace('[', '').replace(']', '')
	buttons = [[int(bb) for bb in b.replace('(', '').replace(')', '').split(',')] for b in b_]
	joltage = [int(cc) for cc in c.replace('{', '').replace('}', '').split(',')]
	return lights, buttons, joltage

def get_row(b, w):
	return [1 if i in b else 0 for i in range(w)]

def get_A(buttons, w):
	res = [get_row(b, w) for b in buttons]
	return np.matrix(res).T

def get_b(joltage):
	return np.array([joltage]).T

def main_old(data):
	res = 0
	for lights, buttons, joltage in data:
		A = get_A(buttons, len(joltage))
		b = get_b(joltage)

		U, D, Vt = np.linalg.svd(A, full_matrices=False)
		A_ = Vt.T @ np.diag(1/D) @ U.T
		x = A_ @ b
		print(x)
		print(np.sum(x))
		res += floor(np.sum(x))
	print(res)
		# X = wiggle(x)

def main(data):
	res = 0
	for lights, buttons, joltage in data:
		A = get_A(buttons, len(joltage))
		b = get_b(joltage)
		constraints = LinearConstraint(A, lb = b.flatten(), ub = b.flatten())
		integrality = np.ones((len(buttons),))
		result = milp(c=np.ones((len(buttons),1)).flatten(), constraints=constraints, integrality=integrality)
		res += sum(np.round(result.x))
	print(res)
	
if __name__ == '__main__':
	with open('10_input') as f:
		data = f.read().strip().split('\n')
		data = [parse_data(r) for r in data]

		main(data)