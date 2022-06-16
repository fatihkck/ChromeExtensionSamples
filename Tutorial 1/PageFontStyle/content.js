 console.log("Content js");


 chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message);
    if (message.todo === "changeColor") {
        var userName = $("#UserName").val();
        console.log(userName);
        console.log($("#btnLogin"));
        $("#btnLogin").click();
        console.log("click");
     
      }

      sendResponse("Received message");
  });