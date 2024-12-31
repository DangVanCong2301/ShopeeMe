// lấy số lượng sản phẩm giỏ hàng, khi khai báo window.onload ở site.js thì ở file này ta không khai báo nữa
function getCartInfo() {
    let userID = getCookies("userID");
    if (userID == undefined) {
        userID = 0;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('get', '/cart-data?userID=' + userID +'', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);

            getCartItemsDestop(data);

            getCartItemsMobile(data);

            getProductsLike(data);
            
        }
    }
    xhr.send(null);
}
getCartInfo();

function getCartItemsDestop(data) {
    if (data.cartCount == 0) {
        let noCartHtml = `
        <div class="cart__no">
            <div style="background-image: url(/img/no-cart.png);" class="cart__no-img"></div>
            <div class="cart__no-sub">Giỏ hàng của bạn còn trống</div>
            <a href="/" class="btn btn--primary">Mua ngay</a>
        </div>
        `;
        document.querySelector(".cart__destop").innerHTML = noCartHtml;
    } else {
        let haveCartHtml = "";
        haveCartHtml += `
        <div class="cart__have hide-on-mobile">
            <div class="cart__instruct">
                <img src="/img/free_ship.png" alt="" class="cart__instruct-img">
                <div class="cart__instruct-text">Nhấn vào mục Mã giảm giá ở cuối trang để hưởng miễn phí vận chuyển
                    bạn nhé!</div>
            </div>
            <div class="cart__container">
                <div class="cart__header">
                    <div class="cart__input">
                        <input type="checkbox" class="cart__checkout-input" name="" id="">
                    </div>
                    <div class="cart__header-sub">Sản phẩm</div>
                    <div class="cart__header-type"></div>
                    <div class="cart__header-cost">Đơn giá</div>
                    <div class="cart__header-quantity">Số lượng</div>
                    <div class="cart__header-money">Số tiền</div>
                    <div class="cart__header-operation">Thao tác</div>
                </div>
                <div class="cart__product-list">

                </div>
                <div class="cart__footer">
                    <div class="cart__purchase">
                        <div class="cart__purchase-voucher">
                            <div class="cart__purchase-voucher-title">
                                <i class="uil uil-store cart__body-discount-icon"></i>
                                <div class="cart__purchase-voucher-sub">SMe Voucher</div>
                            </div>
                            <a href="#" class="cart__purchase-voucher-link">Chọn hoặc nhập mã</a>
                        </div>
                        <div class="cart__purchase-payment">
                            <div class="cart__input">
                                <input type="checkbox" class="cart__checkout-input-all" onchange="checkAllProduct(this)"
                                    name="" id="">
                            </div>
                            <div class="cart__purchase-payment-desc">
                                <div class="cart__purchase-payment-left">
                                    <div class="cart__purchase-footer-select">Chọn tất cả (${data.cartCount})</div>
                                    <a href="javascript:deleteAllProductModal()"
                                        class="cart__purchase-footer-delele">Xoá</a>
                                </div>
                                <div class="cart__purchase-payment-right">
                                    <div class="cart__purchase-payment-total-sub">Tổng thanh toán (0 sản phẩm):
                                        <span>0 đ</span>
                                    </div>
                                    <a href="javascript:checkout()" class="btn btn--primary">Mua hàng</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cart__like">
                <div class="cart__like-title">Có thể bạn cũng thích</div>
                <div class="home-product">
                    <div class="row sm-gutter cart__like-product-list">

                    </div>
                </div>
            </div>
        </div>
        `;
        document.querySelector(".cart__destop").innerHTML = haveCartHtml;
    }
    let html = "";
    html += data.cartDetails.map((obj, index) => `
    <div class="cart__body" id="product__${obj.pK_iProductID}">
        <div class="cart__body-header">
            <div class="cart__input">
                <input type="checkbox" class="cart__checkout-input" name="" id="">
            </div>
            <span>Yêu thích</span>
            <div class="cart__body-header-text">${obj.sStoreName}</div>
            <a href="#" class="cart__body-header-chat">
                <i class="uil uil-chat cart__body-header-chat-icon"></i>
            </a>
        </div>
        <div class="cart__body-product">
            <div class="cart__input">
                <input type="checkbox" class="cart__checkout-input" onchange="addToCheckout(${obj.pK_iProductID}, ${obj.pK_iStoreID}, event)" name="" id="">
            </div>
            <div class="cart__body-product-info">
                <div class="cart__body-product-img" style="background-image: url(/img/${obj.sImageUrl});">
                    
                </div>
                <div class="cart__body-prduct-desc">
                    <div class="cart__body-product-name">
                        ${obj.sProductName}
                        <div class="cart__body-product-name-progress">
                            <div class="cart__body-product-name-progress-line"></div>
                            <div class="cart__body-product-name-progress-line"></div>
                        </div>
                    </div>
                    <img src="/img/voucher.png" class="cart__body-product-voucher" alt="">
                </div>
            </div>
            <div class="cart__body-product-type">Phân loại hàng: Bạc</div>
            <div class="cart__body-product-cost">
                <div class="cart__body-product-cost-old">189.000 đ</div>
                <div class="cart__body-product-cost-new">${money_2(obj.dUnitPrice)}</div>
            </div>
            <div class="cart__body-product-quantity">
                <div class="cart__count-btns">
                    <button type="button" class="cart__btn-add" onclick="tru(event, ${obj.pK_iProductID}, ${obj.dUnitPrice})">-</button>
                    <input name="qnt" type="text" id="qnt" value="${obj.iQuantity}" class="cart__count-input" />
                    <button type="button" class="cart__btn-sub" onclick="cong(event, ${obj.pK_iProductID}, ${obj.dUnitPrice})">+</button>
                </div>
            </div>
            <div class="cart__body-product-money">${money_2(obj.dMoney)}</div>
            <div class="cart__body-product-operation">
                <div class='btn-tools'>
                    <a class='btn-tool btn-tool__del' href='javascript:deleteProduct(${obj.pK_iProductID})' title='Xoá sản phẩm'><i class='uil uil-trash'></i></a>
                </div>
            </div>
        </div>
        <div class="cart__body-discount">
            <i class="uil uil-store cart__body-discount-icon"></i>
            <div class="cart__body-discount-sub">Mua thêm 91.000đ để được mức giảm 3kđ</div>
            <a href="#" class="cart__body-discount-link">Thêm mã giảm giá của Shop</a>
        </div>
        <div class="cart__body-transport">
            <img src="./img/free_ship.png" alt="" class="cart__body-transport-img">
            <div class="cart__body-transport-sub">Giảm 300.000đ phí vận chuyển đơn tối thiểu 0đ</div>
            <a href="#" class="cart__body-transport-more">Tìm hiểu thêm</a>
        </div>
        <div class="cart__body-loading">
            <div class="cart__body-header-loading">
                <div class="cart__body-header-input-loading"></div>
                <div class="cart__body-header-sub-loading"></div>
            </div>
            <div class="cart__body-product-loading">
                <div class="cart__body-header-input-loading"></div>
                <div class="cart__body-product-info-loading">
                    <div class="cart__body-product-img-loading">
                        <i class="uil uil-shopping-bag cart__body-product-img-icon-loading"></i>
                    </div>
                    <div class="cart__body-product-desc-loading">
                        <div class="cart__body-product-desc-line-loading"></div>
                        <div class="cart__body-product-desc-line-loading"></div>
                    </div>
                </div>
            </div>
            <div class="cart__body-discount-loading">
                <div class="cart__body-discount-line-loading"></div>
            </div>
            <div class="cart__body-transport-loading">
                <div class="cart__body-transport-line-loading"></div>
            </div>
        </div>              
    </div>
    `).join('');
    document.querySelector(".cart__product-list").innerHTML = html;
    loadingCartItems();
}

