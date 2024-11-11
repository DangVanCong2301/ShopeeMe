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

            setDataReviewer(data);
        }
    };
    xhr.send(null);
}
getDataDetail();

function loadProductNameInHeader(data) {
    document.querySelector(".header__mobile-product-name").innerText = data.product[0].sProductName;
}

function loadDetailInfo(data) {
    let htmlProductDetail = ""; 
    htmlProductDetail += `  
                            <div class="detail__product">
                                <div class="detail__left">
                                    <img src="/img/${data.product[0].sImageUrl}" alt="product image" class="detail__left-img" />
                                    <div class="detai__left-progress">
                                        <!-- <div class="spinner detai__left-progress-spinner"></div> -->
                                        <i class="uil uil-shopping-bag detai__left-progress-icon"></i>
                                    </div>
                                </div>
                                <div class="detail__right">
                                    <h2 class="detail__right-title">${data.product[0].sProductName}</h2>
                                    <div class="detail__price">`;
                                    if (data.product[0].dPerDiscount != 1) {
                                        htmlProductDetail += `<p class="detail__price-old"><span>${money(data.product[0].dPrice)} đ</span></p>`;
                                        htmlProductDetail += `<p class="detail__price-new"><span>${money((data.product[0].dPrice * (1 - data.product[0].dPerDiscount)))} đ</span></p>`;
                                    } else {
                                        htmlProductDetail += `          <p class="detail__price-new"><span>${money(data.product[0].dPrice)} đ</span></p>`;
                                    }
        htmlProductDetail += `      </div>
                                    <div class="detail__policy-destop-mobile hide-on-destop">
                                        <div class="detail__policy-destop-mobile-container">
                                            <i class="uil uil-cube detail__policy-destop-mobile-icon"></i>
                                            <div class="detail__policy-destop-mobile-desc">
                                                <div class="detail__policy-destop-mobile-title">Đổi ý miễn phí 15 ngày</div>
                                                <div class="detail__policy-destop-mobile-sub">Miễn 100% phí trả hàng</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="detail__policy-destop hide-on-mobile">
                                        <div class="detail__policy">
                                            <div class="detail__policy-title">Chính sách trả hàng</div>
                                            <div class="detail__policy-desc">
                                                <div class="detail__policy-desc-time">
                                                    <i class="uil uil-cube detail__policy-desc-time-icon"></i>
                                                    Trả hàng 15 ngày
                                                </div>
                                                <div class="detail__policy-desc-change">
                                                    <span class="detail__policy-desc-change-name">Đổi ý miễn phí </span>
                                                    <span class="detail__policy-desc-change-ques">
                                                        <i class="uil uil-question-circle detail__policy-desc-change-ques-icon"></i>
                                                        <div class="detail__policy-desc-change-more">
                                                            Miễn phí Trả hàng trong 15 ngày nếu Đổi ý (hàng trả phải còn nguyên seal, 
                                                            tem, hộp sản phẩm), áp dụng cho một số sản phẩm nhất định. Ngoài ra, tại 
                                                            thời điểm nhận hàng, bạn có thể đồng kiểm và được trả hàng miễn phí. 
                                                            <a href="" class="detail__policy-desc-change-more-link">Xem thêm</a>
                                                        </div>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="detail__transport-destop hide-on-mobile">
                                        <div class="detail__transport">
                                            <div class="detail__transport-title">Vận chuyển</div>
                                            <div class="detail__transport-desc">
                                                <div class="detail__transport-desc-top">
                                                    <img src="/img/free_ship.png" class="detail__transport-desc-top-img" alt="">
                                                    <div class="detail__transport-desc-top-sub">Miễn phí vận chuyển</div>
                                                </div>
                                                <div class="detail__transport-desc-bottom">
                                                    <div class="detail__transport-desc-bottom-left">
                                                        <i class="uil uil-truck detail__transport-desc-bottom-icon"></i>
                                                    </div>
                                                    <div class="detail__transport-desc-bottom-right">
                                                        <div class="detail__transport-location">
                                                            <div class="detail__transport-location-title">Vận chuyển tới</div>
                                                            <div class="detail__transport-location-name">
                                                                Phường Định Công, Quận Hoàng Mai, Hà Nội 
                                                                <span class="detail__transport-location-down" onclick="openAddressModal()">
                                                                    <i class="uil uil-angle-down detail__transport-location-down-icon"></i>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div class="detail__transport-price">
                                                            <div class="detail__transport-price-title">Phí vận chuyển</div>
                                                            <div class="detail__transport-price-name">
                                                                0 đ - 16.500 đ 
                                                                <span class="detail__transport-price-down">
                                                                    <i class="uil uil-angle-down detail__transport-price-down-icon"></i>
                                                                    <div class="detail__transport-price-more">
                                                                        <div class="detail__transport-price-more-name">
                                                                            <div class="detail__transport-price-more-title">Nhanh</div>
                                                                            <div class="detail__transport-price-more-price">16.500 đ</div>
                                                                            <div class="detail__transport-price-more-sub hide-on-destop">Miễn phí vận chuyển</div>
                                                                        </div>
                                                                        <div class="detail__transport-price-more-time">Nhận hàng vào 28 Tháng 7 - 30 Tháng 7</div>
                                                                    </div>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="detail__text">
                                        <h2 class="detail__text-title">về mặt hàng này: </h2>
                                        <p class="detail__text-desc">
                                            ${data.product[0].sProductDescription}
                                        </p>
                                    </div>
                                    <div class="detail__btns hide-on-mobile">
                                        <div class="detail__btn-count">
                                            <button type="button" class="detail__btn-count-btn" onclick="reduceProduct(event)">-</button>
                                            <input type="text" name="quantity" id="qnt" value="0" class="detail__btn-count-input" />
                                            <button type="button" class="detail__btn-count-btn" onclick="increaseProduct(event)">+</button>
                                        </div>
                                        <button type="button" onclick="addToCart(${data.product[0].pK_iProductID}, ${data.product[0].dPrice})" class="detail__btn-add"> Thêm vào giỏ
                                            <i class="fas fa-shopping-cart detail__cart-icon"></i>
                                        </button>
                                        <button type="button" class="btn btn--primary detail__btn-buy-now" onclick="noticeIncompleteFunc()">Mua ngay</button>
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
                            </div>
                            <div class="detail-mobile__transport hide-on-destop">
                                <div class="detail-mobile__transport-free">
                                    <div class="detail-mobile__transport-free-thumb">
                                        <img src="/img/free_ship.png" alt="" class="detail-mobile__transport-free-img">
                                    </div>
                                    <div class="detail-mobile__transport-free-sub">Miễn phí vận chuyển</div>
                                </div>
                                <div class="detail-mobile__transport-price">
                                    <div class="detail-mobile__transport-price-truck">
                                        <i class="uil uil-truck detail-mobile__transport-price-truck-icon"></i>
                                    </div>
                                    <div class="detail-mobile__transport-price-detail">
                                        <div class="detail-mobile__transport-price-sub">Phí vận chuyển: 0 đ - 16.500 đ</div>
                                        <div class="detail-mobile__transport-price-down" onclick="openBottomSheetTransport()">
                                            <i class="uil uil-angle-down detail-mobile__transport-price-down-icon"></i>
                                        </div>
                                        <div class="detail-mobile__transport-price-modal">
                                            <div class="detail-mobile__transport-price-modal-overlay"></div>
                                            <div class="detail-mobile__transport-price-modal-container">
                                                <div class="detail-mobile__transport-price-modal-header">Phí Vận Chuyển</div>
                                                <div class="detail-mobile__transport-price-modal-location">
                                                    <div class="detail-mobile__transport-price-modal-location-sub">Vận chuyển đến: </div>
                                                    <div class="detail-mobile__transport-price-modal-location-desc">Phường Định Công, Quận Hoàng Mai, Hà Nội</div>
                                                    <div class="detail-mobile__transport-price-modal-location-down" onclick="openAddressFormModalMobile()">
                                                        <i class="uil uil-angle-right-b detail-mobile__transport-price-modal-location-down-icon"></i>
                                                    </div>
                                                </div>
                                                <div class="detail-mobile__transport-price-modal-body">
                                                    <div class="detail-mobile__transport-price-modal-body-detail">
                                                        <div class="detail-mobile__transport-price-modal-body-sub">Nhanh</div>
                                                        <div class="detail-mobile__transport-price-modal-body-numb">16.500 đ</div>
                                                    </div>
                                                    <div class="detail-mobile__transport-price-modal-body-time">Nhận hàng vào 28 Tháng 7 - 30 Tháng 7</div>
                                                </div>
                                                <div class="detail-mobile__transport-price-modal-btn" onclick="closeBottomSheetTransport()">
                                                    OK
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="address-form-mobile">
                                        <div class="address-form-mobile__header">
                                            <div class="address-form-mobile__header-back" onclick="closeAddressFormModalMobile()">
                                                <i class="uil uil-arrow-left address-form-mobile__header-back-icon"></i>
                                            </div>
                                            <div class="address-form-mobile__header-title">Địa chỉ nhận hàng</div>
                                        </div>
                                        <div class="address-form-mobile__search">
                                            <input type="text" class="address-form-mobile__search-input" placeholder="Tìm Thành phố, Quận/Huyện">
                                        </div>
                                        <div class="address-form-mobile__body">
                                            <div class="address-form-mobile__body-title">Địa chỉ của tôi</div>
                                            <div class="address-form-mobile__body-list">
                                                <ul class="address-form__list">
                                                    <li class="address-form__item default">
                                                        <div class="address-form__item-box">
                                                            <input type="radio" name="address" class="address-form__item-input">
                                                        </div>
                                                        <div class="address-form__item-content">
                                                            <div class="address-form__item-header">
                                                                <div class="address-form__item-header-info">
                                                                    <div class="address-form__item-name">Đặng Văn Công</div>
                                                                    <div class="address-form__item-phone">(+84) 347797502</div>
                                                                </div>
                                                            </div>
                                                            <div class="address-form__item-body">
                                                                <div class="address-form__item-body-row">Số 20, Ngõ 259 Định Công, Phường Định Công</div>
                                                                <div class="address-form__item-body-row">Quận Hoàng Mai, Hà Nội</div>
                                                            </div>
                                                            <button class="address-form__item-sub">Mặc định</button>
                                                        </div>
                                                    </li>
                                                    <li class="address-form__item">
                                                        <div class="address-form__item-box">
                                                            <input type="radio" name="address" class="address-form__item-input">
                                                        </div>
                                                        <div class="address-form__item-content">
                                                            <div class="address-form__item-header">
                                                                <div class="address-form__item-header-info">
                                                                    <div class="address-form__item-name">Đặng Văn Công</div>
                                                                    <div class="address-form__item-phone">(+84) 347797502</div>
                                                                </div>
                                                            </div>
                                                            <div class="address-form__item-body">
                                                                <div class="address-form__item-body-row">Số 20, Ngõ 259 Định Công, Phường Định Công</div>
                                                                <div class="address-form__item-body-row">Quận Hoàng Mai, Hà Nội</div>
                                                            </div>
                                                            <button class="address-form__item-sub">Mặc định</button>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="address-form-mobile__body-add">
                                                <i class="uil uil-plus-circle address-form-mobile__body-add-icon"></i>
                                                <div class="address-form-mobile__body-add-sub">Thêm địa chỉ</div>
                                                <div class="address-form-mobile__body-add-more">
                                                    <i class="uil uil-angle-right-b address-form-mobile__body-add-more"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="detail__shop">
                                <div class="detail__shop-left">
                                    <div class="detail__shop-avatar">
                                        <img src="/img/${data.store[0].sImageAvatar}" class="detail__shop-avatar-img" alt="">
                                        <span class="detail__shop-avatar-favorite">Yêu thích</span>
                                    </div>
                                    <div class="detail__shop-info">
                                        <div class="detail__shop-info-name">${data.store[0].sStoreName}</div>
                                        <div class="detail__shop-info-active">Online 33 phút trước</div>
                                        <div class="detail__shop-info-direction hide-on-destop">
                                            <i class="uil uil-map-marker detail__shop-info-direction-icon"></i>
                                            <span>Hà Nội</span>
                                        </div>
                                        <div class="detail__shop-info-btns hide-on-mobile">
                                            <div class="detail__shop-info-btn-chat">
                                                <i class="uil uil-comment-alt detail__shop-info-btn-chat-icon"></i>
                                                <span>Chat ngay</span>
                                            </div>
                                            <a href="/shop/${data.store[0].sStoreUsername}" class="detail__shop-info-btn-view">
                                                <i class="uil uil-store-alt detail__shop-info-btn-view-icon"></i>
                                                <span>Xem Shop</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="detail__shop-info-btn-view-mobile hide-on-destop">
                                        <div class="detail__shop-info-btn-view">
                                            <span>Xem Shop</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="detail__shop-right">
                                    <div class="detail__shop-item">
                                        <div class="detail__shop-item-name">Đánh giá</div>
                                        <div class="detail__shop-item-numb">25,9k</div>
                                    </div>
                                    <div class="detail__shop-item">
                                        <div class="detail__shop-item-name">Tỉ lệ phản hồi</div>
                                        <div class="detail__shop-item-numb">99%</div>
                                    </div>
                                    <div class="detail__shop-item">
                                        <div class="detail__shop-item-name hide-on-mobile">Tham gia</div>
                                        <div class="detail__shop-item-numb hide-on-mobile">5 năm trước</div>
                                    </div>
                                    <div class="detail__shop-item">
                                        <div class="detail__shop-item-name">Sản phẩm</div>
                                        <div class="detail__shop-item-numb">142</div>
                                    </div>
                                    <div class="detail__shop-item">
                                        <div class="detail__shop-item-name hide-on-mobile">Thời gian phản hồi</div>
                                        <div class="detail__shop-item-numb hide-on-mobile">trong vài giờ</div>
                                    </div>
                                    <div class="detail__shop-item">
                                        <div class="detail__shop-item-name hide-on-mobile">Người theo dõi</div>
                                        <div class="detail__shop-item-numb hide-on-mobile">2,6k</div>
                                    </div>
                                </div>
                            </div>
    `;
    document.querySelector(".detail").innerHTML = htmlProductDetail;
    loadingProductDetail();

    document.querySelector(".detail__shop-info-btn-chat").addEventListener("click", () => {
        showChat(data);
    });
}

