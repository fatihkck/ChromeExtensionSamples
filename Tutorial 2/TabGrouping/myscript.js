document.getElementById("id_MakeGroup").onclick = () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
        function: getApiRef
    });
  });
};

function getApiRef(){
  let tables= document.getElementsByTagName("table");
  let tds = tables[0].getElementsByTagName("td");
  let createTabs = [];

  for (let i = 0; i < tds.length; i += 2){
    let as = tds[i].getElementsByTagName("a");
    createTabs.push({href: as[0].href, name: as[0].innerText});
  }

  RequestCreateTabs(createTabs);

  function RequestCreateTabs(createTabs){
    if (createTabs.length == 0) return;
    tab = createTabs.shift();
    chrome.runtime.sendMessage(tab, (response) => {
      RequestCreateTabs(createTabs);
    });
  }
}