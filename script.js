/* =========================================
   1. MOBILE MENU (GAMBURGER)
   ========================================= */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/* =========================================
   2. MODAL / LIGHTBOX (RASMLAR GALEREYASI)
   ========================================= */
const modal = document.getElementById("portfolioModal");
const modalImg = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const closeBtn = document.querySelector(".close-btn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// O'zgaruvchilar
let currentImageIndex = 0;
let currentImages = [];

// "View Details" tugmalarini olamiz
const viewBtns = document.querySelectorAll(".view-modal-btn");

viewBtns.forEach(btn => {
    btn.addEventListener("click", function() {
        // Ma'lumotlarni o'qish
        const imagesString = this.getAttribute("data-images");
        const title = this.getAttribute("data-title");
        const desc = this.getAttribute("data-desc");

        // Rasmlar ro'yxatini array qilish
        if (imagesString) {
            currentImages = imagesString.split(',').map(img => img.trim());
        } else {
            currentImages = [];
        }
        
        // Modalni to'ldirish
        currentImageIndex = 0; 
        updateModalImage(); 
        modalTitle.innerText = title;
        modalDesc.innerText = desc;

        // Strelkalarni ko'rsatish/yashirish
        if (currentImages.length > 1) {
            prevBtn.style.display = "block";
            nextBtn.style.display = "block";
        } else {
            prevBtn.style.display = "none";
            nextBtn.style.display = "none";
        }

        // Modalni ochish
        modal.style.display = "flex";
    });
});

// Rasmni yangilash
function updateModalImage() {
    if (currentImages.length > 0) {
        modalImg.src = currentImages[currentImageIndex];
    }
}

// Keyingi rasm
nextBtn.onclick = function() {
    currentImageIndex++;
    if (currentImageIndex >= currentImages.length) {
        currentImageIndex = 0; 
    }
    updateModalImage();
};

// Oldingi rasm
prevBtn.onclick = function() {
    currentImageIndex--;
    if (currentImageIndex < 0) {
        currentImageIndex = currentImages.length - 1; 
    }
    updateModalImage();
};

// Modalni yopish (X tugmasi)
closeBtn.onclick = function() {
    modal.style.display = "none";
};

// Modalni yopish (Chetiga bosganda)
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

/* =========================================
   3. SMART DARK / LIGHT MODE (YANGILANGAN)
   ========================================= */
// Sayt yuklanganda xotirani tekshiramiz
const savedTheme = localStorage.getItem('theme');
const darkModeIcon = document.querySelector('#darkmode-icon');

// Agar xotirada 'light' bo'lsa, darrov yoqamiz
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    if (darkModeIcon) {
        darkModeIcon.classList.replace('bx-moon', 'bx-sun');
    }
}

// Ikonka bosilganda
if (darkModeIcon) {
    darkModeIcon.onclick = () => {
        document.body.classList.toggle('light-mode');
        
        const isLight = document.body.classList.contains('light-mode');

        if (isLight) {
            // Oq rejim -> Quyosh -> Xotiraga 'light'
            darkModeIcon.classList.replace('bx-moon', 'bx-sun');
            localStorage.setItem('theme', 'light');
        } else {
            // Tungi rejim -> Oy -> Xotiraga 'dark'
            darkModeIcon.classList.replace('bx-sun', 'bx-moon');
            localStorage.setItem('theme', 'dark');
        }
    };
}