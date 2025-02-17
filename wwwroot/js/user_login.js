function getAPILoginAccount() {
    setLoginForm();

    setLoginFormMobile();
}
getAPILoginAccount();

function setLoginForm() {
    let htmlLoginForm = 
    `
    <div class="auth hide-on-mobile">
        <div class="auth__content grid wide">
            <div class="auth__left">
                <div class="auth__left-img">
                    <img src="/img/sme_logo_second_white.png" class="auth__content-logo" alt="">
                </div>
                <div class="auth__left-sub">Nền tảng thương mại trực tuyến</div>
            </div>
            <div class="auth__right">
                <div class="auth-form">
                    <form method="post" class="auth-form__container">
                        <div class="auth-form__header">
                            <h3 class="auth-form__heading">Đăng nhập</h3>
                        </div>
                        <div class="auth-form__form">
                            <div class="auth-form__group">
                                <input type="text" id="" class="auth-form__input auth-form__input-email" placeholder="Email của bạn" />
                                <span class="auth-msg auth-msg__err-email"></span>
                            </div>
                            <div class="auth-form__group">
                                <input type="password" id="" class="auth-form__input auth-form__input-password" placeholder="Mật khẩu của bạn" />
                                <span class="auth-msg auth-msg__err-password"></span>
                            </div>
                        </div>
                        <div class="auth-form__aside">
                            <div class="auth-form__help">
                                <a href="/user/forgot" class="auth-form__help-link auth-form__help-link">Quên mật khẩu</a>
                                <span class="auth-form__help-separate"></span>
                                <a href="" class="auth-form__help-link">Cần trợ giúp</a>
                            </div>
                        </div>
                        <div class="auth-form__controls">
                            <button type="button" class="btn btn--primary auth-form__btn-submit">ĐĂNG NHẬP</button>
                        </div>
                    </form>
                    <div class="auth-form__socials">
                        <a href="javascript:loginWithFacebook()" class="auth-form__socials--facebook btn btn--size-s btn--size-color btn--with-icon">
                            <i class="auth-form__socials-icon fab fa-facebook-square"></i>
                            <span class="auth-form__socials-title">
                                Facebook
                            </span>
                        </a>
                        <a href="javascript:loginWithGoogle()" class="auth-form__socials--google btn btn--size-s btn--with-icon">
                            <i class="auth-form__socials-icon fab fa-google"></i>
                            <span class="auth-form__socials-title">
                                Google
                            </span>
                        </a>
                    </div>
                    <div class="auth-form__footer">Bạn mới biết đến SMe? <a href="/user/register" class="auth-form__footer-link">Đăng ký</a></div>
                </div>
            </div>
        </div>
    </div>`;
    document.querySelector(".app__container").innerHTML = htmlLoginForm;
    addEvent();
}

function addEvent() {
    const emailAccountInput = document.querySelector(".auth-form__input-email");
    const passwordAccountInput = document.querySelector(".auth-form__input-password");
    const submitAccountBtn = document.querySelector(".auth-form__btn-submit");

    emailAccountInput.addEventListener('blur', () => {
        emailAccountValidate();
    });

    passwordAccountInput.addEventListener('blur', () => {
        passwordAccountValidate();
    });

    submitAccountBtn.addEventListener('click', () => {
        emailAccountValidate();
        passwordAccountValidate();
        if (emailAccountValidate() && passwordAccountValidate()) {
            var formData = new FormData();
            formData.append('email', emailAccountInput.value);
            formData.append('password', passwordAccountInput.value);
            var xhr = new XMLHttpRequest();
            xhr.open('post', '/user/login', true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    const data = JSON.parse(xhr.responseText);

                    console.log(data);

                    if (data.status.statusCode == -1) {
                        checkEmailAccountValidate(data.status.message);
                    } else if (data.status.statusCode == -2) {
                        checkPasswordAccountValidate(data.status.message);
                    } else if (data.status.statusCode == -3) {
                        openModal();
                        document.querySelector(".modal__body").innerHTML = `<div class="spinner"></div>`;
                        setTimeout(() => {
                            closeModal();
                            toast({ title: "Thông báo", msg: `${data.status.message}`, type: "err", duration: 5000 });
                            document.querySelector(".modal__body").innerHTML = "";
                            setTimeout(() => {
                                emailAccountInput.value = "";
                                passwordAccountInput.value = "";
                            }, 1000)
                        }, 2000);
                    } else if (data.status.statusCode == -4) {
                        openModal();
                        document.querySelector(".modal__body").innerHTML = `<div class="spinner"></div>`;
                        setTimeout(() => {
                            closeModal();
                            toast({ title: "Thông báo", msg: `${data.status.message}`, type: "err", duration: 5000 });
                            setCookies("userID", data.user[0].pK_iUserID, 1);
                            document.querySelector(".modal__body").innerHTML = "";
                            setTimeout(() => {
                                window.location.assign("/user/portal");
                            }, 1000)
                        }, 2000);
                    } else {
                        openModal();
                        document.querySelector(".modal__body").innerHTML = `<div class="spinner"></div>`;
                        setTimeout(() => {
                            closeModal();
                            toast({ title: "Thông báo", msg: `${data.status.message}`, type: "success", duration: 5000 });
                            setCookies("userID", data.user[0].pK_iUserID, 1);
                            document.querySelector(".modal__body").innerHTML = "";
                            setTimeout(() => {
                                window.location.assign('/');
                            }, 1000)
                        }, 2000);
                    }
                    
                }
            };
            xhr.send(formData);
        }
    });
}

