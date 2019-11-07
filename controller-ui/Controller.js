import ObjectData from '../lib/ObjectData.js'
import Renders from '../render/Renders.js'
import Animations from '../animation/Animations.js'
import Processor from '../lib/Processor.js'
import Containerable from '../lib/Containerable.js'

export default class Controller {
    constructor(container) {
        this._container = new Containerable(container)
        this._objectData = new ObjectData(this._container)
        this._render = null
        this._animation = null
        this._processor = new Processor()
        this._processor.onCycleEvent(() => {
            if (this._animation) {
                this._animation.animate()
            }

            if (this._render){
                this._render.render()
            }
        })
        this._onAnimationChange = null
    }

    setRender(name) {
        if (this._render) {
            this._render.dispose()
        }
        this._render = Renders.get(name)
                        .create(this._objectData, this._container) 
    }

    setAnimationAlgorithm(name) {
        // if (this._animation) {
        //     this._animation.dispose()
        // }
        this._animation = Animations.get(name)
                            .create(this._objectData, this._container) 
        if (typeof this._onAnimationChange == 'function') {
            this._onAnimationChange(this._animation)
        }
    }

    createObjects(len) {
        this._objectData.create(len)
    }

    rendering() {
        if (this._render) {
            this._render.render()
        }
    }

    play() {
        this._processor.isStart = !this._processor.isStart
    }

    getRenders(callback) {
        Object.keys(Renders.listOfRenders).forEach(callback)
    }

    getAnimations(callback) {
        Object.keys(Animations.algorithms).forEach(callback)
    }

    onPlayEvent(callback) {
        this._processor.onStartEvent = callback
    }

    onFpsUpdate(callback) {
        this._processor.onFpsUpdateEvent(callback)
    }

    onAnimationChange(callback) {
        this._onAnimationChange = callback
    }
}