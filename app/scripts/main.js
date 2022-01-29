const root = document.getElementById("dataPage");


//create first paragraph section
const paragraphDiv = document.createElement("div");
paragraphDiv.setAttribute("class", "paragraphDiv");
root.append(paragraphDiv);

const pFirst = "France, officially French Republic, French France or République Française, country of northwestern Europe. Historically and culturally among the most important nations in the Western world, France has also played a highly significant role in international affairs, with former colonies in every corner of the globe. Bounded by the Atlantic Ocean and the Mediterranean Sea, the Alps and the Pyrenees, France has long provided a geographic, economic, and linguistic bridge joining northern and southern Europe. It is Europe’s most important agricultural producer and one of the world’s leading industrial powers.";

const pSecond = "The graph shows the groups of men of different age groups (20 to 79 years) of French nationality. The table shows basic information about the 10 oldest males from the available data. 1000 records from external API (https://randomuser.me/) were used.";

// function addText(msg, id) {
//     const div = document.getElementById(id);
//     const paragraph = document.createElement("p");
//     paragraph.textContent += msg;
//    div.append(paragraph);
// }; 

// addText(pFirst, "paragraphDiv");
const paragraphFirst = document.createElement("p");
paragraphFirst.textContent += pFirst;
const paragraphSecond = document.createElement("p");
paragraphSecond.textContent += pSecond;

paragraphDiv.append(paragraphFirst, paragraphSecond);


//create placeholder
const placeholder = document.createElement("div");
placeholder.setAttribute("id", "placeholder");
const graphDiv = document.createElement("div");
graphDiv.setAttribute("id", "graphDiv");
const tableDiv = document.createElement("div");
tableDiv.setAttribute("id", "tableDiv");

placeholder.append(graphDiv, tableDiv);


//create button
const button = document.createElement("button");
button.innerText = "Show data";

//create second paragraph section
const parDiv = document.createElement("div");
parDiv.setAttribute("class", "paragraphDiv");
parDiv.setAttribute("id", "secondParDiv");

const firstText = "The French are, paradoxically, strongly conscious of belonging to a single nation, but they hardly constitute a unified ethnic group by any scientific gauge. Before the official discovery of the Americas at the end of the 15th century, France, located on the western extremity of the Old World, was regarded for centuries by Europeans as being near the edge of the known world. Generations of different migrants traveling by way of the Mediterranean from the Middle East and Africa and through Europe from Central Asia and the Nordic lands settled permanently in France, forming a variegated grouping, almost like a series of geologic strata, since they were unable to migrate any farther. Perhaps the oldest reflection of these migrations is furnished by the Basque people, who live in an isolated area west of the Pyrenees in both Spain and France, who speak a language unrelated to other European languages, and whose origin remains unclear. The Celtic tribes, known to the Romans as Gauls, spread from central Europe in the period 500 BCE–500 CE to provide France with a major component of its population, especially in the centre and west. At the fall of the Roman Empire, there was a powerful penetration of Germanic (Teutonic) peoples, especially in northern and eastern France. The incursion of the Norsemen (Vikings) brought further Germanic influence. In addition to these many migrations, France was, over the centuries, the field of numerous battles and of prolonged occupations before becoming, in the 19th and especially in the 20th century, the prime recipient of foreign immigration into Europe, adding still other mixtures to the ethnic melting pot.";

const secondText = "French is the national language, spoken and taught everywhere. Brogues and dialects are widespread in rural areas, however, and many people tend to conserve their regional linguistic customs either through tradition or through a voluntary and deliberate return to a specific regional dialect. This tendency is strongest in the frontier areas of France. In the eastern and northern part of the country, Alsatian and Flemish (Dutch) are Germanic languages; in the south, Occitan (Provençal or Languedoc), Corsican, and Catalan show the influence of Latin. Breton is a Celtic language related to languages spoken in some western parts of the British Isles (notably Wales), and Basque is a language isolate. Following the introduction of universal primary education during the Third Republic in 1872, the use of regional languages was rigorously repressed in the interest of national unity, and pupils using them were punished. More recently, in reaction to the rise in regional sentiment, these languages have been introduced in a number of schools and universities, primarily because some of them, such as Occitan, Basque, and Breton, have maintained a literary tradition. Recent immigration has introduced various non-European languages, notably Arabic.";

const thirdText = "About three-fifths of the French people belong to the Roman Catholic Church. Only a minority, however, regularly participate in religious worship; practice is greatest among the middle classes. The northwest (Brittany-Vendée), the east (Lorraine, Vosges, Alsace, Jura, Lyonnais, and the northern Alps), the north (Flanders), the Basque Country, and the region south of the Massif Central have a higher percentage of practicing Roman Catholics than the rest of the country. Recruitment of priests has become more difficult, even though the church, historically autonomous, is very progressive and ecumenical.";

const parFirst = document.createElement("p");
parFirst.textContent += firstText;
const parSecond = document.createElement("p");
parSecond.textContent += secondText;
const parThird = document.createElement("p");
parThird.textContent += thirdText;

parDiv.append(parFirst, parSecond, parThird);

root.append(placeholder, button, parDiv);

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

function deleteGraph() {
    const graph = document.getElementById("chart");
    graph.remove();
}

//test graph
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

const myApi = "https://randomuser.me/api/?gender=male&nat=fr&results=1000"

function downloadData(apiUrl) {
    fetch(apiUrl)
    .then((results) => {
      return results.json();
    })
    .then((data) => {

    //data to graph
    const age20 = [];
    const age30 = [];
    const age40 = [];
    const age50 = [];
    const age60 = [];
    const age70 = [];
    const groupsMan = [];

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

    //data to table
    const sortAge = data.results.sort((a, b) => b.dob.age - a.dob.age);

    //create graph
    if (document.getElementById("chart")) {
        deleteGraph();
        createGraph(groupsMan);
    } else {
        createGraph(groupsMan);
    };

    //create table
    if (document.getElementById('table')) {
        deleteTable();
        createTable(sortAge, myTitles);
    } else {
        createTable(sortAge, myTitles);
    };
              
    })
    .catch(error => {
         console.log('Error happened here!')
         console.error(error)
    })

};


button.addEventListener("click", e => {
    e.preventDefault();
    downloadData(myApi);
});
