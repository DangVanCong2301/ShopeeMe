// Validate Register Seller
function showErrStyles(input, msg) {
    input.classList.add("err");
    msg.classList.remove("hide-on-destop");
}

function removeErrStyles(input, msg) {
    input.classList.remove("err");
    msg.classList.add("hide-on-destop");
}
let isValidate = true;

function phoneSellerRegisValidate() {
    const phoneSellerRegisInput = document.querySelector(".seller-auth__regis-input-phone");
    const phoneSellerRegisMsg = document.querySelector(".seller-auth__msg-regis-phone");
    let phoneRegis = phoneSellerRegisInput.value;

    const constainsNumber = () => {
        for (let i = 0; i < phoneRegis.length; i++) {
            if (isNaN(parseInt(phoneRegis[i]))) {
                return true;
                break;
            }
        }
        return false;
    }; 

    if (phoneRegis === "") {
        showErrStyles(phoneSellerRegisInput, phoneSellerRegisMsg);
        phoneSellerRegisMsg.innerHTML = "Số điện thoại không được trống!";
        isValidate = false;
    } else if (constainsNumber()) {
        showErrStyles(phoneSellerRegisInput, phoneSellerRegisMsg);
        phoneSellerRegisMsg.innerHTML = "Số điện thoại không được chứa ký tự!";
        isValidate = false;
    } else {
        removeErrStyles(phoneSellerRegisInput, phoneSellerRegisMsg);
        phoneSellerRegisMsg.innerHTML = "";
        isValidate = true;
    }
    return isValidate;
}

function setPasswordSellerRegisValidate() {
    const passwordSellerRegisInput = document.querySelector(".seller-confirm__method-body-input-password");
    const passwordSellerRegisMsg = document.querySelector(".seller-auth__msg-regis-passowrd");
    let passwordRegis = passwordSellerRegisInput.value;

    if (passwordRegis === "") {
        showErrStyles(passwordSellerRegisInput, passwordSellerRegisMsg);
        passwordSellerRegisMsg.innerHTML = "Mật khẩu không được trống!";
        isValidate = false;
    } else {
        removeErrStyles(passwordSellerRegisInput, passwordSellerRegisMsg);
        passwordSellerRegisMsg.innerHTML = "";
        isValidate = true;
    }
    return isValidate;
}

const addEventSellerRegis = (() => {
    const phoneSellerRegisInput = document.querySelector(".seller-auth__regis-input-phone");
    const submitSellerRegisBtn = document.querySelector(".seller-auth__regis-btn");

    phoneSellerRegisInput.addEventListener("blur", () => {
        phoneSellerRegisValidate();
    });

    submitSellerRegisBtn.addEventListener("click", () => {
        phoneSellerRegisValidate();
        if (phoneSellerRegisValidate()) {
            openConfirmModal(phoneSellerRegisInput.value);
        }
    });
})();

function openConfirmModal(number) {
    openModal();
    document.querySelector(".modal__body").innerHTML = 
    `
        <div class="modal__confirm">
            <div class="modal__confirm-text">Chúng tôi sẽ gửi mã xác minh qua Zalo đến (+84) ${number}</div>
            <div class="modal__confirm-btns">
                <div class="modal__confirm-btn-destroy" onclick="closeModal()">Huỷ</div>
                <div class="modal__confirm-btn-method" onclick="openConfirmPage(${number})">Các phương pháp khác</div>
                <div class="modal__confirm-btn-send" onclick="openZaloConfirm(${number})">Gửi đến Zalo</div>
            </div>
        </div>
    `;
}

