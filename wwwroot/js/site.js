// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

function getDataSite() {
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/home/get-data', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);

            setAccount(data);

            setAccountMobile(data);

            getCartsItem(data);

            getShopsItem(data);
        }
    }
    xhr.send(null);
}
getDataSite();

function setAccount(data) {
    let htmlAccount = "";
    if (data.userID == 0) {
        htmlAccount +=
            `
                <a class="header__navbar-item-link" href="/user/login">Đăng nhập</a>
            `;
    } else {
        if (data.roleID == 2) {
            htmlAccount +=
                `
                                    <div class="header__navbar-user">
                                        <img src="/img/no_user.jpg" alt="" class="header__navbar-user-img">
                                        <span class="header__navbar-user-name">${data.username}</span>
                                        <div class="header__navbar-user-manager">
                                            <ul class="header__navbar-user-menu">
                                                <li class="header__navbar-user-item">
                                                    <a href="/user/profile">Tài khoản của tôi</a>
                                                </li>
                                                <li class="header__navbar-user-item">
                                                    <a href="#">Địa chỉ của tôi</a>
                                                </li>
                                                <li class="header__navbar-user-item">
                                                    <a href="/user/purchase">Đơn mua</a>
                                                </li>
                                                <li class="header__navbar-user-item">
                                                    <a href="/admin">Quản trị</a>
                                                </li>
                                                <li class="header__navbar-user-item header__navbar-user-item--separate">
                                                    <a href="/User/Logout">Đăng xuất</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                `;
        } else {
            htmlAccount +=
                `
                                    <div class="header__navbar-user">
                                        <img src="/img/no_user.jpg" alt="" class="header__navbar-user-img">
                                        <span class="header__navbar-user-name">${data.username}</span>
                                        <div class="header__navbar-user-manager">
                                            <ul class="header__navbar-user-menu">
                                                <li class="header__navbar-user-item">
                                                    <a href="/user/profile">Tài khoản của tôi</a>
                                                </li>
                                                <li class="header__navbar-user-item">
                                                    <a href="">Địa chỉ của tôi</a>
                                                </li>
                                                <li class="header__navbar-user-item">
                                                    <a href="/user/purchase">Đơn mua</a>
                                                </li>
                                                <li class="header__navbar-user-item header__navbar-user-item--separate">
                                                    <a href="/User/Logout">Đăng xuất</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                `;
        }
    }
    document.querySelector(".header__navbar-item-account").innerHTML = htmlAccount;
}

function setAccountMobile(data) {
    htmlAccountMobile = "";
    if (data.userID == 0) {
        htmlAccountMobile +=
            `
                                <div class="header__mobile-user-symbol">
                                    <a href="/user/login" class="header__mobile-user-link">
                                        <i class="uil uil-user header__mobile-user-icon"></i>
                                    </a>
                                </div>
            `;
    } else {
        if (data.roleID == 2) {
            htmlAccountMobile +=
                `
                                    <div class="header__mobile-user-avatar">
                                        <div class="header__mobile-user-avatar-img"
                                            style="background-image: url(/img/profile_avatar.jpg);"></div>
                                        <div class="header__mobile-user-avatar-menu">
                                            <ul class="header__navbar-user-menu">
                                                <li class="header__navbar-user-item">
                                                    <a href="#">Tài khoản của tôi</a>
                                                </li>
                                                <li class="header__navbar-user-item">
                                                    <a href="#">Địa chỉ của tôi</a>
                                                </li>
                                                <li class="header__navbar-user-item">
                                                    <a href="#">Đơn mua</a>
                                                </li>
                                                <li class="header__navbar-user-item">
                                                    <a href="#">Quản trị</a>
                                                </li>
                                                <li class="header__navbar-user-item header__navbar-user-item--separate">
                                                    <a href="/User/Logout">Đăng xuất</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                `;
        } else {
            htmlAccountMobile +=
                `
                                    <div class="header__mobile-user-avatar">
                                        <div class="header__mobile-user-avatar-img"
                                            style="background-image: url(/img/profile_avatar.jpg);"></div>
                                        <div class="header__mobile-user-avatar-menu">
                                            <ul class="header__navbar-user-menu">
                                                <li class="header__navbar-user-item">
                                                    <a href="">Tài khoản của tôi</a>
                                                </li>
                                                <li class="header__navbar-user-item">
                                                    <a href="">Địa chỉ của tôi</a>
                                                </li>
                                                <li class="header__navbar-user-item">
                                                    <a href="">Đơn mua</a>
                                                </li>
                                                <li class="header__navbar-user-item header__navbar-user-item--separate">
                                                    <a href="/User/Logout">Đăng xuất</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                `;
        }
    }
    if (document.querySelector(".header__mobile-user") != null) {
        document.querySelector(".header__mobile-user").innerHTML = htmlAccountMobile;
    }
}

