function getAPISiteAdmin() {
    let userID = getCookies("userID");
    if (userID == undefined) {
        userID = 0;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('get', '/admin/get-data?userID=' + userID + '', true);
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
                            <span class="header__account-info-name">${data.user[0].sUserName}</span>
                            <div class="header__account-info-down">
                                <i class="uil uil-angle-down header__account-info-icon"></i>
                            </div>
                        </div>
                        <div class="header__account-manager">
                            <ul class="header__navbar-user-menu">
                                <li class="header__navbar-user-item">
                                    <div class="header__account-manager-info">
                                        <img src="/img/no_user.jpg" alt="" class="header__account-manager-img">
                                        <div class="header__account-manager-name">${data.user[0].sUserName}</div>
                                    </div>
                                </li>
                                <li class="header__navbar-user-item header__navbar-user-item--separate">
                                    <a href="javascript:logoutUserAccount()">
                                        <i class="uil uil-signout header__account-manager-icon"></i>
                                        Đăng xuất
                                    </a>
                                </li>
                            </ul>
                        </div>
    `;
    document.querySelector(".header__account").innerHTML = htmlAccount;
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
                                    <i class="uil uil-apps admin__aside-sidebar-icon"></i>
                                </div>
                                <div class="admin__aside-sidebar-sub">Quản lý ngành hàng</div>
                                <div class="admin__aside-sidebar-down">
                                    <i class="uil uil-angle-down admin__aside-sidebar-down-icon"></i>
                                </div>
                            </div>
                            <div class="admin__aside-sidebar-colappse">
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub admin__sidebar-industry-all">Tất cả ngành hàng</div>
                                </div>
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub admin__sidebar-industry-add">Thêm ngành hàng</div>
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
                                    <div class="admin__aside-sidebar-sub admin__sidebar-category-all">Tất cả danh mục</div>
                                </div>
                                <div class="admin__aside-sidebar-colappse-item">
                                    <div class="admin__aside-sidebar-symb">
                                    </div>
                                    <div class="admin__aside-sidebar-sub admin__sidebar-category-add">Thêm danh mục</div>
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
                                    <div class="admin__aside-sidebar-sub admin__sidebar-account-all">Tất cả tài khoản</div>
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
                                    <div class="admin__aside-sidebar-sub admin__sidebar-seller-all">Tất cả tài khoản</div>
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

    document.querySelector(".admin__sidebar-industry-all").addEventListener('click', () => {
        showIndustries(data);
    });

    document.querySelector(".admin__sidebar-industry-add").addEventListener('click', () => {
        showIndustryAdd(data);
    });

    document.querySelector(".admin__sidebar-category-all").addEventListener('click', () => {
        showCategories(data);
    });

    document.querySelector(".admin__sidebar-category-add").addEventListener('click', () => {
        showCategoryAdd(data);
    });

    document.querySelector(".admin__sidebar-account-all").addEventListener('click', () => {
        showAccountAll(data);
    });

    document.querySelector(".admin__sidebar-seller-all").addEventListener('click', () => {
        showSellers(data);
    });

    document.querySelector(".admin__sidebar-revenue").addEventListener('click', () => {
        showRevenuies(data);
    });

    document.querySelector(".admin__sidebar-account-balance").addEventListener('click', () => {
        showAccountBalance(data);
    });

    document.querySelector(".admin__sidebar-bank-account").addEventListener('click', () => {
        showBankAccount(data);
    });

    document.querySelector(".admin__sidebar-sales-analysis").addEventListener('click', () => {
        showSalesAnalysis(data);
    });

    document.querySelector(".admin__sidebar-operating-efficiency").addEventListener('click', () => {
        showOperatingEfficienty(data);
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

// Show Industries
function showIndustries(data) {
    let htmlIndustries = "";
    htmlIndustries += 
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
                                            ${data.industries.length} ngành hàng
                                        </div>
                                    </div>
                                    <div class="admin__product-container">
                                        <div class="admin__product-header">
                                            <div class="admin__product-item-input">
                                                <input type="checkbox" class="admin__product-item-input-checkbox" name="" id="">
                                            </div>
                                            <div class="admin__product-header-sub">Ngành hàng</div>
                                            <div class="admin__product-header-cre-time">Thời gian tạo</div>
                                            <div class="admin__product-header-up-time">Thời gian cập nhật</div>
                                            <div class="admin__product-header-operation">Thao tác</div>
                                        </div>
                                        <div class="admin__product-list">`;
                                        data.industries.forEach(element => {
                                        htmlIndustries += 
                                            `
                                            <div class='admin__product-item'>
                                                <div class='admin__product-item-input'>
                                                    <input type='checkbox' class='admin__product-item-input-checkbox'>
                                                </div>
                                                <div class='admin__product-item-info'>
                                                    <div class='admin__product-item-img' style='background-image: url(/img/${element.sParentCategoryImage});'></div>
                                                    <div class='admin__product-item-desc'>
                                                        <div class='admin__product-item-name'>
                                                            ${element.sParentCategoryName}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class='admin__product-item-cre-time'>${formatDate(element.dCreateTime)}</div>
                                                <div class='admin__product-item-update-time'>${formatDate(element.dUpdateTime)}</div>
                                                <div class='admin__product-item-operation'>
                                                    <div class='admin-tool__more'>
                                                        <i class='uil uil-ellipsis-v admin-tool__more-icon'></i>
                                                        <div class='admin-tool__more-container'>
                                                            <div class='admin-tool__more-item' onclick='openUpdateIndustry(${element.pK_iParentCategoryID})'>
                                                                <i class='uil uil-pen admin-tool__more-item-icon'></i>
                                                                <span>Chỉnh sửa</span>
                                                            </div>
                                                            <div class='admin-tool__more-item' onclick='openDeleteIndustry(${element.pK_iParentCategoryID})'>
                                                                <i class='uil uil-trash admin-tool__more-item-icon'></i>
                                                                <span>Xoá</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            `;
                                        });
    htmlIndustries += `
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
    document.querySelector(".admin__container").innerHTML = htmlIndustries;
}

// Update Industry Modal
function openUpdateIndustry(industryID) {
    openModal();
    var formData = new FormData();
    formData.append("industryID", industryID);
    var xhr = new XMLHttpRequest();
    xhr.open('post', "/admin/detail-api", true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);

            setIndustryDetail(data);
            
        }
    };
    xhr.send(formData);
}

function setIndustryDetail(data) {
    let htmlUpdateIndustryForm = "";
    htmlUpdateIndustryForm += 
    `
            <div class="address-form">
                <div class="address-form__new">
                    <div class="admin-account__update-title">
                        Cập nhật ngành hàng
                    </div>
                    <div class="address-form__new-body">
                        <div class="admin-account__update-form">
                            <div class="admin-account__update-div">
                                <label for="" class="admin-account__update-label">Hình ảnh ngành hàng</label>
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
                                        <img src="/img/${data.industry[0].sParentCategoryImage}" class="admin__update-product-pic-value" alt="">
                                        <label class="admin__add-product-table-add-img-pic">
                                            <div class="admin__add-product-table-add-img-pic-container">
                                                <i class="uil uil-image-plus admin__add-product-table-add-img-pic-icon"></i>
                                                <div class="admin__add-product-table-add-img-pic-sub">
                                                    Cập nhật hình ảnh (0/1)
                                                </div>
                                            </div>
                                            <input type="file" accept="image/jpeg, image/png, image/jpg" class="admin__update-product-file" id="input-file">
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="admin-account__update-div">
                                <label for="" class="admin-account__update-label">Tên ngành hàng</label>
                                <input type="text" class="admin__add-product-table-input-name admin__update-product-input-name" placeholder="Tên ngành hàng" value="${data.industry[0].sParentCategoryName}">
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

    document.querySelector(".modal__body").innerHTML = htmlUpdateIndustryForm;
        

    let productImage = document.querySelector(".admin__update-product-pic-value");
    let inputImage = document.getElementById("input-file");

    inputImage.onchange = () => {
        console.log(inputImage.files[0].name);
        productImage.src = URL.createObjectURL(inputImage.files[0]);
    };

    document.querySelector(".admin__update-product-btn-submit").addEventListener("click", () => {
        const industryID = data.industryByID[0].pK_iParentCategoryID;
        const industryName = document.querySelector(".admin__update-product-input-name").value;
        const industryImage = data.industryByID[0].sParentCategoryImage;

        openModal();
        document.querySelector(".modal__body").innerHTML =
            `
                <div class="spinner"></div>
            `;
        console.log({industryID, industryName, industryImage});
        
        var formData = new FormData();
        formData.append("industryID", industryID);
        formData.append("industryName", industryName);
        formData.append("industryImage", industryImage);

        var xhr = new XMLHttpRequest();
        xhr.open('post', '/admin/update-industry', true);
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
                            showIndustries(data);
                        }, 1000)
                    }, 2000);
                }
                
            }
        };
        xhr.send(formData);
    });

}

