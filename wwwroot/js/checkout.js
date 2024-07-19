const modal = document.querySelector(".modal");

const mainForm = document.querySelector(".address-form__container");
const updateAddressForm = document.querySelector(".address-form__update");
const newAddressForm = document.querySelector(".address-form__new");

var data;
function getAPICheckout() {
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/checkout/get-data', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            data = JSON.parse(xhr.responseText);
            console.log(data);

            showAddressForm(data);

            setDataAddressNewChoose(data);
        }
    };
    xhr.send(null);
}
getAPICheckout();

function showAddressForm(data) {
    if (data.addresses.length == 0) {
        document.querySelector(".checkout__address-desc").classList.add("hide");
        openNewAddressForm(data);
        modal.classList.add('open');
    }

}

function setDataAddressNewChoose(data) {
    let htmlCities = "";
    for (let i = 0 ; i < data.cities.length; i++) {
        htmlCities += " <li class='address-form__new-choose-detail-city-item' onclick='chooseCityNew(" + data.cities[i].pK_iCityID + ")'>";
        htmlCities += "" + data.cities[i].sCityName + "";
        htmlCities += " </li>";
    }
    document.querySelector(".address-form__new-choose-detail-city-list").innerHTML = htmlCities;
}

function chooseCityNew(FK_iCityID) {
    var city = data.cities.find((obj) => {
        return obj.pK_iCityID === FK_iCityID;
    });

    let htmlDistricts = "";
    for (let i = 0; i < data.districts.length; i++) {
        if (data.districts[i].fK_iCityID == FK_iCityID) {
            addAddressNewChooseDistrictList();
            htmlDistricts +=
                `
                    <li class="address-form__new-choose-detail-district-item" onclick="chooseDistrictNew(${data.districts[i].pK_iDistrictID})">
                        ${data.districts[i].sDistrictName}
                    </li>
                `;
        }
    }
    document.querySelector(".address-form__new-choose-detail-district-list").innerHTML = htmlDistricts;
    document.querySelector(".address-form__new-label-choose").style.display = 'none';
    document.querySelector(".address-form__new-input-choose").value = city.sCityName;
}

function chooseDistrictNew(FK_iDistrictID) {
    var district = data.addressChooses.find((obj) => {
        return obj.pK_iDistrictID === FK_iDistrictID;
    });

    let htmlStreets = "";
    for (let i = 0; i < data.addressChooses.length; i++) {
        if (data.addressChooses[i].pK_iDistrictID == FK_iDistrictID) {
            addAddressNewChooseStreetList();
            htmlStreets += 
            `
                <li class="address-form__new-choose-detail-street-item" onclick="chooseStreetNew(${data.addressChooses[i].pK_iStreetID})">
                    ${data.addressChooses[i].sStreetName}
                </li>
            `;
        }
    }
    document.querySelector(".address-form__new-choose-detail-street-list").innerHTML = htmlStreets;
    document.querySelector(".address-form__new-input-choose").value = district.sCityName + ", " + district.sDistrictName;
}

function chooseStreetNew(PK_iStreetID) {
    var addressChoose = data.addressChooses.find((obj) => {
        return obj.pK_iStreetID === PK_iStreetID;
    });
    console.log(addressChoose);
    document.querySelector(".address-form__new-choose").classList.remove("show");
    document.querySelector(".address-form__new-input-choose").value = addressChoose.sStreetName + ", " + addressChoose.sDistrictName + ", " + addressChoose.sCityName;
    changeTitleAddressNewChoose();
}

function showAddressNewChoose() {
    document.querySelector(".address-form__new-choose").classList.toggle("show");
}

function changeTitleAddressNewChoose() {
    const addressNewChooseTitle = document.querySelectorAll(".address-form__new-choose-detail-title");
    for (let i = 0; i < addressNewChooseTitle.length; i++) {
        addressNewChooseTitle[i].addEventListener('click', () => {
            if (i == 0) {
                addAddressNewChooseCityList();
            } else if (i == 1) {
                addAddressNewChooseDistrictList();
            } else if (i == 2) {
                addAddressNewChooseStreetList()
            } else {
                addAddressNewChooseCityList();
            }
        })
    }
}

function openAddressModal() {
    if (document.querySelector(".spinner") != null) {
        document.querySelector(".spinner").classList.add("hide");
    }
    modal.classList.add('open');
    backMainForm();
}

function closeAddressModal() {
    modal.classList.remove('open')
}

