const shopMobileTitle = document.querySelectorAll(".shop__mobile-title-item");

// Auto Run Slider
let index = 0;

const dot = document.querySelectorAll(".shop__info-slider-dot span");
// Dot click
for (let i = 0; i < dot.length; i++) {
    dot[i].addEventListener('click', () => {
        index = dot[i].id;
        document.querySelector(".shop__info-slider-list").style.right = index * 100 + "%"; 
        document.querySelector(".slider-shop-cirle-fill").classList.remove("slider-shop-cirle-fill");
        document.getElementById(index).classList.add("slider-shop-cirle-fill");
    });
}

function sliderShopAuto() {
    const sliderShopNumber = document.querySelectorAll(".shop__info-slider-item");
    setInterval(() => {
        index = index + 1;
        if (index > sliderShopNumber.length - 1) {
            index = 0;
        }
        document.querySelector(".shop__info-slider-list").style.right = index * 100 + "%"; 
        document.querySelector(".slider-shop-cirle-fill").classList.remove("slider-shop-cirle-fill");
        document.getElementById(index).classList.add("slider-shop-cirle-fill");
    }, 3000);
}
//setInterval(sliderShopAuto, 3000);

// Next/Prev Slider Shop
const btnNextSliderShop = document.querySelector(".shop__info-slider-arrow-next");
const btnPrevSliderShop = document.querySelector(".shop__info-slider-arrow-prev");

btnNextSliderShop.addEventListener('click', () => {
    index = index + 1;
    if (index > sliderShopNumber.length - 1) {
        index = 0;
    }
    document.querySelector(".shop__info-slider-list").style.right = index * 100 + "%"; 
    document.querySelector(".slider-shop-cirle-fill").classList.remove("slider-shop-cirle-fill");
    document.getElementById(index).classList.add("slider-shop-cirle-fill");
});

btnPrevSliderShop.addEventListener('click', () => {
    index = index - 1;
    if (index <= 0) {
        index = sliderShopNumber.length - 1;
    }
    document.querySelector(".shop__info-slider-list").style.right = index * 100 + "%"; 
    document.querySelector(".slider-shop-cirle-fill").classList.remove("slider-shop-cirle-fill");
    document.getElementById(index).classList.add("slider-shop-cirle-fill");
});

function getData() {
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/shop/get-data', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);

            getShopInfo(data);

            getSlidersShop(data);

            getShopTab(data);

            getProducts(data);

            getCategoriesTab(data);

            getPagination(data);
        }
    };
    xhr.send(null);
}
getData();

