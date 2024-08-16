function getAPIPerchase() {
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/user/purchase', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);
            
            getProductsOrderAll(data);

            getProductsOrderWaitSettlement(data);

        }
    };
    xhr.send(null);
}
getAPIPerchase();

const headerItem = document.querySelectorAll(".purchase__header-item");

for (let i = 0; i < headerItem.length; i++) {
    headerItem[i].addEventListener('click', () => {
        if (i == 0) {
            // Tất cả
            headerItem[i].classList.add("active");
            headerItem[2].classList.remove("active");
            headerItem[1].classList.remove("active");
            document.querySelector(".purchase__all").classList.remove("hide-on-destop");
            document.querySelector(".purchase__wait").classList.add("hide-on-destop");
            document.querySelector(".purchase__transport").classList.add("hide-on-destop");

            // Show/Hide in Mobile
            document.querySelector(".purchase__all").classList.remove("hide-on-mobile");
            document.querySelector(".purchase__wait").classList.add("hide-on-mobile");
            document.querySelector(".purchase__transport").classList.add("hide-on-mobile");
        } else if (i == 1) {
            // Chờ thanh toán
            headerItem[i].classList.add("active");
            headerItem[0].classList.remove("active");
            headerItem[2].classList.remove("active");
            document.querySelector(".purchase__all").classList.add("hide-on-destop");
            document.querySelector(".purchase__wait").classList.remove("hide-on-destop");
            document.querySelector(".purchase__transport").classList.add("hide-on-destop");

            // Show/Hide on Mobile
            document.querySelector(".purchase__all").classList.add("hide-on-mobile");
            document.querySelector(".purchase__wait").classList.remove("hide-on-mobile");
            document.querySelector(".purchase__transport").classList.add("hide-on-mobile");
        } else if (i == 2) {
            // Vận chuyển
            headerItem[i].classList.add("active");
            headerItem[0].classList.remove("active");
            headerItem[1].classList.remove("active");
            document.querySelector(".purchase__all").classList.add("hide-on-destop");
            document.querySelector(".purchase__wait").classList.add("hide-on-destop");
            document.querySelector(".purchase__transport").classList.remove("hide-on-destop");

            // Show/Hide in Mobile
            document.querySelector(".purchase__all").classList.add("hide-on-mobile");
            document.querySelector(".purchase__wait").classList.add("hide-on-mobile");
            document.querySelector(".purchase__transport").classList.remove("hide-on-mobile");
        }
    });
}

function getProductsOrderAll(data) {
    let htmlProductOrderAll = "";
    data.orderDetails.forEach(e => {
        htmlProductOrderAll += 
        `
                        <div class="purchase__item">
                            <div class="purchase__body">
                                <div class="purchase__body-header-wait">
                                    <div class="purchase__body-header-btns">
                                        <div class="purchase__body-header-shop">${e.sStoreName}</div>
                                        <button class="purchase__body-header-btn"><i
                                                class="uil uil-chat"></i><span>Chat</span></button>
                                        <a class="purchase__body-header-btn-link"><i class="uil uil-shop"></i><span>Xem
                                                Shop</span></a>
                                    </div>
                                    <div class="purchase__body-title">
                                        <div class="purchase__body-header-subwait">Chờ thanh toán</div>
                                    </div>
                                </div>
                                <div class="purchase__body-container">
                                    <ul class="purchase__body-list">
                                        <li class="purchase__body-item">
                                            <a class="purchase__body-item-link">
                                                <div class="purchase__body-item-img">
                                                    <img src="/img/${e.sImageUrl}" alt="">
                                                </div>
                                                <div class="purchase__body-item-info">
                                                    <div class="purchase__body-item-info-left">
                                                        <div class="purchase__body-item-title">
                                                            ${e.sProductName}
                                                        </div>
                                                        <div class="purchase__body-item-sub">
                                                            <div class="purchase__body-item-desc">Phân loại hàng: Bạc
                                                            </div>
                                                            <span class="purchase__body-item-qnt">x ${e.iQuantity}</span> <br>
                                                            <span class="purchase__body-item-return">Trả hàng miễn phí
                                                                15 ngày</span>
                                                        </div>
                                                    </div>`;
                                                    if (e.dPerDiscount != 1) {
                                        htmlProductOrderAll += 
                                                    `<div class="purchase__body-item-info-right">
                                                        <div class="purchase__body-item-old-price">${e.dUnitPrice} đ</div>
                                                        <div class="purchase__body-item-price">${money(e.dUnitPrice * (1 - e.dPerDiscount))} đ</div>
                                                    </div>`;
                                                    } else {
                                        htmlProductOrderAll += 
                                                    `<div class="purchase__body-item-info-right">
                                                        <div class="purchase__body-item-price">${money(e.dUnitPrice)} đ</div>
                                                    </div>`;
                                                    }
                                        htmlProductOrderAll +=
                                                `</div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="purchase__prevent">
                                <div class="purchase__prevent-box purchase__prevent-box-left"></div>
                                <div class="purchase__prevent-box purchase__prevent-box-right"></div>
                            </div>
                            <div class="purchase__bottom">
                                <div class="purchase__bottom-head">
                                    <div class="purchase__bottom-head-sub-price">
                                        <i class="uil uil-shield-check"></i>
                                        <span>Thành tiền:</span>
                                    </div>
                                    <div class="purchase__bottom-head-price">${money(e.dUnitPrice * e.iQuantity)} đ</div>
                                </div>
                                <div class="purchase__bottom-btns">
                                    <a href="#"
                                        class="btn purchase__bottom-link purchase__bottom-link-wait hide-on-mobile">Chờ</a>
                                    <a href="" class="btn purchase__bottom-link hide-on-mobile">Liên hệ người bán</a>
                                    <a href="" class="btn purchase__bottom-link hide-on-mobile">Huỷ đơn hàng</a>
                                    <a href="#" class="btn btn--primary hide-on-destop">Liên hệ Shop</a>
                                </div>
                            </div>
                        </div>
        `;
    });
    document.querySelector(".purchase__all-list").innerHTML = htmlProductOrderAll;
}

