document.getElementById('id_button_exec').onclick = () => {
  let url = document.getElementById('id_url').value;
  fetch(url, {
    method: 'GET',
    mode: 'cors'
  })
  .then(response => {
    if (response.ok) {
      return response.text();
    }
    throw new Error('Response was not ok.');
  })
  .then(data => {
    document.getElementById('id_response').value = data;
  })
 .catch(error => {
    document.getElementById('id_response').value = error;
  })
}