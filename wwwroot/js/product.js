function getAPIProduct() {
    let userID = getCookies("userID");
    if (userID == undefined) {
        userID = 0;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('get', '/product/get-data?userID=' + userID + '&industryID=' + getQueryStr() + '', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);

            setHeaderMobileProduct(data);

            getShopMalls(data);

            getCategories(data);

            getProducts(data);

            setPagination(data);
        }
    };
    xhr.send(null);
}
getAPIProduct();

// Slider
let index = 0;
const productSliderNumber = document.querySelectorAll(".product__slider-item");
const productSliderDots = document.querySelector(".product__slider-dots");

for (let i = 0; i < productSliderNumber.length; i++) {
    const div = document.createElement("div");
    div.id = i;
    productSliderDots.appendChild(div);
}
document.getElementById('0').classList.add('slider-product-circle-fill');

const productSliderDot = document.querySelectorAll(".product__slider-dots div");
for (let i = 0; i < productSliderDot.length; i++) {
    productSliderDot[i].addEventListener('click', () => {
        index = productSliderDot[i].id;
        document.querySelector(".product__slider-list").style.right = index * 100 + "%";
        document.querySelector(".slider-product-circle-fill").classList.remove("slider-product-circle-fill");
        document.getElementById(index).classList.add("slider-product-circle-fill");
    });
}

function productSliderAuto() {
    index = index + 1;
    if (index > productSliderNumber.length - 1) {
        index = 0;
    }
    document.querySelector(".product__slider-list").style.right = index * 100 + "%";
    document.querySelector(".slider-product-circle-fill").classList.remove("slider-product-circle-fill");
    document.getElementById(index).classList.add("slider-product-circle-fill");
}
setInterval(productSliderAuto, 3000);

// Sắp xếp các sản phẩm trong trang sản phẩm theo giá tăng dần
function sortPrice(sortType) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/product/sort?industryID=' + getQueryStr() + '&sortType=' + sortType + '', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);

            getProducts(data);
        }
    }
    xhr.send(null);
}