function addAddressNewChooseCityList() {
    const addressNewChooseTitle = document.querySelectorAll(".address-form__new-choose-detail-title");
    const addressNewChooseCityList = document.querySelector(".address-form__new-choose-detail-city");
    const addressNewChooseDistrictList = document.querySelector(".address-form__new-choose-detail-district");
    const addressNewChooseStreetList = document.querySelector(".address-form__new-choose-detail-street");

    addressNewChooseTitle[0].classList.add("active");
    addressNewChooseTitle[1].classList.remove("active");
    addressNewChooseTitle[2].classList.remove("active");
    addressNewChooseCityList.classList.remove("hide");
    addressNewChooseDistrictList.classList.add("hide")
    addressNewChooseStreetList.classList.add("hide");
}

function addAddressNewChooseDistrictList() {
    const addressNewChooseTitle = document.querySelectorAll(".address-form__new-choose-detail-title");
    const addressNewChooseCityList = document.querySelector(".address-form__new-choose-detail-city");
    const addressNewChooseDistrictList = document.querySelector(".address-form__new-choose-detail-district");
    const addressNewChooseStreetList = document.querySelector(".address-form__new-choose-detail-street");

    addressNewChooseTitle[1].classList.add("active");
    addressNewChooseTitle[0].classList.remove("active");
    addressNewChooseTitle[2].classList.remove("active");
    addressNewChooseCityList.classList.add("hide")
    addressNewChooseStreetList.classList.add("hide");
    addressNewChooseDistrictList.classList.remove("hide");
}

function addAddressNewChooseStreetList() {
    const addressNewChooseTitle = document.querySelectorAll(".address-form__new-choose-detail-title");
    const addressNewChooseCityList = document.querySelector(".address-form__new-choose-detail-city");
    const addressNewChooseDistrictList = document.querySelector(".address-form__new-choose-detail-district");
    const addressNewChooseStreetList = document.querySelector(".address-form__new-choose-detail-street");

    addressNewChooseTitle[2].classList.add("active");
    addressNewChooseTitle[0].classList.remove("active");
    addressNewChooseTitle[1].classList.remove("active");
    addressNewChooseCityList.classList.add("hide");
    addressNewChooseDistrictList.classList.add("hide");
    addressNewChooseStreetList.classList.remove("hide");
}

