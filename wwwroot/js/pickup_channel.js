function getAPIPickupChannel() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/picker-api', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);
            
            setData(data);
        }
    };
    xhr.send(null);
}
getAPIPickupChannel();

function setData(data) {
    showHeader();
    showBottomNav();
    document.querySelector(".app__container").innerHTML = 
    `
    <div class="phone-pickup">
        <div class="phone-pickup__title">Danh sách cần làm</div>
        <div class="phone-pickup__list">
            <div class="phone-pickup__item phone-pickup__item-wait">
                <div class="phone-pickup__item-numb">${data.ordersWaitPickup.length}</div>
                <div class="phone-pickup__item-numb-text">Chờ lấy hàng</div>
            </div>
            <div class="phone-pickup__item phone-pickup__item-picking">
                <div class="phone-pickup__item-numb">${data.ordersPickingUp.length}</div>
                <div class="phone-pickup__item-numb-text">Đang lấy hàng</div>
            </div>
            <div class="phone-pickup__item">
                <div class="phone-pickup__item-numb">0</div>
                <div class="phone-pickup__item-numb-text">Đã hoàn thành</div>
            </div>
            <div class="phone-pickup__item">
                <div class="phone-pickup__item-numb">0</div>
                <div class="phone-pickup__item-numb-text">Đã Huỷ</div>
            </div>
        </div>
    </div>
    `;
    document.querySelector(".phone-pickup__item-wait").addEventListener('click', () => {
        openOrderListTab(data);
    });

    document.querySelector(".phone-pickup__item-picking").addEventListener('click', () => {
        openPickingOrderListTab(data);
    });
}

function openModal() {
    document.querySelector(".phone-modal").classList.add("open");
}

function closeModal() {
    document.querySelector(".phone-modal").classList.remove("open");
}

function hideHeader() {
    document.querySelector(".phone-header").classList.add("hide-on-destop");
}

function showHeader() {
    document.querySelector(".phone-header").classList.remove("hide-on-destop");
}

function hideBottomNav() {
    document.querySelector(".phone-bottom__navigation").classList.add("hide-on-destop");
}

function showBottomNav() {
    document.querySelector(".phone-bottom__navigation").classList.remove("hide-on-destop");
}

function openOrderListTab(data) {
    hideHeader();
    hideBottomNav();
    let htmlOrderList = "";
    htmlOrderList += 
    `
                        <div class="phone-pickup__order-list">
                            <div class="phone-toolbar">
                                <div class="phone-toolbar__time">
                                    9:12
                                </div>
                                <div class="phone-toolbar__right">
                                    <div class="phone-toolbar__wave">
                                        <span class="phone-toolbar__wave-1"></span>
                                        <span class="phone-toolbar__wave-2"></span>
                                        <span class="phone-toolbar__wave-3"></span>
                                        <span class="phone-toolbar__wave-4"></span>
                                    </div>
                                    <div class="phone-toolbar__battery">
                                        <div class="phone-toolbar__battery-percent"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="phone-pickup__order-header">
                                <div class="phone-header__pickup-order-arrow phone-header__pickup-order-list-arrow">
                                    <i class="uil uil-arrow-left phone-header__pickup-order-arrow-icon"></i>
                                </div>
                                <div class="phone-header__pickup-order-title">Chờ lấy hàng</div>
                            </div>
                            <div class="phone-pickup__order-list-title">${data.ordersWaitPickup.length} đơn hàng</div>
                            <div class="phone-pickup__works">`;
                                htmlOrderList += data.htmlOrdersWaitPickupItem
    htmlOrderList += `      </div>
                        </div>
    `;
    document.querySelector(".app__container").innerHTML = htmlOrderList;
    document.querySelector(".phone-header__pickup-order-list-arrow").addEventListener('click', () => {
        setData(data);
    });
}

