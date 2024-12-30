// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

function getDataSite() {
    let userID = getCookies("userID");
    if (userID == undefined) {
        userID = 0;
    }
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/home/get-data?userID=' + userID + '', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);

            setAccount(data);

            setAccountMobile(data);

            getCartsItem(data);

            getShopsItem(data);

            setChatBtn(data);

            setDataChat(data);
        }
    }
    xhr.send(null);
}
getDataSite();

function setAccount(data) {
    let htmlAccount = "";
    if (data.userID == 0) {
        htmlAccount +=
            `
                            <li class="header__navbar-item header__navbar-item--strong header__navbar-item--separate">
                                <a class="header__navbar-item-link" href="/user/register">Đăng ký</a>
                            </li>
                            <li class="header__navbar-item header__navbar-item-account header__navbar-item--strong">
                                <a class="header__navbar-item-link" href="/user/login">Đăng nhập</a>
                            </li>
            `;
    } else if (data.userID != 0 && data.userInfo.length == 0) {
        window.location.assign("/user/portal");
    } else {
        if (data.user[0].fK_iRoleID == 2) {
            htmlAccount +=
                `
                <div class="header__navbar-item">
                    <div class="header__navbar-user">
                        <img src="/img/${data.userInfo[0].sImageProfile}" alt="" class="header__navbar-user-img">
                        <span class="header__navbar-user-name">${data.user[0].sUserName}</span>
                        <div class="header__navbar-user-manager">
                            <ul class="header__navbar-user-menu">
                                <li class="header__navbar-user-item">
                                    <a href="/user/profile">Tài khoản của tôi</a>
                                </li>
                                <li class="header__navbar-user-item">
                                    <a href="#">Địa chỉ của tôi</a>
                                </li>
                                <li class="header__navbar-user-item">
                                    <a href="/user/purchase">Đơn mua</a>
                                </li>
                                <li class="header__navbar-user-item">
                                    <a href="/admin">Quản trị</a>
                                </li>
                                <li class="header__navbar-user-item">
                                    <a href="/user/change">Đổi mật khẩu</a>
                                </li>
                                <li class="header__navbar-user-item header__navbar-user-item--separate">
                                    <a href="javascript:logoutUserAccount()">Đăng xuất</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                `;
        } else if (data.user[0].fK_iRoleID == 3) {
            htmlAccount +=
                `
                <div class="header__navbar-item">
                    <div class="header__navbar-user">
                        <img src="/img/${data.userInfo[0].sImageProfile}" alt="" class="header__navbar-user-img">
                        <span class="header__navbar-user-name">${data.user[0].sUserName}</span>
                        <div class="header__navbar-user-manager">
                            <ul class="header__navbar-user-menu">
                                <li class="header__navbar-user-item">
                                    <a href="/user/profile">Tài khoản của tôi</a>
                                </li>
                                <li class="header__navbar-user-item">
                                    <a href="/user/profile">Địa chỉ của tôi</a>
                                </li>
                                <li class="header__navbar-user-item">
                                    <a href="/user/purchase">Đơn mua</a>
                                </li>
                                <li class="header__navbar-user-item">
                                    <a href="/picker">Kênh lấy hàng</a>
                                </li>
                                <li class="header__navbar-user-item header__navbar-user-item--separate">
                                    <a href="javascript:logoutUserAccount()">Đăng xuất</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                `;
        } else if (data.user[0].fK_iRoleID == 4) {
            htmlAccount +=
                `
                                <div class="header__navbar-item">
                                    <div class="header__navbar-user">
                                        <img src="/img/${data.userInfo[0].sImageProfile}" alt="" class="header__navbar-user-img">
                                        <span class="header__navbar-user-name">${data.user[0].sUserName}</span>
                                        <div class="header__navbar-user-manager">
                                            <ul class="header__navbar-user-menu">
                                                <li class="header__navbar-user-item">
                                                    <a href="/user/profile">Tài khoản của tôi</a>
                                                </li>
                                                <li class="header__navbar-user-item">
                                                    <a href="/user/profile">Địa chỉ của tôi</a>
                                                </li>
                                                <li class="header__navbar-user-item">
                                                    <a href="/user/purchase">Đơn mua</a>
                                                </li>
                                                <li class="header__navbar-user-item">
                                                    <a href="/delivery">Kênh giao hàng</a>
                                                </li>
                                                <li class="header__navbar-user-item header__navbar-user-item--separate">
                                                    <a href="javascript:logoutUserAccount()">Đăng xuất</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                `;
        } else {
            htmlAccount +=
                `
                                <div class="header__navbar-item">
                                    <div class="header__navbar-user">
                                        <img src="/img/${data.userInfo[0].sImageProfile}" alt="" class="header__navbar-user-img">
                                        <span class="header__navbar-user-name">${data.user[0].sUserName}</span>
                                        <div class="header__navbar-user-manager">
                                            <ul class="header__navbar-user-menu">
                                                <li class="header__navbar-user-item">
                                                    <a href="/user/profile">Tài khoản của tôi</a>
                                                </li>
                                                <li class="header__navbar-user-item">
                                                    <a href="/user/profile">Địa chỉ của tôi</a>
                                                </li>
                                                <li class="header__navbar-user-item">
                                                    <a href="/user/purchase">Đơn mua</a>
                                                </li>
                                                <li class="header__navbar-user-item">
                                                    <a href="/user/change">Đổi mật khẩu</a>
                                                </li>
                                                <li class="header__navbar-user-item header__navbar-user-item--separate">
                                                    <a href="javascript:logoutUserAccount()">Đăng xuất</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>              
                `;
        }
    }
    document.querySelector(".header__navbar-auth").innerHTML = htmlAccount;
}

