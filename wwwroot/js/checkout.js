const modal = document.querySelector(".modal");
const addressNewChooseTitle = document.querySelectorAll(".address-form__new-choose-detail-title");
const addressNewChooseCityList = document.querySelector(".address-form__new-choose-detail-city");
const addressNewChooseDistrictList = document.querySelector(".address-form__new-choose-detail-district");
const addressNewChooseStreetList = document.querySelector(".address-form__new-choose-detail-street");

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
        if (data.users.length != 0) {
            document.querySelector(".address-form__new-label-fullname").style.display = 'none';
            document.querySelector(".address-form__new-input-fullname").value = data.users[0].sFullName;
        }
        openNewAddressForm();
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
    modal.classList.add('open')
}

function closeAddressModal() {
    modal.classList.remove('open')
}

function addAddressNewChooseCityList() {
    addressNewChooseTitle[0].classList.add("active");
    addressNewChooseTitle[1].classList.remove("active");
    addressNewChooseTitle[2].classList.remove("active");
    addressNewChooseCityList.classList.remove("hide");
    addressNewChooseDistrictList.classList.add("hide")
    addressNewChooseStreetList.classList.add("hide");
}

function addAddressNewChooseDistrictList() {
    addressNewChooseTitle[1].classList.add("active");
    addressNewChooseTitle[0].classList.remove("active");
    addressNewChooseTitle[2].classList.remove("active");
    addressNewChooseCityList.classList.add("hide")
    addressNewChooseStreetList.classList.add("hide");
    addressNewChooseDistrictList.classList.remove("hide");
}

function addAddressNewChooseStreetList() {
    addressNewChooseTitle[2].classList.add("active");
    addressNewChooseTitle[0].classList.remove("active");
    addressNewChooseTitle[1].classList.remove("active");
    addressNewChooseCityList.classList.add("hide");
    addressNewChooseDistrictList.classList.add("hide");
    addressNewChooseStreetList.classList.remove("hide");
}

function openUpdate() {
    mainForm.style.right = "100%";
    updateAddressForm.style.right = "0";
}

function backMainForm() {
    mainForm.style.right = '0';
    updateAddressForm.style.right = "100%";
    addAddressForm.style.right = "100%";
}

function openNewAddressForm() {
    mainForm.classList.add("hide")
    updateAddressForm.classList.add("hide")
    newAddressForm.classList.remove("hide");
}