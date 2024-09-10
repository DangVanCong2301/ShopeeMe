function picImage(input) {
    input.type = 'file'
}

function updateProfile() {
    const fullName = document.querySelector(".profile__input-fullname").value;
    const gender = document.getElementsByName("gender");
    const avatar = document.querySelector(".profile__avatar-upload").value;
    const birth = document.querySelector(".profile__input-birth").value;
    let checkValue = "";
    for (let i = 0; i < gender.length; i++) {
        if (gender.item(i).checked) {
            checkValue = gender.item(i).value;
        }
    }
    console.log({fullName, checkValue, birth, avatar});
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('gender', checkValue);
    formData.append('image', "no_user.jpg");
    formData.append('birth', birth);
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/user/update-profile', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            openModal();
            document.querySelector(".modal__body").innerHTML = 
            `
                <div class="spinner"></div>
            `;
            setTimeout(() => {
                toast({ title: "Thông báo", msg: `${data.message}`, type: "success", duration: 5000 });
                closeModal();
                document.querySelector(".modal__body").innerHTML = "";
                setTimeout(() => {
                    window.location.assign('/user/profile');
                }, 1000)
            }, 2000);
        }
    }
    xhr.send(formData);
}

function openModal() {
    document.querySelector(".modal").classList.add("open");
}

function closeModal() {
    document.querySelector(".modal").classList.remove("open");
}