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
function oldPasswordSellerValidate() {
    const oldPasswordSellerInput = document.querySelector(".seller-auth__input-old-password");
    const oldPasswordSellerMsg = document.querySelector(".seller-auth__msg-old-password");
    let oldPassword = oldPasswordSellerInput.value;

    if (oldPassword === "") {
        showErrStyles(oldPasswordSellerInput, oldPasswordSellerMsg);
        oldPasswordSellerMsg.innerHTML = "Hãy nhập mật khẩu cũ!";
        isValidate = false;
    } else {
        removeErrStyles(oldPasswordSellerInput, oldPasswordSellerMsg);
        oldPasswordSellerMsg.innerHTML = "";
        isValidate = true;
    }
    return isValidate;
}

function checkOldPasswordSellerValidate(message) {
    const oldPasswordSellerInput = document.querySelector(".seller-auth__input-old-password");
    const oldPasswordSellerMsg = document.querySelector(".seller-auth__msg-old-password");

    if (message != "") {
        showErrStyles(oldPasswordSellerInput, oldPasswordSellerMsg);
        oldPasswordSellerMsg.innerHTML = `${message}`;
        isValidate = false;
    } else {
        removeErrStyles(oldPasswordSellerInput, oldPasswordSellerMsg);
        oldPasswordSellerMsg.innerHTML = "";
        isValidate = true;
    }
    return isValidate;
}

function newPasswordSellerValidate() {
    const newPasswordSellerInput = document.querySelector(".seller-auth__input-new-password");
    const newPasswordSellerMsg = document.querySelector(".seller-auth__msg-new-password");
    let newPassword = newPasswordSellerInput.value;

    if (newPassword === "") {
        showErrStyles(newPasswordSellerInput, newPasswordSellerMsg);
        newPasswordSellerMsg.innerHTML = "Hãy nhập mật khẩu mới!";
        isValidate = false;
    } else {
        removeErrStyles(newPasswordSellerInput, newPasswordSellerMsg);
        newPasswordSellerMsg.innerHTML = "";
        isValidate = true;
    }
    return isValidate;
}

function reNewPasswordSellerValidate() {
    const reNewPasswordSellerInput = document.querySelector(".seller-auth__input-re-new-password");
    const newPasswordSellerInput = document.querySelector(".seller-auth__input-new-password");
    const reNewPasswordSellerMsg = document.querySelector(".seller-auth__msg-re-new-password");
    let newPassword = newPasswordSellerInput.value;
    let reNewPassword = reNewPasswordSellerInput.value;

    if (reNewPassword === "") {
        showErrStyles(reNewPasswordSellerInput, reNewPasswordSellerMsg);
        reNewPasswordSellerMsg.innerHTML = "Hãy xác nhận mật khẩu mới!";
        isValidate = false;
    } else if (reNewPassword != newPassword) {
        showErrStyles(reNewPasswordSellerInput, reNewPasswordSellerMsg);
        reNewPasswordSellerMsg.innerHTML = "Mật khẩu xác nhận không chính xác!";
        isValidate = false;
    } else {
        removeErrStyles(reNewPasswordSellerInput, reNewPasswordSellerMsg);
        reNewPasswordSellerMsg.innerHTML = "";
        isValidate = true;
    }
    return isValidate;
}

const addEvent = (() => {
    const oldPasswordSellerInput = document.querySelector(".seller-auth__input-old-password");
    const newPasswordSellerInput = document.querySelector(".seller-auth__input-new-password");
    const reNewPasswordSellerInput = document.querySelector(".seller-auth__input-re-new-password");
    const submitSellerBtn = document.querySelector(".seller-auth__btn-submit");

    oldPasswordSellerInput.addEventListener("blur", () => {
        oldPasswordSellerValidate();
    });

    newPasswordSellerInput.addEventListener("blur", () => {
        newPasswordSellerValidate();
    });

    reNewPasswordSellerInput.addEventListener("blur", () => {
        reNewPasswordSellerValidate();
    });

    submitSellerBtn.addEventListener("click", () => {
        oldPasswordSellerValidate();
        newPasswordSellerValidate();
        reNewPasswordSellerValidate();
        if (oldPasswordSellerValidate() && newPasswordSellerValidate() && reNewPasswordSellerValidate()) {
            openModal();
            document.querySelector(".modal__body").innerHTML = 
            `
                <div class="spinner"></div>
            `;
            var formData = new FormData();
            formData.append("oldPassword", oldPasswordSellerInput.value);
            formData.append("newPassword", reNewPasswordSellerInput.value);
            var xhr = new XMLHttpRequest();
            xhr.open('post', '/seller/change', true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    const result = JSON.parse(xhr.responseText);
                    console.log(result);

                    if (result.status.statusCode == -1) {
                        setTimeout(() => {
                            closeModal();
                            checkOldPasswordSellerValidate(result.status.message);
                            document.querySelector(".modal__body").innerHTML = "";
                            setTimeout(() => {
                                oldPasswordSellerInput.value = "";
                                //window.location.assign('/user/profile');
                            }, 1000)
                        }, 2000);
                    } 
                    
                    if (result.status.statusCode == 1) {
                        setTimeout(() => {
                            closeModal();
                            toast({ title: "Thông báo", msg: `${result.status.message}`, type: "success", duration: 5000 });
                            document.querySelector(".modal__body").innerHTML = "";
                            setTimeout(() => {
                                oldPasswordSellerInput.value = "";
                                newPasswordSellerInput.value = "";
                                reNewPasswordSellerInput.value = "";
                                window.location.assign('/seller/login');
                            }, 1000)
                        }, 2000);
                    }
                }
            };
            xhr.send(formData);
        }
    });
})();