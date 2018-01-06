
function averageDistance(graph){
  edges = []
  for(var i = 0; i < graph.getNodes().length; i++){
    edges[i]= []
  }
  graph.getEdges().forEach(function(edge){
    edges[edge.getNode1().getId()].push(edge)
  })
  suma = 0
  for(var i = 0; i < graph.getNodes().length; i++){
    if(edges[i].length > 0 ){
      for(var j = 0; j < graph.getNodes().length; j++){
        if(i != j)
          suma += minEdgeBFS(edges, i, j, graph.getNodes().length)
      }
    }
    console.log('suma:' + suma)
  }
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
    console.log(start)
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
