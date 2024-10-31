function getAPISeller() {
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/seller', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);
            
            showAll(data);
        }
    };
    xhr.send(null);
}
getAPISeller();

function showAll(data) {
    document.querySelector(".admin__container").innerHTML = 
    `
                    <div class="admin__main">
                        <div class="admin__main-container">
                            <div class="admin__main-left">
                                <div class="admin__main-analys">
                                    <div class="admin__main-title">Bảng quản trị</div>
                                    <div class="admin__main-date">
                                        <input type="date" class="admin__main-date-input">
                                    </div>
                                    <div class="admin__main-insights">
                                        <div class="admin__main-sales">
                                            <div class="admin__main-box">
                                                <i class="uil uil-analytics admin__main-icon"></i>
                                            </div>
                                            <div class="admin__main-middle">
                                                <div class="admin__main-middle-left">
                                                    <div class="admin__main-middle-title">Tổng bán hàng</div>
                                                    <div class="admin__main-middle-price">1.500.000đ</div>
                                                </div>
                                                <div class="admin__main-progress">
                                                    <svg class="admin__main-progress-img">
                                                        <circle cx="38" cy="38" r="36"></circle>
                                                    </svg>
                                                    <div class="admin__main-number">
                                                        <p class="admin__main-number-text">84%</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <small class="admin__main-text-muted">24 tiếng trước</small>
                                        </div>
                                        <!-- End Of Sales -->
                                        <div class="admin__main-expenses">
                                            <div class="admin__main-box">
                                                <i class="uil uil-chart admin__main-box-icon"></i>
                                            </div>
                                            <div class="admin__main-middle">
                                                <div class="admin__main-middle-left">
                                                    <div class="admin__main-middle-title">Tổng bán hàng</div>
                                                    <div class="admin__main-middle-price">1.500.000đ</div>
                                                </div>
                                                <div class="admin__main-progress">
                                                    <svg class="admin__main-progress-img">
                                                        <circle cx="38" cy="38" r="36"></circle>
                                                    </svg>
                                                    <div class="admin__main-number">
                                                        <p class="admin__main-number-text">84%</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <small class="admin__main-text-muted">24 tiếng trước</small>
                                        </div>
                                        <!-- End Of Expenses -->
                                        <div class="admin__main-income">
                                            <div class="admin__main-box">
                                                <i class="uil uil-comparison admin__main-box-icon"></i>
                                            </div>
                                            <div class="admin__main-middle">
                                                <div class="admin__main-middle-left">
                                                    <div class="admin__main-middle-title">Tổng thu</div>
                                                    <div class="admin__main-middle-price">1.500.000đ</div>
                                                </div>
                                                <div class="admin__main-progress">
                                                    <svg class="admin__main-progress-img">
                                                        <circle cx="38" cy="38" r="36"></circle>
                                                    </svg>
                                                    <div class="admin__main-number">
                                                        <p class="admin__main-number-text">74%</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <small class="admin__main-text-muted">24 tiếng trước</small>
                                        </div>
                                        <!-- End Of Income -->
                                    </div>
                                </div>
                                <div class="admin__main-analys admin__main-to-do-list">
                                    <div class="admin__main-title admin__main-to-do-list-title">Danh sách cần làm</div>
                                    <div class="admin__main-to-do-list-list">
                                        <div class="admin__main-sales">
                                            <div class="admin__main-to-do-list-item admin__main-to-do-list-item-wait-settlment">
                                                <div class="admin__main-to-do-list-numb">
                                                    ${data.ordersWaitSettlement.length}
                                                </div>
                                                <div class="admin__main-to-do-list-sub">
                                                    Chờ xác nhận
                                                </div>
                                            </div>
                                        </div>
                                        <!-- End Of Sales -->
                                        <div class="admin__main-expenses">
                                            <div class="admin__main-to-do-list-item admin__main-to-do-list-item-wait-pickup">
                                                <div class="admin__main-to-do-list-numb">
                                                    ${data.ordersWaitPickup.length}
                                                </div>
                                                <div class="admin__main-to-do-list-sub">
                                                    Chờ lấy hàng
                                                </div>
                                            </div>
                                        </div>
                                        <!-- End Of Expenses -->
                                        <div class="admin__main-income">
                                            <div class="admin__main-to-do-list-item admin__main-to-do-list-item-processed">
                                                <div class="admin__main-to-do-list-numb">
                                                    ${data.shippingOrders.length}
                                                </div>
                                                <div class="admin__main-to-do-list-sub">
                                                    Đã xử lý
                                                </div>
                                            </div>
                                        </div>
                                        <!-- End Of Income -->
                                         <!-- End Of Expenses -->
                                        <div class="admin__main-income">
                                            <div class="admin__main-to-do-list-item">
                                                <div class="admin__main-to-do-list-numb">
                                                    0
                                                </div>
                                                <div class="admin__main-to-do-list-sub">
                                                    Đơn huỷ
                                                </div>
                                            </div>
                                        </div>
                                        <!-- End Of Income -->
                                        <div class="admin__main-expenses">
                                            <div class="admin__main-to-do-list-item">
                                                <div class="admin__main-to-do-list-numb">
                                                    0
                                                </div>
                                                <div class="admin__main-to-do-list-sub">
                                                    Trả hàng, hoàn tiền
                                                </div>
                                            </div>
                                        </div>
                                        <div class="admin__main-expenses">
                                            <div class="admin__main-to-do-list-item">
                                                <div class="admin__main-to-do-list-numb">
                                                    0
                                                </div>
                                                <div class="admin__main-to-do-list-sub">
                                                    Sản phẩm bị khoá
                                                </div>
                                            </div>
                                        </div>
                                        <div class="admin__main-expenses">
                                            <div class="admin__main-to-do-list-item">
                                                <div class="admin__main-to-do-list-numb">
                                                    0
                                                </div>
                                                <div class="admin__main-to-do-list-sub">
                                                    Sản phẩm hết hàng
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="admin__right">
                                <div class="admin__right-recent-updates">
                                    <div class="admin__right-recent-updates-title">Cập nhật gần đây</div>
                                    <div class="admin__right-recent-updates-container">
                                        <div class="admin__right-recent-updates-list">
                                            <div class="admin__right-recent-updates-item">
                                                <div class="admin__right-recent-updates-item-profile-photo">
                                                    <img src="/img/profile_avatar.jpg" alt="" class="admin__right-recent-updates-item-profile-photo-img">
                                                </div>
                                                <div class="admin__right-recent-updates-item-message">
                                                    <p class="admin__right-recent-updates-item-message-text"><b class="admin__right-recent-updates-item-message-name">Công Đặng</b> nhận được đơn đặt hàng từ Fithou bằng công nghệ GPS </p>
                                                    <small class="admin__right-recent-updates-item-message-time">2 tiếng trước</small>
                                                </div>
                                            </div>
                                            <div class="admin__right-recent-updates-item">
                                                <div class="admin__right-recent-updates-item-profile-photo">
                                                    <img src="/img/profile_avatar.jpg" alt="" class="admin__right-recent-updates-item-profile-photo-img">
                                                </div>
                                                <div class="admin__right-recent-updates-item-message">
                                                    <p class="admin__right-recent-updates-item-message-text"><b class="admin__right-recent-updates-item-message-name">Công Đặng</b> nhận được đơn đặt hàng từ Fithou bằng công nghệ GPS </p>
                                                    <small class="admin__right-recent-updates-item-message-time">2 tiếng trước</small>
                                                </div>
                                            </div>
                                            <div class="admin__right-recent-updates-item">
                                                <div class="admin__right-recent-updates-item-profile-photo">
                                                    <img src="/img/profile_avatar.jpg" alt="" class="admin__right-recent-updates-item-profile-photo-img">
                                                </div>
                                                <div class="admin__right-recent-updates-item-message">
                                                    <p class="admin__right-recent-updates-item-message-text"><b class="admin__right-recent-updates-item-message-name">Công Đặng</b> nhận được đơn đặt hàng từ Fithou bằng công nghệ GPS </p>
                                                    <small class="admin__right-recent-updates-item-message-time">2 tiếng trước</small>
                                                </div>
                                            </div>
                                        </div>
                                        <a href="#" class="admin__order-more">Xem tất cả</a>
                                    </div>
                                </div>
                                <div class="admin__right-sales-analytics">
                                    <div class="admin__right-sales-analytics-title">Phân tích bán hàng</div>
                                    <div class="admin__right-sales-analytics-container">
                                        <div class="admin__right-sales-analytics-list">
                                            <div class="admin__right-sales-analytics-item online">
                                                <div class="admin__right-sales-analytics-item-icon">
                                                    <i class="uil uil-shopping-cart-alt"></i>
                                                </div>
                                                <div class="admin__right-sales-analytics-item-right">
                                                    <div class="admin__right-sales-analytics-item-info">
                                                        <div class="admin__right-sales-analytics-item-sub">ĐẶT HÀNG ONLINE</div>
                                                        <small class="admin__right-sales-analytics-item-time">24 tiếng trước</small>
                                                    </div>
                                                    <div class="admin__right-sales-analytics-item-percent success">+39%</div>
                                                    <div class="admin__right-sales-analytics-item-quantity">1300</div>
                                                </div>
                                            </div>
                                            <div class="admin__right-sales-analytics-item offline">
                                                <div class="admin__right-sales-analytics-item-icon">
                                                    <i class="uil uil-shopping-bag"></i>
                                                </div>
                                                <div class="admin__right-sales-analytics-item-right">
                                                    <div class="admin__right-sales-analytics-item-info">
                                                        <div class="admin__right-sales-analytics-item-sub">ĐẶT HÀNG OFFLINE</div>
                                                        <small class="admin__right-sales-analytics-item-time">24 tiếng trước</small>
                                                    </div>
                                                    <div class="admin__right-sales-analytics-item-percent danger">-17%</div>
                                                    <div class="admin__right-sales-analytics-item-quantity">1300</div>
                                                </div>
                                            </div>
                                            <div class="admin__right-sales-analytics-item customers">
                                                <div class="admin__right-sales-analytics-item-icon">
                                                    <i class="uil uil-users-alt"></i>
                                                </div>
                                                <div class="admin__right-sales-analytics-item-right">
                                                    <div class="admin__right-sales-analytics-item-info">
                                                        <div class="admin__right-sales-analytics-item-sub">KHÁCH HÀNG MỚI</div>
                                                        <small class="admin__right-sales-analytics-item-time">24 tiếng trước</small>
                                                    </div>
                                                    <div class="admin__right-sales-analytics-item-percent success">+25%</div>
                                                    <div class="admin__right-sales-analytics-item-quantity">1300</div>
                                                </div>
                                            </div>
                                            <div class="admin__right-sales-analytics-item add-product">
                                                <div class="admin__right-sales-analytics-item-add-product">
                                                    <i class="uil uil-plus"></i>
                                                    <div class="admin__right-sales-analytics-item-add-product-sub">Thêm sản phẩm</div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- <div class="admin__right-sales-analytics-blur-bottom"></div> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    `;

    document.querySelector(".admin__main-to-do-list-item-wait-settlment").addEventListener('click', () => {
        showWaitingSettlment(data);
    });

    document.querySelector(".admin__main-to-do-list-item-wait-pickup").addEventListener("click", () => {
        showWaitingPickup(data);
    });

    document.querySelector(".admin__main-to-do-list-item-processed").addEventListener("click", () => {
        showProcessed(data);
    });
}

