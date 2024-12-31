function getAPIPerchase() {
    let userID = getCookies("userID");
    if (userID == undefined) {
        userID = 0;
    }
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/user/purchase-data?userID=' + userID + '', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);

            setAll(data);
            
            setProductsOrderAll(data);

            setProductsOrderWaitSettlement(data);

            setProductsOrderTransiting(data);

            setProductsOrderWaitDelivery(data);

            setProductsOrderDelivered(data);

            setProductsOrderDestroy(data);

        }
    };
    xhr.send(null);
}
getAPIPerchase();

function setAll(data) {
    const headerItem = document.querySelectorAll(".purchase__header-item");
    for (let i = 0; i < headerItem.length; i++) {
        headerItem[i].addEventListener('click', () => {
            if (i == 0) {
                // Tất cả
                showOrderAllTab(i, data);
            } else if (i == 1) {
                // Chờ thanh toán
                showOrderWaitPaymentTab(i, data);
            } else if (i == 2) {
                // Vận chuyển
                showOrderTransportTab(i, data);
            } else if (i == 3) {
                // Chờ giao hàng
                showOrderWaitDeliveryTab(i, data);
            } else if (i == 4) {
                // Đã giao hàng
                showOrderDeliveredTab(i, data);
            } else if (i == 5) {
                // Đơn huỷ
                showOrderDestroy(i, data);
            }
        });
    }
}

function showOrderAllTab(i, data) {
    const headerItem = document.querySelectorAll(".purchase__header-item");
    headerItem[i].classList.add("active");
    headerItem[2].classList.remove("active");
    headerItem[1].classList.remove("active");
    headerItem[3].classList.remove("active");
    headerItem[4].classList.remove("active");
    headerItem[5].classList.remove("active");

    document.querySelector(".purchase__all").classList.remove("hide-on-destop");
    document.querySelector(".purchase__wait").classList.add("hide-on-destop");
    document.querySelector(".purchase__transport").classList.add("hide-on-destop");
    document.querySelector(".purchase__wait-delivery").classList.add("hide-on-destop");
    document.querySelector(".purchase__wait-delivered").classList.add("hide-on-destop");

    // Show/Hide in Mobile
    document.querySelector(".purchase__all").classList.remove("hide-on-mobile");
    document.querySelector(".purchase__wait").classList.add("hide-on-mobile");
    document.querySelector(".purchase__transport").classList.add("hide-on-mobile");
}

function showOrderWaitPaymentTab(i, data) {
    const headerItem = document.querySelectorAll(".purchase__header-item");
    headerItem[i].classList.add("active");
    headerItem[0].classList.remove("active");
    headerItem[2].classList.remove("active");
    headerItem[3].classList.remove("active");
    headerItem[4].classList.remove("active");
    headerItem[5].classList.remove("active");

    document.querySelector(".purchase__all").classList.add("hide-on-destop");
    document.querySelector(".purchase__wait").classList.remove("hide-on-destop");
    document.querySelector(".purchase__transport").classList.add("hide-on-destop");
    document.querySelector(".purchase__wait-delivery").classList.add("hide-on-destop");
    document.querySelector(".purchase__wait-delivered").classList.add("hide-on-destop");

    // Show/Hide on Mobile
    document.querySelector(".purchase__all").classList.add("hide-on-mobile");
    document.querySelector(".purchase__wait").classList.remove("hide-on-mobile");
    document.querySelector(".purchase__transport").classList.add("hide-on-mobile");
}

function showOrderTransportTab(i, data) {
    const headerItem = document.querySelectorAll(".purchase__header-item");
    headerItem[i].classList.add("active");
    headerItem[0].classList.remove("active");
    headerItem[1].classList.remove("active");
    headerItem[3].classList.remove("active");
    headerItem[4].classList.remove("active");
    headerItem[5].classList.remove("active");

    document.querySelector(".purchase__all").classList.add("hide-on-destop");
    document.querySelector(".purchase__wait").classList.add("hide-on-destop");
    document.querySelector(".purchase__transport").classList.remove("hide-on-destop");
    document.querySelector(".purchase__wait-delivery").classList.add("hide-on-destop");
    document.querySelector(".purchase__wait-delivered").classList.add("hide-on-destop");

    // Show/Hide in Mobile
    document.querySelector(".purchase__all").classList.add("hide-on-mobile");
    document.querySelector(".purchase__wait").classList.add("hide-on-mobile");
    document.querySelector(".purchase__transport").classList.remove("hide-on-mobile");
}

