function getAPIProfile() {
    let userID = getCookies("userID");
    if (userID == undefined) {
        userID = 0;
    }
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/user/profile-data?userID=' + userID + '', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);

            setProfile(data);
            
        }
    };
    xhr.send(null);
}
getAPIProfile();

function setProfile(data) {
    let htmlProfile = "";
    htmlProfile += 
    `
    <div class="grid wide">
        <div class="row">
            <div class="col l-2 m-0 c-0">
                <div class="profile__left">
                    <div class="profile__left-header">
                        <img src="/img/${data.userInfo[0].sImageProfile}" alt="" class="profile__left-avatar">
                        <div class="profile__left-account">
                            <div class="profile__left-account-name">${data.userInfo[0].sEmail}</div>
                            <div class="profile__left-account-edit"><i class="uil uil-pen"></i>Chỉnh sửa</div>
                        </div>
                    </div>
                    <div class="profile__left-body">
                        <ul class="profile__left-list">
                            <li class="profile__left-item">
                                <a href="" class="profile__left-link">
                                    <i class="uil uil-user"></i> Tài khoản của tôi
                                </a>
                            </li>
                            <li class="profile__left-item">
                                <a href="" class="profile__left-link">
                                    <i class="uil uil-clipboard-notes"></i> Đơn mua
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col l-10 m-12 c-12">
                <div class="profile">
                    <div class="profile__header">
                        <div class="profile__title">Hồ sơ của tôi</div>
                        <div class="profile__subtitle">Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
                    </div>
                    <div class="profile__avatar">
                        <img height="100" src="/img/${data.userInfo[0].sImageProfile}" alt="" class="profile__avatar-img">
                        <input type="button" onclick="picImage(this)" class="profile__avatar-upload" value="Chọn ảnh">
                        <div class="profile__avatar-sub">Dung lượng file tối đa 1MB <br> Định dạng: .JPG, .PNG</div>
                    </div>
                    <form action="" class="profile__info">
                        <table class="profile__table">
                            <tr class="">
                                    <td>Tên đăng nhập</td>
                                    <td>
                                        <input type="text" readonly value="${data.userInfo[0].sUserName}" class="profile__input-username">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Tên đầy đủ</td>
                                    <td>
                                        <input type="text" value="${data.userInfo[0].sFullName}" class="profile__input-fullname">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Giới tính</td>
                                    <td class="">
                                        <div class="profile__table-box">
                                            <span>`;
                                            if (data.userInfo[0].iGender == 1) {
                                                htmlProfile +=
                                                `<input type="radio" name="gender" value="1" checked id="">`;
                                            } else {
                                                htmlProfile += 
                                                `<input type="radio" name="gender" value="1" id="">`
                                            }
                                            htmlProfile += `
                                            </span>
                                            <label for="">Nam</label>
                                            <span>`;
                                            if (data.userInfo[0].iGender == 0) {
                                                htmlProfile += 
                                                `<input type="radio" name="gender" value="0" checked id="">`;
                                            } else {
                                                htmlProfile += 
                                                `<input type="radio" name="gender" value="0" id="">`;
                                            }
                                            htmlProfile += `
                                            </span>
                                            <label for="">Nữ</label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Ngày sinh</td>
                                    <td><input type="date" name="" value="${setDate(data.userInfo[0].dDateBirth)}" id="" class="profile__input-birth"></td>
                                </tr>
                            <tr>
                                <td></td>
                                <td><button type="button" class="btn btn--primary btn__update-profile" onclick="updateProfile()">Cập nhật</button></td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    </div>`;
    document.querySelector(".app__container").innerHTML = htmlProfile;
}

function setDate(date) {
    var day = new Date(date);
    var yyyy = day.getFullYear();
    var MM = day.getMonth() + 1;
    if (MM < 10) {
        MM = '0' + MM;
    }
    var dd = day.getDate();
    if (dd < 10) {
        dd = '0' + dd;
    }
    return yyyy + '-' + MM + '-' + dd;
}

function picImage(input) {
    input.type = 'file'
}

function updateProfile() {
    const fullName = document.querySelector(".profile__input-fullname").value;
    const avatar = document.querySelector(".profile__avatar-upload").value;
    const birth = document.querySelector(".profile__input-birth").value;
    const gender = document.getElementsByName("gender");
    let checkValue = "";
    for (let i = 0; i < gender.length; i++) {
        if (gender.item(i).checked) {
            checkValue = gender.item(i).value;
        }
        gender.item(i).onchange = () => {
            checkValue = gender.item(i).value;
        };
    }
    console.log({fullName, checkValue, birth, avatar});

    const formData = new FormData();
    formData.append("userID", getCookies("userID"));
    formData.append('fullName', fullName);
    formData.append('gender', checkValue);
    formData.append('image', "no_user.jpg");
    formData.append('birth', birth);
    var xhr = new XMLHttpRequest();
    xhr.open('put', '/user/update-profile', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            openModal();
            document.querySelector(".modal__body").innerHTML = 
            `
                <div class="spinner"></div>
            `;
            setTimeout(() => {
                toast({ title: "Thông báo", msg: `${data.message}`, type: "success", duration: 5000 });
                closeModal();
                document.querySelector(".modal__body").innerHTML = "";
                setTimeout(() => {
                    window.location.assign('/user/profile');
                }, 1000)
            }, 2000);
        }
    }
    xhr.send(formData);
}

function openModal() {
    document.querySelector(".modal").classList.add("open");
}

function closeModal() {
    document.querySelector(".modal").classList.remove("open");
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