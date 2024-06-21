// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

function getData() {
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/Home/GetData', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);

            let htmlCartDetail = "";

            if (data.cartDetails != []) {
                htmlCartDetail += data.cartDetails.map(obj => `
                <li class="header__cart-item">
                    <div class="header__cart-item-img">
                        <img src="/img/${obj.sImageUrl}" class="header__cart-item-img" alt="">
                    </div>
                    <div class="header__cart-item-info">
                        <div class="header__cart-item-head">
                            <h5 class="header__cart-item-name">${obj.sProductName}</h5>
                            <div class="header__cart-item-price-wrap">
                                <span class="header__cart-item-price">${obj.dUnitPrice} đ</span>
                                <span class="header__cart-item-multifly">X</span>
                                <span class="header__cart-item-qnt">${obj.iQuantity}</span>
                            </div>
                        </div>
                        <div class="header__cart-item-body">
                            <span class="header__cart-item-description">
                                Phân loại hàng:Bạc
                            </span>
                            <span class="header__cart-item-remove">Xoá</span>
                        </div>
                    </div>
                </li>
                `).join('');
            }

            document.querySelector(".header__cart-notice").innerText = data.cartCount;
            document.querySelector(".header__cart-list-item").innerHTML = htmlCartDetail;
        }
    }
    xhr.send(null);
}
getData();

// Tìm kiếm danh mục
function searchProducts(input) {
    document.querySelector('.header__search-history').style.display = 'block';
    var formData = new FormData();
    if (input.value != "") {
        formData.append("keyword", input.value);
    }
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/Home/Search', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            let html = "";
            html +=     "<ul class='header__search-history-list'>";
            html += data.map(obj => `
                            <li class="header__search-history-item">
                                <a href="/Product/Index?categoryID=${obj.pK_iCategoryID}">${obj.sCategoryName}</a>
                            </li>`).join('');
            html +=     "</ul>";
            document.querySelector('.header__search-history').innerHTML = html;
        } 
    };
    xhr.send(formData);
}
const searchHistory = document.querySelector('.header__search-history');
window.onclick = (event) => {
    if (event.target == searchHistory) {
        searchHistory.style.display = 'none';
    }
}

// Toast
function toast({ title = "", msg = "", type = "", duration = 3000}) {
    const main = document.getElementById('toast');
    if (main) {
        const toast = document.createElement("div");
        const autoRemoveId = setTimeout(() => {
            main.removeChild(toast);
        }, duration + 1000);

        toast.onclick = (e) => {
            if (e.target.closest('.toast__close')) {
                main.removeChild(toast);
                clearTimeout(autoRemoveId);
            }
        };

        const icons = {
            success: 'uil uil-check-circle',
            error: 'uil uil-exclamation-triangle'
        };

        icon = icons[type];
        const delay = (duration / 1000).toFixed(2);

        toast.classList.add('toast', `toast--${type}`);
        toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
        toast.innerHTML = `
            <div class="toast__icon">
                <i class="${icon}"></i>
            </div>
            <div class="toast__body">
                <h3 class="toast__title">${title}</h3>
                <p class="toast__msg">${msg}</p>
            </div>
            <div class="toast__close">
                <i class="uil uil-times"></i>
            </div>
        `;
        main.appendChild(toast);
    }
}

// Chat JS

function hideChatWindow() {
    document.querySelector(".chat").classList.toggle("hide-chat-window");
    document.querySelector(".chat__body-right").classList.toggle("hide-chat-window");
    document.querySelector(".chat__header-btn-arrow").classList.toggle("transform");
}

function hideSearchSub() {
    document.querySelector(".chat__body-search-sub").style.display = 'none';
}

function displaySearchSub() {
    document.querySelector(".chat__body-search-sub").style.display = 'flex';
}

function displaySubList() {
    document.querySelector(".chat__body-search-sub-list").classList.toggle('active'); 
}

document.querySelectorAll(".chat__body-shop-name-sub-control").forEach(e => {
    e.addEventListener('click', () => {
        e.classList.toggle('active');
        e.querySelector(".chat__body-shop-name-sub-control-circle").classList.toggle('active');
    });
});

function hideChat() {
    document.querySelector(".chat").style.display = 'none';
    document.querySelector(".chat__btn").style.display = "flex";
}

function displayChat() {
    document.querySelector(".chat").style.display = 'block';
    document.querySelector(".chat__btn").style.display = "none";
}

window.addEventListener('scroll', () => {
    const y = this.pageYOffset;
    if (y > 1100) {
        //console.log(y);
        document.querySelector(".success-header").classList.add("scroll");
    } else {
        document.querySelector(".success-header").classList.remove("scroll");
    }
});

function showChatWindowMobile() {
    document.querySelector(".chat__header-menu-bar").classList.toggle("active");
    document.querySelector(".chat__mobile-window").classList.toggle("show");
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
    if (millions == 0) {
        result = `${hundred_thousand}${tens_of_thousands}${thousand}.${hundreds}${tens}${unit}`;
    } else {
        result = `${millions}.${hundred_thousand}${tens_of_thousands}${thousand}.${hundreds}${tens}${unit}`;
    }
    return result;
}
