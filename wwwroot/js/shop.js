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

function getAPIShop() {
    let userID = getCookies("userID");
    if (userID == undefined) {
        userID = 0;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('get', '/shop/get-data?name=' + getQueryStr() + '&userID=' + userID + '', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);

            getShopInfo(data);

            getSlidersShop(data);

            getShopTab(data);

            setCategories(data);

            getProducts(data);

            getCategoriesTab(data);

            getPagination(data);

            setDataMobile(data);

            setChatBtn(data);

            setDataChat(data);
        }
    };
    xhr.send(null);
}
getAPIShop();

function setDataMobile(data) {
    
}

function getShopInfo(data) {
    let htmlShopMobile = "";
    htmlShopMobile += `
            <div class="shop__mobile-info" style="background-image: url(/img/${data.stores[0].sImageBackground});">
                <div class="shop__mobile-info-avatar">
                    <div class="shop__mobile-info-avatar-img" style="background-image: url(/img/${data.stores[0].sImageAvatar});"></div>
                    <div class="shop__mobile-info-avatar-favorite">
                        <p>Yêu thích</p>
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
                                </div>`;
                                if (data.makeFriends.length == 0) {
                                    htmlShopDestop += 
                                `<div class="shop__header-store-btn shop__header-store-btn-make">
                                    <i class="uil uil-chat shop__header-store-btn-icon"></i>
                                    <span>Kết bạn</span>
                                </div>`;
                                } else if (data.makeFriends.length != 0 && data.makeFriends[0].iMakeStatusCode == 0) {
                                htmlShopDestop += `
                                <div class="shop__header-store-btn">
                                    <i class="uil uil-chat shop__header-store-btn-icon"></i>
                                    <span>Đã gửi kết bạn</span>
                                </div>`;
                                } else {
                                    htmlShopDestop += 
                                `<div class="shop__header-store-btn shop__header-store-btn-chat">
                                    <i class="uil uil-chat shop__header-store-btn-icon"></i>
                                    <span>Chat</span>
                                </div>`;
                                }
                            htmlShopDestop += `    
                            </div>
                        </div>
    `;
    document.querySelector(".shop__header-detail").innerHTML = htmlShopDestop;

    if (data.makeFriends.length == 0) {
        document.querySelector(".shop__header-store-btn-make").addEventListener("click", () => {
            sendMakeFriendModal(data);
        });
    }

    if (data.makeFriends.length != 0 && data.makeFriends[0].iMakeStatusCode == 1) {
        document.querySelector(".shop__header-store-btn-chat").addEventListener("click", () => {
            displayChat();
        });
    }
}

// Send Make Friend
function sendMakeFriendModal(data) {
    openModal();
    document.querySelector(".modal__body").innerHTML = 
            `
                <div class="modal__confirm">
                    <div class="modal__confirm-header">
                        <div class="modal__confirm-title">Thông báo</div>
                    </div>
                    <div class="modal__confirm-desc">
                        Bạn chưa kết bạn với shop này, gửi lời kết bạn tới <b>${data.stores[0].sStoreName}</b>?
                    </div>
                    <div class="modal__confirm-btns">
                        <div class="modal__confirm-btn-destroy" onclick="closeModal()">Huỷ</div>
                        <div class="modal__confirm-btn-send"onclick="sendMakeFriend(${data.stores[0].fK_iSellerID})">Đồng ý</div>
                    </div>
                </div>
            `;
}

