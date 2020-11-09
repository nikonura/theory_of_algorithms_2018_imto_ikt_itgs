package com.company;
import java.io.*;
import java.util.*;
// import java.util.ArrayList;
// import java.util.Arrays;

public class Main {
    private static int[][] steps = new int[][]{
            { 2, 1},
            { 2,-1},
            { 1, 2},
            { 1,-2},
            {-2, 1},
            {-2,-1},
            {-1, 2},
            {-1,-2}
    };

    private static int desc_size;

    private static int[][] desc;

    public static void main(String[] args) {
        System.out.print("Let's start");
        int desc_size = 8;
        int[][] desc = new int[desc_size][desc_size];

        for (int i=0; i<desc_size; i++){
            for (int j=0; j<desc_size; j++){
                desc[i][j] = 0;
            }
        }

        int row = 2;
        int col = 4;
        int[] comb = new int[]{row, col};

        int horses_num = desc_size*desc_size; // number from start which count nxn
        horses_num = 0;

/*
        while (row<0 || row>desc_size || col<0 || col>desc_size ){
            this.row = 0;
            this.col = 0;
        }
*/
        ArrayList<int[]> horseQueue = new ArrayList<>(); // it is horse tour
//      horsesQueue.setIteratorMode(SplQueue::IT_MODE_DELETE)

        String euristic = "Warnsdorf";

        /*
        switch (euristic) {
            case "Warnsdorf":
                Warnsdorf(comb, horses_num, desc, horseQueue);
                break;
            default:
                original();
                break;
        }*/

        System.out.print(" " + comb[0]+ " " + comb[1]);
        Warnsdorf(comb, horses_num, desc, horseQueue);

        System.out.print("\n\n\n");
        outDesc(desc);
        System.out.print("\n");
        outArray(horseQueue);
        // call print desc and image tour
    }

    public static ArrayList<int[]> Warnsdorf(int[] comb, int horses_num, int[][] desc, ArrayList<int[]> horseQueue)
    {
        System.out.println("\n"+"Warnsdorf metod "+comb[0]+" "+comb[1]);
        horses_num++;
        desc[comb[0]][comb[1]] = horses_num;
        System.out.println("horses_num="+horses_num);
        outDesc(desc);
        horseQueue.add(new int[]{comb[0], comb[1], enstablishValue(comb[0], comb[1], desc)});

        if (horses_num >= desc.length*desc.length) {
            return horseQueue;
        }

        int[] nextcomb = choseComb(comb[0], comb[1], desc, horses_num);
        //System.out.println("\nin Warnsdorf row="+comb[0]+" col="+comb[1]);
        //outComb(nextcomb);
        Warnsdorf(nextcomb, horses_num, desc, horseQueue);

        return horseQueue;  // here
    }

    public static int[] choseComb(int row, int col, int[][] desc, int horses_num)
    {
        int[][] vars = new int[8][3];
        int[] forChoseMn = new int[8];
        for (int i=0; i<steps.length; i++){
            int r = row + steps[i][0];
            int c = col + steps[i][1];

            System.out.print("\nchoseComb "+"r="+r+" c="+c);
            if (r>=0 && r<desc.length && c>=0 && c<desc.length){

                System.out.print("  exists \n");
                if (desc[r][c]==0){
                    int count_i = enstablishValue(r, c, desc);
                    if (horses_num==desc.length*desc.length-1){
                        forChoseMn[i] = r;
                    } else {
                        forChoseMn[i] = (count_i);
                    }
                    vars[i] =  new int[]{r, c, count_i};
                }
            }
            //else {
            //vars[i] = new int[]{0, 0, 0};
            //forChoseMn[i] = 0;
            //}
        }
        System.out.print("\nvars");
        outDesc(vars);
        System.out.print("vars\n");
        outComb(forChoseMn);
        int mn = mn(forChoseMn);
        int index = takeIndex(forChoseMn, mn);

        return vars[index];
    }