function showOrderWaitDeliveryTab(i, data) {
    const headerItem = document.querySelectorAll(".purchase__header-item");
    headerItem[i].classList.add("active");
    headerItem[0].classList.remove("active");
    headerItem[1].classList.remove("active");
    headerItem[2].classList.remove("active");
    headerItem[4].classList.remove("active");
    headerItem[5].classList.remove("active");

    document.querySelector(".purchase__all").classList.add("hide-on-destop");
    document.querySelector(".purchase__wait").classList.add("hide-on-destop");
    document.querySelector(".purchase__transport").classList.add("hide-on-destop");
    document.querySelector(".purchase__wait-delivery").classList.remove("hide-on-destop");
    document.querySelector(".purchase__wait-delivered").classList.add("hide-on-destop");

    // Show/Hide in Mobile
    document.querySelector(".purchase__all").classList.add("hide-on-mobile");
    document.querySelector(".purchase__wait").classList.add("hide-on-mobile");
    document.querySelector(".purchase__transport").classList.add("hide-on-mobile");
    document.querySelector(".purchase__wait-delivery").classList.remove("hide-on-mobile");
}

function showOrderDeliveredTab(i, data) {
    const headerItem = document.querySelectorAll(".purchase__header-item");
    headerItem[i].classList.add("active");
    headerItem[0].classList.remove("active");
    headerItem[1].classList.remove("active");
    headerItem[2].classList.remove("active");
    headerItem[3].classList.remove("active");
    headerItem[5].classList.remove("active");

    document.querySelector(".purchase__all").classList.add("hide-on-destop");
    document.querySelector(".purchase__wait").classList.add("hide-on-destop");
    document.querySelector(".purchase__transport").classList.add("hide-on-destop");
    document.querySelector(".purchase__wait-delivery").classList.add("hide-on-destop");
    document.querySelector(".purchase__wait-delivered").classList.remove("hide-on-destop");

    // Show/Hide in Mobile
    document.querySelector(".purchase__all").classList.add("hide-on-mobile");
    document.querySelector(".purchase__wait").classList.add("hide-on-mobile");
    document.querySelector(".purchase__transport").classList.add("hide-on-mobile");
    document.querySelector(".purchase__wait-delivery").classList.remove("hide-on-mobile");
    document.querySelector(".purchase__wait-delivered").classList.remove("hide-on-mobile");

    // set data
    setProductsOrderDelivered(data);
}

function showOrderDestroy(i, data) {
    const headerItem = document.querySelectorAll(".purchase__header-item");
    headerItem[i].classList.add("active");
    headerItem[0].classList.remove("active");
    headerItem[1].classList.remove("active");
    headerItem[2].classList.remove("active");
    headerItem[3].classList.remove("active");
    headerItem[4].classList.remove("active");

    document.querySelector(".purchase__all").classList.add("hide-on-destop");
    document.querySelector(".purchase__wait").classList.add("hide-on-destop");
    document.querySelector(".purchase__transport").classList.add("hide-on-destop");
    document.querySelector(".purchase__wait-delivery").classList.add("hide-on-destop");
    document.querySelector(".purchase__wait-delivered").classList.add("hide-on-destop");
    document.querySelector(".purchase__destroy").classList.remove("hide-on-destop");

    // set data
    setProductsOrderDestroy(data);
}

