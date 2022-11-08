const codeContainer = document.querySelector('.code_Container');
const fetchBtn = document.querySelector('button');
const removeFunction =(id)=>{
        chrome.storage.local.get(['code'], (result)=>{
        //remove by id
        // let code = result.code.filter(c=> c.id !== id);
        // chrome.storage.local.set({code: code}, ()=>{
        //     console.log('code deleted')
        // })
    })
}
fetchBtn.addEventListener('click', () => {
    chrome.storage.local.get(['code'], (result) => {
        console.log(result.code);
        
        result.code.forEach(c=> {
            let div = document.createElement('div');
            div.style.border = '1px solid black';
            div.style.padding = '10px';
            div.style.margin = '10px';
            // div.style.width = '100%';
            //add a button to delete
            let deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'Delete';
            //add styles to delete button

            deleteBtn.addEventListener('click', ()=>{
                removeFunction(c.id);
                div.remove();
            })
            let pre = document.createElement('pre');
            pre.innerText=c;
            div.appendChild(deleteBtn);
            div.appendChild(pre);
            codeContainer.appendChild(div)
        })
        // codeContainer.innerHTML = result.code;
    });
})
