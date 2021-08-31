const editBtns = document.querySelectorAll('.edit');
const closeBtn = document.querySelector('#close');
for(let el of editBtns) {
    el.onclick = (event) => {
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
    let modal = document.querySelector('#modal')
    let inputsBox = document.querySelector('#inputs');
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

    modal.classList.remove('modal-hide');
}


closeBtn.onclick = (event) => {
    let modal = document.querySelector('#modal')
    let inputsBox = document.querySelector('#inputs');
    inputsBox.innerHTML = null;
    modal.classList.add('modal-hide');
}