
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