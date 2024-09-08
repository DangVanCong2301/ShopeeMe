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
                                        <input type="text" value="${data.users[0].sUserName}" class="portal__shop-input-name">
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
                                <div class="portal__shop-col-1">Tên đầy đủ</div>
                                <div class="portal__shop-col-2 l-6">
                                    <div class="portal__shop-box">
                                        <input type="text" class="portal__shop-input-name">
                                        <span>10/30</span>
                                    </div>
                                </div>
                            </div>
                            <div class="portal__shop-row">
                                <div class="portal__shop-col-1">Giới tính</div>
                                <div class="portal__shop-col-2">
                                    <div class="profile__table-box">
                                        <span>
                                            <input type="radio" name="gender" id="">
                                        </span>
                                        <label for="">Nam</label>
                                        <span>
                                            <input type="radio" name="gender" id="">
                                        </span>
                                        <label for="">Nữ</label>
                                    </div>
                                </div>
                            </div>
                            <div class="portal__shop-row">
                                <div class="portal__shop-col-1">Ngày sinh</div>
                                <div class="portal__shop-col-2">
                                    <input type="date" class="user-portal__input-birth" name="" id="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="portal__shop-bottom">
                        <div class="portal__shop-btn-save hide-on-destop">Lưu</div>
                        <div class="portal__shop-btn-next" onclick="saveUserPoral()">
                            <div class="user-portal__btn-save">
                                <div class="user-portal__btn-save-spinner hide-on-destop"></div>
                                <div class="user-portal__btn-save-text">Lưu</div>
                            </div>
                        </div>
                    </div>
                </div>
    `;
}