function checkout() {
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/checkout/get-data', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const result = JSON.parse(xhr.responseText);
            if (result.checkouts.length == 0) {
                openModal();
                let htmlConfirm = "";
                htmlConfirm += 
                `
                    <div class="modal__confirm">
                        <div class="modal__confirm-header">
                            <div class="modal__confirm-title">Thông báo</div>
                            <i class="uil uil-multiply modal__confirm-close" onclick="exitModal()"></i>
                        </div>
                        <div class="modal__confirm-desc">
                            Bạn chưa chọn sản phẩm để mua!
                        </div>
                        <div class="modal__confirm-btns">
                            <div class="modal__confirm-btn-destroy" onclick="exitModal()">Huỷ</div>
                            <div class="modal__confirm-btn-send">Trở lại</div>
                        </div>
                    </div>
                `;
                document.querySelector(".modal__body").innerHTML = htmlConfirm;
            } else {
                window.location.assign("/checkout");
            }
        }
    };
    xhr.send(null);
}

function loadingCartItems() {
    const loadingCartItem = document.querySelectorAll(".cart__body-loading");

    setTimeout(() => {
        for (let i = 0; i < loadingCartItem.length; i++) {
            loadingCartItem[i].style.display = 'none';
        }
    }, 1000);
}

function getCartItemsMobile(data) {
    let htmlCartItems = "";
    htmlCartItems += data.cartDetails.map((obj, index) => 
    `
                    <div class="cart__mobile-item">
                        <div class="cart__mobile-item-header">
                            <div class="cart__mobile-item-box">
                                <input type="checkbox" class="cart__mobile-item-input" name="" id="">
                            </div>
                            <div class="cart__mobile-item-header-shop">
                                <i class="uil uil-store-alt cart__mobile-item-header-shop-icon-store"></i>
                                <div class="cart__mobile-item-header-shop-name">Viet Mark</div>
                                <i class="uil uil-angle-right-b cart__mobile-item-header-shop-icon-arrow"></i>
                            </div>
                            <div class="cart__mobile-item-header-fix">Sửa</div>
                        </div>
                        <div class="cart__mobile-item-body">
                            <div class="cart__mobile-item-body-container">
                                <div class="cart__mobile-item-body-product">
                                    <div class="cart__mobile-item-body-left">
                                        <div class="cart__mobile-item-box">
                                            <input type="checkbox" class="cart__mobile-item-input" name="" id="">
                                        </div>
                                        <div class="cart__mobile-item-product-img"
                                            style="background-image: url(/img/${obj.sImageUrl});"></div>
                                    </div>
                                    <div class="cart__mobile-item-body-right">
                                        <div class="cart__mobile-item-product-name">
                                        ${obj.sProductName}
                                        </div>
                                        <div class="cart__mobile-item-product-type">
                                            <span>Phân loại hàng: Bạc</span>
                                            <i class="uil uil-angle-down cart__mobile-item-product-type-icon"></i>
                                        </div>
                                        <div class="cart__mobile-item-product-change-sub">
                                            <span>Đổi ý miễn phí</span>
                                        </div>
                                        <div class="cart__mobile-item-product-voucher">
                                            <img src="/img/voucher.png"
                                                class="cart__mobile-item-product-voucher-img"></img>
                                        </div>
                                        <div class="cart__mobile-item-product-price">
                                            <div class="cart__mobile-item-product-price-old">189.000đ</div>
                                            <div class="cart__mobile-item-product-price-new">${money_2(obj.dMoney)}</div>
                                        </div>
                                        <div class="cart__mobile-item-product-quantity">
                                            <div class="cart__mobile-item-product-quantity-btn-plus" onclick="plusMobile(event)">+</div>
                                            <input type="text" class="cart__mobile-item-product-quantity-input"
                                                value="1">
                                            <div class="cart__mobile-item-product-quantity-btn-less" onclick="lessMobile(event)">-</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="cart__mobile-item-body-tools">
                                    <div class="cart__mobile-item-body-product-similar">Sản phẩm tương tự</div>
                                    <div class="cart__mobile-item-body-product-delete" onclick="openDeleteModal()">Xoá
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="cart__mobile-voucher" onclick="showBottomSheetVoucher()">
                            <i class="uil uil-ellipsis-v cart__mobile-voucher-icon-more"></i>
                            <span>Thêm Shop Voucher</span>
                            <i class="uil uil-angle-right-b cart__mobile-voucher-icon-arrow"></i>
                        </div>
                        <div class="cart__mobile-voucher-bottom-sheet">
                            <div class="cart__mobile-voucher-bottom-sheet-overlay"></div>
                            <div class="cart__mobile-voucher-bottom-sheet-container">
                                <div class="cart__mobile-voucher-bottom-sheet-header">
                                    <span>Hàng Tốt Giá Rẻ Shop Voucher</span>
                                    <i class="uil uil-multiply cart__mobile-voucher-bottom-sheet-header-icon"
                                        onclick="hideBottomSheetVoucher()"></i>
                                </div>
                                <div class="cart__mobile-voucher-bottom-sheet-box">
                                    <input type="text" class="cart__mobile-voucher-bottom-sheet-input">
                                    <button type="button" class="cart__mobile-voucher-bottom-sheet-btn">Áp dụng</button>
                                </div>
                                <div class="cart__mobile-voucher-bottom-sheet-card">
                                    <div class="cart__mobile-voucher-bottom-sheet-card-box">
                                        <div class="cart__mobile-voucher-bottom-sheet-card-line">
                                            <span></span>
                                        </div>
                                        <div class="cart__mobile-voucher-bottom-sheet-card-text">%</div>
                                        <div class="cart__mobile-voucher-bottom-sheet-card-left-circle"></div>
                                        <div class="cart__mobile-voucher-bottom-sheet-card-right-circle"></div>
                                        <div class="cart__mobile-voucher-bottom-sheet-card-plus-1">+</div>
                                        <div class="cart__mobile-voucher-bottom-sheet-card-plus-2">+</div>
                                        <div class="cart__mobile-voucher-bottom-sheet-card-round-1"></div>
                                        <div class="cart__mobile-voucher-bottom-sheet-card-round-2"></div>
                                    </div>
                                </div>
                                <div class="cart__mobile-voucher-bottom-sheet-sub">
                                    <div class="cart__mobile-voucher-bottom-sheet-sub-title">Chưa có mã giảm giá nào của
                                        Shop</div>
                                    <div class="cart__mobile-voucher-bottom-sheet-sub-desc">Nhập mã giảm giá có thể sử
                                        dụng vào thanh toán bên trên</div>
                                </div>
                            </div>
                        </div>
                        <div class="cart__mobile-free-ship" onclick="showBottomSheetTransport()">
                            <div class="cart__mobile-free-ship-icon"
                                style="background-image: url(/img/free_ship.png);"></div>
                            <div class="cart__mobile-free-ship-sub">Giảm 300.000đ phí vận chuyển đơn tối thiểu 0đ</div>
                        </div>
                        <div class="cart__mobile-transport-bottom-sheet">
                            <div class="cart__mobile-transport-bottom-sheet-overlay"></div>
                            <div class="cart__mobile-transport-bottom-sheet-container">
                                <div class="cart__mobile-transport-bottom-sheet-header">Khuyến mãi vận chuyển - Hàng tốt
                                    giá rẻ Shop</div>
                                <div class="cart__mobile-transport-bottom-sheet-list">
                                    <div class="cart__mobile-transport-bottom-sheet-item">
                                        <div class="cart__mobile-transport-bottom-sheet-item-col-1">Đơn tối thiểu</div>
                                        <div class="cart__mobile-transport-bottom-sheet-item-col-2">Ưu đãi</div>
                                        <div class="cart__mobile-transport-bottom-sheet-item-col-3">Đơn vị vận chuyển
                                        </div>
                                    </div>
                                    <div class="cart__mobile-transport-bottom-sheet-item">
                                        <div class="cart__mobile-transport-bottom-sheet-item-col-1">0đ</div>
                                        <div class="cart__mobile-transport-bottom-sheet-item-col-2">300.000đ</div>
                                        <div class="cart__mobile-transport-bottom-sheet-item-col-3">
                                            <div class="cart__mobile-transport-bottom-sheet-item-col-3-line-1">Nhanh
                                            </div>
                                            <div class="cart__mobile-transport-bottom-sheet-item-col-3-line-2">Hàng cồng
                                                kềnh</div>
                                        </div>
                                    </div>
                                    <div class="cart__mobile-transport-bottom-sheet-item">
                                        <div class="cart__mobile-transport-bottom-sheet-item-col-1">0đ</div>
                                        <div class="cart__mobile-transport-bottom-sheet-item-col-2">40.000đ</div>
                                        <div class="cart__mobile-transport-bottom-sheet-item-col-3">
                                            <div class="cart__mobile-transport-bottom-sheet-item-col-3-line-1">Hoả tốc
                                            </div>
                                        </div>
                                    </div>
                                    <div class="cart__mobile-transport-bottom-sheet-item">
                                        <div class="cart__mobile-transport-bottom-sheet-item-col-1">0đ</div>
                                        <div class="cart__mobile-transport-bottom-sheet-item-col-2">20.000đ</div>
                                        <div class="cart__mobile-transport-bottom-sheet-item-col-3">
                                            <div class="cart__mobile-transport-bottom-sheet-item-col-3-line-1">Tiết kiệm
                                            </div>
                                        </div>
                                    </div>
                                    <div class="cart__mobile-transport-bottom-sheet-item">
                                        <div class="cart__mobile-transport-bottom-sheet-item-col-1">25.000đ</div>
                                        <div class="cart__mobile-transport-bottom-sheet-item-col-2">300.000đ</div>
                                        <div class="cart__mobile-transport-bottom-sheet-item-col-3">
                                            <div class="cart__mobile-transport-bottom-sheet-item-col-3-line-1">Hoả tốc
                                            </div>
                                            <div class="cart__mobile-transport-bottom-sheet-item-col-3-line-2">Tiết kiệm
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="cart__mobile-transport-bottom-sheet-btn">OK</div>
                            </div>
                        </div>
                        <div class="cart__mobile-item-loading">
                            <div class="cart__mobile-item-loading-header">
                                <div class="cart__mobile-item-loading-check"></div>
                                <div class="cart__mobile-item-loading-header-shop"></div>
                                <div class="cart__mobile-item-loading-header-fix"></div>
                            </div>
                            <div class="cart__mobile-item-loading-body">
                                <div class="cart__mobile-item-loading-body-item">
                                    <div class="cart__mobile-item-loading-check"></div>
                                    <div class="cart__mobile-item-loading-body-item-img"></div>
                                    <div class="cart__mobile-item-loading-body-item-info">
                                        <div class="cart__mobile-item-loading-body-item-info-1"></div>
                                        <div class="cart__mobile-item-loading-body-item-info-2"></div>
                                        <div class="cart__mobile-item-loading-body-item-info-3"></div>
                                    </div>
                                </div>
                                <div class="cart__mobile-item-loading-body-item">
                                    <div class="cart__mobile-item-loading-check"></div>
                                    <div class="cart__mobile-item-loading-body-item-img"></div>
                                    <div class="cart__mobile-item-loading-body-item-info">
                                        <div class="cart__mobile-item-loading-body-item-info-1"></div>
                                        <div class="cart__mobile-item-loading-body-item-info-2"></div>
                                        <div class="cart__mobile-item-loading-body-item-info-3"></div>
                                    </div>
                                </div>
                                <div class="cart__mobile-item-loading-body-item">
                                    <div class="cart__mobile-item-loading-check"></div>
                                    <div class="cart__mobile-item-loading-body-item-img"></div>
                                    <div class="cart__mobile-item-loading-body-item-info">
                                        <div class="cart__mobile-item-loading-body-item-info-1"></div>
                                        <div class="cart__mobile-item-loading-body-item-info-2"></div>
                                        <div class="cart__mobile-item-loading-body-item-info-3"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    `).join('');
    document.querySelector(".cart__mobile-list").innerHTML = htmlCartItems;
    const headerFix = document.querySelectorAll(".cart__mobile-item-header-fix");
    headerFix.forEach(e => {
        e.addEventListener('click', () => {
            const cartItem = e.parentNode.parentNode;
            if (e.innerText == "Sửa") {
                cartItem.querySelector(".cart__mobile-item-body-container").classList.toggle("move");
                e.innerText = "Hoàn thành";
            } else {
                cartItem.querySelector(".cart__mobile-item-body-container").classList.toggle("move");
                e.innerText = "Sửa";
            }
        });
    });
}