function sendMakeFriend(sellerID) {
    document.querySelector(".modal__body").innerHTML = 
            `
                <div class="spinner"></div>
            `;
    var formData = new FormData();
    formData.append("sellerID", sellerID);

    var xhr = new XMLHttpRequest();
    xhr.open('post', '/shop/send-make-friend', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);

            if (data.status.statusCode == -1) {
                document.querySelector(".modal__body").innerHTML = 
                `
                <div class="modal__confirm">
                    <div class="modal__confirm-header">
                        <div class="modal__confirm-title">Thông báo</div>
                    </div>
                    <div class="modal__confirm-desc">
                        ${data.status.message}
                    </div>
                    <div class="modal__confirm-btns">
                        <div class="modal__confirm-btn-destroy" onclick="closeModal()">Huỷ</div>
                        <a href="/user/login" class="modal__confirm-btn-send">Đăng nhập</a>
                    </div>
                </div>
                `;
            } else {
                setTimeout(() => {
                    closeModal();
                    toast({ title: "Thông báo", msg: `${data.status.message}`, type: "success", duration: 5000 });
                    document.querySelector(".modal__body").innerHTML = "";
                    setTimeout(() => {
                        
                    }, 1000)
                }, 2000);
            }
            
        };
    };
    xhr.send(formData);
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
            htmlCategories1 += "                 <div class='shop__mobile-shop-category-product-item-price'>" + money_2(data.products[i].dPrice) + "</div>";
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
                htmlCategories2 += "                 <div class='shop__mobile-shop-category-product-item-price'>" + money_2(data.products[i].dPrice) + "</div>";
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
                htmlCategories3 += "                 <div class='shop__mobile-shop-category-product-item-price'>" + money_2(data.products[i].dPrice) + "</div>";
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
                <a class="home-product-item" href="/product/detail?id=${obj.pK_iProductID}">
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
// Set Category
function setCategories(data) {
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

// Lọc sản phẩm theo mã danh mục con
function filterProductByCategoryID(categoryID) {
    closeNavMenu();
    let userID = getCookies("userID");
    if (userID == undefined) {
        userID = 0;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('get', '/shop/get-data?name=' + getQueryStr() + '&userID=' + userID + '&categoryID=' + categoryID +'', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);

            setActiveCategories(data);

            getProducts(data);

            getPagination(data);
        }
    };
    xhr.send();
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

// Set Product
function getProducts(data) {
    let htmlProducts = "";
    for (let i = 0; i < data.products.length; i++) {
        htmlProducts += 
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
        htmlProducts += 
                            `<span class="home-product-item__price-old">
                                ${money_2(data.products[i].dPrice)}
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
    let userID = getCookies("userID");
    if (userID == undefined) {
        userID = 0;
    }
    
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/shop/get-data?name=' + getQueryStr() + '&userID=' + userID + '&currentPage=' + currentPage + '', true);
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

function sortPrice(sortType) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/shop/sort-price?name=' + getQueryStr() + '&sortType=' + sortType + '', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);

            getProducts(data);
            
        }
    };
    xhr.send(null);
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

// Set Chat
function setChatBtn(data) {
    if (data.userID == 0) {
        document.querySelector(".chat__btn").classList.add("hide-on-destop");
    } else {
        document.querySelector(".chat__btn").classList.remove("hide-on-destop");
    }
}

function setDataChat(data) {
    let htmlChat = "";
    htmlChat += 
    `
        <div class="chat__container">
            <div class="chat__mobile-window hide-on-destop">
                <div class="chat__body-search">
                    <div class="chat__body-search-box">
                        <i class="uil uil-search chat__body-search-icon"></i>
                        <input type="text" class="chat__body-search-input" onblur="displaySearchSub()"
                            onclick="hideSearchSub()" placeholder="Tìm kiếm">
                    </div>
                    <div class="chat__body-search-sub" onclick="displaySubList()">
                        <span>Tất cả</span>
                        <i class="uil uil-angle-down chat__body-search-sub-icon"></i>
                        <ul class="chat__body-search-sub-list">
                            <li class="chat__body-search-sub-item">
                                Tất cả
                            </li>
                            <li class="chat__body-search-sub-item">
                                Chưa đọc
                            </li>
                            <li class="chat__body-search-sub-item">
                                Đã ghim
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="chat__body-shop">`;
                if (data.chats.length == 0) {
                    htmlChat += 
                    `
                    <div class="chat__body-shop-no">
                        Không tìm thấy <br> cuộc hội thoại nào
                    </div>
                    `;
                } else {
                    htmlChat += `
                    <ul class="chat__shop-list">`;
                    data.chats.forEach(element => {
                        htmlChat += 
                        `
                        <li class="chat__shop-item">
                            <div class="chat__shop-item-img" style="background-image: url(/img/${element.sImageAvatar});"></div>
                            <div class="chat__shop-item-info">
                                <div class="chat__shop-item-info-top">
                                    <div class="chat__shop-item-title">${element.sStoreName}</div>
                                    <div class="chat__shop-item-time">${getDate(element.dTime)}</div>
                                </div>
                                <div class="chat__shop-item-info-bottom">
                                    ${element.sChat}
                                </div>
                            </div>
                        </li>
                        `;
                    });
                    htmlChat += `
                    </ul>`;
                }
                htmlChat += `
                </div>
            </div>
            <div class="chat__header">
                <div class="chat__header-title">Chat</div>
                <div class="chat__header-btns">
                    <div class="chat__header-btn hide-on-mobile" onclick="hideChatWindow()">
                        <i class="uil uil-arrow-right chat__header-btn-arrow"></i>
                    </div>
                    <div class="chat__header-menu-bar hide-on-destop" onclick="showChatWindowMobile()">
                        <span></span>
                    </div>
                    <div class="chat__header-btn">
                        <i class="uil uil-angle-down chat__header-btn-down" onclick="hideChat()"></i>
                    </div>
                </div>
            </div>
            <div class="chat__body">
                <div class="chat__body-left">
                    <div class="chat__body-search">
                        <div class="chat__body-search-box">
                            <i class="uil uil-search chat__body-search-icon"></i>
                            <input type="text" class="chat__body-search-input" onblur="displaySearchSub()"
                                onclick="hideSearchSub()" placeholder="Tìm kiếm">
                        </div>
                        <div class="chat__body-search-sub" onclick="displaySubList()">
                            <span>Tất cả</span>
                            <i class="uil uil-angle-down chat__body-search-sub-icon"></i>
                            <ul class="chat__body-search-sub-list">
                                <li class="chat__body-search-sub-item">
                                    Tất cả
                                </li>
                                <li class="chat__body-search-sub-item">
                                    Chưa đọc
                                </li>
                                <li class="chat__body-search-sub-item">
                                    Đã ghim
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="chat__body-shop">`;
                        if (data.chats.length == 0) {
                        htmlChat += 
                        `
                        <div class="chat__body-shop-no">
                            Không tìm thấy <br> cuộc hội thoại nào
                        </div>
                        `;
                    } else {
                        htmlChat += `
                        <ul class="chat__shop-list">`;
                        data.chats.forEach(element => {
                            htmlChat += 
                            `
                            <li class="chat__shop-item" onclick=showChatDetail(${element.pK_iChatID})>
                                <div class="chat__shop-item-img" style="background-image: url(/img/${element.sImageAvatar});"></div>
                                <div class="chat__shop-item-info">
                                    <div class="chat__shop-item-info-top">
                                        <div class="chat__shop-item-title">${element.sStoreName}</div>
                                        <div class="chat__shop-item-time">${getDate(element.dTime)}</div>
                                    </div>
                                    <div class="chat__shop-item-info-bottom">
                                        ${element.sLastChat}
                                    </div>
                                </div>
                            </li>
                            `;
                        });
                        htmlChat += `
                        </ul>`;
                    }
                    htmlChat += `
                    </div>
                </div>
                <div class="chat__body-right">
                    <div class="chat__body-shop-name">
                        
                    </div>
                    <div class="chat__body-message">
                        <div class="chat__body-message-welcome">
                            <img src="/img/sme_chat.png" class="chat__body-message-welcome-img" alt="">
                            <div class="chat__body-message-welcome-title">Chào mừng bạn đến với SMe Chat</div>
                            <div class="chat__body-message-welcome-sub">
                                Bắt đầu trả lời người mua
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.querySelector(".chat").innerHTML = htmlChat;
}

function showChatDetail(chatID) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/chat/detail?chatID=' + chatID + '', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);

            let htmlShopName = "";
            htmlShopName += 
            `
                        <div class="chat__body-shop-name-container">
                            <span>${data.chat[0].sStoreName}</span>
                            <i class="uil uil-angle-down chat__body-shop-name-icon"></i>
                            <div class="chat__body-shop-name-sub">
                                <div class="chat__body-shop-name-sub-header">
                                    <div class="chat__body-shop-name-sub-header-img" style="background-image: url(/img/${data.chat[0].sImageAvatar});"></div>
                                    <div class="chat__body-shop-name-sub-header-title">${data.chat[0].sStoreName}</div>
                                </div>
                                <ul class="chat__body-shop-name-sub-list">
                                    <li class="chat__body-shop-name-sub-item">
                                        <span>Tắt thông báo</span>
                                        <div class="chat__body-shop-name-sub-control">
                                            <div class="chat__body-shop-name-sub-control-circle"></div>
                                        </div>
                                    </li>
                                    <li class="chat__body-shop-name-sub-item">
                                        <span>Chặn người dùng</span>
                                        <div class="chat__body-shop-name-sub-control">
                                            <div class="chat__body-shop-name-sub-control-circle"></div>
                                        </div>
                                    </li>
                                    <li class="chat__body-shop-name-sub-item">
                                        <a href="#" class="chat__body-shop-name-sub-item-link">
                                            <span>Tố cáo người dùng</span>
                                            <i class="uil uil-angle-right-b chat__body-shop-name-sub-item-icon"></i>
                                        </a>
                                    </li>
                                </ul>
                                <div class="chat__body-shop-name-sub-bottom">
                                    <a href="#" class="chat__body-shop-name-sub-bottm-link">
                                        <span>Xem thông tin cá nhân</span>
                                        <i class="uil uil-angle-right-b chat__body-shop-name-sub-item-icon"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
            `;
            document.querySelector(".chat__body-shop-name").innerHTML = htmlShopName;

            let htmlMessage = "";
            htmlMessage += 
            `
                        <div class="chat__body-message-container">
                            <div class="chat__message-time">
                                <span>${getDate(data.chat[0].dTime)}</span>
                            </div>
                            <div class="chat__message-node">
                                <div class="chat__message-node-text">
                                    <i class="uil uil-exclamation-octagon chat__message-node-icon"></i>
                                    LƯU Ý: SMe KHÔNG cho phép các hành vi: Đặt cọc/chuyển khoản riêng
                                    cho người bán/Giao dịch ngoài hệ thống SMe/Cung cấp thông tin liên hệ
                                    cho người bán/Các hoạt động tuyển CTV/Tặng quà miễn phí,... Vui lòng chỉ
                                    mua bán hàng trực tiếp trên ứng dụng SMe để tránh nguy cơ bị lừa đảo bạn nhé!
                                    <a href="#" class="chat__message-node-link">Tìm hiểu thêm</a>
                                </div>
                            </div>`;
                            data.chatDetails.forEach(element => {
                                if (element.iChatPersonID == element.fK_iSellerID) {
                            htmlMessage += 
                            `<div class="chat__message-body-texted">
                                <div class="chat__message-body-texted-container">
                                    <div class="chat__message-body-texted-content">
                                    ${element.sChat}
                                    </div>
                                    <div class="chat__message-body-texted-time">${getTime(element.dTime)}</div>
                                </div>
                            </div>`;
                                    } else {
                            htmlMessage += 
                            `<div class="chat__message-body-me">
                                <div class="chat__message-body-me-container">
                                    <span class="chat__message-body-me-content">
                                        ${element.sChat}<br>
                                        <span class="chat__message-body-me-after-hour">Tin nhắn Tự động Ngoài giờ làm việc</span>
                                    </span>
                                    <div class="chat__message-body-me-time">${getTime(element.dTime)}</div>
                                </div>
                            </div>`;
                                    }
                                });
                                htmlMessage += 
                        `</div>
                        <div class="chat__body-message-bottom">
                            <div class="chat__body-message-bottom-box">
                                <textarea type="text" class="chat__body-message-bottom-input"
                                    placeholder="Nhập nội dung tin nhắn"></textarea>
                            </div>
                            <div class="chat__body-message-bottom-btns">
                                <div class="chat__body-message-bottom-btns-left">
                                    <ul class="chat__body-message-bottom-list">
                                        <li class="chat__body-message-bottom-item">
                                            <i class="uil uil-grin chat__body-message-bottom-item-icon"></i>
                                        </li>
                                        <li class="chat__body-message-bottom-item">
                                            <i class="uil uil-image-plus chat__body-message-bottom-item-icon"></i>
                                        </li>
                                        <li class="chat__body-message-bottom-item">
                                            <i class="uil uil-youtube chat__body-message-bottom-item-icon"></i>
                                        </li>
                                        <li class="chat__body-message-bottom-item">
                                            <i class="uil uil-shopping-bag chat__body-message-bottom-item-icon"></i>
                                        </li>
                                        <li class="chat__body-message-bottom-item">
                                            <i class="uil uil-clipboard chat__body-message-bottom-item-icon"></i>
                                        </li>
                                    </ul>
                                </div>
                                <div class="chat__body-message-bottom-btns-right">
                                    <div class="chat__body-message-bottom-item">
                                        <i class="uil uil-message chat__body-message-bottom-item-icon"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
            `;
            document.querySelector(".chat__body-message").innerHTML = htmlMessage;
            
        }
    };
    xhr.send(null);
}

