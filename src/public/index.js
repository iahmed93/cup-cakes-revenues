document.querySelector('#submit-btn').addEventListener('click', () => {
    handleFilesUpload();
});

const handleFilesUpload = event => {
    // const files = event.target.files
    const basicFile = document.querySelector('#basic-file').files[0];
    const deluxFile = document.querySelector('#delux-file').files[0];
    const totalFile = document.querySelector('#total-file').files[0];
    
    const formData = new FormData();

    formData.append('basic', basicFile);
    formData.append('delux', deluxFile);
    formData.append('total', totalFile);
  
    fetch('/files', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
  }