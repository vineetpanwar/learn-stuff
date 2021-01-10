

class NodeChain{

    public static void main(String[] arg){

        Node first = new Node(3);
        Node middle = new Node("heelo");
        first.setNext(middle);
        Node last = new Node(5);
        middle.setNext(last);
        PrintList(first);
    } 

    public static void PrintList(Node node){
        while(node != null){
            System.out.println(node.getData());
            node = node.getNext();
        }

    }
}