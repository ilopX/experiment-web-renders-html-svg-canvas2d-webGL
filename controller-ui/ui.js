import Controller from './Controller.js'
import PropertyUiComponent from '../lib/PropertyUiComponent.js'
import Storage from '../lib/Storage.js'

class TableValues {
    constructor(parentElement) {
        this._parentElem = parentElement
        this._values = {}
    }

    initNames(...names) {
        this._parentElem.innerHTML = ''
        let tableElem = document.createElement('table')
        for (const name of names) {
            let tr = document.createElement('tr')
            let td = document.createElement('td')
            let tdVal = document.createElement('td')
            td.innerText = name
            tr.appendChild(td)
            tr.appendChild(tdVal)
            tableElem.appendChild(tr)
            this._values[name] = tdVal
        }
        this._parentElem.appendChild(tableElem)
    }

    setValues(values) {
        for (const key of Object.keys(values)) {
                const val = values[key]
                this._values[key].innerText = val.toFixed(2)
        }
    }
}

let ui = {
    length: document.getElementById('length'),
    container: document.getElementById('container'),
    renderType: document.getElementById('renderType'),
    animationType: document.getElementById('animationType'),
    btnCreate: document.getElementById('btnCreate'),
    btnPlay: document.getElementById('btnPlay'),
    frameInfo: document.getElementById('frameInfo'),
    animationProperties: document.getElementById('animationProperties'),
    frameInfo1: new TableValues(document.getElementById('frameInfo'))
}

let controller = new Controller(ui.container)

controller.getRenders((name) => {
    let opt = document.createElement('option')
    opt.innerText = name
    renderType.appendChild(opt)
})

controller.getAnimations((name) => {
    let opt = document.createElement('option')
    opt.innerText = name
    animationType.appendChild(opt)
})

controller.onReady(() => {
    ui.frameInfo1.initNames('renderTime', 'idleTime', 'fps', 'multiRate')

    controller.setRender(ui.renderType.value)
    controller.createObjects(1000)
    ui.length.value = 1000
    controller.setAnimationAlgorithm('Snow')
    ui.animationType.value = 'Snow'
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

controller.onFpsUpdate((frameInfo) => {
    ui.frameInfo1.setValues(frameInfo)
})

controller.onAnimationChange((animation) => {
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

