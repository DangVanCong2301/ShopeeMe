function getAPIDeliveryChannel() {
    let userID = getCookies("userID");
    if (userID == undefined) {
        window.location.replace("/user/login");
    } else {
        var xhr = new XMLHttpRequest();
        xhr.open('get', '/delivery-api?userID=' + userID + '', true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const data = JSON.parse(xhr.responseText);

                console.log(data);

                if (data.user[0].sRoleName != "delivery") {
                    window.location.replace("/user/login");
                }

                setData(data);

                setDataMobile(data);

            }
        };
        xhr.send(null);
    }
}
getAPIDeliveryChannel();

function setData(data) {
    showHeader();
    showBottomNav();
    document.querySelector(".app__container").innerHTML = 
    `
    <div class="phone-pickup">
        <div class="phone-pickup__title">Danh sách cần làm</div>
        <div class="phone-pickup__list">
            <div class="phone-pickup__item phone-pickup__item-wait">
                <div class="phone-pickup__item-numb">${data.ordersWaitDelivery.length}</div>
                <div class="phone-pickup__item-numb-text">Chờ giao hàng</div>
            </div>
            <div class="phone-pickup__item phone-pickup__item-delivering">
                <div class="phone-pickup__item-numb">${data.ordersDelivering.length}</div>
                <div class="phone-pickup__item-numb-text">Đang giao hàng</div>
            </div>
            <div class="phone-pickup__item phone-pickup__item-delivered">
                <div class="phone-pickup__item-numb">${data.ordersDelivered.length}</div>
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

    document.querySelector(".phone-pickup__item-delivering").addEventListener('click', () => {
        openDeliveringOrderListTab(data);
    });

    document.querySelector(".phone-pickup__item-delivered").addEventListener('click', () => {
        openDeliveredOrderListTab(data);
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
                                    <div class="phone-header__pickup-order-title">Chờ giao hàng</div>
                                </div>
                            </div>
                            <div class="phone-pickup__order-list-title">${data.ordersWaitDelivery.length} đơn hàng</div>
                            <div class="phone-pickup__works">`;
                                htmlOrderList += data.htmlOrdersWaitDeliveryItem
    htmlOrderList += `      </div>
                        </div>
    `;
    document.querySelector(".app__container").innerHTML = htmlOrderList;
    document.querySelector(".phone-header__pickup-order-list-arrow").addEventListener('click', () => {
        setData(data);
    });
}

