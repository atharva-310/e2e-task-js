/**
 * Code Overview
 *
 * ------ Input Field Creators -----
 * * addTypography(form,tagname) :
 *      Function can be used to add typography such as h2, h3, p
 *
 * * addInputWithType(form,inputType) :
 *      function to add input fields with the types like text, email, password
 *
 * * addTextArea(form) :
 *      function to add textarea fields with text type
 *
 *
 * ------ Preview Forms ------
 * * previewFormAppend(element) :
 *      Append Elements to the preview form
 *
 * * deletePreviewField(event) :
 *      Remove field from the preview Form
 *
 *
 * ------- Features -------
 *
 * * showRawHtml() :
 *      Adds Raw HTML Section to the webpage
 *
 * ------ Utility Functions -----
 * * extractFormHtml() :
 *      Extract raw html from the preview form without other editing fields
 *
 * * generateString(length):
 *      program to generate random strings
 *
 * * removeSpace(text) :
 *      Will remove the spaces from a string
 */

// FieldOptions
const FieldOptions = [
  {
    id: 1,
    name: "Main Heading",
    callback: (form) => addTypography(form, "h2"),
  },
  {
    id: 2,
    name: "Sub Heading",
    callback: (form) => addTypography(form, "h3"),
  },
  {
    id: 3,
    name: "Paragraph",
    callback: (form) => addTypography(form, "p"),
  },
  {
    id: 4,
    name: "Input - Text",
    callback: (form) => addInputWithType(form, "text"),
  },
  {
    id: 4,
    name: "Input - Email",
    callback: (form) => addInputWithType(form, "email"),
  },
  {
    id: 5,
    name: "Input - Password",
    callback: (form) => addInputWithType(form, "password"),
  },
  {
    id: 6,
    name: "Input - Number",
    callback: (form) => addInputWithType(form, "number"),
  },
  {
    id: 7,
    name: "Input - Date",
    callback: (form) => addInputWithType(form, "date"),
  },
  {
    id: 8,
    name: "Textarea - Text",
    callback: (form) => addTextArea(form, "text"),
  },
  {
    id: 9,
    name: "Select",
    callback: (form) => showOptions(),
  },
];

// Populating the Options to the Select
const fieldTypeInput = document.getElementById("type");

FieldOptions.forEach((item) => {
  const optionElement = document.createElement("option");
  optionElement.innerHTML = item.name;
  optionElement.value = item.id;
  fieldTypeInput.appendChild(optionElement);
});

// Form EventLister to add field to the form

const creatorForm = document.getElementById("fcreator");

creatorForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const id = Number(event.target.type.value);
  const selectedOption = FieldOptions.find((item) => item.id === id);
  // Calling the function associated with that Field for creation

  selectedOption.callback(event.target);
  return;
});

// Function can be used to add typography such as h2, h3, p
function addTypography(form, tagname) {
  const newELement = document.createElement(tagname);
  newELement.innerHTML = form.label.value;
  previewFormAppend(newELement);
}

// function to add input fields with the types like text, email, password
function addInputWithType(form, inputType) {
  const inputElement = document.createElement("input");
  const labelElement = document.createElement("label");

  const labelValue = form.label.value;
  const name = removeSpace(labelValue);

  inputElement.type = inputType;
  inputElement.id = generateString(5);
  inputElement.name = name;
  console.log(labelValue, name);
  if (form.isRequired.checked) {
    inputElement.setAttribute("required", true);
  }
  console.log(inputElement);
  labelElement.innerHTML = labelValue;
  labelElement.htmlFor = name;
  console.log(labelElement);

  const container = document.createElement("div");
  container.appendChild(labelElement);
  container.appendChild(inputElement);

  previewFormAppend(container);
}

// Function to add Textarea to form

function addTextArea(form, inputType) {
  const textareaElement = document.createElement("textarea");
  const labelElement = document.createElement("label");

  const labelValue = form.label.value;
  const name = removeSpace(labelValue);

  textareaElement.type = inputType;
  textareaElement.id = generateString(5);
  textareaElement.name = name;

  if (form.isRequired.checked) {
    textareaElement.setAttribute("required", "");
  }

  labelElement.innerHTML = labelValue;
  labelElement.htmlFor = name;

  const container = document.createElement("div");
  container.appendChild(labelElement);
  container.appendChild(textareaElement);

  previewFormAppend(container);
}

// function to add select tag

function addSelect(e) {
  e.preventDefault();

  const form = document.getElementById("fcreator");

  const selectElement = document.createElement("select");
  const labelElement = document.createElement("label");

  const labelValue = form.label.value;
  const name = removeSpace(labelValue);

  selectElement.id = generateString(5);
  selectElement.name = name;

  if (form.isRequired.checked) {
    selectElement.setAttribute("required", "");
  }

  labelElement.innerHTML = labelValue;
  labelElement.htmlFor = name;

  const optionsList = getOptionsArray();

  optionsList.forEach((item) => {
    const optionElement = document.createElement("option");
    optionElement.innerHTML = item;
    optionElement.value = removeSpace(item);
    selectElement.appendChild(optionElement);
  });
  console.log(labelElement);
  console.log(selectElement);

  const container = document.createElement("div");
  container.appendChild(labelElement);
  container.appendChild(selectElement);

  previewFormAppend(container);
}

// Adding event listner to options form
const optionAddBtn = document.getElementById("optionadd");
optionAddBtn.addEventListener("click", addOptions);

const options = [];