function showWaitingSettlment(data) {
    let htmlWaitSettlment = "";
    htmlWaitSettlment += 
    `
    <div class="admin__orders-waiting">
                        <div class="admin__add-product-container">
                            <div class="admin__add-product-header">
                                <div class="admin__add-product-header-item active">
                                    Tất cả
                                </div>
                                <div class="admin__add-product-header-item">
                                    Chờ xác nhận  
                                </div>
                                <div class="admin__add-product-header-item">
                                    Đang giao
                                </div>
                                <div class="admin__add-product-header-item">
                                    Đã giao
                                </div>
                            </div>
                            <div class="admin__setup-shop-body">
                                <div class="admin__setup-shop-container">
                                    <div class="admin__profile-shop-body-header">
                                        <div class="admin__add-product-title">
                                            ${data.ordersWaitSettlement.length} Đơn hàng 
                                        </div> 
                                    </div>
                                    <div class="admin__order-container">
                                        <div class="admin__order-table">
                                            <div class="admin__order-table-header">
                                                <div class="admin__order-table-header-row">
                                                    <div class="admin__order-table-header-col">Mã đơn hàng</div>
                                                    <div class="admin__order-table-header-col">Khách hàng</div>
                                                    <div class="admin__order-table-header-col">Ngày đặt</div>
                                                    <div class="admin__order-table-header-col">Tổng tiền</div>
                                                    <div class="admin__order-table-header-col">Trạng thái</div>
                                                    <div class="admin__order-table-header-col">Thanh toán</div>
                                                    <div class="admin__order-table-header-col">Xác nhận sau</div>
                                                </div>
                                            </div>
     
                                            <div class="admin__order-table-body">`;
    htmlWaitSettlment += 
                                            data.htmlOrdersWaitSettlementItem;
    htmlWaitSettlment += 
                                            `</div>
                                        </div>
                                    </div>
                                    <a href="#" class="admin__order-more">Xem tất cả</a>
                                </div>
                            </div>
                        </div>
                    </div>
    `;
    document.querySelector(".admin__container").innerHTML = htmlWaitSettlment;
}