function openDeleteIndustry(industryID) {
    openModal();
    document.querySelector(".modal__body").innerHTML = 
            `
                <div class="modal__confirm">
                    <div class="modal__confirm-header">
                        <div class="modal__confirm-title">Thông báo</div>
                    </div>
                    <div class="modal__confirm-desc">
                        Bạn có chắc muốn xoá ngành hàng này?
                    </div>
                    <div class="modal__confirm-btns">
                        <div class="modal__confirm-btn-destroy" onclick="closeModal()">Huỷ</div>
                        <div class="modal__confirm-btn-send"onclick="deleteIndustry(${industryID})">Đồng ý</div>
                    </div>
                </div>
            `;
}

function deleteIndustry(industryID) {
    document.querySelector(".modal__body").innerHTML = 
    `
        <div class="spinner"></div>
    `;
    var formData = new FormData();
    formData.append("industryID", industryID);

    var xhr = new XMLHttpRequest();
    xhr.open('post', '/admin/delete-industry', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);

            if (data.status.statusCode == -1) {
                setTimeout(() => {
                    closeModal();
                    toast({ title: "Thông báo", msg: `${data.status.message}`, type: "err", duration: 5000 });
                    document.querySelector(".modal__body").innerHTML = "";
                    setTimeout(() => {
                        showIndustries(data);
                    }, 1000)
                }, 2000);
            } 

            if (data.status.statusCode == 1) {
                setTimeout(() => {
                    closeModal();
                    toast({ title: "Thông báo", msg: `${data.status.message}`, type: "success", duration: 5000 });
                    document.querySelector(".modal__body").innerHTML = "";
                    setTimeout(() => {
                        showIndustries(data);
                    }, 1000)
                }, 2000);
            }
            
        }
    };
    xhr.send(formData);
}

