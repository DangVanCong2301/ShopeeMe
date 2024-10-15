function getAPISiteSeller() {
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/seller', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);
            
            setSellerAccount(data);

            setSidebar(data);
        }
    };
    xhr.send(null);
}
getAPISiteSeller();

function setSellerAccount(data) {
    let htmlSellerAccount = "";
    htmlSellerAccount += 
    `
                    <div class="header__account-avatar">
                            <img src="/img/no_user.jpg" class="header__account-avatar-img" alt="">
                        </div>
                        <div class="header__account-info">
                            <span class="header__account-info-name">${data.sellerUsername}</span>
                            <div class="header__account-info-down">
                                <i class="uil uil-angle-down header__account-info-icon"></i>
                            </div>
                        </div>
                        <div class="header__account-manager">
                            <ul class="header__navbar-user-menu">
                                <li class="header__navbar-user-item">
                                    <div class="header__account-manager-info">
                                        <img src="/img/no_user.jpg" alt="" class="header__account-manager-img">
                                        <div class="header__account-manager-name">${data.sellerUsername}</div>
                                    </div>
                                </li>
                                <li class="header__navbar-user-item header__navbar-user-item--separate">
                                    <a href="javascript:logoutSellerAccount()">
                                        <i class="uil uil-signout header__account-manager-icon"></i>
                                        Đăng xuất
                                    </a>
                                </li>
                            </ul>
                        </div>
    `;
    document.querySelector(".header__account").innerHTML = htmlSellerAccount;
}

function logoutSellerAccount() {
    openModal();
    document.querySelector(".modal__body").innerHTML =
        `
                <div class="spinner"></div>
        `;
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/seller/logout', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const result = JSON.parse(xhr.responseText);
            if (result.statusCode == 1) {
                setTimeout(() => {
                    closeModal();
                    toast({ title: "Thông báo", msg: `${result.message}`, type: "success", duration: 5000 });
                    document.querySelector(".modal__body").innerHTML = "";
                    setTimeout(() => {
                        window.location.assign('/seller/login');
                    }, 1000)
                }, 2000);
            }
        }
    };
    xhr.send(null);
}

function setSidebar(data) {
    let htmlSidebar = "";
    htmlSidebar += 
    `
                    <div class="admin__aside-sidebar">
                        <div class="admin__aside-sidebar-link active">
                            <div class="admin__aside-sidebar-container">
                                <div class="admin__aside-sidebar-symb">
                                    <i class="uil uil-th admin__aside-sidebar-icon"></i>
                                </div>
                                <div class="admin__aside-sidebar-sub">Quản lý đơn hàng</div>
                                <div class="admin__aside-sidebar-down">
                                    <i class="uil uil-angle-down admin__aside-sidebar-down-icon"></i>
                                </div>
                            </div>
                            <div class="admin__aside-sidebar-colappse">
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub admin__sidebar-all">Tất cả</div>
                                </div>
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub admin__sidebar-bulk-delivery">Giao hàng loạt</div>
                                </div>
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub admin__sidebar-cancellation">Đơn huỷ</div>
                                </div>
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub admin__sidebar-return-refund">Trả hàng/Hoàn tiền</div>
                                </div>
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub admin__sidebar-transport-setting">Cài đặt vận chuyển</div>
                                </div>
                            </div>
                        </div>
                        <div class="admin__aside-sidebar-link active">
                            <div class="admin__aside-sidebar-container">
                                <div class="admin__aside-sidebar-symb">
                                    <i class="uil uil-sitemap admin__aside-sidebar-icon"></i>
                                </div>
                                <div class="admin__aside-sidebar-sub">Quản lý sản phẩm</div>
                                <div class="admin__aside-sidebar-down">
                                    <i class="uil uil-angle-down admin__aside-sidebar-down-icon"></i>
                                </div>
                            </div>
                            <div class="admin__aside-sidebar-colappse">
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub admin__sidebar-all-product">Tất cả sản phẩm</div>
                                </div>
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub admin__sidebar-add-product">Thêm sản phẩm</div>
                                </div>
                            </div>
                        </div>
                        <div class="admin__aside-sidebar-link">
                            <div class="admin__aside-sidebar-container">
                                <div class="admin__aside-sidebar-symb">
                                    <i class="uil uil-mobile-android admin__aside-sidebar-icon"></i>
                                </div>
                                <div class="admin__aside-sidebar-sub">Kênh Marketing</div>
                                <div class="admin__aside-sidebar-down">
                                    <i class="uil uil-angle-down admin__aside-sidebar-down-icon"></i>
                                </div>
                            </div>
                            <div class="admin__aside-sidebar-colappse">
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub admin__sidebar-promotion">Khuyến mãi của Shop</div>
                                </div>
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub admin__sidebar-discount">Mã giảm giá của Shop</div>
                                </div>
                            </div>
                        </div>
                        <div class="admin__aside-sidebar-link">
                            <div class="admin__aside-sidebar-container">
                                <div class="admin__aside-sidebar-symb">
                                    <i class="uil uil-chat admin__aside-sidebar-icon"></i>
                                </div>
                                <div class="admin__aside-sidebar-sub">Chăm sóc khách hàng</div>
                                <div class="admin__aside-sidebar-down">
                                    <i class="uil uil-angle-down admin__aside-sidebar-down-icon"></i>
                                </div>
                            </div>
                            <div class="admin__aside-sidebar-colappse">
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub admin__sidebar-chat-management">Quản lý Chat</div>
                                </div>
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub admin__sidebar-assessment-management">Quản lý đánh giá</div>
                                </div>
                            </div>
                        </div>
                        <div class="admin__aside-sidebar-link">
                            <div class="admin__aside-sidebar-container">
                                <div class="admin__aside-sidebar-symb">
                                    <i class="uil uil-wallet admin__aside-sidebar-icon"></i>
                                </div>
                                <div class="admin__aside-sidebar-sub">Tài chính</div>
                                <div class="admin__aside-sidebar-down">
                                    <i class="uil uil-angle-down admin__aside-sidebar-down-icon"></i>
                                </div>
                            </div>
                            <div class="admin__aside-sidebar-colappse">
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub admin__sidebar-revenue">Doanh thu</div>
                                </div>
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub admin__sidebar-account-balance">Số dư tài khoản Shopee</div>
                                </div>
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub admin__sidebar-bank-account">Tài khoản ngân hàng</div>
                                </div>
                            </div>
                        </div>
                        <div class="admin__aside-sidebar-link">
                            <div class="admin__aside-sidebar-container">
                                <div class="admin__aside-sidebar-symb">
                                    <i class="uil uil-chart-line admin__aside-sidebar-icon"></i>
                                </div>
                                <div class="admin__aside-sidebar-sub">Dữ liệu</div>
                                <div class="admin__aside-sidebar-down">
                                    <i class="uil uil-angle-down admin__aside-sidebar-down-icon"></i>
                                </div>
                            </div>
                            <div class="admin__aside-sidebar-colappse">
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub admin__sidebar-sales-analysis">Phân tích bán hàng</div>
                                </div>
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub admin__sidebar-operating-efficiency">Hiệu quả hoạt động</div>
                                </div>
                            </div>
                        </div>
                        <div class="admin__aside-sidebar-link active">
                            <div class="admin__aside-sidebar-container">
                                <div class="admin__aside-sidebar-symb">
                                    <i class="uil uil-store admin__aside-sidebar-icon"></i>
                                </div>
                                <div class="admin__aside-sidebar-sub">Quản lý Shop</div>
                                <div class="admin__aside-sidebar-down">
                                    <i class="uil uil-angle-down admin__aside-sidebar-down-icon"></i>
                                </div>
                            </div>
                            <div class="admin__aside-sidebar-colappse">
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub admin__sidebar-profile-shop">Hồ sơ Shop</div>
                                </div>
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub admin__sidebar-decoration">Trang trí Shop</div>
                                </div>
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub admin__sidebar-setup-shop">Thiết lập Shop</div>
                                </div>
                            </div>
                        </div>
                        <a href="#" class="admin__aside-sidebar-link">
                            <div class="admin__aside-sidebar-container">
                                <div class="admin__aside-sidebar-symb">
                                    <i class="uil uil-signout admin__aside-sidebar-icon"></i>
                                </div>
                                <div class="admin__aside-sidebar-sub">Đăng xuất</div>
                            </div>
                        </a>
                    </div>
    `;
    document.querySelector(".admin__aside").innerHTML = htmlSidebar;

    document.querySelector(".admin__sidebar-all").addEventListener('click', () => {
        showAll(data);
    });

    document.querySelector(".admin__sidebar-bulk-delivery").addEventListener('click', () => {
        showBulkDelivery(data);
    });

    document.querySelector(".admin__sidebar-cancellation").addEventListener("click", () => {
        showCancellation(data);
    });

    document.querySelector(".admin__sidebar-return-refund").addEventListener('click', () => {
        showReturnRefund(data);
    });

    document.querySelector(".admin__sidebar-transport-setting").addEventListener('click', () => {
        showTransortSetting(data);
    });

    document.querySelector(".admin__sidebar-add-product").addEventListener("click", () => {
        showAddProduct(data);
    });
    
    document.querySelector(".admin__sidebar-all-product").addEventListener('click', () => {
        showAllProduct(data);
    });

    document.querySelector(".admin__sidebar-promotion").addEventListener("click", () => {
        showPromotion(data);
    });

    document.querySelector(".admin__sidebar-discount").addEventListener("click", () => {
        showDiscount(data);
    });

    document.querySelector(".admin__sidebar-chat-management").addEventListener("click", () => {
        showChatManagement(data);
    });

    document.querySelector(".admin__sidebar-assessment-management").addEventListener("click", () => {
        showAssessmentManagement(data);
    });

    document.querySelector(".admin__sidebar-revenue").addEventListener("click", () => {
        showRevenue(data);
    });

    document.querySelector(".admin__sidebar-account-balance").addEventListener("click", () => {
        showAccountBalance(data);
    });

    document.querySelector(".admin__sidebar-bank-account").addEventListener("click", () => {
        showBankAccount(data);
    });

    document.querySelector(".admin__sidebar-sales-analysis").addEventListener("click", () => {
        showSalesAnalysis(data);
    });

    document.querySelector(".admin__sidebar-operating-efficiency").addEventListener("click", () => {
        showOperatingEfficienty(data);
    });

    document.querySelector(".admin__sidebar-profile-shop").addEventListener("click", () => {
        showProfileShop(data);
    });

    document.querySelector(".admin__sidebar-decoration").addEventListener("click", () => {
        showDecoration(data);
    });

    document.querySelector(".admin__sidebar-setup-shop").addEventListener("click", () => {
        showSetupShop(data);
    });
}

