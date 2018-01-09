
function averageDistance(graph){
  var edges = []
  list = getUnique(100, graph.getNodes())
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
    //if(edges[i].length > 0 ){
    //  for(var j = 0; j < graph.getNodes().length; j++){
    //    if(i != j)
    //      suma += minEdgeBFS(edges, i, j, graph.getNodes().length)
    //  }
    //}
    console.log('suma:' + suma + " itereator " + ir)

  console.log(suma)
}


function minEdgeBFS(edges,start,end, numberOfNodes){
    // visited[n] for keeping track of visited
    // node in BFS

    // Initialize distances as 0
    var visited = []
    var distance = []
    for(var i = 0; i < numberOfNodes; i++){
      distance[i] = 0
      visited[i] = false
    }


    // queue to do BFS.
    var queue = []
    distance[start] = 0

    queue.push(start);
    visited[start] = true;
    while (queue.length > 0)
    {
        var x = queue.pop();
        for (var i=0; i<edges[x].length; i++)
        {
            if (visited[edges[x][i].getNode2().getId()])
                continue;

            // update distance for i
            distance[edges[x][i].getNode2().getId()] = distance[x] + 1;
            queue.push(edges[x][i].getNode2().getId());
            visited[edges[x][i].getNode2().getId()] = true;
        }
    }
    return distance[end];
}
