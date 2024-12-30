function getAPIForgotAccount() {
    setForgotForm();
}
getAPIForgotAccount();

function setForgotForm() {
    let htmlForgotForm = "";
    htmlForgotForm += 
    `
    <div class="auth">
        <div class="auth__content grid wide">
            <div class="auth__left">
                <div class="auth__left-img">
                    <img src="/img/sme_logo_second_white.png" class="auth__content-logo" alt="">
                </div>
                <div class="auth__left-sub">Nền tảng thương mại trực tuyến</div>
            </div>
            <div class="auth__right">
                <div class="auth-form">
                    <form action="/user/forgot" method="post" class="auth-form__container">
                        <div class="auth-form__header">
                            <h3 class="auth-form__heading">Quên mật khẩu</h3>
                        </div>
                        <div class="auth-form__form">
                            <div class="auth-form__group">
                                <input type="text" id="" class="auth-form__input auth-form__input-email" placeholder="Email của bạn" />
                                <span class="auth-msg auth-msg__err-email"></span>
                            </div>
                        </div>
                        <div class="auth-form__aside">
                            <div class="auth-form__help">
                                <a href="/user/change" class="auth-form__help-link auth-form__help-link">Đổi mật khẩu</a>
                                <span class="auth-form__help-separate"></span>
                                <a href="" class="auth-form__help-link">Cần trợ giúp</a>
                            </div>
                        </div>
                        <div class="auth-form__controls">
                            <a href="/user/login" class="btn auth-form__controls-back btn--normal">TRỞ LẠI</a>
                            <button type="button" class="btn btn--primary btn__recover-pass">LẤY LẠI MẬT KHẨU</button>
                        </div>
                    </form>
                    <div class="auth-form__socials">
                        <a href="" class="auth-form__socials--facebook btn btn--size-s btn--size-color btn--with-icon">
                            <i class="auth-form__socials-icon fab fa-facebook-square"></i>
                            <span class="auth-form__socials-title">
                                Facebook
                            </span>
                        </a>
                        <a href="" class="auth-form__socials--google btn btn--size-s btn--with-icon">
                            <i class="auth-form__socials-icon fab fa-google"></i>
                            <span class="auth-form__socials-title">
                                Google
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    document.querySelector(".app__container").innerHTML = htmlForgotForm;
    addEvent();
}

let isValidate = true;
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

function addEvent() {
    const emailAccountInput = document.querySelector(".auth-form__input-email");
    const submitAccountBtn = document.querySelector(".btn__recover-pass");

    emailAccountInput.addEventListener('blur', () => {
        emailAccountValidate();
    });

    submitAccountBtn.addEventListener('click', () => {
        emailAccountValidate();
        if (emailAccountValidate()) {
            var formData = new FormData();
            formData.append("email", emailAccountInput.value);
            var xhr = new XMLHttpRequest();
            xhr.open('post', '/user/forgot', true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    const data = JSON.parse(xhr.responseText);

                    console.log(data);

                    if (data.status.statusCode == -1) {
                        checkEmailAccountValidate(data.status.message);
                        emailAccountInput.value = "";
                    } else {
                        openModal();
                        document.querySelector(".modal__body").innerHTML = `<div class="spinner"></div>`;
                        setTimeout(() => {
                            document.querySelector(".modal__body").innerHTML = "";
                            setTimeout(() => {
                                document.querySelector(".modal__body").innerHTML = 
                                `<div class="modal__confirm">
                                    <div class="modal__confirm-header">
                                        <div class="modal__confirm-title">Thông báo</div>
                                    </div>
                                    <div class="modal__confirm-desc">
                                        ${data.status.message}
                                    </div>
                                    <div class="modal__confirm-btns">
                                        <div class="modal__confirm-btn-destroy" onclick="closeModal()">Thoát</div>
                                        <a href="/user/login" class="modal__confirm-btn-send">Đăng nhập</a>
                                    </div>
                                </div>`;
                            }, 1000)
                        }, 2000);
                    }
                    
                }
            };
            xhr.send(formData);
        }
    });
}