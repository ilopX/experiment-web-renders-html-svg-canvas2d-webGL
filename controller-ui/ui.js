import Controller from './Controller.js'
import PropertyUiComponent from './PropertyUiComponent.js'
import TableValues from './TableValues.js'
import Storage from '../lib/Storage.js'
import config from '../config.js'

let ui = {
    length: document.getElementById('length'),
    container: document.getElementById('container'),
    renderType: document.getElementById('renderType'),
    animationType: document.getElementById('animationType'),
    btnCreate: document.getElementById('btnCreate'),
    btnPlay: document.getElementById('btnPlay'),
    frameInfo: document.getElementById('frameInfo'),
    animationProperties: document.getElementById('animationProperties'),
    frameInfo: new TableValues(document.getElementById('frameInfo'))
}

let controller = new Controller(ui.container, config)

controller.onReady(() => {
    // fill select renders
    for (const [name] of controller.renders) {
        let opt = document.createElement('option')
        opt.innerText = name
        renderType.appendChild(opt)   
    }
    // fill select animation algorithm
    for (const [name] of controller.animations) {
        let opt = document.createElement('option')
        opt.innerText = name
        animationType.appendChild(opt)    
    }

    ui.frameInfo.initNames('renderTime', 'idleTime', 'fps', 'multiRate')
    controller.setRender(ui.renderType.value)
    controller.createObjects(ui.length.value)
    controller.setAnimationAlgorithm('Snow')
    ui.animationType.value = 'Snow'
    controller.setRender('Canvas 2d Render')
    ui.renderType.value = 'Canvas 2d Render'
    controller.play()
})

// controller event
controller.onPlay((start) => {
    btnPlay.innerText = start
        ? 'Pause'
        : 'Play'
})

controller.onFpsUpdate((frameInfo) => {
    ui.frameInfo.setValues(frameInfo)
})

controller.onAnimationChange((animation) => {
    // create ui elemetns for animation properties
    ui.animationProperties.innerHTML = ''
    let { id, isSaveAll } = animation.properties
    let storage = new Storage(id, isSaveAll)
    animation.properties.properties.forEach((prop) => {
        let component = new PropertyUiComponent(prop, storage)
        let div = document.createElement('div')
        component.elements.forEach((elem) => {
            div.appendChild(elem)
        })
        ui.animationProperties.appendChild(div)
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

ui.btnPlay.onclick = () => {
    controller.play()
}

