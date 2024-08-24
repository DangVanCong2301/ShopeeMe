// Get API
function getAPIMomo() {
    var xhr = new XMLHttpRequest();
    xhr.open("post", "/payment/momo", true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);

            setDataPayment(data);

        }
    };
    xhr.send(null);
}
getAPIMomo();

function setDataPayment(data) {
    if (data.order.pK_iOrderID < 10) {
        document.querySelector(".momo-payment__body-left-item-value-order-id").innerText = `ĐH0${data.order.pK_iOrderID}`;
    } else {
        document.querySelector(".momo-payment__body-left-item-value-order-id").innerText = `ĐH0${data.order.pK_iOrderID}`;
    }
    document.querySelector(".momo-payment__body-left-item-value-money").innerText = `${money(data.order.fTotalPrice)} VNĐ`;

}

// Set run time redirect
const startingMinutes = 10;
let time = startingMinutes * 60;

setInterval(updateCountdown, 1000);

function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    document.querySelector(".momo-payment__body-expired-numb").innerText = `${minutes}:${seconds}`
    time--;
    if (seconds == 40) {
        document.querySelector(".momo-payment__main-qr").classList.add("hide-on-destop");
        document.querySelector(".momo-payment__body-expired").classList.add("hide-on-destop");
        document.querySelector(".momo-payment__main-success").classList.remove("hide-on-destop");
        redirectPurchasePage();
    }
}

function redirectPurchasePage() {
    let countDownValue = 5;
    document.querySelector(".momo-payment__main-success-back").innerHTML = 
        `
            Trở lại trang mua hàng trong ${countDownValue} giây <br>
            Xin vui lòng chờ trong giây lát...
        `;
    setInterval(() => {
        countDownValue--;
        document.querySelector(".momo-payment__main-success-back").innerHTML = 
        `
            Trở lại trang mua hàng trong ${countDownValue} giây <br>
            Xin vui lòng chờ trong giây lát...
        `;
    }, 1000);

    setTimeout(() => {
        window.location.assign("/user/purchase");
    }, 5 * 1000);
    
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
