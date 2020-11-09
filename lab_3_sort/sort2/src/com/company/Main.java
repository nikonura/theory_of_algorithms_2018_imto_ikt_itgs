package com.company;

import java.io.*;
import java.util.*;
// import java.util.ArrayList;
// import java.util.Arrays;

public class Main {

    public static void main(String[] args){
        int count_elem = 13;
        int max_elem = 57;
        //int[] numbers = createRandomMass(count_elem, max_elem);
        int[] numbers = new int[] { 11, 7, 4, 10, 1, 9, 13, 2, 8, 6, 3 };
        int[] MergeSortedMass = MergeSort(numbers);
        printArr(MergeSortedMass);
        System.out.print("\n");
        int[] HeapSortedMass = HeapSort(numbers);
        printArr(HeapSortedMass);
    }

    private static int getRandomBetween(int max){
        return (int)(Math.random()*((max-1)+1)+1);
        //Random random = new Random();
        //return random.nextInt(max);
    }

    private static boolean checkNumberInMass(int[] mass, int elem){
        for (int i: mass) {
            if (i == elem){
                return false;
            }
        }
        return true;
    }

    private static int[] createRandomMass(int count_elem, int max_elem) {
        //if (max_elem > count_elem && count_elem>1){
        int[] mass = new int[count_elem];
        for ( int i=0; i < count_elem; i++){
            mass[i] = 0;
            int number = getRandomBetween(max_elem);
            if (checkNumberInMass(mass, number)){
                mass[i] = number;
            }
            else i--;
                /*
        int number;
        int i = 0;
        while (mass[i] == 0) {
            number = getRandomBetween(max_elem);
            if (checkNumberInMass(mass, number)) {
                mass[i] = number;
                i++;
            }
            */
        }
        return mass;
    }

    static int[] MergeSort(int[] main_array) {
        int[] res;
        if (main_array.length > 1) {
            int mlenght = main_array.length;
            int[] part1 = Arrays.copyOfRange(main_array, 0, main_array.length / 2);
            int[] part2 = Arrays.copyOfRange(main_array, main_array.length / 2, main_array.length);
            printArr(part1);
            printArr(part2);
            part1 = MergeSort(part1);
            part2 = MergeSort(part2);
            res = merge(part1, part1.length, part2, part2.length);
        } else {
            return main_array;
        }
        return res;
    }

    private static int[] push(int[] array, int value)
    {
        int[] new_arr = new int[array.length + 1];
        for (int i=0; i < array.length; i++){
            new_arr[i] = array[i];
        }
        new_arr[array.length] = value;
        return  new_arr;
    }

    private static int[] firstElemDelete(int[] array)
    {
        int[] res = new int[array.length - 1];
        for (int i=0; i < array.length - 1; i++){
            res[i] = array[i + 1];
        }
        //System.out.print("\n");
        //printArr(res);
        return res;
    }

    private static void printArr(int[] arr)
    {
        System.out.print("\n[");
        for (int i=0; i < arr.length; i++){
            System.out.print(" " + arr[i]);
        }
        System.out.print(']');
    }

    private static int[] merge(int[] array1, int size1, int[] array2, int size2) {
        //System.out.println("in MergeSort");
        int[] res = new int[0];
        int i = 0;
        int j = 0;
        while (true) {
            if (i >= size1) {
                //System.out.println("i >= size1");
                for (int j0 = j; j0 < size2; j0++) {
                    res = push(res, array2[j0]);
                }
                break;
            }
            if (j >= size2) {
                //System.out.println("j >= size2");
                for (int i0 = i; i0 < size1; i0++) {
                    res = push(res, array1[i0]);
                }
                break;
            }
            //System.out.println("if " + array1[i] + " < " + array2[j]);
            if (array1[i] < array2[j]) {
                res = push(res, array1[i]);
                i++;
            } else {
                res = push(res, array2[j]);
                j++;
            }
            printArr(res);
        }
        //printArr(res);
        return res;
    }

    private static int[] HeapSort(int[] arr)
    {
        int[] res = new int[0];
        int parent = 0;
        int left_child = 0;
        int right_child = 0;
        int some_elem = 0;
        int len = arr.length;
        while (res.length < len) {
            //System.out.print( "\n " + arr.length + " " + left_child + " " + parent + " " + right_child);
            for (int i=arr.length - 1; i > 0; i=i-2){
                if (i%2 == 0) {
                    parent = (i - 2) /2;
                    if (i - 1 < arr.length) {
                        left_child = i - 1;
                    }
                    if (i < arr.length) {
                        right_child = i;
                    }
                }
                if (i%2 == 1) {
                    parent = (i - 1) / 2;
                    if (i < arr.length) {
                        left_child = i;
                    }
                    if (parent*2+2 < arr.length) {
                        right_child = parent * 2 + 2;
                    } else {
                        right_child = parent;
                    }
                }

                if ( arr[parent] < arr[right_child] ) {
                    some_elem = arr[parent];
                    arr[parent] = arr[right_child];
                    arr[right_child] = some_elem;
                }
                if ( arr[parent] < arr[left_child] ) {
                    some_elem = arr[parent];
                    arr[parent] = arr[left_child];
                    arr[left_child] = some_elem;
                }
                if ( arr[0] <arr[left_child]) {
                    some_elem = arr[0];
                    arr[0] = arr[parent];
                    arr[parent] = some_elem;
                }
                printArr(arr);
            }
            res = push(res, arr[0]);
            arr = firstElemDelete(arr);

        }
        return res;
    }
}