function getProductsLike(data) {
    let htmlProducts = "";
    for (let i = 0; i < data.get12ProductsAndSortAsc.length; i++) {
        htmlProducts += 
        `
                <div class="col l-2 c-6 m-4">
                    <a class="home-product-item" href="/product/detail/${data.get12ProductsAndSortAsc[i].pK_iProductID}">
                        <div class="home-product-item__img" style="background-image: url(/img/${data.get12ProductsAndSortAsc[i].sImageUrl})">
                            <div class="home-product-item__img-loading">
                                <i class="uil uil-shopping-bag home-product-item__img-loading-icon"></i>
                            </div>
                        </div>
                        <h4 class="home-product-item__name">
                            ${data.get12ProductsAndSortAsc[i].sProductName}
                            <div class="home-product-item__name-loading">
                                <div class="home-product-item__name-loading-line"></div>
                                <div class="home-product-item__name-loading-line"></div>
                            </div>
                        </h4>
                        <div class="home-product-item__price">`;
                        if (data.get12ProductsAndSortAsc[i].dPerDiscount != 1) {
        htmlProducts += 
                            `<span class="home-product-item__price-old">
                                ${money_2(data.get12ProductsAndSortAsc[i].dPrice)}
                                <div class="home-product-item__price-old-loading"></div>
                            </span>
                            <span class="home-product-item__price-current">
                                ${money(data.get12ProductsAndSortAsc[i].dPrice * (1 - data.get12ProductsAndSortAsc[i].dPerDiscount))} đ
                                <div class="home-product-item__price-current-loading"></div>
                            </span>`;
                        } else {
        htmlProducts += 
                            `<span class="home-product-item__price-current">
                                ${money(data.get12ProductsAndSortAsc[i].dPrice)} đ
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
                                ${data.get12ProductsAndSortAsc[i].sStoreName}
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
                        if (data.get12ProductsAndSortAsc[i].dPerDiscount != 1) {
                            htmlProducts += 
                            `<div class="home-product-item__sale-off">
                                <span class="home-product-item__sale-off-percent">${Math.floor(data.get12ProductsAndSortAsc[i].dPerDiscount * 100)}%</span>
                                <span class="home-product-item__sale-off-label">GIẢM</span>
                            </div>`;
                        }
        htmlProducts += 
                    `</a>
                </div>
        `;
    }
    document.querySelectorAll(".cart__like-product-list").forEach(e => {
        e.innerHTML = htmlProducts;
    });
    loading12Products();
}

function loading12Products() {
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

// Tăng số lượng sản phẩm trong giỏ hàng
function cong(event, productID, unitPrice) {
    // console.log(productID);
    const parentElement = event.target.parentNode;
    // console.log(parentElement);
    var cong = parentElement.querySelector("#qnt").value;
    var input = parentElement.querySelector("#qnt");
    if (parseInt(cong) < 100) { // Nếu sau này ta convert biến này sang int, double thì không dùn constance cho biến qnt
        input.value = parseInt(cong) + 1;
        console.log(input.value);
        var formData = new FormData(); // Gửi dữ liệu dạng formData
        formData.append("userID", getCookies("userID"));
        formData.append('quantity', input.value);
        formData.append('productID', productID);
        formData.append('unitPrice', unitPrice)
        var xhr = new XMLHttpRequest();
        xhr.open('put', '/cart/quantity', true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const data = JSON.parse(xhr.responseText);
                const trParent = parentElement.parentNode.parentNode;
                console.log(data);
                trParent.querySelector(".cart__body-product-money").innerText = `${money_2(data.money)}`;
            }
        }
        xhr.send(formData);
    }
}

// Giảm số lượng sản phẩm trong giỏ hàng
function tru(event, productID, unitPrice) {
    const parentElement = event.target.parentNode;
    var tru = parentElement.querySelector("#qnt").value;
    var input = parentElement.querySelector("#qnt");
    if (parseInt(tru) > 1) {
        input.value = parseInt(tru) - 1;
        var formData = new FormData();
        formData.append("userID", getCookies("userID"));
        formData.append('quantity', input.value);
        formData.append('productID', productID);
        formData.append('unitPrice', unitPrice);
        var xhr = new XMLHttpRequest();
        xhr.open('put', '/cart/quantity', true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const data = JSON.parse(xhr.responseText);
                const trParent = parentElement.parentNode.parentNode;
                trParent.querySelector(".cart__body-product-money").innerText = `${money_2(data.money)}`;
            }
        };
        xhr.send(formData);
    } else {
        deleteProduct(productID);
    }
}

function openModal() {
    document.querySelector(".modal").classList.add("open");
}

function exitModal() {
    document.querySelector(".modal").classList.remove("open");
}

function deleteProductModal(productID) {
    var formData = new FormData();
    formData.append("userID", getCookies("userID"));
    formData.append('productID', productID);
    var xhr = new XMLHttpRequest();
    xhr.open('delete', '/cart/delete-item', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);

            exitModal();
            if (data.status.statusCode == 1) {
                document.getElementById("product__" + productID).style.display = 'none';
                toast({ title: "Thông báo", msg: `${data.status.message}`, type: "success", duration: 5000 });
            }
        }
    };
    xhr.send(formData);
}

function deleteProduct(productID) {
    openModal();
    let html = "";
    html += `
                <div class="modal__confirm">
                    <div class="modal__confirm-header">
                        <div class="modal__confirm-title">Thông báo</div>
                        <i class="uil uil-multiply modal__confirm-close" onclick="exitModal()"></i>
                    </div>
                    <div class="modal__confirm-desc">
                        Bạn muốn xoá mặt hàng này khỏi giỏ?
                    </div>
                    <div class="modal__confirm-btns">
                        <div class="modal__confirm-btn-destroy" onclick="exitModal()">Huỷ</div>
                        <div class="modal__confirm-btn-send"onclick="deleteProductModal(${productID})"">Đồng ý</div>
                    </div>
                </div>
        `;
    document.querySelector(".modal__body").innerHTML = html;
}

// Checkout
function checkAllProduct(input) {
    const checkProduct = document.querySelectorAll(".cart__checkout-input"); // Các thẻ input render ra sau

    if (input.checked) {
        for (let i = 0; i < checkProduct.length; i++) {
            checkProduct[i].checked = true; // Nguồn: https://stackoverflow.com/questions/8206565/check-uncheck-checkbox-with-javascript
            var xhr = new XMLHttpRequest();
            xhr.open('post', '/Order/Checkout', true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    const data = JSON.parse(xhr.responseText);
                    console.log(data);
                    data.totalMoney.map(obj => {
                        document.querySelector(".cart__purchase-payment-total-sub").innerHTML = `Tổng thanh toán (${data.cartCount} sản phẩm):
                        <span>${money(obj.dTotalMoney)} đ</span>`;
                    });
                }
            };
            xhr.send(null);
        }
    } else {
        for (let i = 0; i < checkProduct.length; i++) {
            checkProduct[i].checked = false; // Nguồn: https://stackoverflow.com/questions/8206565/check-uncheck-checkbox-with-javascript
            document.querySelector(".cart__purchase-payment-total-sub").innerHTML = `Tổng thanh toán (0 sản phẩm):
                <span>0 đ</span>`;
        }
    }
}

function deleteAllProductModal() {
    let userID = getCookies("userID");
    if (userID == undefined) {
        userID = 0;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('get', '/cart-data?userID=' + userID +'', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);
            let html = "";
            html += `
            <div class="modal">
                <div class="modal__overlay">
                
                </div>
                <div class="modal__body">
                    <!--Form message -->
                    <div class="auth-form">
                        <div class="auth-form__container">
                            <p class="auth-form__msg">Bạn muốn bỏ ${data.cartCount} sản phẩm?</p>
                            <div class="auth-form__controls">
                                <button onclick="exitModal()" class="btn btn--primary">HUỶ</button>
                                <button onclick="deleteAllProduct(${userID})" class="btn">ĐỒNG Ý</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
            document.querySelector(".cart__message").innerHTML = html;
            document.querySelector(".modal").classList.add("open");
        }
    };
    xhr.send(null);
}

