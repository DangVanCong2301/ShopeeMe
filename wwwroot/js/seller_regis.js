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

function checkPhoneSellerRegisValidate(message) {
    const phoneSellerInput = document.querySelector(".seller-auth__regis-input-phone");
    const phoneSellerMsg = document.querySelector(".seller-auth__msg-regis-phone");

    if (message != "") {
        showErrStyles(phoneSellerInput, phoneSellerMsg);
        phoneSellerMsg.innerHTML = `${message}`;
        isValidate = false;
    } else {
        removeErrStyles(phoneSellerInput, phoneSellerMsg);
        phoneSellerMsg.innerHTML = "";
        isValidate = true;
    }
    return isValidate;
}

function setUsernameSellerRegisValidate() {
    const usernameSellerRegisInput = document.querySelector(".seller-confirm__method-body-input-username");
    const usernameSellerRegisMsg = document.querySelector(".seller-auth__msg-regis-username");
    let usernameRegis = usernameSellerRegisInput.value;

    if (usernameRegis === "") {
        showErrStyles(usernameSellerRegisInput, usernameSellerRegisMsg);
        usernameSellerRegisMsg.innerHTML = "Tên đăng nhập không được trống!";
        isValidate = false;
    } else {
        removeErrStyles(usernameSellerRegisInput, usernameSellerRegisMsg);
        usernameSellerRegisMsg.innerHTML = "";
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
            let phone = phoneSellerRegisInput.value;
            var formData = new FormData();
            formData.append("phone", phone);

            var xhr = new XMLHttpRequest();
            xhr.open('post', '/seller/check-phone-regis', true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    const result = JSON.parse(xhr.responseText);

                    if (result.statusCode == 0) {
                        checkPhoneSellerRegisValidate(result.message);
                    } else {
                        openConfirmModal(phone);
                    }
                }
            };
            xhr.send(formData);
        }
    });
})();

function openConfirmModal(phone) {
    openModal();
    document.querySelector(".modal__body").innerHTML = 
    `
        <div class="modal__confirm">
            <div class="modal__confirm-text">Chúng tôi sẽ gửi mã xác minh qua Zalo đến (+84) ${phone}</div>
            <div class="modal__confirm-btns">
                <div class="modal__confirm-btn-destroy" onclick="closeModal()">Huỷ</div>
                <div class="modal__confirm-btn-method" onclick="openConfirmPage(${phone})">Các phương pháp khác</div>
                <div class="modal__confirm-btn-send" onclick="openZaloConfirm(${phone})">Gửi đến Zalo</div>
            </div>
        </div>
    `;
}

function openConfirmPage(phone) {
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
                                    <div class="seller-confirm__method-sub-phone">(+84) ${phone}</div>
                                </div>
                                <div class="seller-confirm__method-list">
                                    <div class="seller-confirm__method-item" onclick="openZaloConfirm(${phone})">
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

function openZaloConfirm(phone) {
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
                                        <div class="seller-confirm__method-zalo-phone">(+84) ${phone}</div>
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
                                <div class="seller-confirm__method-btn" onclick="openPasswordConfirm(${phone})">Kế tiếp</div>
                            </div>
                        </div>
                    </div>
                </div>
    `;
    document.querySelectorAll(".seller-confirm__vector")[0].classList.add("active");
}

function openPasswordConfirm(phone) {
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
                                    Bước cuối! Thiết lập tên đăng nhập và mật khẩu để hoàn tất việc đăng ký
                                </div>
                                <div class="seller-confirm__method-body-input-container">
                                    <div class="seller-confirm__method-body-input-div">
                                        <input type="text" class="seller-confirm__method-body-input-username" placeholder="Tên đăng nhập">
                                        <div class="auth-msg auth-msg__err seller-auth__msg-regis-username hide-on-destop">Tên đăng nhập không được trống!</div>
                                    </div>
                                    <div class="seller-confirm__method-body-input-div">
                                        <input type="password" class="seller-confirm__method-body-input-password" placeholder="Mật khẩu">
                                        <div class="auth-msg auth-msg__err seller-auth__msg-regis-passowrd hide-on-destop">Điện thoại không được trống!</div>
                                    </div>
                                </div>
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
    const usernameSellerRegisInput = document.querySelector(".seller-confirm__method-body-input-username");
    const passwordSellerRegisInput = document.querySelector(".seller-confirm__method-body-input-password");

    usernameSellerRegisInput.addEventListener('blur', () => {
        setUsernameSellerRegisValidate();
    });

    passwordSellerRegisInput.addEventListener("blur", () => {
        setPasswordSellerRegisValidate();
    });

    document.querySelector(".seller-confirm__method-btn").addEventListener("click", () => {
        setUsernameSellerRegisValidate();
        setPasswordSellerRegisValidate();
        if (setUsernameSellerRegisValidate && setPasswordSellerRegisValidate()) {
            openModal();
            document.querySelector(".modal__body").innerHTML = 
            `
                <div class="spinner"></div>
            `;
            let username = usernameSellerRegisInput.value;
            let password = passwordSellerRegisInput.value;
            openSuccessConfirm(phone, username, password);
        }
    });
}

function openSuccessConfirm(phone, username, password) {
    document.querySelectorAll(".seller-confirm__vector")[1].classList.add("active");
    document.querySelectorAll(".seller-confirm__step")[2].classList.add("active");

    var formData = new FormData();
    formData.append("phone", phone);
    formData.append("username", username);
    formData.append("password", password);


    var xhr = new XMLHttpRequest();
    xhr.open('post', '/seller/register', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const result = JSON.parse(xhr.responseText);

            console.log(result);

            if (result.status.statusCode == -1) {
                setTimeout(() => {
                    closeModal();
                    toast({ title: "Thông báo", msg: `${result.status.message}`, type: "err", duration: 5000 });
                    document.querySelector(".modal__body").innerHTML = "";
                    setTimeout(() => {
                        window.location.assign("/seller/register");
                    }, 1000)
                }, 2000);
            } 

            if (result.status.statusCode == 1) {
                setTimeout(() => {
                    closeModal();
                    toast({ title: "Thông báo", msg: `${result.status.message}`, type: "success", duration: 5000 });
                    document.querySelector(".modal__body").innerHTML = "";
                    setTimeout(() => {
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
                                    <div class="seller-confirm__method-body-success-phone">(+84) ${phone}</div>
                                </div>
                                <div class="seller-confirm__method-body-success-riderect">
                                    Bạn sẽ chuyển hướng đến Kênh người bán trong vòng 7 giây
                                </div>
                                <div class="seller-confirm__method-btn" onclick="redirectSeller()">Đến kênh người bán</div>
                            </div>
                        `;
                        redirectSellerPortalPage();
                    }, 1000)
                }, 2000);
            }
            
        }
    };
    xhr.send(formData);
}

function redirectSellerPortalPage() {
    let countDownValue = 5;
    document.querySelector(".seller-confirm__method-body-success-riderect").innerHTML = 
        `
        Bạn sẽ chuyển hướng đến Kênh người bán trong vòng ${countDownValue} giây
        `;
    setInterval(() => {
        countDownValue--;
        document.querySelector(".seller-confirm__method-body-success-riderect").innerHTML = 
        `
        Bạn sẽ chuyển hướng đến Kênh người bán trong vòng ${countDownValue} giây
        `;
    }, 1000);

    setTimeout(() => {
        window.location.assign("/seller/portal");
    }, 5 * 1000);
    
}