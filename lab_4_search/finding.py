#!/usr/bin/env python
# coding: utf-8

# In[102]:


import os
import sys
from matplotlib import pyplot as plt
import numpy as np
def binary(arr, f):
    print('binary')
    barier1 = 0
    barier2 = len(arr)
    print(barier1, ' ', barier2);
    if f>barier1 and barier2>f:

        while(barier1<=barier2):
        #for i in range(barier2):
            currentElem = barier1 + (barier2-barier1)//2;
            print(arr[barier1], ' ', arr[currentElem], ' ', arr[barier2-1]);
            if arr[barier1]==f: 
                return barier1
            if arr[barier2-1]==f: 
                return barier2
            if arr[currentElem]!=f:
                print('ce dont equal f')
                if arr[currentElem]<f:
                    barier1 = currentElem
                if arr[currentElem]>f:
                    barier2 = currentElem
            else:
                return currentElem
    return 'not found'


# In[103]:


array = [0, 1,2,3,4,5,6,7,8,9,10,11,12]
numforfind = 14
print(binary(array, numforfind))


# In[96]:


array = [0, 1,2,3,4,5,6,7,8,9,10,11,12,13]
numforfind = 6
print(binary(array, numforfind))


# In[97]:


array = [0, 1,2,3,4,5,6,7,8,9,10,11,12,13]
numforfind = 13
print(binary(array, numforfind))


# In[98]:


array = [0, 1,2,3,4,5,6,7,8,9,10,11,12]
numforfind = 11
print(binary(array, numforfind))


# In[49]:


def barier(array, find_elem):
    position = 0
    if (array[len(array)-1] != find_elem):
        print("in if")
        array.append(find_elem)
        while (array[position] != find_elem):
            position+=1
    else:
        print("else")
        return len(array)-1
    return position if position < len(array)-1 else 0 


# In[48]:


array = [1, 2, 3, 4, 6, 7, 9, 12, 28]
barier(array, 28)


# In[50]:


barier(array, 3)


# In[51]:


barier(array, 5)


# In[ ]:




