
function main(){
  var node1 = new Node(12,"John", ["tenis", "golf", "koszykówka","piłka"]);
  var node2 = new Node(11,"Piotr", ["motoryzacja", "góry", "piłka"]);
  var edge1 = new Edge(node1, 45, node2);
  var graph = new Graph([],[]);
  graph.addNode(node1);
  graph.addNode(node2);
  graph.addEdge(edge1);
  graph.printEdges();
  graph.updateEdges();
  graph.printEdges();
}
main();
