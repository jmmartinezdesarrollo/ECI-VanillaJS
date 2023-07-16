
    let items = [{ id: Math.floor(Math.random() * 1000), value: 'item 1' }, { id: Math.floor(Math.random() * 1000), value: 'item 2' }, { id: Math.floor(Math.random() * 1000), value: 'item 3' }]
	
	let HTMLitems = document.getElementsByName('item')
	const HTMLitemsList = document.getElementById('itemsList')
	const HTMLbadgeCached = document.getElementById("badgeCached")

	const inputValue = document.getElementById("input-addValue")
	const buttonAdd = document.getElementById('button-addItem')
	const buttonDelete = document.getElementById('button-deleteItem')
	const buttonCached = document.getElementById('button-cachedItem')
	
	let ECImodal = document.getElementsByName('modal')
	const openModal = document.getElementsByName('openModal')

	let itemSelected = []
	let itemsCached = []
	
		
	//Function to show items in HTML and create Event Lisener to click items
	let showItems = ()=>{
		items.map((item) => {
			let li = document.createElement('li');
			li.setAttribute('id', item.id)
			li.setAttribute('name', 'item')
			li.textContent = item.value
			HTMLitemsList.append(li)
		}) 		
		HTMLitems.forEach((item) => {
			item.addEventListener('click', function () {
				let HTMLitems = document.getElementsByName('item')
				let isSelected = item.hasAttribute('selected');

				let itemId = item.getAttribute('id');
				if (isSelected) {			
					item.removeAttribute('selected', false)
					itemSelected.splice(itemSelected.includes(parseInt(itemId)), 1)

				} else {			
					item.setAttribute('selected', true)
					itemSelected.push(itemId)
				}
				let isAllSelected = Array.from(HTMLitems.values()).every((_item) => {
					if (_item.hasAttribute('selected')) {
						return true;

					}
				})		
			//	isAllSelected ? buttonDelete.setAttribute("disabled", true) : buttonDelete.removeAttribute("disabled")
			})
		})
	}
  
	//Event button add items
	buttonAdd.addEventListener('click', function () {

		//buttonAdd.setAttribute("disabled", true)		
	
			let hasValue = inputValue.value != '';
      
			if (hasValue) {
				itemsCached.push([...items])	
				let li = document.createElement('li');
				let newId = Math.floor(Math.random() * 1000)				
				items.push({ id: newId, value: inputValue.value })						
				li.setAttribute('id', newId)
				li.setAttribute('name', 'item')
				li.textContent = inputValue.value				
				inputValue.value = ''
				HTMLbadgeCached.textContent = itemsCached.length
        li.addEventListener('click', function () {
          let isSelected = li.hasAttribute('selected');
          if (isSelected) {        
            li.removeAttribute('selected', false)
            itemSelected.splice(itemSelected.includes(parseInt(itemId)), 1)
    
          } else {          
            li.setAttribute('selected', true)
            itemSelected.push(newId)
          }
          			let isAllSelected = Array.from(HTMLitems.values()).every((_item) => {
				if (_item.hasAttribute('selected')) {
					return true;

				}
			})
		//	isAllSelected ? buttonDelete.setAttribute("disabled", true) : buttonDelete.removeAttribute("disabled")
        })
        HTMLitemsList.append(li)
			}
			ECImodal.forEach((_modal)=>{
				_modal.classList.remove("active")
			})		
	})

	//Event button remove items 
	buttonDelete.addEventListener('click', function () {
		let HTMLitems = document.getElementsByName('item')
		itemsCached.push([...items])	
		
		HTMLitems.forEach((item) => {
			itemSelected.forEach((selected) => {
				if (parseInt(item.id) == selected) {
					item.remove()
				}
			})
		})
		items.forEach((item) => {
			itemSelected.forEach((selected) => {
				if (parseInt(item.id) == selected) {
					item.remove()
				}
			})
		})


	})

	//Even button cached items
	buttonCached.addEventListener('click', function(){		
		items = [...itemsCached[itemsCached.length -1]]
		itemsCached.pop()	
		let firstItem = HTMLitemsList.firstElementChild
		while(firstItem ){
			firstItem.remove()
			firstItem = HTMLitemsList.firstElementChild
		}
		showItems()
	})

	//Button open/close modal
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
	

	// Add item to fist time
	showItems()