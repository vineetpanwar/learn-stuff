/*Implementation of Node Class*/
class Node<T>
{
    //declaring data and Next Node
    private T Data;
    private Node Next;

    //Constructor function to intialize the node
    public Node( T data){
        Data = data;
        Next = null;
    }


    //creating getters and setters
    public T getData(){
        return Data;
    }
    public void setData(T data){
        Data = data;
    }
    public Node<T> getNext(){
        return Next;
    }
    public void setNext(Node next){
        Next = next;
    }
}
