import ObjectData from '../lib/ObjectData.js'
import Renders from '../render/Renders.js'
import Animations from '../animation/Animations.js'
import Processor from '../lib/Processor.js'
import Containerable from '../lib/Containerable.js'
import Event from '../lib/Event.js'

export default class Controller {
    constructor(container, config) {
        this._config = config
        this._container = new Containerable(container)
        this._objectData = new ObjectData(this._container)
        this._render = null
        this._animation = null
        this._onAnimationChangeEvent = () => { }
        this._onReadyEvent = () => { }
        setTimeout(() => this._onReadyEvent(), 0)
        this._createProcessor()
    }

    _createProcessor() {
        this._processor = new Processor(this._config.processor.updateInfoTime)
        this._processor.onCycle((multiRate) => {
            this._animation.animate(multiRate)
            this._render.render()
        })
    }

    setRender(name) {
        if (this._render) {
            this._render.dispose()
        }
        this._render = Renders.get(name)
            .create(this._objectData, this._container)
    }

    setAnimation(name) {
        if (this._animation) {
            this._animation.dispose()
        }
        this._animation = Animations.get(name)
            .create(this._objectData, this._container)
        this._onAnimationChangeEvent(this._animation)
    }

    createObjects(len) {
        this._objectData.create(len,
            this._config.newObject.width,
            this._config.newObject.height)
    }

    rendering() {
        if (this._render) {
            this._render.render()
        }
    }

    play() {
        this._processor.isStart = !this._processor.isStart
    }

    get objectsLen() {
        return this._objectData.get.length
    }

    get renders() {
        return Object.entries(Renders.listOfRenders)
    }

    get animations() {
        return Object.entries(Animations.listOfAnimations)
    }

    onStartPause(callback) {
        this._processor.onStart(callback)
    }

    onFpsUpdate(callback) {
        this._processor.onFpsUpdateEvent(callback)
    }

    onAnimationChange(callback) {
        this._onAnimationChangeEvent = Event.check(callback)
    }

    onReady(callback) {
        this._onReadyEvent = Event.check(callback)
    }
}
