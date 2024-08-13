let index = 0;
var rolar = true;
const sliderNumber = document.querySelectorAll(".banner-left-content__top-link");
const balls = document.querySelector(".banner-left-content__bottom-pagination");

for (let i = 0; i < sliderNumber.length; i++) {
    const div = document.createElement("div");
    div.id = i;
    balls.appendChild(div);
}
document.getElementById("0").classList.add("banner-circle-fill")

var pos = document.querySelectorAll(".banner-left-content__bottom-pagination div")

for (let i = 0; i < pos.length; i++) {
    pos[i].addEventListener('click', () => {
        index = pos[i].id;
        document.querySelector(".banner-left-content__top").style.right = index * 100 + "%";
        document.querySelector(".banner-circle-fill").classList.remove("banner-circle-fill");
        document.getElementById(index).classList.add("banner-circle-fill");
    });
}

function sliderAuto() {
    index = index + 1;
    if (index > sliderNumber.length - 1) {
        index = 0;
    }
    document.querySelector(".banner-left-content__top").style.right = index * 100 + "%";
    document.querySelector(".banner-circle-fill").classList.remove("banner-circle-fill");
    document.getElementById(index).classList.add("banner-circle-fill");
}

setInterval(sliderAuto, 3000)

// Next/Prev Banner
const btnNextBanner = document.querySelector(".banner-left-content__top-btn-icon-next");
const btnPrevBanner = document.querySelector(".banner-left-content__top-btn-icon-prev");

btnNextBanner.addEventListener('click', () => {
    index = index + 1;
    if (index > sliderNumber.length - 1) {
        index = 0;
    }
    document.querySelector(".banner-left-content__top").style.right = index * 100 + "%";
    document.querySelector(".banner-circle-fill").classList.remove("banner-circle-fill");
    document.getElementById(index).classList.add("banner-circle-fill");
});

btnPrevBanner.addEventListener('click', () => {
    index = index - 1;
    if (index <= 0) {
        index = sliderNumber.length - 1;
        document.querySelector(".banner-left-content__top").style.right = index * 100 + "%";
        document.querySelector(".banner-circle-fill").classList.remove("banner-circle-fill");
        document.getElementById(index).classList.add("banner-circle-fill");
    }
});

// Slider Category
const btnRightTwo = document.querySelector(".fa-arrow-right");
const btnLeftTwo = document.querySelector(".fa-arrow-left");
const categoryNumberTwo = document.querySelectorAll(".category-content-list");

btnRightTwo.addEventListener('click', () => {
    index = index + 1;
    if (index > categoryNumberTwo.length - 1) {
        index = 0;
    }
    document.querySelector(".category-content").style.right = index * 100 + "%";
});

btnLeftTwo.addEventListener('click', () => {
    index = index + 1;
    if (index > categoryNumberTwo.length - 1) {
        index = 0;
    }
    document.querySelector(".category-content").style.right = index * 100 + "%";
});

// Lấy dữ liệu (API)
function getDataHome() {
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/home/get-data', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);

            getStores(data);

            getParentCategories(data);

            getProducts(data);
            
        }
    }
    xhr.send(null);
}
getDataHome();

function getStores(data) {
    let htmlStores = "";
    htmlStores += data.stores.map((obj, index) => 
    `
                        <div class="col l-2 c-6 m-4">
                            <a href="/shop/${obj.pK_iStoreID}" class="store__item" id="store-item-${index}">
                                <div class="store__item-img" style="background-image: url(/img/${obj.sImageAvatar});">
                                    <div class="store__item-img-blur-bottom">
                                    </div>
                                    <div class="home-product-item__img-loading">
                                        <i class="uil uil-shopping-bag home-product-item__img-loading-icon"></i>
                                    </div>
                                </div>
                                <div class="store__item-mall">
                                    <div class="store__item-mall-img"
                                        style="background-image: url(/img/${obj.sImageLogo});">
                                        <div class="home-product-item__img-loading">

                                        </div>
                                    </div>
                                </div>
                                <div class="store__item-info">
                                    <div class="store__item-title">
                                        ${obj.sStoreName}
                                    </div>
                                    <div class="store__item-subtitle">
                                        ${obj.sStoreName}
                                    </div>
                                    <div class="store__item-info-loading">
                                        <div class="category-item__name-loading-line"></div>
                                        <div class="category-item__name-loading-line"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
    `).join('');
    document.querySelector(".home-store__list").innerHTML = htmlStores;

    let htmlStoresMobile = "";
    htmlStoresMobile += data.stores.map((obj, index) => 
    `
                        <div class="store__mobile-item" id="store-mobile-item-${index}">
                            <a href="/shop/${obj.pK_iStoreID}" class="store__mobile-item-link">
                                <div class="store__mobile-item-img"
                                    style="background-image: url(/img/${obj.sImageAvatar});">
                                    <div class="store__mobile-item-img-blur-bottom">
                                    </div>
                                    <div class="home-product-item__img-loading">
                                        <i class="uil uil-shopping-bag home-product-item__img-loading-icon"></i>
                                    </div>
                                </div>
                                <div class="store__mobile-item-mall">
                                    <div class="store__mobile-item-mall-img"
                                        style="background-image: url(/img/${obj.sImageLogo});">
                                        <div class="home-product-item__img-loading">

                                        </div>
                                    </div>
                                </div>
                                <div class="store__mobile-item-info">
                                    <div class="store__mobile-item-title">
                                        ${obj.sStoreName}
                                    </div>
                                    <div class="store__mobile-item-subtitle">
                                        ${obj.sStoreName}
                                    </div>
                                    <div class="store__item-info-loading">
                                        <div class="category-item__name-loading-line"></div>
                                        <div class="category-item__name-loading-line"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
    `).join('');
    document.querySelector(".store__mobile-list").innerHTML = htmlStoresMobile;
    loadingStores();
}

