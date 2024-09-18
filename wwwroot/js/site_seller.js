function getAPISiteSeller() {
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/seller', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);
            
            setSellerAccount(data);
        }
    };
    xhr.send(null);
}
getAPISiteSeller();

function setSellerAccount(data) {
    let htmlSellerAccount = "";
    htmlSellerAccount += 
    `
                    <div class="header__account-avatar">
                            <img src="/img/no_user.jpg" class="header__account-avatar-img" alt="">
                        </div>
                        <div class="header__account-info">
                            <span class="header__account-info-name">${data.sellerUsername}</span>
                            <div class="header__account-info-down">
                                <i class="uil uil-angle-down header__account-info-icon"></i>
                            </div>
                        </div>
                        <div class="header__account-manager">
                            <ul class="header__navbar-user-menu">
                                <li class="header__navbar-user-item">
                                    <div class="header__account-manager-info">
                                        <img src="/img/no_user.jpg" alt="" class="header__account-manager-img">
                                        <div class="header__account-manager-name">${data.sellerUsername}</div>
                                    </div>
                                </li>
                                <li class="header__navbar-user-item header__navbar-user-item--separate">
                                    <a href="javascript:logoutSellerAccount()">
                                        <i class="uil uil-signout header__account-manager-icon"></i>
                                        Đăng xuất
                                    </a>
                                </li>
                            </ul>
                        </div>
    `;
    document.querySelector(".header__account").innerHTML = htmlSellerAccount;
}

function logoutSellerAccount() {
    openModal();
    document.querySelector(".modal__body").innerHTML =
        `
                <div class="spinner"></div>
        `;
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/seller/logout', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const result = JSON.parse(xhr.responseText);
            if (result.statusCode == 1) {
                setTimeout(() => {
                    closeModal();
                    toast({ title: "Thông báo", msg: `${result.message}`, type: "success", duration: 5000 });
                    document.querySelector(".modal__body").innerHTML = "";
                    setTimeout(() => {
                        window.location.assign('/seller/login');
                    }, 1000)
                }, 2000);
            }
        }
    };
    xhr.send(null);
}

// Toast
function toast({ title = "", msg = "", type = "", duration = 3000}) {
    const main = document.getElementById('toast');
    if (main) {
        const toast = document.createElement("div");
        const autoRemoveId = setTimeout(() => {
            main.removeChild(toast);
        }, duration + 1000);

        toast.onclick = (e) => {
            if (e.target.closest('.toast__close')) {
                main.removeChild(toast);
                clearTimeout(autoRemoveId);
            }
        };

        const icons = {
            success: 'uil uil-check-circle',
            err: 'uil uil-exclamation-triangle'
        };

        icon = icons[type];
        const delay = (duration / 1000).toFixed(2);

        toast.classList.add('toast', `toast--${type}`);
        toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
        toast.innerHTML = `
            <div class="toast__icon">
                <i class="${icon}"></i>
            </div>
            <div class="toast__body">
                <h3 class="toast__title">${title}</h3>
                <p class="toast__msg">${msg}</p>
            </div>
            <div class="toast__close">
                <i class="uil uil-times"></i>
            </div>
        `;
        main.appendChild(toast);
    }
}

// Modal
function openModal() {
    document.querySelector(".modal").classList.add('open');
}

function closeModal() {
    document.querySelector(".modal").classList.remove('open');
}