function showChat(data) {
    if (data.userInfo.length == 0) {
        openModal();
        document.querySelector(".modal__body").innerHTML = 
                `
                <div class="modal__confirm">
                    <div class="modal__confirm-header">
                        <div class="modal__confirm-title">Thông báo</div>
                    </div>
                    <div class="modal__confirm-desc">
                        Bạn chưa đăng nhập!
                    </div>
                    <div class="modal__confirm-btns">
                        <div class="modal__confirm-btn-destroy" onclick="closeModal()">Huỷ</div>
                        <a href="/user/login" class="modal__confirm-btn-send">Đăng nhập</a>
                    </div>
                </div>
                `;
    } else {
        displayChat()
    }
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
        xhr.open('post', '/cart/add-to-cart', true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const data = JSON.parse(xhr.responseText);

                console.log(data);

                let htmlCartDetail = "";
                if (data.status.statusCode == 1) {
                    toast({title: "Thông báo", msg: `${data.status.message}`, type: "success", duration: 5000});
                    data.cartDetails.forEach(element => {
                    htmlCartDetail +=
                    `<li class="header__cart-item">
                        <div class="header__cart-item-img">
                            <img src="/img/${element.sImageUrl}" class="header__cart-item-img" alt="">
                        </div>
                        <div class="header__cart-item-info">
                            <div class="header__cart-item-head">
                                <h5 class="header__cart-item-name">${element.sProductName}</h5>
                                <div class="header__cart-item-price-wrap">
                                    <span class="header__cart-item-price">${element.dUnitPrice} đ</span>
                                    <span class="header__cart-item-multifly">X</span>
                                    <span class="header__cart-item-qnt">${element.iQuantity}</span>
                                </div>
                            </div>
                            <div class="header__cart-item-body">
                                <span class="header__cart-item-description">
                                    Phân loại hàng:Bạc
                                </span>
                                <span class="header__cart-item-remove">Xoá</span>
                            </div>
                        </div>
                    </li>`;
                    });
                    document.querySelector(".header__cart-notice").innerText = data.cartCount;
                    document.querySelector(".header__cart-list-item").innerHTML = htmlCartDetail;
                } else if (data.status.statusCode == -1) {
                    window.location.assign("/user/login")
                } else {
                    toast({title: "Thông báo", msg: `${data.status.message}`, type: "success", duration: 5000});
                    data.cartDetails.forEach(element => {
                    htmlCartDetail +=
                        `<li class="header__cart-item">
                            <div class="header__cart-item-img">
                                <img src="/img/${element.sImageUrl}" class="header__cart-item-img" alt="">
                            </div>
                            <div class="header__cart-item-info">
                                <div class="header__cart-item-head">
                                    <h5 class="header__cart-item-name">${element.sProductName}</h5>
                                    <div class="header__cart-item-price-wrap">
                                        <span class="header__cart-item-price">${element.dUnitPrice} đ</span>
                                        <span class="header__cart-item-multifly">X</span>
                                        <span class="header__cart-item-qnt">${element.iQuantity}</span>
                                    </div>
                                </div>
                                <div class="header__cart-item-body">
                                    <span class="header__cart-item-description">
                                        Phân loại hàng:Bạc
                                    </span>
                                    <span class="header__cart-item-remove">Xoá</span>
                                </div>
                            </div>
                        </li>`;
                        });
                    document.querySelector(".header__cart-notice").innerText = data.cartCount;
                    document.querySelector(".header__cart-list-item").innerHTML = htmlCartDetail;
                }

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
function setDataReviewer(data) {
    let htmlReviewer = "";
    htmlReviewer += 
    `
        <div class="comment__title">ĐÁNH GIÁ VÀ NHẬN XÉT SẢN PHẨM</div>
            <div class="rate">
                <div class="rate__header">
                    <div class="rate__title">
                        <div class="rate__title-point">4.8</div>
                        <div class="rate__title-total">/5</div>
                    </div>
                    <div class="rate__stars">
                        <i class="uis uis-star"></i>
                        <i class="uis uis-star"></i>
                        <i class="uis uis-star"></i>
                        <i class="uis uis-star"></i>
                        <i class="uis uis-star-half-alt"></i>
                    </div>
                    <div class="rate__evaluate">300 đánh giá</div>
                </div>
                <div class="rate__body">
                    <div class="rate__star">
                        <div class="rate__star-5-icon">
                            <i class="uis uis-star rate__icon"></i>
                            <i class="uis uis-star rate__icon"></i>
                            <i class="uis uis-star rate__icon"></i>
                            <i class="uis uis-star rate__icon"></i>
                            <i class="uis uis-star rate__icon"></i>
                        </div>
                        <div class="rate__num-5-percent">
                            <div class="rate__bar">
                                <span class="rate__percent-box"></span>
                            </div>
                            <div class="rate__percent-count">226</div>
                        </div>
                    </div>
                    <div class="rate__star">
                        <div class="rate__star-4-icon">
                            <i class="uis uis-star rate__icon"></i>
                            <i class="uis uis-star rate__icon"></i>
                            <i class="uis uis-star rate__icon"></i>
                            <i class="uis uis-star rate__icon"></i>
                            <i class="uis uis-star rate__icon-blur"></i>
                        </div>
                        <div class="rate__num-4-percent">
                            <div class="rate__bar">
                                <span class="rate__percent-box"></span>
                            </div>
                            <div class="rate__percent-count">226</div>
                        </div>
                    </div>
                    <div class="rate__star">
                        <div class="rate__star-3-icon">
                            <i class="uis uis-star rate__icon"></i>
                            <i class="uis uis-star rate__icon"></i>
                            <i class="uis uis-star rate__icon"></i>
                            <i class="uis uis-star rate__icon-blur"></i>
                            <i class="uis uis-star rate__icon-blur"></i>
                        </div>
                        <div class="rate__num-3-percent">
                            <div class="rate__bar">
                                <span class="rate__percent-box"></span>
                            </div>
                            <div class="rate__percent-count">226</div>
                        </div>
                    </div>
                    <div class="rate__star">
                        <div class="rate__star-2-icon">
                            <i class="uis uis-star rate__icon"></i>
                            <i class="uis uis-star rate__icon"></i>
                            <i class="uis uis-star rate__icon-blur"></i>
                            <i class="uis uis-star rate__icon-blur"></i>
                            <i class="uis uis-star rate__icon-blur"></i>
                        </div>
                        <div class="rate__num-2-percent">
                            <div class="rate__bar">
                                <span class="rate__percent-box"></span>
                            </div>
                            <div class="rate__percent-count">226</div>
                        </div>
                    </div>
                    <div class="rate__star">
                        <div class="rate__star-1-icon">
                            <i class="uis uis-star rate__icon"></i>
                            <i class="uis uis-star rate__icon-blur"></i>
                            <i class="uis uis-star rate__icon-blur"></i>
                            <i class="uis uis-star rate__icon-blur"></i>
                            <i class="uis uis-star rate__icon-blur"></i>
                        </div>
                        <div class="rate__num-1-percent">
                            <div class="rate__bar">
                                <span class="rate__percent-box"></span>
                            </div>
                            <div class="rate__percent-count">226</div>
                        </div>
                    </div>
                </div>
                <div class="rate__me">
                    <div class="rate__me-title">Đánh giá của bạn</div>
                    <div class="rate__me-stars">
                        <i class="uis uis-star"></i>
                        <i class="uis uis-star"></i>
                        <i class="uis uis-star"></i>
                        <i class="uis uis-star"></i>
                        <i class="uis uis-star"></i>
                    </div>
                    <button class="btn btn--primary btn-evaluate">Gửi đánh giá</button>
                </div>
            </div>
            <div class="comment__body">
                <div class="comment__body-header">
                    <div class="comment__body-header-quantity">${data.reviewers.length} bình luận</div>
                    <div class="comment__body-header-sort">
                        <i class="uil uil-list-ui-alt comment__body-header-sort-icon"></i>
                        <div class="comment__body-header-sort-sub">Sắp xếp theo</div>
                        <div class="comment__body-header-sort-container">
                            <div class="comment__body-header-sort-item">Bình luận hàng đầu</div>
                            <div class="comment__body-header-sort-item">Mới nhất xếp trước</div>
                        </div>
                    </div>
                </div>`;
                if (data.userInfo.length != 0) {
                    htmlReviewer += `
                    <div class="comment__add">
                        <div class="comment__add-avatar" style="background-image: url(/img/profile_avatar.jpg);">
                        </div>
                        <div class="comment__add-desc">
                            <div class="comment__add-control">
                                <input type="text" placeholder="Phản hồi..." class="comment__add-input"
                                    onclick="showCommentAddBtn()" onkeyup="changeCommentAddBtn(this)">
                            </div>
                            <div class="comment__add-btns">
                                <div class="comment__add-btn-felling">
                                    <i class="uil uil-smile-beam comment__add-btn-felling-icon"></i>
                                </div>
                                <div class="comment__add-btn">
                                    <div class="comment__add-btn-destroy" onclick="hideCommentAddBtn()">Huỷ</div>
                                    <div class="comment__add-btn-reply">Phản hồi</div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                } 
                htmlReviewer += `
                <div class="comment__body-list">`;
                if (data.reviewers.length == 0) {
                    htmlReviewer += 
                    `
                    <div class="comment__no-list">
                        Chưa có bình luận
                    </div>
                    `;
                } else {
                    data.reviewers.forEach(element => {
                        htmlReviewer += `
                        <div class="comment__body-item">
                            <div class="comment__container">
                                <div class="comment__user">
                                    <img src="/img/${element.sImageProfile}" alt="" class="comment__user-img">
                                    <p class="comment__username">${element.sUserName}</p>
                                    <p class="comment__at">2 tuần trước</p>
                                </div>
                                <div class="comment__more">
                                    <i class="uil uil-ellipsis-v comment__more-icon"></i>
                                    <div class="comment__more-container">
                                        <div class="comment__more-item">
                                            <i class="uil uil-pen comment__more-item-icon"></i>
                                            <span>Chỉnh sửa</span>
                                        </div>
                                        <div class="comment__more-item">
                                            <i class="uil uil-trash comment__more-item-icon"></i>
                                            <span>Xoá</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="comment__controls">
                                    <div class="comment__like">
                                        <i class="uil uil-thumbs-up comment__like-icon"></i>
                                        <div class="comment__like-quantity">12</div>
                                    </div>
                                    <div class="comment__dislike">
                                        <i class="uil uil-thumbs-down comment__dislike-icon"></i>
                                        <div class="comment__dislike-quantity">12</div>
                                    </div>
                                    <div class="comment__reply">
                                        Phản hồi
                                    </div>
                                </div>
                                <div class="comment__text">
                                    <span class="comment__reply-to"></span>
                                    <div class="comment__reviewer-stars">`;
                                    for (let i = 0; i < element.iStars; i++) {
                                        htmlReviewer += `
                                        <i class="uis uis-star"></i>`;
                                    }
                                    htmlReviewer += `
                                    </div>
                                    <div class="comment__rate-time">
                                        ${formatDate(element.dCreateTime)} | Phân loại hàng: ${element.sCategoryName}
                                    </div>
                                    <div class="comment__text-body">
                                        <span class="comment__reply-to">@${element.sUserName}</span>
                                        ${element.sComment}
                                    </div>`;
                                    if (element.sReviewerImage != "no_img.jpg") {
                                        htmlReviewer += `
                                    <img src="/img/${element.sReviewerImage}" class="comment__reviewer-img" alt="">`;
                                    }
                                    htmlReviewer += `
                                </div>
                            </div>
                        </div>`;   
                    });
                }
                    htmlReviewer += `
                </div>
            </div>
    `;
    document.querySelector(".comment").innerHTML = htmlReviewer;
}

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