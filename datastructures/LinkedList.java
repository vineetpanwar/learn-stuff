class LinkedList<t>{
    /*Head Node */
    public Node<t> Head;

    /*Get the head  of a linked list*/
    final public Node<t> getHead(){
        return Head;
    }

    /*Set the head of a linked list*/
    final private void setHead(Node<t> head){
        Head = head;
    }

    /*Tail Node*/
    public Node<t> Tail;
    
    /*Get the tail of a linked list*/
    final public Node<t> getTail(){
        return Tail;
    }

    /*Set the tail of a linked list*/
    final private void setTail(Node<t> tail){
        Tail = tail;
    }

    /*Add a Node to start of a linkedList Input-> value*/
    final public void AddFirst(<t> value){
        AddFirst(new Node<t>(value))
    }

    /*Add a Node to start of a linkedList Input-> node*/
    final public void AddFirst(Node<t> node){
        //save the head so we dont lose it
        Node<t> temp = Head;
        
        //Point head to the new node 
        Head = node;

        //Insert the rest of the list behind the head
        Head.setNext(temp);

        count++;

        //if the list was empty the head and tail should point to the new node
        if(count == 1){
            Tail = Head;
        }
    }


}