function showAll(data) {
    document.querySelector(".admin__container").innerHTML = 
    `
                    <div class="admin__main">
                        <div class="admin__main-container">
                            <div class="admin__main-left">
                                <div class="admin__main-analys">
                                    <div class="admin__main-title">Bảng quản trị</div>
                                    <div class="admin__main-date">
                                        <input type="date" class="admin__main-date-input">
                                    </div>
                                    <div class="admin__main-insights">
                                        <div class="admin__main-sales">
                                            <div class="admin__main-box">
                                                <i class="uil uil-analytics admin__main-icon"></i>
                                            </div>
                                            <div class="admin__main-middle">
                                                <div class="admin__main-middle-left">
                                                    <div class="admin__main-middle-title">Tổng bán hàng</div>
                                                    <div class="admin__main-middle-price">1.500.000đ</div>
                                                </div>
                                                <div class="admin__main-progress">
                                                    <svg class="admin__main-progress-img">
                                                        <circle cx="38" cy="38" r="36"></circle>
                                                    </svg>
                                                    <div class="admin__main-number">
                                                        <p class="admin__main-number-text">84%</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <small class="admin__main-text-muted">24 tiếng trước</small>
                                        </div>
                                        <!-- End Of Sales -->
                                        <div class="admin__main-expenses">
                                            <div class="admin__main-box">
                                                <i class="uil uil-chart admin__main-box-icon"></i>
                                            </div>
                                            <div class="admin__main-middle">
                                                <div class="admin__main-middle-left">
                                                    <div class="admin__main-middle-title">Tổng bán hàng</div>
                                                    <div class="admin__main-middle-price">1.500.000đ</div>
                                                </div>
                                                <div class="admin__main-progress">
                                                    <svg class="admin__main-progress-img">
                                                        <circle cx="38" cy="38" r="36"></circle>
                                                    </svg>
                                                    <div class="admin__main-number">
                                                        <p class="admin__main-number-text">84%</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <small class="admin__main-text-muted">24 tiếng trước</small>
                                        </div>
                                        <!-- End Of Expenses -->
                                        <div class="admin__main-income">
                                            <div class="admin__main-box">
                                                <i class="uil uil-comparison admin__main-box-icon"></i>
                                            </div>
                                            <div class="admin__main-middle">
                                                <div class="admin__main-middle-left">
                                                    <div class="admin__main-middle-title">Tổng thu</div>
                                                    <div class="admin__main-middle-price">1.500.000đ</div>
                                                </div>
                                                <div class="admin__main-progress">
                                                    <svg class="admin__main-progress-img">
                                                        <circle cx="38" cy="38" r="36"></circle>
                                                    </svg>
                                                    <div class="admin__main-number">
                                                        <p class="admin__main-number-text">74%</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <small class="admin__main-text-muted">24 tiếng trước</small>
                                        </div>
                                        <!-- End Of Income -->
                                    </div>
                                </div>
                                <div class="admin__main-analys admin__main-to-do-list">
                                    <div class="admin__main-title admin__main-to-do-list-title">Danh sách cần làm</div>
                                    <div class="admin__main-to-do-list-list">
                                        <div class="admin__main-sales">
                                            <div class="admin__main-to-do-list-item admin__main-to-do-list-item-wait-settlment">
                                                <div class="admin__main-to-do-list-numb">
                                                    ${data.ordersWaitSettlement.length}
                                                </div>
                                                <div class="admin__main-to-do-list-sub">
                                                    Chờ xác nhận
                                                </div>
                                            </div>
                                        </div>
                                        <!-- End Of Sales -->
                                        <div class="admin__main-expenses">
                                            <div class="admin__main-to-do-list-item admin__main-to-do-list-item-wait-pickup">
                                                <div class="admin__main-to-do-list-numb">
                                                    ${data.ordersWaitPickup.length}
                                                </div>
                                                <div class="admin__main-to-do-list-sub">
                                                    Chờ lấy hàng
                                                </div>
                                            </div>
                                        </div>
                                        <!-- End Of Expenses -->
                                        <div class="admin__main-income">
                                            <div class="admin__main-to-do-list-item admin__main-to-do-list-item-processed">
                                                <div class="admin__main-to-do-list-numb">
                                                    ${data.shippingOrders.length}
                                                </div>
                                                <div class="admin__main-to-do-list-sub">
                                                    Đã xử lý
                                                </div>
                                            </div>
                                        </div>
                                        <!-- End Of Income -->
                                         <!-- End Of Expenses -->
                                        <div class="admin__main-income">
                                            <div class="admin__main-to-do-list-item">
                                                <div class="admin__main-to-do-list-numb">
                                                    0
                                                </div>
                                                <div class="admin__main-to-do-list-sub">
                                                    Đơn huỷ
                                                </div>
                                            </div>
                                        </div>
                                        <!-- End Of Income -->
                                        <div class="admin__main-expenses">
                                            <div class="admin__main-to-do-list-item">
                                                <div class="admin__main-to-do-list-numb">
                                                    0
                                                </div>
                                                <div class="admin__main-to-do-list-sub">
                                                    Trả hàng, hoàn tiền
                                                </div>
                                            </div>
                                        </div>
                                        <div class="admin__main-expenses">
                                            <div class="admin__main-to-do-list-item">
                                                <div class="admin__main-to-do-list-numb">
                                                    0
                                                </div>
                                                <div class="admin__main-to-do-list-sub">
                                                    Sản phẩm bị khoá
                                                </div>
                                            </div>
                                        </div>
                                        <div class="admin__main-expenses">
                                            <div class="admin__main-to-do-list-item">
                                                <div class="admin__main-to-do-list-numb">
                                                    0
                                                </div>
                                                <div class="admin__main-to-do-list-sub">
                                                    Sản phẩm hết hàng
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="admin__main-recent-orders">
                                    <div class="admin__main-recent-orders-title">Đơn hàng gần đây</div>
                                    <div class="admin__order-header">
                                        <ul class="admin__order-header-list">
                                            <li class="admin__order-header-item active">
                                                Tất cả
                                            </li>
                                            <li class="admin__order-header-item">
                                                Chờ thanh toán
                                            </li>
                                            <li class="admin__order-header-item">
                                                Vận chuyển (1)
                                            </li>
                                            <li class="admin__order-header-item">
                                                Chờ giao hàng
                                            </li>
                                            <li class="admin__order-header-item">
                                                Hoàn thành
                                            </li>
                                            <li class="admin__order-header-item">
                                                Đã huỷ
                                            </li>
                                            <li class="admin__order-header-item">
                                                Trả hàng/hoàn tiền
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="admin__order-container">
                                        <div class="admin__order-table">
                                            <div class="admin__order-table-header">
                                                <div class="admin__order-table-header-row">
                                                    <div class="admin__order-table-header-col">Mã đơn hàng</div>
                                                    <div class="admin__order-table-header-col">Sản phẩm</div>
                                                    <div class="admin__order-table-header-col">Thanh toán</div>
                                                    <div class="admin__order-table-header-col">Trạng thái</div>
                                                    <div class="admin__order-table-header-col"></div>
                                                </div>
                                            </div>
                                            <div class="admin__order-table-body">
                                                <div class="admin__order-table-body-row">
                                                    <div class="admin__order-table-body-col">DH123</div>
                                                    <div class="admin__order-table-body-col">3</div>
                                                    <div class="admin__order-table-body-col">500.000 đ</div>
                                                    <div class="admin__order-table-body-col warning">Chờ xác nhận</div>
                                                    <div class="admin__order-table-body-col primary">
                                                        <a href="#" class="admin__order-table-body-col-link">Chi tiết</a>
                                                    </div>
                                                </div>
                                                <div class="admin__order-table-body-row">
                                                    <div class="admin__order-table-body-col">DH435</div>
                                                    <div class="admin__order-table-body-col">3</div>
                                                    <div class="admin__order-table-body-col">500.000 đ</div>
                                                    <div class="admin__order-table-body-col primary">Đã thanh toán</div>
                                                    <div class="admin__order-table-body-col primary">
                                                        <a href="#" class="admin__order-table-body-col-link">Chi tiết</a>
                                                    </div>
                                                </div>
                                                <div class="admin__order-table-body-row">
                                                    <div class="admin__order-table-body-col">DH432</div>
                                                    <div class="admin__order-table-body-col">3</div>
                                                    <div class="admin__order-table-body-col">500.000 đ</div>
                                                    <div class="admin__order-table-body-col success">Đã giao hàng</div>
                                                    <div class="admin__order-table-body-col primary">
                                                        <a href="#" class="admin__order-table-body-col-link">Chi tiết</a>
                                                    </div>
                                                </div>
                                                <div class="admin__order-table-body-row">
                                                    <div class="admin__order-table-body-col">DH987</div>
                                                    <div class="admin__order-table-body-col">3</div>
                                                    <div class="admin__order-table-body-col">500.000 đ</div>
                                                    <div class="admin__order-table-body-col danger">Khách hàng huỷ</div>
                                                    <div class="admin__order-table-body-col primary">
                                                        <a href="#" class="admin__order-table-body-col-link">Chi tiết</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="#" class="admin__order-more">Xem tất cả</a>
                                </div>
                            </div>
                            <div class="admin__right">
                                <div class="admin__right-recent-updates">
                                    <div class="admin__right-recent-updates-title">Cập nhật gần đây</div>
                                    <div class="admin__right-recent-updates-container">
                                        <div class="admin__right-recent-updates-list">
                                            <div class="admin__right-recent-updates-item">
                                                <div class="admin__right-recent-updates-item-profile-photo">
                                                    <img src="/img/profile_avatar.jpg" alt="" class="admin__right-recent-updates-item-profile-photo-img">
                                                </div>
                                                <div class="admin__right-recent-updates-item-message">
                                                    <p class="admin__right-recent-updates-item-message-text"><b class="admin__right-recent-updates-item-message-name">Công Đặng</b> nhận được đơn đặt hàng từ Fithou bằng công nghệ GPS </p>
                                                    <small class="admin__right-recent-updates-item-message-time">2 tiếng trước</small>
                                                </div>
                                            </div>
                                            <div class="admin__right-recent-updates-item">
                                                <div class="admin__right-recent-updates-item-profile-photo">
                                                    <img src="/img/profile_avatar.jpg" alt="" class="admin__right-recent-updates-item-profile-photo-img">
                                                </div>
                                                <div class="admin__right-recent-updates-item-message">
                                                    <p class="admin__right-recent-updates-item-message-text"><b class="admin__right-recent-updates-item-message-name">Công Đặng</b> nhận được đơn đặt hàng từ Fithou bằng công nghệ GPS </p>
                                                    <small class="admin__right-recent-updates-item-message-time">2 tiếng trước</small>
                                                </div>
                                            </div>
                                            <div class="admin__right-recent-updates-item">
                                                <div class="admin__right-recent-updates-item-profile-photo">
                                                    <img src="/img/profile_avatar.jpg" alt="" class="admin__right-recent-updates-item-profile-photo-img">
                                                </div>
                                                <div class="admin__right-recent-updates-item-message">
                                                    <p class="admin__right-recent-updates-item-message-text"><b class="admin__right-recent-updates-item-message-name">Công Đặng</b> nhận được đơn đặt hàng từ Fithou bằng công nghệ GPS </p>
                                                    <small class="admin__right-recent-updates-item-message-time">2 tiếng trước</small>
                                                </div>
                                            </div>
                                        </div>
                                        <a href="#" class="admin__order-more">Xem tất cả</a>
                                    </div>
                                </div>
                                <div class="admin__right-sales-analytics">
                                    <div class="admin__right-sales-analytics-title">Phân tích bán hàng</div>
                                    <div class="admin__right-sales-analytics-container">
                                        <div class="admin__right-sales-analytics-list">
                                            <div class="admin__right-sales-analytics-item online">
                                                <div class="admin__right-sales-analytics-item-icon">
                                                    <i class="uil uil-shopping-cart-alt"></i>
                                                </div>
                                                <div class="admin__right-sales-analytics-item-right">
                                                    <div class="admin__right-sales-analytics-item-info">
                                                        <div class="admin__right-sales-analytics-item-sub">ĐẶT HÀNG ONLINE</div>
                                                        <small class="admin__right-sales-analytics-item-time">24 tiếng trước</small>
                                                    </div>
                                                    <div class="admin__right-sales-analytics-item-percent success">+39%</div>
                                                    <div class="admin__right-sales-analytics-item-quantity">1300</div>
                                                </div>
                                            </div>
                                            <div class="admin__right-sales-analytics-item offline">
                                                <div class="admin__right-sales-analytics-item-icon">
                                                    <i class="uil uil-shopping-bag"></i>
                                                </div>
                                                <div class="admin__right-sales-analytics-item-right">
                                                    <div class="admin__right-sales-analytics-item-info">
                                                        <div class="admin__right-sales-analytics-item-sub">ĐẶT HÀNG OFFLINE</div>
                                                        <small class="admin__right-sales-analytics-item-time">24 tiếng trước</small>
                                                    </div>
                                                    <div class="admin__right-sales-analytics-item-percent danger">-17%</div>
                                                    <div class="admin__right-sales-analytics-item-quantity">1300</div>
                                                </div>
                                            </div>
                                            <div class="admin__right-sales-analytics-item customers">
                                                <div class="admin__right-sales-analytics-item-icon">
                                                    <i class="uil uil-users-alt"></i>
                                                </div>
                                                <div class="admin__right-sales-analytics-item-right">
                                                    <div class="admin__right-sales-analytics-item-info">
                                                        <div class="admin__right-sales-analytics-item-sub">KHÁCH HÀNG MỚI</div>
                                                        <small class="admin__right-sales-analytics-item-time">24 tiếng trước</small>
                                                    </div>
                                                    <div class="admin__right-sales-analytics-item-percent success">+25%</div>
                                                    <div class="admin__right-sales-analytics-item-quantity">1300</div>
                                                </div>
                                            </div>
                                            <div class="admin__right-sales-analytics-item add-product">
                                                <div class="admin__right-sales-analytics-item-add-product">
                                                    <i class="uil uil-plus"></i>
                                                    <div class="admin__right-sales-analytics-item-add-product-sub">Thêm sản phẩm</div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- <div class="admin__right-sales-analytics-blur-bottom"></div> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    `;

    document.querySelector(".admin__main-to-do-list-item-wait-settlment").addEventListener('click', () => {
        showWaitingSettlment(data);
    });

    document.querySelector(".admin__main-to-do-list-item-wait-pickup").addEventListener("click", () => {
        showWaitingPickup(data);
    });

    document.querySelector(".admin__main-to-do-list-item-processed").addEventListener("click", () => {
        showProcessed(data);
    });
}

