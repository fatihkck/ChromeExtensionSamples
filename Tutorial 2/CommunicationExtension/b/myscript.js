document.getElementById("id_send").onclick = () => {
  let extensionId = document.getElementById("id_extensionId").value;
  let message = document.getElementById("id_message").value;
  chrome.runtime.sendMessage(extensionId, message);
}

document.getElementById("id_recv").onclick = () => {
  chrome.storage.local.get({
    key: ""
  }, (item) => {
    document.getElementById("id_received").value = item.key;
  });
}