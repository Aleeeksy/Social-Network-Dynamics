function Graph(nodes, edges){
  this.nodes = nodes;
  this.edges = edges;

  this.getNodes = function(){
    return this.nodes;
  }

  this.getEdges = function(){
    return this.edges;
  }

  this.setNodes = function(nodes){
    this.nodes = nodes;
  }

  this.setEdges = function(edges){
    this.edges = edges;
  }

  this.addNode = function(node){
    nodes.push(node);
  }

  this.addEdge = function(edge){
    edges.push(edge);
  }

  this.printNodes = function(){
    nodes.forEach(function(entry){
      console.log(entry.toString());
    });
  }

  this.printEdges = function(){
    edges.forEach(function(entry){
      console.log(entry.toString());
    });
  }
}
