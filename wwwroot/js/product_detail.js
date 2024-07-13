function getDataDetail() {
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/product/get-data-detail', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            console.log("Data detail page: ");
            console.log(data);

            loadProductNameInHeader(data);

            loadDetailInfo(data);
        }
    };
    xhr.send(null);
}
getDataDetail();

function loadProductNameInHeader(data) {
    document.querySelector(".header__mobile-product-name").innerText = data.products[0].sProductName;
}

function loadDetailInfo(data) {
    let htmlProductDetail = ""; 
    htmlProductDetail += `  <div class="detail__left">
                                <img src="/img/${data.products[0].sImageUrl}" alt="product image" class="detail__left-img" />
                                <div class="detai__left-progress">
                                    <!-- <div class="spinner detai__left-progress-spinner"></div> -->
                                    <i class="uil uil-shopping-bag detai__left-progress-icon"></i>
                                </div>
                            </div>
                            <div class="detail__right">
                                <h2 class="detail__right-title">${data.products[0].sProductName}</h2>
                                <div class="detail__price">`;
                                if (data.products[0].dPerDiscount != 1) {
                                    htmlProductDetail += `<p class="detail__price-old"><span>${money(data.products[0].dPrice)} đ</span></p>`;
                                    htmlProductDetail += `<p class="detail__price-new"><span>${money((data.products[0].dPrice * (1 - data.products[0].dPerDiscount)))} đ</span></p>`;
                                } else {
                                    htmlProductDetail += `          <p class="detail__price-new"><span>${money(data.products[0].dPrice)} đ</span></p>`;
                                }
    htmlProductDetail += `      </div>
                                <div class="detail__text">
                                    <h2 class="detail__text-title">về mặt hàng này: </h2>
                                    <p class="detail__text-desc">
                                        ${data.products[0].sProductDescription}
                                    </p>
                                </div>
                                <div class="detail__btns hide-on-mobile">
                                    <div class="detail__btn-count">
                                        <button type="button" class="detail__btn-count-btn" onclick="reduceProduct(event)">-</button>
                                        <input type="text" name="quantity" id="qnt" value="0" class="detail__btn-count-input" />
                                        <button type="button" class="detail__btn-count-btn" onclick="increaseProduct(event)">+</button>
                                    </div>
                                    <button type="button" onclick="addToCart(${data.products[0].pK_iProductID}, ${data.products[0].dPrice})" class="detail__btn-add"> Thêm vào giỏ
                                        <i class="fas fa-shopping-cart detail__cart-icon"></i>
                                    </button>
                                    <button type="button" class="btn btn--primary detail__btn-buy-now">Mua ngay</button>
                                </div>
                                <div class="detail__mobile-btns">
                                    <div class="detail__mobile-btn-add" onclick="showBottomSheet()"> Thêm vào giỏ
                                        <i class="fas fa-shopping-cart detail__cart-icon"></i>
                                    </div>
                                    <div class="detail__mobile-btn-buy-now">Mua ngay</div>
                                </div>
                                <div class="detail__mobile-bottom-sheet-modal">
                                    <div class="detail__mobile-bottom-sheet-overlay"></div>
                                    <div class="detail__mobile-bottom-sheet">
                                        <div class="detail__mobile-bottom-sheet-info">
                                            <div class="detail__mobile-bottom-sheet-info-img"
                                                style="background-image: url(/img/tai_nghe_eport.jpg);"></div>
                                            <div class="detail__mobile-bottom-sheet-info-desc">
                                                <div class="detail__mobile-bottom-sheet-info-price">114.000đ - 225.000đ</div>
                                                <div class="detail__mobile-bottom-sheet-info-warehouse">Kho: 12345</div>
                                            </div>
                                        </div>
                                        <div class="detail__mobile-bottom-sheet-close" onclick="closeBottomSheet()">
                                            <i class="uil uil-times detail__mobile-bottom-sheet-close-icon"></i>
                                        </div>
                                        <div class="detail__mobile-bottom-sheet-type">
                                            <div class="detail__mobile-bottom-sheet-type-title">Loại</div>
                                            <div class="detail__mobile-bottom-sheet-type-list">
                                                <div class="detail__mobile-bottom-sheet-type-item active">
                                                    <div class="detail__mobile-bottom-sheet-type-item-img"
                                                        style="background-image: url(/img/tai_nghe_eport.jpg);"></div>
                                                    <div class="detail__mobile-bottom-sheet-type-item-name">Socany 3 cấp độ</div>
                                                </div>
                                                <div class="detail__mobile-bottom-sheet-type-item">
                                                    <div class="detail__mobile-bottom-sheet-type-item-img"
                                                        style="background-image: url(/img/tai_nghe_eport.jpg);"></div>
                                                    <div class="detail__mobile-bottom-sheet-type-item-name">Socany 3 cấp độ</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="detail__mobile-bottom-sheet-quantity">
                                            <div class="detail__mobile-bottom-sheet-quantity-title">Số lượng</div>
                                            <div class="detail__mobile-bottom-sheet-quantity-btns">
                                                <div class="detail__mobile-bottom-sheet-quantity-btn-plus">+</div>
                                                <input type="text" class="detail__mobile-bottom-sheet-quantity-input" value="1">
                                                <div class="detail__mobile-bottom-sheet-quantity-btn-less">-</div>
                                            </div>
                                        </div>
                                        <div class="detail__mobile-bottom-sheet-add-to-cart">Thêm vào giỏ hàng</div>
                                    </div>
                                </div>
                                <div class="detail__number">
                                    <div class="detail__social">
                                        <p class="detail__social-title">Chia sẻ: </p>
                                        <a class="detail__social-link" href="#">
                                            <i class="fab fa-facebook-f"></i>
                                        </a>
                                        <a class="detail__social-link" href="#">
                                            <i class="fab fa-twitter"></i>
                                        </a>
                                        <a class="detail__social-link" href="#">
                                            <i class="fab fa-instagram"></i>
                                        </a>
                                        <a class="detail__social-link" href="#">
                                            <i class="fab fa-whatsapp"></i>
                                        </a>
                                        <a class="detail__social-link" href="#">
                                            <i class="fab fa-pinterest"></i>
                                        </a>
                                    </div>
                                    <div class="detail__favorite" title="Yêu thích">
                                        <i class="uil uil-heart-alt detail__favorite-icon"></i>
                                    </div>
                                    <!-- <div class="detail__favorite" title="Bỏ yêu thích">
                                        <i class="fas fa-heart detail__favorite-icon"></i>
                                    </div> -->
                                </div>
                                <div class="detail__right-loading">
                                    <div class="detail__right-loading-product-name"></div>
                                    <div class="detail__right-loading-product-price"></div>
                                    <div class="detail__right-loading-product-desc">
                                        <div class="detail__right-loading-product-desc-title"></div>
                                        <div class="detail__right-loading-product-desc-text"></div>
                                    </div>
                                    <div class="detail__right-loading-product-qnt"></div>
                                    <div class="detail__right-loading-product-btns">
                                        <div class="detail__right-loading-product-btn"></div>
                                        <div class="detail__right-loading-product-btn"></div>
                                    </div>
                                    <div class="detail__right-loading-product-share">
                                        <div class="detail__right-loading-product-share-title"></div>
                                        <div class="detail__right-loading-product-share-box"></div>
                                        <div class="detail__right-loading-product-share-box"></div>
                                        <div class="detail__right-loading-product-share-box"></div>
                                        <div class="detail__right-loading-product-share-box"></div>
                                        <div class="detail__right-loading-product-share-box"></div>
                                    </div>
                                </div>
                            </div>
    `;
    document.querySelector(".detail").innerHTML = htmlProductDetail;
    loadingProductDetail();
}

