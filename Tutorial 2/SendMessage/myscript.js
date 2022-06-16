
document.getElementById('id_Recv').onclick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: RecvFromDomainA
        });
    });
}

document.getElementById('id_Send').onclick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: SendToDomainB
        });
    });
}

function RecvFromDomainA() {
    let value = document.getElementById("UserName").value;
    chrome.runtime.sendMessage({ method: 'Send', key: 'key', value: value });
}

function SendToDomainB() {
    chrome.runtime.sendMessage({ method: 'Recv', key: 'key' }, (response) => {
        console.log("Sent SendToDomainB")
        document.getElementById('Password').value = response.value;
    });
}