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

  this.updateEdges = function(){
    console.log(edges.length);
    this.edges.map((element) => {element.setUpdated(false)})
    this.nodes.forEach(function(node){
      var list = [];
      edges.forEach(function(edge){
        if((node.getId() === edge.getNode1().getId() && edge.getUpdated() == false) || (node.getId() === edge.getNode2().getId() && edge.getUpdated() == false)){
          list.push(edge);
          edge.setUpdated(true);
        }
      })
      var numberOfFriendshipsToImprove = 0;
      if(list.length === 0){
        numberOfFriendshipsToImprove = 0
      }
      else if(list.length < 3){
        numberOfFriendshipsToImprove = 1
      }
      else {
        numberOfFriendshipsToImprove = Math.round(list.length*0.2)
      }
      if(numberOfFriendshipsToImprove >= 8)numberOfFriendshipsToImprove = 7;
      var los = Math.floor(Math.random() * 3)
      if((los === 0 || los == 2) && list.length === 1){
        list[0].update1Edge();
      }
      if(los === 1 && list.length === 1){
        list[0].update2Edge();
      }
      else if(numberOfFriendshipsToImprove > 0 && list.length > 1){
        var friendshipsToImprove = getUnique(numberOfFriendshipsToImprove, list);
        var friendshipsToDestroy = list.filter(x => friendshipsToImprove.indexOf(x) === -1);
        friendshipsToImprove.forEach(function(element){
          if(element != null) {
            element.update1Edge()
          }
        })
        friendshipsToDestroy.forEach(function(element){
          if(element != null) {
            element.update2Edge()
            if(element.getWeigth() <= 0){
              var index = edges.indexOf(element)
              if(index > -1){
                this.edges = edges.splice(index,1);
              }
            }
          }
        })
      }
    })
  }

  //on egdes
  this.addNewEdge = function(){
    var tab = getUnique(this.maxNumberOfNewFriendships, nodes);
    tab.forEach(function(node1){

    var friendsOfNode1 = [];
          /*  edges.forEach(function(edge){
              if(edge.getNode1().getId() === node1.getId()){
                friendsOfNode1.push(edge);
              }
            })
            console.log(friendsOfNode1.length);
            if(friendsOfNode1.length > 0){
              var connectorBetween = friendsOfNode1[Math.floor(Math.random() * friendsOfNode1.length)].getNode1()


              var friendsOfConnectorBetween = [];
              edges.forEach(function(edge){
                if(edge.getNode1().getId() === connectorBetween.getId()){
                  friendsOfConnectorBetween.push(edge);
                }
              })

              var node2 = friendsOfConnectorBetween[Math.floor(Math.random() * friendsOfConnectorBetween.length)].getNode1()
              var saJuz = 0;
              friendsOfNode1.forEach(function(e){
                if(e.getNode1().getId() === node2.getId()){
                  saJuz++;
                }
              })
              if(saJuz === 0){
                edges.push(new Edge(node1, 0.1, node2));
                console.log('xDDD')
              }
            }*/

      for(var i = 0; i < edges.length; i++){
        if(edges[i].getNode1().getId() === node1.getId()){
          friendsOfNode1.push(i);
        }
      }

      //console.log(t.length);
      if(friendsOfNode1.length > 0){
        var rand = friendsOfNode1[Math.floor(Math.random() * friendsOfNode1.length)];
        //console.log(rand);
        var node_id1 = edges[rand].getNode2().getId();
        var n =[]
        for(var i = 0; i < edges.length; i++){
          if(edges[i].getNode1().getId() === node_id1){
            n.push(i);
          }
        }
        if(n.length > 0){
          var rand2 = n[Math.floor(Math.random() * n.length)];
          var node_id2 = edges[rand2].getNode2().getId();
          var g = []
          for(var i = 0; i < edges.length; i++){
            if(edges[i].getNode1().getId() === node_id2){
              g.push(i);
            }
          }
          var ma_juz_polonczenie = 0;
          friendsOfNode1.forEach(function(el){
            if(edges[el].getNode2().getId() === node_id2){
              ma_juz_polonczenie++;
            }
          })
          g.forEach(function(el){
            if(edges[el].getNode2().getId() === node_id1){
              ma_juz_polonczenie++;
            }
          })
          if(ma_juz_polonczenie === 0){
            edges.push(new Edge(node1,0.15,nodes[node_id2]));
          }
        }
      }
      else if(friendsOfNode1.length === 0){
        var los = Math.round(Math.random())
        if(los === 1){
          //console.log('nowe');
          var firstFriendNode = getUnique(1,nodes);
          if(firstFriendNode[0] !== node1){
            //console.log('jest ok');
            //console.log(firstFriendNode[0]);
            edges.push(new Edge(node1, 0.2, firstFriendNode[0]));
          }
        }
      }

      //console.log(t.toString());
    });
  }


//DRAWING NODES


  this.draw = function(){
    edges.forEach(function(edge){
      cy.add({
        data: {
          id: edge.id,
          source: edge.source,
          targer: edge.target
        }
      });
    });
    nodes.forEach(function(node){
      cy.add({
        data: {
          id: node.id,
          label: node.label
        }
      });
    });
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

}
