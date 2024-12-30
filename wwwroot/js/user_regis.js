function getAPIRegisAccount() {
    setRegisForm();
}
getAPIRegisAccount();

function setRegisForm() {
    let htmlRegisForm = "";
    htmlRegisForm += 
    `<div class="auth hide-on-mobile hide-on-table">
        <div class="auth__content grid wide">
            <div class="auth__left">
                <div class="auth__left-img">
                    <img src="/img/sme_logo_second_white.png" class="auth__content-logo" alt="">
                </div>
                <div class="auth__left-sub">Nền tảng thương mại trực tuyến</div>
            </div>
            <div class="auth__right">
                <div class="auth-form">
                    <form action="/user/register" method="post" class="auth-form__container">
                        <div class="auth-form__header">
                            <h3 class="auth-form__heading">Đăng ký</h3>
                        </div>
                        <div class="auth-form__form">
                            <div class="auth-form__group">
                                <input type="text" class="auth-form__input auth-form__input-username" placeholder="Tên đăng nhâp của bạn" />
                                <span class="auth-msg auth-msg__err-username"></span>
                            </div>
                            <div class="auth-form__group">
                                <input type="text" class="auth-form__input auth-form__input-email" placeholder="Email của bạn" />
                                <span class="auth-msg auth-msg__err-email"></span>
                            </div>
                            <div class="auth-form__group">
                                <input type="password"  class="auth-form__input auth-form__input-password" placeholder="Mật khẩu của bạn" />
                                <span class="auth-msg auth-msg__err-password"></span>
                            </div>
                            <div class="auth-form__group">
                                <input type="password" class="auth-form__input auth-form__input-re-pass" placeholder="Nhập lại mật khẩu" />
                                <span class="auth-msg auth-msg__err-re-pass"></span>
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
                            <button class="btn auth-form__controls-back btn--normal" onclick="backHistory()">TRỞ LẠI</button>
                            <button type="button" class="btn btn--primary auth-form__btn-submit">ĐĂNG KÝ</button>
                        </div>
                    </form>
                    <div class="auth-form__socials">
                        <a href="javascript:registerWithFacebook()" class="auth-form__socials--facebook btn btn--size-s btn--size-color btn--with-icon">
                            <i class="auth-form__socials-icon fab fa-facebook-square"></i>
                            <span class="auth-form__socials-title">
                                Facebook
                            </span>
                        </a>
                        <a href="javascript:registerWithGoogle()" class="auth-form__socials--google btn btn--size-s btn--with-icon">
                            <i class="auth-form__socials-icon fab fa-google"></i>
                            <span class="auth-form__socials-title">
                                Google
                            </span>
                        </a>
                    </div>
                    <div class="auth-form__footer">Bạn đã có tài khoản? <a href="/user/login" class="auth-form__footer-link">Đăng nhập</a></div>
                </div>
            </div>
        </div>
    </div>`;
    document.querySelector(".app__container").innerHTML = htmlRegisForm;
    addEvent();
}

let isValidate = true;
function usernameAccountValidate() {
    const usernameAccountInput = document.querySelector(".auth-form__input-username");
    const usernameAccountMsg = document.querySelector(".auth-msg__err-username");
    const username = usernameAccountInput.value;

    if (username === "") {
        showErrStyles(usernameAccountInput, usernameAccountMsg);
        usernameAccountMsg.innerHTML = "Tên đăng nhập không được trống!";
        isValidate = false;
    } else {
        removeErrStyles(usernameAccountInput, usernameAccountMsg);
        usernameAccountMsg.innerHTML = "";
        isValidate = true;
    }
    return isValidate;
}

