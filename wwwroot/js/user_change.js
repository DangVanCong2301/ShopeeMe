function getAPIChangeAccount() {
    let userID = getCookies("userID");
    if (userID == undefined) {
        window.location.assign("/user/login");
    }
    setChangeForm();
}
getAPIChangeAccount();

function setChangeForm() {
    let htmlChangeForm = "";
    htmlChangeForm += 
    `
    <div class="auth hide-on-mobile hide-on-table">
        <div class="auth__content grid wide">
            <div class="auth__left">
                <div class="auth__left-img">
                    <img src="/img/sme_logo_second_white.png" class="auth__content-logo" alt="">
                </div>
                <div class="auth__left-sub">Nền tảng thương mại trực tuyến</div>
            </div>
            <div class="auth__right">
                <div class="auth-form">
                    <form action="/user/change" method="post" class="auth-form__container">
                        <div class="auth-form__header">
                            <h3 class="auth-form__heading">Đổi mật khẩu</h3>
                        </div>
                        <div class="auth-form__form">
                            <div class="auth-form__group">
                                <input type="password" class="auth-form__input auth-form__input-old-pass" placeholder="Mật khẩu cũ" />
                                <span class="auth-msg auth-msg__err-old-pass"></span>
                            </div>
                            <div class="auth-form__group">
                                <input type="password" class="auth-form__input auth-form__input-new-pass" placeholder="Mật khẩu mới" />
                                <span class="auth-msg auth-msg__err-new-pass"></span>
                            </div>
                            <div class="auth-form__group">
                                <input type="password" class="auth-form__input auth-form__input-re-pass" placeholder="Nhập lại mật khẩu mới" />
                                <span class="auth-msg auth-msg__err-re-pass"></span>
                            </div>
                        </div>
                        <div class="auth-form__aside">
                            <div class="auth-form__help">
                                <a href="" class="auth-form__help-link auth-form__help-link">Đăng nhập</a>
                                <span class="auth-form__help-separate"></span>
                                <a href="" class="auth-form__help-link">Cần trợ giúp</a>
                            </div>
                        </div>
                        <div class="auth-form__controls">
                            <a href="/user/login" class="btn auth-form__controls-back btn--normal">TRỞ LẠI</a>
                            <button type="button" class="btn btn--primary auth-form__btn-submit">ĐỔI MẬT KHẨU</button>
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
                                Facebook
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    document.querySelector(".app__container").innerHTML = htmlChangeForm;
    addEvent();
}

let isValidate = true;
function oldPasswordAccountValidate() {
    const oldPasswordAccountInput = document.querySelector(".auth-form__input-old-pass");
    const oldPasswordAccountMsg = document.querySelector(".auth-msg__err-old-pass");
    const password = oldPasswordAccountInput.value;

    if (password === "") {
        showErrStyles(oldPasswordAccountInput, oldPasswordAccountMsg);
        oldPasswordAccountMsg.innerHTML = "Mật khẩu cũ không được trống!";
        isValidate = false;
    } else {
        removeErrStyles(oldPasswordAccountInput, oldPasswordAccountMsg);
        oldPasswordAccountMsg.innerHTML = "";
        isValidate = true;
    }
    return isValidate;
}

function newPasswordAccountValidate() {
    const newPasswordAccountInput = document.querySelector(".auth-form__input-new-pass");
    const newPasswordAccountMsg = document.querySelector(".auth-msg__err-new-pass");
    const password = newPasswordAccountInput.value;

    if (password === "") {
        showErrStyles(newPasswordAccountInput, newPasswordAccountMsg);
        newPasswordAccountMsg.innerHTML = "Mật khẩu mới không được trống!";
        isValidate = false;
    } else {
        removeErrStyles(newPasswordAccountInput, newPasswordAccountMsg);
        newPasswordAccountMsg.innerHTML = "";
        isValidate = true;
    }
    return isValidate;
}

function rePasswordAccountValidate() {
    const newPasswordAccountInput = document.querySelector(".auth-form__input-new-pass");
    const rePasswordAccountInput = document.querySelector(".auth-form__input-re-pass");
    const rePasswordAccountMsg = document.querySelector(".auth-msg__err-re-pass");
    const password = rePasswordAccountInput.value;

    if (password === "") {
        showErrStyles(rePasswordAccountInput, rePasswordAccountMsg);
        rePasswordAccountMsg.innerHTML = "Xác nhận mật khẩu không được trống!";
        isValidate = false;
    } else if (password !== newPasswordAccountInput.value) {
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

function checkOldPassAccountValidate(message) {
    const oldPasswordAccountInput = document.querySelector(".auth-form__input-old-pass");
    const oldPasswordAccountMsg = document.querySelector(".auth-msg__err-old-pass");

    if (message != "") {
        showErrStyles(oldPasswordAccountInput, oldPasswordAccountMsg);
        oldPasswordAccountMsg.innerHTML = `${message}`;
        isValidate = false;
    } else {
        removeErrStyles(oldPasswordAccountInput, oldPasswordAccountMsg);
        oldPasswordAccountMsg.innerHTML = "";
        isValidate = true;
    }
    return isValidate;
}

function checkNewPassAccountValidate(message) {
    const newPasswordAccountInput = document.querySelector(".auth-form__input-new-pass");
    const newPasswordAccountMsg = document.querySelector(".auth-msg__err-new-pass");

    if (message != "") {
        showErrStyles(newPasswordAccountInput, newPasswordAccountMsg);
        newPasswordAccountMsg.innerHTML = `${message}`;
        isValidate = false;
    } else {
        removeErrStyles(newPasswordAccountInput, newPasswordAccountMsg);
        newPasswordAccountMsg.innerHTML = "";
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
    const oldPasswordAccountInput = document.querySelector(".auth-form__input-old-pass");
    const newPasswordAccountInput = document.querySelector(".auth-form__input-new-pass");
    const rePasswordAccountInput = document.querySelector(".auth-form__input-re-pass");
    const submitAccountBtn = document.querySelector(".auth-form__btn-submit"); 

    oldPasswordAccountInput.addEventListener('click', () => {
        oldPasswordAccountValidate();
    });

    newPasswordAccountInput.addEventListener('blur', () => {
        newPasswordAccountValidate();
    });

    rePasswordAccountInput.addEventListener('blur', () => {
        rePasswordAccountValidate();
    });

    submitAccountBtn.addEventListener('click', () => {
        oldPasswordAccountValidate();
        newPasswordAccountValidate();
        rePasswordAccountValidate();
        if (oldPasswordAccountValidate() && newPasswordAccountValidate() && rePasswordAccountValidate()) {
            var formData = new FormData();
            formData.append("userID", getCookies("userID"));
            formData.append("oldPassword", oldPasswordAccountInput.value);
            formData.append("newPassword", newPasswordAccountInput.value);
            formData.append("rePassword", rePasswordAccountInput.value);
            var xhr = new XMLHttpRequest();
            xhr.open('put', '/user/change', true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    const data = JSON.parse(xhr.responseText);

                    console.log(data);

                    if (data.status.statusCode == -1) {
                        checkOldPassAccountValidate(data.status.message);
                        oldPasswordAccountInput.value = "";
                        oldPasswordAccountInput.focus();
                    } else if (data.status.statusCode == -2) {
                        checkNewPassAccountValidate(data.status.message);
                        newPasswordAccountInput.value = "";
                        newPasswordAccountInput.focus();
                    } else if (data.status.statusCode == -3) {
                        checkRePassAccountValidate();
                        rePasswordAccountInput.value = "";
                        rePasswordAccountInput.focus();
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
                                        Đổi mật khẩu thành công!
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