// Show Industry Add
function showIndustryAdd(data) {
    let htmlAddIndustry = "";
    htmlAddIndustry += 
    `
                    <div class="admin__add-product">
                        <div class="admin__add-product-container">
                            <div class="admin__add-product-header">
                                <div class="admin__add-product-header-item active">
                                    Thông tin cơ bản
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
                                            <div class="admin__add-product-table-col-sub">Hình ảnh ngành hàng</div>
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
                                                    <img src="/img/no_img.jpg" class="admin__add-product-pic-value" alt="">
                                                    <label class="admin__add-product-table-add-img-pic">
                                                        <div class="admin__add-product-table-add-img-pic-container">
                                                            <i class="uil uil-image-plus admin__add-product-table-add-img-pic-icon"></i>
                                                            <div class="admin__add-product-table-add-img-pic-sub">
                                                                Thêm hình ảnh (0/1)
                                                            </div>
                                                        </div>
                                                        <input type="file" accept="image/jpeg, image/png, image/jpg" class="admin__update-product-file" id="input-file-add">
                                                    </label>
                                                </div>
                                                <div class="admin__add-product-msg-err admin__add-industry-msg-err-img hide-on-destop">Ảnh ngành hàng không được trống!</div>
                                            </div>
                                        </div>
                                        <div class="admin__add-product-table-row">
                                            <div class="admin__add-product-table-col-sub admin__add-product-table-col-sub-center">Tên sản phẩm</div>
                                            <div class="admin__add-product-table-col-value">
                                                <input type="text" class="admin__add-product-table-input-name" placeholder="Tên ngành hàng">
                                                <div class="admin__add-product-msg-err admin__add-product-msg-err-name hide-on-destop">Tên sản phẩm không được trống!</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="admin__add-product-footer">
                                <div class="admin__add-product-btn" onclick="noticeIncompleteFunc();">Huỷ</div>
                                <div class="admin__add-product-btn" onclick="noticeIncompleteFunc();">Lưu & Ẩn</div>
                                <div class="admin__add-product-btn-save-show">Lưu & Hiển thị</div>
                            </div>
                        </div>
                    </div>
    `;
    document.querySelector(".admin__container").innerHTML = htmlAddIndustry;

    let productImgAdd = document.querySelector(".admin__add-product-pic-value");
    let inputImageAdd = document.getElementById("input-file-add");

    let industryImage = ""
    inputImageAdd.onchange = () => {
        productImgAdd.src = URL.createObjectURL(inputImageAdd.files[0]);
        industryImage = inputImageAdd.files[0].name;
    };

    // addEvent();

    document.querySelector(".admin__add-product-btn-save-show").addEventListener("click", () => {
        industryImageAddValidation(industryImage);
        industryNameAddValidation();
        if (industryImageAddValidation(industryImage) && industryNameAddValidation()) {
            const industryName = document.querySelector(".admin__add-product-table-input-name").value;
            const industryImage = "no_img.jpg";
            console.log(industryName);
            
            console.log({industryName, industryImage});
            
            openModal();
            document.querySelector(".modal__body").innerHTML =
            `
                <div class="spinner"></div>
            `;
            var formData = new FormData();
            formData.append("industryName", industryName)
            formData.append("industryImage", industryImage);

            var xhr = new XMLHttpRequest();
            xhr.open('post', '/admin/add-industry', true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    const data = JSON.parse(xhr.responseText);

                    console.log(data);

                    if (data.status.statusCode == -1) {
                        setTimeout(() => {
                            closeModal();
                            toast({ title: "Thông báo", msg: `${data.status.message}`, type: "err", duration: 5000 });
                            document.querySelector(".modal__body").innerHTML = "";
                            setTimeout(() => {
                                showIndustries(data);
                            }, 1000)
                        }, 2000);
                    } 
                    
                    if (data.status.statusCode == 1) {
                        setTimeout(() => {
                            closeModal();
                            toast({ title: "Thông báo", msg: `${data.status.message}`, type: "success", duration: 5000 });
                            document.querySelector(".modal__body").innerHTML = "";
                            setTimeout(() => {
                                showIndustries(data);
                            }, 1000)
                        }, 2000);
                    }
                }
            };
            xhr.send(formData);
        }
    });
}

