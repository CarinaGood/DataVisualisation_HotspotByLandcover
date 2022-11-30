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

    //console.log(data.id);

    let token = document.querySelector("div.token");
    token.style.opacity = "0";

    let landcover = document.querySelector("div.links");
    landcover.style.opacity = "1";

    moveLandcover(normalizedXPos, normalizedYPos);
    selectLandcover(data.rotation, normalizedXPos, normalizedYPos);

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

function selectLandcover(degrees, x, y){
  let matches = document.querySelectorAll("li");
  //console.log(matches[3]);
  // to-do remove selection
  matches.forEach(
    function(currentValue){
      currentValue.classList.remove("links__link_selected");
    }
  )

  degrees = 36*1-1;

  switch(true) {
    case degrees < 36:
      matches[0].classList.add("links__link_selected");
      matches[0].parentElement.style.transformOrigin = `${x}px ${y}px`;
      matches[0].parentElement.style.transform = `rotate(${3*36}deg)`;
      break;
    case degrees < 36*2:
      matches[1].classList.add("links__link_selected");
      matches[0].parentElement.style.transformOrigin = `${x}px ${y}px`;
      matches[0].parentElement.style.transform = `rotate(${2*36}deg)`;
      break;
    case degrees < 36*3:
      matches[2].classList.add("links__link_selected");
      matches[0].parentElement.style.transformOrigin = `${x}px ${y}px`;
      matches[0].parentElement.style.transform = `rotate(${1*36}deg)`;
      break;
    case degrees < 36*4:
      matches[3].classList.add("links__link_selected");
      matches[0].parentElement.style.transformOrigin = `${x}px ${y}px`;
      matches[0].parentElement.style.transform = `rotate(${0*36}deg)`;
      break;
    case degrees < 36*5:
      matches[4].classList.add("links__link_selected");
      matches[0].parentElement.style.transformOrigin = `${x}px ${y}px`;
      matches[0].parentElement.style.transform = `rotate(${9*36}deg)`;
      break;
    case degrees < 36*6:
      matches[5].classList.add("links__link_selected");
      matches[0].parentElement.style.transformOrigin = `${x}px ${y}px`;
      matches[0].parentElement.style.transform = `rotate(${8*36}deg)`;
      break;
    case degrees < 36*7:
      matches[6].classList.add("links__link_selected");
      matches[0].parentElement.style.transformOrigin = `${x}px ${y}px`;
      matches[0].parentElement.style.transform = `rotate(${7*36}deg)`;
      break;
    case degrees < 36*8:
      matches[7].classList.add("links__link_selected");
      matches[0].parentElement.style.transformOrigin = `${x}px ${y}px`;
      matches[0].parentElement.style.transform = `rotate(${6*36}deg)`;
      break;
    case degrees < 36*9:
      matches[8].classList.add("links__link_selected");
      matches[0].parentElement.style.transformOrigin = `${x}px ${y}px`;
      matches[0].parentElement.style.transform = `rotate(${5*36}deg)`;
      break;
    default:
      matches[9].classList.add("links__link_selected");
      matches[0].parentElement.style.transformOrigin = `${x}px ${y}px`;
      matches[0].parentElement.style.transform = `rotate(${4*36}deg)`;
      break;
  }

}

listenToTokens();
