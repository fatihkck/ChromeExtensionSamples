chrome.runtime.onMessage.addListener((createTab, sender, sendResponse) => {
  chrome.tabs.create({url: createTab.href}, (createdTab) => {
    let groupName = getGroupName(createTab.name);
    chrome.tabGroups.query({title: groupName}, (tabGroups) => {
      if (tabGroups.length == 0){
        chrome.tabs.group({tabIds: createdTab.id}, (groupId) => {
          chrome.tabGroups.update(groupId, {title: groupName},() =>{
            sendResponse();
          });
        });
      }
      else{
        chrome.tabs.group({groupId: tabGroups[0].id, tabIds: createdTab.id},() => {
          sendResponse();
        });
      }
    });
  });

  return true;
})

function getGroupName(tabName){
  let firstChar = tabName.substr(0,1);
  let groupName;
  if (firstChar < "f") groupName = "g1";
  else if (firstChar < "k") groupName = "g2";
  else if (firstChar < "p") groupName = "g3";
  else if (firstChar < "u") groupName = "g4";
  else groupName = "g5";

  return groupName;
}