function loadingProductDetail() {
    setTimeout(() => {
        document.querySelector(".detai__left-progress").style.display = 'none';
        document.querySelector(".detail__right-loading").style.display = 'none';
    }, 1000);
}

// Tăng số lượng sản phẩm trong chi tiết sản phẩm
function increaseProduct(event) {
    const parentElement = event.target.parentNode;
    var increase = parentElement.querySelector("#qnt").value;
    if (parseInt(increase) < 100) {
        parentElement.querySelector("#qnt").value = parseInt(increase) + 1;
    }
}

// Giảm số lượng sản phẩm trong chi tiết sản phẩm
function reduceProduct(event) {
    const parentElement = event.target.parentNode;
    var reduce = parentElement.querySelector("#qnt").value;
    if (parseInt(reduce) > 0) {
        parentElement.querySelector("#qnt").value = parseInt(reduce) - 1;
    }
}

//AddToCart
function addToCart(productID, price) {
    var quantity = document.getElementById("qnt").value;
    if (parseInt(quantity) == 0) {
        toast({title: "Thông báo", msg: "Bạn chưa nhập số lượng sản phẩm!", type: "success", duration: 5000});
        // alert('Bạn chưa nhập số lượng sản phẩm!');
    } else {
        var formData = new FormData();
        formData.append('productID', productID);
        formData.append('unitPrice', price);
        formData.append('quantity', quantity);
        var xhr = new XMLHttpRequest();
        xhr.open('post', '/Cart/AddToCart', true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const data = JSON.parse(xhr.responseText);
                console.log(data);

                let htmlCartDetail = "";
                if (data.model != null) {
                    htmlCartDetail += data.model.cartDetails.map(obj => `
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
                    document.querySelector(".header__cart-notice").innerText = data.model.cartCount;
                    //document.querySelector(".header__cart-list-item").innerHTML = htmlCartDetail;
                }
                toast({title: "Thông báo", msg: `${data.msg}`, type: "success", duration: 5000});

            }
        }
        xhr.send(formData);
    }
}

// Bottom Sheet
function showBottomSheet() {
    document.querySelector(".detail__mobile-bottom-sheet-overlay").classList.add("open");
    document.querySelector(".detail__mobile-bottom-sheet").classList.add("open");
}

function closeBottomSheet() {
    document.querySelector(".detail__mobile-bottom-sheet-overlay").classList.remove("open");
    document.querySelector(".detail__mobile-bottom-sheet").classList.remove("open");
}

window.addEventListener('click', (e) => {
    if (e.target == document.querySelector(".detail__mobile-bottom-sheet-overlay")) {
        document.querySelector(".detail__mobile-bottom-sheet-overlay").classList.remove("open");
        document.querySelector(".detail__mobile-bottom-sheet").classList.remove("open");
    }
});

// OpenModalOrderMe
function openModalOrderMe() {
    document.querySelector(".header__mobile-more-modal").classList.add("open");
}

window.addEventListener('click', (e) => {
    if (e.target == document.querySelector(".header__mobile-more-modal")) {
        document.querySelector(".header__mobile-more-modal").classList.remove("open");
    }
});

// Show/Hide Detail Header
window.addEventListener('scroll', () => {
    const y = this.pageYOffset;
    if (y > 80) {
        this.document.querySelector(".header__mobile-back").classList.add("scroll-detail");
        this.document.querySelector(".header__mobile-product-name").classList.add("scroll-detail");
        this.document.querySelector(".header__cart-wrap").classList.add("scroll-detail");
        this.document.querySelector(".header__mobile-more").classList.add("scroll-detail");
        this.document.querySelector(".header__mobile-back-icon").classList.add("scroll-detail");
        this.document.querySelector(".header__cart-icon").classList.add("scroll-detail");
        this.document.querySelector(".header__mobile-more-icon").classList.add("scroll-detail");
    } else {
        this.document.querySelector(".header__mobile-back").classList.remove("scroll-detail");
        this.document.querySelector(".header__mobile-product-name").classList.remove("scroll-detail");
        this.document.querySelector(".header__cart-wrap").classList.remove("scroll-detail");
        this.document.querySelector(".header__mobile-more").classList.remove("scroll-detail");
        this.document.querySelector(".header__mobile-back-icon").classList.remove("scroll-detail");
        this.document.querySelector(".header__cart-icon").classList.remove("scroll-detail");
        this.document.querySelector(".header__mobile-more-icon").classList.remove("scroll-detail");
    }
});

// Comment Add
function showCommentAddBtn() {
    document.querySelector(".comment__add-btns").classList.add("show");
}

function hideCommentAddBtn() {
    document.querySelector(".comment__add-btns").classList.remove("show");
}

function changeCommentAddBtn(input) {
    if (input.value != "") {
        document.querySelector(".comment__add-btn-reply").classList.add("active");
    } else {
        document.querySelector(".comment__add-btn-reply").classList.remove("active");
    }
}

// Reply Input
function showReplyInput() {
    document.querySelector(".comment__feetback").classList.add("show");
}

function hideReplyInput() {
    document.querySelector(".comment__feetback").classList.remove("show");
}

function changeReplyBtn(input) {
    if (input.value != "") {
        document.querySelector(".comment__feetback-btn-reply").classList.add("active");
    } else {
        document.querySelector(".comment__feetback-btn-reply").classList.remove("active");
    }
}

function showReplyDesc() {
    document.querySelector(".comment__replies").classList.toggle("show");
    document.querySelector(".comment__reply-quantity-icon").classList.toggle("rotate");
}