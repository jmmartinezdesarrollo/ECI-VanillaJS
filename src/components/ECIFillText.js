
  let itemsList = [{ id: Math.floor(Math.random() * 1000), value: 'item 1' }, { id: Math.floor(Math.random() * 1000), value: 'item 2' }, { id: Math.floor(Math.random() * 1000), value: 'item 3' }]
	let items = document.getElementsByName('item')
	const ul = document.getElementById('listitemsList')
	const inputNewValue = document.getElementById("input-newValue")
	const buttonAdd = document.getElementById('addItem')
	const buttonDelete = document.getElementById('deleteItem')
	const openModal = document.getElementsByName('openModal')
	let ECImodal = document.getElementsByName('modal')
	let memory = []
	let selectedItems = []


	//Show default items
	itemsList.map((item) => {
		let li = document.createElement('li');
		li.setAttribute('id', item.id)
		li.setAttribute('name', 'item')
		li.textContent = item.value
		ul.append(li)
	})
  //Event Lisener click default items
	items.forEach((item) => {
		item.addEventListener('click', function () {
			let items = document.getElementsByName('item')
			let isSelected = item.hasAttribute('selected');

			let itemId = item.getAttribute('id');
			if (isSelected) {			
				item.removeAttribute('selected', false)
				selectedItems.splice(selectedItems.includes(parseInt(itemId)), 1)

			} else {			
				item.setAttribute('selected', true)
				selectedItems.push(itemId)
			}
			let isAllSelected = Array.from(items.values()).every((_item) => {
				if (_item.hasAttribute('selected')) {
					return true;

				}
			})
			isAllSelected ? buttonDelete.setAttribute("disabled", true) : buttonDelete.removeAttribute("disabled")
		})
	})
  
	//Button add item
	buttonAdd.addEventListener('click', function () {

		buttonAdd.setAttribute("disabled", true)
		let li = document.createElement('li');
	
			let hasValue = inputNewValue.value != '';
      
			if (hasValue) {
				let newId = Math.floor(Math.random() * 1000)
				itemsList.push({ id: newId, value: inputNewValue.value })
				memory.push({ id: newId, name: inputNewValue.value })
				li.setAttribute('id', newId)
				li.setAttribute('name', 'item')
				li.textContent = inputNewValue.value				
				inputNewValue.value = ''
        li.addEventListener('click', function () {
          let isSelected = li.hasAttribute('selected');
          if (isSelected) {        
            li.removeAttribute('selected', false)
            selectedItems.splice(selectedItems.includes(parseInt(itemId)), 1)
    
          } else {          
            li.setAttribute('selected', true)
            selectedItems.push(newId)
          }
          			let isAllSelected = Array.from(items.values()).every((_item) => {
				if (_item.hasAttribute('selected')) {
					return true;

				}
			})
			isAllSelected ? buttonDelete.setAttribute("disabled", true) : buttonDelete.removeAttribute("disabled")
        })
        ul.append(li)
			}
			ECImodal[0].classList.remove("active")
		})


	//Button remove event
	buttonDelete.addEventListener('click', function () {
		let items = document.getElementsByName('item')
		items.forEach((item) => {
			selectedItems.forEach((selected) => {
				if (parseInt(item.id) == selected) {
					item.remove()
				}
			})
		})


	})
 

		//Button open modal
		openModal.forEach((modal)=>{
			modal.addEventListener('click', function () {					
				let isActive = ECImodal[0].classList.contains("active");
				if(isActive){
					ECImodal.forEach((_modal)=>{
						_modal.classList.remove("active")
					})				
				}else{
					ECImodal.forEach((_modal)=>{
						_modal.classList.add("active")
					})			
				}
			
			})
		})
	
