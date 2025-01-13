// Get API Site Shop
function getAPISiteMall() {
    const url = window.location.href;
    const params = new URL(url).searchParams;
    const entries = new URLSearchParams(params).values();
    const array = Array.from(entries)
    const shopName = array[0];

    let userID = getCookies("userID");
    if (userID == undefined) {
        userID = 0;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('get', '/shop/get-data?name=' + shopName + '&userID=' + userID + '', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            
            console.log(data);

            setHeaderMobile(data);

            setAccount(data);

            setCartItems(data);
            
        }
    };
    xhr.send(null);
}
getAPISiteMall();

function setHeaderMobile(data) {
    let htmlHeaderMobile = "";
    htmlHeaderMobile += 
                `<div class="header__mobile-container">
                    <div class="header__mobile-left">
                        <div class="header__mobile-menu" onclick="showNavMenu()">
                            <i class="uil uil-bars header__mobile-menu-icon"></i>
                        </div>
                        <div class="header__mobile-menu-nav hide-on-destop">
                            <div class="header__mobile-menu-container">
                                <div class="header__mobile-menu-close" onclick="closeNavMenu()">
                                    <i class="uil uil-multiply header__mobile-menu-close-icon"></i>
                                </div>
                                <div class="header__mobile-menu-list">
                                    <div class="header__mobile-menu-item">
                                        <div class="header__mobile-menu-item-link header__mobile-menu-item-shop">
                                            <span class="header__mobile-menu-item-name">Thông tin Shop</span>
                                        </div>
                                    </div>
                                    <div class="header__mobile-menu-item">
                                        <div class="header__mobile-menu-item-link header__mobile-menu-item-product">
                                            <span class="header__mobile-menu-item-name">Sản phẩm</span>
                                        </div>
                                    </div>
                                    <div class="header__mobile-menu-item">
                                        <a href="javascript:openCategoryMenu()" class="header__mobile-menu-item-link">
                                            <span class="header__mobile-menu-item-name">Danh mục</span>
                                            <i class="uil uil-angle-down header__mobile-menu-item-dropdown-icon"></i>
                                        </a>
                                    </div>`;
                                    if (data.userID != 0) {
                                        htmlHeaderMobile += 
                                    `<div class="header__mobile-menu-logout">
                                        <a href="javascript:logoutUserAccount()" class="header__mobile-menu-logout-link">
                                            <span class="header__mobile-menu-logout-name">Đăng xuất</span>
                                            <i class="uil uil-signout header__mobile-menu-logout-icon"></i>
                                        </a>
                                    </div>`;
                                    }
                                    htmlHeaderMobile += `
                                </div>
                            </div>
                            <div class="header__mobile-menu-container-category">
                                <div class="header__mobile-menu-close" onclick="closeNavMenu()">
                                    <i class="uil uil-multiply header__mobile-menu-close-icon"></i>
                                </div>
                                <div class="header__mobile-menu-list">
                                    <div class="header__mobile-menu-back">
                                        <a href="javascript:showNavMenu()" class="header__mobile-menu-back-link">
                                            <div class="header__mobile-menu-back-icon-symb">
                                                <i class="header__mobile-back-item-icon uil uil-arrow-left"></i>
                                            </div>
                                            <span class="header__mobile-menu-back-name">Quay lại</span>
                                        </a>
                                    </div>
                                    <div class="header__mobile-menu-back">
                                        <span class="header__mobile-menu-back-all">Xem tất cả thể loại</span>
                                    </div>`;
                                    data.categories.forEach(element => {
                                        htmlHeaderMobile += 
                                    `<div class="header__mobile-menu-item">
                                        <a href="javascript:filterProductByCategoryID(${element.pK_iCategoryID})" class="header__mobile-menu-item-link">
                                            <span class="header__mobile-menu-tab-name">${element.sCategoryName}</span>
                                        </a>
                                    </div>`;
                                    });
                                    htmlHeaderMobile += `
                                </div>
                            </div>
                            <div class="header__mobile-menu-overlay"></div>
                        </div>
                    </div>
                    <div class="header__mobile-logo">
                        <a href="/" class="header__logo-link">
                            <img class="header__logo-img" src="/img/sme_logo_white.png" alt="SMe Logo">
                        </a>
                    </div>
                    <div class="header__mobile-right">`;
                    if (data.userID == 0) {
                        htmlHeaderMobile += 
                        `<div class="header__mobile-user-symbol">
                            <a href="/user/login" class="header__mobile-user-link">  
                                <i class="uil uil-user header__mobile-user-icon"></i>
                            </a>
                        </div>`;
                    } else {
                        htmlHeaderMobile += 
                        `<div class="header__mobile-user-avatar">
                            <div class="header__mobile-user-avatar-img" style="background-image: url(/img/${data.userInfo[0].sImageProfile});"></div>
                        </div>`;
                    }
                        htmlHeaderMobile += `
                    </div>
                </div>`;
    document.querySelector(".header__mobile").innerHTML = htmlHeaderMobile;

    document.querySelector(".header__mobile-menu-item-shop").addEventListener('click', () => {
        addShopMobileShop(0);
    });

    document.querySelector(".header__mobile-menu-item-product").addEventListener('click', () => {
        addShopMobileProduct(1);
    });
}