function deleteAllProduct(userID) {
    var formData = new FormData();
    formData.append("userID", userID);
    var xhr = new XMLHttpRequest();
    xhr.open('delete', '/cart/delete-all', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);

            document.querySelector('.modal').classList.remove('open');
            document.querySelector(".cart__delete-loading .modal").style.display = 'flex';
            setTimeout(() => {
                document.querySelector(".cart__delete-loading .modal").style.display = 'none';
                setTimeout(() => {
                    let noCartHtml = "";
                    noCartHtml +=  `
                    <div class="cart__no">
                        <div style="background-image: url(/img/no-cart.png);" class="cart__no-img"></div>
                        <div class="cart__no-sub">Giỏ hàng của bạn còn trống</div>
                        <a href="/" class="btn btn--primary">Mua ngay</a>
                    </div>
                    `;
                    document.querySelector(".cart").innerHTML = noCartHtml;
                    toast({ title: "Thông báo", msg: `${data.message}`, type: "success", duration: 5000 });
                    document.querySelector("cart__have").style.display = 'none';
                }, 1000);
            }, 2000);
        }
    };
    xhr.send(formData);
}

function addToCheckout(productID, shopID, event) {
    const parentElement = event.target.parentNode;
    const cartBody = parentElement.parentNode;
    var quantity = cartBody.querySelector("#qnt").value;
    // console.log(quantity);
    var formData = new FormData();
    formData.append('productID', productID);
    formData.append('shopID', shopID);
    formData.append('quantity', quantity);
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/checkout/add-to-checkout', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);

            document.querySelector(".cart__purchase-payment-total-sub").innerHTML = `Tổng thanh toán (${data.productCount} sản phẩm):<span>${money_2(data.totalPrice)}</span>`

        }
    };
    xhr.send(formData);
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
console.log(money(56000));

