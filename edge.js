function Edge(node1, weight, node2){
  this.node1 = node1;
  this.node2 = node2;
  this.weight = weight;

  this.getNode1 = function(){
    return this.node1;
  }

  this.getNode2 = function(){
    return this.node2;
  }

  this.getWeigth = function(){
    return this.weight;
  }

  this.setWeigth = function(weight){
    this.weight = weight;
  }

  this.setNode1 = function(node1){
    this.node1 = node1;
  }

  this.setNode2 = function(node2){
    this.node2 = node2;
  }

  this.updateEdge = function(){
    var numberOfSame = (node1.getInterests()).filter(function(x){
        return node2.getInterests().includes(x);
    })
    this.weight += -0.5  + (0.41 * (numberOfSame.length));
  }

  this.toString = function(){
    return this.node1.toString() + " - " + this.weight + " - " + this.node2.toString();
  }
}
