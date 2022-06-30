chrome.runtime.onMessageExternal.addListener((message) =>{
  console.log(message);
  chrome.storage.local.set({key: message});
  return true;
});