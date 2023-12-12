// Saves options to chrome.storage
const saveOptions = () => {
    const mini = document.getElementById('min').value;
    const maxi = document.getElementById('max').value;

    chrome.storage.sync.set(
        { mini: mini, maxi: maxi },
        () => {
            const status = document.getElementById('status');
            status.textContent = 'Options saved.';
            console.log("Updated ranking: " + mini + "-" + maxi)
            setTimeout(() => {
                status.textContent = '';
            }, 750);
        }
    );
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.

const restoreOptions = () => {
    chrome.storage.sync.get(
        { mini: 800, maxi: 2200 },
        (items) => {
            document.getElementById('min').value = items.mini;
            document.getElementById('max').value = items.maxi;
        }
    );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);