function showWaitingPickup(data) {
    let htmlWaitPickup = "";
    htmlWaitPickup += 
    `
    <div class="admin__orders-waiting">
                        <div class="admin__add-product-container">
                            <div class="admin__add-product-header">
                                <div class="admin__add-product-header-item active">
                                    Tất cả
                                </div>
                                <div class="admin__add-product-header-item">
                                    Chờ xác nhận  
                                </div>
                                <div class="admin__add-product-header-item">
                                    Đang giao
                                </div>
                                <div class="admin__add-product-header-item">
                                    Đã giao
                                </div>
                            </div>
                            <div class="admin__setup-shop-body">
                                <div class="admin__setup-shop-container">
                                    <div class="admin__profile-shop-body-header">
                                        <div class="admin__add-product-title">
                                            ${data.ordersWaitPickup.length} Đơn hàng 
                                        </div>
                                    </div>
                                    <div class="admin__order-container">
                                        <div class="admin__order-table">
                                            <div class="admin__order-table-header">
                                                <div class="admin__order-table-header-row">
                                                    <div class="admin__order-table-header-col">Mã đơn hàng</div>
                                                    <div class="admin__order-table-header-col">Khách hàng</div>
                                                    <div class="admin__order-table-header-col">Ngày đặt</div>
                                                    <div class="admin__order-table-header-col">Tổng tiền</div>
                                                    <div class="admin__order-table-header-col">Trạng thái</div>
                                                    <div class="admin__order-table-header-col">Thanh toán</div>
                                                    <div class="admin__order-table-header-col">Thao tác</div>
                                                </div>
                                            </div>
     
                                            <div class="admin__order-table-body">`;
    htmlWaitPickup += 
                                            data.htmlOrdersWaitPickupItem;
    htmlWaitPickup += 
                                            `</div>
                                        </div>
                                    </div>
                                    <a href="#" class="admin__order-more">Xem tất cả</a>
                                </div>
                            </div>
                        </div>
                    </div>
    `;
    document.querySelector(".admin__container").innerHTML = htmlWaitPickup;
}

