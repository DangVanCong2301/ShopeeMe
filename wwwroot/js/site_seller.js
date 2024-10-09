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
                                    <a href="javascript:showAll(event)" class="admin__aside-sidebar-sub">Tất cả</a>
                                </div>
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub">Giao hàng loạt</div>
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
                                    <div class="admin__aside-sidebar-sub" onclick="showAddProduct(event)">Thêm sản phẩm</div>
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
                                    <div class="admin__aside-sidebar-sub">Khuyến mãi của Shop</div>
                                </div>
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub">Mã giảm giá của Shop</div>
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
                                    <div class="admin__aside-sidebar-sub">Quản lý Chat</div>
                                </div>
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub">Quản lý đánh giá</div>
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
                                    <div class="admin__aside-sidebar-sub" onclick="showProfileShop()">Hồ sơ Shop</div>
                                </div>
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub">Trang trí Shop</div>
                                </div>
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub" onclick="showSetupShop()">Thiết lập Shop</div>
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

    document.querySelector(".admin__sidebar-all-product").addEventListener('click', () => {
        showAllProduct(data);
    });
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
            
        }
    };
    xhr.send(null);
    document.querySelector(".modal__body").innerHTML = 
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
                                        <img src="./assets/img/tai_nghe_5.jpg" class="admin__update-product-pic-value" alt="">
                                        <div class="admin__add-product-table-add-img-pic">
                                            <div class="admin__add-product-table-add-img-pic-container">
                                                <i class="uil uil-image-plus admin__add-product-table-add-img-pic-icon"></i>
                                                <div class="admin__add-product-table-add-img-pic-sub">
                                                    Cập nhật hình ảnh (0/9)
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="admin-account__update-div">
                                <label for="" class="admin-account__update-label">Tên sản phẩm</label>
                                <input type="text" class="admin__add-product-table-input-name" placeholder="Tên sản phẩm + Thương hiệu + Model + Thông số kỹ thuật" onblur="showPropse()">
                            </div>
                            <div class="admin-account__update-div">
                                <label for="" class="admin-account__update-label">Ngành hàng</label>
                                <div class="admin__add-product-table-industry">
                                    <div class="admin__add-product-table-industry-container">
                                        <input type="text" class="admin__add-product-table-industry-input" placeholder="Chọn ngành hàng">
                                        <i class="uil uil-pen admin__add-product-table-industry-icon"></i>
                                    </div>
                                    <div class="admin__add-product-table-industry-propose">
                                        <div class="admin__add-product-table-industry-propose-title">Ngành hàng được đề xuất</div>
                                        <div class="admin__add-product-table-industry-list">
                                            <div class="admin__add-product-table-industry-propose-item">
                                                <input type="radio" class="admin__add-product-table-industry-propose-item-input">
                                                <label for="admin__add-product-table-industry-propose-item-input" class="admin__add-product-table-industry-propose-item-label">Sắc đẹp &gt; Trang điểm mắt </label>
                                            </div>
                                            <div class="admin__add-product-table-industry-propose-item">
                                                <input type="radio" class="admin__add-product-table-industry-propose-item-input">
                                                <label for="admin__add-product-table-industry-propose-item-input" class="admin__add-product-table-industry-propose-item-label">Sắc đẹp &gt; Kem trị mụn </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="admin-account__update-div">
                                <label for="" class="admin-account__update-label">Mô tả sản phẩm</label>
                                <textarea name="" id="" class="admin__add-product-table-desc-textarea"></textarea>
                            </div>
                            <div class="admin-account__update-div">
                                <label for="" class="admin-account__update-label">Giá</label>
                                <div class="admin__add-product-sell-table-price">
                                    <div class="admin__add-product-sell-table-price-unit">đ</div>
                                    <input type="text" class="admin__add-product-sell-table-price-input" placeholder="Nhập vào">
                                </div>
                            </div>
                            <div class="admin-account__update-div">
                                <label for="" class="admin-account__update-label">Giảm giá (Nếu có)</label>
                                <div class="admin__add-product-sell-table-discount">
                                    <div class="admin__add-product-sell-table-type l-6">
                                        <i class="uil uil-plus admin__add-product-sell-table-type-icon"></i>
                                        <span class="admin__add-product-sell-table-type-sub">Thêm khoảng giảm giá</span>
                                    </div>
                                    <div class="admin__add-product-sell-table-discount-sub">
                                        Mua nhiều giảm giá sẽ bị ẩn khi sản phẩm đang tham gia Mua Kèm Deal Sốc hay Combo Khuyến Mãi 
                                    </div>
                                </div>
                            </div>
                            <div class="admin-account__update-div">
                                <label for="" class="admin-account__update-label">Vận chuyển</label>
                                <div class="admin__add-product-table-industry-container">
                                    <input type="text" class="admin__add-product-table-industry-input" placeholder="Chọn ngành hàng">
                                    <i class="uil uil-pen admin__add-product-table-industry-icon"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="address-form__new-footer">
                        <div class="address-form__new-footer-btns">
                            <button class="btn" onclick="closeModal()">Thoát</button>
                            <button class="btn btn--primary address-form__new-btn">Cập nhât</button>
                        </div>
                    </div>
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