function getAPILoginAccount() {
    setLoginForm();
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

function loginWithFacebook() {
    noticeIncompleteFunc();
}

function loginWithGoogle() {
    noticeIncompleteFunc();
}