function getShopInfo(data) {
    let htmlShopMobile = "";
    htmlShopMobile += `
            <div class="shop__mobile-info" style="background-image: url(/img/${data.stores[0].sImageBackground});">
                <div class="shop__mobile-info-avatar">
                    <div class="shop__mobile-info-avatar-img" style="background-image: url(/img/${data.stores[0].sImageAvatar});"></div>
                    <div class="shop__mobile-info-avatar-favorite">
                        <span>Yêu thích</span>
                    </div>
                </div>
                <div class="shop__mobile-info-shop">
                    <div class="shop__mobile-info-shop-name">
                        <span>${data.stores[0].sStoreName}</span>
                        <i class="uil uil-angle-right-b shop__mobile-info-shop-name-arrow"></i>
                    </div>
                    <div class="shop__mobile-info-shop-statistical">
                        <div class="shop__mobile-info-shop-statistical-rate">
                            <i class="uis uis-star shop__mobile-info-shop-statistical-rate-icon"></i>
                            <span>4.6 (26,6k đánh giá)</span>
                        </div>
                        <div class="shop__mobile-info-shop-statistical-monitor">
                            2,4k người theo dõi
                        </div>
                    </div>
                </div>
                <div class="shop__mobile-info-btns">
                    <div class="shop__mobile-info-btn-monitor">
                        <i class="uil uil-plus shop__mobile-info-btn-monitor-icon"></i>
                        <span>Theo dõi</span>
                    </div>
                    <div class="shop__mobile-info-btn-chat">
                        <i class="uil uil-chat shop__mobile-info-btn-chat-icon"></i>
                        <span>Chat</span>
                    </div>
                </div>
            </div>
    `;
    document.querySelector(".shop__mobile-detail").innerHTML = htmlShopMobile;

    let htmlShopDestopDesc = data.stores[0].sDesc;
    document.querySelector(".shop__info-desc").innerHTML = htmlShopDestopDesc;

    let htmlShopDestop = "";
    htmlShopDestop += 
    `
                        <div class="shop__header-store" style="background-image: url(/img/${data.stores[0].sImageBackground});">
                            <div class="shop__header-store-info">
                                <div class="shop__header-store-info-img"
                                    style="background-image: url(/img/${data.stores[0].sImageAvatar});">
                                    <span>Yêu thích</span>
                                </div>
                                <div class="shop__header-store-info-desc">
                                    <div class="shop__header-store-info-name">${data.stores[0].sStoreName}</div>
                                    <div class="shop__header-store-info-online">Online 19 phút trước</div>
                                </div>
                            </div>
                            <div class="shop__header-store-btns">
                                <div class="shop__header-store-btn">
                                    <i class="uil uil-plus shop__header-store-btn-icon"></i>
                                    <span>Theo dõi</span>
                                </div>
                                <div class="shop__header-store-btn">
                                    <i class="uil uil-chat shop__header-store-btn-icon"></i>
                                    <span>Chat</span>
                                </div>
                            </div>
                        </div>
    `;
    document.querySelector(".shop__header-detail").innerHTML = htmlShopDestop;
}

function getSlidersShop(data) {
    let htmlSlidersShop = "";
    htmlSlidersShop += data.slidersShop.map((obj, index) => 
    `
        <div class="shop__info-slider-item" style="background-image: url(/img/${obj.sImageSlider});">

        </div>             
    `
    ).join('');
    document.querySelector(".shop__info-slider-list").innerHTML = htmlSlidersShop;
    addDotsSlider();
    sliderShopAuto();
}

function addDotsSlider() {
    const sliderShopNumber = document.querySelectorAll(".shop__info-slider-item");
    const dots = document.querySelector(".shop__info-slider-dot");

    for (let i = 0; i < sliderShopNumber.length; i++) {
        const span = document.createElement("span");
        span.id = i;
        dots.appendChild(span);
    }
    document.getElementById("0").classList.add("slider-shop-cirle-fill");
}

