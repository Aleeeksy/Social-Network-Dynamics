
function averageDistance(list){
  var edges = []
  for(var i = 0; i < graph.getNodes().length; i++){
    edges[i]= []
  }
  graph.getEdges().forEach(function(edge){
    edges[edge.getNode1().getId()].push(edge)
  })
  var suma = 0
  var ir = 0
  for(var i = 0; i < list.length; i++){
    if(edges[list[i].getId()].length > 0){
      for(var j = 0; j< list.length; j++){
        var dodawane = minEdgeBFS(edges, list[i].getId(), list[j].getId(),graph.getNodes().length)
        if(dodawane > 0){
          ir++;
        }
        suma += dodawane
      }
    }
  }
}

function longestDistance(list){
  var edges = []
  for(var i = 0; i < graph.getNodes().length; i++){
    edges[i]= []
  }
  graph.getEdges().forEach(function(edge){
    edges[edge.getNode1().getId()].push(edge)
  })
  var max = 0
  var ir = 0
  for(var i = 0; i < list.length; i++){
    if(edges[list[i].getId()].length > 0){
      for(var j = 0; j< list.length; j++){
        var nowyMax = minEdgeBFS(edges, list[i].getId(), list[j].getId(),graph.getNodes().length)
        if(nowyMax > max){
          max = nowyMax;
        }
      }
    }
  }
  console.log('suma:' + max + " itereator " + ir)
  console.log(max)
}


function minEdgeBFS(edges,start,end, numberOfNodes){
  // visited[n] for keeping track of visited node in BFS

  // Initialize distances as 0
  var visited = []
  var distance = []
  for(var i = 0; i < numberOfNodes; i++){
    distance[i] = 0
    visited[i] = false
  }

  var queue = []
  distance[start] = 0

  queue.push(start);
  visited[start] = true;
  while (queue.length > 0){
    var x = queue.pop();
    for (var i=0; i<edges[x].length; i++){
      if (visited[edges[x][i].getNode2().getId()])
        continue;
      distance[edges[x][i].getNode2().getId()] = distance[x] + 1;
      queue.push(edges[x][i].getNode2().getId());
      visited[edges[x][i].getNode2().getId()] = true;
    }
  }
  return distance[end];
}