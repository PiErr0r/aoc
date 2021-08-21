
import math, copy, re, hashlib
import itertools as it
# import lib for year 2020
from lib import check_data, parse_row, has_all_fields
from functools import reduce

def rl(arr):
	return range(len(arr))

"""
function extended_gcd(a, b)
    (old_r, r) := (a, b)
    (old_s, s) := (1, 0)
    (old_t, t) := (0, 1)
    
    while r ≠ 0 do
        quotient := old_r div r
        (old_r, r) := (r, old_r − quotient × r)
        (old_s, s) := (s, old_s − quotient × s)
        (old_t, t) := (t, old_t − quotient × t)
    
    output "Bézout coefficients:", (old_s, old_t)
    output "greatest common divisor:", old_r
    output "quotients by the gcd:", (t, s)
"""

def part_1(data):
	me = int(data[0])
	ts = list(map(int, filter(lambda x: x != 'x', data[1].split(','))))
	mini = math.inf
	mid = None
	for i in ts:
		d = me // i
		diff = i * (d + 1) - me
		if diff < mini:
			mini = diff
			mid = i
	print(mini * mid)
	print('END OF PART1')
	return

def gcd(a, b):
	while b:
		a, b = b, a % b
	return a

def ext_gcd(a, b):
	old_r, r = a, b
	old_s, s = 1, 0
	old_t, t = 0, 1
	while r:
		q = old_r // r
		old_r, r = r, old_r - q * r
		old_s, s = s, old_s - q * s
		old_t, t = t, old_t - q * t
	return old_s, old_t#, old_r, t, s

def lcm(a, b):
	return a * b / gcd(a, b)

def get_cycle(zero, other):
	# zero * a = ts * b - offset
	ts, offset = other
	if abs(offset) % gcd(zero, ts) != 0:
		print("VERY BAD STUFF")

	bez_a, bez_b = ext_gcd(zero, ts)
	mul = zero * ts

	if offset % zero == 0:
		return ts - offset // zero, offset, mul
	elif abs(bez_b) * ts - abs(bez_a) * zero == 1:
		f = abs(bez_a) * offset % zero
		s = f * ts // zero
		print(ts, zero, f, s, bez_a, bez_b)
		return abs(bez_a) * offset, abs(bez_b) * offset, mul
	else:
		f = (zero - abs(bez_b)) * offset % zero
		s = f * ts // zero
		# return (ts - abs(bez_a)) * offset, (zero - abs(bez_b)) * offset, mul
		return s, f, mul

def inv(a, m) : 
	m0, x0, x1 = m, 0, 1   
	if (m == 1) : 
		return 0
  
	# Apply extended Euclid Algorithm 
	while (a > 1):
    # q is quotient 
		q, t = a // m, m

    # m is remainder now, process same as euclid's algo 
		m, a, t = a % m, t, x0
		x0 = x1 - q * x0 
		x1 = t 
    
  # Make x1 positive 
	if (x1 < 0) : 
		x1 = x1 + m0 

	return x1 
  
def crt_x(num, rem) : 
	"""
	Returns the smallest number x such that: 
	x % num[0] = rem[0], 
	x % num[1] = rem[1], 
	...
	x % num[k-2] = rem[k-1] 
	Assumption: Numbers in num[] are pairwise coprime (gcd for every pair is 1) 
	"""
      
  # Compute product of all numbers 
	prod = 1
	for n in num: 
	  prod = prod * n

  # Initialize result 
	result = 0

  # Apply above formula 
	for n, r in zip(num, rem): 
	  pp = prod // n 
	  result += r * inv(pp, n) * pp 

	return result % prod 

def part_2(data):
	_ = data[0]
	ts = list(map(lambda x: int(x) if x != 'x' else x, data[1].split(',')))
	num, rem = [], []
	for i, t in enumerate(ts):
		if t == 'x' :
			continue
		num.append(t)
		rem.append(t - i)

	print(crt_x(num, rem))
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('13_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	
"""
# my solution after learning more about crt
def find_x(a, b, c):
    i = 1
    while True:
        if a * i % c == b:
            break
        i += 1
    return i

def crt(t):
    n = 1
    for i in t:
        n *= i[0]
    ns = [n / i[0] for i in t]
    sols = [find_x(ns[i], t[i][1], t[i][0]) for i in range(len(t))]
    res = 0
    for i in range(len(t)):
        res += ns[i] * sols[i]
    return res % n

ex1 = [(5, 2), (7, 3), (11, 4)]
ex2 = [(7, 0), (13, 12), (59, 55), (31, 25), (19, 12)]
ex = [(67, 0), (7, 6), (59, 56), (61, 57)]
ans = crt(ex)
print(ans)

"""
