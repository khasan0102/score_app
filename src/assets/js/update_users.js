const editBtns = document.querySelectorAll('.edit');
const closeBtn = document.querySelector('#close');
const sendBtn = document.querySelector("#send");
const heading = document.querySelector('#heading');
for(let el of editBtns) {
    el.onclick = (event) => {
        sendBtn.dataset.id = event.target.dataset.id;
        sendBtn.dataset.url = event.target.dataset.url;
        console.log(sendBtn.dataset)
        let childs = event.target.parentNode.parentNode.childNodes;
        let elements = [];
        for(let el of childs) {
            if(el.className == 'name'){
                elements.push(el)
            }
        }
        renderInputs(elements);
    }
}



function renderInputs (elements) {
    let modal = document.querySelector('#modal');
    let inputsBox = document.querySelector('#inputs');
    let modalHeading = document.querySelector('#modal-heading');
    inputsBox.innerHTML = null;
    for(let el of elements) {
        let label = document.createElement('label');
        let input = document.createElement('input');

        label.textContent = el.dataset.name;
        label.setAttribute('for', el.dataset.name);
        input.id = el.dataset.name
        input.value = el.textContent;
        label.append(input);
        inputsBox.append(label);
    }
    modalHeading.textContent = 'Edit ' + heading.textContent;
    modal.classList.remove('modal-hide');
}


closeBtn.onclick = (event) => {
    let modal = document.querySelector('#modal')
    let inputsBox = document.querySelector('#inputs');
    inputsBox.innerHTML = null;
    modal.classList.add('modal-hide');
}


sendBtn.onclick = async (event) => {
    let errorSpan = document.querySelector('#error');
    let inputsBox = document.querySelector('#inputs');
    const inputs = inputsBox.querySelectorAll('input');
    let obj = {};

    for(let el of inputs) {
        obj[el.id] = el.value;
    }
    let url = event.target.dataset.url;
    obj.id = +event.target.dataset.id;
    

    let response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    });

    response = await response.json();

    if(response.isTrue) {
        let modal = document.querySelector('#modal')
        inputsBox.innerHTML = null;
        modal.classList.add('modal-hide');
        alert(response.message);
    }else {
        errorSpan.textContent = response.message;
        errorSpan.style.paddingTop = '10px';
        inputsBox.style.paddingBottom = '20px'
    }

}