function loadingStores() {
    const loadingStoreName = document.querySelectorAll(".store__item-info-loading");
    const loadingProductImage = document.querySelectorAll(".home-product-item__img-loading");
    setTimeout(() => {
        for (let i = 0; i < loadingStoreName.length; i++) {
            loadingStoreName[i].style.display = 'none';
        }
        for (let i = 0; i < loadingProductImage.length; i++) {
            loadingProductImage[i].style.display = 'none';
        }
    }, 1000);
}

function getParentCategories(data) {
    let htmlParentCategory = "";
    htmlParentCategory += data.parentCategories.map(obj => `
        <li class="category-item-home">
            <a href="/product/index/${obj.pK_iParentCategoryID}" class="category-item-link">
                <div class="category-item__img" style="background-image: url(/img/${obj.sParentCategoryImage});">
                    <div class="category-item__img-loading">
                        <i class="uil uil-shopping-bag category-item__img-loading-icon"></i>
                    </div>
                </div>
                <div class="category-item__sub">
                    <div class="category-item__name">${obj.sParentCategoryName}</div>
                    <div class="category-item__name-loading">
                        <div class="category-item__name-loading-line"></div>
                        <div class="category-item__name-loading-line"></div>
                    </div>
                </div>
            </a>
        </li>
        `).join('');

    document.querySelector(".category-list").innerHTML = htmlParentCategory;

    let htmlParentCategoiesMobile = "";
    htmlParentCategoiesMobile += data.parentCategories.map((obj, index) => 
    `
                        <div class="category__mobile-item" id="category-mobile-item-${index}">
                            <a href="/product/index/${obj.pK_iParentCategoryID}" class="category__mobile-item-link">
                                <div class="category__mobile-item-img"
                                    style="background-image: url(/img/${obj.sParentCategoryImage});">
                                    <div class="store__item-img-blur-bottom">
                                    </div>
                                    <div class="category-item__img-loading">
                                        <i class="uil uil-shopping-bag category-item__img-loading-icon"></i>
                                    </div>
                                </div>
                                <div class="category__mobile-item-sub">
                                    <div class="category__mobile-item-name">${obj.sParentCategoryName}</div>
                                    <div class="category-item__name-loading">
                                        <div class="category-item__name-loading-line"></div>
                                        <div class="category-item__name-loading-line"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
    `
    ).join('');
    document.querySelector(".category__mobile-list").innerHTML = htmlParentCategoiesMobile;

    loadingCategoryItems();
}

function loadingCategoryItems() {
    // Lấy luôn thẻ khi api được gọi về
    const loadingCategoryName = document.querySelectorAll(".category-item__name-loading");
    const loadingCategoryImage = document.querySelectorAll(".category-item__img-loading");

    setTimeout(() => {
        for (let i = 0; i < loadingCategoryImage.length; i++) {
            loadingCategoryImage[i].style.display = 'none';
        }
        
        for (let i = 0; i < loadingCategoryName.length; i++) {
            loadingCategoryName[i].style.display = 'none';
        }
    }, 1000);
}

function getProducts(data) {
    let htmlProducts = "";
    for (let i = 0; i < data.products.length; i++) {
        if (data.products[i].dPerDiscount == 1) {
            htmlProducts += 
            `
                            <div class="col l-2 c-6 m-4">
                                <div class="home-item">
                                    <a class="home-product-item" href="/product/detail/${data.products[i].pK_iProductID}">
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
                                    <a href="/product/similar/${data.products[i].pK_iProductID}/${data.products[i].fK_iCategoryID}" class="home-product-item__find-similar-link">Tìm sản phẩm tương tự</a>
                                </div>
                            </div>
            `;
        } else {
            htmlProducts += 
            `
                            <div class="col l-2 c-6 m-4">
                                <div class="home-item">
                                    <a class="home-product-item" href="/product/detail/${data.products[i].pK_iProductID}">
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
                                    <a href="/product/similar/${data.products[i].pK_iProductID}/${data.products[i].fK_iCategoryID}" class="home-product-item__find-similar-link">Tìm sản phẩm tương tự</a>
                                </div>
                            </div>
            `;
        }
    }
    document.querySelector(".product__container").innerHTML = htmlProducts;

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

// Toggle active voucher 
setInterval(() => {
    document.querySelectorAll(".banner__voucher-day").forEach(e => {
        e.classList.toggle("active");
    });
}, 1000);

// Fix Suggest Bar
window.addEventListener('scroll', () => {
    const y = this.pageYOffset;
    if (y > 1100) {
        //console.log(y);
        document.querySelector(".suggest__header").classList.add("scroll");
    } else {
        document.querySelector(".suggest__header").classList.remove("scroll");
    }
});
