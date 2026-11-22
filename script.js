document.addEventListener("DOMContentLoaded", function () {
    // 1. Mobile Hamburger Menu Toggle with absolute reliability
    const menuBtn = document.getElementById("mobile-menu-btn");
    const navLinks = document.getElementById("nav-links");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", function (event) {
            event.stopPropagation();
            navLinks.classList.toggle("active");
            console.log("Hamburger clicked! Active state:", navLinks.classList.contains("active"));
        });
    }

    // 2. Mobile Tap Dropdown Toggle
    const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            const dropdownContent = this.nextElementSibling;
            if (dropdownContent) {
                dropdownContent.classList.toggle("show");
            }
        });
    });

    // Close menu when clicking anywhere else on the page
    document.addEventListener("click", function () {
        document.querySelectorAll(".dropdown-content").forEach(menu => {
            menu.classList.remove("show");
        });
        if (navLinks) {
            navLinks.classList.remove("active");
        }
    });

    // Initialize Slider & Text Contrast
    showSlides(slideIndex);
    adjustHeadingTextColor();
});

// Hero Slider Logic
let slideIndex = 1;
let slideTimer;

function showSlides(n) {
    const slides = document.querySelectorAll(".slides");
    const dots = document.querySelectorAll(".dot");

    if (slides.length === 0) return;

    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    slides.forEach(slide => slide.style.display = "none");
    dots.forEach(dot => dot.classList.remove("active"));

    slides[slideIndex - 1].style.display = "block";
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add("active");
    }

    clearTimeout(slideTimer);
    slideTimer = setTimeout(() => {
        slideIndex++;
        showSlides(slideIndex);
    }, 6000);
}

function changeSlide(n) {
    slideIndex += n;
    showSlides(slideIndex);
}

function currentSlide(n) {
    slideIndex = n;
    showSlides(slideIndex);
}

// Scoped Tab Logic (keeps About tabs and Services tabs independent)
function openTab(evt, tabName) {
    const parentBox = evt.currentTarget.closest(".big-box");
    const tabPanes = parentBox.querySelectorAll(".tab-pane");
    const tabButtons = parentBox.querySelectorAll(".tab-button");

    tabPanes.forEach(pane => pane.classList.remove("active"));
    tabButtons.forEach(btn => btn.classList.remove("active"));

    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Dynamic Slide Heading Contrast
function adjustHeadingTextColor() {
    const slides = document.querySelectorAll(".slides");

    slides.forEach(slide => {
        const image = slide.querySelector("img");
        const heading = slide.querySelector("h1");
        if (!image || !heading) return;

        const tempImg = new Image();
        tempImg.src = image.src;

        tempImg.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = tempImg.width;
            canvas.height = tempImg.height;
            ctx.drawImage(tempImg, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
            let r = 0, g = 0, b = 0, count = 0;

            for (let i = 0; i < imageData.length; i += 4) {
                r += imageData[i];
                g += imageData[i + 1];
                b += imageData[i + 2];
                count++;
            }

            const luminance = (0.299 * (r / count) + 0.587 * (g / count) + 0.114 * (b / count)) / 255;
            heading.style.color = luminance > 0.5 ? "black" : "white";
        };
    });
}
