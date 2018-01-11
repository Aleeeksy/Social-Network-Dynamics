function Graph(nodes, edges, nodesToDraw, maxNumberOfNewFriendships, precentageOfFriends){
  this.nodes = nodes
  this.nodesToDraw = nodesToDraw
  this.edges = edges
  this.maxNumberOfNewFriendships = maxNumberOfNewFriendships //120
  this.precentageOfFriends = precentageOfFriends  //0.2


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
    var sumNodeDegree = 0
    this.edges.map((element) => {element.setUpdated(false)})
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
    //console.log("nowe5")
    this.nodes.forEach(function(node){
      var list = [];
      list.push(...(edges.filter(x => x.getNode1().getId() === node.getId() && x.getUpdated() == false)))
      list.push(...(edges.filter(x => x.getNode2().getId() === node.getId() && x.getUpdated() == false)))
      sumNodeDegree += list.length;
      list.map((element)=>{element.setUpdated(true)})
      var numberOfFriendshipsToImprove = 0;
      if(list.length === 0){
        numberOfFriendshipsToImprove = 0
      }
      else if(Math.round(list.length * this.precentageOfFriends) < 0.7){
        numberOfFriendshipsToImprove = 1
      }
      else if(Math.round(list.length * this.precentageOfFriends) < 1){
        numberOfFriendshipsToImprove = Math.round(list.length * this.precentageOfFriends) * (list.length /2)
      }
      else {
        numberOfFriendshipsToImprove = Math.round(list.length * this.precentageOfFriends)
      }
      //if(numberOfFriendshipsToImprove >= 8)numberOfFriendshipsToImprove = 7;
      var los = Math.floor(Math.random() * 3)
      if((los === 0 || los == 2) && list.length === 1){
        list[0].update1Edge();
      }
      else if(los === 1 && list.length === 1){
        list[0].update2Edge();
      }
      if(numberOfFriendshipsToImprove > 0 && list.length > 1){
        var friendshipsToImprove = getUnique(numberOfFriendshipsToImprove, list);
        var friendshipsToDestroy = list.filter(x => friendshipsToImprove.indexOf(x) === -1);
        /*console.log("łacznie: ", list.length)
        console.log("do poprawy: ",friendshipsToImprove.length)
        console.log("do pogorszenia: ",friendshipsToDestroy.length)*/
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
    var averageNodeDegree = sumNodeDegree / this.nodes.length
    $("#averageNodeDegree").text("Average Node Degree: " + parseFloat(averageNodeDegree.toFixed(6)))
  }


  this.addNewEdgesHaveCommonFriends = function(){
    var tab = getUnique(this.maxNumberOfNewFriendships, nodes);
    tab.forEach(function(node1){
     var friendsOfNode1 = [];
    /*  edges.forEach(function(edge){
          if(edge.getNode1().getId() === node1.getId()){
                friendsOfNode1.push(edge);
              }
            })
            //console.log(friendsOfNode1.length);
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
                console.log("xDDD")
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
            edges.push(new Edge(node1,0.11,nodes[node_id2]));
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
            edges.push(new Edge(node1, 0.21, firstFriendNode[0]));
          }
        }
      }

      //console.log(t.toString());
    });
  }

  this.addNewEdgeHaveCommonInterests = function(){
    var tab1 = getUnique(this.maxNumberOfNewFriendships, nodes)
    var tmp = []
    nodes.forEach(function(key) {
      if (-1 === tab1.indexOf(key)) {
        tmp.push(key);
      }
    })
    for(var i = 0; i< tab1.length; i++){
      node1 = getUnique(1, tab1)
      node1 = node1[0]
      nodesToBeFriend = getUnique(this.maxNumberOfNewFriendships * 0.03, tab1)
      nodesToBeFriend.forEach(function(node2){
        commonInterests = (node1.getInterests()).filter(function(x){
            return node2.getInterests().includes(x);
        })
        var maxNumberOfInterests = $('input[name="maxNumberOfInterests"]').val()
        if(commonInterests.length > 0 && (node1.getId() != node2.getId())){
          edges.push(new Edge(node1, 0.33 + commonInterests.length * 0.02, node2))
        }
      })

    }
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
      if(nodesToDraw[nodesToDraw.findIndex(z => z.getId() === edge.getNode1().getId())] && nodesToDraw[nodesToDraw.findIndex(z => z.getId() === edge.getNode2().getId())]){
        ctx.beginPath();
        ctx.moveTo(edge.getNode1().getXCoordinate(),edge.getNode1().getYCoordinate());
        ctx.lineTo(edge.getNode2().getXCoordinate(),edge.getNode2().getYCoordinate());
        ctx.strokeStyle = getColor(edge.getWeigth());

        //ctx.arc(node.getXCoordinate(),node.getYCoordinate(),4,0,2*Math.PI);
        //ctx.fillStyle= 'red';
        //ctx.fill();
        ctx.stroke();
      }

    })

    nodesToDraw.forEach(function(node){
      ctx.beginPath();
      ctx.arc(node.getXCoordinate(),node.getYCoordinate(),2,0,2*Math.PI);
      ctx.fillStyle = 'black';
      ctx.fill();
    })
  }
}

function getColor(weight) {
  if(weight < 0.2) return '#FFFF00' // żółty
  else if(weight < 0.4) return  '#6495ED' // niebieski
  else if(weight < 0.6) return  '#4CA64C' //zielony
  else if(weight < 0.8) return '#E93CAC' // różowy
  else return '#FF0000' //red
}