let isValidate = true;
function emailAccountValidate() {
    const emailAccountInput = document.querySelector(".auth-form__input-email");
    const emailAccountMsg = document.querySelector(".auth-msg__err-email");
    const email = emailAccountInput.value;

    if (email === "") {
        showErrStyles(emailAccountInput, emailAccountMsg);
        emailAccountMsg.innerHTML = "Email không được trống!";
        isValidate = false;
    } else {
        removeErrStyles(emailAccountInput, emailAccountMsg);
        emailAccountMsg.innerHTML = "";
        isValidate = true;
    }
    return isValidate;
}

function passwordAccountValidate() {
    const passwordAccountInput = document.querySelector(".auth-form__input-password");
    const passwordAccountMsg = document.querySelector(".auth-msg__err-password");
    const password = passwordAccountInput.value;

    if (password === "") {
        showErrStyles(passwordAccountInput, passwordAccountMsg);
        passwordAccountMsg.innerHTML = "Mật khẩu không được trống!";
        isValidate = false;
    } else {
        removeErrStyles(passwordAccountInput, passwordAccountMsg);
        passwordAccountMsg.innerHTML = "";
        isValidate = true;
    }
    return isValidate;
}

function checkEmailAccountValidate(message) {
    const emailAccountInput = document.querySelector(".auth-form__input-email");
    const emailAccountMsg = document.querySelector(".auth-msg__err-email");

    if (message != "") {
        showErrStyles(emailAccountInput, emailAccountMsg);
        emailAccountMsg.innerHTML = `${message}`;
        isValidate = false;
    } else {
        removeErrStyles(emailAccountInput, emailAccountMsg);
        emailAccountMsg.innerHTML = "";
        isValidate = true;
    }
    return isValidate;
}

function checkPasswordAccountValidate(message) {
    const passwordAccountInput = document.querySelector(".auth-form__input-password");
    const passwordAccountMsg = document.querySelector(".auth-msg__err-password");

    if (message != "") {
        showErrStyles(passwordAccountInput, passwordAccountMsg);
        passwordAccountMsg.innerHTML = `${message}`;
        isValidate = false;
    } else {
        removeErrStyles(passwordAccountInput, passwordAccountMsg);
        passwordAccountMsg.innerHTML = "";
        isValidate = true;
    }
    return isValidate;
}

