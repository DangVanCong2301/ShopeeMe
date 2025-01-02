function getAPIProductSimilar() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/product/similar/get-data?productID=' + getQueryStr() + '&categoryID=' + getQueryStr_2() + '', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);

            setProductDetailSimilar(data);

            setProductItemSimilar(data);

            setPagination(data);
        }
    };
    xhr.send(null);
}
getAPIProductSimilar();

function setProductDetailSimilar(data) {
    let htmlProduct = "";
    htmlProduct += 
    `
            <div class="similar-product__loading">
                <div class="similar-product__loading-item">
                    <div class="similar-product__loading-item-img">
                        <i class="uil uil-shopping-bag similar-product__loading-item-img-icon"></i>
                    </div>
                    <div class="similar-product__loading-item-info">
                        <div class="similar-product__loading-item-info-top">
                            <div class="similar-product__loading-item-info-name"></div>
                            <div class="similar-product__loading-item-info-rate"></div>
                        </div>
                        <div class="similar-product__loading-item-info-bottom">
                            <div class="similar-product__loading-item-info-price"></div>
                            <div class="similar-product__loading-item-info-btn"></div>
                        </div>
                    </div>
                </div>
                <div class="similar-product__loading-shop">
                    <div class="similar-product__loading-shop-info">
                        <div class="similar-product__loading-shop-img"></div>
                        <div class="similar-product__loading-shop-name"></div>
                    </div>
                    <div class="similar-product__loading-shop-numb">
                        <div class="similar-product__loading-shop-numb-product"></div>
                        <div class="similar-product__loading-shop-numb-rate"></div>
                    </div>
                </div>
            </div>
            <div class="similar-product__header-item">
                <div class="similar-product__header-item-left">
                    <img src="/img/${data.product[0].sImageUrl}" alt="" class="similar-product__header-item-img">`;
                    if (data.product[0].dPerDiscount != 1) {
                        htmlProduct += 
                        `<div class="home-product-item__sale-off">
                            <span class="home-product-item__sale-off-percent">${Math.floor(data.product[0].dPerDiscount * 100)}%</span>
                            <span class="home-product-item__sale-off-label">GIẢM</span>
                        </div>`;
                    }
    htmlProduct += 
                `</div>
                <div class="similar-product__header-item-right">
                    <div class="similar-product__header-item-top">
                        <div class="similar-product__header-item-name">
                            ${data.product[0].sProductName}
                        </div>
                        <div class="similar-product__header-item-rate">
                            <div class="similar-product__header-item-rate-sub">4.9</div>
                            <div class="similar-product__header-item-rate-stars">
                                <i class="uis uis-star similar-product__header-item-rate-star"></i>
                                <i class="uis uis-star similar-product__header-item-rate-star"></i>
                                <i class="uis uis-star similar-product__header-item-rate-star"></i>
                                <i class="uis uis-star similar-product__header-item-rate-star"></i>
                                <i class="uis uis-star similar-product__header-item-rate-star"></i>
                            </div>
                            <div class="similar-product__header-item-rate-sub">4.9 trên 5</div>
                            <div class="similar-product__header-item-rate-count">(21 đánh giá)</div>
                            <div class="similar-product__header-item-rate-title">34 Sold Monthly</div>
                        </div>
                    </div>
                    <div class="similar-product__header-item-bottom">
                        <div class="similar-product__header-item-price">`;
                        if (data.product[0].dPerDiscount != 1) {
                            htmlProduct += 
                            `
                            <div class="similar-product__header-item-price-old">${money(data.product[0].dPrice)} đ</div>
                            <div class="similar-product__header-item-price-current">${money((data.product[0].dPrice * (1 - data.product[0].dPerDiscount)))} đ</div>
                            `;
                        } else {
                            htmlProduct += 
                            `<div class="similar-product__header-item-price-current">${money(data.product[0].dPrice)} đ</div>`;
                        }
    htmlProduct += 
                        `</div>
                        <div class="similar-product__header-item-buy-now btn btn--primary">Mua ngay</div>
                    </div>
                </div>
            </div>
            <div class="similar-product__header-shop">
                <div class="similar-product__header-shop-info">
                    <div class="similar-product__header-shop-avatar">
                        <img src="/img/${data.store[0].sImageAvatar}" alt=""
                            class="similar-product__header-shop-avatar-img">
                    </div>
                    <div class="similar-product__header-shop-name">${data.store[0].sStoreName}</div>
                    <div class="similar-product__header-shop-chat">
                        <i class="uil uil-comments-alt similar-product__header-shop-chat-icon"></i>
                    </div>
                </div>
                <div class="similar-product__header-shop-numb">
                    <div class="similar-product__header-shop-product">
                        Sản phẩm <span>200</span>
                    </div>
                    <div class="similar-product__header-shop-rate">
                        Đánh giá <span>N/A</span>
                    </div>
                </div>
            </div>
    `;
    document.querySelector(".similar-product__header").innerHTML = htmlProduct;
    loadingProductSimilarDetail();
}

function loadingProductSimilarDetail() {
    setTimeout(() => {
        document.querySelector(".similar-product__loading").style.display = 'none';
    }, 1000);
}

function setProductItemSimilar(data) {
    let htmlProducts = "";
    for (let i = 0; i < data.products.length; i++) {
        htmlProducts += 
        `
                <div class="col l-2 c-6 m-4">
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
        htmlProducts += 
                            `<span class="home-product-item__price-old">
                                ${data.products[i].dPrice} đ
                                <div class="home-product-item__price-old-loading"></div>
                            </span>
                            <span class="home-product-item__price-current">
                                ${money(data.products[i].dPrice * (1 - data.products[i].dPerDiscount))} đ
                                <div class="home-product-item__price-current-loading"></div>
                            </span>`;
                        } else {
        htmlProducts += 
                            `<span class="home-product-item__price-current">
                                ${money(data.products[i].dPrice)} đ
                                <div class="home-product-item__price-current-loading"></div>
                            </span>`;
                        }
        htmlProducts +=
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
                            htmlProducts += 
                            `<div class="home-product-item__sale-off">
                                <span class="home-product-item__sale-off-percent">${Math.floor(data.products[i].dPerDiscount * 100)}%</span>
                                <span class="home-product-item__sale-off-label">GIẢM</span>
                            </div>`;
                        }
        htmlProducts += 
                    `</a>
                </div>
        `;
    }
    document.querySelectorAll(".home-product__list").forEach(e => {
        e.innerHTML = htmlProducts;
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
    xhr.open('post', '/product/similar/get-data', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);

            setProductItemSimilar(data);

            setPagination(data);
        }
    };
    xhr.send(formData);
}

function getQueryStr() {
    const url = window.location.href;
    const params = new URL(url).searchParams;
    const entries = new URLSearchParams(params).values();
    const array = Array.from(entries)
    return array[0];
}

function getQueryStr_2() {
    const url = window.location.href;
    const params = new URL(url).searchParams;
    const entries = new URLSearchParams(params).values();
    const array = Array.from(entries)
    return array[1];
}