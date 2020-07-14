import Controller from './controller/Controller.js'
import PropertyUiComponent from './core/ui/PropertyUiComponent.js'
import config from './config.js'
import ui from "./ui/ui.js";

let controller = new Controller(ui.container, config)

// onReady init
controller.onReady(() => {
    PropertyUiComponent.connect(ui.controllerProperties, controller)

    // fill renders select
    for (const [name] of controller.renders) {
        let opt = document.createElement('option')
        opt.innerText = name
        ui.renderType.appendChild(opt)
    }
    // fill animation algorithm select
    for (const [name] of controller.animations) {
        let opt = document.createElement('option')
        opt.innerText = name
        ui.animationType.appendChild(opt)
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
    ui.btnPlay.innerText = start
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