function setProductsOrderAll(data) {
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
                                        <a href="/user/purchase/order?orderID=${e.pK_iOrderID}" class="purchase__body-header-subwait">${e.sOrderStatusName}</a>
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
                                                        <div class="purchase__body-item-old-price">${money_2(e.dUnitPrice)}</div>
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
                                    </div>`;
                                    if (e.dPerDiscount != 1) {
                                        htmlProductOrderAll += 
                                    `<div class="purchase__bottom-head-price">${money(e.dUnitPrice * (1 - e.dPerDiscount) * e.iQuantity)} đ</div>`;
                                    } else {
                                        htmlProductOrderAll += 
                                    `<div class="purchase__bottom-head-price">${money(e.dUnitPrice * e.iQuantity)} đ</div>`;
                                    }
                                    htmlProductOrderAll += `
                                </div>
                                <div class="purchase__bottom-btns">`;
                                if (e.iOrderStatusCode == 14) {
                                    htmlProductOrderAll += 
                                    `
                                    <a href="/product/detail?id=${e.pK_iProductID}" class="btn btn--primary purchase__bottom-btn hide-on-mobile">Mua lại</a>
                                    <a href="#" class="btn purchase__bottom-link hide-on-mobile">Liên hệ người bán</a>
                                    `;
                                } else if (e.iOrderStatusCode == 4 || e.iOrderStatusCode == 0) {
                                    htmlProductOrderAll += `
                                    <a href="#"class="btn purchase__bottom-link purchase__bottom-link-wait hide-on-mobile">Chờ</a>
                                    <a href="" class="btn purchase__bottom-link hide-on-mobile">Liên hệ người bán</a>
                                    <a href="javascript:openDestroyOrder(${e.pK_iOrderID})" class="btn purchase__bottom-link hide-on-mobile">Huỷ đơn hàng</a>
                                    <a href="#" class="btn btn--primary hide-on-destop">Liên hệ Shop</a>`;
                                } else if (e.iOrderStatusCode == -1) {
                                    htmlProductOrderAll += 
                                    `
                                    <a href="/product/detail?id=${e.pK_iProductID}" class="btn btn--primary purchase__bottom-btn hide-on-mobile">Mua lại</a>
                                    <a href="#" class="btn purchase__bottom-link hide-on-mobile">Đã huỷ</a>
                                    `;
                                } else {
                                    htmlProductOrderAll += 
                                    `
                                    <a href="javascript:openCofirmModal(${e.pK_iOrderID}, ${e.pK_iProductID})" class="btn btn--primary purchase__bottom-btn hide-on-mobile">Đã nhận hàng</a>
                                    <a href="" class="btn purchase__bottom-link hide-on-mobile">Trả hàng/hoàn tiền</a>
                                    `;
                                }               
                                htmlProductOrderAll += `     
                                </div>
                            </div>
                        </div>
        `;
    });
    document.querySelector(".purchase__all-list").innerHTML = htmlProductOrderAll;

    let htmlPagination = "";
    if (data.currentPage > 1) {
        htmlPagination += `
                    <li class="pagination-item">
                        <a href="javascript:pageNumber(${data.currentPage - 1})" class="pagination-item__link">
                            <i class="pagination-item__icon fas fa-angle-left"></i>
                        </a>
                    </li>
                `;
    }
    for (let i = 1; i <= data.totalPage; i++) {
        if (i == data.currentPage) {
            htmlPagination += `
                        <li class="pagination-item pagination-item--active">
                            <a href="javascript:pageNumber(${i})" class="pagination-item__link">${i}</a>
                        </li>
                    `;
        } else {
            htmlPagination += `
                        <li class="pagination-item">
                            <a href="javascript:pageNumber(${i})" class="pagination-item__link">${i}</a>
                        </li>
                    `;
        }
    }
    if (data.currentPage < data.totalPage) {
        htmlPagination += `
                    <li class="pagination-item">
                        <a href="javascript:pageNumber(${data.currentPage + 1})" class="pagination-item__link">
                            <i class="pagination-item__icon fas fa-angle-right"></i>
                        </a>
                    </li>
                `;
    }
    document.querySelector(".pagination").innerHTML = htmlPagination;
}

function pageNumber(currentPage) {
    var xhr = new XMLHttpRequest();
    var formData = new FormData();
    formData.append("currentPage", currentPage);
    xhr.open('post', '/user/purchase', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);

            setProductsOrderAll(data);
        }
    };
    xhr.send(formData);
}


function openDestroyOrder(orderID) {
    openModal();
    let htmlDestroyOrder = "";
    htmlDestroyOrder += 
            `<div class="reviewer-form">
                <div class="reviewer-form__header">
                    <div class="reviewer-form__header-title">Chọn lý do huỷ</div>
                </div>
                <div class="reviewer-form__body">
                    <div class="address-form__new-please">
                        <i class="uil uil-exclamation-octagon address-form__new-please-icon"></i>
                        <div class="address-form__new-please-desc">
                            <div class="destroy-form__new-please-desc-title">Vui lòng chọn lý do huỷ đơn hàng. Lưu ý: thao tác huỷ bỏ, huỷ tất cả các sản phẩm có trong đơn hàng và không thể hoàn tác</div>
                        </div>
                    </div>
                    <li class="destroy-form__item">
                        <div class="destroy-form__item-box">
                            <input type="radio" name="destroy-order" class="destroy-form__item-input">
                        </div>
                        <div class="destroy-form__item-content">
                            Muốn thay đổi địa chỉ giao hàng
                        </div>
                    </li>
                    <li class="destroy-form__item">
                        <div class="destroy-form__item-box">
                            <input type="radio" name="destroy-order" class="destroy-form__item-input">
                        </div>
                        <div class="destroy-form__item-content">
                            Muốn nhập/thay đổi mã Voucher
                        </div>
                    </li>
                    <li class="destroy-form__item">
                        <div class="destroy-form__item-box">
                            <input type="radio" name="destroy-order" class="destroy-form__item-input">
                        </div>
                        <div class="destroy-form__item-content">
                            Muốn thay đổi sản phẩm trong đơn hàng (size, màu sắc, số lượng ...)
                        </div>
                    </li>
                    <li class="destroy-form__item">
                        <div class="destroy-form__item-box">
                            <input type="radio" value="1" name="destroy-order" class="destroy-form__item-input">
                        </div>
                        <div class="destroy-form__item-content">
                            Thủ tục thanh toán rắc rối 
                        </div>
                    </li>
                    <li class="destroy-form__item">
                        <div class="destroy-form__item-box">
                            <input type="radio" value="1" name="destroy-order" class="destroy-form__item-input">
                        </div>
                        <div class="destroy-form__item-content">
                            Tìm thấy giá rẻ hơn ở chỗ khác 
                        </div>
                    </li>
                    <li class="destroy-form__item">
                        <div class="destroy-form__item-box">
                            <input type="radio" value="1" name="destroy-order" class="destroy-form__item-input">
                        </div>
                        <div class="destroy-form__item-content">
                            Đổi ý, không muốn mua nữa
                        </div>
                    </li>
                    <div class="reviewer-form__msg-err destroy-form__msg-err hide-on-destop">Bạn chưa chọn lý do huỷ!</div>
                </div>
                <div class="reviewer-form__footer">
                    <div class="reviewer-form__btn btn" onclick="closeModal()">HUỶ</div>
                    <div class="reviewer-form__btn destroy-form__btn-agree btn btn--primary">ĐỒNG Ý</div>
                </div>
            </div>`;
    document.querySelector(".modal__body").innerHTML = htmlDestroyOrder; 

    const destroyChoose = document.getElementsByName("destroy-order");
    let destroyCheck = "";
    for (let i = 0; i < destroyChoose.length; i++) {
        destroyChoose.item(i).onchange = () => {
            destroyCheck = destroyChoose.item(i).value;
        }
    }

    document.querySelector(".destroy-form__btn-agree").addEventListener('click', () => {
        destroyChooseValidate(destroyCheck);
        if (destroyChooseValidate(destroyCheck)) {
            destroyOrder(orderID);
        }
    });
}

function destroyChooseValidate(destroyCheck) {
    const destroyMsg = document.querySelector(".destroy-form__msg-err");

    if (destroyCheck === "") {
        destroyMsg.classList.remove("hide-on-destop");
        destroyMsg.innerHTML = "Bạn chưa chọn lý do huỷ!";
        isValidate = false;
    } else {
        destroyMsg.classList.add("hide-on-destop");
        destroyMsg.innerHTML = "";
        isValidate = true;
    }
    return isValidate;
}

function destroyOrder(orderID) {
    document.querySelector(".modal__body").innerHTML = `<div class="spinner"></div>`;
    var formData = new FormData();
    formData.append("orderID", orderID);

    var xhr = new XMLHttpRequest();
    xhr.open('put', '/order/confirm-destroy', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);

            if (data.status.statusCode == 1) {
                setTimeout(() => {
                    closeModal();
                    toast({ title: "Thông báo", msg: `${data.status.message}`, type: "success", duration: 5000 });
                    document.querySelector(".modal__body").innerHTML = "";
                    setTimeout(() => {
                        getAPIPerchase();
                    }, 1000)
                }, 2000);
            }
            
        }
    };
    xhr.send(formData);
}
// -----------------------------------------------
function setProductsOrderWaitSettlement(data) {
    if (data.ordersWaitSettlement.length != 0) {
        document.querySelector(".purchase__header-item-wait-settlement-count").innerText = `(${data.ordersWaitSettlement.length})`;
    } else {
        document.querySelector(".purchase__header-item-wait-settlement-count").innerText = ``;
    }
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
                                                        <div class="purchase__body-item-old-price">${money_2(e.dUnitPrice)}</div>
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
                                    </div>`;
                                    if (e.dPerDiscount != 1) {
                                        htmlProductOrderWaitSettlement += 
                                    `<div class="purchase__bottom-head-price">${money(e.dUnitPrice * (1 - e.dPerDiscount) * e.iQuantity)} đ</div>`;
                                    } else {
                                        htmlProductOrderWaitSettlement += 
                                    `<div class="purchase__bottom-head-price">${money(e.dUnitPrice * e.iQuantity)} đ</div>`;
                                    }
                                    htmlProductOrderWaitSettlement += `
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

// Transiting
function setProductsOrderTransiting(data) {
    if (data.ordersTransiting.length != 0) {
        document.querySelector(".purchase__header-item-transiting-count").innerText = `(${data.ordersTransiting.length})`;
    } else {
        document.querySelector(".purchase__header-item-transiting-count").innerText = "";
    }
    let htmlProductOrder = "";
    data.orderDetailsTransiting.forEach(e => {
        htmlProductOrder += 
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
                                                        htmlProductOrder += 
                                                    `<div class="purchase__body-item-info-right">
                                                        <div class="purchase__body-item-old-price">${money_2(e.dUnitPrice)}</div>
                                                        <div class="purchase__body-item-price">${money(e.dUnitPrice * (1 - e.dPerDiscount))} đ</div>
                                                    </div>`;
                                                    } else {
                                                        htmlProductOrder += 
                                                    `<div class="purchase__body-item-info-right">
                                                        <div class="purchase__body-item-price">${money(e.dUnitPrice)} đ</div>
                                                    </div>`;
                                                    }
                                                    htmlProductOrder +=
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
                                    </div>`;
                                    if (e.dPerDiscount != 1) {
                                        htmlProductOrder += 
                                    `<div class="purchase__bottom-head-price">${money(e.dUnitPrice * (1 - e.dPerDiscount) * e.iQuantity)} đ</div>`;
                                    } else {
                                        htmlProductOrder += 
                                    `<div class="purchase__bottom-head-price">${money(e.dUnitPrice * e.iQuantity)} đ</div>`;
                                    }
                                    htmlProductOrder += `
                                </div>
                                <div class="purchase__bottom-btns">
                                    <a href="#" class="btn btn--primary purchase__bottom-btn hide-on-mobile">Liên hệ người bán</a>
                                    <a href="" class="btn purchase__bottom-link hide-on-mobile">Huỷ đơn hàng</a>
                                </div>
                            </div>
                        </div>
        `;
    });
    if (data.ordersTransiting.length == 0 && data.orderDetailsTransiting.length == 0) {
        document.querySelector(".purchase__transport").innerHTML = 
        `
                        <div class="purchase__wait-settlement">
                            <div class="purchase__wait-settlement-no-orders">
                                <i class="uil uil-clipboard-notes purchase__wait-settlement-no-orders-icon"></i>
                                <div class="purchase__wait-settlement-no-orders-sub">Chưa có đơn hàng</div>
                            </div>
                        </div>
        `;
    } else {
        document.querySelector(".purchase__transport").innerHTML = htmlProductOrder;
    }
}

