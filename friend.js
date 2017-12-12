function Friend(node, weight){
  this.node = node;
  this.weight = weight;

  this.getNode = function(){
    return this.node;
  }

  this.getWeigth = function(){
    return this.weight;
  }

  this.setWeigth = function(weight){
    this.weight = weight;
  }

  this.setNode = function(node){
    this.node = node;
  }
}
