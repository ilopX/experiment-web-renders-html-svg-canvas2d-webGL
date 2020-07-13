import Controller from './Controller.js'
import PropertyUiComponent from './PropertyUiComponent.js'
import TableValues from './TableValues.js'
import config from '../config.js'

// ui init
let ui = {
    length: document.getElementById('length'),
    container: document.getElementById('container'),
    renderType: document.getElementById('renderType'),
    animationType: document.getElementById('animationType'),
    btnCreate: document.getElementById('btnCreate'),
    btnPlay: document.getElementById('btnPlay'),
    animationProperties: document.getElementById('animationProperties'),
    frameInfo: new TableValues(document.getElementById('frameInfo'),
        [
            'render',
            'idle',
            'fps',
            'multiRate',
            'objects'
        ]),
    controllerProperties: document.getElementById('controllerProperties')
}

let controller = new Controller(ui.container, config)


// onReady init
controller.onReady(() => {
    PropertyUiComponent.connect(ui.controllerProperties, controller)

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
    controller.setAnimation(config.ui.animation)
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
    frameInfo.objects = controller.objectsLen
    ui.frameInfo.setValues(frameInfo)
})

controller.onAnimationChange((animation) => {
    // create ui elemetns for animation properties
    PropertyUiComponent.connect(ui.animationProperties, animation)
})

// form actions
ui.btnCreate.onclick = () => {
    controller.createObjects(ui.length.value)
    controller.setAnimation(ui.animationType.value)
    controller.setRender(ui.renderType.value)
    controller.rendering()
}

ui.renderType.onchange = () => {
    controller.setRender(ui.renderType.value)
    controller.rendering()
}

ui.animationType.onchange = () => {
    controller.setAnimation(ui.animationType.value)
}

ui.btnPlay.onclick = () => {
    controller.play()
}

