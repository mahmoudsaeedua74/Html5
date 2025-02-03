// Drag and Drop Events
const draggableElement = document.getElementById('draggableElement');
const dropZone = document.getElementById('dropZone');
draggableElement.addEventListener('dragstart', (e) => {
    e.target.style.opacity = '0.5';
});
draggableElement.addEventListener('dragend', (e) => {
    e.target.style.opacity = '1';
});
dropZone.addEventListener('dragover', (e) => e.preventDefault());
dropZone.addEventListener('dragenter', () => dropZone.style.backgroundColor = 'lightgreen');
dropZone.addEventListener('dragleave', () => dropZone.style.backgroundColor = 'white');
dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.appendChild(draggableElement);
    dropZone.style.backgroundColor = 'white';
});

// Clipboard API
const copyButton = document.getElementById('copyButton');
const pasteButton = document.getElementById('pasteButton');
const copyTextInput = document.getElementById('copyText');
const pasteArea = document.getElementById('pasteArea');
const messageArea = document.getElementById('message');
copyButton.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(copyTextInput.value);
        messageArea.textContent = 'Text copied ✔';
        messageArea.style.display = 'block';
        messageArea.style.color = 'green';
    } catch (err) {
        messageArea.textContent = 'Failed to copy text!';
        messageArea.style.display = 'block';
        messageArea.style.color = 'red';
    }
});
pasteButton.addEventListener('click', async () => {
    try {
        const text = await navigator.clipboard.readText();
        messageArea.style.display = 'none';

        pasteArea.textContent = text;
    } catch (err) {
        console.error('Failed to paste: ', err);
    }
});
// Notifications
const requestPermissionBtn = document.getElementById('requestPermission');
const showNotificationBtn = document.getElementById('showNotification');
const jokes = [
    "Why don't skeletons fight each other? They don't have the guts!",
    "What do you call fake spaghetti? An impasta!",
    "I told my wife she was drawing her eyebrows too high. She looked surprised!",
    "Why can't your nose be 12 inches long? Because then it would be a foot!",
    "I used to play piano by ear, but now I use my hands!"
];
requestPermissionBtn.addEventListener('click', () => {
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            alert('Notification permission granted');
        }
    });
});

showNotificationBtn.addEventListener('click', () => {
    if (Notification.permission === 'granted') {
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        new Notification('HTML5 Test', {
            body: randomJoke,  
            icon: '/path/to/icon.png' 
        });
    } else {
        alert('Please request notification permission first');
    }
});