function setAccount(data) {
    let htmlAccount = "";
    if (data.userID == 0) {
        htmlAccount +=
            `
                            <li class="header__navbar-item header__navbar-item--strong header__navbar-item--separate">
                                <a class="header__navbar-item-link" href="/user/register">Đăng ký</a>
                            </li>
                            <li class="header__navbar-item header__navbar-item-account header__navbar-item--strong">
                                <a class="header__navbar-item-link" href="/user/login">Đăng nhập</a>
                            </li>
            `;
    } else if (data.userID != 0 && data.userInfo.length == 0) {
        window.location.assign("/user/portal");
    } else {
        if (data.roleID == 2) {
            htmlAccount +=
                `
                <div class="header__navbar-item">
                    <div class="header__navbar-user">
                        <img src="/img/${data.userInfo[0].sImageProfile}" alt="" class="header__navbar-user-img">
                        <span class="header__navbar-user-name">${data.userInfo[0].sUserName}</span>
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
                                    <a href="javascript:logoutUserAccount()">Đăng xuất</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                `;
        } else if (data.roleID == 3) {
            htmlAccount +=
                `
                <div class="header__navbar-item">
                    <div class="header__navbar-user">
                        <img src="/img/${data.userInfo[0].sImageProfile}" alt="" class="header__navbar-user-img">
                        <span class="header__navbar-user-name">${data.userInfo[0].sUserName}</span>
                        <div class="header__navbar-user-manager">
                            <ul class="header__navbar-user-menu">
                                <li class="header__navbar-user-item">
                                    <a href="/user/profile">Tài khoản của tôi</a>
                                </li>
                                <li class="header__navbar-user-item">
                                    <a href="/user/profile">Địa chỉ của tôi</a>
                                </li>
                                <li class="header__navbar-user-item">
                                    <a href="/user/purchase">Đơn mua</a>
                                </li>
                                <li class="header__navbar-user-item">
                                    <a href="/picker">Kênh lấy hàng</a>
                                </li>
                                <li class="header__navbar-user-item header__navbar-user-item--separate">
                                    <a href="javascript:logoutUserAccount()">Đăng xuất</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                `;
        } else if (data.roleID == 4) {
            htmlAccount +=
                `
                                <div class="header__navbar-item">
                                    <div class="header__navbar-user">
                                        <img src="/img/${data.userInfo[0].sImageProfile}" alt="" class="header__navbar-user-img">
                                        <span class="header__navbar-user-name">${data.userInfo[0].sUserName}</span>
                                        <div class="header__navbar-user-manager">
                                            <ul class="header__navbar-user-menu">
                                                <li class="header__navbar-user-item">
                                                    <a href="/user/profile">Tài khoản của tôi</a>
                                                </li>
                                                <li class="header__navbar-user-item">
                                                    <a href="/user/profile">Địa chỉ của tôi</a>
                                                </li>
                                                <li class="header__navbar-user-item">
                                                    <a href="/user/purchase">Đơn mua</a>
                                                </li>
                                                <li class="header__navbar-user-item">
                                                    <a href="/delivery">Kênh giao hàng</a>
                                                </li>
                                                <li class="header__navbar-user-item header__navbar-user-item--separate">
                                                    <a href="javascript:logoutUserAccount()">Đăng xuất</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                `;
        } else {
            htmlAccount +=
                `
                                <div class="header__navbar-item">
                                    <div class="header__navbar-user">
                                        <img src="/img/${data.userInfo[0].sImageProfile}" alt="" class="header__navbar-user-img">
                                        <span class="header__navbar-user-name">${data.userInfo[0].sUserName}</span>
                                        <div class="header__navbar-user-manager">
                                            <ul class="header__navbar-user-menu">
                                                <li class="header__navbar-user-item">
                                                    <a href="/user/profile">Tài khoản của tôi</a>
                                                </li>
                                                <li class="header__navbar-user-item">
                                                    <a href="/user/profile">Địa chỉ của tôi</a>
                                                </li>
                                                <li class="header__navbar-user-item">
                                                    <a href="/user/purchase">Đơn mua</a>
                                                </li>
                                                <li class="header__navbar-user-item header__navbar-user-item--separate">
                                                    <a href="javascript:logoutUserAccount()">Đăng xuất</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>              
                `;
        }
    }
    document.querySelector(".header__navbar-auth").innerHTML = htmlAccount;
}

