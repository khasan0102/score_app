const delBtns = document.querySelectorAll('.del');

for(let button of delBtns) {
    button.onclick = async () => {
        let confirmation = confirm('Sen rostan shu guruhni o\'chirib tashlamoqchimisiz?');
        let groupId = button.dataset.id;
        if(confirmation) {
            let response = await fetch("/admin/groups", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    groupId
                })
            });

            response = await response.json();
            if(response.status == 204)
                button.parentNode.parentNode.remove()
            else 
                alert(response.message);
        }
    }
}