function getAPIUserPotal() {
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/user/get-data-portal', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);
            addUserPortal(data);
        }
    };
    xhr.send(null);
    document.querySelector(".app").classList.add("hight");
}
getAPIUserPotal();

function addUserPortal(data) {
    document.querySelector(".user-portal__btn-add").addEventListener('click', () => {
        openUserPortal(data);
    });
}
function openUserPortal(data) {
    document.querySelector(".user-portal__start").classList.add("hide-on-destop");
    document.querySelector(".user-portal__container").classList.remove("hide-on-destop");
    document.querySelector(".user-portal__body").innerHTML = 
    `
                <div class="portal__shop">
                    <div class="portal__shop-container">
                        <div class="portal__shop-form">
                            <div class="portal__shop-row">
                                <div class="portal__shop-col-1">Tên đăng nhập</div>
                                <div class="portal__shop-col-2 l-6">
                                    <div class="portal__shop-box">
                                        <input type="text" value="${data.users[0].sUserName}" readonly class="portal__shop-input-name">
                                        <span>10/30</span>
                                    </div>
                                </div>
                            </div>
                            <div class="portal__shop-row">
                                <div class="portal__shop-col-1">Ảnh đại diện</div>
                                <div class="portal__shop-col-2">
                                    <div class="admin__profile-shop-table-logo">
                                        <div class="admin__profile-shop-table-logo-thumb">
                                            <img src="/img/no_user.jpg"
                                                class="admin__profile-shop-table-logo-img" alt="">
                                            <div class="admin__profile-shop-table-logo-pic">Sửa</div>
                                        </div>
                                        <ul class="admin__profile-shop-table-logo-sub">
                                            <li class="admin__profile-shop-table-logo-sub-text">
                                                Kích thước hình ảnh tiêu chuẩn: Chiều rộng 300px, Chiều cao 300px
                                            </li>
                                            <li class="admin__profile-shop-table-logo-sub-text">
                                                Dung lượng file tối đa 2.0MB
                                            </li>
                                            <li class="admin__profile-shop-table-logo-sub-text">
                                                Định dạng file được hỗ trợ: JPG, JPEG, PNG
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="portal__shop-row">
                                <div class="portal__shop-col-1 portal__tax-code-name">Tên đầy đủ</div>
                                <div class="portal__shop-col-2 l-6">
                                    <div class="portal__shop-box user-portal__box-fullname">
                                        <input type="text" class="portal__shop-input-name user-portal__input-fullname">
                                        <span>10/30</span>
                                    </div>
                                    <div class="user-portal__msg-err user-portal__msg-err-fullname hide-on-destop">Tên đầy đủ không được trống!</div>
                                </div>
                            </div>
                            <div class="portal__shop-row">
                                <div class="portal__shop-col-1">Giới tính</div>
                                <div class="portal__shop-col-2">
                                    <div class="profile__table-box">
                                        <span>
                                            <input type="radio" name="gender" value="1" id="">
                                        </span>
                                        <label for="">Nam</label>
                                        <span>
                                            <input type="radio" name="gender" value="0" id="">
                                        </span>
                                        <label for="">Nữ</label>
                                    </div>
                                    <div class="user-portal__msg-err user-portal__msg-err-gender hide-on-destop">Bạn chưa chọn giới tính!</div>
                                </div>
                            </div>
                            <div class="portal__shop-row">
                                <div class="portal__shop-col-1">Ngày sinh</div>
                                <div class="portal__shop-col-2">
                                    <input type="date" class="user-portal__input-birth" name="" id="">
                                    <div class="user-portal__msg-err user-portal__msg-err-birth hide-on-destop">Bạn chưa nhập ngày sinh!</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="portal__shop-bottom">
                        <div class="portal__shop-btn-save hide-on-destop">Lưu</div>
                        <div class="portal__shop-btn-next user-portal__btn-save-portal">
                            <div class="user-portal__btn-save">
                                <div class="user-portal__btn-save-spinner hide-on-destop"></div>
                                <div class="user-portal__btn-save-text">Lưu</div>
                            </div>
                        </div>
                    </div>
                </div>
    `;
    addEvent();
}

