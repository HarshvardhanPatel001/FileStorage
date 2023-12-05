// script.js
function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    if (!fileInput) {
        console.error('File input element not found');
        return;
    }
    if (fileInput.files.length > 0) {
        const file = fileInput.files;

        // Simulate sending the file to Telegram (replace this with actual server-side code)
        const apiKey = '6514256232:AAHA-IfmGiNrjvxFDHrUSGKlRfhyNqyQ0Uw';
        // 6514256232:AAHA-IfmGiNrjvxFDHrUSGKlRfhyNqyQ0Uw
        sendFileToTelegram(apiKey, file);
    } else {
        alert('Please select a file');
    }
}

function sendFileToTelegram(apiKey, file) {
    const formData = new FormData();
    formData.append('chat_id', '-1001631835449');
    //  Replace with your target chat ID
    // 1001631835449
    for (let i = 0; i < file.length; i++) {
        formData.append('document', file[i]);
    }
    // formData.append('document', file[0]);

    fetch(`https://api.telegram.org/bot${apiKey}/sendDocument`, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log('Telegram API response:', data);
        alert('File sent to Telegram successfully!');
    })
    .catch(error => {
        console.error('Error sending file to Telegram:', error);
        alert('Error sending file to Telegram. Please try again.');
    });
}