function setAccountMobile(data) {
    let htmlAccountMobile = "";
    if (data.userID == 0) {
        htmlAccountMobile +=
            `
                                <div class="header__mobile-user-symbol">
                                    <a href="/user/login" class="header__mobile-user-link">
                                        <i class="uil uil-user header__mobile-user-icon"></i>
                                    </a>
                                </div>
            `;
    } else {
        if (data.roleID == 2) {
            htmlAccountMobile +=
                `
                                    <div class="header__mobile-user-avatar">
                                        <div class="header__mobile-user-avatar-img"
                                            style="background-image: url(/img/profile_avatar.jpg);"></div>
                                        <div class="header__mobile-user-avatar-menu">
                                            <ul class="header__navbar-user-menu">
                                                <li class="header__navbar-user-item">
                                                    <a href="#">Tài khoản của tôi</a>
                                                </li>
                                                <li class="header__navbar-user-item">
                                                    <a href="#">Địa chỉ của tôi</a>
                                                </li>
                                                <li class="header__navbar-user-item">
                                                    <a href="#">Đơn mua</a>
                                                </li>
                                                <li class="header__navbar-user-item">
                                                    <a href="#">Quản trị</a>
                                                </li>
                                                <li class="header__navbar-user-item header__navbar-user-item--separate">
                                                    <a href="javascript:logoutUserAccount()">Đăng xuất</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                `;
        } else if (data.roleID == 3) {
            htmlAccountMobile +=
                `
                                    <div class="header__mobile-user-avatar">
                                        <div class="header__mobile-user-avatar-img"
                                            style="background-image: url(/img/profile_avatar.jpg);"></div>
                                        <div class="header__mobile-user-avatar-menu">
                                            <ul class="header__navbar-user-menu">
                                                <li class="header__navbar-user-item">
                                                    <a href="">Tài khoản của tôi</a>
                                                </li>
                                                <li class="header__navbar-user-item">
                                                    <a href="">Địa chỉ của tôi</a>
                                                </li>
                                                <li class="header__navbar-user-item">
                                                    <a href="">Kênh người lấy hàng</a>
                                                </li>
                                                <li class="header__navbar-user-item">
                                                    <a href="">Đơn mua</a>
                                                </li>
                                                <li class="header__navbar-user-item header__navbar-user-item--separate">
                                                    <a href="javascript:logoutUserAccount()">Đăng xuất</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                `;
        } else {
            htmlAccountMobile +=
                `
                                    <div class="header__mobile-user-avatar">
                                        <div class="header__mobile-user-avatar-img"
                                            style="background-image: url(/img/profile_avatar.jpg);"></div>
                                        <div class="header__mobile-user-avatar-menu">
                                            <ul class="header__navbar-user-menu">
                                                <li class="header__navbar-user-item">
                                                    <a href="">Tài khoản của tôi</a>
                                                </li>
                                                <li class="header__navbar-user-item">
                                                    <a href="">Địa chỉ của tôi</a>
                                                </li>
                                                <li class="header__navbar-user-item">
                                                    <a href="">Đơn mua</a>
                                                </li>
                                                <li class="header__navbar-user-item header__navbar-user-item--separate">
                                                    <a href="javascript:logoutUserAccount()">Đăng xuất</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                `;
        }
    }
    if (document.querySelector(".header__mobile-user") != null) {
        document.querySelector(".header__mobile-user").innerHTML = htmlAccountMobile;
    }
}

