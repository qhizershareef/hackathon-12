chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url) {
    //   const queryParameters = tab.url.split("?")[1];
    //this piece of code is very important it determines if the url path has changed 
    //   const urlParameters = new URLSearchParams(queryParameters);
      chrome.tabs.sendMessage(tabId, {
        type: "NEW",
        url: tab.url,
      });
    }
  });
console.log('inside background')
let contextMenuItem = {
    id: 'add',
    title: 'Save this code?',
    contexts: ['selection']
}
chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener((clickData)=>{
    if(clickData.menuItemId === 'add' && clickData.selectionText){
        console.log(clickData.selectionText)
        //send this to the content script
        chrome.tabs.query({active: true, currentWindow: true}, (tabs)=>{
            chrome.tabs.sendMessage(tabs[0].id, {message: 'add', selection: clickData.selectionText})
        })
    }
}
)