// Wait Delivery
function setProductsOrderWaitDelivery(data) {
    if (data.ordersDelivering.length != 0) {
        document.querySelector(".purchase__header-item-delivering-count").innerText = `(${data.ordersDelivering.length})`;
    } else {
        document.querySelector(".purchase__header-item-delivering-count").innerHTML = "";
    }
    let htmlProductOrder = "";
    data.orderDetailsDelivering.forEach(e => {
        htmlProductOrder += 
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
                                                        htmlProductOrder += 
                                                    `<div class="purchase__body-item-info-right">
                                                        <div class="purchase__body-item-old-price">${money_2(e.dUnitPrice)}</div>
                                                        <div class="purchase__body-item-price">${money(e.dUnitPrice * (1 - e.dPerDiscount))} đ</div>
                                                    </div>`;
                                                    } else {
                                                        htmlProductOrder += 
                                                    `<div class="purchase__body-item-info-right">
                                                        <div class="purchase__body-item-price">${money(e.dUnitPrice)} đ</div>
                                                    </div>`;
                                                    }
                                                    htmlProductOrder +=
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
                                    </div>`;
                                    if (e.dPerDiscount != 1) {
                                        htmlProductOrder += 
                                    `<div class="purchase__bottom-head-price">${money(e.dUnitPrice * (1 - e.dPerDiscount) * e.iQuantity)} đ</div>`;
                                    } else {
                                        htmlProductOrder += 
                                    `<div class="purchase__bottom-head-price">${money(e.dUnitPrice * e.iQuantity)} đ</div>`;
                                    }
                                    htmlProductOrder += `
                                </div>
                                <div class="purchase__bottom-btns">
                                    <a href="#" class="btn btn--primary purchase__bottom-btn hide-on-mobile">Liên hệ người bán</a>
                                    <a href="" class="btn purchase__bottom-link hide-on-mobile">Huỷ đơn hàng</a>
                                </div>
                            </div>
                        </div>
        `;
    });
    if (data.ordersDelivering.length == 0 && data.orderDetailsDelivering.length == 0) {
        document.querySelector(".purchase__wait-delivery").innerHTML = 
        `
                        <div class="purchase__wait-settlement">
                            <div class="purchase__wait-settlement-no-orders">
                                <i class="uil uil-clipboard-notes purchase__wait-settlement-no-orders-icon"></i>
                                <div class="purchase__wait-settlement-no-orders-sub">Chưa có đơn hàng</div>
                            </div>
                        </div>
        `;
    } else {
        document.querySelector(".purchase__wait-delivery").innerHTML = htmlProductOrder;
    }
}

// Deivered
function setProductsOrderDelivered(data) {
    if (data.ordersDelivered.length != 0) {
        document.querySelector(".purchase__header-item-delivered-count").innerText = `(${data.ordersDelivered.length})`;
    } else {
        document.querySelector(".purchase__header-item-delivered-count").innerHTML = "";
    }
    let htmlProductOrder = "";
    data.orderDetailsDelivered.forEach(e => {
        htmlProductOrder += 
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
                                                        htmlProductOrder += 
                                                    `<div class="purchase__body-item-info-right">
                                                        <div class="purchase__body-item-old-price">${money_2(e.dUnitPrice)}</div>
                                                        <div class="purchase__body-item-price">${money(e.dUnitPrice * (1 - e.dPerDiscount))} đ</div>
                                                    </div>`;
                                                    } else {
                                                        htmlProductOrder += 
                                                    `<div class="purchase__body-item-info-right">
                                                        <div class="purchase__body-item-price">${money(e.dUnitPrice)} đ</div>
                                                    </div>`;
                                                    }
                                                    htmlProductOrder +=
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
                                    </div>`;
                                    if (e.dPerDiscount != 1) {
                                        htmlProductOrder += 
                                    `<div class="purchase__bottom-head-price">${money(e.dUnitPrice * (1 - e.dPerDiscount) * e.iQuantity)} đ</div>`;
                                    } else {
                                        htmlProductOrder += 
                                    `<div class="purchase__bottom-head-price">${money(e.dUnitPrice * e.iQuantity)} đ</div>`;
                                    }
                                    htmlProductOrder += `
                                </div>
                                <div class="purchase__bottom-btns">`;
                                if (e.iOrderStatusCode == 3) {
                                    htmlProductOrder +=
                                    `
                                    <a href="javascript:openCofirmModal(${e.pK_iOrderID}, ${e.pK_iProductID})" class="btn btn--primary purchase__bottom-btn hide-on-mobile">Đã nhận hàng</a>
                                    `;
                                }
                                htmlProductOrder += `
                                    <a href="" class="btn purchase__bottom-link hide-on-mobile">Trả hàng/hoàn tiền</a>
                                </div>
                            </div>
                        </div>
        `;
    });

    if (data.ordersDelivered.length == 0 && data.orderDetailsDelivered.length == 0) {
        document.querySelector(".purchase__wait-delivered").innerHTML = 
        `
                        <div class="purchase__wait-settlement">
                            <div class="purchase__wait-settlement-no-orders">
                                <i class="uil uil-clipboard-notes purchase__wait-settlement-no-orders-icon"></i>
                                <div class="purchase__wait-settlement-no-orders-sub">Chưa có đơn hàng</div>
                            </div>
                        </div>
        `;
    } else {
        document.querySelector(".purchase__wait-delivered").innerHTML = htmlProductOrder;
    }
}

