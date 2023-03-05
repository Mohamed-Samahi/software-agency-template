// check if there is local storage option
let mainColors = localStorage.getItem("color_option");

// if the local storage is not empty (stores a color), then set that stored color as the main active color
if (mainColors != null) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color_option")
  );

  // removing active class from all list items
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    // add class active on element with data color === local storage item
    if (element.dataset.color === mainColors) {
      element.classList.add("active");
    }
  });
}

// toggle spin class on ion on click
document.querySelector(".settings-box .fa-gear").onclick = function () {
  // toggle class fa-spin on the icon for rotation
  this.classList.toggle("fa-spin");

  // toggle class open on settings box
  document.querySelector(".settings-box").classList.toggle("open");
};

// switch colors
const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach((li) => {
  // adding an event on each list item when clicked
  li.addEventListener("click", (e) => {
    // changing the main color of root element nased on the clicked list item color
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // set color in local storage
    localStorage.setItem("color_option", e.target.dataset.color);

    // removing active class from all list items
    handleActiveClass(e);
  });
});

// switch random background element

// random background option
let backgroundOption = true;

// variable to control the interval
let backgroundInterval;

// check if there is a stored background in the local storage
let backgroundLocalItem = localStorage.getItem("background_option");

// check if random background local storage is not empty
if (backgroundLocalItem !== null) {
  // remove active class from all spans
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });

  if (backgroundLocalItem === "true") {
    backgroundOption = true;

    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    backgroundOption = false;

    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

const randomBackEl = document.querySelectorAll(".random-backgrounds span");

randomBackEl.forEach((span) => {
  // click on every span
  span.addEventListener("click", (e) => {
    // removing active class from all span children
    handleActiveClass(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;

      randomizeImgs();

      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;

      clearInterval(backgroundInterval);

      localStorage.setItem("background_option", false);
    }
  });
});

// function to randomize images
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // generate random number
      let randomNumber = Math.floor(Math.random() * imagesArray.length);

      // change background image URL
      landingPage.style.backgroundImage =
        'url("./Images/additional/' + imagesArray[randomNumber] + '")';
    }, 1000);
  }
}

// select landing page element
let landingPage = document.querySelector(".landing-page");

// create array of images
let imagesArray = [];

for (let i = 1; i < 7; i++) {
  imagesArray.push(`0${i}.jpg`);
}

// select skills selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // skills offset top
  let skillsOffsetTop = ourSkills.offsetTop;

  // skills outer height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // window height
  let windowHeight = window.innerHeight;

  // window scrollTop
  let windowScrollTop = this.pageYOffset;

  if (
    windowScrollTop >
    skillsOffsetTop + skillsOuterHeight - windowHeight - 1
  ) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// create popup with the image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((image) => {
  image.addEventListener("click", (e) => {
    // create overlay element
    let overlay = document.createElement("div");

    // add class to overlay
    overlay.className = "popup-overlay";

    // append overlay to the body
    document.body.appendChild(overlay);

    // create the popup box
    let popupBox = document.createElement("div");

    // add class to the popup box
    popupBox.className = "popup-box";

    if (image.alt !== "") {
      // create heading
      let imgHeading = document.createElement("h3");

      // create text for heading
      let imgText = document.createTextNode(image.alt);

      // append the text to the heading
      imgHeading.appendChild(imgText);

      // append the heading to the popup box
      popupBox.appendChild(imgHeading);
    }

    // create the image
    let popupImage = document.createElement("img");

    // set image source
    popupImage.src = image.src;

    // add image to the popup box
    popupBox.appendChild(popupImage);

    // append the popup box to the body
    document.body.appendChild(popupBox);

    // create the close span
    let closeButton = document.createElement("span");

    // create the close span button text
    let closeButtonText = document.createTextNode("X");

    // append text to close span
    closeButton.appendChild(closeButtonText);

    // add class to close button
    closeButton.className = "close-button";

    // add close button to the popup box
    popupBox.appendChild(closeButton);
  });
});

// close popup
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    e.target.parentElement.remove();

    // remove overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// select all links
const allLinks = document.querySelectorAll(".links a");
scrollToAnywhere(allLinks);

// select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
scrollToAnywhere(allBullets);

function scrollToAnywhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

function handleActiveClass(ev) {
  // remove active class from all children
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  // add active class on self
  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets-option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";

    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";

    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";

      localStorage.setItem("bullets-option", "block");
    } else {
      bulletsContainer.style.display = "none";

      localStorage.setItem("bullets-option", "none");
    }

    handleActiveClass(e);
  });
});

// reset button
document.querySelector(".reset-options").onclick = function () {
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("bullets_option");

  // reload window
  window.location.reload();
};

// toggle menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  // stop propagation
  e.stopPropagation();

  // toggle class "menu-active" on button
  this.classList.toggle("menu-active");

  // toggle class "open" on links
  tLinks.classList.toggle("open");
};

tLinks.onclick = function (e) {
  e.stopPropagation();
};

document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    // check if menu is open
    if (tLinks.classList.contains("open")) {
      // toggle class "menu-active" on button
      toggleBtn.classList.toggle("menu-active");

      // toggle class open on links
      tLinks.classList.toggle("open");
    }
  }
});