function openConfirmPage(number) {
    closeModal();
    document.querySelector(".app__container").innerHTML = 
    `
                <div class="seller-confirm grid wide">
                    <div class="seller-confirm__steps">
                        <div class="seller-confirm__step active">
                            <div class="seller-confirm__step-numb">1</div>
                            <div class="seller-confirm__step-sub">Xác minh số điện thoại</div>
                        </div>
                        <div class="seller-confirm__vector">
                        </div>
                        <div class="seller-confirm__step">
                            <div class="seller-confirm__step-numb">2</div>
                            <div class="seller-confirm__step-sub">Tạo mật khẩu</div>
                        </div>
                        <div class="seller-confirm__vector">
                        </div>
                        <div class="seller-confirm__step">
                            <div class="seller-confirm__step-numb">
                                <i class="uil uil-check seller-confirm__step-numb-icon"></i>
                            </div>
                            <div class="seller-confirm__step-sub">Hoàn thành</div>
                        </div>
                    </div>
                    <div class="seller-confirm__method">
                        <div class="seller-confirm__method-container">
                            <div class="seller-confirm__method-header">
                                <div class="seller-confirm__method-header-back" onclick="backMainPage()">
                                    <i class="uil uil-arrow-left seller-confirm__method-header-back-icon"></i>
                                </div>
                                <div class="seller-confirm__method-header-sub">Chọn phương thức xác minh</div>
                            </div>
                            <div class="seller-confirm__method-body">
                                <div class="seller-confirm__method-body-sub">
                                    Chọn một trong các phương thức bên dưới để gửi mã xác minh đến 
                                    <div class="seller-confirm__method-sub-phone">(+84) ${number}</div>
                                </div>
                                <div class="seller-confirm__method-list">
                                    <div class="seller-confirm__method-item" onclick="openZaloConfirm(${number})">
                                        <div class="seller-confirm__method-item-img">
                                            <img src="/img/zalo_img.png" class="seller-confirm__method-item-thumb" alt="">
                                        </div>
                                        <div class="seller-confirm__method-item-sub">Zalo</div>
                                    </div>
                                    <div class="seller-confirm__method-item">
                                        <div class="seller-confirm__method-item-box">
                                            <i class="uil uil-comment-dots seller-confirm__method-item-icon"></i>
                                        </div>
                                        <div class="seller-confirm__method-item-sub">Tin nhắn SMS</div>
                                    </div>
                                    <div class="seller-confirm__method-item">
                                        <div class="seller-confirm__method-item-box">
                                            <i class="uil uil-phone seller-confirm__method-item-icon"></i>
                                        </div>
                                        <div class="seller-confirm__method-item-sub">Cuộc gọi thoại</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    `;
}

function openZaloConfirm(number) {
    closeModal();
    document.querySelector(".app__container").innerHTML = 
    `
                <div class="seller-confirm grid wide">
                    <div class="seller-confirm__steps">
                        <div class="seller-confirm__step active">
                            <div class="seller-confirm__step-numb">1</div>
                            <div class="seller-confirm__step-sub">Xác minh số điện thoại</div>
                        </div>
                        <div class="seller-confirm__vector">
                        </div>
                        <div class="seller-confirm__step">
                            <div class="seller-confirm__step-numb">2</div>
                            <div class="seller-confirm__step-sub">Tạo mật khẩu</div>
                        </div>
                        <div class="seller-confirm__vector">
                        </div>
                        <div class="seller-confirm__step">
                            <div class="seller-confirm__step-numb">
                                <i class="uil uil-check seller-confirm__step-numb-icon"></i>
                            </div>
                            <div class="seller-confirm__step-sub">Hoàn thành</div>
                        </div>
                    </div>
                    <div class="seller-confirm__method">
                        <div class="seller-confirm__method-container">
                            <div class="seller-confirm__method-header">
                                <div class="seller-confirm__method-header-back">
                                    <i class="uil uil-arrow-left seller-confirm__method-header-back-icon"></i>
                                </div>
                                <div class="seller-confirm__method-header-sub">Nhập mã xác nhận</div>
                            </div>
                            <div class="seller-confirm__method-body">
                                <div class="seller-confirm__method-body-sub">
                                    Mã xác thực sẽ được gửi qua Zalo đến 
                                    <div class="seller-confirm__method-zalo">
                                        <img src="/img/zalo_img.png" class="seller-confirm__method-zalo-img" alt="">
                                        <div class="seller-confirm__method-zalo-phone">(+84) ${number}</div>
                                    </div>
                                </div>
                                <div class="seller-confirm__method-body-enter">
                                    <input type="password" value="1" class="seller-confirm__method-body-input">
                                    <input type="password" value="1" class="seller-confirm__method-body-input">
                                    <input type="password" value="1" class="seller-confirm__method-body-input">
                                    <input type="password" value="1" class="seller-confirm__method-body-input">
                                    <input type="password" value="1" class="seller-confirm__method-body-input">
                                    <input type="password" value="1" class="seller-confirm__method-body-input">
                                </div>
                                <div class="seller-confirm__method-body-please">Vui lòng chờ 20 giây để thử lại</div>
                                <div class="seller-confirm__method-btn" onclick="openPasswordConfirm(${number})">Kế tiếp</div>
                            </div>
                        </div>
                    </div>
                </div>
    `;
    document.querySelectorAll(".seller-confirm__vector")[0].classList.add("active");
}

