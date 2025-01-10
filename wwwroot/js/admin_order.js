function getAPIAdminOrder() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/admin/order-data?orderID=' + getQueryStr() + '', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);

            setTimesConfirm(data);

            setDataAddressDesc(data);

            setDataOrderDetails(data);

            setPaymentsType(data);

            setOrderStatus(data);

            setTotalPrice(data);

            setConfirmOrderBtn(data);
            
        }
    };
    xhr.send(null);
}
getAPIAdminOrder();

function setDataAddressDesc(data) {
    let htmlAddressDesc = "";
    htmlAddressDesc += 
    `
                    <div class="checkout__address-desc-name">${data.addresses[0].sFullName}</div>
                    <div class="checkout__address-desc-phone">(+84) ${data.addresses[0].sPhone}</div>
                    <div class="checkout__address-desc-direction">${data.addresses[0].sAddress}</div>
    `;
    document.querySelector(".checkout__address-desc").innerHTML = htmlAddressDesc;
}

function setDataOrderDetails(data) {
    let htmlOrderDetail = "";
    data.orderDetails.forEach(element => {
        htmlOrderDetail += 
        `
                    <div class="checkout__product">
                        <div class="checkout__product-header">
                            <div class="checkout__product-header-name">Sản phẩm</div>
                            <div class="checkout__product-header-type"></div>
                            <div class="checkout__product-header-cost">Đơn giá</div>
                            <div class="checkout__product-header-quantity">Số lượng</div>
                            <div class="checkout__product-header-money">Thành tiền</div>
                        </div>
                        <div class="checkout__product-body">
                            <div class="checkout__product-body-felling">
                                <button type="button" class="checkout__product-body-felling-btn">Yêu thích</button>
                                <div class="checkout__product-body-felling-shop">${element.sStoreName}</div>
                                <a href="#" class="checkout__product-body-felling-chat">
                                    <i class="uil uil-chat checkout__product-body-felling-chat-icon"></i>
                                    <span>Chat ngay</span>
                                </a>
                            </div>
                            <div class="checkout__product-body-list">
                                <div class="checkout__product-body-item">
                                    <div class="checkout__product-body-item-name">
                                        <div class="checkout__product-body-item-img"
                                            style="background-image: url(/img/${element.sImageUrl});"></div>
                                        <div class="checkout__product-body-item-desc">
                                            <div class="checkout__product-body-item-text">
                                                ${element.sProductName}
                                            </div>
                                            <span>Đổi ý miễn phí 15 ngày</span>
                                        </div>
                                    </div>
                                    <div class="checkout__product-body-item-type">Loại: Bạc</div>
                                    <div class="checkout__product-body-item-cost">${money(element.dUnitPrice)} đ</div>
                                    <div class="checkout__product-body-item-quantity">${element.iQuantity}</div>
                                    <div class="checkout__product-body-item-money">${money(element.dMoney)} đ</div>
                                </div>
                            </div>
                        </div>
                        <div class="checkout__product-bottom admin-order__item-bottom">
                            <div class="checkout__product-bottom-sub">Tổng số tiền (${element.iQuantity} sản phẩm): </div>
                            <span>${money(element.dMoney)} đ</span>
                        </div>
                    </div>
        `;
    });
    document.querySelector(".checkout__list").innerHTML = htmlOrderDetail;
}

function setPaymentsType(data) {
    let htmlPaymentType = "";
    if (data.payments[0].pK_iPaymentID == 1) {
        htmlPaymentType += 
        `
                    <div class="checkout__payment-header-cod-btn">
                        Thanh toán khi nhận hàng
                    </div>
        `;
    } else if (data.payments[0].pK_iPaymentID == 2) {
        htmlPaymentType += 
        `
                        <div class="checkout__payment-header-paypal-btn">
                            <span>Pay</span> <span>Pal</span>
                        </div>
        `;
    } else if (data.payments[0].pK_iPaymentID == 3) {
        htmlPaymentType += 
        `
                        <div class="checkout__payment-header-vnpay-btn">
                            <span>VN</span><span>PAY</span>
                        </div>
        `;
    } else {
        htmlPaymentType += 
        `
                        <div class="checkout__payment-header-momo-btn">
                            MOMO
                        </div>
        `;
    }
    document.querySelector(".checkout__payment-header-name").innerHTML = htmlPaymentType;
}