function showErrStyles(input, msg) {
    input.classList.add("err");
    msg.classList.remove("hide-on-destop");
}

function removeErrStyles(input, msg) {
    input.classList.remove("err");
    msg.classList.add("hide-on-destop");
}

let isValidate = true;
function industryImageAddValidation(industryImage) {
    const industryImageAddMsg = document.querySelector(".admin__add-industry-msg-err-img");

    if (industryImage === "") {
        industryImageAddMsg.classList.remove("hide-on-destop");
        industryImageAddMsg.innerHTML = "Ảnh ngành hàng không được trống!";
        isValidate = false;
    } else {
        industryImageAddMsg.classList.add("hide-on-destop");
        industryImageAddMsg.innerHTML = "";
        isValidate = true;
    }
    return isValidate;
}

function industryNameAddValidation() {
    const industryNameAddInput = document.querySelector(".admin__add-product-table-input-name");
    const industryNameAddMsg = document.querySelector(".admin__add-product-msg-err-name");
    let industryNameAdd = industryNameAddInput.value;

    if (industryNameAdd === "") {
        showErrStyles(industryNameAddInput, industryNameAddMsg);
        industryNameAddMsg.innerHTML = "Tên ngành hàng không được trống!";
        isValidate = false;
    } else {
        removeErrStyles(industryNameAddInput, industryNameAddMsg);
        industryNameAddMsg.innerHTML = "";
        isValidate = true;
    }
    return isValidate;
}

function addEvent() {
    document.querySelector(".admin__add-product-table-input-name").addEventListener('blur', () => {
        industryNameAddValidation();
    });

    document.querySelector(".admin__add-category-input-name").addEventListener('blur', () => {
        categoryNameAddValidation();
    });

    document.querySelector(".admin__add-category-textarea-desc").addEventListener("blur", () => {
        categoryDescAddValidation();
    });
}