function showProcessed(data) {
    let htmlProcessed = "";
    htmlProcessed +=
        `
    <div class="admin__orders-waiting">
                        <div class="admin__add-product-container">
                            <div class="admin__add-product-header">
                                <div class="admin__add-product-header-item active">
                                    Tất cả
                                </div>
                                <div class="admin__add-product-header-item">
                                    Chờ xác nhận  
                                </div>
                                <div class="admin__add-product-header-item">
                                    Đang giao
                                </div>
                                <div class="admin__add-product-header-item">
                                    Đã giao
                                </div>
                            </div>
                            <div class="admin__setup-shop-body">
                                <div class="admin__setup-shop-container">
                                    <div class="admin__profile-shop-body-header">
                                        <div class="admin__add-product-title">
                                            ${data.ordersProcessed.length} Đơn hàng 
                                        </div>
                                    </div>
                                    <div class="admin__order-container">
                                        <div class="admin__order-table">
                                            <div class="admin__order-table-header">
                                                <div class="admin__order-table-header-row">
                                                    <div class="admin__order-table-header-col">Mã đơn hàng</div>
                                                    <div class="admin__order-table-header-col">Khách hàng</div>
                                                    <div class="admin__order-table-header-col">Ngày đặt</div>
                                                    <div class="admin__order-table-header-col">Tổng tiền</div>
                                                    <div class="admin__order-table-header-col">Trạng thái</div>
                                                    <div class="admin__order-table-header-col">Thanh toán</div>
                                                    <div class="admin__order-table-header-col">Thao tác</div>
                                                </div>
                                            </div>
     
                                            <div class="admin__order-table-body">`;
    htmlProcessed +=
        data.htmlOrdersProcessedItem;
    htmlProcessed +=
        `</div>
                                        </div>
                                    </div>
                                    <a href="#" class="admin__order-more">Xem tất cả</a>
                                </div>
                            </div>
                        </div>
                    </div>
    `;
    document.querySelector(".admin__container").innerHTML = htmlProcessed;
}

