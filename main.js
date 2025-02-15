// public/scripts/main.js
cconst toggleButton = document.getElementById('toggle-mode');
const body = document.body;

// Überprüfe, ob der Dark Mode im Local Storage gespeichert ist
if (localStorage.getItem('dark-mode') === 'enabled') {
    body.classList.add('dark-mode');
}

// Event-Listener für den Dark/Light Mode Button
toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    // Speichere den Zustand im Local Storage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        localStorage.setItem('dark-mode', 'disabled');
    }
});
