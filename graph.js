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

  /*this.update = function(){
    this.edges = updateEdges();
    //this.edges = createNewEdges();
  }*/

  this.updateEdges = function(){
    /*this.edges.forEach(function (edge){
      edge.updateEdge();
      if(edge.getWeigth() <= 0){
        var index = edges.indexOf(edge);
        //console.log(index);
        if (index > -1) {
          this.edges = edges.splice(index, 1);
        }
      }
    });
    console.log(edges.length);*/
    this.nodes.forEach(function(node){
      var list = [];
      edges.forEach(function(edge){
        if(node.getId() === edge.getNode2().getId()){
          list.push(edge);
        }
      })
      var numberOfFriendshipsToImprove = (list.length * 0.2 >= 1) ? Math.round(list.length*0.2):1;
      var friendshipsToImprove = getUnique(numberOfFriendshipsToImprove, list);
      var friendshipsToDestroy = list.filter(x => !friendshipsToImprove.has(x));
      console.log("łacznie: ",numberOfFriendshipsToImprove);
      console.log("do poprawy: ",friendshipsToImprove.length);
      console.log("do pogorszenia: ",friendshipsToDestroy.length);
      friendshipsToImprove.map(element => element.update1Edge());
    })
  }

  //na edgach
  this.addNewEdge = function(){
    var tab = getUnique(2, nodes);
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
      else if(t.length === 0){
        var firstFriendNode = getUnique(1,nodes);
        if(firstFriendNode[0] !== element){
          //console.log('jest ok');
          //console.log(firstFriendNode[0]);
          edges.push(new Edge(element, 0.1, firstFriendNode[0]));
        }
      }

      //console.log(t.toString());
    });
  }
  //friend
  /*this.addNewFriend = function(){

  }*/

//rysowanie jeśli edge
  this.draw = function(){
    var canvas = document.getElementById("mynetwork");
    var ctx= canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
      node.getFriends().forEach(function(friend){

      });
    });

  }

  //rysowanie jeśli node i przyjaciele
  /* this.draw = function(){
      var canvas = document.getElementById("mynetwork");
      var ctx= canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
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
        node.getFriends().forEach(function(friend){
          ctx.beginPath();
          ctx.moveTo(node.getXCoordinate(),node.getYCoordinate());
          ctx.lineTo(friend.getNode().getXCoordinate(),friend.getNode().getYCoordinate());
          ctx.strokeStyle = node.getColor();
          //ctx.arc(node.getXCoordinate(),node.getYCoordinate(),4,0,2*Math.PI);
          //ctx.fillStyle= 'red';
          //ctx.fill();
          ctx.stroke();
        });
      });

    }*/
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