// JS Mobile
function changeBottomCheckout(input) {
    if (input.innerText == "Sửa") {
        document.querySelector(".cart__mobile-checkout-voucher").classList.add("hide");
        document.querySelector(".cart__mobile-checkout-money-text").classList.add("hide");
        document.querySelector(".cart__mobile-checkout-money-btn").classList.add("hide");
        document.querySelector(".cart__mobile-checkout-money-btn-delete").classList.add("show");
        input.innerText = "Hoàn thành";
    } else {
        document.querySelector(".cart__mobile-checkout-voucher").classList.remove("hide");
        document.querySelector(".cart__mobile-checkout-money-text").classList.remove("hide");
        document.querySelector(".cart__mobile-checkout-money-btn").classList.remove("hide");
        document.querySelector(".cart__mobile-checkout-money-btn-delete").classList.remove("show");
        input.innerText = "Sửa";
    }
}

function plusMobile(event) {
    const parentElement = event.target.parentNode;
    var plus = parentElement.querySelector(".cart__mobile-item-product-quantity-input").value;
    var input = parentElement.querySelector(".cart__mobile-item-product-quantity-input");
    if (parseInt(plus) < 10) {
        input.value = parseInt(plus) + 1;
    } else {
        document.querySelector(".modal").classList.add("open");
        let html = "";
        html += `
            <div class="confirm">
                <div class="confirm__msg">Số lượng mặt hàng trong kho không đủ!</div>
                <div class="confirm__btn-back">
                    <div class="btn btn--primary" onclick="exitModal()">Trở lại</div>
                </div>
            </div>
        `;
        document.querySelector(".modal__body").innerHTML = html;
    }
}

