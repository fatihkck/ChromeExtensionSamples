document.getElementById('id_ls_set_button').onclick = () => {
  let key = document.getElementById('id_key').value;
  let value = document.getElementById('id_value').value;
  localStorage[key] = value;
  console.log('localStorage Set:key=' + key + ' value=' + value);
}

document.getElementById('id_ls_get_button').onclick = () => {
  let key = document.getElementById('id_key').value;
  let value = localStorage[key];
  console.log('localStorage Get:key=' + key + ' value=' + value);
}

document.getElementById('id_ls_delete_button').onclick = () => {
  let key = document.getElementById('id_key').value;
  localStorage.removeItem(key);
  console.log('localStorage Delete:key=' + key);
}

document.getElementById('id_ls_getall_button').onclick = () => {
  console.log('localStorage qty = ' + localStorage.length);
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage[key];
    console.log( (i + 1) + ' key=' + key + ' value=' + value);
  }
}

document.getElementById('id_ls_clear_button').onclick = () => {
  localStorage.clear();
  console.log('localStorage Clear');
}

document.getElementById('id_ls_set_sw_button').onclick = () => {
  let key = document.getElementById('id_key').value;
  let value = document.getElementById('id_value').value;
  chrome.runtime.sendMessage({method: 'ls_set', key: key, value: value}, () => {
  });
}

document.getElementById('id_ls_get_sw_button').onclick = () => {
  let key = document.getElementById('id_key').value;
  chrome.runtime.sendMessage({method: 'ls_get', key: key}, (response) => {
    console.log('received value from service worker=' + response.value);
  });
}

document.getElementById('id_usage_button').onclick = () => {
  let value = "hoge";

  chrome.storage.local.set({key: value}, function() {
    console.log('Value is set to ' + value);
  });

  chrome.storage.local.get(['key'], function(result) {
    console.log('Value currently is ' + result.key);
  });
}

document.getElementById('id_set_button').onclick = () => {
  let key = document.getElementById('id_key').value;
  let value = document.getElementById('id_value').value;
  let key_value = {};
  key_value[key] = value;
  chrome.storage.local.set(key_value, function() {
    console.log('storage Set:key=' + key + ' value=' + value);
  });
}

document.getElementById('id_get_button').onclick = () => {
  let key = document.getElementById('id_key').value;
  chrome.storage.local.get(key, function(result) {
    console.log('storage Get:key=' + key + ' value=' + result[key]);
  });
}

document.getElementById('id_delete_button').onclick = () => {
  let key = document.getElementById('id_key').value;
  chrome.storage.local.remove(key, function() {
    console.log('storage Delete:key=' + key);
  });
}

document.getElementById('id_getall_button').onclick = () => {
  chrome.storage.local.get(null, function(results) {
    console.log('storage qty = ' + Object.keys(results).length);
    let no = 1;
    for (let key in results) {
      console.log(no++ + ' key=' + key + ' value=' + results[key]);
    }
  });
}

document.getElementById('id_clear_button').onclick = () => {
  chrome.storage.local.clear(function() {
    console.log('storage Clear');
  });
}

document.getElementById('id_set_sw_button').onclick = () => {
  let key = document.getElementById('id_key').value;
  let value = document.getElementById('id_value').value;
  chrome.runtime.sendMessage({method: 'set', key: key, value: value}, () => {
  });
}

document.getElementById('id_get_sw_button').onclick = () => {
  let key = document.getElementById('id_key').value;
  chrome.runtime.sendMessage({method: 'get', key: key}, (response) => {
    console.log('received value from service worker=' + response.value);
  });
}
