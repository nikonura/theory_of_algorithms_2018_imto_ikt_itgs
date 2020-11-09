import numpy as np
import random

def desc_create(n):
    # create desc nxn
    desc=[]
    for i in range (1,n+1):
        desc.append([])
        for j in range (1,n+1):
            #print(i,j)
            desc[i-1].append([])
            #print(desc)
    #print(len(desc))
    return desc

#desc_create(4)
#desc_create(8)

drows = [-2, -2, -1, 1, 2, 2, 1, -1]
dcols = [-1, 1, 2, 2, 1, -1, -2, -2]

def del_move(tour, move_number, del_count):
    for i in range (0, len(tour)):
            for j in range (0, len(tour)):
                if tour[i][j]==[move_number]: #!-1
                    tour[i][j]=[]
                    del_count -= 1
                    print('move_number ', move_number, ' was deleted\n', tour[i][j])
                    if del_count==0:
                        return tour
                    else:
                        del_move(tour, move_number-1, del_count-1)

def knight_move0(row, col, tour, move_number, chose_num):
    print(' move number ', move_number)
    if move_number==1:
        tour[row][col]=[1]
    if move_number == 64:
        print(64)
        return 1
    variants = []
    for i in range (0, len(tour)):
        # we have cells which are designated from 1 to 8
        r = row + drows[i]
        c = col + dcols[i]
        #print(row, r+1, col, c+1, len(tour))
        # existence check
        if ((r >= 0) and (r < len(tour)) and (c >= 0) and (c < len(tour[1]))):
            #print('first if')
            # empty of cell check
            print(r, c, tour[r][c])
            if (tour[r][c]==[]):
                variants.append([r, c])
    print('variants', variants)
    if len(variants)>0 and len(variants)>chose_num:
        #variants = variants[random.choice(list(range(0,len(variants))))]
        #print(' len of variants was equal 1. ret_num =', ret_num)
        chose_num = len(variants) - chose_num
        variants = variants[chose_num-1]
        r=variants[0]
        c=variants[1]
        print('chosen ', r, c)
        move_number += 1
        tour[r][c]=[move_number]
        #print tour, 'move_number = ' + str(move_number)
        print(tour)
        knight_move0(r, c, tour, move_number, 0)
        return 1
    else:
        if chose_num==len(variants):
            chose_num = 0
        else:
            chose_num += 1
        tour = del_move(tour, move_number, 1)
        print('else ', move_number)
        for i in range(0, len(tour)):
            for j in range(0, len(tour[0])):
                if tour[i][j]==move_number-1:
                    r = i
                    c = j
        print(tour)
        knight_move0(r, c, tour, move_number-1, chose_num)
    return 0

    #print row, col, tour, 'move_number = '+str(move_number)

#knight_move0(7, 0, desc_create(8), 1, 0)


def chose_move(r, c, desc):
    #create mass to save move's variants
    chosing = []
    for i in range (0, len(drows)):
        ri = r + drows[i]
        ci = c + dcols[i]
        count_i = 0
        # check existence of cell on the board
        if ri>=0 and ri<len(desc) and ci>=0 and ci<len(desc):
            if desc[ri][ci] == []:
                # deepen each option on one level and choose from them the minimum 
                # increasing count_i which respends count moves on board for it "i" option 
                for j in range (0, len(drows)):
                    rj = ri + drows[j]
                    cj = ci + dcols[j]
                    if rj>=0 and rj<len(desc) and cj>=0 and cj<len(desc):
                        if desc[rj][cj] == []:
                            count_i += 1
                            #print rj, cj
                chosing.append(count_i)
            else:
                # if option doesn't empty its i option is assigned 9. it number more than 8, so if among i options the smallest is 8 we will be chose right i option
                chosing.append(9)
        else:
            # if oprion doesn't exist on the board
            chosing.append(9)
    
    # chose minimal option 

    #print 'chosing ', chosing
    choice = chosing.index(min(chosing))
    #print choice
    #print('cell [', r, ',', c, ']. best of items is ', choice, '. it is row num ', r + drows[choice], 'col num', c + dcols[choice])
    return choice

#chose_move(7, 0, desc_create(8))