function lessMobile(event) {
    const parentElement = event.target.parentNode;
    var less = parentElement.querySelector(".cart__mobile-item-product-quantity-input").value;
    var input = parentElement.querySelector(".cart__mobile-item-product-quantity-input");
    if (parseInt(less) > 1) {
        input.value = parseInt(less) - 1;
    } else {
        openDeleteModal()
    }
}

function openDeleteModal() {
    document.querySelector(".modal").classList.add("open");
    let html = "";
    html += `
    <div class="cart__delete">
        <div class="cart__delete-msg">Bạn có chắc muốn xoá sản phẩm?</div>
        <div class="cart__delete-btns">
            <div class="cart__delete-btn-no" onclick="exitModal()">Không</div>
            <div class="cart__delete-btn-agree">Đồng ý</div>
        </div>
    </div>
    `;
    document.querySelector(".modal__body").innerHTML = html;
}

window.addEventListener('click', (e) => {
    if (e.target == document.querySelector(".modal__overlay")) {
        document.querySelector(".modal").classList.remove("open");
    }
});

function showBottomSheetVoucher() {
    document.querySelector(".cart__mobile-voucher-bottom-sheet-overlay").classList.add("show");
    document.querySelector(".cart__mobile-voucher-bottom-sheet-container").classList.add("show");
}

