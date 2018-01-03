function Node(id,name, interests, XCoordinate, YCoordinate){
  this.id = id;
  this.name = name;
  this.interests = interests;
  this.XCoordinate = XCoordinate;
  this.YCoordinate = YCoordinate;

  this.setXCoordinate = function(XCoordinate){
    this.XCoordinate = XCoordinate;
  }

  this.setYCoordinate = function(YCoordinate){
    this.YCoordinate = YCoordinate;
  }

  this.setId = function(id){
    this.id = id;
  }

  this.setName = function(name){
    this.name = name;
  }

  this.setInterests = function(interests){
    this.interests = interests;
  }

  this.getXCoordinate = function(){
    return this.XCoordinate;
  }

  this.getYCoordinate = function(){
    return this.YCoordinate;
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
    var str = this.id + ' ' + this.name + ' (';
    return str;
  }
}
