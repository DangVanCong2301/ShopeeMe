function getAPIBillAdmin() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/admin/bill-api', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);
    
        }
    };
    xhr.send(null);
}
getAPIBillAdmin();