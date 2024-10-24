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
            <div class="phone-pickup__item phone-pickup__item-abouted-warehouse">
                <div class="phone-pickup__item-numb">${data.ordersAboutedWarehouse.length}</div>
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

    document.querySelector(".phone-pickup__item-abouted-warehouse").addEventListener('click', () => {
        openAboutedWarehouseListTab(data);
    });
}

function openOrderListTab(data) {
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
                                    <div class="phone-header__pickup-order-title">Chờ lấy hàng</div>
                                </div>
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

function openAboutedWarehouseListTab(data) {
    hideHeader();
    hideBottomNav();
    let htmlAboutedWarehouseList = "";
    htmlAboutedWarehouseList += 
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
                                    <div class="phone-header__pickup-order-title">Đã về tổng kho</div>
                                </div>
                            </div>
                            <div class="phone-pickup__order-list-title">${data.ordersAboutedWarehouse.length} đơn hàng</div>
                            <div class="phone-pickup__works">`;
                            htmlAboutedWarehouseList += data.htmlOrderAboutedWarehouseItem
                            htmlAboutedWarehouseList += `      </div>
                        </div>
    `;
    document.querySelector(".app__container").innerHTML = htmlAboutedWarehouseList;
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

            setDataOrderDetail(data);

        }
    }
    xhr.send(null);
}

function setDataOrderDetail(data) {
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
                                    <div class="phone-header__pickup-order-footer-btn">Nhận đơn</div>
                                </div>
                            </div>
                 `;                    
            } else if (data.orderDetailsPickingUp.length != 0 && data.shippingPickers[0].fK_iOrderStatusID == 10) {
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
                                        <div class="phone-header__pickup-order-arrow phone-header__pickingup-order-detail-arrow">
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
                                <div class="phone-pickup__order-footer">`;
                                if (data.shippingPickers[0].fK_iOrderStatusID == 7) {
                                    htmlOrderDetail +=
                                    `
                                    <div class="phone-header__pickup-order-footer-btn phone-pickup__got-good-btn" onclick="openGotGood(${data.shippingPickers[0].pK_iShippingPickerID}, ${data.shippingPickers[0].fK_iShippingOrderID}, ${data.shippingPickers[0].fK_iOrderID})">Xác nhận đã lấy hàng</div>
                                    `;
                                } else if (data.shippingPickers[0].fK_iOrderStatusID == 10) {
                                    htmlOrderDetail += 
                                    `
                                    <div class="phone-header__pickup-order-footer-btn phone-pickup__about-warehouse-btn" onclick="openAboutWarehouse(${data.shippingPickers[0].pK_iShippingPickerID}, ${data.shippingPickers[0].fK_iShippingOrderID})">Đang về tổng kho ... </div>
                                    `;
                                } else {
                                    htmlOrderDetail += 
                                    `
                                    <div class="phone-header__pickup-order-footer-btn phone-pickup__about-warehouse-btn">Đã về tổng kho</div>
                                    `;
                                }
                                htmlOrderDetail += `
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
                                        <div class="phone-header__pickup-order-arrow phone-header__warehouse-order-detail-arrow">
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
                                <div class="phone-pickup__order-footer">
                                    <div class="phone-header__pickup-order-footer-btn phone-pickup__about-warehouse-btn">Đã về tổng kho</div>
                                </div>
                            </div>
                 `;
            }
            document.querySelector(".app__container").innerHTML = htmlOrderDetail;
            if (data.orderDetails.length != 0) {
                document.querySelector(".phone-header__pickup-order-detail-arrow").addEventListener('click', () => {
                    openOrderListTab(data);
                }); 
            } else if (data.orderDetailsPickingUp.length != 0 && data.shippingPickers[0].fK_iOrderStatusID == 10) {
                document.querySelector(".phone-header__pickingup-order-detail-arrow").addEventListener('click', () => {
                    openPickingOrderListTab(data)
                });
            } else {
                document.querySelector(".phone-header__warehouse-order-detail-arrow").addEventListener("click", () => {
                    openAboutedWarehouseListTab(data);
                });
            }
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

// Confirmation of receipt of goods
function openGotGood(shippingPickerID, shippingOrderID, orderID) {
    openModal();
    document.querySelector(".phone-modal__body").innerHTML = 
    `
                            <div class="phone-modal__confirm">
                                <div class="phone-modal__confirm-msg">Bạn đã lấy được đơn hàng này?</div>
                                <div class="phone-modal__confirm-btns">
                                    <div class="phone-modal__confirm-btn-no" onclick="closeModal()">Không</div>
                                    <div class="phone-modal__confirm-btn-agree" onclick="openAddImgPicker(${shippingPickerID}, ${shippingOrderID}, ${orderID})">Đồng ý</div>
                                </div>
                            </div>
    `;
}

function openAddImgPicker(shippingPickerID, shippingOrderID, orderID) {
    document.querySelector(".phone-modal__body").innerHTML = 
    `
                            <div class="phone-modal__add-img">
                                <div class="phone-modal__add-img-title">Thêm ảnh lấy hàng</div>
                                <div class="phone-modal__add-img-check">
                                    <div class="phone-modal__add-img-rb">
                                        <input type="radio" name="ratio-img" id="" class="phone-modal__add-img-input">
                                        <label for="phone-modal__add-img-input" class="phone-modal__add-img-label">Hình ảnh tỉ lệ 1:1</label>
                                    </div>
                                    <div class="phone-modal__add-img-rb">
                                        <input type="radio" name="ratio-img" id="" class="phone-modal__add-img-input">
                                        <label for="phone-modal__add-img-input" class="phone-modal__add-img-label">Hình ảnh tỉ lệ 3:4</label>
                                    </div>
                                </div>
                                <div class="phone-modal__add-img-pic">
                                    <img src="/img/no_img.jpg" class="phone-modal__add-img-value" alt="">
                                    <label class="phone-modal__add-img-pick">
                                        <div class="phone-modal__add-img-pick-container">
                                            <i class="uil uil-image-plus phone-modal__add-img-pick-icon"></i>
                                            <div class="phone-modal__add-img-pick-sub">
                                                Thêm hình ảnh (0/9)
                                            </div>
                                        </div>
                                        <input type="file" accept="image/jpeg, image/png, image/jpg" class="phone-modal__add-img-pick-file" id="input-file">
                                    </label>
                                </div>
                                <div class="phone-modal__add-img-btn">Xác nhận</div>
                            </div>
    `;

    let orderImage = document.querySelector(".phone-modal__add-img-value");
    let inputImage = document.getElementById("input-file");

    inputImage.onchange = () => {
        orderImage.src = URL.createObjectURL(inputImage.files[0]);
    };

    document.querySelector(".phone-modal__add-img-btn").addEventListener('click', () => {
        document.querySelector(".phone-modal__body").innerHTML = `<div class="phone-spinner"></div>`;
        
        let shippingPickerImg = "shipping_img.jpg"
        var formData = new FormData();
        formData.append("shippingPickerID", shippingPickerID);
        formData.append("shippingPickerImg", shippingPickerImg)
        formData.append("shippingOrderID", shippingOrderID);
        formData.append("orderID", orderID);

        var xhr = new XMLHttpRequest();
        xhr.open('post', '/picker-api/taken', true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const data = JSON.parse(xhr.responseText);

                console.log(data);

                if (data.status.statusCode == -1) {
                    setTimeout(() => {
                        closeModal();
                        toast({ title: "Thông báo", msg: `${data.status.message}`, type: "success", duration: 5000 });
                        document.querySelector(".phone-modal__body").innerHTML = "";
                    }, 2000);
                }

                if (data.status.statusCode == 1) {
                    setTimeout(() => {
                        closeModal();
                        toast({ title: "Thông báo", msg: `${data.status.message}`, type: "success", duration: 5000 });
                        document.querySelector(".phone-modal__body").innerHTML = "";
                        setTimeout(() => {
                            setDataOrderDetail(data);
                        }, 1000)
                    }, 2000);
                }
            }
        };
        xhr.send(formData);
    });
}

function openAboutWarehouse(shippingPickerID, shippingOrderID) {
    openModal();
    document.querySelector(".phone-modal__body").innerHTML = 
    `
                            <div class="phone-modal__confirm">
                                <div class="phone-modal__confirm-msg">Bạn đã gửi đơn hàng tại tổng kho?</div>
                                <div class="phone-modal__confirm-btns">
                                    <div class="phone-modal__confirm-btn-no" onclick="closeModal()">Không</div>
                                    <div class="phone-modal__confirm-btn-agree" onclick="openCompleteJob(${shippingPickerID}, ${shippingOrderID})">Đồng ý</div>
                                </div>
                            </div>
    `;
}

function openCompleteJob(shippingPickerID, shippingOrderID) {
    openModal();
    document.querySelector(".phone-modal__body").innerHTML = `<div class="phone-spinner"></div>`;

    var formData = new FormData();
    formData.append("shippingPickerID", shippingPickerID);

    var xhr = new XMLHttpRequest();
    xhr.open('post', '/picker-api/complete', true);
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
                        setData(data);
                    }, 1000)
                }, 2000);
            }
            
        }
    };
    xhr.send(formData);
}