function logoutUserAccount() {
    openModal();
    document.querySelector(".modal__body").innerHTML = `<div class="spinner"></div>`;
    deleteCookies("userID");
    setTimeout(() => {
        closeModal();
        toast({ title: "Thông báo", msg: `Đăng xuất thành công!`, type: "success", duration: 5000 });
        document.querySelector(".modal__body").innerHTML = "";
        setTimeout(() => {
            window.location.assign('/');
        }, 1000)
    }, 2000);
}

function getCartsItem(data) {
    let htmlCartDetail = "";
    if (data.cartCount == 0 || data.userID == 0) {
        console.log('Giỏ hàng trống!');
        htmlCartDetail +=
            `
                    <div class="header__cart-list header__cart-list--no-cart">
                        <img src="/img/no-cart.png" alt="" class="header__cart-no-cart-img">
                        <span class="header__cart-list-no-cart-msg">
                            Chưa có sản phẩm
                        </span>
                    </div>
                `;
    } else {
        console.log('Có sản phẩm trong giỏ!');
        htmlCartDetail +=
            `
                <div class="header__cart-list">
                    <h4 class="header__cart-heading">Sản phẩm đã thêm</h4>
                    <ul class="header__cart-list-item">
                `;
        htmlCartDetail += data.cartDetails.map(obj => `
                    <a href="/product/detail/${obj.pK_iProductID}" class="header__cart-item">
                        <div class="header__cart-item-img">
                            <img src="/img/${obj.sImageUrl}" class="header__cart-item-img" alt="">
                        </div>
                        <div class="header__cart-item-info">
                            <div class="header__cart-item-head">
                                <h5 class="header__cart-item-name">${obj.sProductName}</h5>
                                <div class="header__cart-item-price-wrap">
                                    <span class="header__cart-item-price">${obj.dUnitPrice} đ</span>
                                    <span class="header__cart-item-multifly">X</span>
                                    <span class="header__cart-item-qnt">${obj.iQuantity}</span>
                                </div>
                            </div>
                            <div class="header__cart-item-body">
                                <span class="header__cart-item-description">
                                    Phân loại hàng:Bạc
                                </span>
                                <span class="header__cart-item-remove">Xoá</span>
                            </div>
                        </div>
                    </a>
                `).join('');
        htmlCartDetail +=
            `
                    </ul>
                    <a href="/cart" class="header__cart-btn btn--primary">
                        Xem giỏ hàng
                    </a>
                </div>
                `;
    }
    document.querySelector(".header__cart-container").innerHTML = htmlCartDetail;
    document.querySelector(".header__cart-notice").innerText = data.cartCount;
}

