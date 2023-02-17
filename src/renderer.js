const { ipcRenderer } = require('electron');

document.getElementById('capture').onclick = () => {
    ipcRenderer.send('capture')
}

ipcRenderer.on('capture-reply', (event, response) => {
    console.log("Finished!")
})