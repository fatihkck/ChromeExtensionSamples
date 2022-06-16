$(function () {
    var color = $("#fontColor").val();
    $("#fontColor").on("change paste keyup", function () {
        console.log("change paste keyup");
        color = $(this).val();
    });

    $("#btnChanges").click(function () {

        // chrome.runtime.sendMessage({ todo: "changeColor", clickedColor: color }, (response) => {
        //     // 3. Got an asynchronous response with the data from the background
        //     console.log(response);
          
        //   });
        let tab = chrome.tabs.query({ active: true, currentWindow: true });
        console.log("tabs");
        console.log(tab);
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            console.log(tabs);
            console.log(tabs[0].id);
            // chrome.tabs.sendMessage(tabs[0].id, { todo: "changeColor", clickedColor: color },function(response){
            //     console.log("Message received");
            //     console.log(response);
            // });

            // chrome.runtime.sendMessage('get-user-data', (response) => {
            //     // 3. Got an asynchronous response with the data from the background
            //     console.log('received user data', response);
              
            //   });

            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: setPageBackgroundColor,
            });
        });

    
    });

});


// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
    console.log("setPageBackgroundColor");
    document.body.style.backgroundColor="red";

    var userName = $("#UserName").val();
    
    console.log(userName);
    // $("#UserName").val("deneme@deneme");
    // console.log($("#btnLogin"));
    // $("#btnLogin").trigger("click");
    document.getElementById('btnLogin').click();
    // chrome.storage.sync.get("color", ({ color }) => {
    //     document.body.style.backgroundColor = color;
    // });
}