function openUpdate() {
    if (mainForm != null && newAddressForm != null) {
        mainForm.classList.add("hide");
        newAddressForm.classList.add("hide");
    }
    document.querySelector(".modal__body").innerHTML = 
    `
        <div class="address-form">
            <div class="address-form__update">
                <div class="address-form__update-title">Câp nhật địa chỉ</div>
                <div class="address-form__update-body">
                    <div class="address-form__update-div">
                        <div class="address-form__update-box">
                            <div class="address-form__update-box-left">
                                <input type="text" class="address-form__update-input">
                                <label for="" class="address-form__update-label">Họ và tên</label>
                            </div>
                            <div class="address-form__update-box-left">
                                <input type="text" class="address-form__update-input address-form__update-input-phone">
                                <div class="address-form__update-input-phone-suggest">
                                    (+84) 347797502 <button>Sử dụng</button>
                                </div>
                                <label for="" class="address-form__update-label">Số điện thoại</label>
                            </div>
                        </div>
                    </div>
                    <div class="address-form__update-div">
                        <input type="text" class="address-form__update-input address-form__update-input-choose"
                            onclick="showAddressUpdateChoose()">
                        <div class="address-form__update-choose">
                            <div class="address-form__update-choose-detail">
                                <div class="address-form__update-choose-detail-header">
                                    <div class="address-form__update-choose-detail-title active">Tỉnh/Thành phố</div>
                                    <div class="address-form__update-choose-detail-title">Quận/Huyện</div>
                                    <div class="address-form__update-choose-detail-title">Phường/Xã</div>
                                </div>
                                <div class="address-form__update-choose-detail-body">
                                    <div class="address-form__update-choose-detail-city">
                                        <ul class="address-form__update-choose-detail-city-list">

                                        </ul>
                                    </div>
                                    <div class="address-form__update-choose-detail-district hide">
                                        <ul class="address-form__update-choose-detail-district-list">

                                        </ul>
                                    </div>
                                    <div class="address-form__update-choose-detail-street hide">
                                        <ul class="address-form__update-choose-detail-street-list">
                                            <li class="address-form__update-choose-detail-street-item">
                                                Định Công
                                            </li>
                                            <li class="address-form__update-choose-detail-street-item">
                                                Trần Đại Nghĩa
                                            </li>
                                            <li class="address-form__update-choose-detail-street-item">
                                                Định Công
                                            </li>
                                            <li class="address-form__update-choose-detail-street-item">
                                                Trần Đại Nghĩa
                                            </li>
                                            <li class="address-form__update-choose-detail-street-item">
                                                Định Công
                                            </li>
                                            <li class="address-form__update-choose-detail-street-item">
                                                Trần Đại Nghĩa
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <i class="uil uil-angle-down address-form__update-div-icon"></i>
                        <label for="" class="address-form__update-label address-form__update-label-choose">Tỉnh/Thành
                            phố, Quận/Huyện, Phường/Xã</label>
                    </div>
                    <div class="address-form__update-div">
                        <textarea name="" id="" class="address-form__update-textarea"></textarea>
                        <label for="" class="address-form__update-label">Địa chỉ cụ thể</label>
                    </div>
                    <div class="address-form__update-please">
                        <i class="uil uil-bell address-form__update-please-icon"></i>
                        <div class="address-form__update-please-desc">
                            <div class="address-form__update-please-desc-title">Vui lòng ghim địa chỉ chính xác</div>
                            <div class="address-form__update-please-desc-subtitle">Hãy chắc chắn vị trí trên bản đồ được
                                ghim đúng để
                                Shopee gửi hàng cho bạn nhé!</div>
                        </div>
                    </div>
                    <div class="address-form__update-map">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3932.0349263999647!2d105.52882531470965!3d9.76310899301383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x746941d0e6aacf0!2zOcKwNDUnNDcuMiJOIDEwNcKwMzEnNTEuNyJF!5e0!3m2!1svi!2s!4v1659586535479!5m2!1svi!2s"
                            width="100%" height="120px"></iframe>
                    </div>
                    <div class="address-form__update-type">
                        <div class="address-form__update-type-title">Loại địa chỉ:</div>
                        <div class="address-form__update-type-btns">
                            <button class="address-form__update-type-btn">Nhà riêng</button>
                            <button class="address-form__update-type-btn">Văn phòng</button>
                        </div>
                    </div>
                    <div class="address-form__update-set-default">
                        <input type="checkbox" class="address-form__update-set-default-input">
                        <label for="">Đặt làm mặc định</label>
                    </div>
                </div>
                <div class="address-form__update-footer">
                    <div class="address-form__update-footer-btns">
                        <button type="button" onclick="backMainForm()" class="btn">Trở lại</button>
                        <button class="btn btn--primary">Hoàn thành</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function backMainForm() {
    if (updateAddressForm != null && newAddressForm != null) {
        updateAddressForm.classList.add("hide");
        newAddressForm.classList.add("hide");
    }
    document.querySelector(".modal__body").innerHTML = 
    `
        <div class="address-form">
            <div class="address-form__container">
                <div class="address-form__title">Địa chỉ của tôi</div>
                <div class="address-form__body">
                    <ul class="address-form__list">
                        <li class="address-form__item">
                            <div class="address-form__item-box">
                                <input type="radio" name="address" class="address-form__item-input">
                            </div>
                            <div class="address-form__item-content">
                                <div class="address-form__item-header">
                                    <div class="address-form__item-header-info">
                                        <div class="address-form__item-name">Đặng Văn Công</div>
                                        <div class="address-form__item-phone">(+84) 347797502</div>
                                    </div>
                                    <a href="javascript:openUpdate()" class="address-form__item-update">Cập nhật</a>
                                </div>
                                <div class="address-form__item-body">
                                    <div class="address-form__item-body-row">Số 20, Ngõ 259 Định Công, Phường Định Công
                                    </div>
                                    <div class="address-form__item-body-row">Quận Hoàng Mai, Hà Nội</div>
                                </div>
                                <button class="address-form__item-sub">Mặc định</button>
                            </div>
                        </li>
                        <li class="address-form__item">
                            <div class="address-form__item-box">
                                <input type="radio" name="address" class="address-form__item-input">
                            </div>
                            <div class="address-form__item-content">
                                <div class="address-form__item-header">
                                    <div class="address-form__item-header-info">
                                        <div class="address-form__item-name">Đặng Văn Công</div>
                                        <div class="address-form__item-phone">(+84) 347797502</div>
                                    </div>
                                    <a href="" class="address-form__item-update">Cập nhật</a>
                                </div>
                                <div class="address-form__item-body">
                                    <div class="address-form__item-body-row">Số 20, Ngõ 259 Định Công, Phường Định Công
                                    </div>
                                    <div class="address-form__item-body-row">Quận Hoàng Mai, Hà Nội</div>
                                </div>
                                <button class="address-form__item-sub">Mặc định</button>
                            </div>
                        </li>
                    </ul>
                    <button class="address-form__add-btn" onclick="openNewAddressForm()">
                        <i class="uil uil-plus address-form__add-btn-icon"></i>
                        <span>Thêm địa chỉ mới</span>
                    </button>
                </div>
                <div class="address-form__footer">
                    <button class="btn address-form__btn-destroy" onclick="closeAddressModal()">Huỷ</button>
                    <button class="btn btn--primary">Xác nhận</button>
                </div>
            </div>
        </div>
    `;
}

function openNewAddressForm() {
    if (mainForm != null && updateAddressForm != null) {
        mainForm.classList.add("hide")
        updateAddressForm.classList.add("hide")
    }
    document.querySelector(".modal__body").innerHTML = 
    `
        <div class="address-form">
            <div class="address-form__new">
                <div class="address-form__new-title">
                        Địa chỉ mới
                        <div class="address-form__new-title-sub">Để đặt hàng, vui lòng thêm địa chỉ nhận hàng</div>
                    </div>
                    <div class="address-form__new-body">
                        <div class="address-form__new-div">
                            <div class="address-form__new-box">
                                <div class="address-form__new-box-left">
                                    <input type="text" class="address-form__new-input address-form__new-input-fullname">
                                    <label for="" class="address-form__new-label address-form__new-label-fullname">Họ và tên</label>
                                </div>
                                <div class="address-form__new-box-right">
                                    <input type="text" class="address-form__new-input address-form__new-input-phone">
                                    <label for="" class="address-form__new-label address-form__new-label-phone">Số điện thoại</label>
                                </div>
                            </div>
                        </div>
                        <div class="address-form__new-div">
                            <input type="text" class="address-form__new-input address-form__new-input-choose" onclick="showAddressNewChoose()">
                            <div class="address-form__new-choose">
                                <div class="address-form__new-choose-detail">
                                    <div class="address-form__new-choose-detail-header">
                                        <div class="address-form__new-choose-detail-title active">Tỉnh/Thành phố</div>
                                        <div class="address-form__new-choose-detail-title">Quận/Huyện</div>
                                        <div class="address-form__new-choose-detail-title">Phường/Xã</div>
                                    </div>
                                    <div class="address-form__new-choose-detail-body">
                                        <div class="address-form__new-choose-detail-city">
                                            <ul class="address-form__new-choose-detail-city-list">
                                                
                                            </ul>
                                        </div>
                                        <div class="address-form__new-choose-detail-district hide">
                                            <ul class="address-form__new-choose-detail-district-list">
                                                
                                            </ul>
                                        </div>
                                        <div class="address-form__new-choose-detail-street hide">
                                            <ul class="address-form__new-choose-detail-street-list">
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <i class="uil uil-angle-down address-form__new-div-icon"></i>
                            <label for="" class="address-form__new-label address-form__new-label-choose">Tỉnh/Thành phố, Quận/Huyện, Phường/Xã</label>
                        </div>
                        <div class="address-form__new-div">
                            <textarea name="" id="" class="address-form__new-textarea address-form__new-textarea-desc"></textarea>
                            <label for=""class="address-form__new-label address-form__new-label-desc">Địa chỉ cụ thể</label>
                        </div>
                        <div class="address-form__new-please">
                            <i class="uil uil-bell address-form__new-please-icon"></i>
                            <div class="address-form__new-please-desc">
                                <div class="address-form__new-please-desc-title">Vui lòng ghim địa chỉ chính xác</div>
                                <div class="address-form__new-please-desc-subtitle">Hãy chắc chắn vị trí trên bản đồ được ghim đúng để Shopee gửi hàng cho bạn nhé!</div>
                            </div>
                        </div>
                        <div class="address-form__new-map">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3932.0349263999647!2d105.52882531470965!3d9.76310899301383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x746941d0e6aacf0!2zOcKwNDUnNDcuMiJOIDEwNcKwMzEnNTEuNyJF!5e0!3m2!1svi!2s!4v1659586535479!5m2!1svi!2s" width="100%" height="120px" ></iframe>
                        </div>
                        <div class="address-form__new-type">
                            <div class="address-form__new-type-title">Loại địa chỉ:</div>
                            <div class="address-form__new-type-btns">
                                <button class="address-form__new-type-btn">Nhà riêng</button>
                                <button class="address-form__new-type-btn">Văn phòng</button>
                            </div>
                        </div>
                        <div class="address-form__new-set-default">
                            <input type="checkbox" class="address-form__new-set-default-input">
                            <label for="">Đặt làm mặc định</label>
                        </div>
                    </div>
                    <div class="address-form__new-footer">
                        <div class="address-form__new-footer-btns">
                            <button class="btn" onclick="backMainForm()">Trở lại</button>
                            <button class="btn btn--primary address-form__new-btn">Hoàn thành</button>
                        </div>
                    </div>
            </div>
        </div>
    `;
    if (data.users.length != 0) {
        document.querySelector(".address-form__new-label-fullname").style.display = 'none';
        document.querySelector(".address-form__new-input-fullname").value = data.users[0].sFullName;
    }
    addEvent();
}