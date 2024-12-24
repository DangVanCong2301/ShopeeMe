function getAPIUserOrder() {
    
    const url = window.location.href;
    const params = new URL(url).searchParams;
    const entries = new URLSearchParams(params).values();
    const array = Array.from(entries)
    console.log(array[0]);
    const orderID = array[0];
    
   
   var xhr = new XMLHttpRequest();
   xhr.open('get', '/user/purchase/order-data?orderID=' + orderID + '', true);
   xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);
            
            setOrderStatus(data);

            setOrderAddress(data);
        }
   };
   xhr.send(null);
    
}
getAPIUserOrder();

function setOrderStatus(data) {
    let htmlOrderStatus = "";
    htmlOrderStatus += 
    `
                    <div class="order__header">
                        <div class="order__body-header-back">
                            <i class="uil uil-angle-left-b order__body-header-back-icon"></i>
                            <div class="order__body-header-back-text">TRỞ LẠI</div>
                        </div>
                        <div class="order__body-header-text">
                            <div class="order__body-header-code">
                                MÃ ĐƠN HÀNG.ĐH0${data.order[0].pK_iOrderID}
                            </div>
                            <span class="order__body-header-text">|</span>
                            <div class="order__body-header-status">
                                ${data.order[0].sOrderStatusName}
                            </div>
                        </div>
                    </div>
                    <div class="order__prevent">
                        <div class="order__prevent-box order__prevent-box-left"></div>
                        <div class="order__prevent-box order__prevent-box-right"></div>
                    </div>
                    <div class="order__stage">
                        <div class="order__stage-list">
                            <div class="order__stage-item">
                                <div class="order__stage-rounder active">
                                    <i class="uil uil-clipboard-alt order__stage-rounder-icon"></i>
                                </div>
                                <div class="order__stage-desc">
                                    <div class="order__stage-desc-status">Đã đã đặt hàng</div>
                                    <div class="order__stage-desc-time">18:13 20-02-2024</div>
                                </div>
                            </div>`;
                            if (data.order[0].fK_iOrderStatusID == 6 || data.order[0].fK_iOrderStatusID == 17 || data.order[0].fK_iOrderStatusID == 5 || data.order[0].fK_iOrderStatusID == 16) {
                                htmlOrderStatus += 
                                `
                            <div class="order__stage-line line-1 active"></div>
                            <div class="order__stage-item">
                                <div class="order__stage-rounder active">
                                    <i class="uil uil-bill order__stage-rounder-icon"></i>
                                </div>
                                <div class="order__stage-desc">
                                    <div class="order__stage-desc-status">Đơn đã xác nhận thanh toán</div>
                                    <div class="order__stage-desc-time">18:13 20-02-2024</div>
                                </div>
                            </div>
                                `;
                            } else {
                                htmlOrderStatus += 
                                `
                            <div class="order__stage-line line-1"></div>
                            <div class="order__stage-item">
                                <div class="order__stage-rounder">
                                    <i class="uil uil-bill order__stage-rounder-icon"></i>
                                </div>
                                <div class="order__stage-desc">
                                    <div class="order__stage-desc-status">Đơn đã xác nhận thanh toán</div>
                                    <div class="order__stage-desc-time">18:13 20-02-2024</div>
                                </div>
                            </div>

                                `;
                            }
                            if (data.order[0].fK_iOrderStatusID == 17 || data.order[0].fK_iOrderStatusID == 5 || data.order[0].fK_iOrderStatusID == 16) {
                                htmlOrderStatus += 
                                `
                            <div class="order__stage-line line-2 active"></div>
                            <div class="order__stage-item">
                                <div class="order__stage-rounder active">
                                    <i class="uil uil-truck order__stage-rounder-icon"></i>
                                </div>
                                <div class="order__stage-desc">
                                    <div class="order__stage-desc-status">Đã giao cho ĐVVC</div>
                                    <div class="order__stage-desc-time">18:13 20-02-2024</div>
                                </div>
                            </div>
                                `;
                            } else {
                                htmlOrderStatus += 
                                `
                            <div class="order__stage-line line-2"></div>
                            <div class="order__stage-item">
                                <div class="order__stage-rounder">
                                    <i class="uil uil-truck order__stage-rounder-icon"></i>
                                </div>
                                <div class="order__stage-desc">
                                    <div class="order__stage-desc-status">Đã giao cho ĐVVC</div>
                                    <div class="order__stage-desc-time">18:13 20-02-2024</div>
                                </div>
                            </div>
                                `;
                            }
                            if (data.order[0].fK_iOrderStatusID == 5 || data.order[0].fK_iOrderStatusID == 16) {
                                htmlOrderStatus += 
                                `
                            <div class="order__stage-line line-3 active"></div>
                            <div class="order__stage-item">
                                <div class="order__stage-rounder active">
                                    <i class="uil uil-box order__stage-rounder-icon"></i>
                                </div>
                                <div class="order__stage-desc">
                                    <div class="order__stage-desc-status">Đã nhận được hàng</div>
                                    <div class="order__stage-desc-time">18:13 20-02-2024</div>
                                </div>
                            </div>
                                `;
                            } else {
                                htmlOrderStatus += 
                                `
                            <div class="order__stage-line line-3"></div>
                            <div class="order__stage-item">
                                <div class="order__stage-rounder">
                                    <i class="uil uil-box order__stage-rounder-icon"></i>
                                </div>
                                <div class="order__stage-desc">
                                    <div class="order__stage-desc-status">Đã nhận được hàng</div>
                                    <div class="order__stage-desc-time">18:13 20-02-2024</div>
                                </div>
                            </div>
                                `;
                            }
                            if (data.order[0].fK_iOrderStatusID == 16) {
                                htmlOrderStatus += 
                                `
                            <div class="order__stage-line line-4 active"></div>
                            <div class="order__stage-item">
                                <div class="order__stage-rounder active">
                                    <i class="uil uil-star order__stage-rounder-icon"></i>
                                </div>
                                <div class="order__stage-desc">
                                    <div class="order__stage-desc-status">Đơn hàng đã hoàn thành</div>
                                    <div class="order__stage-desc-time">18:13 20-02-2024</div>
                                </div>
                            </div>
                                `;
                            } else {
                                htmlOrderStatus += 
                                `
                            <div class="order__stage-line line-4"></div>
                            <div class="order__stage-item">
                                <div class="order__stage-rounder">
                                    <i class="uil uil-star order__stage-rounder-icon"></i>
                                </div>
                                <div class="order__stage-desc">
                                    <div class="order__stage-desc-status">Đơn hàng đã hoàn thành</div>
                                    <div class="order__stage-desc-time">18:13 20-02-2024</div>
                                </div>
                            </div>
                                `;
                            }
                            htmlOrderStatus += `
                        </div>
                    </div>
                    <div class="order__prevent">
                        <div class="order__prevent-box order__prevent-box-left"></div>
                        <div class="order__prevent-box order__prevent-box-right"></div>
                    </div>
                    <div class="order__repurchase">
                        <div class="order__repurchase-thank">Cảm ơn bạn đã mua sắp tại ${data.store[0].sStoreName}!</div>
                        <button class="btn btn--primary">Mua lại</button>
                    </div>
                    <div class="order__prevent">
                        <div class="order__prevent-box order__prevent-box-left"></div>
                        <div class="order__prevent-box order__prevent-box-right"></div>
                    </div>
                    <div class="order__contact">
                        <a href="#" class="btn order__contact-btn">Liên hệ người bán</a>
                    </div>
    `;
    document.querySelector(".order__status").innerHTML = htmlOrderStatus;
}

