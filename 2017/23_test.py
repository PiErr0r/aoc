from math import sqrt

def prime(n):
	for i in range(2, int(sqrt(n)) + 1):
		if n % i == 0:
			return True
	return False

# a = 1
# b = 81
# c = b
# b *= 100
# b -= -100000
# c = b
# c -= -17000
# a = 1
b = 108100
c = b + 17000
h = 0

while b <= c:
	f = 1
	d = 2
	f = 0 if prime(b) else 1
	e = b
	d = b
	if f == 0:
		h += 1
	b += 17	

print(h)

'''
do
	f = 1
	d = 2
	/*
	do
		e = 2
		/*
		do:
			g = d
			g *= e
			g -= b
			if g == 0: # g == b => g = d * e == b => e == b / 2 => e = 54050
				f = 0
			e -= -1
			g = e
			g -= b
		while g != 0 # g == b => g = e == b => e = 108100
		*/
		f = 0 if b % 2 == 0 else 1
		e = 108100
		g = 0

		d -= -1
		g = d
		g -= b
	while g != 0 # g == b => g = d == b => d == 108100
	*/
	f = 0 if b % 2 == 0 else 1
	e = b
	d = b
	g = 0

	if f == 0: # if b % 2 == 0
		h -= -1

	g = b
	g -= c
	if g == 0: # g == c => g = b => b == c
		exit

	b -= -17
while true
'''