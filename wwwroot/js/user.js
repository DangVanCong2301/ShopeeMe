function backHistory() {
    window.history.back();
}

function showHiddenPass() {
    const input = document.querySelector(".auth__mobile-form-input-password"),
    iconEye = document.querySelector(".auth__mobile-form-password-show-icon");
    if (input.type == "password") {
        input.type = "text";
        iconEye.classList.add("uil-eye");
        iconEye.classList.remove("uil-eye-slash");
    } else {
        input.type = "password";
        iconEye.classList.add("uil-eye-slash");
        iconEye.classList.remove("uil-eye");
    }
}

function getDataUser() {
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/User/GetUser', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            console.table(data);
            let html = "";
            html += data.map((obj, index) => `
            <h4>
                ${obj.sAddress}
            </h4>
            `).join('');
            document.querySelector('.list__user').innerHTML = html;
        }
    }
    xhr.send(null);
}

function loginWithFacebook() {
    noticeIncompleteFunc();
}

function loginWithGoogle() {
    noticeIncompleteFunc();
}

function registerWithFacebook() {
    noticeIncompleteFunc();
}

function registerWithGoogle() {
    noticeIncompleteFunc();
}
//getDataUser();