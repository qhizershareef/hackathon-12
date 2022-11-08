try {
  //import firebase scripts from firebase folder
    self.importScripts('firebase/firebase-firebase.js');
  // // Initialize Firebase

    const firebaseConfig = {
      apiKey: "AIzaSyBECZ0MkXb6MAQVgx6XP_jH542GEDpid_M",
      authDomain: "social-network-js.firebaseapp.com",
      databaseURL: "https://social-network-js.firebaseio.com",
      projectId: "social-network-js",
      storageBucket: "social-network-js.appspot.com",
      messagingSenderId: "640569497422",
      appId: "1:640569497422:web:ae448c5f633dae0e63f01f",
      measurementId: "G-K7CJ3C2D49"
    };
    //   // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var db = firebase.firestore();
    console.log(db)

  

  chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url) {
      // const queryParameters = tab.url.split("?")[1];
      // this piece of code is very important it determines if the url path has changed 
      // const urlParameters = new URLSearchParams(queryParameters);
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
  // chrome.contextMenus.create(contextMenuItem);

  //fix chrome runtime error cannot create duplicate id add.
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create(contextMenuItem);
  })

  //when clicked on context menu item, send message to content script to show modal
  chrome.contextMenus.onClicked.addListener((data) => {
    if (data.menuItemId === 'add' && data.selectionText) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          message: 'displayModal',
          selection: data.selectionText
        })
      })
    }
  })

  //listen for message from content script
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'NEW') {
      console.log('new ' + location.href);
    }
    if (request.message === 'save') {
      console.log('adding message to firebase')
      console.log(request)
      //store this as object in firestore db
      db.collection("code").add({
        codeName: request.codeName,
        code: request.code,
        name: request.userName,
        isPrivate: request.isPrivate,
      }).then((docRef) => {
        console.log('code saved', docRef.id)
      }).catch((error) => {
        console.log('error saving code', error)
      })
    }
    })




  // chrome.contextMenus.onClicked.addListener((data) => {
  //   console.log('inside context menu')
  //   if (data.menuItemId === 'add' && data.selectionText) {
  //     console.log('inside add data');
  //     console.log('data', data.selectionText);
  //     //send data to content script
  //     // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //     //   chrome.tabs.sendMessage(tabs[0].id, {
  //     //     message: 'add',
  //     //     selection: data.selectionText
  //     //   })
  //     // })
  //     //use firebase latest version
  //       db.collection('code').add({
  //           code: data.selectionText,
  //       }).then((docRef)=>{
  //           console.log('code saved', docRef.id)
  //       }).catch((error)=>{
  //           console.log('error saving code', error)
  //       })
  //     }
  // })

  // chrome.contextMenus.onClicked.addListener((clickData)=>{
  //     if(clickData.menuItemId === 'add' && clickData.selectionText){
  //         console.log(clickData.selectionText)
  //         //send this to the content script
  //         chrome.tabs.query({active: true, currentWindow: true}, (tabs)=>{
  //             chrome.tabs.sendMessage(tabs[0].id, {message: 'add', selection: clickData.selectionText})
  //         })
  //     }
  // })


} catch (error) {
  console.log(error);
}