function getCartsItem(data) {
    let htmlCartDetail = "";
    if (data.cartCount == 0 || data.userID == 0) {
        console.log('Giỏ hàng trống!');
        htmlCartDetail +=
            `
                    <div class="header__cart-list header__cart-list--no-cart">
                        <img src="/img/no-cart.png" alt="" class="header__cart-no-cart-img">
                        <span class="header__cart-list-no-cart-msg">
                            Chưa có sản phẩm
                        </span>
                    </div>
                `;
    } else {
        console.log('Có sản phẩm trong giỏ!');
        htmlCartDetail +=
            `
                <div class="header__cart-list">
                    <h4 class="header__cart-heading">Sản phẩm đã thêm</h4>
                    <ul class="header__cart-list-item">
                `;
        htmlCartDetail += data.cartDetails.map(obj => `
                    <li class="header__cart-item">
                        <div class="header__cart-item-img">
                            <img src="/img/${obj.sImageUrl}" class="header__cart-item-img" alt="">
                        </div>
                        <div class="header__cart-item-info">
                            <div class="header__cart-item-head">
                                <h5 class="header__cart-item-name">${obj.sProductName}</h5>
                                <div class="header__cart-item-price-wrap">
                                    <span class="header__cart-item-price">${obj.dUnitPrice} đ</span>
                                    <span class="header__cart-item-multifly">X</span>
                                    <span class="header__cart-item-qnt">${obj.iQuantity}</span>
                                </div>
                            </div>
                            <div class="header__cart-item-body">
                                <span class="header__cart-item-description">
                                    Phân loại hàng:Bạc
                                </span>
                                <span class="header__cart-item-remove">Xoá</span>
                            </div>
                        </div>
                    </li>
                `).join('');
        htmlCartDetail +=
            `
                    </ul>
                    <div class="header__cart-btn">
                        <div class="header__cart-btn-sub">Xem giỏ hàng</div>
                    </div>
                </div>
                `;
    }
    document.querySelector(".header__cart-container").innerHTML = htmlCartDetail;
    document.querySelector(".header__cart-notice").innerText = data.cartCount;
}

function getShopsItem(data) {
    let htmlShopsItem = "";
    htmlShopsItem += data.stores.map(obj => `
                        <li class="chat__shop-item">
                            <div class="chat__shop-item-img" style="background-image: url(/img/${obj.sImageLogo});"></div>
                            <div class="chat__shop-item-info">
                                <div class="chat__shop-item-info-top">
                                    <div class="chat__shop-item-title">${obj.sStoreName}</div>
                                    <div class="chat__shop-item-time">Thứ 5</div>
                                </div>
                                <div class="chat__shop-item-info-bottom">
                                    Nhắc nhở đánh giá đơn hàng
                                </div>
                            </div>
                        </li>
    `).join('');
    document.querySelectorAll(".chat__shop-list").forEach(e => {
        e.innerHTML = htmlShopsItem;
    });
}