function openPasswordConfirm(number) {
    document.querySelectorAll(".seller-confirm__step")[1].classList.add("active");
    document.querySelector(".seller-confirm__method-container").innerHTML = 
    `
                            <div class="seller-confirm__method-header">
                                <div class="seller-confirm__method-header-back">
                                    <i class="uil uil-arrow-left seller-confirm__method-header-back-icon"></i>
                                </div>
                                <div class="seller-confirm__method-header-sub">Thiết lập mật khẩu</div>
                            </div>
                            <div class="seller-confirm__method-body">
                                <div class="seller-confirm__method-body-sub">
                                    Bước cuối! Thiết lập mật khẩu để hoàn tất việc đăng ký
                                </div>
                                <input type="password" class="seller-confirm__method-body-input-password" placeholder="Mật khẩu">
                                <div class="auth-msg auth-msg__err seller-auth__msg-regis-passowrd hide-on-destop">Điện thoại không được trống!</div>
                                <div class="seller-confirm__method-body-input-password-rule">
                                    <div class="seller-confirm__method-body-input-password-rule-item">
                                        Ít nhất một ký tự viết thường
                                    </div>
                                    <div class="seller-confirm__method-body-input-password-rule-item">
                                        Ít nhất một ký tự viết hoa 
                                    </div>
                                    <div class="seller-confirm__method-body-input-password-rule-item">
                                        8 - 16 ký tự 
                                    </div>
                                    <div class="seller-confirm__method-body-input-password-rule-item">
                                        Chỉ các chữ cái, số, ký tự phổ biến mới có thể được sử dụng
                                    </div>
                                </div>
                                <div class="seller-confirm__method-btn">Đăng ký</div>
                            </div>
    `;
    const passwordSellerRegisInput = document.querySelector(".seller-confirm__method-body-input-password");

    passwordSellerRegisInput.addEventListener("blur", () => {
        setPasswordSellerRegisValidate();
    });

    document.querySelector(".seller-confirm__method-btn").addEventListener("click", () => {
        setPasswordSellerRegisValidate();
        if (setPasswordSellerRegisValidate()) {
            openSuccessConfirm(number);
        }
    });
}

function openSuccessConfirm(number) {
    document.querySelectorAll(".seller-confirm__vector")[1].classList.add("active");
    document.querySelectorAll(".seller-confirm__step")[2].classList.add("active");
    document.querySelector(".seller-confirm__method-container").innerHTML = 
    `
                            <div class="seller-confirm__method-header">
                                <div class="seller-confirm__method-header-success">Đăng ký thành công</div>
                            </div>
                            <div class="seller-confirm__method-body">
                                <div class="seller-confirm__method-body-sub">
                                    <div class="seller-confirm__method-body-success-box">
                                        <i class="uil uil-check seller-confirm__method-body-success-box-icon"></i>
                                    </div>
                                </div>
                                <div class="seller-confirm__method-body-success-text">Bạn đã tạo tài khoản ShopeeMe thành công với số 
                                    <div class="seller-confirm__method-body-success-phone">(+84) ${number}</div>
                                </div>
                                <div class="seller-confirm__method-body-success-riderect">
                                    Bạn sẽ chuyển hướng đến Kênh người bán trong vòng 7 giây
                                </div>
                                <div class="seller-confirm__method-btn" onclick="redirectSeller()">Đến kênh người bán</div>
                            </div>
    `;
}