function getShopsItem(data) {
    let htmlShopsItem = "";
    htmlShopsItem += data.stores.map(obj => `
                        <li class="chat__shop-item">
                            <div class="chat__shop-item-img" style="background-image: url(/img/${obj.sImageLogo});"></div>
                            <div class="chat__shop-item-info">
                                <div class="chat__shop-item-info-top">
                                    <div class="chat__shop-item-title">${obj.sStoreName}</div>
                                    <div class="chat__shop-item-time">Thứ 5</div>
                                </div>
                                <div class="chat__shop-item-info-bottom">
                                    Nhắc nhở đánh giá đơn hàng
                                </div>
                            </div>
                        </li>
    `).join('');
    document.querySelectorAll(".chat__shop-list").forEach(e => {
        e.innerHTML = htmlShopsItem;
    });
}

// Tìm kiếm danh mục
function searchProducts(input) {
    document.querySelector('.header__search-bar').classList.remove("hide-on-destop");
    var formData = new FormData();
    if (input.value != "") {
        formData.append("keyword", input.value);
    }
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/home/search', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            let htmlSearch = "";
            htmlSearch += 
            `
                            <div class="header__search-history">
                                <ul class="header__search-history-list">`;
                                if (data.parentCategories.length != 0) {
                                    data.parentCategories.forEach(element => {
            htmlSearch +=
                                    `
                                    <li class="header__search-history-item">
                                        <a href="/product/${element.pK_iParentCategoryID}">${element.sParentCategoryName}</a>
                                    </li>
                                    `;
                                    });
                                } else {
                                    data.categories.forEach(element => {
            htmlSearch +=
                                    `
                                    <li class="header__search-history-item">
                                        <a href="/product/${element.fK_iParentCategoryID}/${element.pK_iCategoryID}">${element.sCategoryName}</a>
                                    </li>
                                    `;
                                    });
                                }
            htmlSearch += `     </ul>
                            </div>
            `;
            if (data.parentCategories.length != 0 || data.categories.length != 0) {
                document.querySelector('.header__search-bar').innerHTML = htmlSearch;
            }
        } 
    };
    xhr.send(formData);
}

const searchInput = document.querySelector('.header__search-input');
searchInput.onclick = () => {
    searchInput.value = "";
    document.querySelector('.header__search-bar').classList.toggle("hide-on-destop");
}

// Set Chat
function setChatBtn(data) {
    if (data.userID == 0) {
        document.querySelector(".chat__btn").classList.add("hide-on-destop");
    } else {
        document.querySelector(".chat__btn").classList.remove("hide-on-destop");
    }
}

