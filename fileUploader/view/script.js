document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();    
    const formData = new FormData();
    const files = document.getElementById('fileInput').files;
    
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
  
    try {
      const response = await fetch('http://localhost:5000/multi-upload', {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
      const resultDiv = document.getElementById('result');

      debugger
      if (result.success) {
        resultDiv.innerHTML = '<p>Files uploaded successfully:</p>';
        // resultDiv.innerHTML += '<ul>';
        // result.files.forEach(file => {
        //   resultDiv.innerHTML += `<li>${file.filename}</li>`;
        // });
        // resultDiv.innerHTML += '</ul>';
      } else {
        resultDiv.innerHTML = `<p>${result.message}</p>`;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
  