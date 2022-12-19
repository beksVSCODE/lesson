let menuBtn = document.querySelector(".menu-btn");
let menu = document.querySelector(".menu");

menuBtn.addEventListener("click", function() {
    menuBtn.classList.toggle("active");
    menu.classList.toggle("active");
});

let introBackground = document.getElementById("intro");
let introArr = [
    "./images/work/держинка.jpg_large",
    "./images/work/парк.jpg",
    "./images/work/держника.jpg",
    "./images/work/парк2.jpeg"
];

let index = 0;

let backgroundSlider = () => {
    if(index == introArr.length - 1) {
        index = 0;
        introBackground.style.backgroundImage = `url("${introArr[index]}")`;
    } else {
        index++;
        introBackground.style.backgroundImage = `url("${introArr[index]}")`;
    }
}
setInterval(backgroundSlider, 5000);

// Counter Number

let counterItem = document.querySelectorAll(".stat__count");
let time = 2000;
let step = 1;

window.addEventListener("scroll", function() {
    for(let i = 0; i < counterItem.length; i++) {
        let scrollPos = counterItem[i].getBoundingClientRect().top;
        let win = window.innerHeight - 30;
        console.log(scrollPos < win)
        if(scrollPos < win && counterItem[i].dataset.stop === "0") {
            counterItem[i].dataset.stop = 1;
            let activeNumber = 0;
            let outNum = Math.round(time / (counterItem[i].dataset.to / step));
            let numberInterval = setInterval(()=> {
                activeNumber += step;
                counterItem[i].innerText = activeNumber;
                if(activeNumber > counterItem[i].dataset.to) {
                    counterItem[i].innerText = counterItem[i].dataset.to;
                    clearInterval(numberInterval);
                }
            }, outNum);
        }
    }
});

// Accardion

const accardionItems = document.querySelectorAll(".accardion__item");
let firstSectionBodyHeight = document.querySelector(".accardion__item .accardion__content > *").clientHeight;
document.querySelector(".accardion__item .accardion__content").style.maxHeight = firstSectionBodyHeight + "px";

let accardionRemoveActive = () => {
    accardionItems.forEach((item) => {
        item.classList.remove("opened");
    });
}

let accardionActive = () => {
    accardionItems.forEach((item) => {
        item.addEventListener("click", function() {
            accardionRemoveActive();
            item.classList.add("opened");
        });
    });
}

let accardionHeaderClickHandler = (event) => {
    accardionItems.forEach((section) => {
        section.querySelector(".accardion__content").style.maxHeight = "0px";
    });
    let accardionSection = event.target.closest(".accardion__item");
    let inslideElHeight = accardionSection.querySelector(".accardion__content > *").clientHeight;
    accardionActive();
    accardionSection.querySelector(".accardion__content").style.maxHeight = inslideElHeight + "px";
}

accardionItems.forEach((section) => {
    section.addEventListener("click", accardionHeaderClickHandler);
});

/* Slider */

const rewiewsContainer = document.querySelector(".rewiews");
const slideContainers = document.querySelectorAll(".rewiews__item");
const rightBtn = document.querySelector("#rewiews__bth--next");
const leftBtn = document.querySelector("#rewiews__bth--prev");
const dots = document.querySelectorAll(".dot");
const lengthSlides = slideContainers.length;

let currentIndex = 0;
let widthContainer = rewiewsContainer.clientWidth;

let activeDot = (index) => {
    for(let dot of dots) {
        dot.classList.remove("active");
    }
    dots[index].classList.add("active");
}

let onRightButton = () => {
    if(currentIndex < lengthSlides - 1) {
        currentIndex++;
        activeDot(currentIndex);
        for(let index = 0; index < lengthSlides; index++) {
            let element = slideContainers[index];
            let newLeftPos = -widthContainer * (currentIndex - index);
            element.style.left = newLeftPos + "px";
        }
    }
}

let onLeftButton = () => {
    if(currentIndex > 0) {
        currentIndex--;
        activeDot(currentIndex);
        for(let index = 0; index < lengthSlides; index++) {
            let element = slideContainers[index];
            let newLeftPos = widthContainer * (index - currentIndex);
            element.style.left = newLeftPos + "px";
        }
    }
}

let activeButton = () => {
    if(currentIndex == lengthSlides - 1) {
        rightBtn.style.opacity = .3;
    } else if (currentIndex == 0) {
        leftBtn.style.opacity = .3;
    } else {
        leftBtn.style.opacity = 1;
        rightBtn.style.opacity = 1;
    }
}
setInterval(activeButton, 100);

let setupstartPos = () => {
    for(let index = 0; index < lengthSlides; index++) {
        let element = slideContainers[index];
        let newLeftPos = widthContainer * index;
        element.style.left = newLeftPos + "px";
    }
}
setupstartPos();

rightBtn.addEventListener("click", onRightButton);
leftBtn.addEventListener("click", onLeftButton);

// Gallery

const galleryModal = document.getElementById("gallery__modal");
const galleryItem = document.querySelectorAll(".gallery__item");
const galleryPhoto = document.querySelectorAll(".galleri__photo");
const modalImg = document.getElementById("img__modal");
const galleryClose = document.querySelector(".gallery__close");

galleryItem.forEach((item) => {
    item.addEventListener("click", function() {
        galleryModal.classList.add("active");
        let currentPhoto = item.querySelector(".galleri__photo");
        modalImg.src = currentPhoto.src;
    });
});

galleryClose.addEventListener("click", function() {
    galleryModal.classList.remove("active");
});