function prepareGoodModal(orderID, userID) {
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/seller', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            openModal();
            document.querySelector(".modal__body").innerHTML =
                `
            <div class="transport-form">
                <div class="transport-form__header">
                    <div class="transport-form__header-title">Giao đơn hàng</div>
                </div>
                <div class="transport-form__body">
                    <div class="transport-form__body-header">
                        <div class="transport-form__body-title">
                            Mã đơn hàng: ĐH${orderID}
                        </div>
                    </div>
                    <div class="transport-form__body-list">
                        <div class="transport-form__body-item">
                            <div class="transport-form__body-item-left">
                                <div class="transport-form__body-item-name">
                                    <div class="transport-form__body-item-type">Tôi sẽ tự mang hàng tới bưu cục</div>
                                </div>
                                <div class="transport-form__body-item-time">
                                    <div class="transport-form__body-item-time-text">
                                        Bạn có thể gửi đơn hàng tại bất kỳ bưu cục SPX Express nào thuộc cùng Tỉnh/Thành phố
                                    </div>
                                </div>
                            </div>
                            <div class="transport-form__body-item-right">
                                <i class="uil uil-check"></i>
                            </div>
                        </div>
                        <div class="transport-form__body-item active">
                            <div class="transport-form__body-item-left">
                                <div class="transport-form__body-item-name">
                                    <div class="transport-form__body-item-type">Đơn vị vận chuyển đến lấy hàng</div>
                                </div>
                                <div class="transport-form__body-item-time">
                                    <div class="transport-form__body-item-time-text">
                                        SPX Express sẽ đến lấy hàng theo địa chỉ lấy hàng mà bạn đã xác nhận 
                                    </div>
                                </div>
                            </div>
                            <div class="transport-form__body-item-right">
                                <i class="uil uil-check"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="transport-form__footer">
                    <div class="transport-form__btn btn" onclick="closeModal()">TRỞ LẠI</div>
                    <div class="transport-form__btn btn btn--primary shipping-unit__btn">XÁC NHẬN</div>
                </div>
            </div>
    `;
            const shippingType = document.querySelectorAll(".transport-form__body-item");
            for (let i = 0; i < shippingType.length; i++) {
                shippingType[i].addEventListener('click', () => {
                    var shippingTypeID;
                    if (i == 0) {
                        shippingType[i].classList.add("active");
                        shippingType[1].classList.remove("active");
                        console.log("Mang hàng tới bưu cục");
                    } else if (i == 1) {
                        shippingType[i].classList.add("active");
                        shippingType[0].classList.remove("active");
                        console.log("SPX Express đến lấy hàng");
                        shippingTypeID = 1;
                    }
                });
            }

            document.querySelector(".shipping-unit__btn").addEventListener('click', () => {
                openPickupAddressModal(data, orderID, userID);
            });
        }
    };
    xhr.send(null);
}

