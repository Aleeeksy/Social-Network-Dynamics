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

  this.update = function(){
    this.edges = updateEdges();
    //this.edges = createNewEdges();
  }

  this.updateEdges = function(){
    this.edges.forEach(function (edge){
      edge.updateEdge();
    });
  }

  this.printEdges = function(){
    edges.forEach(function(entry){
      console.log(entry.toString());
    });
  }

  this.draw = function(){
    var c = document.getElementById("mynetwork");
    var ctx= c.getContext("2d");
    edges.forEach(function(edge){
      ctx.beginPath();
      ctx.moveTo(edge.getNode1().getXCoordinate(),edge.getNode1().getYCoordinate());
      ctx.lineTo(edge.getNode2().getXCoordinate(),edge.getNode2().getYCoordinate());
      //ctx.arc(node.getXCoordinate(),node.getYCoordinate(),4,0,2*Math.PI);
      //ctx.fillStyle= 'red';
      //ctx.fill();
      ctx.stroke();
    });
    nodes.forEach(function(node){
      ctx.beginPath();
      ctx.arc(node.getXCoordinate(),node.getYCoordinate(),4,0,2*Math.PI);
      ctx.fillStyle= 'red';
      ctx.fill();
    });

  }

}