// Validate User Portal Page
function showErrStyles(msg, inputBox) {
    inputBox.classList.add("err");
    msg.classList.add("err");
    msg.classList.remove("hide-on-destop");
}

function removeErrStyles(msg, inputBox) {
    inputBox.classList.remove("err");
    msg.classList.remove("err");
    msg.classList.add("hide-on-destop");
}

let isValidate = true;
function fullNameUserPortalValidate() {
    const fullNameUserPortalBox = document.querySelector(".user-portal__box-fullname");
    const fullNameUserPortalInput = document.querySelector(".user-portal__input-fullname");
    const fullNameUserPortalMsg = document.querySelector(".user-portal__msg-err-fullname");
    let fullName = fullNameUserPortalInput.value;

    // Xoá khoảng cách
    fullName = fullName.replaceAll(" ", "");
    if (fullName == "") {
        showErrStyles(fullNameUserPortalMsg, fullNameUserPortalBox);
        isValidate = false;
    } else {
        removeErrStyles(fullNameUserPortalMsg, fullNameUserPortalBox);
        isValidate = true;
    }
    return isValidate;
}

let checkValue = "";
function genderUserPortalValidate() {
    const genderUserPortalCheck = document.getElementsByName("gender");
    const genderUserPortalMsg = document.querySelector(".user-portal__msg-err-gender");
    checkValue = "";
    for (let i = 0; i < genderUserPortalCheck.length; i++) {
        if (genderUserPortalCheck.item(i).checked) {
            checkValue = genderUserPortalCheck.item(i).value;
        }
    }
    if (checkValue == "") {
        genderUserPortalMsg.classList.remove("hide-on-destop");
        isValidate = false;
    } else {
        genderUserPortalMsg.classList.add("hide-on-destop")
        isValidate = true;
    }
    return isValidate;
}

function birthUserPortalValidate() {
    const birthUserPortalInput = document.querySelector(".user-portal__input-birth");
    const birthUserPortalMsg = document.querySelector(".user-portal__msg-err-birth");

    let birth = birthUserPortalInput.value;
    if (birth == "") {
        showErrStyles(birthUserPortalMsg, birthUserPortalInput);
        isValidate = false;
    } else {
        removeErrStyles(birthUserPortalMsg, birthUserPortalInput);
        isValidate = true;
    }
    return isValidate;
}

function addEvent() {
    const fullNameUserPortInput = document.querySelector(".user-portal__input-fullname");

    fullNameUserPortInput.addEventListener('blur', () => {
        fullNameUserPortalValidate();
    });

    document.querySelector(".user-portal__btn-save-portal").addEventListener('click', () => {
        saveUserPoral();
    });
}

function saveUserPoral() {
    fullNameUserPortalValidate();
    genderUserPortalValidate();
    birthUserPortalValidate();
    if (fullNameUserPortalValidate() && genderUserPortalValidate() && birthUserPortalValidate()) {
        addUserInfo();
    }
}

function addUserInfo() {
    const fullName = document.querySelector(".user-portal__input-fullname").value;
    const gender = checkValue;
    const birth = document.querySelector(".user-portal__input-birth").value;
    
    var formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("gender", gender);
    formData.append("birth", birth);
    formData.append("image", "no_user.jpg");
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/user/add-user-portal', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const result = JSON.parse(xhr.responseText);
            console.log(result);

            document.querySelector(".user-portal__btn-save-spinner").classList.remove("hide-on-destop");
            setTimeout(() => {
                toast({ title: "Thông báo", msg: `${result.message}`, type: "success", duration: 5000 });
                setTimeout(() => {
                    document.querySelector(".user-portal__btn-save-spinner").classList.remove("hide-on-destop");
                    document.querySelector(".portal__step-line-1").classList.add("active");
                    document.querySelectorAll(".portal__step")[1].classList.add("active");
                    document.querySelector(".portal__shop").classList.add("hide-on-destop");
                    document.querySelector(".user-portal__success").classList.remove("hide-on-destop");
                }, 1000);
            }, 2000)
        }
    }
    xhr.send(formData);

}