const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let currentSlide = 0;


/* =========================================
   SHOW SLIDE
   ========================================= */

function showSlide(index) {

    slides.forEach((slide) => {
        slide.classList.remove("active");
    });

    dots.forEach((dot) => {
        dot.classList.remove("active");
    });


    slides[index].classList.add("active");

    dots[index].classList.add("active");

    currentSlide = index;
}


/* =========================================
   NEXT SLIDE
   ========================================= */

function nextSlide() {

    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide);
}


/* =========================================
   AUTOMATIC SLIDESHOW
   ========================================= */

setInterval(
    nextSlide,
    5000
);


/* =========================================
   CLICK DOTS
   ========================================= */

dots.forEach((dot, index) => {

    dot.addEventListener(
        "click",
        () => {
            showSlide(index);
        }
    );

});