// Show Bulk delivery
function showBulkDelivery(data) {
    noticeIncompleteFunc();
}

// Show Cancellation
function showCancellation(data) {
    noticeIncompleteFunc();
}

// Show Return Refund
function showReturnRefund(data) {
    noticeIncompleteFunc();
}

// Show Transport Setting
function showTransortSetting(data) {
    noticeIncompleteFunc();
}

// Show Add Product 
function showAddProduct(data) {
    noticeIncompleteFunc();
}

// Show Promotion
function showPromotion(data) {
    noticeIncompleteFunc();
}

// Show Discount
function showDiscount(data) {
    noticeIncompleteFunc();
}

function showAllProduct(data) {
    let htmlAllProduct = "";
    htmlAllProduct += 
    `
                    <div class="admin__product">
                        <div class="admin__add-product-container">
                            <div class="admin__add-product-header">
                                <div class="admin__add-product-header-item active">
                                    Tất cả
                                </div>
                                <div class="admin__add-product-header-item">
                                    Sản phẩm ẩn
                                </div>
                                <div class="admin__add-product-header-item">
                                    Sản phẩm hết hàng
                                </div>
                                <div class="admin__add-product-header-item">
                                    Bị khoá
                                </div>
                            </div>
                            <div class="admin__setup-shop-body">
                                <div class="admin__setup-shop-container">
                                    <div class="admin__profile-shop-body-header">
                                        <div class="admin__add-product-title">
                                            ${data.products.length} sản phẩm
                                        </div>
                                    </div>
                                    <div class="admin__product-container">
                                        <div class="admin__product-header">
                                            <div class="admin__product-item-input">
                                                <input type="checkbox" class="admin__product-item-input-checkbox" name="" id="">
                                            </div>
                                            <div class="admin__product-header-sub">Sản phẩm</div>
                                            <div class="admin__product-header-type">Phân loại</div>
                                            <div class="admin__product-header-cre-time">Thời gian tạo</div>
                                            <div class="admin__product-header-up-time">Thời gian cập nhật</div>
                                            <div class="admin__product-header-qnt">Số lượng</div>
                                            <div class="admin__product-header-operation">Thao tác</div>
                                        </div>
                                        <div class="admin__product-list">`;
                                            htmlAllProduct += data.htmlProductItem;
    htmlAllProduct += `
                                        </div>
                                        <ul class="pagination admin__product-pagination">
                                            <li class="pagination-item">
                                                <a href="" class="pagination-item__link">
                                                    <i class="pagination-item__icon fas fa-angle-left"></i>
                                                </a>
                                            </li>
                                            <li class="pagination-item pagination-item--active">
                                                <a href="" class="pagination-item__link">1</a>
                                            </li>
                                            <li class="pagination-item">
                                                <a href="" class="pagination-item__link">2</a>
                                            </li>
                                            <li class="pagination-item">
                                                <a href="" class="pagination-item__link">4</a>
                                            </li>
                                            <li class="pagination-item">
                                                <a href="" class="pagination-item__link">5</a>
                                            </li>
                                            <li class="pagination-item">
                                                <a href="" class="pagination-item__link">...</a>
                                            </li>
                                            <li class="pagination-item">
                                                <a href="" class="pagination-item__link">14</a>
                                            </li>
                                            <li class="pagination-item">
                                                <a href="" class="pagination-item__link">
                                                    <i class="pagination-item__icon fas fa-angle-right"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    `;
    document.querySelector(".admin__container").innerHTML = htmlAllProduct;
}

