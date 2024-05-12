function picImage(input) {
    input.type = 'file'
}

function updateProfile() {
    const userName = document.querySelector(".profile__input-username").value;
    const fullName = document.querySelector(".profile__input-fullname").value;
    const email = document.querySelector(".profile__input-email").value;
    const gender = document.getElementsByName("gender");
    const avatar = document.querySelector(".profile__avatar-upload").value;
    const birth = document.querySelector(".profile__input-birth").value;
    let checkValue = "";
    for (let i = 0; i < gender.length; i++) {
        if (gender.item(i).checked) {
            checkValue = gender.item(i).value;
        }
    }
    console.log({userName, fullName, email, checkValue, avatar});
    const formData = new FormData();
    formData.append('userName', userName);
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('gender', checkValue);
    formData.append('avatar', avatar);
    formData.append('birth', birth);
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/User/Profile', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            alert(`${data.msg}`);
            window.location.assign('/user/profile');
        }
    }
    xhr.send(formData);
}