// Show Categories
function showCategories(data) {
    let htmlCategories = "";
    htmlCategories += 
    `
                    <div class="admin__product">
                        <div class="admin__add-product-container">
                            <div class="admin__add-product-header">
                                <div class="admin__add-product-header-item active">
                                    Tất cả
                                </div>
                            </div>
                            <div class="admin__setup-shop-body">
                                <div class="admin__setup-shop-container">
                                    <div class="admin__profile-shop-body-header">
                                        <div class="admin__add-product-title">
                                            ${data.categories.length} thể loại
                                        </div>
                                    </div>
                                    <div class="admin__product-container">
                                        <div class="admin__product-header">
                                            <div class="admin__product-item-input">
                                                <input type="checkbox" class="admin__product-item-input-checkbox" name="" id="">
                                            </div>
                                            <div class="admin__product-header-sub">Thể loại</div>
                                            <div class="admin__product-header-type">Ngành hàng</div>
                                            <div class="admin__product-header-cre-time">Thời gian tạo</div>
                                            <div class="admin__product-header-up-time">Thời gian cập nhật</div>
                                            <div class="admin__product-header-operation">Thao tác</div>
                                        </div>
                                        <div class="admin__product-list">`;
                                        data.categories.forEach(element => {
                                        htmlCategories += 
                                            `
                                            <div class='admin__product-item'>
                                                <div class='admin__product-item-input'>
                                                    <input type='checkbox' class='admin__product-item-input-checkbox'>
                                                </div>
                                                <div class='admin__product-item-info'>
                                                    <div class='admin__product-item-img' style='background-image: url(/img/${element.sCategoryImage});'></div>
                                                    <div class='admin__product-item-desc'>
                                                        <div class='admin__product-item-name'>
                                                            ${element.sCategoryName}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class='admin__product-item-type'>${element.sParentCategoryName}</div>
                                                <div class='admin__product-item-cre-time'>${formatDate(element.dCreateTime)}</div>
                                                <div class='admin__product-item-cre-time'>${formatDate(element.dUpdateTime)}</div>
                                                <div class='admin__product-item-operation'>
                                                    <div class='admin-tool__more'>
                                                        <i class='uil uil-ellipsis-v admin-tool__more-icon'></i>
                                                        <div class='admin-tool__more-container'>
                                                            <div class='admin-tool__more-item' onclick='openUpdateCategory(${element.pK_iCategoryID}, ${element.fK_iParentCategoryID})'>
                                                                <i class='uil uil-pen admin-tool__more-item-icon'></i>
                                                                <span>Chỉnh sửa</span>
                                                            </div>
                                                            <div class='admin-tool__more-item' onclick='openDeleteCategory(${element.pK_iCategoryID})'>
                                                                <i class='uil uil-trash admin-tool__more-item-icon'></i>
                                                                <span>Xoá</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            `;
                                        });
    htmlCategories += `
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
    document.querySelector(".admin__container").innerHTML = htmlCategories;
}

function openUpdateCategory(categoryID, industryID) {
    openModal();
    var formData = new FormData();
    formData.append("categoryID", categoryID);
    formData.append("industryID", industryID);
    var xhr = new XMLHttpRequest();
    xhr.open('post', "/admin/detail-api", true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);

            setCategoryDetail(data);
            
        }
    };
    xhr.send(formData);
}

function setCategoryDetail(data) {
    let htmlUpdateCategoryForm = "";
    htmlUpdateCategoryForm += 
    `
            <div class="address-form">
                <div class="address-form__new">
                    <div class="admin-account__update-title">
                        Cập nhật thể loại
                    </div>
                    <div class="address-form__new-body">
                        <div class="admin-account__update-form">
                            <div class="admin-account__update-div">
                                <label for="" class="admin-account__update-label">Hình ảnh thể loại</label>
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
                                        <img src="/img/${data.category[0].sCategoryImage}" class="admin__update-product-pic-value" alt="">
                                        <label class="admin__add-product-table-add-img-pic">
                                            <div class="admin__add-product-table-add-img-pic-container">
                                                <i class="uil uil-image-plus admin__add-product-table-add-img-pic-icon"></i>
                                                <div class="admin__add-product-table-add-img-pic-sub">
                                                    Cập nhật hình ảnh (0/1)
                                                </div>
                                            </div>
                                            <input type="file" accept="image/jpeg, image/png, image/jpg" class="admin__update-product-file" id="input-file">
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="admin-account__update-div">
                                <label for="" class="admin-account__update-label">Tên thể loại</label>
                                <input type="text" class="admin__add-product-table-input-name admin__update-product-input-name" placeholder="Tên thể loại" value="${data.category[0].sCategoryName}">
                            </div>
                            <div class="admin-account__update-div">
                                <label for="" class="admin-account__update-label">Ngành hàng</label>
                                <div class="admin__add-product-table-industry-container">
                                    <input type="text" class="admin__add-product-table-industry-input admin__update-product-industry-input" readonly value="${data.category[0].sParentCategoryName}" placeholder="Chọn ngành hàng">
                                    <i class="uil uil-pen admin__add-product-table-industry-icon admin__update-product-industry-icon"></i>
                                </div>
                                <div class="admin__update-product-industry-propose">
                                    <div class="admin__add-product-table-industry">
                                        <div class="admin__add-product-table-industry-propose">
                                            <div class="admin__add-product-table-industry-propose-title">Ngành hàng được đề xuất</div>
                                            <div class="admin__add-product-table-industry-list">`;
    data.industries.forEach(element => {
        if (data.category[0].fK_iParentCategoryID == element.pK_iParentCategoryID) {
            htmlUpdateCategoryForm += `
                                                <div class="admin__add-product-table-industry-propose-item admin__update-product-industry-item">
                                                    <input type="radio" checked name="industry" value="${element.pK_iParentCategoryID}" class="admin__add-product-table-industry-propose-item-input">
                                                    <label for="admin__add-product-table-industry-propose-item-input" class="admin__add-product-table-industry-propose-item-label admin__update-product-industry-label">${element.sParentCategoryName}</label>
                                                </div>`;
        } else {
            htmlUpdateCategoryForm += `
                                                <div class="admin__add-product-table-industry-propose-item admin__update-product-industry-item">
                                                    <input type="radio" name="industry" value="${element.pK_iParentCategoryID}" class="admin__add-product-table-industry-propose-item-input">
                                                    <label for="admin__add-product-table-industry-propose-item-input" class="admin__add-product-table-industry-propose-item-label admin__update-product-industry-label">${element.sParentCategoryName}</label>
                                                </div>`;
        }
    
                                                });
                                                htmlUpdateCategoryForm += `
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="admin-account__update-div">
                                <label for="" class="admin-account__update-label">Mô tả thể loại</label>
                                <textarea name="" class="admin__add-product-table-desc-textarea admin__update-category-input-desc">${data.category[0].sCategoryDescription}</textarea>
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
    document.querySelector(".modal__body").innerHTML = htmlUpdateCategoryForm;

    let categoryImgAdd = document.querySelector(".admin__add-product-pic-value");
    let inputImageAdd = document.getElementById("input-file");

    inputImageAdd.onchange = () => {
        categoryImgAdd.src = URL.createObjectURL(inputImageAdd.files[0]);
    };

    document.querySelector(".admin__update-product-industry-icon").onclick = () => {
        document.querySelector(".admin__update-product-industry-propose").classList.toggle("show");
    };

    const industryUpdate = document.getElementsByName("industry");
    let industryCheck = "";
    for (let i = 0; i < industryUpdate.length; i++) {
        if (industryUpdate.item(i).checked) {
            industryCheck = industryUpdate.item(i).value;
        }
        industryUpdate.item(i).onchange = () => {
            const categoryItem = industryUpdate.item(i).parentNode;
            document.querySelector(".admin__update-product-industry-input").value = categoryItem.querySelector(".admin__update-product-industry-label").innerText;
            document.querySelector(".admin__update-product-industry-propose").classList.remove("show");
            industryCheck = industryUpdate.item(i).value;
        }
    }

    document.querySelector(".admin__update-product-btn-submit").addEventListener("click", () => {
        const categoryID = data.category[0].pK_iCategoryID;
        const industryID = parseInt(industryCheck);
        const categoryName = document.querySelector(".admin__update-product-input-name").value;
        const categoryDesc = document.querySelector(".admin__update-category-input-desc").value;
        const categoryImage = data.category[0].sCategoryImage;

        openModal();
        document.querySelector(".modal__body").innerHTML =
            `
                <div class="spinner"></div>
            `;
        console.log({categoryID, industryID, categoryName, categoryDesc, categoryImage});
        
        var formData = new FormData();
        formData.append("categoryID", categoryID);
        formData.append("industryID", industryID);
        formData.append("categoryName", categoryName);
        formData.append("categoryDesc", categoryDesc);
        formData.append("categoryImage", categoryImage);

        var xhr = new XMLHttpRequest();
        xhr.open('post', '/admin/update-category', true);
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
                            showCategories(data);
                        }, 1000)
                    }, 2000);
                } else {
                    setTimeout(() => {
                        closeModal();
                        toast({ title: "Thông báo", msg: `${data.status.message}`, type: "err", duration: 5000 });
                        document.querySelector(".modal__body").innerHTML = "";
                        setTimeout(() => {
                            showCategories(data);
                        }, 1000)
                    }, 2000);
                }
                
            }
        };
        xhr.send(formData);
    });
}

