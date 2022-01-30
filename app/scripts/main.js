import "regenerator-runtime/runtime";

const url = "https://randomuser.me/api/?gender=male&nat=fr&results=1000";
const tableTitles = ["First Name", "Last Name", "Age", "City"];

//create graph
function drawGraph(data) {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("id", "chart");
  const graphDiv = document.getElementById("graphDiv");
  graphDiv.append(canvas);
  const canvasElemt = document.getElementById("chart");

  const config = {
    type: "bar",
    data: {
      labels: ["20-29", "30-39", "40-49", "50-59", "60-69", "70-79"],
      datasets: [
        {
          label: "Number of men at a certain age",
          data: [...data],
          skipNull: true,
          scales: {
            offset: true,
          },
        },
      ],
    },
  };

  const menChart = new Chart(canvasElemt, config);
}

function deleteGraph() {
  const graph = document.getElementById("chart");
  graph.remove();
}

function getGraphData(data) {
  let age20 = 0;
  let age30 = 0;
  let age40 = 0;
  let age50 = 0;
  let age60 = 0;
  let age70 = 0;

  for (let i = 0; i < data.results.length; i++) {
    let age = data.results[i].dob.age;
    if (age >= 20 && age < 30) {
      age20++;
    } else if (age >= 30 && age < 40) {
      age30++;
    } else if (age >= 40 && age < 50) {
      age40++;
    } else if (age >= 50 && age < 60) {
      age50++;
    } else if (age >= 60 && age < 70) {
      age60++;
    } else {
      age70++;
    }
  }

  return [age20, age30, age40, age50, age60, age70];
}

//create table
function addCell(row, text) {
  const cell = row.insertCell();
  cell.innerText = text;
}

function addRow(data) {
  const tbl = document.querySelector("#table");
  const row = tbl.insertRow();
  addCell(row, data.name.first);
  addCell(row, data.name.last);
  addCell(row, data.dob.age);
  addCell(row, data.location.city);
}

function drawTable(data, titles) {
  const table = document.createElement("table");
  table.setAttribute("id", "table");
  const tableDiv = document.getElementById("tableDiv");

  titles.forEach((title) => {
    let th = document.createElement("th");
    th.appendChild(document.createTextNode(title));
    table.append(th);
  });

  tableDiv.append(table);

  for (let i = 0; i < 10; i++) {
    addRow(data[i]);
  }
}

function deleteTable() {
  const table = document.getElementById("table");
  table.remove();
}

function getTableData(data) {
  const sortAge = data.results
    .sort((a, b) => b.dob.age - a.dob.age)
    .slice(0, 10);
  return sortAge;
}

//create loader
const loaderDiv = document.querySelector("#placeholder");

function displayLoading() {
  loaderDiv.className = "loading";
}

function hideLoading() {
  loaderDiv.className = "placeholder";
}

//adding img to second part of text
const imgDiv = document.getElementById("secondParDiv");

function addImg() {
  imgDiv.className = "addImg";
}

if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  let count = parseInt(localStorage.getItem("counter") || 0);
  localStorage.setItem("counter", ++count);
}

if (localStorage.getItem("counter") % 5 === 0) {
  addImg();
}

//download API
async function downloadData(apiUrl) {
  displayLoading();
  const response = await fetch(apiUrl);
  const data = await response.json();
  hideLoading();
  return data;
}

//get data and draw table nad graph
async function main() {
  const data = await downloadData(url);
  const dataGraph = getGraphData(data);
  drawGraph(dataGraph);
  const dataTable = getTableData(data);
  drawTable(dataTable, tableTitles);
}

//add function to the button
const button = document.querySelector("#btn");
button.addEventListener("click", () => {
  if (document.getElementById("chart")) {
    deleteGraph();
  }

  if (document.getElementById("table")) {
    deleteTable();
  }

  (async () => {
    await main();
  })();
});
