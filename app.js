

const data = [
    {
        value: 'Categories',
        id:'46f498efe4f9e',
        edit:false,
        childs: []
    }
]
const rootInput = document.querySelectorAll('.block input')[0]; 
const rootContent = document.querySelector('.block-childs')
const addBtn = document.querySelector(`[data-add="${data[0].id}"]`); 

//changing root value for input value
rootInput.defaultValue = data[0].value; 
 
//add event for root input
addBtn.addEventListener('click', ()=>{

    var uniq = (new Date()).getTime();
    let newData = data[0]
    let newValue = data[0].childs.push({ 
        value: 'Sub Category',
        id:uniq,
        edit:false,
        childs: []
    })

    newData ={...data[0],newValue} 
    data[0] = newData 
    Load()

    //if have a child in root element , would adding line to bottom
    if(data[0].childs.length > 0){
        document.querySelectorAll('.block')[0].classList.remove('type-1')
    }
})


function Load(){
    //remove html tags under root element
    rootContent.innerHTML = ''

    data[0].childs.forEach((child) =>{
        addElement(child, data[0].id, data[0]) 
    })

    //if no child in root element , would remove line to bottom 
    if(data[0].childs.length === 0){
        document.querySelectorAll('.block')[0].classList.add('type-1')
    }
}

function addElement(chld,id,parentArray) {  

    //finding parent node of child element
    const content = document.querySelector(`[data-id="${id}"]`)

    //add html 
    content.innerHTML +=`<div class="block-content ${parentArray.childs.length === 1 ? 'one-child' : ''}">
                                    <div class="block">
                                        <div class="block-input ${chld.childs.length === 0 ? 'remove-line' : ''}">
                                            <input type="text" value="${chld.value}" data-input="${chld.id}"  class="${ data[0].childs.indexOf(chld) > -1 ? chld.edit === false ? '': 'orange' : chld.edit === false ? '': 'blue'} "/> 
                                        </div>
                                        <div class="block-btns" data-btns="${chld.id}" ${chld.edit === true ? '' : 'style="display:none"'}>
                                            <button class="add-child" data-add="${chld.id}" type="button"><i class="fas fa-plus"></i></button>
                                            <button class="edit-text" data-edit="${chld.id}" type="button"><i class="fas fa-pen"></i></button>
                                            <button class="remove-block" data-remove="${chld.id}" type="button"><i class="fas fa-times"></i></button>
                                        </div> 
                                        <div class="block-btns" data-btns-edit="${chld.id}" ${chld.edit === true ? 'style="display:none"' : ' '}>
                                            <button class="cancel" data-cancel="${chld.id}" type="button"><i class="fas fa-times"></i></button>
                                            <button class="done" data-done="${chld.id}" type="button"><i class="fas fa-check"></i></button>
                                        </div>
                                        
                                    </div>
                                    <div class="block-childs" data-id="${chld.id}">   
                                    </div>
                                </div>` 
     
  
    //adding event for element
    setTimeout(()=>{

        const majorBtns = document.querySelector(`[data-btns="${chld.id}"]`)
        const editBtns = document.querySelector(`[data-btns-edit="${chld.id}"]`)
        const input = document.querySelector(`[data-input="${chld.id}"]`);
        const inputLastValue = chld.value


        //add  
        document.querySelector(`[data-add="${chld.id}"]`).addEventListener( 'click' ,()=>{ 
            var uniq = (new Date()).getTime();
            let newData = data[0]
            let newValue = chld.childs.push({ 
                value: 'Sub Category',
                id: uniq,
                edit: false,
                childs: []
            })
            newData ={...data[0],newValue} 
            data[0] = newData 
            Load()
        })

        //edit  
        document.querySelector(`[data-edit="${chld.id}"]`).addEventListener( 'click' ,()=>{ 

            //remove input color
            input.classList.remove('blue')
            input.classList.remove('orange') 

            input.readOnly = false; 
            majorBtns.style.display = 'none'
            editBtns.style.display= 'flex'
        })

        //remove  
        document.querySelector(`[data-remove="${chld.id}"]`).addEventListener( 'click' ,(e)=>{     
            let newData = data[0] 
            const indexObject = parentArray.childs.indexOf(chld)
            const newValues = parentArray.childs.splice((indexObject), 1)
            newData = {...data[0],newValues}
            data[0] = newData;

            Load()
        })

        //done  
        document.querySelector(`[data-done="${chld.id}"]`).addEventListener( 'click' ,()=>{  
            const newInputValue = document.querySelector(`[data-input="${chld.id}"]`).value;
            let newData = data[0] 
            let newValue = chld 
            newValue.value = newInputValue;
            newValue.edit = true;
            newData = {...data[0],newValue}
            data[0] = newData; 
            
            // change input bg color
            if(data[0].childs.indexOf(chld) > -1){ //if item belong to root element 
                input.classList.add('orange')
            }else{ //if item belong to other element
                input.classList.add('blue')
            }

            input.readOnly = true; 
            majorBtns.style.display = 'flex'
            editBtns.style.display= 'none'
            
            Load()
         })

        //cancel 
        document.querySelector(`[ data-cancel="${chld.id}"]`).addEventListener( 'click' ,()=>{ 

            if(chld.edit === false){ //if item added in now 
                let newData = data[0] 
                const indexObject = parentArray.childs.indexOf(chld)
                const newValues = parentArray.childs.splice((indexObject), 1)
                newData = {...data[0],newValues}
                data[0] = newData;

                Load()
            }else{ //if item added in past

                input.value = inputLastValue;
                input.readOnly = true; 
                majorBtns.style.display = 'flex'
                editBtns.style.display= 'none'

                 // change input bg color
                if(data[0].childs.indexOf(chld) > -1){ //if item belong to root element 
                    input.classList.add('orange')
                }else{ //if item belong to other element
                    input.classList.add('blue')
                }
            }
         })

    },100)
 
    //repeat loop 
    if(chld.childs.length > 0){ 
        chld.childs.map((child) =>{
            return addElement(child,chld.id,chld)
        })  
    }
   
}

