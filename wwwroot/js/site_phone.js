function money_2(number) {
    const formattedAmount = new Intl.NumberFormat('vi-VI', {
        style: 'currency',
        currency: 'VND',
    }).format(number);
    return formattedAmount;
}

// Modal
function openModal() {
    document.querySelector(".phone-modal").classList.add("open");
}

function closeModal() {
    document.querySelector(".phone-modal").classList.remove("open");
}

// Modal
function openModalMobile() {
    document.querySelector(".modal").classList.add("open");
}

function closeModalMobile() {
    document.querySelector(".modal").classList.remove("open");
}

// Header
function hideHeader() {
    document.querySelector(".phone-header").classList.add("hide-on-destop");
}

function showHeader() {
    document.querySelector(".phone-header").classList.remove("hide-on-destop");
}

// Bottom Nav
function hideBottomNav() {
    document.querySelector(".phone-bottom__navigation").classList.add("hide-on-destop");
}

function showBottomNav() {
    document.querySelector(".phone-bottom__navigation").classList.remove("hide-on-destop");
}

// Validate Login Account Mobile
function showErrStylesMobile(input, msg) {
    input.classList.add("err");
    msg.classList.remove("hide-on-mobile");
}

function removeErrStylesMobile(input, msg) {
    input.classList.remove("err");
    msg.classList.add("hide-on-mobile");
}

// Toast
function toast({ title = "", msg = "", type = "", duration = 3000}) {
    const main = document.getElementById('phone-toast');
    if (main) {
        const toast = document.createElement("div");
        const autoRemoveId = setTimeout(() => {
            main.removeChild(toast);
        }, duration + 1000);

        toast.onclick = (e) => {
            if (e.target.closest('.phone-toast__close')) {
                main.removeChild(toast);
                clearTimeout(autoRemoveId);
            }
        };

        const icons = {
            success: 'uil uil-check-circle',
            error: 'uil uil-exclamation-triangle'
        };

        icon = icons[type];
        const delay = (duration / 1000).toFixed(2);

        toast.classList.add('phone-toast', `phone-toast--${type}`);
        toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
        toast.innerHTML = `
            <div class="phone-toast__icon">
                <i class="${icon}"></i>
            </div>
            <div class="phone-toast__body">
                <h3 class="phone-toast__title">${title}</h3>
                <p class="phone-toast__msg">${msg}</p>
            </div>
            <div class="phone-toast__close">
                <i class="uil uil-times"></i>
            </div>
        `;
        main.appendChild(toast);
    }
}

// Format Date
function formatDate(date) {
    const dateFormat = new Date(date);
    return dateFormat.toLocaleDateString('en-GB'); // 24/04/2023
}

function setCookies(userID, value, expDays) {
    let date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = userID + "=" + value + ";" + expires + ";path=/";
}