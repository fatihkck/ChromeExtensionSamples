chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log("enter");
    //chrome.pageAction.show(tabs[0].id);
});


// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     console.log(message);
//     if (message.todo === "changeColor") {
//         //var userName = $("#UserName").val();
//         console.log(userName);
//         sendResponse("Received message");
//       }
//   });