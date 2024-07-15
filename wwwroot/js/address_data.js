let cities = [
    {
        PK_iCityID: 1,
        sCityName: "Hà Nội"
    },
    {
        PK_iCityID: 2,
        sCityName: "Nam Định"
    }
]

let districts = [
    {
        PK_iDistrictID: 1,
        FK_iCityID: 1,
        sDistrictName: "Hoàng Mai",
        sCityName: "Hà Nội"
    },
    {
        PK_iDistrictID: 2,
        FK_iCityID: 1,
        sDistrictName: "Thanh Xuân",
        sCityName: "Hà Nội"
    },
    {
        PK_iDistrictID: 3,
        FK_iCityID: 1,
        sDistrictName: "Hai Bà Trưng",
        sCityName: "Hà Nội"
    },
    {
        PK_iDistrictID: 4,
        FK_iCityID: 2,
        sDistrictName: "Hải Hậu",
        sCityName: "Nam Định"
    },
    {
        PK_iDistrictID: 5,
        FK_iCityID: 2,
        sDistrictName: "Xuân Trường",
        sCityName: "Nam Định"
    }
]

let streets = [
    {
        PK_iStreetID: 1,
        FK_iDistrictID: 1,
        sStreetName: "Định Công",
        sDistrictName: "Hoàng Mai",
        sCityName: "Hà Nội"
    },
    {
        PK_iStreetID: 2,
        FK_iDistrictID: 1,
        sStreetName: "Trần Nguyên Đán",
        sDistrictName: "Hoàng Mai",
        sCityName: "Hà Nội"
    },
    {
        PK_iStreetID: 3,
        FK_iDistrictID: 3,
        sStreetName: "Lê Thanh Nghị",
        sDistrictName: "Hai Bà Trưng",
        sCityName: "Hà Nội"
    },
    {
        PK_iStreetID: 4,
        FK_iDistrictID: 5,
        sStreetName: "Xóm 7",
        sDistrictName: "Xuân Trường",
        sCityName: "Nam Định"
    }
]