// Update Product Modal
function openUpdateProduct(productID) {
    openModal();
    var xhr = new XMLHttpRequest();
    xhr.open('get', "/seller/product-detail/" + productID + '',true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);

            setProductDetail(data);
            
        }
    };
    xhr.send(null);
}

function setProductDetail(data) {
    let htmlUpdateProductFrom = "";
    htmlUpdateProductFrom += 
    `
            <div class="address-form">
                <div class="address-form__new">
                    <div class="admin-account__update-title">
                        Cập nhật sản phẩm
                    </div>
                    <div class="address-form__new-body">
                        <div class="admin-account__update-form">
                            <div class="admin-account__update-div">
                                <label for="" class="admin-account__update-label">Hình ảnh sản phẩm</label>
                                <div class="admin__add-product-table-col-value">
                                    <div class="admin__add-product-table-add-img-check">
                                        <div class="admin__add-product-table-add-img-rb">
                                            <input type="radio" name="ratio-img" id="" class="admin__add-product-table-add-img-input">
                                            <label for="admin__add-product-table-add-img" class="admin__add-product-table-add-img-label">Hình ảnh tỉ lệ 1:1</label>
                                        </div>
                                        <div class="admin__add-product-table-add-img-rb">
                                            <input type="radio" name="ratio-img" id="" class="admin__add-product-table-add-img-input">
                                            <label for="admin__add-product-table-add-img" class="admin__add-product-table-add-img-label">Hình ảnh tỉ lệ 3:4</label>
                                        </div>
                                    </div>
                                    <div class="admin__update-product-pic">
                                        <img src="/img/${data.products[0].sImageUrl}" class="admin__update-product-pic-value" alt="">
                                        <label class="admin__add-product-table-add-img-pic">
                                            <div class="admin__add-product-table-add-img-pic-container">
                                                <i class="uil uil-image-plus admin__add-product-table-add-img-pic-icon"></i>
                                                <div class="admin__add-product-table-add-img-pic-sub">
                                                    Cập nhật hình ảnh (0/9)
                                                </div>
                                            </div>
                                            <input type="file" accept="image/jpeg, image/png, image/jpg" class="admin__update-product-file" id="input-file">
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="admin-account__update-div">
                                <label for="" class="admin-account__update-label">Tên sản phẩm</label>
                                <input type="text" class="admin__add-product-table-input-name admin__update-product-input-name" placeholder="Tên sản phẩm + Thương hiệu + Model + Thông số kỹ thuật" value="${data.products[0].sProductName}" onblur="showPropse()">
                            </div>
                            <div class="admin-account__update-div">
                                <label for="" class="admin-account__update-label">Số lượng</label>
                                <input type="text" class="admin__add-product-table-input-name admin__update-product-input-qnt" placeholder="Số lượng sản phẩm" value="${data.products[0].iQuantity}">
                            </div>
                            <div class="admin-account__update-div">
                                <label for="" class="admin-account__update-label">Ngành hàng</label>
                                <div class="admin__add-product-table-industry-container">
                                    <input type="text" class="admin__add-product-table-industry-input admin__update-product-industry-input" readonly value="${data.products[0].sParentCategoryName} > ${data.products[0].sCategoryName}" placeholder="Chọn ngành hàng">
                                    <i class="uil uil-pen admin__add-product-table-industry-icon admin__update-product-industry-icon"></i>
                                </div>
                                <div class="admin__update-product-industry-propose">
                                    <div class="admin__add-product-table-industry">
                                        <div class="admin__add-product-table-industry-propose">
                                            <div class="admin__add-product-table-industry-propose-title">Ngành hàng được đề xuất</div>
                                            <div class="admin__add-product-table-industry-list">`;
    data.categories.forEach(element => {
        if (data.products[0].fK_iCategoryID == element.pK_iCategoryID) {
            htmlUpdateProductFrom += `
                                                <div class="admin__add-product-table-industry-propose-item admin__update-product-industry-item">
                                                    <input type="radio" checked name="category" value="${element.pK_iCategoryID}" class="admin__add-product-table-industry-propose-item-input">
                                                    <label for="admin__add-product-table-industry-propose-item-input" class="admin__add-product-table-industry-propose-item-label admin__update-product-industry-label">${element.sParentCategoryName} &gt; ${element.sCategoryName} </label>
                                                </div>`;
        } else {
            htmlUpdateProductFrom += `
                                                <div class="admin__add-product-table-industry-propose-item admin__update-product-industry-item">
                                                    <input type="radio" name="category" value="${element.pK_iCategoryID}" class="admin__add-product-table-industry-propose-item-input">
                                                    <label for="admin__add-product-table-industry-propose-item-input" class="admin__add-product-table-industry-propose-item-label admin__update-product-industry-label">${element.sParentCategoryName} &gt; ${element.sCategoryName} </label>
                                                </div>`;
        }
    
                                                });
    htmlUpdateProductFrom += `
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="admin-account__update-div">
                                <label for="" class="admin-account__update-label">Mô tả sản phẩm</label>
                                <textarea name="" class="admin__add-product-table-desc-textarea admin__update-product-input-desc">${data.products[0].sProductDescription}</textarea>
                            </div>
                            <div class="admin-account__update-div">
                                <label for="" class="admin-account__update-label">Giá</label>
                                <div class="admin__add-product-sell-table-price">
                                    <div class="admin__add-product-sell-table-price-unit">đ</div>
                                    <input type="text" value="${data.products[0].dPrice}" class="admin__add-product-sell-table-price-input admin__update-product-input-price" placeholder="Nhập vào">
                                </div>
                            </div>
                            <div class="admin-account__update-div">
                                <label for="" class="admin-account__update-label">Giảm giá (Nếu có)</label>
                                <div class="admin__add-product-sell-table-discount">
                                    <div class="admin__update-product-discount">`;
    if (data.products[0].dPerDiscount == 1) {
        htmlUpdateProductFrom += `
                                        <div class="admin__add-product-sell-table-price">
                                            <div class="admin__add-product-sell-table-price-unit">%</div>
                                            <input type="text" value="0" readonly class="admin__add-product-sell-table-price-input admin__update-product-discount-input" placeholder="Nhập vào">
                                        </div>`;
    } else {
        htmlUpdateProductFrom += `
                                        <div class="admin__add-product-sell-table-price">
                                            <div class="admin__add-product-sell-table-price-unit">%</div>
                                            <input type="text" value="${Math.floor(data.products[0].dPerDiscount * 100)}" readonly class="admin__add-product-sell-table-price-input admin__update-product-discount-input" placeholder="Nhập vào">
                                        </div>`;
    }
                                        htmlUpdateProductFrom += `
                                        <div class="admin__add-product-sell-table-type admin__update-product-dicount-type">
                                            <i class="uil uil-plus admin__add-product-sell-table-type-icon"></i>
                                            <span class="admin__add-product-sell-table-type-sub">Thêm khoảng giảm giá</span>
                                        </div>
                                    </div>
                                    <div class="admin__add-product-sell-table-discount-sub">
                                        Mua nhiều giảm giá sẽ bị ẩn khi sản phẩm đang tham gia Mua Kèm Deal Sốc hay Combo Khuyến Mãi 
                                    </div>
                                    <div class="admin__update-product-discount-choose">
                                        <div class="admin__add-product-table-industry-propose">
                                            <div class="admin__add-product-table-industry-propose-title">Mức giảm giá được đề xuất</div>
                                            <div class="admin__add-product-table-industry-list">`;
    data.discounts.forEach(element => {
        if (element.dPerDiscount == 1) {
            htmlUpdateProductFrom += `
                                                <div class="admin__add-product-table-industry-propose-item">
                                                    <input type="radio" name="discount" checked value="${element.pK_iDiscountID}" class="admin__add-product-table-industry-propose-item-input">
                                                    <label for="admin__add-product-table-industry-propose-item-input" class="admin__add-product-table-industry-propose-item-label admin__update-product-discount-label">0%</label>
                                                </div>`;
        } else if (data.products[0].fK_iDiscountID == element.pK_iDiscountID) {
            htmlUpdateProductFrom += `
                                                <div class="admin__add-product-table-industry-propose-item">
                                                    <input type="radio" checked value="${element.pK_iDiscountID}" name="discount" class="admin__add-product-table-industry-propose-item-input">
                                                    <label for="admin__add-product-table-industry-propose-item-input" class="admin__add-product-table-industry-propose-item-label admin__update-product-discount-label">${Math.floor(element.dPerDiscount * 100)}%</label>
                                                </div>`;
        } else {
            htmlUpdateProductFrom += `
                                                <div class="admin__add-product-table-industry-propose-item">
                                                    <input type="radio" name="discount" value="${element.pK_iDiscountID}" class="admin__add-product-table-industry-propose-item-input">
                                                    <label for="admin__add-product-table-industry-propose-item-input" class="admin__add-product-table-industry-propose-item-label admin__update-product-discount-label">${Math.floor(element.dPerDiscount * 100) }%</label>
                                                </div>`;
        }
    });
    
                                                htmlUpdateProductFrom += `
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="admin-account__update-div">
                                <label for="" class="admin-account__update-label">Vận chuyển</label>
                                <div class="admin__add-product-table-industry-container">
                                    <input type="text" value="${data.products[0].sTransportName} (${money_2(data.products[0].dTransportPrice)})" class="admin__add-product-table-industry-input admin__update-product-transport-input" readonly placeholder="Chọn giá vận chuyển">
                                    <i class="uil uil-pen admin__add-product-table-industry-icon admin__update-product-transport-icon"></i>
                                </div>
                                <div class="admin__update-product-transport-choose hide-on-destop">
                                    <div class="admin__add-product-table-industry-propose">
                                        <div class="admin__add-product-table-industry-propose-title">Giá vận chuyển đề xuất</div>
                                        <div class="admin__add-product-table-industry-list">`;
                                        data.transportPrices.forEach(element => {
                                            if (data.products[0].fK_iTransportID == element.pK_iTransportID) {
                                                htmlUpdateProductFrom += 
                                            `
                                            <div class="admin__add-product-table-industry-propose-item">
                                                <input type="radio" checked name="transport" value="${element.pK_iTransportID}" class="admin__add-product-table-industry-propose-item-input">
                                                <label for="admin__add-product-table-industry-propose-item-input" class="admin__add-product-table-industry-propose-item-label admin__update-product-transport-label">${element.sTransportName} (${element.sTransportPriceSub})</label>
                                            </div>
                                            `;
                                            } else {
                                                htmlUpdateProductFrom += 
                                                `
                                            <div class="admin__add-product-table-industry-propose-item">
                                                <input type="radio" name="transport" value="${element.pK_iTransportID}" class="admin__add-product-table-industry-propose-item-input">
                                                <label for="admin__add-product-table-industry-propose-item-input" class="admin__add-product-table-industry-propose-item-label admin__update-product-transport-label">${element.sTransportName} (${element.sTransportPriceSub})</label>
                                            </div>
                                                `;
                                            }
                                        });
                                        htmlUpdateProductFrom += `
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="address-form__new-footer">
                        <div class="address-form__new-footer-btns">
                            <button class="btn" onclick="closeModal()">Thoát</button>
                            <button class="btn btn--primary address-form__new-btn admin__update-product-btn-submit">Cập nhât</button>
                        </div>
                    </div>
                </div>
            </div>
    `;

    document.querySelector(".modal__body").innerHTML = htmlUpdateProductFrom;
        

    let productImage = document.querySelector(".admin__update-product-pic-value");
    let inputImage = document.getElementById("input-file");

    inputImage.onchange = () => {
        console.log(inputImage.files[0].name);
        productImage.src = URL.createObjectURL(inputImage.files[0]);
    };

    document.querySelector(".admin__update-product-industry-icon").onclick = () => {
        document.querySelector(".admin__update-product-industry-propose").classList.toggle("show");
    };

    document.querySelector(".admin__update-product-dicount-type").onclick = () => {
        document.querySelector(".admin__update-product-discount-choose").classList.toggle("show");
    };

    document.querySelector(".admin__update-product-transport-icon").onclick = () => {
        document.querySelector(".admin__update-product-transport-choose").classList.toggle("hide-on-destop");
    };

    const categoryUpdate = document.getElementsByName("category");
    let categoryCheck = "";
    for (let i = 0; i < categoryUpdate.length; i++) {
        if (categoryUpdate.item(i).checked) {
            categoryCheck = categoryUpdate.item(i).value;
        }
        categoryUpdate.item(i).onchange = () => {
            const categoryItem = categoryUpdate.item(i).parentNode;
            document.querySelector(".admin__update-product-industry-input").value = categoryItem.querySelector(".admin__update-product-industry-label").innerText;
            document.querySelector(".admin__update-product-industry-propose").classList.remove("show");
            categoryCheck = categoryUpdate.item(i).value;
        }
    }

    const discountUpdate = document.getElementsByName("discount");
    let discountCheck = "";
    for (let i = 0; i < discountUpdate.length; i++) {
        if (discountUpdate.item(i).checked) {
            discountCheck = discountUpdate.item(i).value;
        }
        discountUpdate.item(i).onchange = () => {
            const discountItem = discountUpdate.item(i).parentNode;
            document.querySelector(".admin__update-product-discount-input").value = discountItem.querySelector(".admin__update-product-discount-label").innerText[0];
            document.querySelector(".admin__update-product-discount-choose").classList.remove("show");
            discountCheck = discountUpdate.item(i).value;
        }
    }

    const transportUpdate = document.getElementsByName("transport");
    let transportCheck = "";
    for (let i = 0; i < transportUpdate.length; i++) {
        if (transportUpdate.item(i).checked) {
            transportCheck = transportUpdate.item(i).value;
        }
        transportUpdate.item(i).onchange = () => {
            const transportItem = transportUpdate.item(i).parentNode;
            document.querySelector(".admin__update-product-transport-input").value = transportItem.querySelector(".admin__update-product-transport-label").innerText;
            document.querySelector(".admin__update-product-transport-choose").classList.add("hide-on-destop");
            transportCheck = transportUpdate.item(i).value;
        }
    }

    document.querySelector(".admin__update-product-btn-submit").addEventListener("click", () => {
        const productName = document.querySelector(".admin__update-product-input-name").value;
        const productQuantity = document.querySelector(".admin__update-product-input-qnt").value;
        const productDesc = document.querySelector(".admin__update-product-input-desc").textContent;
        const productPrice = document.querySelector(".admin__update-product-input-price").value;

        const productID = data.products[0].pK_iProductID;
        const imageUrl = data.products[0].sImageUrl;
        const categoryID = parseInt(categoryCheck);
        const discountID = parseInt(discountCheck);
        const transportID = parseInt(transportCheck);
        const quantity = parseInt(productQuantity);
        const price = parseInt(productPrice);

        openModal();
        document.querySelector(".modal__body").innerHTML =
            `
                <div class="spinner"></div>
            `;
        var formData = new FormData();
        formData.append("productID", productID);
        formData.append("categoryID", categoryID);
        formData.append("discountID", discountID);
        formData.append("transportID", transportID);
        formData.append("productName", productName);
        formData.append("quantity", quantity);
        formData.append("productDesc", productDesc);
        formData.append("imageUrl", imageUrl);
        formData.append("price", price);

        var xhr = new XMLHttpRequest();
        xhr.open('post', '/seller/update-product', true);
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
                            showAllProduct(data);
                        }, 1000)
                    }, 2000);
                }
                
            }
        };
        xhr.send(formData);
    });

}

