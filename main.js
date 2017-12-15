
function main(){
  var request = new XMLHttpRequest();
  request.open("GET", "/database/edges.json", false);
  request.send(null)
  var mydata  = JSON.parse(request.responseText);
  var request1 = new XMLHttpRequest();
  request1.open("GET", "/database/nodes.json", false);
  request1.send(null)
  var mydata1  = JSON.parse(request1.responseText);
  /*mydata.sort(function(a, b) {
    return parseFloat(a.Source) - parseFloat(b.Source);
  });*/
  mydata1.length
  var interests = ['Scuba diving','River rafting','Bungee jumping','Skiing','Trekking','Ice skating','Surfing','Racing','Gymnastics','Hunting','Cook foods in disguise','Painting','Graffiti art','Creative writing','Dancing/choreography','Singing/composing music','Sculpting','Model building','Interior decorating','Jewelry-making','Computer games','Video gaming','Social networking','Keeping virtual pets','Creating software','Internet browsing','Blogging','Building computers and robots','Fishing','Archery','Boating','Traveling','Camping','Kayaking','Kart racing','Golfing','Swimming','Skateboarding','Playing cards','Tarot card reading','Playing board games','Watching movies','Cubing','Bowling','Billiards','Ping pong/table tennis','Pottery','Birdwatching','Geocaching','Photography','Cloud watching','Stargazing','People watching','Herping (looking for reptiles)','Amateur meteorology','Reading','Yoga','Meditation','Exercising and body building','Participating in marathons','Jumping rope','Swimming','Martial arts','Fitness counseling','Recipe creation'];

  var nodes = [];
  x = document.getElementById("mynetwork").offsetWidth; - 20;
  y = document.getElementById("mynetwork").offsetHeight; - 15;
  numberOfNodeY = 30;
  numberOfNodeX = 53;
  addX = x / numberOfNodeX;
  addY = y / numberOfNodeY;
  startX = 20;
  startY = 15;
  mydata1.forEach(function (node){
    var random = Math.floor((Math.random() * 10) + 5);
    var fewInterests = getUnique(random, interests);
    nodes.push(new Node(node.id, node.label, fewInterests, startX, startY, '#'+(Math.random()*0xFFFFFF<<0).toString(16), []));
    startX += addX;
    if(startX >= x){
      startX = 20;
      startY += addY;
    }
  });
  var edges = [];
  mydata.forEach(function (edge){
    edges.push(new Edge(nodes[nodes.findIndex(i => i.id === edge.Source)],edge.Weight,nodes[nodes.findIndex(i => i.id === edge.Target)]));
  });

  edges.forEach(function(edge){
    nodes[nodes.findIndex(i => i.id === edge.getNode1().getId())].addFriend(new Friend(nodes[nodes.findIndex(i => i.id === edge.getNode2().getId())], edge.getWeigth()));
    //nodes[nodes.findIndex(i => i.id === edge.getNode2().getId())].addFriend(new Friend(nodes[nodes.findIndex(i => i.id === edge.getNode1().getId())], edge.getWeigth()));
  });

  nodes.forEach(function(node){
    console.log(node.toString());
  });
  var graph = new Graph(nodes, edges);
  //var nodess = new vis.DataSet(nodes);
  /*var nodes_tab = [];
  var edges_tab = [];
  nodes.forEach(function(node){
    nodes_tab.push({id: node.getId(), label: node.getName()});
  });
  edges.forEach(function(edge){
    edges_tab.push({from: edge.getNode1().getId(), to: edge.getNode2().getId()});
  });
  var nodes_data = new vis.DataSet(nodes_tab);
  var edges_data = new vis.DataSet(edges_tab);
  var data = {
    nodes: nodes_data,
    edges: edges_data,
  }
  var options = {
  layout: {
    improvedLayout:false,
  }

  };
  var container = document.getElementById('mynetwork');
  var network = new vis.Network(container, data, options);*/

  repeatOften();
  function repeatOften(){
    graph.draw();
    graph.updateEdges();
    graph.addNewEdge();
    requestAnimationFrame(repeatOften);
  }
}
main();

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