Load()

//-------------------zoom in / zoom out-------------------//

let defaulValue = 100;
const zoomInBtn = document.querySelector('.zoom__in')
const zoomOutBtn = document.querySelector('.zoom__out')
const zoomBtn = document.querySelector('.zoom__value')
const zoomMenu = document.querySelector('.zoom__menu')
const zoomValue = document.querySelector('.default-value h1')
const zoomOptions = document.querySelectorAll('.zoom__values')
const diagram = document.querySelector('.diagram__content')

zoomInBtn.addEventListener('click', ()=>{
    defaulValue += 10;
    if(defaulValue > 150){
        defaulValue = 150
    }
    changeZoom()
    
})

zoomOutBtn.addEventListener('click', ()=>{
    defaulValue -= 10;
    if(defaulValue <= 10){
        defaulValue = 10
    }
    changeZoom()
})

zoomBtn.addEventListener('click', ()=>{
    if(zoomMenu.style.display === 'none'){
        zoomMenu.style.display = 'block'
    }else{
        zoomMenu.style.display = 'none'
    } 
})

zoomOptions.forEach((element) => {
 
    element.addEventListener('click', (e)=>{
        let value = e.currentTarget.children[0].innerText
        value = parseFloat(value)
        defaulValue = value;
        changeZoom()

        zoomOptions.forEach((element) => { // removing check icon all element
            element.children[1].classList.remove('fa-check')
        })

        //adding check icon selected element
        element.children[1].classList.add('fa-check')
    })

})  

function changeZoom(){
    zoomValue.innerHTML = `${defaulValue}%`
    diagram.style = `transform: scale(${defaulValue/100})`;
}
