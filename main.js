
var edges = []
var nodes = []
var playAnimation = true
var nodesToDraw = []
var howToAddNewFriendships
var interests = ['Scuba diving','River rafting','Bungee jumping','Skiing','Trekking','Ice skating','Surfing','Racing','Gymnastics','Hunting','Cook foods in disguise','Painting','Graffiti art','Creative writing','Dancing/choreography','Singing/composing music','Sculpting','Model building','Interior decorating','Jewelry-making','Computer games','Video gaming','Social networking','Keeping virtual pets','Creating software','Internet browsing','Blogging','Building computers and robots','Fishing','Archery','Boating','Traveling','Camping','Kayaking','Kart racing','Golfing','Swimming','Skateboarding','Playing cards','Tarot card reading','Playing board games','Watching movies','Cubing','Bowling','Billiards','Ping pong/table tennis','Pottery','Birdwatching','Geocaching','Photography','Cloud watching','Stargazing','People watching','Herping (looking for reptiles)','Amateur meteorology','Reading','Yoga','Meditation','Exercising and body building','Participating in marathons','Jumping rope','Swimming','Martial arts','Fitness counseling','Recipe creation'];

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

  mydata1.forEach(function (node){
    nodes.push(new Node(node.id, node.label, [], 300, 300)); //zero na ostatnich
  });

  mydata.forEach(function (edge){
    edges.push(new Edge(nodes[nodes.findIndex(i => i.id === edge.Source)],edge.Weight, nodes[nodes.findIndex(i => i.id === edge.Target)], false));
  });


}
main();

function start(){

  maxNumberOfNewFriendships = $('input[name="maxNumberOfNewFriendships"]').val()
  precentageOfFriends = $('input[name="precentageOfFriends"]').val()
  howToAddNewFriendships = $('input[name="howToAddNewFriendships"]:checked').val()
  var numberOfNodesToDraw = $('input[name="numberOfNodesToDraw"]').val()
  var minNumberOfInterests = parseInt($('input[name="minNumberOfInterests"]').val())
  var maxNumberOfInterests = parseInt($('input[name="maxNumberOfInterests"]').val())
  console.log(howToAddNewFriendships)
  nodesToDraw = getUnique(numberOfNodesToDraw, nodes)
  radius = 398
  nodes.forEach(function(node){
    var random = Math.floor(Math.random() * (maxNumberOfInterests - minNumberOfInterests + 1)) + minNumberOfInterests;

    node.setInterests(getUnique(random, interests))
  })
    for(var i = 0; i < numberOfNodesToDraw; i++){
      angle = 2 * (Math.PI / numberOfNodesToDraw) * i
      xCord = radius * Math.cos(angle)
      yCord = radius * Math.sin(angle)
      nodes[nodes.findIndex(z => z.getId() === nodesToDraw[i].getId())].setXCoordinate(xCord + 400)
      nodes[nodes.findIndex(z => z.getId() === nodesToDraw[i].getId())].setYCoordinate(yCord + 400)
    }

  var graph = new Graph(nodes, edges, nodesToDraw, maxNumberOfNewFriendships, precentageOfFriends);
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
              'rgba(255, 255, 0, 0.2)',
              'rgba(100, 149, 237, 0.2)',
              'rgba(76, 1666, 76, 0.2)',
              'rgba(233, 60, 172, 0.2)',
              'rgba(255, 0, 0, 0.2)'
          ],
          borderColor: [
              'rgba(255, 255, 0, 1)',
              'rgba(100, 149, 237, 1)',
              'rgba(76, 1666, 76, 1)',
              'rgba(233, 60, 172, 1)',
              'rgba(255, 0, 0, 1)'
          ],
          borderWidth: 1
      }]
  },
  options: {
      responsive: false,
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }]
      }
  }
  });

  animate();
  function animate(){
    if(playAnimation){
      graph.draw();
      //var nodesAverageDistance = getUnique(graph.getNodes().length * 0.05, graph.getNodes())
      //averageDistance(nodesToAverageDistance);
      graph.updateEdges();
      myChart.data.datasets[0].data[0] = graph.getEdges().filter(x => x.getWeigth() < 0.2).length
      myChart.data.datasets[0].data[1] = graph.getEdges().filter(x => x.getWeigth() < 0.4 && x.getWeigth() >= 0.2).length
      myChart.data.datasets[0].data[2] = graph.getEdges().filter(x => x.getWeigth() < 0.6 && x.getWeigth() >= 0.4).length
      myChart.data.datasets[0].data[3] = graph.getEdges().filter(x => x.getWeigth() < 0.8 && x.getWeigth() >= 0.6).length
      myChart.data.datasets[0].data[4] = graph.getEdges().filter(x => x.getWeigth() >= 0.8).length
      myChart.update()
      $("#numberOfEdges").text("Number of edges: " + graph.getEdges().length)
      var networkDensity = graph.getEdges().length/((graph.getNodes().length*(graph.getNodes().length-1))/2)
      $("#networkDensity").text("Network density: " + parseFloat(networkDensity.toFixed(6)))
       if(howToAddNewFriendships == "connection"){
          graph.addNewEdgesHaveCommonFriends()
       }
       else if(howToAddNewFriendships == "interests"){
         graph.addNewEdgeHaveCommonInterests()
        }

      requestAnimationFrame(animate);
    }
  }
}


function stop(){
  playAnimation = false;
}

function setLightMode(){
  $('#light').click(function (){
    $('link[href="style1.css"]').attr('href','style.css');
  });
}

function setDarkMode(){
  $('#dark').click(function (){
    $('link[href="style.css"]').attr('href','style1.css');
  });
}