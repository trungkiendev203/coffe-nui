// Lấy các phần tử cần dùng
const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");
const revealElements = document.querySelectorAll(".reveal");
const backToTop = document.getElementById("backToTop");

// Đổi trạng thái header khi scroll
window.addEventListener("scroll", function () {
    if (window.scrollY > 80) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

    // Hiện nút back to top
    if (window.scrollY > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

    // Gọi animation khi scroll
    revealOnScroll();

    // Active menu theo section
    activeMenuOnScroll();
});

// Mở / đóng menu mobile
menuToggle.addEventListener("click", function () {
    navbar.classList.toggle("open");

    const icon = menuToggle.querySelector("i");

    if (navbar.classList.contains("open")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }
});

// Đóng menu khi bấm vào link
navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navbar.classList.remove("open");

        const icon = menuToggle.querySelector("i");
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    });
});

// Scroll reveal animation
function revealOnScroll() {
    revealElements.forEach(function (element) {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 120;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add("show");
        }
    });
}

// Active menu theo vị trí section
function activeMenuOnScroll() {
    let currentSection = "";

    sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(function (link) {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }
    });
}

// Nút quay lên đầu trang
backToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Chạy animation lần đầu khi vừa mở trang
revealOnScroll();
activeMenuOnScroll();