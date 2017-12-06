function Node(id,name, interests){
  this.id = id;
  this.name = name;
  this.interests = interests;

  this.setId = function(id){
    this.id = id;
  }

  this.setName = function(name){
    this.name = name;
  }

  this.setInterests = function(interests){
    this.interests = interests;
  }

  this.getId = function(){
    return this.id;
  }

  this.getName = function(){
    return this.name;
  }

  this.getInterests = function(){
    return this.interests;
  }

  this.toString = function(){
    var str = this.id + ' ' + this.name + ' ' + interests.toString();
    return str;
  }
}