function setProductsOrderDestroy(data) {
    if (data.ordersDestroy.length != 0) {
        document.querySelector(".purchase__header-item-destroy-count").innerText = `(${data.ordersDestroy.length})`;
    } else {
        document.querySelector(".purchase__header-item-destroy-count").innerHTML = "";
    }
    let htmlProductOrder = "";
    data.orderDetailsDestroy.forEach(e => {
    htmlProductOrder += 
                        `<div class="purchase__item">
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
                                                        htmlProductOrder += 
                                                    `<div class="purchase__body-item-info-right">
                                                        <div class="purchase__body-item-old-price">${money_2(e.dUnitPrice)}</div>
                                                        <div class="purchase__body-item-price">${money(e.dUnitPrice * (1 - e.dPerDiscount))} đ</div>
                                                    </div>`;
                                                    } else {
                                                        htmlProductOrder += 
                                                    `<div class="purchase__body-item-info-right">
                                                        <div class="purchase__body-item-price">${money(e.dUnitPrice)} đ</div>
                                                    </div>`;
                                                    }
                                                    htmlProductOrder +=
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
                                    </div>`;
                                    if (e.dPerDiscount != 1) {
                                        htmlProductOrder += 
                                    `<div class="purchase__bottom-head-price">${money(e.dUnitPrice * (1 - e.dPerDiscount) * e.iQuantity)} đ</div>`;
                                    } else {
                                        htmlProductOrder += 
                                    `<div class="purchase__bottom-head-price">${money(e.dUnitPrice * e.iQuantity)} đ</div>`;
                                    }
                                    htmlProductOrder += `
                                </div>
                                <div class="purchase__bottom-btns">
                                    <a href="/product/detail?id=${e.pK_iProductID}" class="btn btn--primary purchase__bottom-btn hide-on-mobile">Mua lại</a>
                                    <a href="#" class="btn purchase__bottom-link hide-on-mobile">Đã huỷ</a>
                                </div>
                            </div>
                        </div>`;
    });

    if (data.ordersDestroy.length == 0 && data.orderDetailsDestroy.length == 0) {
        document.querySelector(".purchase__destroy").innerHTML = 
        `
                        <div class="purchase__wait-settlement">
                            <div class="purchase__wait-settlement-no-orders">
                                <i class="uil uil-clipboard-notes purchase__wait-settlement-no-orders-icon"></i>
                                <div class="purchase__wait-settlement-no-orders-sub">Chưa có đơn hàng</div>
                            </div>
                        </div>
        `;
    } else {
        document.querySelector(".purchase__destroy").innerHTML = htmlProductOrder;
    }
}

