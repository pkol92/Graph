const root = document.getElementById("dataPage");
const url = "https://randomuser.me/api/?gender=male&nat=fr&results=1000"
const tableTitles = ["First Name", "Last Name", "Age", "City"];

//function to create the table
function addRow(row, item){
    const nameCell = row.insertCell();
    nameCell.innerText = item;
}

function addMen(men){
    const tbl = document.querySelector("#table");
    const row = tbl.insertRow();
    addRow(row, men.name.first);
    addRow(row, men.name.last);
    addRow(row, men.dob.age);
    addRow(row, men.location.city);
};

function createTable(men, fieldTitles) {
    const table = document.createElement("table");
    table.setAttribute("id", "table");
    const tableDiv = document.getElementById('tableDiv')

    fieldTitles.forEach((fieldTitle) => {
        let th = document.createElement('th');
        th.appendChild(document.createTextNode(fieldTitle));
        table.append(th);
    });

    tableDiv.append(table);

    for (let i = 0; i < 10; i++) {
        addMen(men[i])
    };        
}

function deleteTable() {
    const table = document.getElementById('table');
    table.remove();
}

//create graph
function createGraph(dataMan) {
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
                data: [...dataMan],
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
    //data to graph
    const age20 = [];
    const age30 = [];
    const age40 = [];
    const age50 = [];
    const age60 = [];
    const age70 = [];
    const groupsMan = [];

    //adding men from data to different age groups
    for (let i = 0; i<data.results.length; i++){
        if ((data.results[i].dob.age >= 20) && (data.results[i].dob.age < 30)) {
            age20.push(data.results[i].dob.age)
        } else if ((data.results[i].dob.age >= 30) && (data.results[i].dob.age < 40)) {
            age30.push(data.results[i].dob.age)
        } else if ((data.results[i].dob.age >= 40) && (data.results[i].dob.age < 50)) {
            age40.push(data.results[i].dob.age)
        } else if ((data.results[i].dob.age >= 50) && (data.results[i].dob.age < 60)) {
            age50.push(data.results[i].dob.age)
        } else if ((data.results[i].dob.age >= 60) && (data.results[i].dob.age < 70)) {
            age60.push(data.results[i].dob.age)
        }  else {
            age70.push(data.results[i].dob.age)
        }
    };
    
    groupsMan.push(age20.length, age30.length, age40.length, age50.length, age60.length, age70.length);

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
