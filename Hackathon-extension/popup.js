//run once dom is loaded
document.addEventListener('DOMContentLoaded', function () {

    const btn = document.querySelector('button');
    btn.addEventListener('click', async () => {
        console.log('button clicked')
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { message: 'background' }, (response) => {
            console.log(response);
            });
        });
    });
    let dropInput = document.querySelector('#enableDisable');
    dropInput.addEventListener('click', dropControl);
    function dropControl(){
        //if btn is disabled send request to disable drop down
        if(btn.disabled){
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { message: 'disable_drop' }, (response) => {
                console.log(response);
                });
            });
        }else{
            //if btn is enabled send request to create drop down
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { message: 'create_drop' }, (response) => {
                console.log(response);
                });
            });
        }
    }

});