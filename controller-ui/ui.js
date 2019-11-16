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
    frameInfo: new TableValues(document.getElementById('frameInfo'), [
        'render',
        'idle',
        'fps',
        'multiRate'
    ])
}

let controller = new Controller(ui.container, config)

controller.onReady(() => {
    // fill renders select
    for (const [name] of controller.renders) {
        let opt = document.createElement('option')
        opt.innerText = name
        renderType.appendChild(opt)
    }
    // fill animation algorithm select
    for (const [name] of controller.animations) {
        let opt = document.createElement('option')
        opt.innerText = name
        animationType.appendChild(opt)
    }

    ui.animationType.value = config.ui.animation
    ui.renderType.value = config.ui.render

    controller.setRender(ui.renderType.value)
    controller.createObjects(ui.length.value)
    controller.setAnimationAlgorithm(config.ui.animation)
    controller.setRender(config.ui.render)
    controller.play()
})

// controller event
controller.onStartPause((start) => {
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

