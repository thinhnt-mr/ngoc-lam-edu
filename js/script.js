// ===== Scroll đến phần nội dung khi click menu =====
document.addEventListener("DOMContentLoaded", function () {
    const menuLinks = document.querySelectorAll("nav ul li a[href^='#']");

    menuLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
});

// ===== Toggle menu mobile =====
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const menuItems = document.getElementById("menu-items");

    menuToggle.addEventListener("click", function () {
        menuItems.classList.toggle("show");
    });

    document.addEventListener("click", function (event) {
        if (!menuToggle.contains(event.target) && !menuItems.contains(event.target)) {
            menuItems.classList.remove("show");
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let menuToggle = document.getElementById("menu-toggle");
    let menuItems = document.getElementById("menu-items");

    menuToggle.addEventListener("click", function (event) {
        event.stopPropagation();
        menuItems.style.display = (menuItems.style.display === "block") ? "none" : "block";
    });

    document.addEventListener("click", function (event) {
        if (!menuItems.contains(event.target) && event.target !== menuToggle) {
            menuItems.style.display = "none";
        }
    });
});

// ===== Form popup hiển thị tự động =====
document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.getElementById("overlay");
    const closeForm = document.getElementById("closeForm");
    const popupForm = document.getElementById("popupForm");

    setTimeout(() => {
        overlay.classList.add("active");
    }, 500);

    closeForm.addEventListener("click", function () {
        overlay.classList.remove("active");
    });

    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) {
            overlay.classList.remove("active");
        }
    });
});

// ===== Khi click vào icon "Đăng ký" thì mở popup =====
document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.getElementById("overlay");
    const registerIcon = document.getElementById("register-icon");

    registerIcon.addEventListener("click", function (event) {
        event.preventDefault();
        overlay.classList.add("active");
    });
});

// ===== Xử lý form Google =====
document.getElementById("googleForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let formData = new FormData(this);

    fetch(this.action, {
        method: "POST",
        body: formData,
        mode: "no-cors"
    })
        .then(() => {
            alert("✅ Gửi thành công! Giáo viên sẽ liên hệ với bạn sớm nhất.");
            this.reset();
        })
        .catch((error) => {
            alert("Đã xảy ra lỗi, vui lòng thử lại!");
            console.error("Lỗi:", error);
        });
});

// ===== Xử lý form đăng ký người dùng =====
document.getElementById("userForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let gender = document.getElementById("gender").value.trim();
    let birthYear = document.getElementById("birthYear").value;
    let phone = document.getElementById("phone").value.trim();
    let address = document.getElementById("address").value.trim();
    let parentName = document.getElementById("parentName").value.trim();
    let currentClass = document.getElementById("currentClass").value.trim();
    let course = document.getElementById("course").value.trim();
    let content = document.getElementById("content").value.trim();

    let phonePattern = /^[0-9]{9,11}$/;
    if (!phonePattern.test(phone)) {
        alert("❌ Số điện thoại không hợp lệ! Vui lòng nhập từ 9-11 số.");
        return;
    }

    let formData = new FormData(this);

    fetch(this.action, {
        method: "POST",
        body: formData,
        mode: "no-cors"
    }).then(() => {
        alert("✅ Gửi thành công! Giáo viên sẽ liên hệ với bạn sớm nhất.");
        document.getElementById("userForm").reset();
    }).catch(error => {
        alert("❌ Gửi thất bại! Vui lòng thử lại.");
        console.error("Lỗi khi gửi form:", error);
    });
});

// ===== Slideshow ảnh =====
document.addEventListener("DOMContentLoaded", function () {
    let slides = document.querySelectorAll(".slide");
    let currentIndex = 0;

    function showNextSlide() {
        slides[currentIndex].classList.remove("active");
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add("active");
    }

    setInterval(showNextSlide, 4500);
});

// ===== Chuyển giáo viên tự động =====
const toggleBtn = document.getElementById("toggle-btn");
const teachers = document.querySelectorAll(".teacher");
let currentIndex = 0;
let interval;
let isPaused = false;

function toggleTeacher() {
    teachers.forEach((teacher) => teacher.classList.remove("active"));
    teachers[currentIndex].classList.add("active");
    currentIndex = (currentIndex + 1) % teachers.length;
}

function startAutoSwitch() {
    interval = setInterval(toggleTeacher, 5500);
}

function stopAutoSwitch() {
    clearInterval(interval);
}

toggleBtn.addEventListener("click", () => {
    isPaused = !isPaused;
    toggleBtn.classList.toggle("play", isPaused);
    if (isPaused) {
        stopAutoSwitch();
    } else {
        toggleTeacher();
        startAutoSwitch();
    }
});

startAutoSwitch();
// ===== Tìm kiếm học sinh theo tên hoặc SBD (danh sách điểm) =====
function searchByName() {
    const input = removeAccents(document.getElementById("searchInput").value.toLowerCase());
    const table = document.getElementById("scoreTable");
    const tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) { // Bắt đầu từ 1 để bỏ qua hàng tiêu đề
        const tdName = tr[i].getElementsByTagName("td")[2]; // Cột thứ 3 chứa tên
        const tdSBD = tr[i].getElementsByTagName("td")[1]; // Cột thứ 2 chứa SBD

        if (tdName && tdSBD) {
            const name = removeAccents(tdName.textContent.toLowerCase());
            const sbd = tdSBD.textContent.toLowerCase();

            // Hiển thị hàng nếu tìm thấy kết quả trong tên HOẶC SBD
            if (name.includes(input) || sbd.includes(input)) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function resetSearch() {
    const input = document.getElementById("searchInput");
    input.value = "";
    searchByName();
}

function removeAccents(str) {
    return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

function searchStudentByName() {
    const input = removeAccents(document.getElementById("studentSearchInput").value.toLowerCase());
    const table = document.getElementById("danhSachThiSinh");
    const tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName("td")[2];
        if (td) {
            const name = removeAccents(td.textContent.toLowerCase());
            tr[i].style.display = name.includes(input) ? "" : "none";
        }
    }
}

function resetStudentSearch() {
    const input = document.getElementById("studentSearchInput");
    input.value = "";
    searchStudentByName();
}

// =====Tải thư viện AOS nếu có phần tử cần hiệu ứng =====
if (document.querySelector('[data-aos]')) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js';
    script.onload = () => AOS.init();
    document.body.appendChild(script);
}

window.addEventListener('DOMContentLoaded', function () {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
    document.head.appendChild(link);
});

// ===== Toggle menu trên giao diện mobile (nút hamburger) =====
function toggleMenu() {
    const menu = document.getElementById("mobileMenu");
    menu.classList.toggle("open");
}