function addOptions(event) {
  event.preventDefault();
  const inputField = document.getElementById("optionname");
  const title = document.createElement("h3");
  title.innerText = inputField.value;
  appendOption(title);
}

// Preview Forms

const previewForm = document.getElementById("fpreview");

// Append New Fields to the Form

function previewFormAppend(element) {
  const container = document.createElement("div");
  const previewHr = document.createElement("hr");
  previewHr.className = "preview-hr";

  const fieldGroup = document.createElement("div");
  fieldGroup.className = "pfieldgroup";
  fieldGroup.appendChild(element);

  const deleteBtn = document.createElement("img");
  deleteBtn.src = "./assets/icon/delete.png";
  deleteBtn.alt = "delete";
  deleteBtn.className = "btn-delete";
  deleteBtn.addEventListener("click", deletePreviewField);

  container.className = "pfield";
  container.appendChild(fieldGroup);
  container.appendChild(deleteBtn);

  previewForm.appendChild(container);
  previewForm.appendChild(previewHr);
}

const optiondisplay = document.getElementById("optiondisplay");
function appendOption(element) {
  const container = document.createElement("div");
  const previewHr = document.createElement("hr");
  previewHr.className = "preview-hr";

  const fieldGroup = document.createElement("div");
  fieldGroup.className = "pfieldgroup";
  fieldGroup.appendChild(element);

  const deleteBtn = document.createElement("img");
  deleteBtn.src = "./assets/icon/delete.png";
  deleteBtn.alt = "delete";
  deleteBtn.className = "btn-delete";
  deleteBtn.addEventListener("click", deleteOption);

  container.className = "pfield";
  container.id = "optiondisplayctn";
  container.appendChild(fieldGroup);
  container.appendChild(deleteBtn);

  optiondisplay.appendChild(container);
  optiondisplay.appendChild(previewHr);
}
// Remove field from the preview Form
function deletePreviewField(event) {
  const deleteBtn = event.target;
  const parentToDelete = deleteBtn.parentElement;
  const previewHrToDelete = parentToDelete.nextSibling;
  parentToDelete.remove();
  previewHrToDelete.remove();
}
function deleteOption(event) {
  const deleteBtn = event.target;
  const parentToDelete = deleteBtn.parentElement;
  const previewHrToDelete = parentToDelete.nextSibling;
  parentToDelete.remove();
  previewHrToDelete.remove();
}

// Features
const showButton = document.getElementById("show");
showButton.addEventListener("click", () => {
  if (showButton.classList.contains("bg-blue")) {
    showRawHtml();
  } else {
    removeRawHtml();
  }
});

function removeRawHtml() {
  const rawHtmlElement = document.getElementById("rawhtml");
  rawHtmlElement.remove();
  showButton.value = "Show & Copy Raw Html";
  showButton.classList.add("bg-blue");
  showButton.classList.remove("bg-purple");
}

// Adds Raw HTML Section to the webpage

function showRawHtml() {
  const rootElement = document.getElementById("root");
  const container = document.createElement("div");
  container.className = "ctn";
  container.id = "rawhtml";

  const rawHtmlElement = document.createElement("textarea");
  rawHtmlElement.disabled;
  rawHtmlElement.innerText = extractFormHtml();
  rawHtmlElement.id = "rawhtmlsource";

  const copyBtn = document.createElement("button");
  copyBtn.classList.add("btn-copy");
  copyBtn.classList.add("bg-yellow");
  copyBtn.textContent = "Copy Raw HTML";
  copyBtn.addEventListener("click", copyRawHtml);

  const heading = document.createElement("h2");
  heading.innerText = "Raw HTML code for Form";

  container.appendChild(heading);
  container.appendChild(rawHtmlElement);
  container.appendChild(copyBtn);

  rootElement.appendChild(container);

  showButton.value = "Hide Raw HTML";
  showButton.classList.remove("bg-blue");
  showButton.classList.add("bg-purple");
}

function copyRawHtml() {
  const rawHtmlElement = document.getElementById("rawhtmlsource");
  navigator.clipboard.writeText(rawHtmlElement.value).then(
    () => {
      console.log("Content copied to clipboard");
      window.alert("Raw HTML Copied");
    },
    () => {
      console.error("Failed to copy");
      window.alert("Failed to copy");
    }
  );
}

// Utility Functions

// program to generate random strings

function generateString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  result = result.trim();
  return result;
}

// Will remove the spaces from a string

function removeSpace(text) {
  return text.split(" ").join("");
}

function extractFormHtml() {
  const list = document.getElementsByClassName("pfieldgroup");
  let data = "";

  for (let i = 0; i < list.length; i++) {
    data += list[i].innerHTML;
  }
  if (data.trim() === "") {
    data = "Add Fields To the form to see the Raw HTML";
  }
  return data;
}

function showOptions() {
  const form = document.getElementById("formoptions");
  form.classList.remove("hide");
  const submitOptionsBtn = document.getElementById("submitoptions");

  submitOptionsBtn.addEventListener("click", addSelect);
}
function hideOptions() {
  const form = document.getElementById("formoptions");
  form.classList.add("hide");
}

const clearBtn = document.getElementById("clearoption");
clearBtn.addEventListener("click", () => {
  const optiondisplay = document.getElementById("optiondisplay");
  optiondisplay.innerHTML = "";
  hideOptions();
});

function getOptionsArray() {
  const options = document.querySelectorAll("#optiondisplay .pfieldgroup h3");
  const optionsName = [];
  for (let i = 0; i < options.length; i++) {
    optionsName.push(options[i].innerHTML);
  }
  return optionsName;
}