// Show Add Product
function showAddProduct(data) {
    let htmlAddProduct = "";
    htmlAddProduct += 
    `
                    <div class="admin__add-product">
                        <div class="admin__add-product-container">
                            <div class="admin__add-product-header">
                                <div class="admin__add-product-header-item active">
                                    Thông tin cơ bản
                                </div>
                                <div class="admin__add-product-header-item">
                                    Thông tin bán hàng  
                                </div>
                                <div class="admin__add-product-header-item">
                                    Vận chuyển
                                </div>
                                <div class="admin__add-product-header-item">
                                    Thông tin khác
                                </div>
                            </div>
                            <div class="admin__setup-shop-body">
                                <div class="admin__setup-shop-container">
                                    <div class="admin__profile-shop-body-header">
                                        <div class="admin__add-product-title">
                                            Thông tin cơ bản 
                                        </div>
                                    </div>
                                    <div class="admin__add-product-table">
                                        <div class="admin__add-product-table-row">
                                            <div class="admin__add-product-table-col-sub">Hình ảnh sản phẩm</div>
                                            <div class="admin__add-product-table-col-value">
                                                <div class="admin__add-product-table-add-img-check">
                                                    <div class="admin__add-product-table-add-img-rb">
                                                        <input type="radio" name="ratio-img" id="" class="admin__add-product-table-add-img-input">
                                                        <label for="admin__add-product-table-add-img" class="admin__add-product-table-add-img-label">Hình ảnh tỉ lệ 1:1</label>
                                                    </div>
                                                    <div class="admin__add-product-table-add-img-rb">
                                                        <input type="radio" name="ratio-img" id="" class="admin__add-product-table-add-img-input">
                                                        <label for="admin__add-product-table-add-img" class="admin__add-product-table-add-img-label">Hình ảnh tỉ lệ 3:4</label>
                                                    </div>
                                                </div>
                                                <div class="admin__update-product-pic">
                                                    <img src="/img/no_img.jpg" class="admin__update-product-pic-value" alt="">
                                                    <label class="admin__add-product-table-add-img-pic">
                                                        <div class="admin__add-product-table-add-img-pic-container">
                                                            <i class="uil uil-image-plus admin__add-product-table-add-img-pic-icon"></i>
                                                            <div class="admin__add-product-table-add-img-pic-sub">
                                                                Thêm hình ảnh (0/9)
                                                            </div>
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="admin__add-product-table-row">
                                            <div class="admin__add-product-table-col-sub admin__add-product-table-col-sub-center">Tên sản phẩm</div>
                                            <div class="admin__add-product-table-col-value">
                                                <input type="text" class="admin__add-product-table-input-name err" placeholder="Tên sản phẩm + Thương hiệu + Model + Thông số kỹ thuật" onblur="showPropse()">
                                                <div class="admin__add-product-msg-err">Tên sản phẩm không được trống!</div>
                                            </div>
                                        </div>
                                        <div class="admin__add-product-table-row">
                                            <div class="admin__add-product-table-col-sub admin__add-product-table-col-sub-center">Ngành hàng</div>
                                            <div class="admin__add-product-table-col-value">
                                                <div class="admin__add-product-table-industry">
                                                    <div class="admin__add-product-table-industry-container err">
                                                        <input type="text" class="admin__add-product-table-industry-input" placeholder="Chọn ngành hàng" readonly>
                                                        <i class="uil uil-pen admin__add-product-table-industry-icon"></i>
                                                    </div>
                                                    <div class="admin__add-product-msg-err">Bạn chưa chọn ngành hàng!</div>
                                                    <div class="admin__add-product-table-industry-propose">
                                                        <div class="admin__add-product-table-industry-propose-title">Ngành hàng được đề xuất</div>
                                                        <div class="admin__add-product-table-industry-list">`;
                                                        data.categories.forEach(element => {
                                                            htmlAddProduct += 
                                                            `
                                                            <div class="admin__add-product-table-industry-propose-item">
                                                                <input type="radio" name="category" value="${element.pK_iCategoryID}" class="admin__add-product-table-industry-propose-item-input">
                                                                <label for="admin__add-product-table-industry-propose-item-input" class="admin__add-product-table-industry-propose-item-label">${element.sParentCategoryName} &gt; ${element.sCategoryName} </label>
                                                            </div>
                                                            `;
                                                        });
                                                        htmlAddProduct += `
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="admin__add-product-table-row">
                                            <div class="admin__add-product-table-col-sub">Mô tả sản phẩm</div>
                                            <div class="admin__add-product-table-col-value">
                                                <textarea name="" id="" class="admin__add-product-table-desc-textarea err"></textarea>
                                                <div class="admin__add-product-msg-err">Mô tả sản phẩm không được trống!</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="admin__add-product-sell">
                                <div class="admin__setup-shop-container">
                                    <div class="admin__profile-shop-body-header">
                                        <div class="admin__add-product-title">
                                            Thông tin bán hàng
                                        </div>
                                    </div>
                                    <div class="admin__add-product-table">
                                        <div class="admin__add-product-table-row">
                                            <div class="admin__add-product-table-col-sub admin__add-product-table-col-sub-center">Giá</div>
                                            <div class="admin__add-product-table-col-value">
                                                <div class="admin__add-product-sell-table-price err l-4">
                                                    <div class="admin__add-product-sell-table-price-unit">đ</div>
                                                    <input type="text" class="admin__add-product-sell-table-price-input" placeholder="Nhập vào">
                                                </div>
                                                <div class="admin__add-product-msg-err">Giá sản phẩm không được trống!</div>
                                            </div>
                                        </div>
                                        <div class="admin__add-product-table-row">
                                            <div class="admin__add-product-table-col-sub admin__add-product-table-col-sub-center">Giảm giá</div>
                                            <div class="admin__add-product-table-col-value">
                                                <div class="admin__add-product-sell-table-discount">
                                                    <div class="admin__update-product-discount">
                                                        <div class="admin__add-product-sell-table-price err">
                                                            <div class="admin__add-product-sell-table-price-unit">%</div>
                                                            <input type="text" value="0" readonly class="admin__add-product-sell-table-price-input admin__update-product-discount-input" placeholder="Nhập vào">
                                                        </div>
                                                        <div class="admin__add-product-sell-table-type l-4">
                                                            <i class="uil uil-plus admin__add-product-sell-table-type-icon"></i>
                                                            <span class="admin__add-product-sell-table-type-sub">Thêm khoảng giảm giá</span>
                                                        </div>
                                                    </div>
                                                    <div class="admin__add-product-sell-table-discount-sub">
                                                        Mua nhiều giảm giá sẽ bị ẩn khi sản phẩm đang tham gia Mua Kèm Deal Sốc hay Combo Khuyến Mãi 
                                                    </div>
                                                    <div class="admin__add-product-msg-err">Bạn chưa chọn giảm giá!</div>
                                                    <div class="admin__add-product-table-industry-propose">
                                                        <div class="admin__add-product-table-industry-propose-title">Giảm giá được đề xuất</div>
                                                        <div class="admin__add-product-table-industry-list">`;
                                                        data.discounts.forEach(element => {
                                                            if (element.dPerDiscount == 1) {
                                                            htmlAddProduct += 
                                                            `
                                                            <div class="admin__add-product-table-industry-propose-item">
                                                                <input type="radio" name="discount" value="${element.pK_iDiscountID}" class="admin__add-product-table-industry-propose-item-input">
                                                                <label for="admin__add-product-table-industry-propose-item-input" class="admin__add-product-table-industry-propose-item-label admin__update-product-discount-label">0%</label>
                                                            </div>
                                                                `;
                                                            }
                                                            htmlAddProduct += 
                                                            `
                                                            <div class="admin__add-product-table-industry-propose-item">
                                                                <input type="radio" name="discount" class="admin__add-product-table-industry-propose-item-input">
                                                                <label for="admin__add-product-table-industry-propose-item-input" class="admin__add-product-table-industry-propose-item-label">${Math.floor(element.dPerDiscount * 100)}%</label>
                                                            </div>
                                                            `;
                                                        });
                                                        htmlAddProduct += `
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="admin__add-product-transport">
                                <div class="admin__setup-shop-container">
                                    <div class="admin__profile-shop-body-header">
                                        <div class="admin__add-product-title">
                                            Thông tin vận chuyển
                                        </div>
                                    </div>
                                    <div class="admin__add-product-table">
                                        <div class="admin__add-product-table-row">
                                            <div class="admin__add-product-table-col-sub admin__add-product-table-col-sub-center">Giá vận chuyển</div>
                                            <div class="admin__add-product-table-col-value">
                                                <div class="admin__add-product-table-industry-container err">
                                                    <input type="text" class="admin__add-product-table-industry-input admin__update-product-transport-input" readonly placeholder="Chọn giá vận chuyển">
                                                    <i class="uil uil-pen admin__add-product-table-industry-icon admin__update-product-transport-icon"></i>
                                                </div>
                                                <div class="admin__add-product-msg-err">Bạn chưa chọn giá vận chuyển cho sản phẩm!</div>
                                                <div class="admin__add-product-table-industry-propose">
                                                    <div class="admin__add-product-table-industry-propose-title">Giá vận chuyển được đề xuất</div>
                                                    <div class="admin__add-product-table-industry-list">
                                                        <div class="admin__add-product-table-industry-propose-item">
                                                            <input type="radio" class="admin__add-product-table-industry-propose-item-input">
                                                            <label for="admin__add-product-table-industry-propose-item-input" class="admin__add-product-table-industry-propose-item-label">Sắc đẹp > Trang điểm mắt </label>
                                                        </div>
                                                        <div class="admin__add-product-table-industry-propose-item">
                                                            <input type="radio" class="admin__add-product-table-industry-propose-item-input">
                                                            <label for="admin__add-product-table-industry-propose-item-input" class="admin__add-product-table-industry-propose-item-label">Sắc đẹp > Kem trị mụn </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="admin__add-product-footer">
                                <div class="admin__add-product-btn">Huỷ</div>
                                <div class="admin__add-product-btn">Lưu & Ẩn</div>
                                <div class="admin__add-product-btn-save-show">Lưu & Hiển thị</div>
                            </div>
                        </div>
                    </div>
    `;
    document.querySelector(".admin__container").innerHTML = htmlAddProduct;
}

