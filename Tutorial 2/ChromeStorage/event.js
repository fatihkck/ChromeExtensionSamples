chrome.runtime.onMessage.addListener((message, sender, sendResponse) =>{
  let key, value;
  switch (message.method){
  case 'set':
    key = message.key;
    value = message.value;
    let key_value = {};
    key_value[key] = value;
    chrome.storage.local.set(key_value, function() {
      console.log('SW storage Set:key=' + key + ' value=' + value);
    });
    break;
  case 'get':
    key = message.key;
    chrome.storage.local.get(key, function(result) {
      console.log('SW storage Get:key=' + key + ' value=' + result[key]);
      sendResponse({value: result[key]});
    });
    break;
  case 'ls_set':
    key = message.key;
    value = message.value;
    localStorage[key] = value;
    console.log('SW localStorage Set:key=' + key + ' value=' + value);
    break;
  case 'ls_get':
    key = message.key;
    value = localStorage[key];
    console.log('SW localStorage Get:key=' + key + ' value=' + value);
    sendResponse({value: value});
    break;
  }
  return true;
});