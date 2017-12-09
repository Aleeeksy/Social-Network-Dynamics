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

  this.addNewEdge = function(){
    var tab = getUnique(5, nodes);
    tab.forEach(function(element){
      var t = [];
      for(var i = 0; i < edges.length; i++){
        if(edges[i].getNode1().getId() === element.getId()){
          t.push(i);
        }
      }
      //console.log(t);
      if(t.length > 0){
        var rand = t[Math.floor(Math.random() * t.length)];
        //console.log(rand);
        var node_id1 = edges[rand].getNode2().getId();
        var n =[]
        for(var i = 0; i < edges.length; i++){
          if(edges[i].getNode1().getId() === node_id1){
            n.push(i);
          }
        }
        if(n.length > 0){
          var rand = n[Math.floor(Math.random() * n.length)];
          var node_id2 = edges[rand].getNode2().getId();
          var ma_juz_polonczenie = 0;
          t.forEach(function(el){
            if(edges[el].getNode2().getId() === node_id2){
              ma_juz_polonczenie++;
            }
          });
          if(ma_juz_polonczenie === 0){
            edges.push(new Edge(element,0.2,nodes[node_id2]));
          }
        }
      }

      //console.log(t.toString());
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
      ctx.strokeStyle = edge.getNode2().getColor();
      //ctx.arc(node.getXCoordinate(),node.getYCoordinate(),4,0,2*Math.PI);
      //ctx.fillStyle= 'red';
      //ctx.fill();
      ctx.stroke();
    });
    nodes.forEach(function(node){
      ctx.beginPath();
      ctx.arc(node.getXCoordinate(),node.getYCoordinate(),4,0,2*Math.PI);
      ctx.fillStyle = node.getColor();
      ctx.fill();
    });

  }
}

function getUnique(count, array) {
  // Make a copy of the array
  var tmp = array.slice(array);
  var ret = [];

  for (var i = 0; i < count; i++) {
    var index = Math.floor(Math.random() * tmp.length);
    var removed = tmp.splice(index, 1);
    // Since we are only removing one element
    ret.push(removed[0]);
  }
  return ret;
}