function setHeaderMobileProduct(data) {
    let htmlHeaderMobile = "";
    htmlHeaderMobile += 
                `<div class="header__mobile-container">
                    <div class="header__mobile-left">
                        <div class="header__mobile-menu" onclick="showNavProductMenu()">
                            <i class="uil uil-bars header__mobile-menu-icon"></i>
                        </div>
                        <div class="header__mobile-menu-nav hide-on-destop">
                            <div class="header__mobile-product-menu-container">
                                <div class="header__mobile-menu-close" onclick="closeNavProductMenu()">
                                    <i class="uil uil-multiply header__mobile-menu-close-icon"></i>
                                </div>
                                <div class="header__mobile-menu-list">
                                    <div class="header__mobile-menu-item">
                                        <a href="javascript:openShopProductMenu()" class="header__mobile-menu-item-link">
                                            <span class="header__mobile-menu-item-name">Cửa hàng</span>
                                            <i class="uil uil-angle-down header__mobile-menu-item-dropdown-icon"></i>
                                        </a>
                                    </div>
                                    <div class="header__mobile-menu-item">
                                        <a href="javascript:openCategoryMenu()" class="header__mobile-menu-item-link">
                                            <span class="header__mobile-menu-item-name">Thể loại</span>
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
                            <div class="header__mobile-product-menu-container-shop">
                                <div class="header__mobile-menu-close" onclick="closeNavProductMenu()">
                                    <i class="uil uil-multiply header__mobile-menu-close-icon"></i>
                                </div>
                                <div class="header__mobile-menu-list">
                                    <div class="header__mobile-menu-back">
                                        <a href="javascript:showNavProductMenu()" class="header__mobile-menu-back-link">
                                            <div class="header__mobile-menu-back-icon-symb">
                                                <i class="header__mobile-back-item-icon uil uil-arrow-left"></i>
                                            </div>
                                            <span class="header__mobile-menu-back-name">Quay lại</span>
                                        </a>
                                    </div>
                                    <div class="header__mobile-menu-back">
                                        <span class="header__mobile-menu-back-all">Xem tất cả cửa hàng</span>
                                    </div>`;
                                    data.stores.forEach(element => {
                                        htmlHeaderMobile += 
                                    `<div class="header__mobile-menu-item">
                                        <a href="/shop?name=${element.sStoreUsername}" class="header__mobile-menu-item-link">
                                            <span class="header__mobile-menu-tab-name">${element.sStoreName}</span>
                                        </a>
                                    </div>`;
                                    });
                                    htmlHeaderMobile += `
                                </div>
                            </div>
                            <div class="header__mobile-product-menu-container-category">
                                <div class="header__mobile-menu-close" onclick="closeNavProductMenu()">
                                    <i class="uil uil-multiply header__mobile-menu-close-icon"></i>
                                </div>
                                <div class="header__mobile-menu-list">
                                    <div class="header__mobile-menu-back">
                                        <a href="javascript:showNavProductMenu()" class="header__mobile-menu-back-link">
                                            <div class="header__mobile-menu-back-icon-symb">
                                                <i class="header__mobile-back-item-icon uil uil-arrow-left"></i>
                                            </div>
                                            <span class="header__mobile-menu-back-name">Quay lại</span>
                                        </a>
                                    </div>
                                    <div class="header__mobile-menu-back">
                                        <span class="header__mobile-menu-back-all">Xem tất cả danh mục</span>
                                    </div>`;
                                    data.categories.forEach(element => {
                                        htmlHeaderMobile += 
                                    `<div class="header__mobile-menu-item">
                                        <a href="javascript:filterProductByCategoryID(${element.pK_iCategoryID})" class="header__mobile-menu-item-link">
                                            <span class="header__mobile-menu-tab-name">${element.sCategoryName}</span>
                                        </a>
                                    </div>`;
                                    });
                                    htmlHeaderMobile += 
                                `</div>
                            </div>
                            <div class="header__mobile-product-menu-overlay"></div>
                        </div>
                    </div>
                    <div class="header__mobile-logo">
                        <a href="/" class="header__logo-link">
                            <img class="header__logo-img" src="/img/sme_logo_white.png" alt="SMe Logo">
                        </a>
                    </div>`;
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
    `;
    document.querySelector(".header__mobile-product").innerHTML = htmlHeaderMobile;
}

// Get Shop Malls
function getShopMalls(data) {
    let htmlShopMall = "";
    htmlShopMall += data.stores.map(obj =>
        `
                    <div class="l-2">
                        <a href="/shop?name=${obj.sStoreUsername}" class="product__mall-item">
                            <img src="/img/${obj.sImageMall}" class="product__mall-item-img" alt="">
                        </a>
                    </div>
    `
    ).join('');
    document.querySelector(".product__mall-body-list").innerHTML = htmlShopMall;
}

function getCategories(data) {
    let htmlCategory = "";
    htmlCategory += data.categories.map(obj =>
        `
        <li class="category-item">
            <a href="javascript:filterProductByCategoryID(${obj.pK_iCategoryID})" class="category-item__link">${obj.sCategoryName}</a>
        </li>
    `
    ).join('');
    document.querySelector(".category-list").innerHTML = htmlCategory;
}

function getProducts(data) {
    let htmlProduct = "";
    for (let i = 0; i < data.products.length; i++) {
        htmlProduct +=
            `
                <div class="col l-2-4 c-6 m-4">
                    <a class="home-product-item" href="/product/detail?id=${data.products[i].pK_iProductID}">
                        <div class="home-product-item__img" style="background-image: url(/img/${data.products[i].sImageUrl})">
                            <div class="home-product-item__img-loading">
                                <i class="uil uil-shopping-bag home-product-item__img-loading-icon"></i>
                            </div>
                        </div>
                        <h4 class="home-product-item__name">
                            ${data.products[i].sProductName}
                            <div class="home-product-item__name-loading">
                                <div class="home-product-item__name-loading-line"></div>
                                <div class="home-product-item__name-loading-line"></div>
                            </div>
                        </h4>
                        <div class="home-product-item__price">`;
        if (data.products[i].dPerDiscount != 1) {
                            htmlProduct +=
                            `<span class="home-product-item__price-old">
                                ${money_2(data.products[i].dPrice)}
                                <div class="home-product-item__price-old-loading"></div>
                            </span>
                            <span class="home-product-item__price-current">
                                ${money(data.products[i].dPrice * (1 - data.products[i].dPerDiscount))} đ
                                <div class="home-product-item__price-current-loading"></div>
                            </span>`;
        } else {
                            htmlProduct +=
                            `<span class="home-product-item__price-current">
                                ${money(data.products[i].dPrice)} đ
                                <div class="home-product-item__price-current-loading"></div>
                            </span>`;
        }
                        htmlProduct +=
                        `</div>
                        <div class="home-product-item__action">
                            <span class="home-product-item__like home-product-item__like--liked">
                                <i class="home-product-item__like-icon-empty far fa-heart"></i>
                                <i class="home-product-item__like-icon-fill fas fa-heart"></i>
                                <div class="home-product-item__like-loading"></div>
                            </span>
                            <div class="home-product-item__rating">
                                <i class="home-product-item__star--gold fas fa-star"></i>
                                <i class="home-product-item__star--gold fas fa-star"></i>
                                <i class="home-product-item__star--gold fas fa-star"></i>
                                <i class="home-product-item__star--gold fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <div class="home-product-item__rating-loading"></div>
                            </div>
                            <span class="home-product-item__sold"> 
                                88 Đã bán
                                <div class="home-product-item__sold-loading"></div>
                            </span>
                        </div>
                        <div class="home-product-item__origin">
                            <span class="home-product-item__brand">
                                ${data.products[i].sStoreName}
                                <div class="home-product-item__brand-loading"></div>
                            </span>
                            <span class="home-product-item__origin-name">
                                Hà Nội
                                <div class="home-product-item__origin-name-loading"></div>
                            </span>
                        </div>
                        <div class="home-product-item__favourite">
                            <i class="fas fa-check"></i>
                            <span>Yêu thích</span>
                        </div>`;
        if (data.products[i].dPerDiscount != 1) {
            htmlProduct +=
                        `<div class="home-product-item__sale-off">
                                <span class="home-product-item__sale-off-percent">${Math.floor(data.products[i].dPerDiscount * 100)}%</span>
                                <span class="home-product-item__sale-off-label">GIẢM</span>
                            </div>`;
        }
        htmlProduct +=
            `</a>
                </div>
        `;
    }
    document.querySelectorAll(".product__container").forEach(e => {
        e.innerHTML = htmlProduct;
    });
    loadingProducts();
}

// Set Pagination
function setPagination(data) {
    let htmlPagination = "";
    if (data.currentPage > 1) {
        htmlPagination += `
                    <li class="pagination-item">
                        <a href="javascript:pageNumber(${data.currentPage - 1})" class="pagination-item__link">
                            <i class="pagination-item__icon fas fa-angle-left"></i>
                        </a>
                    </li>
                `;
    }
    for (let i = 1; i <= data.totalPage; i++) {
        if (i == data.currentPage) {
            htmlPagination += `
                        <li class="pagination-item pagination-item--active">
                            <a href="javascript:pageNumber(${i})" class="pagination-item__link">${i}</a>
                        </li>
                    `;
        } else {
            htmlPagination += `
                        <li class="pagination-item">
                            <a href="javascript:pageNumber(${i})" class="pagination-item__link">${i}</a>
                        </li>
                    `;
        }
    }
    if (data.currentPage < data.totalPage) {
        htmlPagination += `
                    <li class="pagination-item">
                        <a href="javascript:pageNumber(${data.currentPage + 1})" class="pagination-item__link">
                            <i class="pagination-item__icon fas fa-angle-right"></i>
                        </a>
                    </li>
                `;
    }
    document.querySelectorAll(".pagination").forEach(e => {
        e.innerHTML = htmlPagination;
    });
}

function pageNumber(currentPage) {
    var xhr = new XMLHttpRequest();
    var formData = new FormData();
    formData.append("currentPage", currentPage);
    xhr.open('post', '/product/get-data', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);

            getProducts(data);

            setPagination(data);
        }
    };
    xhr.send(formData);
}

// Lọc sản phẩm theo mã danh mục con
function filterProductByCategoryID(categoryID) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", "/product/get-data?categoryID=" + categoryID + "&industryID=" + getQueryStr() + "", true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);

            closeNavProductMenu();

            setActiveCategories(data);

            getProducts(data);

            setPagination(data);
        }
    };
    xhr.send(null);
}

function setActiveCategories(data) {
    let htmlCategory = "";
    data.categories.forEach(e => {
        if (e.pK_iCategoryID == data.currentCategoryID) {
            htmlCategory +=
                `
                <li class="category-item category-item--active">
                    <a href="javascript:filterProductByCategoryID(${e.pK_iCategoryID})" class="category-item__link">${e.sCategoryName}</a>
                </li>
                `;
        } else {
            htmlCategory +=
                `
                <li class="category-item">
                    <a href="javascript:filterProductByCategoryID(${e.pK_iCategoryID})" class="category-item__link">${e.sCategoryName}</a>
                </li>
                `;
        }
    });
    document.querySelector(".category-list").innerHTML = htmlCategory;
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

function getQueryStr() {
    const url = window.location.href;
    const params = new URL(url).searchParams;
    const entries = new URLSearchParams(params).values();
    const array = Array.from(entries)
    return array[0];
}