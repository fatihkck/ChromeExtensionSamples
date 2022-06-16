document.getElementById('id_exec').onclick = () => {
  let url = document.getElementById('id_url').value;
  let filename = document.getElementById('id_filename').value;
  let start = document.getElementById('id_start').value;
  let end = document.getElementById('id_end').value;
  let ext = document.getElementById('id_ext').value;
  let zeroPadding = false;
  let digits;
  if (start.substr(0,1) === '0'){
    zeroPadding = true;
    digits = start.length;
  }
  let number = start;
  while(1){
    chrome.downloads.download({
      filename : filename + number + '.' + ext,
      url : url + filename + number + '.' + ext
    });
    if (number === end) break;
    let intNumber = parseInt(number);
    intNumber ++;
    number = String(intNumber);
    if (zeroPadding){
      number = number.padStart(digits, '0');
    }
  }
}