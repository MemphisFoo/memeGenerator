// VARIABLES
let memeNavLeft = document.getElementById("meme-nav-left");
let memeNavRight = document.getElementById("meme-nav-right");
let memeDispImg = document.getElementById("meme-display-image");
let likeBtn = document.getElementById("like");
let nextBtn = document.getElementById("next");
let previousBtn = document.getElementById("previous");
let memeDisplay = document.getElementById("meme-display");
let currentIndex = 0;
let memeObjArr = [];
let favoritedObjArr = [];

//TOGGLER
const chk = document.getElementById("chk");
chk.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});

//INITIAL RENDER
function renderMemes(meme) {
  let memeImg = document.createElement("img");
  memeImg.src = meme.url;
  memeImg.addEventListener("click", () => {
    clearRedBorder();
    showMeme(meme);
  });
  memeNavLeft.append(memeImg);
}

//CENTER DISPLAY
function showMeme(meme) {
  currentIndex = memeObjArr.findIndex((memeObj) => meme.id === memeObj.id);
  let imageItems = memeNavLeft.querySelectorAll("img");
  let currentImage = imageItems[currentIndex];
  currentImage.classList.add("meme-red-border");
  memeDisplay.dataset.id = meme.id;
  memeDispImg.src = meme.url;
}

//ADD TO FAVORITES
function renderFavorite() {
  let id = parseInt(memeDisplay.dataset.id);
  let foundFavorited = favoritedObjArr.find((memeObj) => memeObj.id === id);
  if (foundFavorited) {
    return;
  }
  let meme = memeObjArr.find((memeObj) => memeObj.id === id);
  favoritedObjArr.push(meme);
  let favoriteImg = document.createElement("img");
  favoriteImg.src = meme.url;
  memeNavRight.append(favoriteImg);
}

//RED BORDER
function clearRedBorder() {
  let imageItems = memeNavLeft.querySelectorAll("img");
  let currentImage = imageItems[currentIndex];
  currentImage.classList.remove("meme-red-border");
}

//PREVIOUS
function previousMeme() {
  clearRedBorder();
  currentIndex -= 1;
  if (currentIndex < 0) {
    currentIndex = memeObjArr.length - 1;
  }
  let id = memeObjArr[currentIndex].id;
  fetchSingleMeme(id);
}

//NEXT
function nextMeme() {
  clearRedBorder();
  currentIndex += 1;
  if (currentIndex >= memeObjArr.length) {
    currentIndex = 0;
  }
  let id = memeObjArr[currentIndex].id;
  fetchSingleMeme(id);
}

//INIT FETCH (ARR)
function app() {
  fetch("http://localhost:3000/memes/")
    .then((res) => res.json())
    .then((memesArr) => {
      memesArr.forEach((meme) => {
        memeObjArr.push(meme);
        renderMemes(meme);
      });
      showMeme(memesArr[0]);
    });
  likeBtn.addEventListener("click", renderFavorite);
  nextBtn.addEventListener("click", nextMeme);
  previousBtn.addEventListener("click", previousMeme);

  //KEYDOWN
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      nextMeme();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      previousMeme();
    }
  });
}

app();

//SINGLE FETCH (MEME)
function fetchSingleMeme(id) {
  fetch(`http://localhost:3000/memes/${id}`)
    .then((res) => res.json())
    .then((meme) => showMeme(meme));
}