function openOrderDetail(orderID) {
    var formData = new FormData();
    formData.append("orderID", orderID);

    var xhr = new XMLHttpRequest();
    xhr.open('post', '/delivery-api', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);

            setDataOrderDetail(data);

        }
    }
    xhr.send(formData);
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
                            <div class="phone-header__pickup-order-arrow phone-header__delivery-order-detail-arrow">
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
                            <div class="phone-pickup__order-address-desc-title">Địa chỉ nhận hàng</div>
                            <span class="phone-pickup__order-address-desc-name">${data.deliveryAddresses[0].sFullName}</span> <span class="phone-pickup__order-address-desc-divide">|</span>
                            <span class="phone-pickup__order-address-desc-phone">(+84) ${data.deliveryAddresses[0].sPhone}</span>
                            <div class="phone-pickup__order-address-desc-direction">${data.deliveryAddresses[0].sAddress}</div>
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
                    <div class="phone-pickup__order-footer">`;
                    if (data.shippingDelivering.length != 0 && data.shippingDelivering[0].fK_iOrderStatusID == 18) {
                        htmlOrderDetail += 
                        `
                        <div class="phone-header__pickup-order-footer-btn" onclick="openGotGood(${data.ordersDelivering[0].pK_iShippingDeliveryID}, ${data.ordersDelivering[0].fK_iShippingOrderID}, ${data.ordersDelivering[0].fK_iOrderID})">Xác nhận đã lấy hàng</div>
                        `;    
                    } else if (data.shippingDelivering.length != 0 && data.shippingDelivering[0].fK_iOrderStatusID == 8) {
                        htmlOrderDetail += 
                        `
                        <div class="phone-header__pickup-order-footer-btn" onclick="openCompleteJob(${data.shippingDelivering[0].pK_iShippingDeliveryID}, ${data.shippingDelivering[0].fK_iShippingOrderID}, ${data.shippingDelivering[0].fK_iOrderID})">Đang giao hàng...</div>
                        `; 
                    } else if (data.shippingDelivered.length != 0 && data.shippingDelivered.fK_iOrderStatusID == 15) {
                        htmlOrderDetail += 
                        `
                        <div class="phone-header__pickup-order-footer-btn">Đã giao hàng</div>
                        `; 
                    } else {
                        htmlOrderDetail += `
                        <div class="phone-header__pickup-order-footer-btn" onclick="openReceiveOrderModal(${data.shippingWaitDelivery[0].fK_iShippingOrderID}, ${data.shippingWaitDelivery[0].fK_iOrderID})">Nhận đơn</div>`;
                    }
                    htmlOrderDetail += `
                    </div>
                </div>
    `;
    document.querySelector(".app__container").innerHTML = htmlOrderDetail;
    if (data.shippingDelivering.length != 0 && data.shippingDelivering[0].fK_iOrderStatusID == 7) {
        document.querySelector(".phone-header__delivery-order-detail-arrow").addEventListener('click', () => {
            openDeliveringOrderListTab(data);
        });
    } else if (data.shippingDelivered.length != 0 && data.shippingDelivered.fK_iOrderStatusID == 15) {
        document.querySelector(".phone-header__delivery-order-detail-arrow").addEventListener('click', () => {
            openDeliveredOrderListTab(data);
        });
    } else {
        document.querySelector(".phone-header__delivery-order-detail-arrow").addEventListener('click', () => {
            openOrderListTab(data);
        });
    }                   
}

function openReceiveOrderModal(shippingOrderID, orderID) {
    openModal();
    document.querySelector(".phone-modal__body").innerHTML = 
    `
                            <div class="phone-modal__confirm">
                                <div class="phone-modal__confirm-msg">Bạn có chắc muốn nhận đơn hàng này?</div>
                                <div class="phone-modal__confirm-btns">
                                    <div class="phone-modal__confirm-btn-no" onclick="closeModal()">Không</div>
                                    <div class="phone-modal__confirm-btn-agree" onclick="confirmTakeOrder(${shippingOrderID}, ${orderID})">Đồng ý</div>
                                </div>
                            </div>
    `;
}

function confirmTakeOrder(shippingOrderID, orderID) {
    
    document.querySelector(".phone-modal__body").innerHTML = 
    `
        <div class="phone-spinner"></div>
    `;
    var formData = new FormData();
    formData.append("shippingOrderID", shippingOrderID);
    formData.append("orderID", orderID);
    formData.append("orderStatusID", 18);
    formData.append("deliveryImage", "no_img.jpg");

    var xhr = new XMLHttpRequest();
    xhr.open('post', '/delivery-api/take', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);

            if (data.status.statusCode == -11) {
                setTimeout(() => {
                    closeModal();
                    toast({ title: "Thông báo", msg: `${data.status.message}`, type: "err", duration: 5000 });
                    document.querySelector(".phone-modal__body").innerHTML = "";
                    setTimeout(() => {
                        setData(data);
                    }, 1000)
                }, 2000);
            }

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

// Delivering Tab
function openDeliveringOrderListTab(data) {
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
                            <div class="phone-pickup__order-list-title">${data.ordersDelivering.length} đơn hàng</div>
                            <div class="phone-pickup__works">`;
                                htmlOrderList += data.htmlOrdersDeliveringItem
    htmlOrderList += `      </div>
                        </div>
    `;
    document.querySelector(".app__container").innerHTML = htmlOrderList;
    document.querySelector(".phone-header__pickup-order-list-arrow").addEventListener('click', () => {
        setData(data);
    });
}

