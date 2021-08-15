let rows = document.querySelectorAll('#tbodyElement tr')

tableSearch.onkeyup = () => {
	let searchKey = tableSearch.value.toLowerCase()
	tbodyElement.innerHTML = null
	let num = 0
	rows.forEach( (row, i) => {
		let tdElements = row.childNodes
		let isTrue = true
		tdElements.forEach( (el, index) => {
			if(el.nodeName == 'TD' && el.textContent.toLowerCase().includes(searchKey)) {
				if(isTrue) {
					isTrue = false
					num++
				}
				row.childNodes[1].textContent = num
				tbodyElement.append(row)
			}
		} )
	})
}