function setOrderStatus(data) {
    let htmlOrderStatus = "";
    htmlOrderStatus += 
    `
        <div class="checkout__payment-header-sub">Trạng thái đơn hàng</div>
        <div class="checkout__payment-header-name">${data.ordersWaitSettlment[0].sOrderStatusName}</div>
    `;
    document.querySelector(".admin-order__status").innerHTML = htmlOrderStatus;
}

function setTotalPrice(data) {
    var totalItemPrice = data.orderDetails.reduce((total, item) => {
        return total + item.dUnitPrice;
    }, 0);

    var totalTransportPrice = data.orderDetails.reduce((total, transport) => {
        return total + transport.dTransportPrice;
    }, 0);

    let htmlMoney = "";
    htmlMoney += 
    `
                    <div class="checkout__payment-money-row">
                        <div class="checkout__payment-money-row-left"> <span>Tổng tiền hàng</span></div>
                        <div class="checkout__payment-money-row-right">${money(totalItemPrice)} đ</div>
                    </div>
                    <div class="checkout__payment-money-row">
                        <div class="checkout__payment-money-row-left"> <span>Phí vận chuyển</span></div>
                        <div class="checkout__payment-money-row-right">${money(totalTransportPrice)} đ</div>
                    </div>
                    <div class="checkout__payment-money-row">
                        <div class="checkout__payment-money-row-left"><span>Giảm giá phí vận chuyển</span> <i
                                class="uil uil-exclamation-octagon checkout__payment-money-row-left-icon"></i></div>
                        <div class="checkout__payment-money-row-right">00 đ</div>
                    </div>
                    <div class="checkout__payment-money-row-bottom">
                        <div class="checkout__payment-money-row-bottom-left"><span>Thành tiền</span></div>
                        <div class="checkout__payment-money-row-bottom-right">${money(totalItemPrice + totalTransportPrice)} đ</div>
                    </div>
    `;
    document.querySelector(".checkout__payment-money").innerHTML = htmlMoney;
}

// Set Time
const startingMinutes = 30;
let time = startingMinutes * 60;

function setTimesConfirm(data) {
    if (data.ordersWaitSettlment[0].fK_iOrderStatusID == 2) { 
        setInterval(updateCountdown, 1000);
    }
}

function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    let htmlSetTime = "";
    htmlSetTime +=
    `
                <div class="admin-order__times-container">
                    <div class="admin-order__times-title">Đơn hàng sẽ được xác nhận sau: </div>
                    <div class="admin-order__times-value">${minutes}:${seconds}</div>
                </div>
    `;
    document.querySelector(".admin-order__times").innerHTML = htmlSetTime;
    time--;
    if (seconds == 40) {
        
    }
}

function setConfirmOrderBtn(data) {
    let htmlConfirmOrder = "";
    if (data.ordersWaitSettlment[0].fK_iOrderStatusID == 2) { 
        htmlConfirmOrder += 
        `
                    <div class="checkout__payment-order-btn">
                        <button type="button" class="btn btn--primary checkout__payment-order-btn-container" onclick="confirmOrder()">
                            <div class="checkout__payment-order-btn-spinner hide-on-destop"></div>
                            Xác nhận đơn
                        </button>
                    </div>
        `;
    }
    document.querySelector(".checkout__payment-order").innerHTML = htmlConfirmOrder;
}

// Confirm Order
function confirmOrder() {
    var xhr = new XMLHttpRequest();
    xhr.open('put', '/admin/confirm-order?orderID=' + getQueryStr() + '', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const result = JSON.parse(xhr.responseText);
            document.querySelector(".checkout__payment-order-btn-spinner").classList.remove("hide-on-destop");
            setTimeout(() => {
                toast({ title: "Thông báo", msg: `${result.message}`, type: "success", duration: 5000 });
                setTimeout(() => {
                    document.querySelector(".checkout__payment-order-btn-spinner").classList.add("hide-on-destop");
                    document.querySelector(".checkout__payment-order-btn-container").innerHTML = "Chờ lấy hàng";
                    window.location.assign("/admin");
                }, 1000);
            }, 2000)
        }
    };
    xhr.send(null);
}

function getQueryStr() {
    const url = window.location.href;
    const params = new URL(url).searchParams;
    const entries = new URLSearchParams(params).values();
    const array = Array.from(entries)
    return array[0];
}