function setLoginFormMobile() {
    let htmlLoginFormMobile = "";
    htmlLoginFormMobile += 
    `<div class="auth__mobile-logo">
        <img src="/img/sme_icon_primary.png" class="auth__mobile-logo-img" alt="">
    </div>
    <form action="/user/login" method="post" class="auth__mobile-form">
        <div class="auth__mobile-form-div auth__mobile-form-div-email">
            <i class="uil uil-user auth__mobile-form-icon"></i>
            <input type="text" class="auth__mobile-form-input auth__mobile-form-input-email" placeholder="Email/Số điện thoại/Tên đăng nhập">
        </div>
        <p class="auth__mobile-form-msg auth__mobile-form-msg-email hide-on-mobile"></p>
        <div class="auth__mobile-form-div auth__mobile-form-div-password">
            <i class="uil uil-lock-alt auth__mobile-form-icon"></i>
            <div class="auth__mobile-form-password">
                <input type="password" class="auth__mobile-form-input auth__mobile-form-input-password" placeholder="Mật khẩu">
                <div class="auth__mobile-form-password-show" onclick="showHiddenPass()">
                    <i class="uil uil-eye-slash auth__mobile-form-password-show-icon"></i>
                </div>
                <a href="#" class="auth__mobile-form-password-forgot">Quên tài khoản và mật khẩu</a>
            </div>
        </div>
        <p class="auth__mobile-form-msg auth__mobile-form-msg-password hide-on-mobile"></p>
        <button type="button" class="auth__mobile-form-btn">Đăng nhập</button>
        <div class="auth__mobile-form-link">
            <a href="/user/register" class="auth__mobile-form-link-register">Đăng ký</a>
            <a href="javascript:loginWithSMS()" class="auth__mobile-form-link-sms">Đăng nhập bằng SMS</a>
        </div>
    </form>
    <div class="auth__mobile-or">
        <div class="auth__mobile-or-title">
            <span></span>
            <div class="auth__mobile-or-title-text">HOẶC</div>
            <span></span>
        </div>
    </div>
    <div class="auth__mobile-bottom-btns">
        <a href="javascript:loginWithFacebook()" class="auth__mobile-bottom-btn">
            <i class="uil uil-facebook auth__mobile-bottom-btn-icon auth__mobile-bottom-btn-facebook-icon"></i>
            <div class="auth__mobile-bottom-btn-facebook">
            </div>
            Đăng nhập với Facebook
        </a>
        <a href="javascript:loginWithGoogle()" class="auth__mobile-bottom-btn">
            <i class="uil uil-google auth__mobile-bottom-btn-icon auth__mobile-bottom-btn-google-icon"></i>
            Đăng nhập với Google
        </a>
        <a href="javascript:loginWithApple()" class="auth__mobile-bottom-btn">
            <i class="uil uil-apple auth__mobile-bottom-btn-icon auth__mobile-bottom-btn-apple-icon"></i>
            Đăng nhập với Apple
        </a>
    </div>`;
    document.querySelector(".auth__mobile").innerHTML = htmlLoginFormMobile;
    addEventMobile();
}

function addEventMobile() {
    const emailAccountInputMobile = document.querySelector(".auth__mobile-form-input-email");
    const passwordAccountInputMobile = document.querySelector(".auth__mobile-form-input-password");
    const submitAccountMobileBtn = document.querySelector(".auth__mobile-form-btn");

    emailAccountInputMobile.addEventListener('blur', () => {
        emailAccountValidateMobile();
    });

    passwordAccountInputMobile.addEventListener('blur', () => {
        passwordAccountValidateMobile();
    });

    submitAccountMobileBtn.addEventListener('click', () => {
        emailAccountValidateMobile();
        passwordAccountValidateMobile();
        if (emailAccountValidateMobile() && passwordAccountValidateMobile()) {
            var formData = new FormData();
            formData.append('email', emailAccountInputMobile.value);
            formData.append('password', passwordAccountInputMobile.value);
            var xhr = new XMLHttpRequest();
            xhr.open('post', '/user/login', true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    const data = JSON.parse(xhr.responseText);

                    console.log(data);

                    if (data.status.statusCode == -1) {
                        checkEmailAccountValidateMobile(data.status.message);
                    } else if (data.status.statusCode == -2) {
                        checkPasswordAccountValidateMobile(data.status.message);
                    } else if (data.status.statusCode == -3) {
                        openModal();
                        document.querySelector(".modal__body").innerHTML = `<div class="spinner"></div>`;
                        setTimeout(() => {
                            closeModal();
                            toast({ title: "Thông báo", msg: `${data.status.message}`, type: "err", duration: 5000 });
                            document.querySelector(".modal__body").innerHTML = "";
                            setTimeout(() => {
                                emailAccountInputMobile.value = "";
                                passwordAccountInputMobile.value = "";
                            }, 1000)
                        }, 2000);
                    } else if (data.status.statusCode == -4) {
                        openModal();
                        document.querySelector(".modal__body").innerHTML = `<div class="spinner"></div>`;
                        setTimeout(() => {
                            closeModal();
                            toast({ title: "Thông báo", msg: `${data.status.message}`, type: "err", duration: 5000 });
                            setCookies("userID", data.user[0].pK_iUserID, 1);
                            document.querySelector(".modal__body").innerHTML = "";
                            setTimeout(() => {
                                window.location.assign("/user/portal");
                            }, 1000)
                        }, 2000);
                    } else if (data.status.statusCode == 2) {
                        openModal();
                        document.querySelector(".modal__body").innerHTML = `<div class="spinner"></div>`;
                        setTimeout(() => {
                            closeModal();
                            toast({ title: "Thông báo", msg: `${data.status.message}`, type: "success", duration: 5000 });
                            setCookies("userID", data.user[0].pK_iUserID, 1);
                            document.querySelector(".modal__body").innerHTML = "";
                            setTimeout(() => {
                                window.location.assign('/picker');
                            }, 1000)
                        }, 2000);
                    } else if (data.status.statusCode == 3) {
                        openModal();
                        document.querySelector(".modal__body").innerHTML = `<div class="spinner"></div>`;
                        setTimeout(() => {
                            closeModal();
                            toast({ title: "Thông báo", msg: `${data.status.message}`, type: "success", duration: 5000 });
                            setCookies("userID", data.user[0].pK_iUserID, 1);
                            document.querySelector(".modal__body").innerHTML = "";
                            setTimeout(() => {
                                window.location.assign('/delivery');
                            }, 1000)
                        }, 2000);
                    } else {
                        openModal();
                        document.querySelector(".modal__body").innerHTML = `<div class="spinner"></div>`;
                        setTimeout(() => {
                            closeModal();
                            toast({ title: "Thông báo", msg: `${data.status.message}`, type: "success", duration: 5000 });
                            setCookies("userID", data.user[0].pK_iUserID, 1);
                            document.querySelector(".modal__body").innerHTML = "";
                            setTimeout(() => {
                                window.location.assign('/');
                            }, 1000)
                        }, 2000);
                    }
                    
                }
            };
            xhr.send(formData);
        }
    });
}

