import Controller from './controller/Controller.js'
import PropertyUiComponent from './core/ui/PropertyUiComponent.js'
import config from './config.js'
import ui from './ui/ui.js';
import onReady from './core/onReady.js'

let controller = new Controller(ui.container, config)

onReady(() => {
    PropertyUiComponent.connect(ui.controllerProperties, controller)

    addRenderPluginsNameToUIComboBox()
    addAnimationPluginsNameToUIComboBox()

    ui.animationType.value = config.ui.defaultAnimation
    ui.renderType.value = config.ui.defaultRender

    controller.setRender(ui.renderType.value)
    controller.createObjects(ui.length.value)
    controller.setAnimation(config.ui.defaultAnimation)
    controller.setRender(config.ui.defaultRender)
    controller.play()
})

controller.onStartPause((start) => {
    ui.btnPlay.innerText = start
        ? 'Pause'
        : 'Play'
})

controller.onFpsUpdate((frameInfo) => {
    frameInfo.objects = controller.objectsLen
    ui.frameInfo.setValues(frameInfo)
})

controller.onAnimationChange((animation) => {
    PropertyUiComponent.connect(ui.animationProperties, animation)
})

ui.btnCreate.onclick = () => {
    controller.createObjects(ui.length.value)
    controller.setAnimation(ui.animationType.value)
    controller.setRender(ui.renderType.value)
    controller.rendering()
}

ui.length.onkeyup = (e) => {
    if (event.keyCode === 13) {
        ui.btnCreate.onclick(null)
        e.preventDefault();
    }
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

function addRenderPluginsNameToUIComboBox() {
    for (const [name] of controller.renders) {
        let opt = document.createElement('option')
        opt.innerText = name
        ui.renderType.appendChild(opt)
    }
}

function addAnimationPluginsNameToUIComboBox() {
    for (const [name] of controller.animations) {
        let opt = document.createElement('option')
        opt.innerText = name
        ui.animationType.appendChild(opt)
    }
}