function openPickingOrderListTab(data) {
    hideHeader();
    hideBottomNav();
    let htmlOrderList = "";
    htmlOrderList += 
    `
                        <div class="phone-pickup__order-list">
                            <div class="phone-pickup__order-header">
                                <div class="phone-toolbar">
                                    <div class="phone-toolbar__time">
                                        9:12
                                    </div>
                                    <div class="phone-toolbar__right">
                                        <div class="phone-toolbar__wave">
                                            <span class="phone-toolbar__wave-1"></span>
                                            <span class="phone-toolbar__wave-2"></span>
                                            <span class="phone-toolbar__wave-3"></span>
                                            <span class="phone-toolbar__wave-4"></span>
                                        </div>
                                        <div class="phone-toolbar__battery">
                                            <div class="phone-toolbar__battery-percent"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="phone-pickup__order-header-container">
                                    <div class="phone-header__pickup-order-arrow phone-header__pickup-order-list-arrow">
                                        <i class="uil uil-arrow-left phone-header__pickup-order-arrow-icon"></i>
                                    </div>
                                    <div class="phone-header__pickup-order-title">Đang lấy hàng</div>
                                </div>
                            </div>
                            <div class="phone-pickup__order-list-title">${data.ordersPickingUp.length} đơn hàng</div>
                            <div class="phone-pickup__works">`;
                                htmlOrderList += data.htmlOrderPickingUpItem
    htmlOrderList += `      </div>
                        </div>
    `;
    document.querySelector(".app__container").innerHTML = htmlOrderList;
    document.querySelector(".phone-header__pickup-order-list-arrow").addEventListener('click', () => {
        setData(data);
    });
}

