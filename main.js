
var edgesS = []
var nodesS = []
var playAnimation = true
var nodesToDraw = []
var numberOfNodesToDraw = 300

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
  x = 1280 - 20;
  y = 720 - 15;
  numberOfNodeY = 30;
  numberOfNodeX = 53;
  addX = x / numberOfNodeX;
  addY = y / numberOfNodeY;
  startX = 20;
  startY = 15;
  mydata1.forEach(function (node){
    var random = Math.floor((Math.random() * 10) + 5);
    var fewInterests = getUnique(random, interests);
    nodes.push(new Node(node.id, node.label, fewInterests, 300, 300)); //zero na ostatnich
    startX += addX;
    if(startX >= x){
      startX = 20;
      startY += addY;
    }
  });

  nodesToDraw = getUnique(numberOfNodesToDraw, nodes)
  radius = 398
  nodes.forEach(function(node){
    for(var i = 0; i < numberOfNodesToDraw; i++){
      angle = 2 * (Math.PI / numberOfNodesToDraw) * i
      xCord = radius * Math.cos(angle)
      yCord = radius * Math.sin(angle)
      nodes[nodes.findIndex(z => z.getId() === nodesToDraw[i].getId())].setXCoordinate(xCord + 400)
      nodes[nodes.findIndex(z => z.getId() === nodesToDraw[i].getId())].setYCoordinate(yCord + 400)
    }
  })

  var edges = [];
  mydata.forEach(function (edge){
    edges.push(new Edge(nodes[nodes.findIndex(i => i.id === edge.Source)],edge.Weight, nodes[nodes.findIndex(i => i.id === edge.Target)], false));
  });

  nodesS = nodes;
  edgesS = edges;

}
main();

function start(){
  playAnimation = true;
  maxNumberOfNewFriendships = $('input[name="maxNumberOfNewFriendships"]').val()
  precentageOfFriends = $('input[name="precentageOfFriends"]').val()
  var graph = new Graph(nodesS, edgesS, nodesToDraw, maxNumberOfNewFriendships, precentageOfFriends);
  var ir = 0;

  var ctx2 = $("#myChart");
  var myChart = new Chart(ctx2, {
  type: 'bar',
  data: {
      labels: ["b Słaba", "słaba", "średnia", "silna", "b silna"],
      datasets: [{
          //label: '# of Votes',
          data: [0, 0, 0, 0, 0],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
      }]
  },
  options: {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }]
      }
  }
  });

  repeatOften();
  function repeatOften(){
    if(playAnimation){
      graph.draw();
      myChart.data.datasets[0].data[0] = graph.getEdges().filter(x => x.getWeigth() < 0.2).length
      myChart.data.datasets[0].data[1] = graph.getEdges().filter(x => x.getWeigth() < 0.4 && x.getWeigth() >= 0.2).length
      myChart.data.datasets[0].data[2] = graph.getEdges().filter(x => x.getWeigth() < 0.6 && x.getWeigth() >= 0.4).length
      myChart.data.datasets[0].data[3] = graph.getEdges().filter(x => x.getWeigth() < 0.8 && x.getWeigth() >= 0.6).length
      myChart.data.datasets[0].data[4] = graph.getEdges().filter(x => x.getWeigth() >= 0.8).length
      console.log()
      myChart.update()
      graph.updateEdges();
      if(ir % 7 == 0) graph.addNewEdge();
      ir++;
      requestAnimationFrame(repeatOften);
    }
  }
}


function stop(){
  playAnimation = false;
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