// Confirmation of receipt of goods
function openGotGood(shippingDeliveryID, shippingOrderID, orderID) {
    openModal();
    document.querySelector(".phone-modal__body").innerHTML = 
    `
                            <div class="phone-modal__confirm">
                                <div class="phone-modal__confirm-msg">Bạn đã lấy được đơn hàng này?</div>
                                <div class="phone-modal__confirm-btns">
                                    <div class="phone-modal__confirm-btn-no" onclick="closeModal()">Không</div>
                                    <div class="phone-modal__confirm-btn-agree" onclick="changeStateShippingDelivery(${shippingDeliveryID}, ${shippingOrderID}, ${orderID})">Đồng ý</div>
                                </div>
                            </div>
    `;
}

function changeStateShippingDelivery(shippingDeliveryID, shippingOrderID, orderID) {
    document.querySelector(".phone-modal__body").innerHTML = `<div class="phone-spinner"></div>`;

    var formData = new FormData();
    formData.append("shippingDeliveryID", shippingDeliveryID);
    formData.append("shippingOrderID", shippingOrderID);
    formData.append("orderID", orderID);

    var xhr = new XMLHttpRequest();
    xhr.open('post', '/delivery-api/taken', true);
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
}

// Complete Job
function openCompleteJob(shippingDeliveryID, shippingOrderID, orderID) {
    openModal();
    document.querySelector(".phone-modal__body").innerHTML = 
    `
                            <div class="phone-modal__confirm">
                                <div class="phone-modal__confirm-msg">Bạn đã giao hàng tới người mua?</div>
                                <div class="phone-modal__confirm-btns">
                                    <div class="phone-modal__confirm-btn-no" onclick="closeModal()">Không</div>
                                    <div class="phone-modal__confirm-btn-agree" onclick="openAddImgDeliver(${shippingDeliveryID}, ${shippingOrderID}, ${orderID})">Đồng ý</div>
                                </div>
                            </div>
    `;
}

function openAddImgDeliver(shippingDeliveryID, shippingOrderID, orderID) {
    document.querySelector(".phone-modal__body").innerHTML = 
    `
                            <div class="phone-modal__add-img">
                                <div class="phone-modal__add-img-title">Thêm ảnh giao hàng</div>
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
        
        let shippingDeliveryImg = "shipping_img.jpg"
        var formData = new FormData();
        formData.append("shippingDeliveryID", shippingDeliveryID);
        formData.append("shippingDeliveryImg", shippingDeliveryImg)
        formData.append("shippingOrderID", shippingOrderID);
        formData.append("orderID", orderID);

        var xhr = new XMLHttpRequest();
        xhr.open('post', '/delivery-api/complete', true);
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
                            setData(data);
                        }, 1000)
                    }, 2000);
                }
            }
        };
        xhr.send(formData);
    });
}

// Delivered Tab
function openDeliveredOrderListTab(data) {
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
                                    <div class="phone-header__pickup-order-title">Đã hoàn thành</div>
                                </div>
                            </div>
                            <div class="phone-pickup__order-list-title">${data.ordersDelivered.length} đơn hàng</div>
                            <div class="phone-pickup__works">`;
                                htmlOrderList += data.htmlOrdersDeliveredItem
    htmlOrderList += `      </div>
                        </div>
    `;
    document.querySelector(".app__container").innerHTML = htmlOrderList;
    document.querySelector(".phone-header__pickup-order-list-arrow").addEventListener('click', () => {
        setData(data);
    });
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
                        <div class="pickup__item-numb">${data.ordersWaitDelivery.length}</div>
                        <div class="pickup__item-numb-text">Chờ giao hàng</div>
                    </div>
                    <div class="pickup__item pickup__item-picking">
                        <div class="pickup__item-numb">${data.ordersDelivering.length}</div>
                        <div class="pickup__item-numb-text">Đang lấy hàng</div>
                    </div>
                    <div class="pickup__item pickup__item-abouted-warehouse">
                        <div class="pickup__item-numb">${data.ordersDelivered.length}</div>
                        <div class="pickup__item-numb-text">Đã hoàn thành</div>
                    </div>
                    <div class="pickup__item">
                        <div class="pickup__item-numb">0</div>
                        <div class="pickup__item-numb-text">Đã Huỷ</div>
                    </div>
                </div>
            </div>
        </div>`;
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