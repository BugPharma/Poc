$( document ).ready(function() {
  $( ".hamburger" ).on('click', function() {
    $(".menu").toggleClass("menu--open");
  });
});

const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");


myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = csvFile.files[0];//prendo il CSV inserito
  const reader = new FileReader();

  reader.onload = function (e) {
    const text = e.target.result;
    const data = csvToArray(text);
    console.log(data);
    console.log(data[0]["common_name"]);
    samplingArray(data);
  };

  reader.readAsText(input);
});

function csvToArray(str, delimiter = ",") {
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
  const rows = str.slice(str.indexOf("\n") + 1).split("\n");

  const arr = rows.map(function (row) {


    const values = row.split(delimiter);
    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
    return el;

  });

  return arr;
}

function samplingArray(data){
  console.log(data.length);
}
