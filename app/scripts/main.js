const root = document.getElementById("graph");


//create first paragraph section
const paragraphDiv = document.createElement("div");

const pFirst = "First paragraph";
const pSecond = "Second paragraph";

const paragraphFirst = document.createTextNode(pFirst);
const paragraphSecond = document.createTextNode(pSecond);
paragraphDiv.append(paragraphFirst, paragraphSecond);

//create placeholder
const placeholder = document.createElement("div");
const graphDiv = document.createElement("div");
const tableDiv = document.createElement("div");
tableDiv.setAttribute("id", "tableDiv")

const table = document.createElement("table");
table.setAttribute("id", "table");
tableDiv.append(table);

// function tableTitles(fieldTitles) {
//     fieldTitles.forEach((fieldTitle) => {
//     let th = document.createElement('th');
//     th.appendChild(document.createTextNode(fieldTitle));
//     table.appendChild(th);
//     });
// };

// function addMen(men){
//     const tbl = document.querySelector("#table");
//     const row = tbl.insertRow();
//     const firstName = row.insertCell();
//     firstName.innerText = men.firstName;
//     const lastName = row.insertCell();
//     lastName.innerText = men.lastName;
//     const city = row.insertCell();
//     city.innerText = men.city;
// };



placeholder.append(graphDiv, tableDiv)


//create button
const button = document.createElement("button");
button.innerText = "Pobierz dane";

//create second paragraph section
const parDiv = document.createElement("div");

const firstText = "First paragraph";
const secondText = "Second paragraph";
const thirdText = "Third paragraph";

const parFirst = document.createTextNode(firstText);
const parSecond = document.createTextNode(secondText);
const parThird = document.createTextNode(thirdText);

const p = document.createElement("P");
p.setAttribute("id", "test");

parDiv.append(parFirst, parSecond, parThird, p);

root.append(paragraphDiv, placeholder, button, parDiv);

// const myList = document.createElement("ul");
// root.append(myList);

const myApi = "https://randomuser.me/api/?gender=male&nat=fr&results=1000"

function downloadData(apiUrl) {
    fetch(apiUrl)
    .then((results) => {
      return results.json();
    })
    .then((data) => {
      console.log(data.results);
      const col = [];
         for (let i = 0; i < data.results.length; i++) {
             for (let key in data.results[i]) {
                 if (col.indexOf(key) === -1) {
                     col.push(key);
                 }
             }
         }
 
         // CREATE DYNAMIC TABLE.
         const table = document.createElement("table");
 
         // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
 
         let tr = table.insertRow(-1);                   // TABLE ROW.
 
         for (let i = 0; i < col.length; i++) {
             let th = document.createElement("th");      // TABLE HEADER.
             th.innerHTML = col[i];
             tr.appendChild(th);
         }
 
         // ADD JSON DATA TO THE TABLE AS ROWS.
         for (let i = 0; i < data.results.length; i++) {
 
             tr = table.insertRow(-1);
 
             for (let j = 0; j < col.length; j++) {
                 let tabCell = tr.insertCell(-1);
                 tabCell.innerHTML = data.results[i][col[j]];
             }
         }
 
         // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
         const divContainer = document.getElementById("table");
         divContainer.innerHTML = "";
         divContainer.appendChild(table);

    });
}


// const myTitles = ["First Name", "Last Name", "City"]

button.addEventListener("click", e => {
    e.preventDefault();
    downloadData(myApi);
    // tableTitles(myTitles);
});


//test graph
const canvasElemt = document.getElementById("chart");

const config = {
    type: "bar",
    data: {
        labels: ['10-19', '20-29','30-39'],
        datasets: [{
            label: "Number of men at a certain age",
            data: [3, 4, 10]
        }],
    },
};

const menChart = new Chart (canvasElemt, config);