function openCofirmModal(orderID, productID) {
    openModal();
    document.querySelector(".modal__body").innerHTML = 
            `
                <div class="modal__confirm">
                    <div class="modal__confirm-header">
                        <div class="modal__confirm-title">Thông báo</div>
                    </div>
                    <div class="modal__confirm-desc">
                        Bạn đã nhận được hàng?
                    </div>
                    <div class="modal__confirm-btns">
                        <div class="modal__confirm-btn-destroy" onclick="closeModal()">Huỷ</div>
                        <div class="modal__confirm-btn-send"onclick="confirmDelivered(${orderID}, ${productID})">Xác nhận đã nhận hàng</div>
                    </div>
                </div>
            `;
}

function confirmDelivered(orderID, productID) {
    var formData = new FormData();
    formData.append("orderID", orderID);
    formData.append("productID", productID);

    var xhr = new XMLHttpRequest();
    xhr.open('post', '/order/confirm-deliverd', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);

            if (data.status.statusCode == 1) {
                toast({ title: "Thông báo", msg: `${data.status.message}`, type: "success", duration: 5000 });
                showOrderDeliveredTab(4, data);
                openReviewerModal(productID);
            }
            
        }
    };
    xhr.send(formData);
}

function openReviewerModal(productID, image) {
    openModal();
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/seller/product-detail/' + productID  +'', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);

            let htmlReviewerForm = "";
            htmlReviewerForm += 
            `
            <div class="reviewer-form">
                <div class="reviewer-form__header">
                    <div class="reviewer-form__header-title">Đánh giá sản phẩm</div>
                </div>
                <div class="reviewer-form__body">
                    <div class="reviewer-form__div">
                        <div class="reviewer-form__div-title">Sản phẩm</div>
                        <ul class="purchase__body-list">
                            <li class="purchase__body-item">
                                <a class="purchase__body-item-link">
                                    <div class="purchase__body-item-img">
                                        <img src="/img/${data.products[0].sImageUrl}" alt="">
                                    </div>
                                    <div class="purchase__body-item-info">
                                        <div class="purchase__body-item-info-left">
                                            <div class="purchase__body-item-title">
                                                ${data.products[0].sProductName}
                                            </div>
                                            <div class="purchase__body-item-sub">
                                                <div class="purchase__body-item-desc">Phân loại hàng: Bạc</div>
                                                <span class="purchase__body-item-qnt">x 3</span> <br>
                                                <span class="purchase__body-item-return">Trả hàng miễn phí 15 ngày</span>
                                            </div>
                                        </div>`;
                                        if (data.products[0].dPerDiscount != 1) {
                                            htmlReviewerForm += 
                                        `<div class="purchase__body-item-info-right">
                                            <div class="purchase__body-item-old-price">${data.products[0].dPrice} đ</div>
                                            <div class="purchase__body-item-price">${money(data.products[0].dPrice * (1 - data.products[0].dPerDiscount))} đ</div>
                                        </div>`;
                                        } else {
                                            htmlReviewerForm += 
                                        `<div class="purchase__body-item-info-right">
                                            <div class="purchase__body-item-price">${money(data.products[0].dPrice)} đ</div>
                                        </div>`;
                                        }
                                        htmlReviewerForm += `
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="reviewer-form__div">
                        <div class="reviewer-form__div-title">Chất lượng sản phẩm</div>
                        <div class="reviewer-form__quality">
                            <div class="reviewer-form__quality-stars">
                                <input type="radio" name="rate" value="5" id="rate-5">
                                <label for="rate-5" class="uis uis-star"></label>
                                <input type="radio" name="rate" value="4" id="rate-4">
                                <label for="rate-4" class="uis uis-star"></label>
                                <input type="radio" name="rate" value="3" id="rate-3">
                                <label for="rate-3" class="uis uis-star"></label>
                                <input type="radio" name="rate" value="2" id="rate-2">
                                <label for="rate-2" class="uis uis-star"></label>
                                <input type="radio" name="rate" value="1" id="rate-1">
                                <label for="rate-1" class="uis uis-star"></label>
                            </div>
                            <div class="reviewer-form__quality-text hide-on-destop">Tuyệt vời</div>
                        </div>
                        <div class="reviewer-form__msg-err reviewer-form__msg-err-rate hide-on-destop">Bạn chưa chọn đánh giá!</div>
                    </div>
                    <div class="reviewer-form__div">
                        <div class="reviewer-form__div-title">Mô tả sản phẩm</div>
                        <div class="reviewer-form__comment">
                            <textarea name="" id="" class="reviewer-form__textarea"></textarea>
                            <div class="reviewer-form__msg-err reviewer-form__msg-err-comment hide-on-destop">Bạn chưa nhập bình luận!</div>
                        </div>
                        <div class="reviewer-form__thumb">
                            <img src="/img/tai_nghe_5.jpg" class="reviewer-form__thumb-img-value" alt="">
                            <label for="input-file" class="reviewer-form__thumb-img reviewer-form__thumb-img-add">
                                <div class="reviewer-form__thumb-img-container">
                                    <i class="uil uil-image-plus reviewer-form__thumb-img-icon"></i>
                                    <div class="reviewer-form__thumb-img-sub">
                                        Thêm hình ảnh (Nếu có)
                                    </div>
                                </div>
                                <input type="file" accept="image/jpeg, image/png, image/jpg" class="reviewer-form__thumb-img-file" id="input-file">
                            </label>
                        </div>
                    </div>
                </div>
                <div class="reviewer-form__footer">
                    <div class="reviewer-form__btn btn" onclick="closeModal()">TRỞ LẠI</div>
                    <div class="reviewer-form__btn btn btn--primary reviewer-form__btn-add">HOÀN THÀNH</div>
                </div>
            </div>
            `;

            document.querySelector(".modal__body").innerHTML = htmlReviewerForm;
            // Upload Image
            let productImgAdd = document.querySelector(".reviewer-form__thumb-img-value");
            let inputImageAdd = document.getElementById("input-file");

            let imageUrl = "";
            inputImageAdd.onchange = () => {
                productImgAdd.src = URL.createObjectURL(inputImageAdd.files[0]);
                productImgAdd.classList.add("show");
                document.querySelector(".reviewer-form__thumb-img-add").classList.add("hide");
                imageUrl = inputImageAdd.files[0].name;
            };

            // rate
            const rate = document.getElementsByName("rate");
            
            let rateCheck = "";
            for (let i = 0; i < rate.length; i++) {
                if (rate.item(i).checked) {
                    rateCheck = rate.item(i).value;
                }
                rate.item(i).onchange = () => {
                    if (rate.item(i).value == 5) {
                        document.querySelector(".reviewer-form__quality-text").classList.remove("hide-on-destop");
                    } else {
                        document.querySelector(".reviewer-form__quality-text").classList.add("hide-on-destop");
                    }
                    rateCheck = rate.item(i).value;
                    rateValidate(rateCheck);
                }
            }

            document.querySelector(".reviewer-form__textarea").addEventListener('blur', () => {
                commentValidate();
            });
            
            document.querySelector(".reviewer-form__btn-add").addEventListener('click', () => {
                const comment = document.querySelector(".reviewer-form__textarea").value; // Nó nằm ngoài sự kiện diễn ra thì sẽ không lấy được giá trị
                if (imageUrl == "") {
                    imageUrl = "no_img.jpg";
                } else {
                    imageUrl = data.products[0].sImageUrl;
                }
                rateValidate(rateCheck);
                commentValidate();
                if (rateValidate(rateCheck) && commentValidate()) {
                    addReviewer(productID, rateCheck, comment, imageUrl);
                }
            });
            
        }
    };
    xhr.send(null);
}