function setOrderAddress(data) {
    let htmlOrderAddress = "";
    if (data.shippingOrder.length != 0) {
        htmlOrderAddress += 
        `
                                    <div class="order__label">
                                        <div class="order__label-box"></div>
                                    </div>
                                    <div class="order__body">
                                        <div class="order__body-header">
                                            <div class="order__body-address-title">Địa chỉ nhận hàng</div>
                                            <div class="order__body-address-transport">
                                                <div class="order__body-address-transport-name">SPX Express</div>
                                                <div class="order__body-address-transport-code">VN0${data.shippingOrder[0].pK_iShippingOrderID}</div>
                                            </div>
                                        </div>
                                        <div class="order__body-main">
                                            <div class="order__body-address">
                                                <div class="order__body-customer-name">${data.address[0].sFullName}</div>
                                                <div class="order__body-customer-phone">(+84) ${data.address[0].sPhone}</div>
                                                <div class="order__body-customer-info">${data.address[0].sAddress}</div>
                                            </div>
                                            <ul class="order__body-list">
                                                <li class="order__body-item">
                                                    <div class="order__body-item-time">
                                                        <div class="order__body-item-datetime">
                                                            26 Tháng 2
                                                        </div>
                                                        <div class="order__body-item-hour">
                                                            13:15
                                                        </div>
                                                    </div>
                                                    <div class="order__body-line">
                                                        <div class="order__item-rounder">
                                                            <i class="uil uil-check"></i>
                                                        </div>
                                                        <div class="order__item-line"></div>
                                                    </div>
                                                    <div class="order__item-desc">
                                                        <div class="order__item-desc-status">Đã giao</div>
                                                        <p class="order__item-desc-text">Đơn hàng đã được giao thành công</p>
                                                        <p class="order__item-desc-text">Người nhận hàng: Đặng Văn Công</p>
                                                        <a href="" class="order__item-desc-link">Xem hình ảnh giao hàng</a>
                                                    </div>
                                                </li>
                                                <li class="order__body-item order__body-item--blur order__body-item--stage">
                                                    <div class="order__body-item-time">
                                                        <div class="order__body-item-datetime">
                                                            25 Tháng 2
                                                        </div>
                                                        <div class="order__body-item-hour">
                                                            10:30
                                                        </div>
                                                    </div>
                                                    <div class="order__body-line">
        
                                                        <div class="order__item-rounder">
                        
                                                        </div>
                                                        <div class="order__item-line"></div>
                                                    </div>
                                                    <div class="order__item-desc">
                                                        <p class="order__item-desc-text">Đơn hàng đang được trung chuyển đến 20 HoangMai Hub</p>
                                                    </div>
                                                </li>
                                                <li class="order__body-item order__body-item--blur">
                                                    <div class="order__body-item-time">
                                                        <div class="order__body-item-datetime">
                                                            26 Tháng 2
                                                        </div>
                                                        <div class="order__body-item-hour">
                                                            13:15
                                                        </div>
                                                    </div>
                                                    <div class="order__body-line">
        
                                                        <div class="order__item-rounder">
                                                            <i class="uil uil-truck"></i>
                                                        </div>
                                                        <div class="order__item-line"></div>
                                                    </div>
                                                    <div class="order__item-desc">
                                                        <div class="order__item-desc-status">Đơn hàng đã được giao cho ĐVVC</div>
                                                        <p class="order__item-desc-text">Đơn hàng đang trên đường giao đến bạn</p>
                                                    </div>
                                                </li>`;
                                                if (data.order[0].fK_iOrderStatusID == 6 || data.order[0].fK_iOrderStatusID == 17 || data.order[0].fK_iOrderStatusID == 5 || data.order[0].fK_iOrderStatusID == 16) {
                                                    htmlOrderAddress += 
                                                `<li class="order__body-item order__body-item--blur">
                                                    <div class="order__body-item-time">
                                                        <div class="order__body-item-datetime">
                                                        ${setDateMonth(data.order[0].dDate)}
                                                        </div>
                                                        <div class="order__body-item-hour">
                                                        ${getTime(data.order[0].dDate)}
                                                        </div>
                                                    </div>
                                                    <div class="order__body-line">
                                                        <div class="order__item-rounder">
                                                            <i class="uil uil-bill"></i>
                                                        </div>
                                                        <div class="order__item-line"></div>
                                                    </div>
                                                    <div class="order__item-desc">
                                                        <div class="order__item-desc-status">Đã xác nhận thanh toán</div>
                                                        <p class="order__item-desc-text">Đơn hàng đã được thanh toán</p>
                                                    </div>
                                                </li>`;
                                                }
                                                htmlOrderAddress += `
                                                <li class="order__body-item order__body-item--blur">
                                                    <div class="order__body-item-time">
                                                        <div class="order__body-item-datetime">
                                                            ${setDateMonth(data.order[0].dDate)}
                                                        </div>
                                                        <div class="order__body-item-hour">
                                                            ${getTime(data.order[0].dDate)}
                                                        </div>
                                                    </div>
                                                    <div class="order__body-line">
                                                        <div class="order__item-rounder">
                                                            <i class="uil uil-clipboard-alt"></i>
                                                        </div>
                                                    </div>
                                                    <div class="order__item-desc">
                                                        <div class="order__item-desc-status">Đơn hàng đã được đặt</div>
                                                        <p class="order__item-desc-text">Đơn hàng đã được đặt</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
        `;
        document.querySelector(".order__address").innerHTML = htmlOrderAddress;
    }
}