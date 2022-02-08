$( document ).ready(function() {//document ready indica di eseguire questo codice quando la pag. è caricata
  //quando premo la classe hamburger aggiunge classea open per aprirlo
  /* Open Panel */
  $( ".hamburger" ).on('click', function() {
    $(".menu").toggleClass("menu--open");
  });
});

document.querySelector("#my_dataviz").style.display = "none";

let arrayFinale;
let checkbox = [];



//----------------------ELABORAZIONE MANUALE----------------------
function buttonElaborate(){
  const input = document.getElementById("csvFile");
  const file = input.files[0];
  document.querySelector("#bottone-input-druid").style.display = "none";

  const reader = new FileReader();

  reader.onload = function (e) {
    const text = e.target.result;//stringa con tutto il risultato del file CSV
    const data = csvToArray(text);
    arrayFinale = transformArray(data);
    manipulationDom();
  };

  reader.readAsText(file);
}

//----------------------ELABORAZIONE AI CON DRUID----------------------
function buttonElaborateDruid(){
  const input = document.getElementById("csvFile");
  const file = input.files[0];

  const reader = new FileReader();

  reader.onload = function (e) {
    const text = e.target.result;//stringa con tutto il risultato del file CSV
    const data = csvToArray(text);
    druid(data);
  };

  reader.readAsText(file);
}





//--------------------------------------------MANUALE-------------------------------------------------------------------

function csvToArray(str, delimiter = ","){
  let array = [];
  str = str.replace(/[\r]+/g, '');//tolgo \r

  const rows = str.split("\n");//divido nelle varie righe

  rows.forEach(elt => {
    const row = elt.split(',');//crea array con elementi di ogni riga
    array.push(row);
  });
  return array;

}
//----------------------SISTEMARE NEL CASO NON FOSSE ,----------------------

function isNumeric(n) { return !isNaN(n); }

function transformArray(data){
  data.forEach((elt, index) =>{
    if(index != 0){
      elt.forEach((elt2,index2) =>{
        if(isNumeric(elt2)){
          data[index][index2] = Number(elt2);
        }
      });
    }
  });
  return data;
}

function manipulationDom(){

  document.querySelector("#perCsv").style.display = "none";
  document.querySelector("#bottone-input").style.display = "none";


  arrayFinale[1].forEach((elt, index) =>{
    if(isNumeric(elt)){
      checkbox.push(arrayFinale[0][index]);
    }
  });

  //creare i checbox
  createCheckBox(checkbox);

  fine();
}

function createCheckBox(checkbox){

  var parentElement = document.querySelector('#myForm');
  let counter = 0;
  let spazio = document.createElement('br');

  for(var count in checkbox)
  {
    var newCheckBox = document.createElement('input');
    newCheckBox.type = 'checkbox';
    newCheckBox.id = 'check' + count; // need unique Ids!

    let spazio = document.createElement('br');

    var newLabel = document.createElement('label');
    newLabel.innerHTML = checkbox[count];

    parentElement.appendChild(spazio);
    parentElement.appendChild(newCheckBox);
    parentElement.appendChild(newLabel);
    counter++;
  }

  parentElement.appendChild(spazio);
  var newButton = document.createElement('button');
  newButton.innerHTML = "Calcola";
  newButton.id = "bottoneCalcoloFinale";
  newButton.classList.add("button");
  newButton.style.marginTop = "10px";
  newButton.type = "button";
  parentElement.appendChild(newButton);
}

function trasformaArray(array){
  headers = array.shift();
  let arrayModificato = array.map(function (row) {
    const el = headers.reduce(function (object, header, index) {
      object[header] = row[index];
      return object;
    }, {});
    return el;
  });
  return arrayModificato;
}

