function getAPISiteAdmin() {
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/admin/get-data', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);
            
            setAccount(data);
        }
    };
    xhr.send(null);
}

getAPISiteAdmin();

function setAccount(data) {
    let htmlAccount = "";
    htmlAccount += 
    `
                    <div class="header__account-avatar">
                            <img src="/img/no_user.jpg" class="header__account-avatar-img" alt="">
                        </div>
                        <div class="header__account-info">
                            <span class="header__account-info-name">${data.username}</span>
                            <div class="header__account-info-down">
                                <i class="uil uil-angle-down header__account-info-icon"></i>
                            </div>
                        </div>
                        <div class="header__account-manager">
                            <ul class="header__navbar-user-menu">
                                <li class="header__navbar-user-item">
                                    <div class="header__account-manager-info">
                                        <img src="/img/no_user.jpg" alt="" class="header__account-manager-img">
                                        <div class="header__account-manager-name">${data.username}</div>
                                    </div>
                                </li>
                                <li class="header__navbar-user-item header__navbar-user-item--separate">
                                    <a href="/user/logout">
                                        <i class="uil uil-signout header__account-manager-icon"></i>
                                        Đăng xuất
                                    </a>
                                </li>
                            </ul>
                        </div>
    `;
    document.querySelector(".header__account").innerHTML = htmlAccount;
}

// Tách lấy chữ số
// Nguồn: http://vncoding.net/2015/10/30/tach-cac-chu-so-thuoc-hang-tram-hang-chuc-hang-don-vi/
function money(number) {
    let result = ``; // Nếu là chuỗi thì trán đặt biến là const
    // Vì Const là một hằng số, vì vậy khi khai báo biến const thì bạn phải gán giá trị cho nó luôn, 
    // sau này cũng không thể thay đổi giá trị cho biến.
    // Nguồn: https://freetuts.net/bien-va-khai-bao-bien-trong-javascript-265.html
    // Ví dụ số 9899999
    let millions = Math.floor(number / 1000000); // Chia cho 1000000 và làm tròn số ta được 9
    let hundred_thousand = Math.floor((number % 1000000) / 100000); // Chia lấy phần dư ta được 899999 và tiếp tục chia cho 100000 và làm tròn ta được 8
    let tens_of_thousands = Math.floor((number % 1000000 % 100000) / 10000); // Tương tự lấy phần dư của hàng trục nghìn rồi chia cho 10000 ta được 9
    let thousand = Math.floor((number % 1000000 % 100000 % 10000) / 1000); // Lấy phần dư hàng nghìn rồi chia cho 1000
    let hundreds = Math.floor((number % 1000000 % 100000 % 10000 % 1000) / 100); // Lấy phần dư hàng trăm chia cho 100
    let tens = Math.floor((number % 1000000 % 100000 % 10000 % 1000 % 100) / 10); // Lấy phần dư của hàng chục chia cho 10
    let unit = Math.floor(number % 1000000 % 100000 % 10000 % 1000 % 100 % 10); // Lấy phần dư hàng đơn vị
    if (millions == 0 && hundred_thousand != 0) {
        result = `${hundred_thousand}${tens_of_thousands}${thousand}.${hundreds}${tens}${unit}`;
    } else if (millions == 0 && hundred_thousand == 0) {
        result = `${tens_of_thousands}${thousand}.${hundreds}${tens}${unit}`;
    } else {
        result = `${millions}.${hundred_thousand}${tens_of_thousands}${thousand}.${hundreds}${tens}${unit}`;
    }
    return result;
}