// lấy số lượng sản phẩm giỏ hàng, khi khai báo window.onload ở site.js thì ở file này ta không khai báo nữa
function getCartInfo() {
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/Cart/GetCartInfo', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);

            getCartItemsDestop(data);

            getCartItemsMobile(data);
            
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
            <div class="cart__purchase">
                <div class="cart__purchase-voucher">
                    <div class="cart__purchase-voucher-title">
                        <i class="uil uil-store cart__body-discount-icon"></i>
                        <div class="cart__purchase-voucher-sub">F4 Shop Voucher</div>
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
                            <a href="/checkout" class="btn btn--primary">Mua hàng</a>
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
            <span>F4 Shop Mall</span>
            <div class="cart__body-header-text">LenovoThinkplus.vn</div>
            <a href="#" class="cart__body-header-chat">
                <i class="uil uil-chat cart__body-header-chat-icon"></i>
            </a>
        </div>
        <div class="cart__body-product">
            <div class="cart__input">
                <input type="checkbox" class="cart__checkout-input" onchange="addToCheckout(${obj.pK_iProductID}, event)" name="" id="">
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
                <div class="cart__body-product-cost-new">${money(obj.dUnitPrice)} đ</div>
            </div>
            <div class="cart__body-product-quantity">
                <div class="cart__count-btns">
                    <button type="button" class="cart__btn-add" onclick="tru(event, ${obj.pK_iProductID}, ${obj.dUnitPrice})">-</button>
                    <input name="qnt" type="text" id="qnt" value="${obj.iQuantity}" class="cart__count-input" />
                    <button type="button" class="cart__btn-sub" onclick="cong(event, ${obj.pK_iProductID}, ${obj.dUnitPrice})">+</button>
                </div>
            </div>
            <div class="cart__body-product-money">${money(obj.dMoney)} đ</div>
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
                                            <div class="cart__mobile-item-product-price-new">${money(obj.dMoney)}đ</div>
                                        </div>
                                        <div class="cart__mobile-item-product-quantity">
                                            <div class="cart__mobile-item-product-quantity-btn-plus">+</div>
                                            <input type="text" class="cart__mobile-item-product-quantity-input"
                                                value="1">
                                            <div class="cart__mobile-item-product-quantity-btn-less">-</div>
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
        formData.append('quantity', input.value);
        formData.append('productID', productID);
        formData.append('unitPrice', unitPrice)
        var xhr = new XMLHttpRequest();
        xhr.open('post', '/Cart/Quantity', true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const data = JSON.parse(xhr.responseText);
                const trParent = parentElement.parentNode.parentNode;
                //console.log(trParent);
                trParent.querySelector(".cart__body-product-money").innerText = `${money(data.money)} đ`;
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
        formData.append('quantity', input.value);
        formData.append('productID', productID);
        formData.append('unitPrice', unitPrice);
        var xhr = new XMLHttpRequest();
        xhr.open('post', '/Cart/Quantity', true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const data = JSON.parse(xhr.responseText);
                const trParent = parentElement.parentNode.parentNode;
                trParent.querySelector(".cart__body-product-money").innerText = `${money(data.money)} đ`;
            }
        };
        xhr.send(formData);
    } else {
        deleteProduct(productID);
    }
}

function exitModal() {
    document.querySelector(".modal").classList.remove("open");
}

function deleteProductModal(productID) {
    var formData = new FormData();
    formData.append('productID', productID);
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/Cart/DeleteProduct', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);
            document.querySelector(".modal").classList.remove("open");
            document.querySelector(".header__cart-notice").innerText = data.cartCount;
            document.querySelector(".table__total-count").innerText = `Có ${data.cartCount} sản phẩm trong giỏ hàng của bạn`;
            document.getElementById("product__" + productID).style.display = 'none';
            toast({ title: "Thông báo", msg: `${data.message}`, type: "success", duration: 5000 });
        }
    };
    xhr.send(formData);
}

function deleteProduct(productID) {
    let html = "";
    html += `
        <div class="modal">
            <div class="modal__overlay">
    
            </div>
            <div class="modal__body">
                <!--Form message -->
                <div class="auth-form">
                    <div class="auth-form__container">
                        <p class="auth-form__msg">Bạn muốn xoá mặt hàng này khỏi giỏ?</p>
                        <div class="auth-form__controls">
                            <button onclick="exitModal()" class="btn btn--primary">HUỶ</button>
                            <button class="btn" onclick="deleteProductModal(${productID})">ĐỒNG Ý</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    document.querySelector(".cart__message").innerHTML = html;
    document.querySelector(".modal").classList.add("open");
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
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/Cart/GetCartInfo', true);
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
                                <button onclick="deleteAllProduct()" class="btn">ĐỒNG Ý</button>
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

function deleteAllProduct() {
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/Cart/DeleteAllProduct', true);
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
    xhr.send(null);
}

function addToCheckout(productID, event) {
    const parentElement = event.target.parentNode;
    const cartBody = parentElement.parentNode;
    var quantity = cartBody.querySelector("#qnt").value;
    // console.log(quantity);
    var formData = new FormData();
    formData.append('productID', productID);
    formData.append('quantity', quantity);
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/checkout/add-to-checkout', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);
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
    if (millions == 0) {
        result = `${hundred_thousand}${tens_of_thousands}${thousand}.${hundreds}${tens}${unit}`;
    } else {
        result = `${millions}.${hundred_thousand}${tens_of_thousands}${thousand}.${hundreds}${tens}${unit}`;
    }
    return result;
}
console.log(money(9800999));