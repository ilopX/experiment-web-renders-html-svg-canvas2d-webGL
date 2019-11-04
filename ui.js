import controller from './controller.js'
import Renders from './render/Renders.js'

let ui = {
    length: document.getElementById('length'),
    container: document.getElementById('container'),
    renderType: document.getElementById('renderType'),
    btnCreate: document.getElementById('btnCreate'),
    btnPlay: document.getElementById('btnPlay'),
    btnClear: document.getElementById('btnClear'),
    btnRender: document.getElementById('btnRender')
}

ui.btnCreate.onclick = () => {
    controller.createObjects(ui.length.value)
    controller.createRender(ui.renderType.value, ui.container)
    controller.rendering()
}

ui.renderType.onchange = () => {
    controller.createRender(ui.renderType.value,  ui.container)
} 
ui.btnRender.onclick = () => {
    controller.rendering()
}

btnPlay.onclick = () => {
    controller.play()
}

controller.rendersForEach( (name) => {
    let opt = document.createElement('option')
    opt.innerText = name
    renderType.appendChild(opt)
})

controller.init({
    width: () => ui.container.clientWidth,
    height: () => ui.container.clientHeight
})

controller.onPlayEvent((start)=> btnPlay.innerText = start ? 'Pause' : 'Play')
controller.onFrameRender(() => controller.rendering())