function emailAccountValidateMobile() {
    const emailAccountInput = document.querySelector(".auth__mobile-form-div-email");
    const emailAccountMsg = document.querySelector(".auth__mobile-form-msg-email");
    const email = document.querySelector(".auth__mobile-form-input-email").value;

    if (email === "") {
        showErrStylesMobile(emailAccountInput, emailAccountMsg);
        emailAccountMsg.innerHTML = "Email không được trống!";
        isValidate = false;
    } else {
        removeErrStylesMobile(emailAccountInput, emailAccountMsg);
        emailAccountMsg.innerHTML = "";
        isValidate = true;
    }
    return isValidate;
}

function passwordAccountValidateMobile() {
    const passwordAccountInput = document.querySelector(".auth__mobile-form-div-password");
    const passwordAccountMsg = document.querySelector(".auth__mobile-form-msg-password");
    const password = document.querySelector(".auth__mobile-form-input-password").value;

    if (password === "") {
        showErrStylesMobile(passwordAccountInput, passwordAccountMsg);
        passwordAccountMsg.innerHTML = "Mật khẩu không được trống!";
        isValidate = false;
    } else {
        removeErrStylesMobile(passwordAccountInput, passwordAccountMsg);
        passwordAccountMsg.innerHTML = "";
        isValidate = true;
    }
    return isValidate;
}

function checkEmailAccountValidateMobile(message) {
    const emailAccountInput = document.querySelector(".auth__mobile-form-div-email");
    const emailAccountMsg = document.querySelector(".auth__mobile-form-msg-email");

    if (message != "") {
        showErrStylesMobile(emailAccountInput, emailAccountMsg);
        emailAccountMsg.innerHTML = `${message}`;
        isValidate = false;
    } else {
        removeErrStylesMobile(emailAccountInput, emailAccountMsg);
        emailAccountMsg.innerHTML = "";
        isValidate = true;
    }
    return isValidate;
}

function checkPasswordAccountValidateMobile(message) {
    const passwordAccountInput = document.querySelector(".auth__mobile-form-div-password");
    const passwordAccountMsg = document.querySelector(".auth__mobile-form-msg-password");

    if (message != "") {
        showErrStylesMobile(passwordAccountInput, passwordAccountMsg);
        passwordAccountMsg.innerHTML = `${message}`;
        isValidate = false;
    } else {
        removeErrStylesMobile(passwordAccountInput, passwordAccountMsg);
        passwordAccountMsg.innerHTML = "";
        isValidate = true;
    }
    return isValidate;
}

function loginWithFacebook() {
    noticeIncompleteFunc();
}

function loginWithGoogle() {
    noticeIncompleteFunc();
}

function loginWithSMS() {
    noticeIncompleteFunc();
}

function loginWithApple() {
    noticeIncompleteFunc();
}