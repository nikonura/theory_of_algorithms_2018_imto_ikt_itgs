package com.company;

public class Node <A1, A2, A3> {
    int index;
    int value;
    Node left_child;
    Node right_child;

    /*
    public int ParentIndex(){
        return this.index^(1/2);
    }*/
    public Node TakeLeftChild(){
        return this.left_child;
    }
    public Node TakeRightChild(){
        return this.left_child;
    }
    Node(int index, int value, Node parent){
        this.index = index;
        this.value = value;
    }
}
