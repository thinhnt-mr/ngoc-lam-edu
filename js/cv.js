// JavaScript để hiển thị/ẩn các phần khi nhấp vào tiêu đề
document.querySelectorAll('.right-column h2').forEach(header => {
    header.addEventListener('click', () => {
        const section = header.nextElementSibling;
        section.classList.toggle('active');
    });
});

// Mặc định hiển thị phần "Education"
document.querySelector('.section.active').style.display = 'block';