const delBtns = document.querySelectorAll('.del');

for(let button of delBtns) {
    button.onclick = async (event) => {
        let confirmation = confirm('Sen rostan shu SCOREni o\'chirib tashlamoqchimisiz?');
        let id = button.dataset.id;
        console.log(id)
        let path = window.location.pathname.split('/')
         if(confirmation) {
            let response = await fetch('/admin/students/' + path[[3]] + `/${path[4]}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    scoreId: 15
                })
            });

            repsonse = await response.json();
            console.log(response)
            if(response.status == 200) {
                event.target.parentNode.parentNode.remove();
            } else {
                alert(response.message)
            }
        }
    }
}