##############################################################################
# DFS & BFS
##############################################################################


def DFS(x,y,Map):
    if (Map[x][y]=="exit"): #check if we're at the exit
        return [(x,y)] #if so then we solved it so return this spot
    if (Map[x][y]!="path"): #if it's not a path, we can't try this spot
        return []
    Map[x][y]="explored" #make this spot explored so we don't try again
    for i in [[x-1,y],[x+1,y],[x,y-1],[x,y+1]]: #new spots to try
            result = DFS(i[0],i[1],Map) #recursively call itself
            if len(result)>0: #if the result had at least one element, it found a correct path, otherwise it failed
                result.append((x,y)) #if it found a correct path then return the path plus this spot
                return result
    return [] #return the empty list since we couldn't find any paths from here

from collections import deque
def BFS(x,y,Map):
    queue = deque( [(x,y,None)]) #create queue
    while len(queue)>0: #make sure there are nodes to check left
        node = queue.popleft() #grab the first node
        x = node[0] #get x and y
        y = node[1]
        if Map[x][y] == "exit": #check if it's an exit
            return GetPathFromNodes(node) #if it is then return the path
        if (Map[x][y]!="path"): #if it's not a path, we can't try this spot
            continue
        Map[x][y]="explored" #make this spot explored so we don't try again
        for i in [[x-1,y],[x+1,y],[x,y-1],[x,y+1]]: #new spots to try
            queue.append((i[0],i[1],node))#create the new spot, with node as the parent
    return []
           
def GetPathFromNodes(node):
    path = []
    while(node != None):
        path.append((node[0],node[1]))
        node = node[2]
    return path
       
def GetMap():
    return [
        ["wall","wall","wall","wall","wall","wall","wall","wall"],
        ["wall","path","path","path","path","path","path","wall"],
        ["wall","wall","wall","path","wall","path","path","wall"],
        ["wall","path","path","path","wall","wall","path","wall"],
        ["wall","path","wall","path","path","path","path","wall"],
        ["wall","path","wall","wall","wall","wall","path","wall"],
        ["wall","path","path","path","path","path","path","wall"],
        ["wall","wall","wall","exit","wall","wall","wall","wall"]
            ]

def DrawMap(Map,path):
    for x in range(0,len(Map)):
        for y in range(0,len(Map[x])):
            if ((x,y) in path):
                assert Map[x][y] in ("path","exit")
                print("-",end="")
            elif (Map[x][y]=="wall"):
                print("#",end="")
            elif (Map[x][y]=="exit"):
                print(".",end="")
            else:
                print(' ',end="")
        print()

print("unsolved")
DrawMap(GetMap(),[])
print("\n")
print("solved with DFS")
print("path is ",len(DFS(1,1,GetMap()))," spots long")
DrawMap(GetMap(),DFS(1,1,GetMap()))
print("\n")
print("solved with BFS")
print("path is ",len(BFS(1,1,GetMap()))," spots long")
DrawMap(GetMap(),BFS(1,1,GetMap()))



##############################################################################
# LCM with offset
##############################################################################

def combine_phased_rotations(a_period, a_phase, b_period, b_phase):
    """Combine two phased rotations into a single phased rotation

    Returns: combined_period, combined_phase

    The combined rotation is at its reference point if and only if both a and b
    are at their reference points.
    """
    gcd, s, t = extended_gcd(a_period, b_period)
    phase_difference = a_phase - b_phase
    pd_mult, pd_remainder = divmod(phase_difference, gcd)
    if pd_remainder:
        raise ValueError("Rotation reference points never synchronize.")

    combined_period = a_period // gcd * b_period
    combined_phase = (a_phase - s * pd_mult * a_period) % combined_period
    return combined_period, combined_phase


def arrow_alignment(red_len, green_len, advantage):
    """Where the arrows first align, where green starts shifted by advantage"""
    period, phase = combine_phased_rotations(
        red_len, 0, green_len, -advantage % green_len
    )
    return -phase % period


def extended_gcd(a, b):
    """Extended Greatest Common Divisor Algorithm

    Returns:
        gcd: The greatest common divisor of a and b.
        s, t: Coefficients such that s*a + t*b = gcd

    Reference:
        https://en.wikipedia.org/wiki/Extended_Euclidean_algorithm#Pseudocode
    """
    old_r, r = a, b
    old_s, s = 1, 0
    old_t, t = 0, 1
    while r:
        quotient, remainder = divmod(old_r, r)
        old_r, r = r, remainder
        old_s, s = s, old_s - quotient * s
        old_t, t = t, old_t - quotient * t

    return old_r, old_s, old_t



##############################################################################
# GCD, LCM, CRT, Bezout
##############################################################################

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

##############################################################################
