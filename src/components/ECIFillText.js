
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
				let isSelected = item.hasAttribute('selected');

				let itemId = item.getAttribute('id');
				if (isSelected) {			
					item.removeAttribute('selected', false)
					itemSelected.splice(itemSelected.includes(parseInt(itemId)), 1)

				} else {			
					item.setAttribute('selected', true)
					itemSelected.push(parseInt(itemId))
				}
				buttonStyleDeletItems()	
			})
		
		})	
		
	}
  
	
	//Event button add items
	buttonAdd.addEventListener('click', function () {
		
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
        li.addEventListener('click', function () {
          let isSelected = li.hasAttribute('selected');
          if (isSelected) {        
            li.removeAttribute('selected', false)
            itemSelected.splice(itemSelected.includes(parseInt(itemId)), 1)
    
          } else {          
            li.setAttribute('selected', true)
            itemSelected.push(newId)
          }

			
        })
        HTMLitemsList.append(li)
			}
			ECImodal.forEach((_modal)=>{
				_modal.classList.remove("active")
			})	
			buttonStyleCached()	
	})

	//Event button remove items 
	buttonDelete.addEventListener('click', function () {
		itemsCached.push([...items])
			
		let _HTMLitems =[...HTMLitems]
		let _itemSelected = [...itemSelected]
		let _items = [...items]

		_HTMLitems.forEach((item) => {
			_itemSelected.forEach((id) => {			
				if (parseInt(item.id) === parseInt(id)) {				
					item.remove()
				}
			})
		})
				
		items = _items.filter((item) => {
			   return !_itemSelected.includes(item.id)
		})		

		buttonStyleCached()
		buttonStyleDeletItems()

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
		buttonStyleCached()
	})
	
	//Event input new Value

	inputValue.addEventListener('input',function(){
		buttonStyleAdditems()
	})

	//Button open/close modal
	openModal.forEach((modal)=>{
			modal.addEventListener('click', function () {	
				buttonStyleAdditems()				
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
	

	// Buttons styles

	let buttonStyleCached = () => {	
		let isCachedItems = itemsCached.length > 0			
		isCachedItems ? buttonCached.removeAttribute("disabled") : buttonCached.setAttribute("disabled", true) 

		let isBadgeCached = itemsCached.length > 0
		isBadgeCached ? (HTMLbadgeCached.textContent = itemsCached.length) : (HTMLbadgeCached.textContent = null)
	}
	let buttonStyleAdditems = () => {
		let isFillInput = inputValue.value.length > 0
		isFillInput ? buttonAdd.removeAttribute("disabled") : buttonAdd.setAttribute("disabled", true) 
	}
	let buttonStyleDeletItems = () => {		
		let isAnySelected = Array.from(HTMLitems.values()).some((_item) => {
			if (_item.hasAttribute('selected')) {
				return true;

			}
		})			
		isAnySelected ? buttonDelete.removeAttribute("disabled") : buttonDelete.setAttribute("disabled", true) 
	}
	

	// Add item to fist time
	showItems()