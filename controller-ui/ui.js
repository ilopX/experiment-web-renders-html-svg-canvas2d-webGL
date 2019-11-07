import Controller from './Controller.js'
import PropertyUiComponent from '../lib/PropertyUiComponent.js'

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

setTimeout(() => {
    controller.setRender(ui.renderType.value)
    controller.setAnimationAlgorithm(ui.animationType.value)
},1)

// controller event
controller.onPlayEvent((start) => {
    btnPlay.innerText = start 
        ? 'Pause' 
        : 'Play'
})

controller.onFpsUpdate((fps) => ui.fps.innerText = fps)

controller.onAnimationChange((animation) => {
    ui.animationProperties.innerHTML = ''
    animation.properties.forEach((prop) => {
        let component = new PropertyUiComponent(prop)
        for(let elem of component.elements) {
            ui.animationProperties.appendChild(elem)}
    })
})

// form actions
ui.btnCreate.onclick = () => {
    controller.createObjects(ui.length.value)
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

