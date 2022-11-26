
import math, copy

def find_divisors(n):
	divs = []
	for i in range(1, math.floor( math.sqrt(n) )):
		if n % i == 0:
			if n / i == i:
				divs.append(i)
			else:
				divs += [i, n / i]
	return divs

def find_next_prime(L, n):
	i = n
	is_prime = True
	while True:
		for pr in L:
			if pr > math.sqrt(i):
				return i
			if i % pr == 0:
				break
		i += 1


def find_prime_sum(n):
	primes = [2]
	i = 3
	while True:
		primes.append(find_next_prime(primes, i))
		if sum(primes) * 10 > n:
			return primes
		i += 1

def prime_factors(n): 
  prime_list = []
  # Print the number of two's that divide n 
  while n % 2 == 0: 
    prime_list.append(2) 
    n = n / 2
        
  # n must be odd at this point 
  # so a skip of 2 ( i = i + 2) can be used 
  for i in range(3,int(math.sqrt(n))+1,2): 
      
    # while i divides n , print i ad divide n 
    while n % i == 0: 
      prime_list.append(i)
      n = n / i 
            
  # Condition if n is a prime 
  # number greater than 2 
  if n > 2: 
    return [ n ]
  return prime_list

def sum_factors(arr):
	suma = 1
	m_sum = 1
	cnt = 1
	for i in range(len(arr) - 1):
		if arr[i] == arr[i + 1]:
			m_sum += arr[i] ** cnt
			cnt += 1
		else:
			m_sum += arr[i] ** cnt 
			suma *= m_sum
			cnt = 1
			m_sum = 1
	return suma

combs = []

def printAllUniqueParts(n): 
  p = [0] * n     # An array to store a partition 
  k = 0         # Index of last element in a partition 
  p[k] = n     # Initialize first partition 
               # as number itself 

  # This loop first prints current partition,  
  # then generates next partition.The loop  
  # stops when the current partition has all 1s 
  while True: 
  
    # print current partition 
    # printArray(p, k + 1) 
    # combs.append(copy.deepcopy( p[0 : k + 1] ))
    yield copy.deepcopy( p[0 : k + 1] )

    # Generate next partition 

    # Find the rightmost non-one value in p[].  
    # Also, update the rem_val so that we know 
    # how much value can be accommodated 
    rem_val = 0
    while k >= 0 and p[k] == 1: 
      rem_val += p[k] 
      k -= 1

    # if k < 0, all the values are 1 so  
    # there are no more partitions 
    if k < 0: 
      print() 
      return

    # Decrease the p[k] found above  
    # and adjust the rem_val 
    p[k] -= 1
    rem_val += 1

    # If rem_val is more, then the sorted  
    # order is violated. Divide rem_val in  
    # different values of size p[k] and copy  
    # these values at different positions after p[k] 
    while rem_val > p[k]: 
      p[k + 1] = p[k] 
      rem_val = rem_val - p[k] 
      k += 1

    # Copy rem_val to next position  
    # and increment position 
    p[k + 1] = rem_val 
    k += 1




def are_unique(arr):
	for i in range(len(arr)):
		if arr[i] in arr[:i] + arr[i + 1:]:
			return False
	return True



def part_1(data):
	target = data
	limit  = 1000000
	arr    = [ 0 for i in range(limit + 1)]

	i = 1
	while i <= limit:
	    j = i
	    while j < limit + 1:
	        arr[j] += i * 10
	        j      += i
	    i += 1

	for idx in range(len(arr)):
	    if arr[idx] >= target:
	        print (idx)
	return

def part_2(data):
	target = data
	limit  = 1000000
	arr    = [ 0 for i in range(limit + 1)]

	i = 1
	while i <= limit:
	    j = i
	    cnt = 0
	    while j < limit + 1 and cnt < 50:
	        arr[j] += i * 11
	        j      += i
	        cnt += 1

	    i += 1

	for idx in range(len(arr)):
	    if arr[idx] >= target:
	        print (idx)
	return 


if __name__ == '__main__':
	with open('20_input') as f:
		data = f.read()
		# data = data.split()
		# data = list(map(int, data.split()))

	# part_1(int(data))
	part_2(int(data))
	