function setDataChat(data) {
    let htmlChat = "";
    htmlChat += 
    `
        <div class="chat__container">
            <div class="chat__mobile-window hide-on-destop">
                <div class="chat__body-search">
                    <div class="chat__body-search-box">
                        <i class="uil uil-search chat__body-search-icon"></i>
                        <input type="text" class="chat__body-search-input" onblur="displaySearchSub()"
                            onclick="hideSearchSub()" placeholder="Tìm kiếm">
                    </div>
                    <div class="chat__body-search-sub" onclick="displaySubList()">
                        <span>Tất cả</span>
                        <i class="uil uil-angle-down chat__body-search-sub-icon"></i>
                        <ul class="chat__body-search-sub-list">
                            <li class="chat__body-search-sub-item">
                                Tất cả
                            </li>
                            <li class="chat__body-search-sub-item">
                                Chưa đọc
                            </li>
                            <li class="chat__body-search-sub-item">
                                Đã ghim
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="chat__body-shop">`;
                if (data.chats.length == 0) {
                    htmlChat += 
                    `
                    <div class="chat__body-shop-no">
                        Không tìm thấy <br> cuộc hội thoại nào
                    </div>
                    `;
                } else {
                    htmlChat += `
                    <ul class="chat__shop-list">`;
                    data.chats.forEach(element => {
                        htmlChat += 
                        `
                        <li class="chat__shop-item">
                            <div class="chat__shop-item-img" style="background-image: url(/img/${element.sImageAvatar});"></div>
                            <div class="chat__shop-item-info">
                                <div class="chat__shop-item-info-top">
                                    <div class="chat__shop-item-title">${element.sStoreName}</div>
                                    <div class="chat__shop-item-time">${getDate(element.dTime)}</div>
                                </div>
                                <div class="chat__shop-item-info-bottom">
                                    ${element.sChat}
                                </div>
                            </div>
                        </li>
                        `;
                    });
                    htmlChat += `
                    </ul>`;
                }
                htmlChat += `
                </div>
            </div>
            <div class="chat__header">
                <div class="chat__header-title">Chat</div>
                <div class="chat__header-btns">
                    <div class="chat__header-btn hide-on-mobile" onclick="hideChatWindow()">
                        <i class="uil uil-arrow-right chat__header-btn-arrow"></i>
                    </div>
                    <div class="chat__header-menu-bar hide-on-destop" onclick="showChatWindowMobile()">
                        <span></span>
                    </div>
                    <div class="chat__header-btn">
                        <i class="uil uil-angle-down chat__header-btn-down" onclick="hideChat()"></i>
                    </div>
                </div>
            </div>
            <div class="chat__body">
                <div class="chat__body-left">
                    <div class="chat__body-search">
                        <div class="chat__body-search-box">
                            <i class="uil uil-search chat__body-search-icon"></i>
                            <input type="text" class="chat__body-search-input" onblur="displaySearchSub()"
                                onclick="hideSearchSub()" placeholder="Tìm kiếm">
                        </div>
                        <div class="chat__body-search-sub" onclick="displaySubList()">
                            <span>Tất cả</span>
                            <i class="uil uil-angle-down chat__body-search-sub-icon"></i>
                            <ul class="chat__body-search-sub-list">
                                <li class="chat__body-search-sub-item">
                                    Tất cả
                                </li>
                                <li class="chat__body-search-sub-item">
                                    Chưa đọc
                                </li>
                                <li class="chat__body-search-sub-item">
                                    Đã ghim
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="chat__body-shop">`;
                        if (data.chats.length == 0) {
                        htmlChat += 
                        `
                        <div class="chat__body-shop-no">
                            Không tìm thấy <br> cuộc hội thoại nào
                        </div>
                        `;
                    } else {
                        htmlChat += `
                        <ul class="chat__shop-list">`;
                        data.chats.forEach(element => {
                            htmlChat += 
                            `
                            <li class="chat__shop-item" onclick=showChatDetail(${element.pK_iChatID})>
                                <div class="chat__shop-item-img" style="background-image: url(/img/${element.sImageAvatar});"></div>
                                <div class="chat__shop-item-info">
                                    <div class="chat__shop-item-info-top">
                                        <div class="chat__shop-item-title">${element.sStoreName}</div>
                                        <div class="chat__shop-item-time">${getDate(element.dTime)}</div>
                                    </div>
                                    <div class="chat__shop-item-info-bottom">
                                        ${element.sLastChat}
                                    </div>
                                </div>
                            </li>
                            `;
                        });
                        htmlChat += `
                        </ul>`;
                    }
                    htmlChat += `
                    </div>
                </div>
                <div class="chat__body-right">
                    <div class="chat__body-shop-name">
                        
                    </div>
                    <div class="chat__body-message">
                        <div class="chat__body-message-welcome">
                            <img src="/img/sme_chat.png" class="chat__body-message-welcome-img" alt="">
                            <div class="chat__body-message-welcome-title">Chào mừng bạn đến với SMe Chat</div>
                            <div class="chat__body-message-welcome-sub">
                                Bắt đầu trả lời người mua
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.querySelector(".chat").innerHTML = htmlChat;
}

function showChatDetail(chatID) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/chat/detail?chatID=' + chatID + '', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);

            let htmlShopName = "";
            htmlShopName += 
            `
                        <div class="chat__body-shop-name-container">
                            <span>${data.chat[0].sStoreName}</span>
                            <i class="uil uil-angle-down chat__body-shop-name-icon"></i>
                            <div class="chat__body-shop-name-sub">
                                <div class="chat__body-shop-name-sub-header">
                                    <div class="chat__body-shop-name-sub-header-img" style="background-image: url(/img/${data.chat[0].sImageAvatar});"></div>
                                    <div class="chat__body-shop-name-sub-header-title">${data.chat[0].sStoreName}</div>
                                </div>
                                <ul class="chat__body-shop-name-sub-list">
                                    <li class="chat__body-shop-name-sub-item">
                                        <span>Tắt thông báo</span>
                                        <div class="chat__body-shop-name-sub-control">
                                            <div class="chat__body-shop-name-sub-control-circle"></div>
                                        </div>
                                    </li>
                                    <li class="chat__body-shop-name-sub-item">
                                        <span>Chặn người dùng</span>
                                        <div class="chat__body-shop-name-sub-control">
                                            <div class="chat__body-shop-name-sub-control-circle"></div>
                                        </div>
                                    </li>
                                    <li class="chat__body-shop-name-sub-item">
                                        <a href="#" class="chat__body-shop-name-sub-item-link">
                                            <span>Tố cáo người dùng</span>
                                            <i class="uil uil-angle-right-b chat__body-shop-name-sub-item-icon"></i>
                                        </a>
                                    </li>
                                </ul>
                                <div class="chat__body-shop-name-sub-bottom">
                                    <a href="#" class="chat__body-shop-name-sub-bottm-link">
                                        <span>Xem thông tin cá nhân</span>
                                        <i class="uil uil-angle-right-b chat__body-shop-name-sub-item-icon"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
            `;
            document.querySelector(".chat__body-shop-name").innerHTML = htmlShopName;

            let htmlMessage = "";
            htmlMessage += 
            `
                        <div class="chat__body-message-container">
                            <div class="chat__message-time">
                                <span>${getDate(data.chat[0].dTime)}</span>
                            </div>
                            <div class="chat__message-node">
                                <div class="chat__message-node-text">
                                    <i class="uil uil-exclamation-octagon chat__message-node-icon"></i>
                                    LƯU Ý: SMe KHÔNG cho phép các hành vi: Đặt cọc/chuyển khoản riêng
                                    cho người bán/Giao dịch ngoài hệ thống SMe/Cung cấp thông tin liên hệ
                                    cho người bán/Các hoạt động tuyển CTV/Tặng quà miễn phí,... Vui lòng chỉ
                                    mua bán hàng trực tiếp trên ứng dụng SMe để tránh nguy cơ bị lừa đảo bạn nhé!
                                    <a href="#" class="chat__message-node-link">Tìm hiểu thêm</a>
                                </div>
                            </div>`;
                            data.chatDetails.forEach(element => {
                                if (element.iChatPersonID == element.fK_iSellerID) {
                            htmlMessage += 
                            `<div class="chat__message-body-texted">
                                <div class="chat__message-body-texted-container">
                                    <div class="chat__message-body-texted-content">
                                    ${element.sChat}
                                    </div>
                                    <div class="chat__message-body-texted-time">${getTime(element.dTime)}</div>
                                </div>
                            </div>`;
                                    } else {
                            htmlMessage += 
                            `<div class="chat__message-body-me">
                                <div class="chat__message-body-me-container">
                                    <span class="chat__message-body-me-content">
                                        ${element.sChat}<br>
                                    </span>
                                    <div class="chat__message-body-me-time">${getTime(element.dTime)}</div>
                                </div>
                            </div>`;
                                    }
                                });
                                htmlMessage += 
                        `</div>
                        <div class="chat__body-message-bottom">
                            <div class="chat__body-message-bottom-box">
                                <input type="text" class="chat__body-message-bottom-input"
                                    placeholder="Nhập nội dung tin nhắn">
                            </div>
                            <div class="chat__body-message-bottom-btns">
                                <div class="chat__body-message-bottom-btns-left">
                                    <ul class="chat__body-message-bottom-list">
                                        <li class="chat__body-message-bottom-item">
                                            <i class="uil uil-grin chat__body-message-bottom-item-icon"></i>
                                        </li>
                                        <li class="chat__body-message-bottom-item">
                                            <i class="uil uil-image-plus chat__body-message-bottom-item-icon"></i>
                                        </li>
                                        <li class="chat__body-message-bottom-item">
                                            <i class="uil uil-youtube chat__body-message-bottom-item-icon"></i>
                                        </li>
                                        <li class="chat__body-message-bottom-item">
                                            <i class="uil uil-shopping-bag chat__body-message-bottom-item-icon"></i>
                                        </li>
                                        <li class="chat__body-message-bottom-item">
                                            <i class="uil uil-clipboard chat__body-message-bottom-item-icon"></i>
                                        </li>
                                    </ul>
                                </div>
                                <div class="chat__body-message-bottom-btns-right">
                                    <div class="chat__body-message-bottom-item chat__body-message-bottom-item-send hide-on-destop">
                                        <i class="uil uil-message chat__body-message-bottom-item-icon"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
            `;
            document.querySelector(".chat__body-message").innerHTML = htmlMessage;
            
            document.querySelector(".chat__body-message-bottom-input").addEventListener('keyup', () => {
                if (document.querySelector(".chat__body-message-bottom-input").value != "") {
                    document.querySelector(".chat__body-message-bottom-item-send").classList.remove("hide-on-destop");
                } else {
                    document.querySelector(".chat__body-message-bottom-item-send").classList.add("hide-on-destop");
                }
            });

            document.querySelector(".chat__body-message-bottom-item-send").addEventListener('click', () => {
                let chat = document.querySelector(".chat__body-message-bottom-input").value;
                var formData = new FormData();
                formData.append("chatID", data.chat[0].pK_iChatID);
                formData.append("msg", chat);

                var xhr = new XMLHttpRequest();
                xhr.open('post', '/shop/add-chat', true);
                xhr.onreadystatechange = () => {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        const data = JSON.parse(xhr.responseText);

                        console.log(data);

                        showChatDetail(chatID);
                        
                    }
                };
                xhr.send(formData);
            });
        }
    };
    xhr.send(null);
}

// Notice Incomplete Function
function noticeIncompleteFunc() {
    openModal();
    document.querySelector(".modal__body").innerHTML = 
            `
                <div class="modal__confirm">
                    <div class="modal__confirm-header">
                        <div class="modal__confirm-title">Thông báo</div>
                    </div>
                    <div class="modal__confirm-desc">
                        Chức năng này chưa được hoàn thiện!
                    </div>
                    <div class="modal__confirm-btns">
                        <div class="modal__confirm-btn-destroy" onclick="closeModal()">Huỷ</div>
                        <div class="modal__confirm-btn-send"onclick="closeModal()">Đồng ý</div>
                    </div>
                </div>
            `;
}

// Modal
function openModal() {
    document.querySelector(".modal").classList.add("open");
}

function closeModal() {
    document.querySelector(".modal").classList.remove("open");
}

// Validate Styles
function showErrStyles(input, msg) {
    input.classList.add("err");
    msg.classList.remove("hide-on-destop");
}

function removeErrStyles(input, msg) {
    input.classList.remove("err");
    msg.classList.add("hide-on-destop");
}

// Toast
function toast({ title = "", msg = "", type = "", duration = 3000}) {
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
            error: 'uil uil-exclamation-triangle'
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

// Chat JS

function hideChatWindow() {
    document.querySelector(".chat__container").classList.toggle("hide-chat-window");
    document.querySelector(".chat__body-right").classList.toggle("hide-chat-window");
    document.querySelector(".chat__header-btn-arrow").classList.toggle("transform");
}

function hideSearchSub() {
    document.querySelector(".chat__body-search-sub").style.display = 'none';
}

function displaySearchSub() {
    document.querySelector(".chat__body-search-sub").style.display = 'flex';
}

function displaySubList() {
    document.querySelector(".chat__body-search-sub-list").classList.toggle('active'); 
}

document.querySelectorAll(".chat__body-shop-name-sub-control").forEach(e => {
    e.addEventListener('click', () => {
        e.classList.toggle('active');
        e.querySelector(".chat__body-shop-name-sub-control-circle").classList.toggle('active');
    });
});

function hideChat() {
    document.querySelector(".chat__container").style.display = 'none';
    document.querySelector(".chat__btn").style.display = "flex";
}

function displayChat() {
    document.querySelector(".chat__container").style.display = 'block';
    document.querySelector(".chat__btn").style.display = "none";
}

function showChatWindowMobile() {
    document.querySelector(".chat__header-menu-bar").classList.toggle("active");
    document.querySelector(".chat__mobile-window").classList.toggle("show");
}

// Load Product
function loadingProducts() {
    const loadingProductImage = document.querySelectorAll(".home-product-item__img-loading");
    const loadingProductName = document.querySelectorAll(".home-product-item__name-loading");
    const loadingProductPriceOld = document.querySelectorAll(".home-product-item__price-old-loading");
    const loadingProductPriceCurrent = document.querySelectorAll(".home-product-item__price-current-loading");
    const loadingProductLike = document.querySelectorAll(".home-product-item__like-loading");
    const loadingProductRate = document.querySelectorAll(".home-product-item__rating-loading");
    const loadingProductSold = document.querySelectorAll(".home-product-item__sold-loading");
    const loadingProductBrand = document.querySelectorAll(".home-product-item__brand-loading");
    const loadingProductOrigin = document.querySelectorAll(".home-product-item__origin-name-loading");

    setTimeout(() => {
        for (let i = 0; i < loadingProductImage.length; i++) {
            loadingProductImage[i].style.display = 'none';
        }
        for (let i = 0; i < loadingProductName.length; i++) {
            loadingProductName[i].style.display = 'none';
        }
        for (let i = 0; i < loadingProductPriceOld.length; i++) {
            loadingProductPriceOld[i].style.display = 'none';
        }
        for (let i = 0; i < loadingProductPriceCurrent.length; i++) {
            loadingProductPriceCurrent[i].style.display = 'none';
        } 
        for (let i = 0; i < loadingProductLike.length; i++) {
            loadingProductLike[i].style.display = 'none';
        }
        for (let i = 0; i < loadingProductRate.length; i++) {
            loadingProductRate[i].style.display = 'none';
        }
        for (let i = 0; i < loadingProductSold.length; i++) {
            loadingProductSold[i].style.display = 'none';
        }
        for (let i = 0; i < loadingProductBrand.length; i++) {
            loadingProductBrand[i].style.display = 'none';
        }
        for (let i = 0; i < loadingProductOrigin.length; i++) {
            loadingProductOrigin[i].style.display = 'none';
        }
    }, 1000);
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

function money_2(number) {
    const formattedAmount = new Intl.NumberFormat('vi-VI', {
        style: 'currency',
        currency: 'VND',
    }).format(number);
    return formattedAmount;
}

// Back History
function backHistory() {
    window.history.back();
}

// Format Date
function formatDate(date) {
    const dateFormat = new Date(date);
    return dateFormat.toLocaleDateString('en-GB'); // 24/04/2023
}

// Lấy tên thứ
function getDate(date) {
    // Khai báo đối tượng Date
    var date = new Date(date);

    // Lấy số thứ tự của ngày hiện tại
    var current_day = date.getDay();

    // Biến lưu tên của thứ
    var day_name = '';

    // Lấy tên thứ của ngày hiện tại
    switch (current_day) {
        case 0:
            day_name = "CN";
            break;
        case 1:
            day_name = "Thứ 2";
            break;
        case 2:
            day_name = "Thứ 3";
            break;
        case 3:
            day_name = "Thứ 4";
            break;
        case 4:
            day_name = "Thứ 5";
            break;
        case 5:
            day_name = "Thứ 6";
            break;
        case 6:
            day_name = "Thứ 7";
    }
    return day_name;

}

function setDateMonth(date) {
    var day = new Date(date);
    var MM = day.getMonth() + 1;
    var dd = day.getDate();
    var currDay = dd + ' Tháng ' + MM 
    return currDay;
}

function getTime(time) {
    var date = new Date(time);
    var hours = date.getHours();
    hours = hours < 10 ? '0' + hours : hours;
    var minutes = date.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var current_time = hours + ":" + minutes;
    return current_time;
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