import Controller from './Controller.js'
import PropertyUiComponent from '../lib/PropertyUiComponent.js'
import Storage from '../lib/Storage.js'

let ui = {
    length: document.getElementById('length'),
    container: document.getElementById('container'),
    renderType: document.getElementById('renderType'),
    animationType: document.getElementById('animationType'),
    btnCreate: document.getElementById('btnCreate'),
    btnPlay: document.getElementById('btnPlay'),
    btnClear: document.getElementById('btnClear'),
    btnRender: document.getElementById('btnRender'),
    fps: document.getElementById('fps'),
    animationProperties: document.getElementById('animationProperties')
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

controller.onReady(() => {
    controller.setRender(ui.renderType.value)
    // controller.setAnimationAlgorithm(ui.animationType.value)
    controller.createObjects(1000)
    ui.length.value = 1000
    controller.setAnimationAlgorithm('Bounce')
    ui.animationType.value = 'Bounce'
    controller.setRender('Canvas 2d Render')
    ui.renderType.value = 'Canvas 2d Render'
    controller.play()
})

// controller event
controller.onPlayEvent((start) => {
    btnPlay.innerText = start 
        ? 'Pause' 
        : 'Play'
})

controller.onFpsUpdate((fps) => ui.fps.innerText = fps)

controller.onAnimationChange((animation) => {
    ui.animationProperties.innerHTML = ''
    let { id, isSaveAll } = animation.properties
    let storage = new Storage(id, isSaveAll)
    animation.properties.properties.forEach((prop) => {
        let component = new PropertyUiComponent(prop, storage)
        for(let elem of component.elements) {
            ui.animationProperties.appendChild(elem)}
    })
})

// form actions
ui.btnCreate.onclick = () => {
    controller.createObjects(ui.length.value)
    controller.setAnimationAlgorithm(ui.animationType.value)
    controller.setRender(ui.renderType.value)
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

