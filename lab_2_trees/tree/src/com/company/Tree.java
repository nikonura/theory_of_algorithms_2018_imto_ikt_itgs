package com.company;

class Tree { // package-private
    Node root;

    Tree(Node node){
        this.root = node;
    }

    public Node get(Tree tree, int value){
        if (tree.root.value == value){
            return tree.root;
        }
        if (tree.root.value > value){
            return get(new Tree(tree.root.right_child), value);
        } else {
            return get(new Tree(tree.root.left_child), value);
        }
    }

    private Tree addNode(Tree tree, int value) {
        Node node;
        // root is null then new value put at the root
        if (tree.root == null) {
            node = new Node(0, value, null);
            tree.root = node;
        } else {
            // if new value is smaller then root
            if (value < tree.root.value){
                // if left child is empty it puts in left child
                if (tree.root.left_child == null){
                    node = new Node(tree.root.index+1, value, tree.root);
                    tree.root.left_child = node;
                // in the other ocasion we use recursion to compare left branch
                } else {
                    Tree left_branch = new Tree(tree.root.left_child);
                    addNode(left_branch, value);
                }
            // if new value is bigger then root
            } else {
                // if left child is empty it puts in left child
                if (tree.root.right_child == null){
                    node = new Node(tree.root.index+2, value, tree.root);
                    tree.root.right_child = node;
                // in the other ocasion we use recursion to compare right branch
                } else {
                    Tree right_branch = new Tree(tree.root.right_child);
                    addNode(right_branch, value);
                }
            }
        }
        return tree;
    }

    Tree createTree(int[] mass){
        Tree tree = new Tree(null);
        for (int i=0; i < mass.length; i++){
            tree.addNode(tree, mass[i]);
        }
        return tree;
    }

    /*
    static int nodeCount(Node node) throws Exception
    {
        return node == null ? 0 : 1 + nodeCount(node.TakeLeftChild()) + nodeCount(node.TakeRightChild());
    }
    */
/*
    Tree outTree(Tree tree){

    }
*/
    void preorder(Tree tree){
        if (tree.root!=null) {
            System.out.println(tree.root.value);
            System.out.print('|');
            Tree left_branch = new Tree(tree.root.left_child);
            Tree right_branch = new Tree(tree.root.right_child);
            System.out.print('-');
            preorder(left_branch);
            System.out.print('-');
            preorder(right_branch);
        }
    }
    void inorder(Tree tree){
        if (tree.root!=null) {
            Tree left_branch = new Tree(tree.root.left_child);
            Tree right_branch = new Tree(tree.root.right_child);
            inorder(left_branch);
            System.out.println(tree.root.value);
            inorder(right_branch);
            System.out.print(' ');
        }
    }
    void postorder(Tree tree){
        if (tree.root!=null) {
            Tree left_branch = new Tree(tree.root.left_child);
            Tree right_branch = new Tree(tree.root.right_child);
            System.out.print('-');
            postorder(left_branch);
            postorder(right_branch);
            System.out.println(tree.root.value);
        }
    }
    /*
    void show(){

    }*/
}
