function getAPIBillAdmin() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/admin/bill-api', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);

            setBill(data)
    
        }
    };
    xhr.send(null);
}
getAPIBillAdmin();

function setBill(data) {
    let htmlBill = "";
    htmlBill += 
    `
                <div class="order-code__container">
                    <div class="order-code__header">
                        <div class="order-code__header-logo">
                            <div class="order-code__header-logo-shopeeme">
                                <img src="/img/shopeeme_logo_primary.png" class="order-code__header-logo-shopeeme-img" alt="">
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
                                Mã đơn hàng: VP1C4PQP${data.ordersPickingUp[0].pK_iOrderID}
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
                            <div class="order-code__address-to-name">${data.addresses[0].sFullName}</div>
                            <div class="order-code__address-to-desc">
                            ${data.addresses[0].sAddress}
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
                                data.orderDetailsPickingUp.forEach((element, index) => {
                                    htmlBill+= `   
                                    <div class="order-code__body-product-item">
                                        ${index + 1}. ${element.sProductName} ..., 
                                        SL: ${element.iQuantity}
                                    </div>`;
                                });
                                htmlBill +=`            
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
                                <div class="order-code__body-date-time">${data.ordersPickingUp[0].dDate}</div>
                                <div class="order-code__body-date-hour">17:15</div>
                            </div>
                        </div>
                    </div>
                    <div class="order-code__footer">
                        <div class="order-code__footer-top">
                            <div class="order-code__footer-left">
                                <div class="order-code__footer-money-title">Tiền thu Người nhận:</div>
                                <div class="order-code__footer-money-numb">${money_2(data.ordersPickingUp[0].fTotalPrice)}</div>
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
    document.querySelector(".order-code").innerHTML = htmlBill;
}

function money_2(number) {
    const formattedAmount = new Intl.NumberFormat('vi-VI', {
        style: 'currency',
        currency: 'VND',
    }).format(number);
    return formattedAmount;
}