function getProductsOrderWaitSettlement(data) {
    document.querySelector(".purchase__header-item-wait-settlement-count").innerText = `(${data.ordersWaitSettlement.length})`;
    let htmlProductOrderWaitSettlement = "";
    data.orderDetailsWaitSettlement.forEach(e => {
        htmlProductOrderWaitSettlement += 
        `
                        <div class="purchase__item">
                            <div class="purchase__body">
                                <div class="purchase__body-header-wait">
                                    <div class="purchase__body-header-btns">
                                        <div class="purchase__body-header-shop">${e.sStoreName}</div>
                                        <button class="purchase__body-header-btn"><i
                                                class="uil uil-chat"></i><span>Chat</span></button>
                                        <a class="purchase__body-header-btn-link"><i class="uil uil-shop"></i><span>Xem
                                                Shop</span></a>
                                    </div>
                                    <div class="purchase__body-title">
                                        <div class="purchase__body-header-subwait">Chờ thanh toán</div>
                                    </div>
                                </div>
                                <div class="purchase__body-container">
                                    <ul class="purchase__body-list">
                                        <li class="purchase__body-item">
                                            <a class="purchase__body-item-link">
                                                <div class="purchase__body-item-img">
                                                    <img src="/img/${e.sImageUrl}" alt="">
                                                </div>
                                                <div class="purchase__body-item-info">
                                                    <div class="purchase__body-item-info-left">
                                                        <div class="purchase__body-item-title">
                                                            ${e.sProductName}
                                                        </div>
                                                        <div class="purchase__body-item-sub">
                                                            <div class="purchase__body-item-desc">Phân loại hàng: Bạc
                                                            </div>
                                                            <span class="purchase__body-item-qnt">x ${e.iQuantity}</span> <br>
                                                            <span class="purchase__body-item-return">Trả hàng miễn phí
                                                                15 ngày</span>
                                                        </div>
                                                    </div>`;
                                                    if (e.dPerDiscount != 1) {
                                                        htmlProductOrderWaitSettlement += 
                                                    `<div class="purchase__body-item-info-right">
                                                        <div class="purchase__body-item-old-price">${e.dUnitPrice} đ</div>
                                                        <div class="purchase__body-item-price">${money(e.dUnitPrice * (1 - e.dPerDiscount))} đ</div>
                                                    </div>`;
                                                    } else {
                                                        htmlProductOrderWaitSettlement += 
                                                    `<div class="purchase__body-item-info-right">
                                                        <div class="purchase__body-item-price">${money(e.dUnitPrice)} đ</div>
                                                    </div>`;
                                                    }
                                                    htmlProductOrderWaitSettlement +=
                                                `</div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="purchase__prevent">
                                <div class="purchase__prevent-box purchase__prevent-box-left"></div>
                                <div class="purchase__prevent-box purchase__prevent-box-right"></div>
                            </div>
                            <div class="purchase__bottom">
                                <div class="purchase__bottom-head">
                                    <div class="purchase__bottom-head-sub-price">
                                        <i class="uil uil-shield-check"></i>
                                        <span>Thành tiền:</span>
                                    </div>
                                    <div class="purchase__bottom-head-price">${money(e.dUnitPrice * e.iQuantity)} đ</div>
                                </div>
                                <div class="purchase__bottom-btns">
                                    <a href="#"
                                        class="btn purchase__bottom-link purchase__bottom-link-wait hide-on-mobile">Chờ</a>
                                    <a href="" class="btn purchase__bottom-link hide-on-mobile">Liên hệ người bán</a>
                                    <a href="" class="btn purchase__bottom-link hide-on-mobile">Huỷ đơn hàng</a>
                                    <a href="#" class="btn btn--primary hide-on-destop">Liên hệ Shop</a>
                                </div>
                            </div>
                        </div>
        `;
    });
    if (data.orderDetailsWaitSettlement.length == 0) {
        document.querySelector(".purchase__wait").innerHTML = 
        `
                        <div class="purchase__wait-settlement">
                            <div class="purchase__wait-settlement-no-orders">
                                <i class="uil uil-clipboard-notes purchase__wait-settlement-no-orders-icon"></i>
                                <div class="purchase__wait-settlement-no-orders-sub">Chưa có đơn hàng</div>
                            </div>
                        </div>
        `;
    } else {
        document.querySelector(".purchase__wait").innerHTML = htmlProductOrderWaitSettlement;
    }
}