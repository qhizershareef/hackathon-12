const selectedElements =[];
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    let r = Math.ceil(Math.random()*255);
    let g = Math.ceil(Math.random()*255);
    let b = Math.ceil(Math.random()*255);
    let a = 0.5;
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return `rgba(${r},${g},${b},${a})`;
}
document.addEventListener('mousemove', function handleMouseMove(e){
        const element = document.elementFromPoint(e.clientX, e.clientY);
        element.onmouseenter =(event)=>{
            event.target.style.border='2px solid '+ getRandomColor();
        };
        element.onmouseleave =(event)=>{
            event.target.style.border='none';
            event.target.style.transition = '0.5s border'
        }; 
        element.onclick =(event)=> {
			event.preventDefault();
			event.stopPropogation;
            console.log(event.target);
            event.target.style.background = getRandomColor();
            event.target.style.padding ='5px';
            event.target.style.borderRadius ='10px';
            //add transition in style
            event.target.style.transition = '1s'

            !selectedElements.includes(event.target)&&selectedElements.push(event.target);
        };
        //remove element from array by clicking again and remove styles
        element.ondblclick =(event)=> {
            console.log(event.target);
            event.target.style.background = 'none';
            event.target.style.padding ='0px';
            event.target.style.borderRadius ='0px';
            event.target.style.transition = 'none'
            const index = selectedElements.indexOf(event.target);
            if (index > -1) {
                selectedElements.splice(index, 1);
            }else{
                console.log('problem with deleting')
            }
        };
        
    }, {passive: true})

const saveElementsByPath =(arr)=>{
    const paths =[];//this needs to be saved on a database temporarily on localstorage
    //or 
    const set = new Set(arr);
    set.forEach(el=>{
        const path = getXPathForElement(el);
        paths.push(path);
    })
    return paths;
}

function getXPathForElement(element) {
    const idx = (sib, name) => sib 
        ? idx(sib.previousElementSibling, name||sib.localName) + (sib.localName == name)
        : 1;
    const segs = elm => !elm || elm.nodeType !== 1 
        ? ['']
        : elm.id && document.getElementById(elm.id) === elm
            ? [`id("${elm.id}")`]
            : [...segs(elm.parentNode), `${elm.localName.toLowerCase()}[${idx(elm)}]`];
    return segs(element).join('/');
}
//create a sidebar that takes input for each element and that will be updated on the db
//use tags to categorize the elements on a page
//when we click on the element from the sidebar it should take us to the element
//after enabling this option from the extension, create a save button in the extension that runs
//saveElementsByPath(selectedElements);
// and removes the eventlistener and these funcitons
//send push notification if you're to be reminded from a website after x minutes