function logoutUserAccount() {
    openModal();
    document.querySelector(".modal__body").innerHTML = `<div class="spinner"></div>`;
    deleteCookies("userID");
    setTimeout(() => {
        closeModal();
        toast({ title: "Thông báo", msg: `Đăng xuất thành công!`, type: "success", duration: 5000 });
        document.querySelector(".modal__body").innerHTML = "";
        setTimeout(() => {
            window.location.assign('/');
        }, 1000)
    }, 2000);
}

function setCartItems(data) {
    let htmtCartItem = "";
    if (data.cartCount == 0 || data.userID == 0) {
        htmtCartItem += 
        `
                    <div class="header__cart-list header__cart-list--no-cart">
                        <img src="/img/no-cart.png" alt="" class="header__cart-no-cart-img">
                        <span class="header__cart-list-no-cart-msg">
                            Chưa có sản phẩm
                        </span>
                    </div>
        `;
    } else {
        htmtCartItem +=
        `
                <div class="header__cart-list">
                    <h4 class="header__cart-heading">Sản phẩm đã thêm</h4>
                    <ul class="header__cart-list-item">
        `;
        data.cartDetails.forEach(element => {
            htmtCartItem +=
            `
                        <a href="/product/detail?id=${element.pK_iProductID}" class="header__cart-item">
                            <div class="header__cart-item-img">
                                <img src="/img/${element.sImageUrl}" class="header__cart-item-img" alt="">
                            </div>
                            <div class="header__cart-item-info">
                                <div class="header__cart-item-head">
                                    <h5 class="header__cart-item-name">${element.sProductName}</h5>
                                    <div class="header__cart-item-price-wrap">
                                        <span class="header__cart-item-price">${element.dUnitPrice} đ</span>
                                        <span class="header__cart-item-multifly">X</span>
                                        <span class="header__cart-item-qnt">${element.iQuantity}</span>
                                    </div>
                                </div>
                                <div class="header__cart-item-body">
                                    <span class="header__cart-item-description">
                                        Phân loại hàng: Bạc
                                    </span>
                                    <span class="header__cart-item-remove">Xoá</span>
                                </div>
                            </div>
                        </a>
            `;    
        });
        htmtCartItem +=
        `
                    </ul>
                    <a href="/cart" class="header__cart-btn btn--primary">
                        Xem giỏ hàng
                    </a>
                </div>
        `;
        document.querySelector(".header__cart-container").innerHTML = htmtCartItem;
        document.querySelector(".header__cart-notice").innerHTML = data.cartCount;
    }
}

// Search Product
function searchProducts() {
    noticeIncompleteFunc();
}

// Notice Incomplete Function
function noticeIncompleteFunc() {
    openModal();
    document.querySelector(".modal__body").innerHTML = 
            `
                <div class="modal__confirm">
                    <div class="modal__confirm-header">
                        <div class="modal__confirm-title">Thông báo</div>
                    </div>
                    <div class="modal__confirm-desc">
                        Chức năng này chưa được hoàn thiện!
                    </div>
                    <div class="modal__confirm-btns">
                        <div class="modal__confirm-btn-destroy" onclick="closeModal()">Huỷ</div>
                        <div class="modal__confirm-btn-send"onclick="closeModal()">Đồng ý</div>
                    </div>
                </div>
            `;
}

// Show Navbar Menu
function showNavMenu() {
    document.querySelector(".header__mobile-menu-overlay").classList.add("open");
    document.querySelector(".header__mobile-menu-container").classList.add("open");
    document.querySelector(".header__mobile-menu-container-category").classList.remove("open");
}

function closeNavMenu() {
    document.querySelector(".header__mobile-menu-overlay").classList.remove("open");
    document.querySelector(".header__mobile-menu-container").classList.remove("open");
    document.querySelector(".header__mobile-menu-container-category").classList.remove("open");
}

function openCategoryMenu() {
    document.querySelector(".header__mobile-menu-container").classList.remove("open");
    document.querySelector(".header__mobile-menu-container-category").classList.add("open");
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

// Modal
function openModal() {
    document.querySelector(".modal").classList.add("open");
}

function closeModal() {
    document.querySelector(".modal").classList.remove("open");
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

function money_2(number) {
    const formattedAmount = new Intl.NumberFormat('vi-VI', {
        style: 'currency',
        currency: 'VND',
    }).format(number);
    return formattedAmount;
}

function getCookies(userID) {
    const id = userID + "=";
    const cDecoded = decodeURIComponent(document.cookie);
    const arr = cDecoded.split(";");
    let res; 
    arr.forEach(val => {
        if (val.indexOf(id) === 0) res = val.substring(id.length);
    });
    return res;
}

function deleteCookies(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function getQueryStr() {
    const url = window.location.href;
    const params = new URL(url).searchParams;
    const entries = new URLSearchParams(params).values();
    const array = Array.from(entries)
    return array[0];
}