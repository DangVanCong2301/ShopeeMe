function getAPIDeliveryNode() {
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/seller/delivery-api', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);
            
            setOrderCode(data);
        }
    };
    xhr.send(null);
}
getAPIDeliveryNode();

function setOrderCode(data) {
    let htmlOrderCode = "";
    htmlOrderCode += 
    `
                <div class="order-code__container">
                    <div class="order-code__header">
                        <div class="order-code__header-logo">
                            <div class="order-code__header-logo-shopeeme">
                                <img src="/img/sme_logo_primary.png" class="order-code__header-logo-shopeeme-img" alt="">
                            </div>
                            <div class="order-code__header-logo-spx">
                                <img src="/img/SPX_express_logo.png" class="order-code__header-logo-spx-img" alt="">
                            </div>
                        </div>
                        <div class="order-code__header-id">
                            <div class="order-code__header-id-barcode">
                                <img src="/img/bar_code.png" class="order-code__header-id-barcode-img" alt="">
                            </div>
                            <div class="order-code__header-id-transport">
                                Mã vận đơn: SPXVN${data.shippingOrders[0].pK_iShippingOrderID}
                            </div>
                            <div class="order-code__header-id-order">
                                Mã đơn hàng: VP1C4PQP${data.shippingOrders[0].fK_iOrderID}
                            </div>
                        </div>
                    </div>
                    <div class="order-code__address">
                        <div class="order-code__address-from">
                            <div class="order-code__address-from-title">Từ:</div>
                            <div class="order-code__address-from-shop">${data.sellerInfos[0].sStoreName}</div>
                            <div class="order-code__address-from-desc">
                                ${data.sellerInfos[0].sSellerAddress}
                            </div>
                            <div class="order-code__address-from-phone">
                                SĐT: ${data.sellerInfos[0].sSellerPhone}
                            </div>
                        </div>
                        <div class="order-code__address-to">
                            <div class="order-code__address-to-title">Đến:</div>
                            <div class="order-code__address-to-name">${data.deliveryAddresses[0].sFullName}</div>
                            <div class="order-code__address-to-desc">
                            ${data.deliveryAddresses[0].sAddress}
                            </div>
                        </div>
                    </div>
                    <div class="order-code__area">
                        <div class="order-code__area-1"></div>
                        <div class="order-code__area-2">HN-20-05-HM14</div>
                        <div class="order-code__area-3">DC-20</div>
                    </div>
                    <div class="order-code__body">
                        <div class="order-code__body-left">
                            <div class="order-code__body-product-top">
                                <div class="order-code__body-product-title">Nội dung hàng (Tổng SL sản phẩm: 1)</div>
                                <div class="order-code__body-product-list">`;
                                data.orderDetailsWaitDelivery.forEach((element, index) => {
                                    htmlOrderCode+= `   
                                    <div class="order-code__body-product-item">
                                        ${index + 1}. ${element.sProductName} ..., 
                                        SL: ${element.iQuantity}
                                    </div>`;
                                });
                    htmlOrderCode +=`            
                                </div>
                            </div>
                            <div class="order-code__body-product-bottom">
                                Người gửi phải cam kết hàng hoá có đầy đủ các hoá đơn, chứng từ, giấy phép 
                                cần thiết theo quy định của pháp luật và đính kèm bên trong đơn hàng này (Lưu ý: 
                                Một số sản phẩm có thể bị ẩn do danh sách quá dài).
                            </div>
                        </div>
                        <div class="order-code__body-right">
                            <div class="order-code__body-qr">
                                <img src="/img/qr_code.png" class="order-code__body-qr-img" alt="">
                            </div>
                            <div class="order-code__body-id">HN-20-35-BT02R</div>
                            <div class="order-code__body-date">
                                <div class="order-code__body-date-title">Ngày đặt hàng:</div>
                                <div class="order-code__body-date-time">${data.ordersWaitDelivery[0].dDate}</div>
                                <div class="order-code__body-date-hour">17:15</div>
                            </div>
                        </div>
                    </div>
                    <div class="order-code__footer">
                        <div class="order-code__footer-top">
                            <div class="order-code__footer-left">
                                <div class="order-code__footer-money-title">Tiền thu Người nhận:</div>
                                <div class="order-code__footer-money-numb">${money(data.ordersWaitDelivery[0].fTotalPrice)} VND</div>
                            </div>
                            <div class="order-code__footer-right">
                                <div class="order-code__footer-mass">Khối lượng tối đa: 36g</div>
                                <div class="order-code__footer-signature">
                                    <div class="order-code__footer-signature-title">Chữ ký người nhận</div>
                                    <div class="order-code__footer-signature-sub">Xác nhận hàng nguyên vẹn, không móp/méo, bể/vỡ</div>
                                </div>
                            </div>
                        </div>
                        <div class="order-code__footer-bottom">
                            <div class="order-code__footer-bottom-title">Chỉ dẫn giao hàng: <span>Được đồng kiểm</span></div>
                            <div class="order-code__footer-bottom-sub">Chuyển hoàn sau 3 lần phát; Lưu kho tối đa 5 ngày</div>
                        </div>
                    </div>
                </div>
                <div class="order-code__pdf" onclick="downloadPdf()">
                    <i class="uil uil-file-download"></i>
                    <span>Tải PDF</span>
                </div>
    `;
    document.querySelector(".order-code").innerHTML = htmlOrderCode;
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