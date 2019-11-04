import controller from './controller.js'
// ui
let ui = {
    length: document.getElementById('length'),
    container: document.getElementById('container'),
    renderType: document.getElementById('renderType'),
    btnCreate: document.getElementById('btnCreate'),
    btnPlay: document.getElementById('btnPlay'),
    btnClear: document.getElementById('btnClear'),
    btnRender: document.getElementById('btnRender')
}
export default ui

ui.btnCreate.onclick = () => {
    controller.createObjects()
    controller.createRender()
}

ui.renderType.onchange = () => {
    controller.createRender()
} 
ui.btnRender.onclick = () => {
    controller.rendering()
}

btnPlay.onclick = () => {
    controller.play()
}







