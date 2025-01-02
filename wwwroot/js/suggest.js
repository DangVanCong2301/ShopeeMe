function getAPISuggest() {
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/home/suggest', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);

            getProducts(data);

            getPagination(data);
        }
    };
    xhr.send(null);
}
getAPISuggest();

function getProducts(data) {
    let htmlProducts = "";
    for (let i = 0; i < data.products.length; i++) {
        if (data.products[i].dPerDiscount == 1) {
            htmlProducts += 
            `
                            <div class="col l-2 c-6 m-4">
                                <div class="home-item">
                                    <a class="home-product-item" href="/product/detail?id=${data.products[i].pK_iProductID}">
                                        <div class="home-product-item__img" style="background-image: url(/img/${data.products[i].sImageUrl});">
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
                                        <div class="home-product-item__price">
                                            <span class="home-product-item__price-current">
                                                ${money(data.products[i].dPrice)} đ
                                                <div class="home-product-item__price-current-loading"></div>
                                            </span>
                                        </div>
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
                                        </div>
                                    </a>
                                    <div class="home-product-item__find-similar">
                                    </div>
                                    <a href="/product/similar?productID=${data.products[i].pK_iProductID}&categoryID=${data.products[i].fK_iCategoryID}" class="home-product-item__find-similar-link">Tìm sản phẩm tương tự</a>
                                </div>
                            </div>
            `;
        } else {
            htmlProducts += 
            `
                            <div class="col l-2 c-6 m-4">
                                <div class="home-item">
                                    <a class="home-product-item" href="/product/detail?id=${data.products[i].pK_iProductID}">
                                        <div class="home-product-item__img" style="background-image: url(/img/${data.products[i].sImageUrl});">
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
                                        <div class="home-product-item__price">
                                            <span class="home-product-item__price-old">
                                                ${money(data.products[i].dPrice)} đ
                                                <div class="home-product-item__price-old-loading"></div>
                                            </span>
                                            <span class="home-product-item__price-current">
                                                ${money((data.products[i].dPrice * (1 - data.products[i].dPerDiscount)))} đ
                                                <div class="home-product-item__price-current-loading"></div>
                                            </span>
                                        </div>
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
                                        </div>
                                        <div class="home-product-item__sale-off">
                                            <span class="home-product-item__sale-off-percent">${Math.floor(data.products[i].dPerDiscount * 100)}%</span>
                                            <span class="home-product-item__sale-off-label">GIẢM</span>
                                        </div>
                                    </a>
                                    <a href="/product/similar?productID=${data.products[i].pK_iProductID}&categoryID=${data.products[i].fK_iCategoryID}" class="home-product-item__find-similar-link">Tìm sản phẩm tương tự</a>
                                </div>
                            </div>
            `;
        }
    }
    document.querySelector(".home-product__list").innerHTML = htmlProducts;

    loadingProducts();
}

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

function getPagination(data) {
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
    xhr.open('post', '/home/suggest', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);

            getProducts(data);
            getPagination(data);
        }
    };
    xhr.send(formData);
}