// Show Chat Management
function showChatManagement(data) {
    noticeIncompleteFunc();
}

// Show AssessmentManagement
function showAssessmentManagement(data) {
    noticeIncompleteFunc();
}

// Show Revenue
function showRevenue() {
    noticeIncompleteFunc();
}

// Show Account Balance
function showAccountBalance(data) {
    noticeIncompleteFunc();
}

// Show Bank Account
function showBankAccount(data) {
    noticeIncompleteFunc();
}

// Show Sales Analysis
function showSalesAnalysis(data) {
    noticeIncompleteFunc();
}

// Show Operating Efficienty
function showOperatingEfficienty(data) {
    noticeIncompleteFunc();
}

// Show Profile Shop 
function showProfileShop(data) {
    noticeIncompleteFunc();
}

// Show Decoration
function showDecoration(data) {
    noticeIncompleteFunc();
}

// Show Setup Shop
function showSetupShop(data) {
    noticeIncompleteFunc();
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

// Modal
function openModal() {
    document.querySelector(".modal").classList.add('open');
}

function closeModal() {
    document.querySelector(".modal").classList.remove('open');
}

function money_2(number) {
    const formattedAmount = new Intl.NumberFormat('vi-VI', {
        style: 'currency',
        currency: 'VND',
    }).format(number);
    return formattedAmount;
}