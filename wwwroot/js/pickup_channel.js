function getAPIPickupChannel() {
    let pickerID = getCookies("pickerID");
    if (pickerID == undefined) {
        window.location.replace("/user/login")
    } else {
        var xhr = new XMLHttpRequest();
        xhr.open('get', '/picker-api', true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const data = JSON.parse(xhr.responseText);

                console.log(data);

                setData(data);

                setDataMobile(data);
            }
        };
        xhr.send(null);
    }
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
                                        <div class="phone-header__pickup-order-arrow phone-header__order-detail-arrow">
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
    htmlOrderDetail += `
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
                                        Dùng SMePay để tận hưởng nhiều voucer ưu đãi.
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
    if (data.shippingOrders.length != 0 && data.shippingOrders[0].fK_iOrderStatusID == 6) {
        htmlOrderDetail +=
            `
                                    <div class="phone-header__pickup-order-footer-btn" onclick="openReceiveOrderModal(${data.shippingOrders[0].pK_iShippingOrderID})">Nhận đơn</div>`;
    }
    else if (data.shippingPickers.length != 0 && data.shippingPickers[0].fK_iOrderStatusID == 7) {
        htmlOrderDetail +=
            `
                                    <div class="phone-header__pickup-order-footer-btn phone-pickup__got-good-btn" onclick="openGotGood(${data.shippingPickers[0].pK_iShippingPickerID}, ${data.shippingPickers[0].fK_iShippingOrderID}, ${data.shippingPickers[0].fK_iOrderID})">Xác nhận đã lấy hàng</div>`;
    } else if (data.shippingPickers.length != 0 && data.shippingPickers[0].fK_iOrderStatusID == 10) {
        htmlOrderDetail +=
            `
                                    <div class="phone-header__pickup-order-footer-btn phone-pickup__about-warehouse-btn" onclick="openAboutWarehouse(${data.shippingPickers[0].pK_iShippingPickerID}, ${data.shippingPickers[0].fK_iShippingOrderID})">Đang về tổng kho ... </div>`;
    } else {
        htmlOrderDetail +=
            `
                                    <div class="phone-header__pickup-order-footer-btn phone-pickup__about-warehouse-btn">Đã về tổng kho</div>`;
    }
    htmlOrderDetail += `
                                </div>
                            </div>
                 `;

    document.querySelector(".app__container").innerHTML = htmlOrderDetail;
    if (data.orderDetails.length != 0 && data.shippingOrders.length != 0) {
        document.querySelector(".phone-header__order-detail-arrow").addEventListener('click', () => {
            openOrderListTab(data);
        });
    } else if (data.orderDetails.length != 0 && data.shippingPickers[0].fK_iOrderStatusID == 7) {
        document.querySelector(".phone-header__order-detail-arrow").addEventListener('click', () => {
            openPickingOrderListTab(data)
        });
    } else {
        document.querySelector(".phone-header__order-detail-arrow").addEventListener("click", () => {
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
                        document.querySelector(".phone-header__pickup-order-footer-btn").innerHTML = "Đang lấy hàng...";
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

// Mobile
function setDataMobile(data) {
    document.querySelector(".app__content").innerHTML = 
        `<header class="header hide-on-destop">
            <div class="header__container">
                <div class="header__menu">
                    <i class="uil uil-bars header__menu-icon" onclick="showNavMenu()"></i>
                    <div class="header__menu-nav hide-on-destop">
                        <div class="header__menu-container">
                            <div class="header__menu-close" onclick="closeNavMenu()">
                                <i class="uil uil-multiply header__menu-close-icon"></i>
                            </div>
                            <div class="header__menu-list">
                                <div class="header__menu-item">
                                    <a href="javascript:openShopMenu()" class="header__menu-item-link">
                                        <span class="header__menu-item-name">Đơn hàng</span>
                                        <i class="uil uil-angle-down header__menu-item-dropdown-icon"></i>
                                    </a>
                                </div>
                                <div class="header__menu-item">
                                    <a href="javascript:openIndustryMenu()" class="header__menu-item-link">
                                        <span class="header__menu-item-name">Đang làm</span>
                                        <i class="uil uil-angle-down header__menu-item-dropdown-icon"></i>
                                    </a>
                                </div>
                                <div class="header__menu-item">
                                    <a href="javascript:openIndustryMenu()" class="header__menu-item-link">
                                        <span class="header__menu-item-name">Đã hoàn thành</span>
                                        <i class="uil uil-angle-down header__menu-item-dropdown-icon"></i>
                                    </a>
                                </div>
                                <div class="header__menu-item">
                                    <a href="javascript:openIndustryMenu()" class="header__menu-item-link">
                                        <span class="header__menu-item-name">Thông tin tài khoản</span>
                                        <i class="uil uil-angle-down header__menu-item-dropdown-icon"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="header__menu-logout">
                                <a href="javascript:logoutPickerAccount()" class="header__menu-logout-link">
                                    <span class="header__menu-logout-name">Đăng xuất</span>
                                    <i class="uil uil-signout header__menu-logout-icon"></i>
                                </a>
                            </div>
                        </div>
                        <div class="header__menu-overlay"></div>
                    </div>
                </div>
                <div class="header__logo">
                    <img src="/img/SPX_express_logo.png" class="header__logo-img" alt="">
                </div>
                <div class="header__user">
                    <div class="header__user-symbol hide-on-destop hide-on-mobile">
                        <a href="login.html" class="header__user-link">  
                            <i class="uil uil-user header__user-icon"></i>
                        </a>
                    </div>
                    <div class="header__user-avatar">
                        <div class="header__user-avatar-img" style="background-image: url(/img/profile_avatar.jpg);"></div>
                    </div>  
                </div>
            </div>
        </header>
        <div class="app__body">
            <div class="pickup">
                <div class="pickup__title">Danh sách cần làm</div>
                <div class="pickup__list">
                    <div class="pickup__item pickup__item-wait">
                        <div class="pickup__item-numb">${data.ordersWaitPickup.length}</div>
                        <div class="pickup__item-numb-text">Chờ lấy hàng</div>
                    </div>
                    <div class="pickup__item pickup__item-picking">
                        <div class="pickup__item-numb">${data.ordersPickingUp.length}</div>
                        <div class="pickup__item-numb-text">Đang lấy hàng</div>
                    </div>
                    <div class="pickup__item pickup__item-abouted-warehouse">
                        <div class="pickup__item-numb">${data.ordersAboutedWarehouse.length}</div>
                        <div class="pickup__item-numb-text">Đã hoàn thành</div>
                    </div>
                    <div class="pickup__item">
                        <div class="pickup__item-numb">0</div>
                        <div class="pickup__item-numb-text">Đã Huỷ</div>
                    </div>
                </div>
            </div>
        </div>`;
    document.querySelector(".pickup__item-wait").addEventListener('click', () => {
        openOrderListTabMobile(data);
    });

    document.querySelector(".pickup__item-picking").addEventListener('click', () => {
        openPickingOrderListTabMobile(data);
    });

    document.querySelector(".pickup__item-abouted-warehouse").addEventListener('click', () => {
        openAboutedWarehouseListTabMobile(data);
    });
}

function openOrderListTabMobile(data) {
    let htmlOrderList = "";
    htmlOrderList += 
    `<div class="pickup-order hide-on-destop">
                <div class="pickup-order__header">
                    <div class="pickup-order__header-container">
                        <div class="header__pickup-order-arrow">
                            <i class="uil uil-arrow-left pickup-order__header-arrow-icon"></i>
                        </div>
                        <div class="header__pickup-order__title">Chờ lấy hàng</div>
                    </div>
                </div>
                <div class="pickup-order__list-title">${data.ordersWaitPickup.length} đơn hàng</div>
                <div class="pickup-order__works">`;
                data.ordersWaitPickup.forEach(element => {
                    htmlOrderList += 
                    `<div class="pickup-order__work">
                        <div class="pickup-order__work-row">
                            <div class="pickup-order__work-col-1">Mã đơn hàng</div>
                            <div class="pickup-order__work-col-2">ĐH${element.fK_iOrderID}</div>
                        </div>
                        <div class="pickup-order__work-row">
                            <div class="pickup-order__work-col-1">Khách hàng</div>
                            <div class="pickup-order__work-col-2">${element.sFullName}</div>
                        </div>
                        <div class="pickup-order__work-row">
                            <div class="pickup-order__work-col-1">Ngày đặt</div>
                            <div class="pickup-order__work-col-2">${formatDate(element.dDate)}</div>
                        </div>
                        <div class="pickup-order__work-row">
                            <div class="pickup-order__work-col-1">Tổng tiền</div>
                            <div class="pickup-order__work-col-2">${money_2(element.fTotalPrice)}</div>
                        </div>
                        <div class="pickup-order__work-row">
                            <div class="pickup-order__work-col-1">Trạng thái</div>
                            <div class="pickup-order__work-col-2">${element.sOrderStatusName}</div>
                        </div>
                        <div class="pickup-order__work-row">
                            <div class="pickup-order__work-col-1">Thanh toán</div>
                            <div class="pickup-order__work-col-2">${element.sPaymentName}</div>
                        </div>
                        <div class="pickup-order__work-row">
                            <div class="pickup-order__work-col-1"></div>
                            <div class="pickup-order__work-col-2">
                                <a href="javascript:openOrderDetailMobile(${element.fK_iOrderID})" class="pickup-order__work-link">Chi tiết đơn</a>
                            </div>
                        </div>
                    </div>`;
                });
                htmlOrderList += `
                </div>
            </div>`;
    document.querySelector(".app__body").innerHTML = htmlOrderList;

    document.querySelector(".header__pickup-order-arrow").addEventListener('click', () => {
        setDataMobile(data);
    });
}

function openPickingOrderListTabMobile(data) {
    let htmlOrderList = "";
    htmlOrderList += 
    `<div class="pickup-order hide-on-destop">
                <div class="pickup-order__header">
                    <div class="pickup-order__header-container">
                        <div class="header__pickup-order-arrow">
                            <i class="uil uil-arrow-left pickup-order__header-arrow-icon"></i>
                        </div>
                        <div class="header__pickup-order__title">Đang lấy hàng</div>
                    </div>
                </div>
                <div class="pickup-order__list-title">${data.ordersPickingUp.length} đơn hàng</div>
                <div class="pickup-order__works">`;
                data.ordersPickingUp.forEach(element => {
                    htmlOrderList += 
                    `<div class="pickup-order__work">
                        <div class="pickup-order__work-row">
                            <div class="pickup-order__work-col-1">Mã đơn hàng</div>
                            <div class="pickup-order__work-col-2">ĐH${element.fK_iOrderID}</div>
                        </div>
                        <div class="pickup-order__work-row">
                            <div class="pickup-order__work-col-1">Khách hàng</div>
                            <div class="pickup-order__work-col-2">${element.sFullName}</div>
                        </div>
                        <div class="pickup-order__work-row">
                            <div class="pickup-order__work-col-1">Ngày đặt</div>
                            <div class="pickup-order__work-col-2">${formatDate(element.dDate)}</div>
                        </div>
                        <div class="pickup-order__work-row">
                            <div class="pickup-order__work-col-1">Tổng tiền</div>
                            <div class="pickup-order__work-col-2">${money_2(element.fTotalPrice)}</div>
                        </div>
                        <div class="pickup-order__work-row">
                            <div class="pickup-order__work-col-1">Trạng thái</div>
                            <div class="pickup-order__work-col-2">${element.sOrderStatusName}</div>
                        </div>
                        <div class="pickup-order__work-row">
                            <div class="pickup-order__work-col-1">Thanh toán</div>
                            <div class="pickup-order__work-col-2">${element.sPaymentName}</div>
                        </div>
                        <div class="pickup-order__work-row">
                            <div class="pickup-order__work-col-1"></div>
                            <div class="pickup-order__work-col-2">
                                <a href="javascript:openOrderDetailMobile(${element.fK_iOrderID})" class="pickup-order__work-link">Chi tiết đơn</a>
                            </div>
                        </div>
                    </div>`;
                });
                htmlOrderList += `
                </div>
            </div>`;
    document.querySelector(".app__body").innerHTML = htmlOrderList;

    document.querySelector(".header__pickup-order-arrow").addEventListener('click', () => {
        setDataMobile(data);
    });
}

function openAboutedWarehouseListTabMobile(data) {
    let htmlOrderList = "";
    htmlOrderList += 
    `<div class="pickup-order hide-on-destop">
                <div class="pickup-order__header">
                    <div class="pickup-order__header-container">
                        <div class="header__pickup-order-arrow">
                            <i class="uil uil-arrow-left pickup-order__header-arrow-icon"></i>
                        </div>
                        <div class="header__pickup-order__title">Đã hoàn thành</div>
                    </div>
                </div>
                <div class="pickup-order__list-title">${data.ordersAboutedWarehouse.length} đơn hàng</div>
                <div class="pickup-order__works">`;
                data.ordersAboutedWarehouse.forEach(element => {
                    htmlOrderList += 
                    `<div class="pickup-order__work">
                        <div class="pickup-order__work-row">
                            <div class="pickup-order__work-col-1">Mã đơn hàng</div>
                            <div class="pickup-order__work-col-2">ĐH${element.fK_iOrderID}</div>
                        </div>
                        <div class="pickup-order__work-row">
                            <div class="pickup-order__work-col-1">Khách hàng</div>
                            <div class="pickup-order__work-col-2">${element.sFullName}</div>
                        </div>
                        <div class="pickup-order__work-row">
                            <div class="pickup-order__work-col-1">Ngày đặt</div>
                            <div class="pickup-order__work-col-2">${formatDate(element.dDate)}</div>
                        </div>
                        <div class="pickup-order__work-row">
                            <div class="pickup-order__work-col-1">Tổng tiền</div>
                            <div class="pickup-order__work-col-2">${money_2(element.fTotalPrice)}</div>
                        </div>
                        <div class="pickup-order__work-row">
                            <div class="pickup-order__work-col-1">Trạng thái</div>
                            <div class="pickup-order__work-col-2">${element.sOrderStatusName}</div>
                        </div>
                        <div class="pickup-order__work-row">
                            <div class="pickup-order__work-col-1">Thanh toán</div>
                            <div class="pickup-order__work-col-2">${element.sPaymentName}</div>
                        </div>
                        <div class="pickup-order__work-row">
                            <div class="pickup-order__work-col-1"></div>
                            <div class="pickup-order__work-col-2">
                                <a href="javascript:openOrderDetailMobile(${element.fK_iOrderID})" class="pickup-order__work-link">Chi tiết đơn</a>
                            </div>
                        </div>
                    </div>`;
                });
                htmlOrderList += `
                </div>
            </div>`;
    document.querySelector(".app__body").innerHTML = htmlOrderList;

    document.querySelector(".header__pickup-order-arrow").addEventListener('click', () => {
        setDataMobile(data);
    });
}

function openOrderDetailMobile(orderID) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/picker-api/' + orderID + '', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);

            setDataOrderDetailMobile(data);

        }
    }
    xhr.send(null);
}

function setDataOrderDetailMobile(data) {
    let htmlOrderDetail = "";
    htmlOrderDetail += 
        `<div class="pickup__order-detail hide-on-destop">
                <div class="pickup__order-detail-header">
                    <div class="pickup__order-detail-header-container">
                        <div class="header__pickup-order-detail-arrow">
                            <i class="uil uil-arrow-left header__pickup-order-detail-arrow-icon"></i>
                        </div>
                        <div class="header__pickup-order-detail-title">Đơn hàng 01</div>
                    </div>
                </div>
                <div class="pickup__order-detail-address">
                    <div class="pickup__order-detail-address-destination">
                        <i class="uil uil-map-marker pickup__order-detail-address-destination-icon"></i>
                    </div>
                    <div class="pickup__order-detail-address-desc">
                        <div class="pickup__order-detail-address-desc-title">Địa chỉ lấy hàng</div>
                        <span class="pickup__order-detail-address-desc-name">${data.sellerInfos[0].sStoreName}</span> <span class="pickup__order-detail-address-desc-divide">|</span>
                        <span class="pickup__order-detail-address-desc-phone">(+84) ${data.sellerInfos[0].sSellerPhone}</span>
                        <div class="pickup__order-detail-address-desc-direction">${data.sellerInfos[0].sSellerAddress}</div>
                    </div>
                </div>
                <div class="pickup__order-detail-label">
                    <div class="pickup__order-detail-label-box"></div>
                </div>
                <div class="pickup__order-detail-product">
                    <div class="pickup__order-detail-product-list">`;
                    data.orderDetails.forEach(element => {
                        htmlOrderDetail += 
                        `<div class="pickup__order-detail-product-item">
                            <div class="pickup__order-detail-product-item-header">
                                <div class="pickup__order-detail-product-item-header-favorite">Yêu thích</div>
                                <div class="pickup__order-detail-product-item-header-shop">${element.sStoreName}</div>
                            </div>
                            <div class="pickup__order-detail-product-item-body">
                                <div class="pickup__order-detail-product-item-thumb">
                                    <img class="pickup__order-detail-product-item-img" src="/img/${element.sImageUrl}">
                                </div>
                                <div class="pickup__order-detail-product-item-info">
                                    <div class="pickup__order-detail-product-item-info-name">
                                    ${element.sProductName}
                                    </div>
                                    <div class="pickup__order-detail-product-item-bottom">
                                        <div class="pickup__order-detail-product-item-bottom-change">
                                            <span>Đổi ý miễn phí</span>
                                        </div>
                                        <div class="pickup__order-detail-product-item-numb">
                                            <div class="pickup__order-detail-product-item-numb-quantity">x${element.iQuantity}</div>
                                            <div class="pickup__order-detail-product-item-numb-price">${money_2(element.dUnitPrice)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="pickup__order-detail-product-item-transport">
                                <div class="pickup__order-detail-product-item-transport-header">Vận chuyển</div>
                                <div class="pickup__order-detail-product-item-transport-type">
                                    <div class="pickup__order-detail-product-item-transport-type-sub">Nhanh</div>
                                    <div class="pickup__order-detail-product-item-transport-type-price">${money_2(element.dTransportPrice)}</div>
                                </div>
                                <div class="pickup__order-detail-product-item-transport-time">Nhận hàng vào 7 Tháng 7 - 8 Tháng 7</div>
                                <div class="pickup__order-detail-product-item-transport-inspection">
                                    <span>Được đồng kiểm.</span>
                                    <i class="uil uil-question-circle pickup__order-detail-product-item-transport-inspection-icon"></i>
                                </div>
                            </div>
                            <div class="pickup__order-detail-product-item-into-money">
                                <div class="pickup__order-detail-product-item-into-money-sub">Thành tiền (${element.iQuantity} sản phẩm):</div>
                                <div class="pickup__order-detail-product-item-into-money-price">${money_2(element.dMoney)}</div>
                            </div>
                        </div>`;
                    });
                    var totalItemPrice = data.orderDetails.reduce((total, item) => {
                        return total + item.dUnitPrice;
                    }, 0);
                
                    var totalTransportPrice = data.orderDetails.reduce((total, transport) => {
                        return total + transport.dTransportPrice;
                    }, 0);
                    htmlOrderDetail += `
                    </div>
                </div>
                <div class="pickup__order-detail-payment-type">
                    <div class="pickup__order-detail-payment-type-header">
                        <div class="pickup__order-detail-payment-type-header-col">
                            <i class="uil uil-usd-circle pickup__order-detail-payment-type-header-sub-icon"></i>
                            <div class="pickup__order-detail-payment-type-header-sub">Phương thức thanh toán</div>
                        </div>
                        <div class="pickup__order-detail-payment-type-header-col">
                            <div class="pickup__order-detail-payment-type-header-sub">${data.payments[0].sPaymentName}</div>
                        </div>
                    </div>
                    <div class="pickup__order-detail-payment-type-pay">
                        Dùng SMePay để tận hưởng nhiều voucer ưu đãi.
                    </div>
                </div>
                <div class="pickup__order-detail-money">
                    <div class="pickup__order-detail-money-header">
                        <i class="uil uil-notes pickup__order-detail-money-header-icon"></i>
                        <div class="pickup__order-detail-header-sub">Chi tiết thanh toán</div>
                    </div>
                    <div class="pickup__order-detail-money-body">
                        <div class="pickup__order-detail-money-total-price-product">
                            <div class="pickup__order-detail-total-price-product-sub">Tổng tiền hàng</div>
                            <div class="pickup__order-detail-total-price-product-numb">${money_2(totalItemPrice)}</div>
                        </div>
                        <div class="pickup__order-detail-money-transport-price">
                            <div class="pickup__order-detail-transport-price-sub">Phí vận chuyển</div>
                            <div class="pickup__order-detail-transport-price-numb">${money_2(totalTransportPrice)}</div>
                        </div>
                    </div>
                    <div class="pickup__order-detail-bottom">
                        <div class="pickup__order-detail-bottom-sub">Thành tiền</div>
                        <div class="pickup__order-detail-bottom-price">${money_2(totalItemPrice + totalTransportPrice)}</div>
                    </div>
                </div>
                <div class="pickup__order-detail-footer">`;
                if (data.shippingOrders.length != 0 && data.shippingOrders[0].fK_iOrderStatusID == 6) {
                    htmlOrderDetail += 
                    `<div class="header__pickup-order-footer-btn" onclick="openReceiveOrderModalMobile(${data.shippingOrders[0].pK_iShippingOrderID})">Nhận đơn</div>`;
                } else if (data.shippingPickers.length != 0 && data.shippingPickers[0].fK_iOrderStatusID == 7) {
                    htmlOrderDetail += 
                    `<div class="header__pickup-order-footer-btn" onclick="openGotGoodMobile(${data.shippingPickers[0].pK_iShippingPickerID}, ${data.shippingPickers[0].fK_iShippingOrderID}, ${data.shippingPickers[0].fK_iOrderID})">Xác nhận đã lấy hàng</div>`;
                } else if (data.shippingPickers.length != 0 && data.shippingPickers[0].fK_iOrderStatusID == 10) {
                    htmlOrderDetail += 
                    `<div class="header__pickup-order-footer-btn">Đang về tổng kho ...</div>`;
                } else {
                    htmlOrderDetail += 
                    `<div class="header__pickup-order-footer-btn">Đã về tổng kho</div>`;
                }
                htmlOrderDetail += `
                </div>
            </div>`;
    document.querySelector(".app__body").innerHTML = htmlOrderDetail;
    if (data.orderDetails.length != 0 && data.shippingOrders.length != 0) {
        document.querySelector(".header__pickup-order-detail-arrow").addEventListener('click', () => {
            openOrderListTabMobile(data);
        });
    } else if (data.orderDetails.length != 0 && data.shippingPickers[0].fK_iOrderStatusID == 7) {
        document.querySelector(".header__pickup-order-detail-arrow").addEventListener('click', () => {
            openPickingOrderListTabMobile(data)
        });
    } else {
        document.querySelector(".header__pickup-order-detail-arrow").addEventListener("click", () => {
            openAboutedWarehouseListTabMobile(data);
        });
    }
}

function openReceiveOrderModalMobile(shippingOrderID) {
    openModalMobile();
    document.querySelector(".modal__body").innerHTML =
                            `<div class="modal__confirm-mobile">
                                <div class="modal__confirm-mobile-msg">Bạn có chắc muốn nhận đơn hàng này?</div>
                                <div class="modal__confirm-mobile-btns">
                                    <div class="modal__confirm-mobile-btn-no" onclick="closeModal()">Không</div>
                                    <div class="modal__confirm-mobile-btn-agree" onclick="confirmTakeOrderMobile(${shippingOrderID})">Đồng ý</div>
                                </div>
                            </div>`;
}

function confirmTakeOrderMobile(shippingOrderID) {
    document.querySelector(".modal__body").innerHTML = 
        `<div class="spinner"></div>`;
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
                    toastMobile({ title: "Thông báo", msg: `${data.status.message}`, type: "success", duration: 5000 });
                    document.querySelector(".modal__body").innerHTML = "";
                    setTimeout(() => {
                        document.querySelector(".header__pickup-order-footer-btn").innerHTML = "Đang lấy hàng...";
                        setDataMobile(data);
                    }, 1000)
                }, 2000);
            }
            
        }
    };
    xhr.send(formData);
}

// Confirmation of receipt of goods
function openGotGoodMobile(shippingPickerID, shippingOrderID, orderID) {
    openModal();
    document.querySelector(".modal__body").innerHTML = 
    `
                            <div class="modal__confirm-mobile">
                                <div class="modal__confirm-mobile-msg">Bạn đã lấy được đơn hàng này?</div>
                                <div class="modal__confirm-mobile-btns">
                                    <div class="modal__confirm-mobile-btn-no" onclick="closeModal()">Không</div>
                                    <div class="modal__confirm-mobile-btn-agree" onclick="openAddImgPickerMobile(${shippingPickerID}, ${shippingOrderID}, ${orderID})">Đồng ý</div>
                                </div>
                            </div>
    `;
}

function openAddImgPickerMobile(shippingPickerID, shippingOrderID, orderID) {
    document.querySelector(".modal__body").innerHTML = 
    `
                            <div class="modal__add-img-mobile">
                                <div class="modal__add-img-mobile-title">Thêm ảnh lấy hàng</div>
                                <div class="modal__add-img-mobile-check">
                                    <div class="modal__add-img-mobile-rb">
                                        <input type="radio" name="ratio-img" id="" class="modal__add-img-mobile-input">
                                        <label for="modal__add-img-mobile-input" class="modal__add-img-mobile-label">Hình ảnh tỉ lệ 1:1</label>
                                    </div>
                                    <div class="modal__add-img-mobile-rb">
                                        <input type="radio" name="ratio-img" id="" class="modal__add-img-mobile-input">
                                        <label for="modal__add-img-mobile-input" class="modal__add-img-mobile-label">Hình ảnh tỉ lệ 3:4</label>
                                    </div>
                                </div>
                                <div class="modal__add-img-mobile-pic">
                                    <img src="/img/no_img.jpg" class="modal__add-img-mobile-value" alt="">
                                    <label class="modal__add-img-mobile-pick">
                                        <div class="modal__add-img-mobile-pick-container">
                                            <i class="uil uil-image-plus modal__add-img-mobile-pick-icon"></i>
                                            <div class="modal__add-img-mobile-pick-sub">
                                                Thêm hình ảnh (0/9)
                                            </div>
                                        </div>
                                        <input type="file" accept="image/jpeg, image/png, image/jpg" class="modal__add-img-mobile-pick-file" id="input-file">
                                    </label>
                                </div>
                                <div class="modal__add-img-mobile-btn">Xác nhận</div>
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

function logoutPickerAccount() {
    openModalMobile();
    document.querySelector(".modal__body").innerHTML = `<div class="spinner"></div>`;
    deleteCookies("pickerID");
    setTimeout(() => {
        closeModalMobile();
        toastMobile({ title: "Thông báo", msg: `Đăng xuất thành công!`, type: "success", duration: 5000 });
        document.querySelector(".modal__body").innerHTML = "";
        setTimeout(() => {
            window.location.assign('/');
        }, 1000)
    }, 2000);
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

function deleteCookies(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

// Modal
function openModalMobile() {
    document.querySelector(".modal").classList.add("open");
}

function closeModalMobile() {
    document.querySelector(".modal").classList.remove("open");
}

// Toast
function toastMobile({ title = "", msg = "", type = "", duration = 3000}) {
    const main = document.getElementById('toast');
    if (main) {
        const toast = document.createElement("div");
        const autoRemoveId = setTimeout(() => {
            main.removeChild(toast);
        }, duration + 1000);

        toast.onclick = (e) => {
            if (e.target.closest('.toast__close')) {
                main.removeChild(toast);
                clearTimeout(autoRemoveId);
            }
        };

        const icons = {
            success: 'uil uil-check-circle',
            err: 'uil uil-exclamation-triangle'
        };

        icon = icons[type];
        const delay = (duration / 1000).toFixed(2);

        toast.classList.add('toast', `toast--${type}`);
        toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
        toast.innerHTML = `
            <div class="toast__icon">
                <i class="${icon}"></i>
            </div>
            <div class="toast__body">
                <h3 class="toast__title">${title}</h3>
                <p class="toast__msg">${msg}</p>
            </div>
            <div class="toast__close">
                <i class="uil uil-times"></i>
            </div>
        `;
        main.appendChild(toast);
    }
}

// Show Navbar Menu
function showNavMenu() {
    document.querySelector(".header__menu-overlay").classList.add("open");
    document.querySelector(".header__menu-container").classList.add("open");
}

function closeNavMenu() {
    document.querySelector(".header__menu-overlay").classList.remove("open");
    document.querySelector(".header__menu-container").classList.remove("open");
}


