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