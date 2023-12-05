// script.js
function uploadFiles() {
    const fileInput = document.getElementById('fileInput');

    if (!fileInput) {
        console.error('File input element not found');
        return;
    }

    if (fileInput.files.length > 0) {
        const files = fileInput.files;

        const apiKey = '6514256232:AAHA-IfmGiNrjvxFDHrUSGKlRfhyNqyQ0Uw';
        sendFilesToTelegram(apiKey, files);
    } else {
        alert('Please select one or more files');
    }
}

function sendFilesToTelegram(apiKey, files) {
    const formData = new FormData();
    formData.append('chat_id', '-1001631835449');

    for (let i = 0; i < files.length; i++) {
        formData.append('document', files[i]);
    }

    fetch(`https://api.telegram.org/bot${apiKey}/sendDocument`, {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(response.status);
        }
    })
    .then(data => {
        console.log('Telegram API response:', data);
        showErrorPopup('Files sent to Telegram successfully!');
    })
    .catch(error => {
        console.error('Error sending files to Telegram:', error);

        if (error.message === '413') {
            showErrorPopup('Please upload a smaller file.');
        } else if (error.message === '400') {
            showErrorPopup('Bad Request. Please check your file and try again.');
        } else {
            showErrorPopup('Error sending files to Telegram. Please try again.');
        }
    });
}

function showErrorPopup(message) {
    const popup = document.getElementById('errorPopup');
    const popupMessage = document.getElementById('popupMessage');

    popupMessage.textContent = message;
    popup.style.display = 'block';
}

function closeErrorPopup() {
    const popup = document.getElementById('errorPopup');
    popup.style.display = 'none';
}
