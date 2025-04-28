document.getElementById('submitButton').addEventListener('click', function() {
    const input = document.getElementById('numberInput').value;
    const errorDiv = document.getElementById('error');
    const resultDiv = document.getElementById('result');

    errorDiv.textContent = '';
    resultDiv.textContent = '';

    const number = Number(input);

    if (number < 1 || number > 10) {
        errorDiv.textContent = 'Число вне диапазона от 1 до 10';
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://jsonplaceholder.typicode.com/photos?_limit=${number}`, true);
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            const photos = JSON.parse(xhr.responseText);
            displayPhotos(photos);
        } else {
            errorDiv.textContent = 'Ошибка при получении данных';
        }
    };
    xhr.onerror = function() {
        errorDiv.textContent = 'Ошибка сети';
    };
    xhr.send();
});

function displayPhotos(photos) {
    const resultDiv = document.getElementById('result');
    photos.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo.thumbnailUrl;
        img.alt = photo.title;
        img.style.width = '150px'; 
        resultDiv.appendChild(img);
    });
}
