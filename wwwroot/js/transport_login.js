function getAPITransportLogin() {
    setForm();
}
getAPITransportLogin();

function setForm() {
    document.querySelector(".app__container").innerHTML = 
    `
    <div class="phone-auth__logo">
        <img src="/img/shopee_logo.png" class="phone-auth__logo-img" alt="">
    </div>
    <div class="phone-auth__form">
        <div class="phone-auth__form-div phone-auth__form-div-email">
            <i class="uil uil-user phone-auth__form-icon"></i>
            <input type="text" class="phone-auth__form-input phone-auth__form-input-email" placeholder="Email/Số điện thoại/Tên đăng nhập">
        </div>
        <div class="phone-auth__form-msg phone-auth__form-msg-email hide-on-destop">
            Email không được trống!
        </div>
        <div class="phone-auth__form-div phone-auth__form-div-password">
            <i class="uil uil-lock-alt phone-auth__form-icon"></i>
            <div class="phone-auth__form-password">
                <input type="password" class="phone-auth__form-input phone-auth__form-input-password"
                    placeholder="Mật khẩu">
                <div class="phone-auth__form-password-show" onclick="showHiddenPass()">
                    <i class="uil uil-eye-slash phone-auth__form-password-show-icon"></i>
                </div>
                <a href="#" class="phone-auth__form-password-forgot">Quên tài khoản và mật khẩu</a>
            </div>
        </div>
        <div class="phone-auth__form-msg phone-auth__form-msg-password hide-on-destop">
            Tên tài khoản hoặc mật khẩu không chính xác!
        </div>
        <button type="button" class="phone-auth__form-btn">Đăng nhập</button>
        <div class="phone-auth__form-link">
            <a href="register.html" class="phone-auth__form-link-register">Đăng ký</a>
            <a href="#" class="phone-auth__form-link-sms">Đăng nhập bằng SMS</a>
        </div>
    </div>
    <div class="phone-auth__or">
        <div class="phone-auth__or-title">
            <span></span>
            <div class="phone-auth__or-title-text">HOẶC</div>
            <span></span>
        </div>
    </div>
    <div class="phone-auth__bottom-btns">
        <a href="#" class="phone-auth__bottom-btn">
            <i class="uil uil-facebook phone-auth__bottom-btn-icon phone-auth__bottom-btn-facebook-icon"></i>
            <div class="phone-auth__bottom-btn-facebook">
            </div>
            Đăng nhập với Facebook
        </a>
        <a href="#" class="phone-auth__bottom-btn">
            <i class="uil uil-google phone-auth__bottom-btn-icon phone-auth__bottom-btn-google-icon"></i>
            Đăng nhập với Google
        </a>
        <a href="#" class="phone-auth__bottom-btn">
            <i class="uil uil-apple phone-auth__bottom-btn-icon phone-auth__bottom-btn-apple-icon"></i>
            Đăng nhập với Apple
        </a>
    </div>
    `;
    addEvent();
}

function showHiddenPass() {
    const input = document.querySelector(".phone-auth__form-input-password"),
    iconEye = document.querySelector(".phone-auth__form-password-show-icon");
    if (input.type == "password") {
        input.type = "text";
        iconEye.classList.add("uil-eye");
        iconEye.classList.remove("uil-eye-slash");
    } else {
        input.type = "password";
        iconEye.classList.add("uil-eye-slash");
        iconEye.classList.remove("uil-eye");
    }
}

// Validate Login Seller
function showErrStyles(input, msg) {
    input.classList.add("err");
    msg.classList.remove("hide-on-destop");
}

function removeErrStyles(input, msg) {
    input.classList.remove("err");
    msg.classList.add("hide-on-destop");
}

let isValidate = true;
function emailValidate() {
    const emailInput = document.querySelector(".phone-auth__form-div-email");
    const emailMsg = document.querySelector(".phone-auth__form-msg-email");
    let email = document.querySelector(".phone-auth__form-input-email").value;

    if (email === "") {
        showErrStyles(emailInput, emailMsg);
        emailMsg.innerHTML = "Hãy nhập email!";
        isValidate = false;
    } else {
        removeErrStyles(emailInput, emailMsg);
        emailMsg.innerHTML = "";
        isValidate = true;
    }
    return isValidate;
}

function passwordValidate() {
    const passwordInput = document.querySelector(".phone-auth__form-div-password");
    const passwordMsg = document.querySelector(".phone-auth__form-msg-password");
    const password = document.querySelector(".phone-auth__form-input-password").value;

    if (password === "") {
        showErrStyles(passwordInput, passwordMsg);
        passwordMsg.innerHTML = "Mật khẩu không được trống!";
        isValidate = false;
    } else {
        removeErrStyles(passwordInput, passwordMsg);
        passwordMsg.innerHTML = "";
        isValidate = true;
    }
    return isValidate;
}

// Add Event
function addEvent() {
    const emailInput = document.querySelector(".phone-auth__form-input-email");
    const passwordInput = document.querySelector(".phone-auth__form-input-password");
    const submitBtn = document.querySelector(".phone-auth__form-btn");

    emailInput.addEventListener("blur", () => {
        emailValidate();
    });

    passwordInput.addEventListener("blur", () => {
        passwordValidate();
    });

    submitBtn.addEventListener('click', () => {
        emailValidate();
        passwordValidate();
        if (emailValidate() && passwordValidate()) {
            openModal();
            document.querySelector(".phone-modal__body").innerHTML =
            `
            <div class="phone-spinner"></div>
            `;
            var formData = new FormData();
            formData.append("email", emailInput.value);
            formData.append("password", passwordInput.value);

            var xhr = new XMLHttpRequest();
            xhr.open('post', '/transport/login', true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    const result = JSON.parse(xhr.responseText);

                    console.log(result);

                    if (result.status.statusCode == -1) {
                        setTimeout(() => {
                            closeModal();
                            toast({ title: "Thông báo", msg: `${result.status.message}`, type: "err", duration: 5000 });
                            document.querySelector(".phone-modal__body").innerHTML = "";
                            setTimeout(() => {
                                emailInput.value = "";
                                passwordInput.value = "";
                            }, 1000)
                        }, 2000);
                    }

                    if (result.status.statusCode == 0) {
                        setTimeout(() => {
                            closeModal();
                            toast({ title: "Thông báo", msg: `${result.status.message}`, type: "err", duration: 5000 });
                            document.querySelector(".phone-modal__body").innerHTML = "";
                            setTimeout(() => {
                                emailInput.value = "";
                                passwordInput.value = "";
                            }, 1000)
                        }, 2000);
                    }

                    if (result.status.statusCode == 1) {
                        setTimeout(() => {
                            closeModal();
                            toast({ title: "Thông báo", msg: `${result.status.message}`, type: "success", duration: 5000 });
                            document.querySelector(".phone-modal__body").innerHTML = "";
                            setTimeout(() => {
                                window.location.assign('/picker');
                            }, 1000)
                        }, 2000);
                    }

                    if (result.status.statusCode == 2) {
                        setTimeout(() => {
                            closeModal();
                            toast({ title: "Thông báo", msg: `${result.status.message}`, type: "success", duration: 5000 });
                            document.querySelector(".phone-modal__body").innerHTML = "";
                            setTimeout(() => {
                                // window.location.assign('/seller');
                            }, 1000)
                        }, 2000);
                    }
                    
                }
            };
            xhr.send(formData);
        }
    });
}