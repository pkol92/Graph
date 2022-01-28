// const { Chart } = require("chart.js");

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

parDiv.append(parFirst, parSecond, parThird);

root.append(paragraphDiv, placeholder, button, parDiv);

const myApi = "https://randomuser.me/api/?gender=male&nat=fr&results=1000"

function downloadData(api) {
    // fetch(api)
    //     .then(res => {
    //         if (res.ok) {
    //             return res.json()
    //         } else {
    //             return Promise.reject(`Http error: ${res.status}`);
    //             //lub rzucając błąd
    //             //throw new Error(`Http error: ${res.status}`);
    //         }
    //     })
    //     .then(res => {
    //         console.log(res)
    //     })
    //     .catch(error => {
    //         console.error(error)
    // })

    fetch(api).then(async response => {
        try {
         const data = await response.json()
         console.log('response data?', data)
       } catch(error) {
         console.log('Error happened here!')
         console.error(error)
       }
    })
}


button.addEventListener("click", e => {
    e.preventDefault();
    downloadData(myApi);
});

// const myChart = new Chart(myChart, {
//     type: 'bar',
//     data: {
//         labels: ['20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80-89','90-99','100-109'],
//         datasets: [{
//             label: 'Wiek',
//             data: [
//                 323,
//                 32323,
//                 45,
//                 53,
//                 12,
//                 1
//             ]
//         }]
//     },
//     options: {}
// })

// root.append(myChart);