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