function hideBottomSheetVoucher() {
    document.querySelector(".cart__mobile-voucher-bottom-sheet-overlay").classList.remove("show");
    document.querySelector(".cart__mobile-voucher-bottom-sheet-container").classList.remove("show");
}

window.addEventListener('click', (e) => {
    if (e.target == document.querySelector(".cart__mobile-voucher-bottom-sheet-overlay")) {
        document.querySelector(".cart__mobile-voucher-bottom-sheet-overlay").classList.remove("show");
        document.querySelector(".cart__mobile-voucher-bottom-sheet-container").classList.remove("show");
    }
});

function showBottomSheetTransport() {
    document.querySelector(".cart__mobile-transport-bottom-sheet-overlay").classList.add("show");
    document.querySelector(".cart__mobile-transport-bottom-sheet-container").classList.add("show");
}

window.addEventListener('click', (e) => {
    if (e.target == document.querySelector(".cart__mobile-transport-bottom-sheet-overlay")) {
        document.querySelector(".cart__mobile-transport-bottom-sheet-overlay").classList.remove("show");
        document.querySelector(".cart__mobile-transport-bottom-sheet-container").classList.remove("show");
    }
});

function openDeleteAllModal() {
    document.querySelector(".modal").classList.add("open");
    let html = "";
    html += `
    <div class="cart__delete">
        <div class="cart__delete-msg">Bạn có chắc muốn 2 xoá sản phẩm?</div>
        <div class="cart__delete-btns">
            <div class="cart__delete-btn-no" onclick="exitModal()">Không</div>
            <div class="cart__delete-btn-agree">Đồng ý</div>
        </div>
    </div>
    `;
    document.querySelector(".modal__body").innerHTML = html;
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