package com.company;

public class Main {

    public static void main(String[] args) {
        int count_elem = 12;
        int max_num = 13;
        //int[] treeNodes = createRandomMass(count_elem, max_num);
        //printMass(treeNodes);
        //System.out.print('\n');
        int[] array1 = new int[]{ 11, 7, 4, 10, 1, 9, 13, 2, 8, 6, 3 };

        Tree tree = new Tree(null);
        tree = tree.createTree(array1);
        //tree.postorder(tree);
        //tree.inorder(tree);
        tree.preorder(tree);
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
        //}
        //return null;
    }

    private static void printMass(int[] mass){
        System.out.print("[");
        for (int i=0; i < mass.length; i++) {
            System.out.print(" " + mass[i]);
        }
        System.out.print(']');
    }


}