    public static int enstablishValue(int row, int col, int[][] desc)
    {
        int count_i = 0;

        System.out.print("step0: "+steps[0][0]+steps[0][1]);
        System.out.print("\tstep1: "+steps[1][0]+steps[1][1]);
        System.out.print("\tstep2: "+steps[2][0]+steps[2][1]);
        System.out.print("\tstep3: "+steps[3][0]+steps[3][1]);
        System.out.print("\tstep4: "+steps[4][0]+steps[4][1]);
        System.out.print("\tstep5: "+steps[5][0]+steps[5][1]);
        System.out.print("\tstep6: "+steps[6][0]+steps[6][1]);
        System.out.print("\tstep7: "+steps[7][0]+steps[7][1]);
        System.out.print("\n");

        for (int i=0; i<steps.length; i++){
            int r = row + steps[i][0];
            int c = col + steps[i][1];
            System.out.print("\n    enstablish "+"r="+r+" c="+c);
            if (r>=0 && c>=0 && r<desc.length && c<desc.length){
                if (desc[r][c] == 0){
                    count_i++;
                    System.out.print(" exists count_i+1="+count_i);
                }
            }
        }
        return count_i;
    }

    public static int mn(int[] array)
    {
        System.out.println("\narray in mn ");
        outComb(array);
        int mn = array.length+1;

        for (int i=0; i<array.length; i++){
            if (array[i] > 0) {
                System.out.println(" chose mn" + array.length + " " + mn + " " + i + " " + array[i] + " " + (array[i]>0));
                if (array[i] < mn) {
                    System.out.print(" " + (array[i]<mn));
                    mn = array[i];
                    System.out.println("in mn new_mn=" + mn);
                }
            }
        }
        System.out.println("chose min "+mn);
        return mn;
    }

    public static int takeIndex(int[] array, int elem)
    {
        //int[] index = new int[array.length];
        int index = array.length+1;
        for (int i = 0; i<array.length; i++) {
            System.out.println(i +" "+ array[i] + " " + elem + " " + (array[i] == elem & array[i]>0));
            if (array[i] == elem & array[i]>0) {
                index = i;
            }
        }
        return index;
    }

    public static void makeMove()
    {

    }

    public static void outDesc(int[][] desc)
    {
        for (int i=0; i<desc.length; i++){
            System.out.print("[");
            for (int j=0; j<desc[i].length; j++){
                System.out.print("\t"+desc[i][j]);
            }
            System.out.print("\t]\n");
        }
    }

    public static void outArray(ArrayList<int[]> arrayname)
    {
        for (int i=0; i<arrayname.size(); i++) {
            System.out.print("[");
            for (int j=0; j < arrayname.get(i).length; j++) {
                System.out.print(" " + arrayname.get(i)[j]);
            }
            System.out.print(" ] --> ");
        }
        System.out.print("finish");
    }

    public static void outComb(int[] comb)
    {
        for (int i=0; i<comb.length; i++){
            System.out.print(comb[i]);
        }
    }

    public static void original()
    {

    }
/*
    private void showResults(int c)
    {
        if (c == 0) {
            return;
        }
        if (horsesQueue.size() > 0) {
            System.out.print("Active horses "+ horsesQueue.size());
        }
        else {
            System.out.print("The Way not exists.");
        }
        System.out.println( " Iterations "+ c);
    }

    public void showField()
    {
        int index = horsesQueue.size() - 1;
//        for (int index = 0; index < horsesQueue.size(); index++) {
            byte[][] horse_desc = horsesQueue.get(index).getField();
            System.out.println(" Step " + horsesQueue.get(index).getStep()
                    + ". Horses " + horsesQueue.size() + ".");
            for (byte[] desc_line : horse_desc) {
                for (byte desc_item : desc_line) {
                    System.out.print(String.format("%1$4s", desc_item));
                }
                System.out.println("");
            }
            System.out.println("");
//        }
//        System.out.println("--------------");
    }
*/
}

