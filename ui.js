import Controller from './Controller.js'

let ui = {
    length: document.getElementById('length'),
    container: document.getElementById('container'),
    renderType: document.getElementById('renderType'),
    animationType: document.getElementById('animationType'),
    btnCreate: document.getElementById('btnCreate'),
    btnPlay: document.getElementById('btnPlay'),
    btnClear: document.getElementById('btnClear'),
    btnRender: document.getElementById('btnRender'),
    fps: document.getElementById('fps')
}

let controller = new Controller(ui.container)

controller.getRenders( (name) => {
    let opt = document.createElement('option')
    opt.innerText = name
    renderType.appendChild(opt)
})

controller.getAnimations( (name) => {
    let opt = document.createElement('option')
    opt.innerText = name
    animationType.appendChild(opt)
})

// controller event
controller.onPlayEvent((start) => {
    btnPlay.innerText = start 
        ? 'Pause' 
        : 'Play'
})

controller.onFpsUpdate((fps) => ui.fps.innerText = fps)

// form actions
ui.btnCreate.onclick = () => {
    controller.createObjects(ui.length.value)
    controller.setRender(ui.renderType.value)
    controller.setAnimationAlgorithm(ui.animationType.value)
    controller.rendering()
}

ui.renderType.onchange = () => {
    controller.setRender(ui.renderType.value)
    controller.rendering()
}

ui.animationType.onchange = () => {
    controller.setAnimationAlgorithm(ui.animationType.value)
} 

ui.btnRender.onclick = () => {
    controller.rendering()
}

ui.btnPlay.onclick = () => {
    controller.play()
}

