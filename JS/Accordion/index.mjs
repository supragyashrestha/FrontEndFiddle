// import "./styles.css";
import { accordionData } from "./data.js";

// console.log({ accordionData });
const appEle = document.getElementById("app");
const tableEle = document.createElement("table");
const tableBody = document.createElement("tbody");
appEle.appendChild(tableEle);
tableEle.appendChild(tableBody);
for (let i = 0; i < accordionData.length; i++) {
  const { title, description } = accordionData[i];
  let trEle = document.createElement("tr");
  let accDiv = document.createElement("div");
  let titleDiv = document.createElement("div");
  let descDiv = document.createElement("div");
  let iconDiv = document.createElement("div");
  titleDiv.textContent = title;
  titleDiv.appendChild(iconDiv);
  iconDiv.textContent = ">";
  descDiv.textContent = description;
  descDiv.className = "description";
  titleDiv.className = "title";
  iconDiv.className = "icon";
  accDiv.appendChild(titleDiv);
  accDiv.appendChild(descDiv);
  trEle.appendChild(accDiv);
  trEle.className = "accordion";
  trEle.id = `accordion-${i}`;
  tableBody.appendChild(trEle);
  titleDiv.addEventListener("click", (e) => handleClick(i));
}

hideAll();

function hideAll() {
  for (let i = 0; i < accordionData.length; i++) {
    handleClick(i);
  }
}

function handleClick(i) {
  const accEle = document.getElementById(`accordion-${i}`);
  const presentClasses = accEle.classList.value;
  if (presentClasses.includes("accordion__hide")) {
    accEle.classList.remove("accordion__hide");
  } else {
    accEle.classList.add("accordion__hide");
  }
}