function emailAccountValidate() {
    const emailAccountInput = document.querySelector(".auth-form__input-email");
    const emailAccountMsg = document.querySelector(".auth-msg__err-email");
    const email = emailAccountInput.value;

    const countChar = (string, char) => {
        let count = 0;
        for (let i = 0; i < string.length; i++) {
            if (string[i] === char) {
                count++;
            }
        }
        return count;
    };

    const check = () => {
        if (email.indexOf(".") === -1 && email.indexOf("@") === -1) {
            return -1;
        } else if (email.indexOf("@") === -1) {
            return -2;
        } else if (email.indexOf(".") === -1) {
            return -3;
        } else if (countChar(email, "@") > 1) {
            return -4;
        } else if (email.indexOf("@") === 0) {
            return -5;
        } else if (email.indexOf(".", email.indexOf("@")) - email.indexOf("@") <= 2) {
            return -6;
        } else {
            return true;
        }
    };

    if (email === "") {
        showErrStyles(emailAccountInput, emailAccountMsg);
        emailAccountMsg.innerHTML = "Email không được trống!";
        isValidate = false;
    } else if (check() === -1) {
        showErrStyles(emailAccountInput, emailAccountMsg);
        emailAccountMsg.innerHTML = "Email phải chứa '@' và '.'!";
        isValidate = false;
    } else if (check() === -2) {
        showErrStyles(emailAccountInput, emailAccountMsg);
        emailAccountMsg.innerHTML = "Email phải chứa '@'!";
        isValidate = false;
    } else if (check() === -3) {
        showErrStyles(emailAccountInput, emailAccountMsg);
        emailAccountMsg.innerHTML = "Email phải chứa '.'!";
        isValidate = false;
    } else if (check() === -4) {
        showErrStyles(emailAccountInput, emailAccountMsg);
        emailAccountMsg.innerHTML = "Email không được chứa nhiều hơn 1 '@'!";
        isValidate = false;
    } else if (check() === -5) {
        showErrStyles(emailAccountInput, emailAccountMsg);
        emailAccountMsg.innerHTML = "Email phải có ít nhất 1 ký tự trước '@'!";
        isValidate = false;
    } else if (check() === -6) {
        showErrStyles(emailAccountInput, emailAccountMsg);
        emailAccountMsg.innerHTML = "Email phải có ít nhất hai ký tự giữa '@' và '.'!";
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

function rePasswordAccountValidate() {
    const passwordAccountInput = document.querySelector(".auth-form__input-password");
    const rePasswordAccountInput = document.querySelector(".auth-form__input-re-pass");
    const rePasswordAccountMsg = document.querySelector(".auth-msg__err-re-pass");
    const password = rePasswordAccountInput.value;

    if (password === "") {
        showErrStyles(rePasswordAccountInput, rePasswordAccountMsg);
        rePasswordAccountMsg.innerHTML = "Xác nhận mật khẩu không được trống!";
        isValidate = false;
    } else if (password !== passwordAccountInput.value) {
        showErrStyles(rePasswordAccountInput, rePasswordAccountMsg);
        rePasswordAccountMsg.innerHTML = "Xác nhận mật khẩu không giống!";
        isValidate = false;
    } else {
        removeErrStyles(rePasswordAccountInput, rePasswordAccountMsg);
        rePasswordAccountMsg.innerHTML = "";
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

function checkPassAccountValidate(message) {
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

function checkRePassAccountValidate(message) {
    const rePasswordAccountInput = document.querySelector(".auth-form__input-re-pass");
    const rePasswordAccountMsg = document.querySelector(".auth-msg__err-re-pass");

    if (message != "") {
        showErrStyles(rePasswordAccountInput, rePasswordAccountMsg);
        rePasswordAccountMsg.innerHTML = `${message}`;
        isValidate = false;
    } else {
        removeErrStyles(rePasswordAccountInput, rePasswordAccountMsg);
        rePasswordAccountMsg.innerHTML = "";
        isValidate = true;
    }
    return isValidate;
}

function addEvent() {
    const usernameAccountInput = document.querySelector(".auth-form__input-username");
    const emailAccountInput = document.querySelector(".auth-form__input-email");
    const passwordAccountInput = document.querySelector(".auth-form__input-password");
    const rePasswordAccountInput = document.querySelector(".auth-form__input-re-pass");
    const submitAccountBtn = document.querySelector(".auth-form__btn-submit"); 

    usernameAccountInput.addEventListener('blur', () => {
        usernameAccountValidate();
    });

    emailAccountInput.addEventListener('blur', () => {
        emailAccountValidate();
    });

    passwordAccountInput.addEventListener('blur', () => {
        passwordAccountValidate();
    });

    rePasswordAccountInput.addEventListener('blur', () => {
        rePasswordAccountValidate();
    });

    submitAccountBtn.addEventListener('click', () => {
        usernameAccountValidate();
        emailAccountValidate();
        passwordAccountValidate();
        rePasswordAccountValidate();
        if (usernameAccountValidate() && emailAccountValidate() && passwordAccountValidate() && rePasswordAccountValidate()) {
            var formData = new FormData();
            formData.append("username", usernameAccountInput.value);
            formData.append("email", emailAccountInput.value);
            formData.append("password", passwordAccountInput.value);
            formData.append("rePassword", rePasswordAccountInput.value);
            var xhr = new XMLHttpRequest();
            xhr.open('post', '/user/register', true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    const data = JSON.parse(xhr.responseText);

                    console.log(data);

                    if (data.status.statusCode == -1) {
                        checkEmailAccountValidate(data.status.message);
                        emailAccountInput.value = "";
                        emailAccountInput.focus();
                    } else if (data.status.statusCode == -2) {
                        checkPassAccountValidate(data.status.message);
                        passwordAccountInput.value = "";
                        passwordAccountInput.focus();
                    } else if (data.status.statusCode == -3) {
                        checkRePassAccountValidate(data.status.message);
                        rePasswordAccountInput.value = "";
                        rePasswordAccountInput.focus();
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

function backHistory() {
    window.history.back();
}

function showHiddenPass() {
    const input = document.querySelector(".auth__mobile-form-input-password"),
    iconEye = document.querySelector(".auth__mobile-form-password-show-icon");
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

function loginWithFacebook() {
    noticeIncompleteFunc();
}

function loginWithGoogle() {
    noticeIncompleteFunc();
}

function registerWithFacebook() {
    noticeIncompleteFunc();
}

function registerWithGoogle() {
    noticeIncompleteFunc();
}
//getDataUser();