function getAPISiteAdmin() {
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/admin/get-data', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);
            
            setAccount(data);

            setSidebar(data);
        }
    };
    xhr.send(null);
}

getAPISiteAdmin();

function setAccount(data) {
    let htmlAccount = "";
    htmlAccount += 
    `
                    <div class="header__account-avatar">
                            <img src="/img/no_user.jpg" class="header__account-avatar-img" alt="">
                        </div>
                        <div class="header__account-info">
                            <span class="header__account-info-name">${data.username}</span>
                            <div class="header__account-info-down">
                                <i class="uil uil-angle-down header__account-info-icon"></i>
                            </div>
                        </div>
                        <div class="header__account-manager">
                            <ul class="header__navbar-user-menu">
                                <li class="header__navbar-user-item">
                                    <div class="header__account-manager-info">
                                        <img src="/img/no_user.jpg" alt="" class="header__account-manager-img">
                                        <div class="header__account-manager-name">${data.username}</div>
                                    </div>
                                </li>
                                <li class="header__navbar-user-item header__navbar-user-item--separate">
                                    <a href="/user/logout">
                                        <i class="uil uil-signout header__account-manager-icon"></i>
                                        Đăng xuất
                                    </a>
                                </li>
                            </ul>
                        </div>
    `;
    document.querySelector(".header__account").innerHTML = htmlAccount;
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
                                    <div class="admin__aside-sidebar-sub">Đơn huỷ</div>
                                </div>
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub">Trả hàng/Hoàn tiền</div>
                                </div>
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub">Cài đặt vận chuyển</div>
                                </div>
                            </div>
                        </div>
                        <div class="admin__aside-sidebar-link active">
                            <div class="admin__aside-sidebar-container">
                                <div class="admin__aside-sidebar-symb">
                                    <i class="uil uil-sitemap admin__aside-sidebar-icon"></i>
                                </div>
                                <div class="admin__aside-sidebar-sub">Quản lý danh mục</div>
                                <div class="admin__aside-sidebar-down">
                                    <i class="uil uil-angle-down admin__aside-sidebar-down-icon"></i>
                                </div>
                            </div>
                            <div class="admin__aside-sidebar-colappse">
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub">Tất cả danh mục</div>
                                </div>
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub" onclick="showAddProduct(event)">Thêm danh mục</div>
                                </div>
                            </div>
                        </div>
                        <div class="admin__aside-sidebar-link">
                            <div class="admin__aside-sidebar-container">
                                <div class="admin__aside-sidebar-symb">
                                    <i class="uil uil-mobile-android admin__aside-sidebar-icon"></i>
                                </div>
                                <div class="admin__aside-sidebar-sub">Tài khoản người mua</div>
                                <div class="admin__aside-sidebar-down">
                                    <i class="uil uil-angle-down admin__aside-sidebar-down-icon"></i>
                                </div>
                            </div>
                            <div class="admin__aside-sidebar-colappse">
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub admin__aside-sidebar-sub-account-all">Tất cả tài khoản</div>
                                </div>
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub">Thêm tài khoản</div>
                                </div>
                            </div>
                        </div>
                        <div class="admin__aside-sidebar-link">
                            <div class="admin__aside-sidebar-container">
                                <div class="admin__aside-sidebar-symb">
                                    <i class="uil uil-chat admin__aside-sidebar-icon"></i>
                                </div>
                                <div class="admin__aside-sidebar-sub">Tài khoản người bán</div>
                                <div class="admin__aside-sidebar-down">
                                    <i class="uil uil-angle-down admin__aside-sidebar-down-icon"></i>
                                </div>
                            </div>
                            <div class="admin__aside-sidebar-colappse">
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub">Tất cả tài khoản</div>
                                </div>
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub">Thêm tài khoản</div>
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
                                    <div class="admin__aside-sidebar-sub">Doanh thu</div>
                                </div>
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub">Số dư tài khoản Shopee</div>
                                </div>
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub">Tài khoản ngân hàng</div>
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
                                    <div class="admin__aside-sidebar-sub">Phân tích bán hàng</div>
                                </div>
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub">Hiệu quả hoạt động</div>
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

    document.querySelector(".admin__aside-sidebar-sub-account-all").addEventListener('click', () => {
        showAccountAll(data);
    });
}

// Show Bulk delivery
function showBulkDelivery(data) {
    noticeIncompleteFunc();
}

function showAccountAll(data) {
    let htmlAccountAll = "";
    htmlAccountAll += 
    `
                    <div class="admin__orders-waiting">
                        <div class="admin__add-product-container">
                            <div class="admin__add-product-header">
                                <div class="admin__add-product-header-item active">
                                    Tất cả
                                </div>
                                <div class="admin__add-product-header-item">
                                    Bị khoá 
                                </div>
                            </div>
                            <div class="admin__setup-shop-body">
                                <div class="admin__setup-shop-container">
                                    <div class="admin__profile-shop-body-header">
                                        <div class="admin__add-product-title">
                                            ${data.userInfos.length} tài khoản
                                        </div>
                                    </div>
                                    <div class="admin__order-container">
                                        <div class="admin__order-table">
                                            <div class="admin__order-table-header">
                                                <div class="admin__order-table-header-row">
                                                    <div class="admin__order-table-header-col">Tên đăng nhập</div>
                                                    <div class="admin__order-table-header-col">Email</div>
                                                    <div class="admin__order-table-header-col">Tên quyền</div>
                                                    <div class="admin__order-table-header-col">Ngày tạo</div>
                                                    <div class="admin__order-table-header-col">Khoá</div>
                                                    <div class="admin__order-table-header-col">Công cụ</div>
                                                </div>
                                            </div>
                                            <div class="admin__order-table-body">`;
                                                htmlAccountAll += data.htmlUsersInfoItem;    
    htmlAccountAll+= `                      </div>
                                        </div>
                                    </div>
                                    <a href="#" class="admin__order-more">Xem tất cả</a> 
                                </div>
                            </div>
                        </div>
                    </div>
    `;
    document.querySelector(".admin__container").innerHTML = htmlAccountAll;
}

function showAccountTool(event) {
    const parentElement = event.target.parentNode;
    parentElement.querySelector(".admin-account__more-container").classList.toggle("show");
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

// Format Date
function formatDate(date) {
    const dateFormat = new Date(date);
    return dateFormat.toLocaleDateString('en-GB'); // 24/04/2023
}