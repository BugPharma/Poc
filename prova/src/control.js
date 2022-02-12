import * as d3 from 'd3';
import * as druid from '@saehrimnir/druidjs';

let checkbox = [];

export function csvToArray(str, delimiter = ","){
  let array = [];
  str = str.replace(/[\r]+/g, '');//tolgo \r

  const rows = str.split("\n");//divido nelle varie righe

  rows.forEach(elt => {
    const row = elt.split(',');//crea array con elementi di ogni riga
    array.push(row);
  });
  return array;

}

function isNumeric(n) { return !isNaN(n); }

// per fare qualcosa ai dati numerici
export function transformArray(data){
      data.forEach((elt, index) =>{
        if(index != 0){
          elt.forEach((elt2,index2) =>{
            if(isNumeric(elt2)){
              data[index][index2] = Number(elt2);
            }
          });
        }
      });
    

  console.log("01_data", data);
  return data;
}


export function manipulationDom(arrayFinale){
  checkbox = []; //svuota l'array di checkbox per evitare problemi nel caso in cui non fosse stata ricaricata la pagina

  document.querySelector("#csvFile").style.display = "none"; //toglie la form per inserire il csv
  document.querySelector("#bottone-input").style.display = "none"; //toglie il bottone per elaborare
  document.querySelector("#bottone-input-druid").style.display = "none"; //toglie il bottone della pca

  arrayFinale[1].forEach((elt, index) =>{
    if(isNumeric(elt)){
      checkbox.push(arrayFinale[0][index]);
    }
  });

  console.log(checkbox);

  //creare i checkbox
  createCheckBox(checkbox);

  fine(arrayFinale);
}


function createCheckBox(checkB){ 

  var parentElement = document.querySelector('#myForm');
  let counter = 0;
  let spazio = document.createElement('br');

  for(var count in checkB)
  {
    var newCheckBox = document.createElement('input');
    newCheckBox.type = 'checkbox';
    newCheckBox.id = 'check' + count; // need unique Ids!

    let spazio = document.createElement('br');

    var newLabel = document.createElement('label');
    newLabel.innerHTML = checkB[count];

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


// toglie la prima riga e rimappa come array (?)
function trasformaArray(array){
  let headers = array.shift(); //toglie la prima riga

  let arrayModificato = array.map(
    function (row){
      const el = headers.reduce(
        function (object, header, index) {
          object[header] = row[index];
          return object;
        }, 
        {}
      );
      return el;
    }
  );
  
  console.log("arr mod", arrayModificato);
  return arrayModificato;
}

function fine(data){
  let arrayBoolean = [];
  let cordX;let cordY;
  let x;let y;

  document.querySelector("#bottoneCalcoloFinale").onclick = function(){
    //controlla i 2 check
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
    data[0].forEach((elt, index)=>{
      if(elt == x){
        cordX = index;
      }
      if(elt == y){
        cordY = index;
      }
    });

    dataForD3(cordX, cordY, x, y, data);
    
  }

  
  //crea un array di punti: dentro a fine() per poter usare cordX e cordY
  function dataForD3(x, y, nameX, nameY, arrayFinale){
    console.log("aa",arrayFinale);
    arrayFinale = deleteEmpty(arrayFinale); 
    
    let arrayD3 = [];
    arrayFinale.forEach((elt, index) =>{
      let arrayTemp = [];
      arrayTemp.push(data[index][cordX]);
      arrayTemp.push(data[index][cordY]);
      arrayD3.push(arrayTemp);
    });

    console.log("arrayD3", arrayD3);
    // per togliere la prima riga
    arrayD3 = trasformaArray(arrayD3);
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

export function elab_druid(data){
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
  let headers = ["x", "y"];
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
  width = 660 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

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
    .domain([min(data, nameX) , max(data, nameX)])
    .range([ 0, width ]);

    svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
    .domain([min(data, nameY) , max(data, nameY) ])
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
    .attr("r", 4.5)
    .style("fill", "#2879eb");
  }
}
