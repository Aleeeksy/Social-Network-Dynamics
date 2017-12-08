
function main(){
  var node1 = new Node(12,"John", ["tenis", "golf", "koszykówka","piłka"]);
  var node2 = new Node(11,"Piotr", ["motoryzacja", "góry", "piłka"]);
  var edge1 = new Edge(node1, 45, node2);
  var graph = new Graph([],[]);
  var request = new XMLHttpRequest();
  request.open("GET", "../../database/baza.json", false);
  request.send(null)
  var mydata  = JSON.parse(request.responseText);

  var request1 = new XMLHttpRequest();
  request1.open("GET", "../../database/node.json", false);
  request1.send(null)
  var mydata1  = JSON.parse(request1.responseText);
  graph.addNode(node1);
  graph.addNode(node2);
  graph.addEdge(edge1);
  graph.printEdges();
  graph.updateEdges();
  graph.printEdges();
  console.log(mydata[1]);
  mydata.sort(function(a, b) {
    return parseFloat(a.Source) - parseFloat(b.Source);
  });
  mydata1.length
  var interests = ['Scuba diving','River rafting','Bungee jumping','Skiing','Trekking','Ice skating','Surfing','Racing','Gymnastics','Hunting','Cook foods in disguise','Painting','Graffiti art','Creative writing','Dancing/choreography','Singing/composing music','Sculpting','Model building','Interior decorating','Jewelry-making','Computer games','Video gaming','Social networking','Keeping virtual pets','Creating software','Internet browsing','Blogging','Building computers and robots','Fishing','Archery','Boating','Traveling','Camping','Kayaking','Kart racing','Golfing','Swimming','Skateboarding','Playing cards','Tarot card reading','Playing board games','Watching movies','Cubing','Bowling','Billiards','Ping pong/table tennis','Pottery','Birdwatching','Geocaching','Photography','Cloud watching','Stargazing','People watching','Herping (looking for reptiles)','Amateur meteorology','Reading','Yoga','Meditation','Exercising and body building','Participating in marathons','Jumping rope','Swimming','Martial arts','Fitness counseling','Recipe creation'];

  var nodes = [];
  mydata1.forEach(function (node){
    var random = Math.floor((Math.random() * 10) + 5);
    var fewInterests = getUnique(random, interests);
    nodes.push(new Node(node.id, node.label,fewInterests));
  });
  mydata.forEach(function (node){
    console.log(node.Source);
  });
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
