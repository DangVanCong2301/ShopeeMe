function getData() {
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/Admin/GetData', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            console.table(data);
            let html = "";
            html += data.map((obj, index) => `
            <tr>
                <td>${index}</td>
                <td>${obj.sCategoryName}</td>
                <td>${obj.sCategoryDescription}</td>
            </tr>
            `).join('');
            document.getElementById('table__body').innerHTML = html;
        }
    }
    xhr.send(null);
}
getData();

function update() {
    const categoryId = document.querySelector(".category-id").value;
    const categoryName = document.querySelector(".category-name").value;
    const categoryImg = document.querySelector(".category-img").value;
    const categoryDesc = document.querySelector(".category-desc").value;
    var formData = new FormData();
    formData.append("categoryId", categoryId);
    formData.append("categoryName", categoryName);
    formData.append("categoryImg", categoryImg);
    formData.append("categoryDesc", categoryDesc);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            alert(`${data.msg}`);
            window.location.assign("/New/Index");
        }
    }
    xhr.open('post', '/New/Update', true);
    xhr.send(formData);
}



