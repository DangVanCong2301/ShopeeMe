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
function phoneSellerValidate() {
    const phoneSellerInput = document.querySelector(".seller-auth__input-phone");
    const phoneSellerMsg = document.querySelector(".seller-auth__msg-phone");
    let phone = phoneSellerInput.value;

    const constainsNumber = () => {
        for (let i = 0; i < phone.length; i++) {
            if (isNaN(parseInt(phone[i]))) {
                return true;
                break;
            }
        }
        return false;
    }; 

    if (phone === "") {
        showErrStyles(phoneSellerInput, phoneSellerMsg);
        phoneSellerMsg.innerHTML = "Hãy nhập mật khẩu";
        isValidate = false;
    } else if (constainsNumber()) {
        showErrStyles(phoneSellerInput, phoneSellerMsg);
        phoneSellerMsg.innerHTML = "Số điện thoại không được chứa ký tự!";
        isValidate = false;
    } else {
        removeErrStyles(phoneSellerInput, phoneSellerMsg);
        phoneSellerMsg.innerHTML = "";
        isValidate = true;
    }
    return isValidate;
}

function passwordSellerValidate() {
    const passwordSellerInput = document.querySelector(".seller-auth__input-password");
    const passwordSellerMsg = document.querySelector(".seller-auth__msg-password");
    const password = passwordSellerInput.value;

    if (password === "") {
        showErrStyles(passwordSellerInput, passwordSellerMsg);
        passwordSellerMsg.innerHTML = "Mật khẩu không được trống!";
        isValidate = false;
    } else {
        removeErrStyles(passwordSellerInput, passwordSellerMsg);
        passwordSellerMsg.innerHTML = "";
        isValidate = true;
    }
    return isValidate;
}

const addEvent = (() => {
    const phoneSellerInput = document.querySelector(".seller-auth__input-phone");
    const passwordSellerInput = document.querySelector(".seller-auth__input-password");
    const submitSellerBtn = document.querySelector(".seller-auth__btn-submit");

    phoneSellerInput.addEventListener("blur", () => {
        phoneSellerValidate();
    });

    passwordSellerInput.addEventListener("blur", () => {
        passwordSellerValidate();
    });

    submitSellerBtn.addEventListener("click", () => {
        phoneSellerValidate();
        passwordSellerValidate();
        if (phoneSellerValidate() && passwordSellerValidate()) {
            openModal();
            document.querySelector(".modal__body").innerHTML = 
            `
                <div class="spinner"></div>
            `;
            setTimeout(() => {
                closeModal();
                document.querySelector(".modal__body").innerHTML = "";
                setTimeout(() => {
                    //window.location.assign('/user/profile');
                }, 1000)
            }, 2000);
        }
    });
})();