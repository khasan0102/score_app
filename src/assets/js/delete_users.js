const delBtns = document.querySelectorAll('.del');

for(let button of delBtns) {
    button.onclick = async (event) => {
        let confirmation = confirm('Sen rostan shu userni o\'chirib tashlamoqchimisiz?');
        let id = button.dataset.id;
        let url = button.dataset.url;
        if(confirmation) {
            let userRole = url.split('/')[2];
            userRole = userRole.slice(0, userRole.length - 1);
            let obj = {};
            obj[userRole + "Id"] = id;
            let response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(obj)
            });

            repsonse = await response.json();

            if(response.status == 200) {
                event.target.parentNode.parentNode.remove();
            }
        }
    }
}