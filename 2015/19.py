
import math, copy
from itertools import permutations

def setup(data):
	ret = dict()

	for repl in data:
		[atom, _, r] = repl.split()
		if atom in ret.keys():
			ret[atom].append(r)
		else:
			ret[atom] = [r]
	return ret

def setup_r(data):
	ret = dict()

	for repl in data:
		[atom, _, r] = repl.split()
		ret[r] = atom
	return ret

def split_mol(molecule):
	ret = list()
	i = 0
	while i < len(molecule):
		at = molecule[i]
		j = i + 1

		while j < len(molecule) and molecule[j].islower():
			at += molecule[j]
			j += 1
		i = j
		ret.append(at)
	return ret
		
def sub_mol(molecule, atoms):
	ret = []
	for i, at in enumerate(molecule):
		if at in atoms.keys():
			for sub in atoms[at]:
				tmp_mol = [x if j != i else sub for (j, x) in enumerate(molecule)]
				ret.append( ''.join(tmp_mol) )
	return list(set(ret))

def sub_mol_2(repls, molecule):
	copy_mol = molecule
	steps = 0
	
	repls_names = list(repls.keys())
	repls_names.sort(key = lambda x: len(x))
	repls_names.reverse()

	while True:
		for repl in repls_names:
			if repl in copy_mol:
				steps += copy_mol.count(repl)
				copy_mol = copy_mol.replace(repl, repls[repl])
				if copy_mol == 'e':
					print(steps)
					return


def part_1(data, molecule):
	atoms = setup(data)
	mol = split_mol(molecule)
	subs = sub_mol(mol, atoms)
	print(len(subs))

	return

def part_2(data, molecule):
	repls = setup_r(data)
	sub_mol_2(repls, molecule)

	return 


if __name__ == '__main__':
	with open('19_input') as f:
		data = f.read()
		data = data.split('\n')
		molecule = data[-1]
		data = data[:-2]
		# data = list(map(int, data.split()))

	# part_1(data, molecule)
	part_2(data, molecule)
	