// Tìm kiếm danh mục
function searchProducts(input) {
    document.querySelector('.header__search-history').style.display = 'block';
    var formData = new FormData();
    if (input.value != "") {
        formData.append("keyword", input.value);
    }
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/Home/Search', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            let html = "";
            html +=     "<ul class='header__search-history-list'>";
            html += data.map(obj => `
                            <li class="header__search-history-item">
                                <a href="/Product/Index?categoryID=${obj.pK_iCategoryID}">${obj.sCategoryName}</a>
                            </li>`).join('');
            html +=     "</ul>";
            document.querySelector('.header__search-history').innerHTML = html;
        } 
    };
    xhr.send(formData);
}
const searchHistory = document.querySelector('.header__search-history');
window.onclick = (event) => {
    if (event.target == searchHistory) {
        searchHistory.style.display = 'none';
    }
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
            error: 'uil uil-exclamation-triangle'
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

// Chat JS

function hideChatWindow() {
    document.querySelector(".chat").classList.toggle("hide-chat-window");
    document.querySelector(".chat__body-right").classList.toggle("hide-chat-window");
    document.querySelector(".chat__header-btn-arrow").classList.toggle("transform");
}

function hideSearchSub() {
    document.querySelector(".chat__body-search-sub").style.display = 'none';
}

function displaySearchSub() {
    document.querySelector(".chat__body-search-sub").style.display = 'flex';
}

function displaySubList() {
    document.querySelector(".chat__body-search-sub-list").classList.toggle('active'); 
}

document.querySelectorAll(".chat__body-shop-name-sub-control").forEach(e => {
    e.addEventListener('click', () => {
        e.classList.toggle('active');
        e.querySelector(".chat__body-shop-name-sub-control-circle").classList.toggle('active');
    });
});

function hideChat() {
    document.querySelector(".chat").style.display = 'none';
    document.querySelector(".chat__btn").style.display = "flex";
}

function displayChat() {
    document.querySelector(".chat").style.display = 'block';
    document.querySelector(".chat__btn").style.display = "none";
}

function showChatWindowMobile() {
    document.querySelector(".chat__header-menu-bar").classList.toggle("active");
    document.querySelector(".chat__mobile-window").classList.toggle("show");
}

// Load Product
function loadingProducts() {
    const loadingProductImage = document.querySelectorAll(".home-product-item__img-loading");
    const loadingProductName = document.querySelectorAll(".home-product-item__name-loading");
    const loadingProductPriceOld = document.querySelectorAll(".home-product-item__price-old-loading");
    const loadingProductPriceCurrent = document.querySelectorAll(".home-product-item__price-current-loading");
    const loadingProductLike = document.querySelectorAll(".home-product-item__like-loading");
    const loadingProductRate = document.querySelectorAll(".home-product-item__rating-loading");
    const loadingProductSold = document.querySelectorAll(".home-product-item__sold-loading");
    const loadingProductBrand = document.querySelectorAll(".home-product-item__brand-loading");
    const loadingProductOrigin = document.querySelectorAll(".home-product-item__origin-name-loading");

    setTimeout(() => {
        for (let i = 0; i < loadingProductImage.length; i++) {
            loadingProductImage[i].style.display = 'none';
        }
        for (let i = 0; i < loadingProductName.length; i++) {
            loadingProductName[i].style.display = 'none';
        }
        for (let i = 0; i < loadingProductPriceOld.length; i++) {
            loadingProductPriceOld[i].style.display = 'none';
        }
        for (let i = 0; i < loadingProductPriceCurrent.length; i++) {
            loadingProductPriceCurrent[i].style.display = 'none';
        } 
        for (let i = 0; i < loadingProductLike.length; i++) {
            loadingProductLike[i].style.display = 'none';
        }
        for (let i = 0; i < loadingProductRate.length; i++) {
            loadingProductRate[i].style.display = 'none';
        }
        for (let i = 0; i < loadingProductSold.length; i++) {
            loadingProductSold[i].style.display = 'none';
        }
        for (let i = 0; i < loadingProductBrand.length; i++) {
            loadingProductBrand[i].style.display = 'none';
        }
        for (let i = 0; i < loadingProductOrigin.length; i++) {
            loadingProductOrigin[i].style.display = 'none';
        }
    }, 1000);
}

// Tách lấy chữ số
// Nguồn: http://vncoding.net/2015/10/30/tach-cac-chu-so-thuoc-hang-tram-hang-chuc-hang-don-vi/
function money(number) {
    let result = ``; // Nếu là chuỗi thì trán đặt biến là const
    // Vì Const là một hằng số, vì vậy khi khai báo biến const thì bạn phải gán giá trị cho nó luôn, 
    // sau này cũng không thể thay đổi giá trị cho biến.
    // Nguồn: https://freetuts.net/bien-va-khai-bao-bien-trong-javascript-265.html
    // Ví dụ số 9899999
    let millions = Math.floor(number / 1000000); // Chia cho 1000000 và làm tròn số ta được 9
    let hundred_thousand = Math.floor((number % 1000000) / 100000); // Chia lấy phần dư ta được 899999 và tiếp tục chia cho 100000 và làm tròn ta được 8
    let tens_of_thousands = Math.floor((number % 1000000 % 100000) / 10000); // Tương tự lấy phần dư của hàng trục nghìn rồi chia cho 10000 ta được 9
    let thousand = Math.floor((number % 1000000 % 100000 % 10000) / 1000); // Lấy phần dư hàng nghìn rồi chia cho 1000
    let hundreds = Math.floor((number % 1000000 % 100000 % 10000 % 1000) / 100); // Lấy phần dư hàng trăm chia cho 100
    let tens = Math.floor((number % 1000000 % 100000 % 10000 % 1000 % 100) / 10); // Lấy phần dư của hàng chục chia cho 10
    let unit = Math.floor(number % 1000000 % 100000 % 10000 % 1000 % 100 % 10); // Lấy phần dư hàng đơn vị
    if (millions == 0 && hundred_thousand != 0) {
        result = `${hundred_thousand}${tens_of_thousands}${thousand}.${hundreds}${tens}${unit}`;
    } else if (millions == 0 && hundred_thousand == 0) {
        result = `${tens_of_thousands}${thousand}.${hundreds}${tens}${unit}`;
    } else {
        result = `${millions}.${hundred_thousand}${tens_of_thousands}${thousand}.${hundreds}${tens}${unit}`;
    }
    return result;
}

// Back History
function backHistory() {
    window.history.back();
}
