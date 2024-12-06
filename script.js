document.addEventListener("DOMContentLoaded", function() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(event) {
            event.stopPropagation();  // Prevent clicks from bubbling up
            const dropdownContent = this.querySelector('.dropdown-content');
            dropdownContent.style.display =
                dropdownContent.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Close dropdowns if clicked outside
    document.addEventListener('click', function() {
        dropdowns.forEach(dropdown => {
            const dropdownContent = dropdown.querySelector('.dropdown-content');
            dropdownContent.style.display = 'none'; // Hide all dropdowns
        });
    });
});

let slideIndex = 0;
showSlides();

function showSlides() {
    const slides = document.querySelectorAll(".slides");
    const dots = document.querySelectorAll(".dot");

    slides.forEach(slide => slide.style.display = "none");
    slideIndex = (slideIndex + 1) % slides.length;

    dots.forEach(dot => dot.classList.remove("active"));
    slides[slideIndex].style.display = "block";
    dots[slideIndex].classList.add("active");

    setTimeout(showSlides, 10000); // Auto change every 5 seconds
}

function changeSlide(n) {
    slideIndex += n;
    showSlides();
}

function currentSlide(n) {
    slideIndex = n - 1;
    showSlides();
}
function openTab(tabName) {
    var i;
    var x = document.getElementsByClassName("tab-pane");
    var tabButtons = document.getElementsByClassName("tab-button");

    for (i = 0; i < x.length; i++) {
        x[i].classList.remove("active");
    }

    for (i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }

    document.getElementById(tabName).classList.add("active");
    event.currentTarget.classList.add("active");
}



function adjustHeadingTextColor() {
    const slides = document.querySelectorAll('.slides');
    console.log('Adjusting text colors for slides:', slides.length);

    slides.forEach((slide, index) => {
        const image = slide.querySelector('img');
        const heading = slide.querySelector('h1');

        if (!image || !heading) {
            console.warn(`Slide ${index + 1} is missing an image or heading.`);
            return;
        }

        console.log(`Processing slide ${index + 1}:`, image.src);

        const tempImg = new Image();
        tempImg.src = image.src;

        tempImg.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
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

            r = Math.floor(r / count);
            g = Math.floor(g / count);
            b = Math.floor(b / count);

            console.log(`Slide ${index + 1} - Average color: R:${r}, G:${g}, B:${b}`);

            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            console.log(`Slide ${index + 1} - Luminance: ${luminance}`);

            const textColor = luminance > 0.5 ? 'black' : 'white';
            heading.style.color = textColor;
            console.log(`Slide ${index + 1} - Text color set to: ${textColor}`);
        };

        tempImg.onerror = () => {
            console.error(`Failed to load image for slide ${index + 1}: ${image.src}`);
        };
    });
}

document.addEventListener("DOMContentLoaded", () => {
    adjustHeadingTextColor();
});