function fine(){
  let arrayBoolean = [];
  let cordX;let cordY;
  let x;let y;
  document.querySelector("#bottoneCalcoloFinale").onclick = function(){
    //contralle i 2 check
    checkbox.forEach((elt, index)=>{
      arrayBoolean.push((document.querySelector(`#check${index}`).checked));
    });
    arrayBoolean.forEach((elt, index)=>{
      if(elt == true){
        if(cordX == undefined){
          cordX = index;
        }
        else{
          cordY = index;
        }
      }
    });
    let x = checkbox[cordX];
    let y = checkbox[cordY];
    arrayFinale[0].forEach((elt, index)=>{
      if(elt == x){
        cordX = index;
      }
      if(elt == y){
        cordY = index;
      }
    });
    dataForD3(cordX, cordY, x, y);
  }


  function dataForD3(x, y, nameX, nameY){
    console.log("aa",arrayFinale);
    arrayFinale = deleteEmpty(arrayFinale);
    let arrayD3 = [];
    arrayFinale.forEach((elt, index) =>{
      let arrayTemp = [];
      arrayTemp.push(arrayFinale[index][cordX]);
      arrayTemp.push(arrayFinale[index][cordY]);
      arrayD3.push(arrayTemp);
    });
    arrayD3 = trasformaArray(arrayD3);
    console.log(arrayD3);
    d3Construct(arrayD3, nameX, nameY);
  }


}

function deleteEmpty(array){
  let localArray = [];
  array.forEach((item, i) => {
    if(item == 0) {}
    else {
      localArray.push(item);
    }
  });
  return localArray;
}



//--------------------------------------------DRUID-------------------------------------------------------------------

function druid(data){
  data = transformArray(data);
  data = trasformaArray(data);
  data.pop();//SISTEMARE
  const attrs = Object.keys(data[0]).filter(
    a => {
      console.log(typeof data[0][a]);
      return (typeof data[0][a] === "number");
    }
  );
  const maxes = attrs.map(a => {
    return d3.max(data, d => d[a]);
  });

  console.log(maxes);

  let a = data.map(d => attrs.map((a, i) => d[a] / maxes[i]));
  console.log("a",a);

  let projection = new druid.PCA(a).transform();//transformate in 2 colonne


  projection = formatArray(projection);
  console.log("pro",projection);
  d3Construct(projection, "x", "y");
}

function formatArray(projection){
    headers = ["x", "y"];
    let arrayModificato = projection.map(function (row) {
      const el = headers.reduce(function (object, header, index) {
        object[header] = row[index];
        return object;
      }, {});
      return el;
    });
    return arrayModificato;
  }

function min(data, nameX){
  let min = data[0][nameX];
  data.forEach((item, i) => {
    if(item[nameX] < min){
      min = item[nameX];
    }
  });
  console.log(min);
  return min;
}

function max(data, nameX){
  let max = data[0][nameX];
  data.forEach((item, i) => {
    if(item[nameX] > max){
      max = item[nameX];
    }
  });
  console.log(max);
  return max;
}


//--------------------------------------------D3, PLOT CSV-------------------------------------------------------------------


function d3Construct(data, nameX, nameY){

  console.log("data", data);
  console.log("x", nameX);
  console.log("y", nameY);

  document.querySelector("#contenitoreForm").style.display = "none";
  document.querySelector("#my_dataviz").style.display = "block";


  const margin = {top: 10, right: 30, bottom: 30, left: 60},
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  create();
  //Read the data
  function create(){

    // Add X axis
    const x = d3.scaleLinear()
    .domain([min(data, nameX), max(data, nameX)])
    .range([ 0, width ]);
    svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
    .domain([min(data, nameY), max(data, nameY)])
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y));

    // Add dots
    svg.append('g')
    .selectAll("dot")
    .data(data)
    .join("circle")
    .attr("cx", function (d) { return x(d[nameX]); } )
    .attr("cy", function (d) { return y(d[nameY]); } )
    .attr("r", 3.5)
    .style("fill", "#69b3a2");

  }
}
