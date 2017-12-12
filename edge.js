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
    var commonInterests = (node1.getInterests()).filter(function(x){
        return node2.getInterests().includes(x);
    })
    if(this.weight < 0.5){
      this.weight += -0.24  + (0.15 * (commonInterests.length));
    }
    else if(this.weight >= 0.5 && this.weight < 0.7){
      this.weight += -0.65  + (0.3 * (commonInterests.length));
    }
    else if(this.weight >= 0.7 && this.weight <= 1){
      this.weight += -0.85  + (0.5 * (commonInterests.length));
    }
    else if(this.weight > 1){
      this.weight = Math.random() * (1 - 0.2) + 0.2;
    }
  }

  this.toString = function(){
    return this.node1.toString() + " - " + this.weight + " - " + this.node2.toString();
  }
}
