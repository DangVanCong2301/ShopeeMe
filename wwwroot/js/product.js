function getAPIProduct() {
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/product/get-data', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);

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
function sortIncre(categoryID) {
    var formData = new FormData();
    formData.append("categoryID", categoryID);
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/Product/Sort', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);
            let html = "";
            html += data.products.map(obj => `
            <div class="col l-2-4 c-6 m-4">
                <a class="home-product-item" href="/Product/Detail/${obj.pK_iProductID}">
                    <div class="home-product-item__img"
                        style="background-image: url(/img/${obj.sImageUrl});"></div>
                    <h4 class="home-product-item__name">${obj.sProductName}</h4>
                    <div class="home-product-item__price">
                        <span class="home-product-item__price-old">1.200 000đ</span>
                        <span class="home-product-item__price-current">${obj.dPrice} đ</span>
                    </div>
                    <div class="home-product-item__action">
                        <span class="home-product-item__like home-product-item__like--liked">
                            <i class="home-product-item__like-icon-empty far fa-heart"></i>
                            <i class="home-product-item__like-icon-fill fas fa-heart"></i>
                        </span>
                        <div class="home-product-item__rating">
                            <i class="home-product-item__star--gold fas fa-star"></i>
                            <i class="home-product-item__star--gold fas fa-star"></i>
                            <i class="home-product-item__star--gold fas fa-star"></i>
                            <i class="home-product-item__star--gold fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <span class="home-product-item__sold"> 88 Đã bán</span>
                    </div>
                    <div class="home-product-item__origin">
                        <span class="home-product-item__brand">Who</span>
                        <span class="home-product-item__origin-name">Nhật Bản</span>
                    </div>
                    <div class="home-product-item__favourite">
                        <i class="fas fa-check"></i>
                        <span>Yêu thích</span>
                    </div>
                    <div class="home-product-item__sale-off">
                        <span class="home-product-item__sale-off-percent">53%</span>
                        <span class="home-product-item__sale-off-label">GIẢM</span>
                    </div>
                </a>
            </div>
            `).join('');
            console.log(document.querySelector(".product__container").innerHTML = html);
            document.querySelector(".product__container").innerHTML = html;
        }
    }
    xhr.send(formData);
}

// Get Shop Malls
function getShopMalls(data) {
    let htmlShopMall = "";
    htmlShopMall += data.stores.map(obj =>
        `
                    <div class="l-2">
                        <a href="/shop/${obj.sStoreUsername}" class="product__mall-item">
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
                    <a class="home-product-item" href="/product/detail/${data.products[i].pK_iProductID}">
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
                                ${data.products[i].dPrice} đ
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
    var formData = new FormData();
    formData.append("categoryID", categoryID);
    var xhr = new XMLHttpRequest();
    xhr.open("post", "/product/get-data", true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);

            setActiveCategories(data);

            getProducts(data);

            setPagination(data);
        }
    };
    xhr.send(formData);
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