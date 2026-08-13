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

/* =========================================
   PAGE TRANSITIONS
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // Page entrance
    document.body.classList.add("page-enter");

    // Handle internal page links
    document.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", function (e) {

            const href = this.getAttribute("href");

            // Ignore empty links, anchors and external links
            if (
                !href ||
                href.startsWith("#") ||
                href.startsWith("http") ||
                href.startsWith("mailto:")
            ) {
                return;
            }

            e.preventDefault();

            document.body.classList.remove("page-enter");
            document.body.classList.add("page-leaving");

            setTimeout(() => {
                window.location.href = href;
            }, 350);

        });

    });

});

/* =========================================
   TEAM CAROUSEL - INFINITE LOOP
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const slider = document.querySelector(".teams-grid");

    if (!slider) return;

    const cards = Array.from(slider.querySelectorAll(".team-card"));

    if (cards.length < 2) return;


    /* Clone first and last cards */

    const firstClone = cards[0].cloneNode(true);
    const lastClone = cards[cards.length - 1].cloneNode(true);

    firstClone.classList.add("carousel-clone");
    lastClone.classList.add("carousel-clone");

    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, slider.firstChild);


    /* Start on the REAL first card */

    requestAnimationFrame(function () {

        slider.scrollLeft =
            slider.children[1].offsetLeft -
            slider.offsetLeft;

    });


    /* Infinite scrolling */

    slider.addEventListener("scroll", function () {

        const firstRealCard = slider.children[1];
        const lastRealCard = slider.children[cards.length];

        const tolerance = 10;


        /* Reached cloned last card */

        if (
            slider.scrollLeft >=
            lastRealCard.offsetLeft - slider.offsetLeft - tolerance
        ) {

            slider.scrollLeft =
                firstRealCard.offsetLeft -
                slider.offsetLeft;

        }


        /* Reached cloned first card */

        if (
            slider.scrollLeft <= 0
        ) {

            slider.scrollLeft =
                lastRealCard.offsetLeft -
                slider.offsetLeft;

        }

    });

});