const settings = {
  circleSize: 40,
  strokeWidth: 3,
  triangleSize: 20,
  fontSize: "9px",
};

function loadData(){
  d3.csv("./data/CarbonPotentialsInHotspots_byLandUse.csv", function(data){
      console.log(data);
  }); 
}

function listenToTokens() {
  const { wsPort } = Osc();

  console.log("wsPort: ", wsPort);

  // receiving token data
  wsPort.on("updateDevice", (data) => {
    // data.x and data.y are values between 0–1
    const normalizedXPos = window.innerWidth * data.x;
    const normalizedYPos = window.innerHeight * data.y;

    moveLandcover(normalizedXPos, normalizedYPos);
    selectLandcover(data.rotation);

  });
}

function moveLandcover(x, y){
  let matches = document.querySelectorAll("li");
  //console.log(matches);

  matches.forEach(
    function(currentValue){
      //console.log(currentValue);
      currentValue.style.left = x + "px";
      currentValue.style.top = y + "px";
    }
  )
}

function selectLandcover(degrees){
  let matches = document.querySelectorAll("li");
  //console.log(matches[3]);
  // to-do remove selection
  matches.forEach(
    function(currentValue){
      currentValue.classList.remove("links__link_selected");
    }
  )

  switch(true) {
    case degrees < 36:
      matches[0].classList.add("links__link_selected");
      break;
    case degrees < 36*2:
      matches[1].classList.add("links__link_selected");
      break;
    case degrees < 36*3:
      matches[2].classList.add("links__link_selected");
      break;
    case degrees < 36*4:
      matches[3].classList.add("links__link_selected");
      break;
    case degrees < 36*5:
      matches[4].classList.add("links__link_selected");
      break;
    case degrees < 36*6:
      matches[5].classList.add("links__link_selected");
      break;
    case degrees < 36*7:
      matches[6].classList.add("links__link_selected");
      break;
    case degrees < 36*8:
      matches[7].classList.add("links__link_selected");
      break;
    case degrees < 36*9:
      matches[8].classList.add("links__link_selected");
      break;
    default:
      matches[9].classList.add("links__link_selected");
      break;
  }

  

   

}

function drawSVG() {
  
  // creating an svg within the div with id #d3
  const svg = d3
    .select("#d3")
    .append("svg")
    // setting svg specific attributes for the svg tag
    .attr("width", window.innerWidth)
    .attr("height", window.innerHeight);

  // creating a <g> group tag
  const indicatorGroup = svg.append("g").attr("id", "indicator");
  const rotatingGroup = indicatorGroup.append("g").attr("id", "rotate");

  const triangle = d3.symbol().type(d3.symbolTriangle).size(settings.triangleSize);

  // using the same svg selection from before and adding a line
  rotatingGroup
    .append("circle")
    .style("stroke", "#0022ff")
    .style("stroke-width", settings.strokeWidth)
    .style("fill", "transparent")

    .attr("r", settings.circleSize)
    .attr("cx", 0)
    .attr("cy", 0);

  rotatingGroup
    .append("path")
    .attr("d", triangle)
    .attr("stroke", "#0022ff")
    .attr("fill", "#0022ff")
    .attr("transform", `translate(0, -${settings.circleSize + settings.strokeWidth})`);

  indicatorGroup
    .append("text")
    .attr("id", "indicator-text")
    .attr("font-size", settings.fontSize)
    .attr("text-anchor", "middle")
    .attr("x", 0)
    .attr("y", 0)
    .attr("fill", "#000")
    .text("0°");
}

function updateText(text) {
  const circleText = d3.select("#indicator-text").text(`${text} °`);
}

function moveSVG(x, y) {
  const indicator = d3
    .select("#indicator")
    .transition()
    .duration(500)
    .ease(d3.easeLinear)
    .attr("transform", () => `translate(${x}, ${y})`);
}

function rotateSVG(degrees) {
  const rotator = d3
    .select("#rotate")
    .transition()
    .duration(500)
    .ease(d3.easeLinear)
    .attr("transform", () => `rotate(${degrees})`);
}


//loadData();
//drawSVG();
listenToTokens();
