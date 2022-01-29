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

// const table = document.createElement("table");
// table.setAttribute("id", "table");
// tableDiv.append(table);

function tableTitles(fieldTitles) {
    fieldTitles.forEach((fieldTitle) => {
    let th = document.createElement('th');
    th.appendChild(document.createTextNode(fieldTitle));
    table.append(th);
    });
};





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
const myTitles = ["First Name", "Last Name", "Age", "City"];

function addMen(men){
    const tbl = document.querySelector("#table");
    const row = tbl.insertRow();
    const firstName = row.insertCell();
    firstName.innerText = men.name.first;
    const lastName = row.insertCell();
    lastName.innerText = men.name.last;
    const age = row.insertCell();
    age.innerText = men.dob.age;
    const city = row.insertCell();
    city.innerText = men.location.city;
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

const myApi = "https://randomuser.me/api/?gender=male&nat=fr&results=1000"

function downloadData(apiUrl) {
    fetch(apiUrl)
    .then((results) => {
      return results.json();
    })
    .then((data) => {
      console.log(data.results[0]);

    //data to graph
    const age20 = [];
    const age30 = [];
    const age40 = [];
    const age50 = [];
    const age60 = [];
    const age70 = [];
    const age80 = [];
    const age90 = [];
    const age100 = [];

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
            } else if ((data.results[i].dob.age >= 70) && (data.results[i].dob.age < 80)) {
                age70.push(data.results[i].dob.age)
            } else if ((data.results[i].dob.age >= 80) && (data.results[i].dob.age < 90)) {
                age80.push(data.results[i].dob.age)
            } else if ((data.results[i].dob.age >= 90) && (data.results[i].dob.age < 100)) {
                age90.push(data.results[i].dob.age)
            } else {
                age100.push(data.results[i].dob.age)
            }
        }
        console.log(age20.length, age30.length, age40.length, age50.length, age60.length, age70.length, age80.length, age90.length, age100.length)
     
        //data to table
        const sortAge = data.results.sort((a, b) => b.dob.age - a.dob.age)

        //create table
        if (document.getElementById('table')) {
            deleteTable();
            createTable(sortAge, myTitles);
        } else {
            createTable(sortAge, myTitles);
        }
        
        
    })
    .catch(error => {
         console.log('Error happened here!')
         console.error(error)
    })

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