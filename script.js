// Global variables
let inputValue = "";
const submitBtn = document.querySelector("#submit-button");
const input = document.querySelector("#catTitle");
const containerElement = document.querySelector("#img-container");
const errorMessage = document.querySelector("#warning-message");
const loadingElement = document.querySelector("#loading-container");

//Event listeners
submitBtn.addEventListener("click", handleFormSubmit);
input.addEventListener("input", updateInputValue);
input.addEventListener("focus", clearInputValue);

//Render Loading message
function renderLoadingMessage() {
  const loadingText = document.createElement("p");
  loadingText.textContent = "Your cat image is loading...";
  loadingElement.appendChild(loadingText);
}

//Fetch data from API
//Fetch data when button is clicked on form
async function fetchCatImages() {
  renderLoadingMessage();
  const res = await fetch(
    "https://api.thecatapi.com/v1/images/search?limit=10&api_key=live_Y0Kr1OXBzI1kILcDQ1MLMzcp4xO84IU7gpZ0qIj7Pk5m11F940ek1uPubbMWzDXO"
  );
  const data = await res.json();
  return data;
}

//Handle form submit
//Update value of input value
//If input value is not empty then get Random Cat
function handleFormSubmit(e) {
  e.preventDefault();
  updateInputValue();
  if (inputValue.length > 0) {
    getRandomCatImage();
    submitBtn.textContent = "Generate another cat image";
    errorMessage.textContent = "";
  } else {
    errorMessage.textContent = "Whoops, you need to enter text first!";
  }
}

function updateInputValue() {
  inputValue = input.value.trim().toUpperCase();
}

//clear input value function
function clearInputValue() {
  input.value = "";
  inputValue = "";
}

//get a random image from the api
async function getRandomCatImage() {
  const catImgData = await fetchCatImages();
  const randomCat = catImgData[Math.floor(Math.random() * catImgData.length)];
  renderContent(randomCat.url);
}

//render image and user text onto the page
function renderContent(imgUrl) {
  loadingElement.innerHTML = "";
  containerElement.innerHTML = "";

  const catImgContainer = document.createElement("div");

  const catImgTitle = document.createElement("p");
  catImgTitle.classList.add("img__container__text");
  catImgTitle.textContent = inputValue;
  catImgContainer.appendChild(catImgTitle);

  const catImg = document.createElement("img");
  catImg.classList.add("img__container_img");
  catImg.src = imgUrl;
  catImg.alt = "A picture of a cat";
  catImgContainer.appendChild(catImg);

  containerElement.appendChild(catImgContainer);
}

//use inputs to generate text to go on the image