function openPickupAddressModal(data, orderID, userID) {
    document.querySelector(".modal__body").innerHTML = 
    `
            <div class="transport-form">
                <div class="transport-form__header">
                    <div class="transport-form__header-title">Giao đơn hàng</div>
                </div>
                <div class="transport-form__body">
                    <div class="transport-form__body-header">
                        <div class="transport-form__body-title">
                            Đơn vị vận chuyển
                        </div>
                        <div class="transport-form__header-sub">
                            SPX Express
                        </div>
                    </div>
                    <div class="waiting-form__body">
                        <div class="checkout__label">
                            <div class="checkout__label-box"></div>
                        </div>
                        <div class="checkout__address">
                            <div class="checkout__address-title">
                                <i class="uil uil-map-marker checkout__address-title-icon"></i>
                                <span>Địa chỉ lấy hàng</span>
                            </div>
                            <div class="checkout__address-desc">
                                <div class="waiting-form__seller-info">
                                    <div class="checkout__address-desc-name">Cửa hàng ${data.sellerInfos[0].sStoreName}</div>
                                    <div class="checkout__address-desc-phone">(+84) ${data.sellerInfos[0].sSellerPhone}</div>
                                    <div class="waiting-form__seller-info-pickup">Đến lấy hàng</div>
                                    <div class="waiting-form__seller-info-return">Trả hàng</div>
                                    <a href="javascript:openAddressModal()" class="checkout__address-desc-change">Thay đổi</a>
                                </div>
                                <div class="checkout__address-desc-direction">${data.sellerInfos[0].sSellerAddress}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="transport-form__footer">
                    <div class="transport-form__btn btn" onclick="closeModal()">TRỞ LẠI</div>
                    <div class="transport-form__btn btn btn--primary shipping-unit__btn-confirm">XÁC NHẬN</div>
                </div>
            </div>
    `;
    document.querySelector(".shipping-unit__btn-confirm").addEventListener('click', () => {
        confirmShippingOrder(data, orderID, userID);
    });
}

function confirmShippingOrder(data, orderID, userID) {
    openModal();
    document.querySelector(".modal__body").innerHTML =
    `
        <div class="spinner"></div>
    `;
    var formData = new FormData();
    formData.append("orderID", orderID);
    formData.append("userID", userID);
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/seller/confirm-shipping-order', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const result = JSON.parse(xhr.responseText);
            if (result.statusCode == 1) {
                setTimeout(() => {
                    closeModal();
                    toast({ title: "Thông báo", msg: `${result.message}`, type: "success", duration: 5000 });
                    document.querySelector(".modal__body").innerHTML = "";
                    setTimeout(() => {
                        window.location.assign('/seller/delivery-note/'+ orderID + '');
                    }, 1000)
                }, 2000);
            }
        }
    };
    xhr.send(formData);
}