// Chat JS

function hideChatWindow() {
    document.querySelector(".chat__container").classList.toggle("hide-chat-window");
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
    document.querySelector(".chat__container").style.display = 'none';
    document.querySelector(".chat__btn").style.display = "flex";
}

function displayChat() {
    document.querySelector(".chat__container").style.display = 'block';
    document.querySelector(".chat__btn").style.display = "none";
}

function showChatWindowMobile() {
    document.querySelector(".chat__header-menu-bar").classList.toggle("active");
    document.querySelector(".chat__mobile-window").classList.toggle("show");
}

function addShopMobileShop(i) {
    closeNavMenu();
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
    closeNavMenu();
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

// Lấy tên thứ
function getDate(date) {
    // Khai báo đối tượng Date
    var date = new Date(date);

    // Lấy số thứ tự của ngày hiện tại
    var current_day = date.getDay();

    // Biến lưu tên của thứ
    var day_name = '';

    // Lấy tên thứ của ngày hiện tại
    switch (current_day) {
        case 0:
            day_name = "CN";
            break;
        case 1:
            day_name = "Thứ 2";
            break;
        case 2:
            day_name = "Thứ 3";
            break;
        case 3:
            day_name = "Thứ 4";
            break;
        case 4:
            day_name = "Thứ 5";
            break;
        case 5:
            day_name = "Thứ 6";
            break;
        case 6:
            day_name = "Thứ 7";
    }
    return day_name;

}

function getTime(time) {
    var date = new Date(time);
    var hours = date.getHours();
    hours = hours < 10 ? '0' + hours : hours;
    var minutes = date.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var current_time = hours + ":" + minutes;
    return current_time;
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