function openDeleteCategory(categoryID) {
    openModal();
    document.querySelector(".modal__body").innerHTML = 
            `
                <div class="modal__confirm">
                    <div class="modal__confirm-header">
                        <div class="modal__confirm-title">Thông báo</div>
                    </div>
                    <div class="modal__confirm-desc">
                        Bạn có chắc muốn xoá thể loại này?
                    </div>
                    <div class="modal__confirm-btns">
                        <div class="modal__confirm-btn-destroy" onclick="closeModal()">Huỷ</div>
                        <div class="modal__confirm-btn-send"onclick="deleteCategory(${categoryID})">Đồng ý</div>
                    </div>
                </div>
            `;
}

function deleteCategory(categoryID) {
    document.querySelector(".modal__body").innerHTML = 
    `
        <div class="spinner"></div>
    `;
    var formData = new FormData();
    formData.append("categoryID", categoryID);

    var xhr = new XMLHttpRequest();
    xhr.open('post', '/admin/delete-category', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);

            if (data.status.statusCode == -1) {
                setTimeout(() => {
                    closeModal();
                    toast({ title: "Thông báo", msg: `${data.status.message}`, type: "err", duration: 5000 });
                    document.querySelector(".modal__body").innerHTML = "";
                    setTimeout(() => {
                        showCategories(data);
                    }, 1000)
                }, 2000);
            } 

            if (data.status.statusCode == 1) {
                setTimeout(() => {
                    closeModal();
                    toast({ title: "Thông báo", msg: `${data.status.message}`, type: "success", duration: 5000 });
                    document.querySelector(".modal__body").innerHTML = "";
                    setTimeout(() => {
                        showCategories(data);
                    }, 1000)
                }, 2000);
            }
            
        }
    };
    xhr.send(formData);
}

