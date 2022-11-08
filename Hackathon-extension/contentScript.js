(()=>{
    console.log('contentscript');

    function createDropDown(){
        if(document.getElementById('dropdown')){
            return;
        }
        let div = document.createElement('div');
        div.id = 'dropdown';
        let select = document.createElement('select');
        select.style.color = 'white';
        select.style.backgroundColor = 'black';
        select.style.cursor = 'pointer';
        chrome.storage.local.get(['code'], (result)=>{
            console.log(result.code);
            result.code.forEach(c=>{
                let option = document.createElement('option');
                option.value = c.id;
                option.innerText = c.name;
                select.appendChild(option);
            })
        })
        div.appendChild(select);
        const divPath = document.querySelector('header >div>div')
        divPath.appendChild(div);
    }

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if(request.type === 'NEW'){
            console.log('new '+ location.href);
        }
        if(request.message==='add'){
            console.log('adding message')
            console.log(request.selection)
            //store this as object in chrome local storag
            chrome.storage.local.get(['code'], (result)=>{
                let author;
                //generate random id
                let id = Date.now().toString().slice(-5);
                if(result.code){
                    let code = result.code; 
                    code.push(request.selection);
                    chrome.storage.local.set({code: code, id:id, author: author|| 'anonymous'}, ()=>{
                        console.log('code saved')
                    })
                }else{
                    chrome.storage.local.set({code: [request.selection], id:id, author: author|| 'anonymous'}, ()=>{
                        console.log('code saved')
                    })
                }
                //notify user that code has been saved

                chrome.notifications.create('codeSaved', {
                    type: 'basic',
                    iconUrl: 'icon.png',
                    title: 'Code Saved',
                    message: 'Your code has been saved'
                })
            })            
        }
        if(request.message==='getData'){
            chrome.storage.local.get(['code'], (result)=>{
                console.log(result.code)
            })
        }
        //delete by id
        
        //delete all data
        if(request.message==='delete'){
           //delete code
              chrome.storage.local.remove(['code'], ()=>{
                console.log('code deleted')
            })
        }
        //creating a drop down menu to select code, on request message create_drop
        if(request.message==='create_drop'){
            createDropDown();
        }

        //disable drop down menu
        if(request.message==='disable_drop'){
            let dropDown = document.querySelector('#dropdown');
            //delete drop down
            dropDown.remove();
        }

        // if (request.message === 'background') {
        //     console.log('req message', request.message);
        //     changeColor();
        // }
        // if(request.color){
        //     console.log('color', request.color)
        //     document.querySelector('body').style.backgroundColor = request.color;
        // }
        // if(request.message=== 'initiate'){
        //     console.log('started');
        //     document.addEventListener('mousemove', handleMouseMove, {passive: true});
        // }
        // if(request.message=== 'stop'){
        //     console.log('stopped')
        //     document.removeEventListener('mousemove', handleMouseMove, {passive: true});
        // }
        sendResponse('done');
    });
    
})()