function rateValidate(rate) {
    const rateMsg = document.querySelector(".reviewer-form__msg-err-rate");

    if (rate === "") {
        rateMsg.classList.remove("hide-on-destop");
        rateMsg.innerHTML = "Bạn chưa chọn đánh giá!";
        isValidate = false;
    } else {
        rateMsg.classList.add("hide-on-destop");
        rateMsg.innerHTML = "";
        isValidate = true;
    }
    return isValidate;
}

function commentValidate() {
    const commentInput = document.querySelector(".reviewer-form__textarea");
    const commentMsg = document.querySelector(".reviewer-form__msg-err-comment");
    const comment = commentInput.value;

    if (comment === "") {
        showErrStyles(commentInput, commentMsg);
        commentMsg.innerHTML = "Bạn chưa nhập bình luận!";
        isValidate = false;
    } else {
        removeErrStyles(commentInput, commentMsg);
        commentMsg.innerHTML = "";
        isValidate = true;
    }
    return isValidate;
}

function addReviewer(productID, rateCheck, comment, image) {
    let userID = getCookies("userID");
    if (userID == undefined) {
        userID = 0;
    }

    document.querySelector(".modal__body").innerHTML = `<div class="spinner"></div>`;
    var formData = new FormData();
    formData.append("userID", userID);
    formData.append("productID", productID);
    formData.append("star", rateCheck);
    formData.append("comment", comment);
    formData.append("image", image);

    var xhr = new XMLHttpRequest();
    xhr.open('post', '/product/reviewer', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const result = JSON.parse(xhr.responseText);

            console.log(result);

            if (result.status.statusCode == 1) {
                setTimeout(() => {
                    closeModal();
                    toast({ title: "Thông báo", msg: `${result.status.message}`, type: "success", duration: 5000 });
                    document.querySelector(".modal__body").innerHTML = "";
                    setTimeout(() => {
                        window.location.assign('/product/detail/' + productID + '');
                    }, 1000)
                }, 2000);
            }
            
        }
    };
    xhr.send(formData);
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