// Show Category Add
function showCategoryAdd(data) {
    let htmlAddCategory = "";
    htmlAddCategory += 
    `
                    <div class="admin__add-product">
                        <div class="admin__add-product-container">
                            <div class="admin__add-product-header">
                                <div class="admin__add-product-header-item active">
                                    Thông tin cơ bản
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
                                            <div class="admin__add-product-table-col-sub">Hình ảnh thể loại</div>
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
                                                    <img src="/img/no_img.jpg" class="admin__add-product-pic-value" alt="">
                                                    <label class="admin__add-product-table-add-img-pic">
                                                        <div class="admin__add-product-table-add-img-pic-container">
                                                            <i class="uil uil-image-plus admin__add-product-table-add-img-pic-icon"></i>
                                                            <div class="admin__add-product-table-add-img-pic-sub">
                                                                Thêm hình ảnh (0/1)
                                                            </div>
                                                        </div>
                                                        <input type="file" accept="image/jpeg, image/png, image/jpg" class="admin__update-product-file" id="input-file-add">
                                                    </label>
                                                </div>
                                                <div class="admin__add-product-msg-err admin__add-category-msg-err-img hide-on-destop">Ảnh thể loại không được trống!</div>
                                            </div>
                                        </div>
                                        <div class="admin__add-product-table-row">
                                            <div class="admin__add-product-table-col-sub admin__add-product-table-col-sub-center">Tên thể loại</div>
                                            <div class="admin__add-product-table-col-value">
                                                <input type="text" class="admin__add-product-table-input-name admin__add-category-input-name" placeholder="Tên thể loại">
                                                <div class="admin__add-product-msg-err admin__add-product-msg-err-name hide-on-destop">Tên sản phẩm không được trống!</div>
                                            </div>
                                        </div>
                                        <div class="admin__add-product-table-row">
                                            <div class="admin__add-product-table-col-sub admin__add-product-table-col-sub-center">Ngành hàng</div>
                                            <div class="admin__add-product-table-col-value">
                                                <div class="admin__add-product-table-industry">
                                                    <div class="admin__add-product-table-industry-container">
                                                        <input type="text" class="admin__add-product-table-industry-input" placeholder="Chọn ngành hàng" readonly>
                                                        <i class="uil uil-pen admin__add-product-table-industry-icon"></i>
                                                    </div>
                                                    <div class="admin__add-product-msg-err admin__add-product-msg-err-category hide-on-destop">Bạn chưa chọn ngành hàng!</div>
                                                    <div class="admin__add-product-table-industry-propose hide-on-destop">
                                                        <div class="admin__add-product-table-industry-propose-title">Ngành hàng được đề xuất</div>
                                                        <div class="admin__add-product-table-industry-list">`;
                                                        data.industries.forEach(element => {
                                                            htmlAddCategory += 
                                                            `
                                                            <div class="admin__add-product-table-industry-propose-item">
                                                                <input type="radio" name="industry" value="${element.pK_iParentCategoryID}" class="admin__add-product-table-industry-propose-item-input">
                                                                <label for="admin__add-product-table-industry-propose-item-input" class="admin__add-product-table-industry-propose-item-label">${element.sParentCategoryName}</label>
                                                            </div>
                                                            `;
                                                        });
                                                        htmlAddCategory += `
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="admin__add-product-table-row">
                                            <div class="admin__add-product-table-col-sub">Mô tả thể loại</div>
                                            <div class="admin__add-product-table-col-value">
                                                <textarea name="" id="" class="admin__add-product-table-desc-textarea admin__add-category-textarea-desc"></textarea>
                                                <div class="admin__add-product-msg-err admin__add-category-msg-err-desc hide-on-destop">Mô tả sản phẩm không được trống!</div>
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
    document.querySelector(".admin__container").innerHTML = htmlAddCategory;

    let categoryImgAdd = document.querySelector(".admin__add-product-pic-value");
    let inputImageAdd = document.getElementById("input-file-add");

    let categoryImage = "";
    inputImageAdd.onchange = () => {
        categoryImgAdd.src = URL.createObjectURL(inputImageAdd.files[0]);
        categoryImage = "category/no_img.jpg";
    };

    document.querySelector(".admin__add-product-table-industry-icon").onclick = () => {
        document.querySelector(".admin__add-product-table-industry-propose").classList.toggle("hide-on-destop");
    };

    const industryAdd = document.getElementsByName("industry");
    let industryCheck = "";
    for (let i = 0; i < industryAdd.length; i++) {
        if (industryAdd.item(i).checked) {
            industryCheck = industryAdd.item(i).value;
        }
        industryAdd.item(i).onchange = () => {
            const categoryItem = industryAdd.item(i).parentNode;
            document.querySelector(".admin__add-product-table-industry-input").value = categoryItem.querySelector(".admin__add-product-table-industry-propose-item-label").innerText;
            document.querySelector(".admin__add-product-table-industry-propose").classList.add("hide-on-destop");
            removeErrStyles(document.querySelector(".admin__add-product-table-industry-container"), document.querySelector(".admin__add-product-msg-err-category"))
            industryCheck = industryAdd.item(i).value;
        }
    }

    addEvent();

    document.querySelector(".admin__add-product-btn-save-show").addEventListener('click', () => {
        categoryImageAddValidation(categoryImage);
        categoryNameAddValidation();
        industryNameAddValidation();
        categoryDescAddValidation();
        if (categoryImageAddValidation(categoryImage) && categoryNameAddValidation() && industryNameAddValidation() && categoryDescAddValidation()) {
            openModal();
            document.querySelector(".modal__body").innerHTML =
            `
                <div class="spinner"></div>
            `;
            const categoryName = document.querySelector(".admin__add-product-table-input-name").value;
            const industryID = parseInt(industryCheck);
            const categoryDesc = document.querySelector(".admin__add-category-textarea-desc").value;
            console.log({categoryImage, categoryName, industryID, categoryDesc});
            
            var formData = new FormData();
            formData.append("industryID", industryID);
            formData.append("categoryName", categoryName);
            formData.append("categoryImage", categoryImage);
            formData.append("categoryDesc", categoryDesc);
            
            var xhr = new XMLHttpRequest();
            xhr.open('post', '/admin/add-category', true);
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
                                showCategories(data);
                            }, 1000)
                        }, 2000);
                    } else {
                        setTimeout(() => {
                            closeModal();
                            toast({ title: "Thông báo", msg: `${data.status.message}`, type: "err", duration: 5000 });
                            document.querySelector(".modal__body").innerHTML = "";
                            setTimeout(() => {
                                showCategories(data);
                            }, 1000)
                        }, 2000);
                    }
                    
                }
            };
            xhr.send(formData);
        }
    });
}

function categoryImageAddValidation(categoryImage) {
    const categoryImageAddMsg = document.querySelector(".admin__add-category-msg-err-img");

    if (categoryImage === "") {
        categoryImageAddMsg.classList.remove("hide-on-destop");
        categoryImageAddMsg.innerHTML = "Ảnh ngành hàng không được trống!";
        isValidate = false;
    } else {
        categoryImageAddMsg.classList.add("hide-on-destop");
        categoryImageAddMsg.innerHTML = "";
        isValidate = true;
    }
    return isValidate;
}

function categoryNameAddValidation() {
    const categoryNameAddInput = document.querySelector(".admin__add-category-input-name");
    const categoryNameAddMsg = document.querySelector(".admin__add-product-msg-err-name");
    let categoryNameAdd = categoryNameAddInput.value;

    if (categoryNameAdd === "") {
        showErrStyles(categoryNameAddInput, categoryNameAddMsg);
        categoryNameAddMsg.innerHTML = "Tên thể loại không được trống!";
        isValidate = false;
    } else {
        removeErrStyles(categoryNameAddInput, categoryNameAddMsg);
        categoryNameAddMsg.innerHTML = "";
        isValidate = true;
    }
    return isValidate;
}

function industryNameAddValidation() {
    const industryNameAddInput = document.querySelector(".admin__add-product-table-industry-container");
    const industryNameAddMsg = document.querySelector(".admin__add-product-msg-err-category");
    let industryNameAdd = document.querySelector(".admin__add-product-table-industry-input").value;

    if (industryNameAdd === "") {
        showErrStyles(industryNameAddInput, industryNameAddMsg);
        industryNameAddMsg.innerHTML = "Bạn chưa chọn ngành hàng!";
        document.querySelector(".admin__add-product-table-industry-propose").classList.remove("hide-on-destop");
        isValidate = false;
    } else {
        removeErrStyles(industryNameAddInput, industryNameAddMsg);
        industryNameAddMsg.innerHTML = "";
        isValidate = true;
    }
    return isValidate;
}

function categoryDescAddValidation() {
    const categoryDescAddInput = document.querySelector(".admin__add-category-textarea-desc");
    const categoryDescAddMsg = document.querySelector(".admin__add-category-msg-err-desc");
    let categoryDescAdd = categoryDescAddInput.value;

    if (categoryDescAdd === "") {
        showErrStyles(categoryDescAddInput, categoryDescAddMsg);
        categoryDescAddMsg.innerHTML = "Mô tả thể loại không được trống!";
        isValidate = false;
    } else {
        removeErrStyles(categoryDescAddInput, categoryDescAddMsg);
        categoryDescAddMsg.innerHTML = "";
        isValidate = true;
    }
    return isValidate;
}

// Account All
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

// Show Seller
function showSellers(data) {
    noticeIncompleteFunc();
}

// Show Revenuies 
function showRevenuies(data) {
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