function getShopTab(data) {
    document.querySelector(".shop__mobile-description").innerHTML = data.stores[0].sDesc;

    // Category 1
    let htmlCategories1 = "";
    htmlCategories1 += " <div class='shop__mobile-shop-category-item'>";
    htmlCategories1 += "     <div class='shop__mobile-shop-category-item-header'>";
    htmlCategories1 += "         <div class='shop__mobile-shop-category-item-name'>" + data.categories[0].sCategoryName + "</div>";
    htmlCategories1 += "         <a href='#' class='shop__mobile-shop-category-item-view-more'>";
    htmlCategories1 += "             <span>Xem tất cả</span>";
    htmlCategories1 += "             <i class='uil uil-angle-right-b shop__mobile-shop-category-item-view-more-icon'></i>";
    htmlCategories1 += "         </a>";
    htmlCategories1 += "     </div>";
    htmlCategories1 += "     <div class='shop__mobile-shop-category-product'>";
    htmlCategories1 += "         <div class='shop__mobile-shop-category-product-list'>";
    for (let i = 0; i < data.products.length; i++) {
        if (data.products[i].fK_iCategoryID === data.categories[0].pK_iCategoryID) {
            //console.log(data.products[i]);
            htmlCategories1 += "             <a href='/product/detail/" + data.products[i].pK_iProductID + "' class='shop__mobile-shop-category-product-item'>";
            htmlCategories1 += "                 <div class='shop__mobile-shop-category-product-item-img' style='background-image: url(/img/" + data.products[i].sImageUrl + ");'></div>";
            htmlCategories1 += "                 <div class='shop__mobile-shop-category-product-item-name'>" + data.products[i].sProductName + "</div>";
            htmlCategories1 += "                 <div class='shop__mobile-shop-category-product-item-price'>" + data.products[i].dPrice + "đ</div>";
            htmlCategories1 += "                 <div class='shop__mobile-shop-category-product-item-statistical'>";
            htmlCategories1 += "                     <div class='shop__mobile-shop-category-product-item-stars'>";
            htmlCategories1 += "                         <i class='uis uis-star shop__mobile-shop-category-product-item-star'></i>";
            htmlCategories1 += "                         <i class='uis uis-star shop__mobile-shop-category-product-item-star'></i>";
            htmlCategories1 += "                         <i class='uis uis-star shop__mobile-shop-category-product-item-star'></i>";
            htmlCategories1 += "                         <i class='uis uis-star shop__mobile-shop-category-product-item-star'></i>";
            htmlCategories1 += "                         <i class='uis uis-star shop__mobile-shop-category-product-item-star'></i>";
            htmlCategories1 += "                     </div>";
            htmlCategories1 += "                     <div class='shop__mobile-shop-category-product-item-sold'>Đã bán 120</div>";
            htmlCategories1 += "                 </div>";
            htmlCategories1 += "                 <div class='shop__mobile-shop-category-product-item-favourite'>";
            htmlCategories1 += "                     <i class='fas fa-check shop__mobile-shop-category-product-item-favourite-icon'></i>";
            htmlCategories1 += "                     <span>Yêu thích</span>";
            htmlCategories1 += "                 </div>";
            htmlCategories1 += "             </a>";
        }
    }
    htmlCategories1 += "         </div>";
    htmlCategories1 += "     </div>";
    htmlCategories1 += " </div>";

    document.querySelector(".shop__mobile-shop-category-item-1").innerHTML = htmlCategories1;

    // Category 2
    let htmlCategories2 = "";
    if (data.categories[1] != null) {
        htmlCategories2 += " <div class='shop__mobile-shop-category-item'>";
        htmlCategories2 += "     <div class='shop__mobile-shop-category-item-header'>";
        htmlCategories2 += "         <div class='shop__mobile-shop-category-item-name'>" + data.categories[1].sCategoryName + "</div>";
        htmlCategories2 += "         <a href='#' class='shop__mobile-shop-category-item-view-more'>";
        htmlCategories2 += "             <span>Xem tất cả</span>";
        htmlCategories2 += "             <i class='uil uil-angle-right-b shop__mobile-shop-category-item-view-more-icon'></i>";
        htmlCategories2 += "         </a>";
        htmlCategories2 += "     </div>";
        htmlCategories2 += "     <div class='shop__mobile-shop-category-product'>";
        htmlCategories2 += "         <div class='shop__mobile-shop-category-product-list'>";
        for (let i = 0; i < data.products.length; i++) {
            if (data.products[i].fK_iCategoryID === data.categories[1].pK_iCategoryID) {
                htmlCategories2 += "             <a href='/product/detail/" + data.products[i].pK_iProductID + "' class='shop__mobile-shop-category-product-item'>";
                htmlCategories2 += "                 <div class='shop__mobile-shop-category-product-item-img' style='background-image: url(/img/" + data.products[i].sImageUrl + ");'></div>";
                htmlCategories2 += "                 <div class='shop__mobile-shop-category-product-item-name'>" + data.products[i].sProductName + "</div>";
                htmlCategories2 += "                 <div class='shop__mobile-shop-category-product-item-price'>" + data.products[i].dPrice + "đ</div>";
                htmlCategories2 += "                 <div class='shop__mobile-shop-category-product-item-statistical'>";
                htmlCategories2 += "                     <div class='shop__mobile-shop-category-product-item-stars'>";
                htmlCategories2 += "                         <i class='uis uis-star shop__mobile-shop-category-product-item-star'></i>";
                htmlCategories2 += "                         <i class='uis uis-star shop__mobile-shop-category-product-item-star'></i>";
                htmlCategories2 += "                         <i class='uis uis-star shop__mobile-shop-category-product-item-star'></i>";
                htmlCategories2 += "                         <i class='uis uis-star shop__mobile-shop-category-product-item-star'></i>";
                htmlCategories2 += "                         <i class='uis uis-star shop__mobile-shop-category-product-item-star'></i>";
                htmlCategories2 += "                     </div>";
                htmlCategories2 += "                     <div class='shop__mobile-shop-category-product-item-sold'>Đã bán 120</div>";
                htmlCategories2 += "                 </div>";
                htmlCategories2 += "                 <div class='shop__mobile-shop-category-product-item-favourite'>";
                htmlCategories2 += "                     <i class='fas fa-check shop__mobile-shop-category-product-item-favourite-icon'></i>";
                htmlCategories2 += "                     <span>Yêu thích</span>";
                htmlCategories2 += "                 </div>";
                htmlCategories2 += "             </a>";
            }
        }
        htmlCategories2 += "         </div>";
        htmlCategories2 += "     </div>";
        htmlCategories2 += " </div>";
    }

    document.querySelector(".shop__mobile-shop-category-item-2").innerHTML = htmlCategories2;

    // Category 2
    let htmlCategories3 = "";
    if (data.categories[2] != null) {
        htmlCategories3 += " <div class='shop__mobile-shop-category-item'>";
        htmlCategories3 += "     <div class='shop__mobile-shop-category-item-header'>";
        htmlCategories3 += "         <div class='shop__mobile-shop-category-item-name'>" + data.categories[2].sCategoryName + "</div>";
        htmlCategories3 += "         <a href='#' class='shop__mobile-shop-category-item-view-more'>";
        htmlCategories3 += "             <span>Xem tất cả</span>";
        htmlCategories3 += "             <i class='uil uil-angle-right-b shop__mobile-shop-category-item-view-more-icon'></i>";
        htmlCategories3 += "         </a>";
        htmlCategories3 += "     </div>";
        htmlCategories3 += "     <div class='shop__mobile-shop-category-product'>";
        htmlCategories3 += "         <div class='shop__mobile-shop-category-product-list'>";
        for (let i = 0; i < data.products.length; i++) {
            if (data.products[i].fK_iCategoryID === data.categories[2].pK_iCategoryID) {
                //console.log(data.products[i]);
                htmlCategories3 += "             <a href='/product/detail/" + data.products[i].pK_iProductID + "' class='shop__mobile-shop-category-product-item'>";
                htmlCategories3 += "                 <div class='shop__mobile-shop-category-product-item-img' style='background-image: url(/img/" + data.products[i].sImageUrl + ");'></div>";
                htmlCategories3 += "                 <div class='shop__mobile-shop-category-product-item-name'>" + data.products[i].sProductName + "</div>";
                htmlCategories3 += "                 <div class='shop__mobile-shop-category-product-item-price'>" + data.products[i].dPrice + "đ</div>";
                htmlCategories3 += "                 <div class='shop__mobile-shop-category-product-item-statistical'>";
                htmlCategories3 += "                     <div class='shop__mobile-shop-category-product-item-stars'>";
                htmlCategories3 += "                         <i class='uis uis-star shop__mobile-shop-category-product-item-star'></i>";
                htmlCategories3 += "                         <i class='uis uis-star shop__mobile-shop-category-product-item-star'></i>";
                htmlCategories3 += "                         <i class='uis uis-star shop__mobile-shop-category-product-item-star'></i>";
                htmlCategories3 += "                         <i class='uis uis-star shop__mobile-shop-category-product-item-star'></i>";
                htmlCategories3 += "                         <i class='uis uis-star shop__mobile-shop-category-product-item-star'></i>";
                htmlCategories3 += "                     </div>";
                htmlCategories3 += "                     <div class='shop__mobile-shop-category-product-item-sold'>Đã bán 120</div>";
                htmlCategories3 += "                 </div>";
                htmlCategories3 += "                 <div class='shop__mobile-shop-category-product-item-favourite'>";
                htmlCategories3 += "                     <i class='fas fa-check shop__mobile-shop-category-product-item-favourite-icon'></i>";
                htmlCategories3 += "                     <span>Yêu thích</span>";
                htmlCategories3 += "                 </div>";
                htmlCategories3 += "             </a>";
            }
        }
        htmlCategories3 += "         </div>";
        htmlCategories3 += "     </div>";
        htmlCategories3 += " </div>";
    }

    document.querySelector(".shop__mobile-shop-category-item-3").innerHTML = htmlCategories3;

    // Product Suggess
    let htmlTop10ProductSuggest = "";
    htmlTop10ProductSuggest += data.top10SuggestProducts.map((obj, index) => `
            <div class="col l-2-4 c-6 m-4">
                <a class="home-product-item" href="/product/detail/${obj.pK_iProductID}">
                    <div class="home-product-item__img" style="background-image: url(/img/${obj.sImageUrl})">
                        <div class="home-product-item__img-loading">
                            <i class="uil uil-shopping-bag home-product-item__img-loading-icon"></i>
                        </div>
                    </div>
                    <h4 class="home-product-item__name">
                        ${obj.sProductName}
                        <div class="home-product-item__name-loading">
                            <div class="home-product-item__name-loading-line"></div>
                            <div class="home-product-item__name-loading-line"></div>
                        </div>
                    </h4>
                    <div class="home-product-item__price">
                        <span class="home-product-item__price-old">
                            1.200 000đ
                            <div class="home-product-item__price-old-loading"></div>
                        </span>
                        <span class="home-product-item__price-current">
                            ${money(obj.dPrice)} đ
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
                            ${obj.sStoreName}
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
                        <span class="home-product-item__sale-off-percent">53%</span>
                        <span class="home-product-item__sale-off-label">GIẢM</span>
                    </div>
                </a>
            </div>
            `).join('');
    document.querySelector(".home-product__list").innerHTML = htmlTop10ProductSuggest;
    loadingSuggestProducts();

    let htmlTop3Selling = "";
    htmlTop3Selling += data.top3SellingProducts.map((obj, index) => `
            <div class="shop__mobile-shop-selling-item">
               <a href="/product/detail/${obj.pK_iProductID}" class="shop__mobile-shop-selling-link">
                    <div class="shop__mobile-shop-selling-link-img"
                        style="background-image: url(/img/${obj.sImageUrl});">
                        <div class="shop__mobile-shop-selling-link-img-top top-${index + 1}">
                            <div class="shop__mobile-shop-selling-link-img-top-text">TOP</div>
                            <div class="shop__mobile-shop-selling-link-img-top-numb">${index + 1}</div>
                        </div>
                    </div>         
                    <div class="shop__mobile-shop-selling-link-desc">
                        <div class="shop__mobile-shop-selling-link-desc-name">
                            ${obj.sProductName}
                        </div>
                        <div class="shop__mobile-shop-selling-link-desc-price">${money(obj.dPrice)}đ</div>
                    </div>
                </a>         
            </div>
            `).join('');
    document.querySelector(".shop__mobile-shop-selling-list").innerHTML = htmlTop3Selling;

    let htmlTop10Selling = "";
    htmlTop10Selling += data.top10SellingProducts.map((obj, index) => `
            <div class="shop__mobile-shop-selling-item">
               <a href="/product/detail/${obj.pK_iProductID}" class="shop__mobile-shop-selling-link">
                    <div class="shop__mobile-shop-selling-link-img"
                        style="background-image: url(/img/${obj.sImageUrl});">
                        <div class="shop__mobile-shop-selling-link-img-top top-${index + 1}">
                            <div class="shop__mobile-shop-selling-link-img-top-text">TOP</div>
                            <div class="shop__mobile-shop-selling-link-img-top-numb">${index + 1}</div>
                        </div>
                    </div>         
                    <div class="shop__mobile-shop-selling-link-desc">
                        <div class="shop__mobile-shop-selling-link-desc-name">
                            ${obj.sProductName}
                        </div>
                        <div class="shop__mobile-shop-selling-link-desc-price">${money(obj.dPrice)}đ</div>
                    </div>
                </a>         
            </div>
            `).join('');
    document.querySelector(".shop__mobile-shop-view-more-modal-body-product-selling").innerHTML = htmlTop10Selling;

    let htmlTop10GoodPrice = "";
    htmlTop10GoodPrice += data.top10GoodPriceProducts.map((obj, index) => `
            <div class="shop__mobile-shop-selling-item">
               <a href="/product/detail/${obj.pK_iProductID}" class="shop__mobile-shop-selling-link">
                    <div class="shop__mobile-shop-selling-link-img"
                        style="background-image: url(/img/${obj.sImageUrl});">
                        <div class="shop__mobile-shop-selling-link-img-top top-${index + 1}">
                            <div class="shop__mobile-shop-selling-link-img-top-text">TOP</div>
                            <div class="shop__mobile-shop-selling-link-img-top-numb">${index + 1}</div>
                        </div>
                    </div>         
                    <div class="shop__mobile-shop-selling-link-desc">
                        <div class="shop__mobile-shop-selling-link-desc-name">
                            ${obj.sProductName}
                        </div>
                        <div class="shop__mobile-shop-selling-link-desc-price">${money(obj.dPrice)}đ</div>
                    </div>
                </a>         
            </div>
            `).join('');
    document.querySelector(".shop__mobile-shop-view-more-modal-body-product-good-price").innerHTML = htmlTop10GoodPrice;
}

