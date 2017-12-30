function Edge(node1, weight, node2, updated){
  this.node1 = node1;
  this.node2 = node2;
  this.weight = weight;
  this.updated = updated;

  this.getUpdated = function(){
    return this.updated;
  }

  this.setUpdated = function(updated){
    this.updated = updated;
  }

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

  this.update1Edge = function(){
    var commonInterests = (node1.getInterests()).filter(function(x){
        return node2.getInterests().includes(x);
    })
      this.weight = this.weight + 0.02 + 0.05 * (commonInterests.length)
      if(this.weight > 1) this.weight = 0.9;
  }

  this.update2Edge = function(){
    var commonInterests = (node1.getInterests()).filter(function(x){
        return node2.getInterests().includes(x);
    })
      if(this.weight > 1) this.weight = 0.98;
      else if(this.weight > 0.8) this.weight = this.weight - 0.15
      else if(this.weight > 0.5) this.weight = this.weight - 0.07
      else if(this.weight > 0.3) this.weight = this.weight - 0.05
      else this.weight += -0.03;
  }

  this.toString = function(){
    return this.node1.toString() + " - " + this.weight + " - " + this.node2.toString();
  }
}