function openOrderDetail(orderID) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/picker-api/' + orderID + '', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);

            hideHeader();
            hideBottomNav();
            let htmlOrderDetail = "";
            if (data.orderDetails.length != 0) {
                                    
                htmlOrderDetail += 
                `
                            <div class="phone-pickup__order">
                                <div class="phone-pickup__order-header">
                                    <div class="phone-toolbar">
                                        <div class="phone-toolbar__time">
                                            9:12
                                        </div>
                                        <div class="phone-toolbar__right">
                                            <div class="phone-toolbar__wave">
                                                <span class="phone-toolbar__wave-1"></span>
                                                <span class="phone-toolbar__wave-2"></span>
                                                <span class="phone-toolbar__wave-3"></span>
                                                <span class="phone-toolbar__wave-4"></span>
                                            </div>
                                            <div class="phone-toolbar__battery">
                                                <div class="phone-toolbar__battery-percent"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="phone-pickup__order-header-container">
                                        <div class="phone-header__pickup-order-arrow phone-header__pickup-order-detail-arrow">
                                            <i class="uil uil-arrow-left phone-header__pickup-order-arrow-icon"></i>
                                        </div>
                                        <div class="phone-header__pickup-order-title">Đơn hàng 01</div>
                                    </div>
                                </div>
                                <div class="phone-pickup__order-address">
                                    <div class="phone-pickup__order-address-destination">
                                        <i class="uil uil-map-marker phone-pickup__order-address-destination-icon"></i>
                                    </div>
                                    <div class="phone-pickup__order-address-desc">
                                        <div class="phone-pickup__order-address-desc-title">Địa chỉ lấy hàng hàng</div>
                                        <span class="phone-pickup__order-address-desc-name">${data.sellerInfos[0].sStoreName}</span> <span class="phone-pickup__order-address-desc-divide">|</span>
                                        <span class="phone-pickup__order-address-desc-phone">(+84) ${data.sellerInfos[0].sSellerPhone}</span>
                                        <div class="phone-pickup__order-address-desc-direction">${data.sellerInfos[0].sSellerAddress}</div>
                                    </div>
                                </div>
                                <div class="phone-pickup__order-label">
                                    <div class="phone-pickup__order-label-box"></div>
                                </div>
                                <div class="phone-pickup__order-product">
                                    <div class="phone-pickup__order-product-list">`
                                    data.orderDetails.forEach(element => {
                                        htmlOrderDetail += 
                                        `
                                        <div class="phone-pickup__order-product-item">
                                            <div class="phone-pickup__order-product-item-header">
                                                <div class="phone-pickup__order-product-item-header-favorite">Yêu thích</div>
                                                <div class="phone-pickup__order-product-item-header-shop">${element.sStoreName}</div>
                                            </div>
                                            <div class="phone-pickup__order-product-item-body">
                                                <div class="phone-pickup__order-product-item-thumb">
                                                    <img class="phone-pickup__order-product-item-img" src="/img/${element.sImageUrl}">
                                                </div>
                                                <div class="phone-pickup__order-product-item-info">
                                                    <div class="phone-pickup__order-product-item-info-name">
                                                        ${element.sProductName}
                                                    </div>
                                                    <div class="phone-pickup__order-product-item-bottom">
                                                        <div class="phone-pickup__order-product-item-bottom-change">
                                                            <span>Đổi ý miễn phí</span>
                                                        </div>
                                                        <div class="phone-pickup__order-product-item-numb">
                                                            <div class="phone-pickup__order-product-item-numb-qunatity">x${element.iQuantity}</div>
                                                            <div class="phone-pickup__order-product-item-numb-price">${money_2(element.dUnitPrice)}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="phone-pickup__order-product-item-transport">
                                                <div class="phone-pickup__order-product-item-transport-header">Vận chuyển</div>
                                                <div class="phone-pickup__order-product-item-transport-type">
                                                    <div class="phone-pickup__order-product-item-transport-type-sub">Nhanh</div>
                                                    <div class="phone-pickup__order-product-item-transport-type-price">${money_2(element.dTransportPrice)}</div>
                                                </div>
                                                <div class="phone-pickup__order-product-item-transport-time">Nhận hàng vào 7 Tháng 7 - 8 Tháng 7</div>
                                                <div class="phone-pickup__order-product-item-transport-inspection">
                                                    <span>Được đồng kiểm.</span>
                                                    <i class="uil uil-question-circle phone-pickup__order-product-item-transport-inspection-icon"></i>
                                                </div>
                                            </div>
                                            <div class="phone-pickup__order-product-item-into-money">
                                                <div class="phone-pickup__order-product-item-into-money-sub">Thành tiền (${element.iQuantity} sản phẩm):</div>
                                                <div class="phone-pickup__order-product-item-into-money-price">${money_2(element.dMoney)}</div>
                                            </div>
                                        </div>
                                        `;
                                    });
                                    var totalItemPrice = data.orderDetails.reduce((total, item) => {
                                        return total + item.dUnitPrice;
                                    }, 0);
    
                                    var totalTransportPrice = data.orderDetails.reduce((total, transport) => {
                                        return total + transport.dTransportPrice;
                                    }, 0);
                                    htmlOrderDetail +=    `
                                    </div>
                                </div>
                                <div class="phone-pickup__order-payment-type">
                                    <div class="phone-pickup__order-payment-type-header">
                                        <div class="phone-pickup__order-payment-type-header-col">
                                            <i class="uil uil-usd-circle phone-pickup__order-payment-type-header-sub-icon"></i>
                                            <div class="phone-pickup__order-payment-type-header-sub">Phương thức thanh toán</div>
                                        </div>
                                        <div class="phone-pickup__order-payment-type-header-col">
                                            <div class="phone-pickup__order-payment-type-header-sub">${data.payments[0].sPaymentName}</div>
                                        </div>
                                    </div>
                                    <div class="phone-pickup__order-payment-type-pay">
                                        Dùng ShopeePay để tận hưởng nhiều voucer ưu đãi.
                                    </div>
                                </div>
                                <div class="phone-pickup__order-detail">
                                    <div class="phone-pickup__order-detail-header">
                                        <i class="uil uil-notes phone-pickup__order-detail-header-icon"></i>
                                        <div class="phone-pickup__order-detail-header-sub">Chi tiết thanh toán</div>
                                    </div>
                                    <div class="phone-pickup__order-detail-body">
                                        <div class="phone-pickup__order-detail-total-price-product">
                                            <div class="phone-pickup__order-detail-total-price-product-sub">Tổng tiền hàng</div>
                                            <div class="phone-pickup__order-detail-total-price-product-numb">${money_2(totalItemPrice)}</div>
                                        </div>
                                        <div class="phone-pickup__order-detail-transport-price">
                                            <div class="phone-pickup__order-detail-transport-price-sub">Phí vận chuyển</div>
                                            <div class="phone-pickup__order-detail-transport-price-numb">${money_2(totalTransportPrice)}</div>
                                        </div>
                                    </div>
                                    <div class="phone-pickup__order-detail-bottom">
                                        <div class="phone-pickup__order-detail-bottom-sub">Thành tiền</div>
                                        <div class="phone-pickup__order-detail-bottom-price">${money_2(totalItemPrice + totalTransportPrice)}</div>
                                    </div>
                                </div>
                                <div class="phone-pickup__order-footer" onclick="openReceiveOrderModal(${data.shippingOrders[0].pK_iShippingOrderID})">
                                    <div class="phone-header__pickup-order-footer-title">Nhận đơn</div>
                                </div>
                            </div>
                 `;
            } else {
                htmlOrderDetail += 
                `
                            <div class="phone-pickup__order">
                                <div class="phone-pickup__order-header">
                                    <div class="phone-toolbar">
                                        <div class="phone-toolbar__time">
                                            9:12
                                        </div>
                                        <div class="phone-toolbar__right">
                                            <div class="phone-toolbar__wave">
                                                <span class="phone-toolbar__wave-1"></span>
                                                <span class="phone-toolbar__wave-2"></span>
                                                <span class="phone-toolbar__wave-3"></span>
                                                <span class="phone-toolbar__wave-4"></span>
                                            </div>
                                            <div class="phone-toolbar__battery">
                                                <div class="phone-toolbar__battery-percent"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="phone-pickup__order-header-container">
                                        <div class="phone-header__pickup-order-arrow phone-header__pickup-order-detail-arrow">
                                            <i class="uil uil-arrow-left phone-header__pickup-order-arrow-icon"></i>
                                        </div>
                                        <div class="phone-header__pickup-order-title">Đơn hàng 01</div>
                                    </div>
                                </div>
                                <div class="phone-pickup__order-address">
                                    <div class="phone-pickup__order-address-destination">
                                        <i class="uil uil-map-marker phone-pickup__order-address-destination-icon"></i>
                                    </div>
                                    <div class="phone-pickup__order-address-desc">
                                        <div class="phone-pickup__order-address-desc-title">Địa chỉ lấy hàng hàng</div>
                                        <span class="phone-pickup__order-address-desc-name">${data.sellerInfos[0].sStoreName}</span> <span class="phone-pickup__order-address-desc-divide">|</span>
                                        <span class="phone-pickup__order-address-desc-phone">(+84) ${data.sellerInfos[0].sSellerPhone}</span>
                                        <div class="phone-pickup__order-address-desc-direction">${data.sellerInfos[0].sSellerAddress}</div>
                                    </div>
                                </div>
                                <div class="phone-pickup__order-label">
                                    <div class="phone-pickup__order-label-box"></div>
                                </div>
                                <div class="phone-pickup__order-product">
                                    <div class="phone-pickup__order-product-list">`
                                    data.orderDetailsPickingUp.forEach(element => {
                                        htmlOrderDetail += 
                                        `
                                        <div class="phone-pickup__order-product-item">
                                            <div class="phone-pickup__order-product-item-header">
                                                <div class="phone-pickup__order-product-item-header-favorite">Yêu thích</div>
                                                <div class="phone-pickup__order-product-item-header-shop">${element.sStoreName}</div>
                                            </div>
                                            <div class="phone-pickup__order-product-item-body">
                                                <div class="phone-pickup__order-product-item-thumb">
                                                    <img class="phone-pickup__order-product-item-img" src="/img/${element.sImageUrl}">
                                                </div>
                                                <div class="phone-pickup__order-product-item-info">
                                                    <div class="phone-pickup__order-product-item-info-name">
                                                        ${element.sProductName}
                                                    </div>
                                                    <div class="phone-pickup__order-product-item-bottom">
                                                        <div class="phone-pickup__order-product-item-bottom-change">
                                                            <span>Đổi ý miễn phí</span>
                                                        </div>
                                                        <div class="phone-pickup__order-product-item-numb">
                                                            <div class="phone-pickup__order-product-item-numb-qunatity">x${element.iQuantity}</div>
                                                            <div class="phone-pickup__order-product-item-numb-price">${money_2(element.dUnitPrice)}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="phone-pickup__order-product-item-transport">
                                                <div class="phone-pickup__order-product-item-transport-header">Vận chuyển</div>
                                                <div class="phone-pickup__order-product-item-transport-type">
                                                    <div class="phone-pickup__order-product-item-transport-type-sub">Nhanh</div>
                                                    <div class="phone-pickup__order-product-item-transport-type-price">${money_2(element.dTransportPrice)}</div>
                                                </div>
                                                <div class="phone-pickup__order-product-item-transport-time">Nhận hàng vào 7 Tháng 7 - 8 Tháng 7</div>
                                                <div class="phone-pickup__order-product-item-transport-inspection">
                                                    <span>Được đồng kiểm.</span>
                                                    <i class="uil uil-question-circle phone-pickup__order-product-item-transport-inspection-icon"></i>
                                                </div>
                                            </div>
                                            <div class="phone-pickup__order-product-item-into-money">
                                                <div class="phone-pickup__order-product-item-into-money-sub">Thành tiền (${element.iQuantity} sản phẩm):</div>
                                                <div class="phone-pickup__order-product-item-into-money-price">${money_2(element.dMoney)}</div>
                                            </div>
                                        </div>
                                        `;
                                    });
                                    var totalItemPrice = data.orderDetailsPickingUp.reduce((total, item) => {
                                        return total + item.dUnitPrice;
                                    }, 0);
    
                                    var totalTransportPrice = data.orderDetailsPickingUp.reduce((total, transport) => {
                                        return total + transport.dTransportPrice;
                                    }, 0);
                                    htmlOrderDetail +=    `
                                    </div>
                                </div>
                                <div class="phone-pickup__order-payment-type">
                                    <div class="phone-pickup__order-payment-type-header">
                                        <div class="phone-pickup__order-payment-type-header-col">
                                            <i class="uil uil-usd-circle phone-pickup__order-payment-type-header-sub-icon"></i>
                                            <div class="phone-pickup__order-payment-type-header-sub">Phương thức thanh toán</div>
                                        </div>
                                        <div class="phone-pickup__order-payment-type-header-col">
                                            <div class="phone-pickup__order-payment-type-header-sub">${data.payments[0].sPaymentName}</div>
                                        </div>
                                    </div>
                                    <div class="phone-pickup__order-payment-type-pay">
                                        Dùng ShopeePay để tận hưởng nhiều voucer ưu đãi.
                                    </div>
                                </div>
                                <div class="phone-pickup__order-detail">
                                    <div class="phone-pickup__order-detail-header">
                                        <i class="uil uil-notes phone-pickup__order-detail-header-icon"></i>
                                        <div class="phone-pickup__order-detail-header-sub">Chi tiết thanh toán</div>
                                    </div>
                                    <div class="phone-pickup__order-detail-body">
                                        <div class="phone-pickup__order-detail-total-price-product">
                                            <div class="phone-pickup__order-detail-total-price-product-sub">Tổng tiền hàng</div>
                                            <div class="phone-pickup__order-detail-total-price-product-numb">${money_2(totalItemPrice)}</div>
                                        </div>
                                        <div class="phone-pickup__order-detail-transport-price">
                                            <div class="phone-pickup__order-detail-transport-price-sub">Phí vận chuyển</div>
                                            <div class="phone-pickup__order-detail-transport-price-numb">${money_2(totalTransportPrice)}</div>
                                        </div>
                                    </div>
                                    <div class="phone-pickup__order-detail-bottom">
                                        <div class="phone-pickup__order-detail-bottom-sub">Thành tiền</div>
                                        <div class="phone-pickup__order-detail-bottom-price">${money_2(totalItemPrice + totalTransportPrice)}</div>
                                    </div>
                                </div>
                                <div class="phone-pickup__order-footer" onclick="openReceiveOrderModal(${data.shippingOrders[0].pK_iShippingOrderID})">
                                    <div class="phone-header__pickup-order-footer-title">Xác nhận lấy hàng</div>
                                </div>
                            </div>
                 `;
            }
            document.querySelector(".app__container").innerHTML = htmlOrderDetail;
            document.querySelector(".phone-header__pickup-order-detail-arrow").addEventListener('click', () => {
                openOrderListTab(data);
            });
        }
    }
    xhr.send(null);
}

