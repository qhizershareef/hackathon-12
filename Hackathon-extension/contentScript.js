(()=>{
    

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

    function displayModal(data){
        if(document.getElementById('modalSave')){
            return;
        }
        console.log('data', data);
        let div = document.createElement('div');
        div.id = 'modalSave';
        div.style = 'display: flex;justify-content:center;align-items:center;position:fixed;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,0.5);z-index:999';
        div.innerHTML=`<div id="modal" style="position: absolute; top:100px; width: 300px; height: 400px; background-color: white; z-index: 100; border: 1px solid black; padding: 10px; box-sizing: border-box; overflow: auto; display: flex; flex-direction: column; justify-content: space-between;">
            <input type="text" id="username" placeholder="Enter name" style="margin-bottom: 10px;">
            <input type="text" id="Queryname" placeholder="Query Name" style="margin-bottom: 10px;">
            <textarea id="code" style="margin-bottom: 10px; height: 200px; width: 100%; box-sizing: border-box; border: 1px solid black; padding: 5px; font-family: monospace; font-size: 14px;">
                ${data}
            </textarea>

            <input type="checkbox" id="isPrivate" style="margin-bottom: 10px;">
            <label for="isPrivate">Private</label>
            <button id="save" style="margin-bottom: 10px;">Save</button>
            <button id="cancel" style="margin-bottom: 10px;">Cancel</button>
        </div>`
        //     <button style="cursor: pointer; background-color: black; color: white; border: none; padding: 5px 10px; border-radius: 5px;">Save</button>
        // </div>`;
        div.querySelector('button').addEventListener('click',()=>{
            let codeName = div.querySelector('#Queryname').value;
            let userName = div.querySelector('#username').value;
            // let code = div.querySelector('.code').value;

            if(code){
                chrome.runtime.sendMessage({
                    message: 'save',
                    codeName: codeName,
                    userName: userName,
                    code: data,
                    isPrivate: div.querySelector('#isPrivate').checked,
                })
                div.remove();
            }
        })
        div.querySelector('#cancel').addEventListener('click',()=>{
            div.remove();
        })
        document.body.appendChild(div);

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
        if(request.message==='addToFirebase'){
            console.log('adding to firebase')
            console.log(request.selection)
            //store this as object in firestore
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
        if( request.message==='displayModal'){
            displayModal(request.selection);
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

