const modal = document.querySelector(".modal");
const addressNewChooseTitle = document.querySelectorAll(".address-form__new-choose-title");
const addressNewChooseCityList = document.querySelector(".address-form__new-choose-city");
const addressNewChooseDistrictList = document.querySelector(".address-form__new-choose-district");
const addressNewChooseStreetList = document.querySelector(".address-form__new-choose-street");

const mainForm = document.querySelector(".address-form__container");
const updateAddressForm = document.querySelector(".address-form__update");
const addAddressForm = document.querySelector(".address-form__new");

function getAPICheckout() {
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/checkout/get-data', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);

            showAddressForm(data);

            setDataAddressNewChoose();
        }
    };
    xhr.send(null);
}
getAPICheckout();

function showAddressForm(data) {
    if (data.addresses.length == 0) {
        document.querySelector(".checkout__address-desc").classList.add("hide");
        openNewAddressForm();
        modal.classList.add('open');
    }

}

function setDataAddressNewChoose() {
    let htmlCities = "";
    for (let i = 0 ; i < cities.length; i++) {
        htmlCities += " <li class='address-form__add-detail-city-item' onclick='chooseCityNew(" + cities[i].PK_iCityID + ")'>";
        htmlCities += "" + cities[i].sCityName + "";
        htmlCities += " </li>";
    }
    document.querySelector(".address-form__new-choose-city-list").innerHTML = htmlCities;
}

function chooseCityNew(PK_iCityID) {
    var city = cities.find((obj) => {
        return obj.PK_iCityID === PK_iCityID;
    });

    let htmlDistricts = "";
    for (let i = 0; i < districts.length; i++) {
        if (districts[i].FK_iCityID == PK_iCityID) {
            addAddressNewChooseDistrictList();
            htmlDistricts +=
                `
                    <li class="address-form__add-detail-district-item" onclick="chooseDistrictNew(${districts[i].PK_iDistrictID})">
                        ${districts[i].sDistrictName}
                    </li>
                `;
        }
    }
    document.querySelector(".address-form__new-choose-district-list").innerHTML = htmlDistricts;
    document.querySelector(".address-form__new-label-choose").style.display = 'none';
    document.querySelector(".address-form__new-input-choose").value = city.sCityName;
}

function chooseDistrictNew(PK_iDistrictID) {
    var district = districts.find((obj) => {
        return obj.PK_iDistrictID === PK_iDistrictID;
    });

    let htmlStreets = "";
    for (let i = 0; i < streets.length; i++) {
        if (streets[i].FK_iDistrictID == PK_iDistrictID) {
            addAddressNewChooseStreetList();
            htmlStreets += 
            `
                <li class="address-form__add-detail-street-item" onclick="chooseStreetNew(${streets[i].PK_iStreetID})">
                    ${streets[i].sStreetName}
                </li>
            `;
        }
    }
    document.querySelector(".address-form__new-choose-street-list").innerHTML = htmlStreets;
    document.querySelector(".address-form__new-input-choose").value = district.sCityName + ", " + district.sDistrictName;
    changeTitleAddressNewChoose();
}

function chooseStreetNew(PK_iStreetID) {
    var street = streets.find((obj) => {
        return obj.PK_iStreetID === PK_iStreetID;
    });
    document.querySelector(".address-form__new-choose").classList.remove("show");
    document.querySelector(".address-form__new-input-choose").value = "Phố " + street.sStreetName + ", Quận " + street.sDistrictName + ", " + street.sCityName ;
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
    addressNewChooseCityList.style.right = '0';
    addressNewChooseDistrictList.style.right = '-100%';
    addressNewChooseStreetList.style.right = "-200%";
}

function addAddressNewChooseDistrictList() {
    addressNewChooseTitle[1].classList.add("active");
    addressNewChooseTitle[0].classList.remove("active");
    addressNewChooseTitle[2].classList.remove("active");
    addressNewChooseCityList.style.right = '100%';
    addressNewChooseStreetList.style.right = '-200%';
    addressNewChooseDistrictList.style.right = '0';
}

function addAddressNewChooseStreetList() {
    addressNewChooseTitle[2].classList.add("active");
    addressNewChooseTitle[0].classList.remove("active");
    addressNewChooseTitle[1].classList.remove("active");
    addressNewChooseCityList.style.right = '100%';
    addressNewChooseDistrictList.style.right = '-100%';
    addressNewChooseStreetList.style.right = '0';
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
    mainForm.style.right = '100%';
    updateAddressForm.style.right = '100%';
    addAddressForm.style.right = '0';
}