function openReceiveOrderModal(shippingOrderID) {
    openModal();
    document.querySelector(".phone-modal__body").innerHTML = 
    `
                            <div class="phone-modal__confirm">
                                <div class="phone-modal__confirm-msg">Bạn có chắc muốn nhận đơn hàng này?</div>
                                <div class="phone-modal__confirm-btns">
                                    <div class="phone-modal__confirm-btn-no" onclick="closeModal()">Không</div>
                                    <div class="phone-modal__confirm-btn-agree" onclick="confirmTakeOrder(${shippingOrderID})">Đồng ý</div>
                                </div>
                            </div>
    `;
}

function confirmTakeOrder(shippingOrderID) {
    document.querySelector(".phone-modal__body").innerHTML = 
    `
        <div class="phone-spinner"></div>
    `;
    var formData = new FormData();
    formData.append("shippingOrderID", shippingOrderID);
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/picker-api/take', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);

            if (data.status.statusCode == 1) {
                setTimeout(() => {
                    closeModal();
                    toast({ title: "Thông báo", msg: `${data.status.message}`, type: "success", duration: 5000 });
                    document.querySelector(".phone-modal__body").innerHTML = "";
                    setTimeout(() => {
                        document.querySelector(".phone-header__pickup-order-footer-title").innerHTML = "Đang lấy hàng...";
                        setData(data);
                    }, 1000)
                }, 2000);
            }
            
        }
    };
    xhr.send(formData);
}
