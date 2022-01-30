const root = document.getElementById("dataPage");
const url = "https://randomuser.me/api/?gender=male&nat=fr&results=1000"
const tableTitles = ["First Name", "Last Name", "Age", "City"];

//function to create the table
function addCell(row, text){
    const cell = row.insertCell();
    cell.innerText = text;
}

function addRow(person){
    const tbl = document.querySelector("#table");
    const row = tbl.insertRow();
    addCell(row, person.name.first);
    addCell(row, person.name.last);
    addCell(row, person.dob.age);
    addCell(row, person.location.city);
};

function createTable(data, titles) {
    const table = document.createElement("table");
    table.setAttribute("id", "table");
    const tableDiv = document.getElementById('tableDiv')

    titles.forEach((fieldTitle) => {
        let th = document.createElement('th');
        th.appendChild(document.createTextNode(fieldTitle));
        table.append(th);
    });

    tableDiv.append(table);

    for (let i = 0; i < 10; i++) {
        addRow(data[i])
    };        
}

function deleteTable() {
    const table = document.getElementById('table');
    table.remove();
}

//create graph
function createGraph(data) {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "chart");
    const graphDiv = document.getElementById("graphDiv");
    graphDiv.append(canvas);
    const canvasElemt = document.getElementById("chart");

    const config = {
        type: "bar",
        data: {
            labels: ['20-29','30-39', '40-49', '50-59','60-69', '70-79'],
            datasets: [{
                label: "Number of men at a certain age",
                data: [...data],
                skipNull: true,
                scales: { 
                    offset: true,
                }
            }],
        },
    };

    const menChart = new Chart (canvasElemt, config);
};

function deleteGraph() {
    const graph = document.getElementById("chart");
    graph.remove();
}

//create loader 
const loaderDiv = document.querySelector("#placeholder");

function displayLoading() {
    loaderDiv.className = "loading";
};

function hideLoading() {
    loaderDiv.className = "placeholder";
}

//download data from API
function downloadData(apiUrl) {
    displayLoading()
    fetch(apiUrl)
    .then((results) => {
      return results.json();
    })
    .then((data) => {
    hideLoading()

    //adding men from data to different age groups
    let age20 = 0;
    let age30 = 0;
    let age40 = 0;
    let age50 = 0;
    let age60 = 0;
    let age70 = 0;
    let groupsMan = [];

    for (let i = 0; i<data.results.length; i++){
        let age = data.results[i].dob.age
        if ((age >= 20) && (age < 30)) {
            age20++
        } else if ((age >= 30) && (age < 40)) {
            age30++
        } else if ((age >= 40) && (age < 50)) {
            age40++
        } else if ((age >= 50) && (age < 60)) {
            age50++
        } else if ((age >= 60) && (age < 70)) {
            age60++
        }  else {
            age70++
        }
    };

    groupsMan.push(age20, age30, age40, age50, age60, age70);

    //sort men age to the table
    const sortAge = data.results.sort((a, b) => b.dob.age - a.dob.age);

    // create graph
        createGraph(groupsMan);

    //create table
        createTable(sortAge, tableTitles);
              
    })
    .catch(error => {
         console.log('Error happened here!')
         console.error(error)
    })

};

//adding img to second part of text
const imgDiv = document.getElementById("secondParDiv");

function addImg() {
    imgDiv.className = "addImg";
};

function removeImg() {
    imgDiv.className = "paragraphDiv";
}

let countClick = 0;

//add function to the button
const button = document.querySelector("#btn");
button.addEventListener("click", e => {

    countClick++
    countClick % 5 === 0 ? addImg() : removeImg();

    if (document.getElementById("chart")) {
        deleteGraph()
    };

    if (document.getElementById('table')) {
        deleteTable();
    };

    downloadData(url);
    
});