function getProducts(data) {
    let htmlProducts = "";
    for (let i = 0; i < data.products.length; i++) {
        htmlProducts += 
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
        htmlProducts += 
                            `<span class="home-product-item__price-old">
                                ${data.products[i].dPrice}
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
    xhr.open('post', '/shop/get-data', true);
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

function getCategoriesTab(data) {
    let htmlCategories = "";
    htmlCategories += `<div class="shop__mobile-category-list">`;
    htmlCategories += data.categories.map((obj, index) => `
                <div class="shop__mobile-category-item">
                    <a href="#" class="shop__mobile-category-item-link">
                        <div class="shop__mobile-category-item-img"
                            style="background-image: url(/img/${obj.sCategoryImage});"></div>
                        <div class="shop__mobile-category-item-info">
                            <div class="shop__mobile-category-item-name">${obj.sCategoryName}</div>
                            <div class="shop__mobile-category-item-quantity">(${obj.iProductCount})</div>
                        </div>
                        <i class="uil uil-angle-right-b shop__mobile-category-item-arrow"></i>
                    </a>
                </div>
    `).join('');
    htmlCategories += `</div>`;
    var totalProduct = data.categories.reduce((total, product) => {
        return total + product.iProductCount;
    }, 0);
    htmlCategories += 
    `
            <a href="#" class="shop__mobile-category-total">
                <div class="shop__mobile-category-total-name">Sản phẩm</div>
                <div class="shop__mobile-category-total-quantity">(${totalProduct})</div>
                <i class="uil uil-angle-right-b shop__mobile-category-item-arrow"></i>
            </a>
    `;
    document.querySelector(".shop__mobile-category").innerHTML = htmlCategories;
}

for (let i = 0; i < shopMobileTitle.length; i++) {
    shopMobileTitle[i].addEventListener('click', () => {
        if (i == 0) {
            addShopMobileShop(i);
        } else if (i == 1) {
            addShopMobileProduct(i);
        } else if (i == 2) {
            addShopMobileCategory(i);
        }
    });
}

function addShopMobileShop(i) {
    shopMobileTitle[i].classList.add("active");
    shopMobileTitle[1].classList.remove("active");
    shopMobileTitle[2].classList.remove("active");
    document.querySelector(".shop__mobile-shop").classList.remove("hide-on-mobile");
    document.querySelector(".shop__mobile-product").classList.add("hide-on-mobile");
    document.querySelector(".shop__mobile-category").classList.add("hide-on-mobile");
    document.querySelector(".header__sort-bar").classList.add("hide-on-mobile");
}

function loadingSuggestProducts() {
    // Load Progress
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

function addShopMobileProduct(i) {
    shopMobileTitle[0].classList.remove("active");
    shopMobileTitle[i].classList.add("active");
    shopMobileTitle[2].classList.remove("active");
    document.querySelector(".shop__mobile-shop").classList.add("hide-on-mobile");
    document.querySelector(".shop__mobile-product").classList.remove("hide-on-mobile");
    document.querySelector(".shop__mobile-category").classList.add("hide-on-mobile");
    document.querySelector(".header__sort-bar").classList.remove("hide-on-mobile");
}

function addShopMobileCategory(i) {
    shopMobileTitle[0].classList.remove("active");
    shopMobileTitle[1].classList.remove("active");
    shopMobileTitle[i].classList.add("active");
    document.querySelector(".shop__mobile-shop").classList.add("hide-on-mobile");
    document.querySelector(".shop__mobile-product").classList.add("hide-on-mobile");
    document.querySelector(".shop__mobile-category").classList.remove("hide-on-mobile");
    document.querySelector(".header__sort-bar").classList.add("hide-on-mobile");
}

function tonglePrice() {
    document.querySelector(".header__sort-link-icon").classList.add("uil-arrow-up");
    document.querySelector(".header__sort-link-icon").classList.toggle("uil-arrow-down")
}

function openModalOrderMe() {
    document.querySelector(".header__mobile-more-modal").classList.add("open");
}

window.addEventListener('click', (e) => {
    if (e.target == document.querySelector(".header__mobile-more-modal")) {
        document.querySelector(".header__mobile-more-modal").classList.remove("open");
    }
});

window.addEventListener('scroll', () => {
    const y = this.pageYOffset;
    if (y > 80) {
        document.querySelector(".shop__mobile-header").classList.add("scroll");
    } else {
        document.querySelector(".shop__mobile-header").classList.remove("scroll");
    }
});

// View More Modal
function openViewMoreModal() {
    document.querySelector(".shop__mobile-shop-view-more-modal").classList.add("open");
}

function closeViewMoreModal() {
    document.querySelector(".shop__mobile-shop-view-more-modal").classList.remove("open");
}

// View More Body Options
const viewModalBodyTitle = document.querySelectorAll(".shop__mobile-shop-view-more-modal-body-title");
for (let i = 0; i < viewModalBodyTitle.length; i++) {
    viewModalBodyTitle[i].addEventListener('click', () => {
        if (i == 0) {
            viewModalBodyTitle[0].classList.add("active");
            viewModalBodyTitle[1].classList.remove("active");
            document.querySelector(".shop__mobile-shop-view-more-modal-body-product-selling").classList.remove("hide-on-mobile");
            document.querySelector(".shop__mobile-shop-view-more-modal-body-product-good-price").classList.add("hide-on-mobile");
        } else if (i == 1) {
            viewModalBodyTitle[0].classList.remove("active");
            viewModalBodyTitle[1].classList.add("active");
            document.querySelector(".shop__mobile-shop-view-more-modal-body-product-selling").classList.add("hide-on-mobile");
            document.querySelector(".shop__mobile-shop-view-more-modal-body-product-good-price").classList.remove("hide-on-mobile");
        }
    });
}