def knight_move2(row, col, tour, move_number):
    # find tour using Warnsdorf's rule. The rule tells us to move to the square with the smallest integer in it

    # move knight and raise move's number
    tour[row-1][col-1].append(move_number)
    move_number += 1
    #print(row, col, move_number, '\n', tour)
    # check have you reached the finish 
    if move_number >= len(tour)*len(tour[0])+1:
        #print('yeah')
        return 1
    #chose the smallest move by function chose_move
    i = chose_move(row-1, col-1, tour)
    knight_move2(row + drows[i], col + dcols[i], tour, move_number)
    return tour

def remove_move(tour, move_nums):
    # clear the cell and delete zero element and last (dead end) move
    tour[move_nums[-2][0]][move_nums[-2][1]]=[]
    move_nums.pop(-1)
    move_nums.pop(-1)
    # take and change on 1 count of variants of last move (last since end move)
    # we viseted one branch of tree and it have the dead end
    last = move_nums[-1][-1]
    move_nums[-1].pop(-1)
    move_nums[-1].append(last-1)
    return move_nums

def append_var(row, col, tour, move_nums):
    vars = []
    # find favoraible (empty) cells almong 8 of possible and correct (it is exists on the desc)
    for i in range(len(drows)-1, -1, -1):
        r = row + drows[i]
        c = col + dcols[i]
        if r>=0 and c>=0 and r<len(tour) and c<len(tour):
            if tour[r][c]==[]:
                vars.append([r,c])

   # print(row+1, col+1, vars, '  / ', len(move_nums))

   # we check how much elements does it contein. if there are 3 (more then 2) it means that move was removed
   # that ocasion has two options
    if len(move_nums[-1])>2:
        if len(vars)>=move_nums[-1][-1]-1 and move_nums[-1][-1]<1:
            # variant in which we had only one variant and it requests to remove move. let's put zero at the end
            move_nums.append(0)
        else:
            # put the number of new chosen variant in cell of move_nums
            # there is at least one variant of moving
            move_nums.append(vars[move_nums[-1][-1]-1])
    else:
        if len(vars)<1:
            # there are no variants of moving, so we put 0 in move_nums
            move_nums.append(0)
        else:
            # put the count of variants in cell of move_nums
            # there is at least one variant of moving, so we chose the last
            move_nums[-1].append(len(vars))
            move_nums.append(vars[-1])
    return move_nums

def ordinary(tour, move_nums):
    # it is a finish if lenght of move_nums hit count of the desc
    # +1 for additional sign - zero at the end 
    if len(move_nums)<len(tour)*len(tour)+1:
        # if last element is zero we need to remove last move
        if move_nums[-1]!=0:
            row = move_nums[-1][0]
            col = move_nums[-1][1]
            #print('\nmain ',row, col, len(move_nums))
            if tour[row][col]==[]:
                tour[row][col].append(len(move_nums))
            move_nums = append_var(row, col, tour, move_nums)
            #print(tour)
            #print(move_nums)
        else:
            #print('else 2 \n', move_nums, len(move_nums), '\n', tour)
            move_nums = remove_move(tour, move_nums)
            #print('else 3 \n', move_nums, '\n', tour)
        #if len(move_nums)==len(tour)*len(tour):
            #print (tour)
        ordinary(tour, move_nums)
        #return tour
    return tour


#print(knight_move2(1, 5, desc_create(8), 1))
#knight_move2(8, 1, desc_create(8), 1)
#print(knight_move2(1, 1, desc_create(8), 1))
#knight_move2(4, 7, desc_create(8), 1)
#print(knight_move2(1,1,desc_create(5),1))
#print(ordinary(desc_create(5), [[0,0]]))

def print_tour(tour):
    for i in range(0, len(tour)):
        print(tour[i],'\n')

def find_all(n):
    for i in range(0,n):
        for j in range(0,n):
            print('\n ',i,j)
            
            try:
                if (knight_move2(i+1,j+1,desc_create(n),1)):
                    print('knight_move2')
                    print_tour(knight_move2(i+1,j+1,desc_create(n),1))
            except IndexError:
                continue
            
            #print(knight_move2(i+1,j+1,desc_create(n),1))
            #print_tour(knight_move2(i+1,j+1,desc_create(n),1))

            try:
                if (ordinary(desc_create(n), [[i,j]])):
                    print('ordinary')
                    print_tour(ordinary(desc_create(n), [[i,j]]))
            except (RecursionError, IndexError):
                continue

find_all(5)
#print(knight_move2(1,2,desc_create(),1))
#print(ordinary(desc_create(5), [[0,0]]))
