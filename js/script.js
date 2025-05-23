const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
hamburger.addEventListener("click", mobileMenu);


window.onload = function () {
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "light") setMoonIcon()
  else setlightIcon()

  fetch("data/changelog.txt")
    .then((response) => response.text())
    .then((data) => {
      const changelogContainer = document.querySelector(".changelog-content ul");
      const versions = data.trim().split("\n");

      versions.forEach((version) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${version.split(" - ")[0]}</strong> - ${version.split(" - ")[1]}`;
        changelogContainer.appendChild(li);
      });
    })
    .catch((error) => console.error("Error loading changelog:", error));


   loadEmojiJson()

};

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

// Close navbar when link is clicked
const navLink = document.querySelectorAll(".nav-link");
navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

// Event Listeners: Handling toggle event
const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
}


function setlightIcon() {
  document.querySelector(".sun").style.opacity = "1";
  document.querySelector(".moon").style.opacity = "0";
}

function setMoonIcon() {
  document.querySelector(".sun").style.opacity = "0";
  document.querySelector(".moon").style.opacity = "1";
}

toggleSwitch.addEventListener("change", switchTheme, false);

//  Store color theme for future visits

function switchTheme(e) {
  if (e.target.checked) {
    setlightIcon()
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark"); //add this 
  } else {
    setMoonIcon()
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light"); //add this 
  }
}

// Save user preference on load

const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

//Adding date

let myDate = document.querySelector("#datee");

const yes = new Date().getFullYear();
myDate.innerHTML = yes; 