console.log("Hello, Worldss!");

// Get the width and height of the viewport
const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

// Display the values
console.log(`Viewport width: ${viewportWidth}px`);
console.log(`Viewport height: ${viewportHeight}px`);

// Login Form
const loginwrapper = document.querySelector('.loginwrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelectorAll('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

registerLink.addEventListener('click', () => {
    loginwrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    loginwrapper.classList.remove('active');
});

btnPopup.forEach(button => {
    button.addEventListener('click', () => {
        loginwrapper.classList.add('active-popup');
    });
});

iconClose.addEventListener('click', () => {
    loginwrapper.classList.remove('active-popup');
});

// Navigation follow scroll
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
    
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

window.onscroll = () =>{

    menu.classList.remove('fa-times');
    navbar.classList.remove('active');

// Scroll top code
if(window.scrollY > 60){
  document.querySelector('#scroll-top').classList.add('active');
}else{ 
  document.querySelector('#scroll-top').classList.remove('active');
}
}

// Loader Code
function loader() {
    document.querySelector('.load-container').classList.add('fade-out');
}

function fadeOut() {
    setInterval(loader, 3000);
}

window.onload = fadeOut;

// Initialize Swiper Section
// Slide Cards according to Cursor
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

carouselChildrens.slice(0, cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

let isDragging = false,
    startX,
    startScrollLeft,
    timeoutId;

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        console.log(btn.id);

        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");

    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    console.log(e.pageX);

    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const autoPlay = () => {
    if (window.innerWidth < 800) return;

    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

const infiniteScroll = () => {
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);


