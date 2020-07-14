import ObjectData from '../core/ObjectData.js'
import Renders from '../core/plugins/Renders.js'
import Animations from '../core/plugins/Animations.js'
import Processor from '../core/Processor.js'
import Containerable from '../core/Containerable.js'
import Event from '../core/Event.js'
import VisualDebugger from '../core/VisualDebugger.js'
import {IPropertiesable} from '../core/ui/PropertyUiComponent.js'

export default class Controller extends IPropertiesable{

    constructor(container, config) {
        super()
        this._config = config
        this._container = new Containerable(container)
        this._objectData = new ObjectData(this._container)
        this._render = null
        this._animation = null
        this._onAnimationChangeEvent = () => { }

        this._createProcessor()
    }

    _createProcessor() {
        this._processor = new Processor(this._config.processor.updateInfoTime)
        this._processor.onCycle((multiRate) => {
            this._animation.animate(multiRate)
            this._render.render()
        })
    }

    /** @param {String} name */
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

    /** @returns {Array<String>} */
    get renders() {
        return Object.entries(Renders.listOfRenders)
    }

    /** @returns {Array<String>} */
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

    get properties() {
        return {
            id: 'Controller',
            properties: [
                {
                    name: 'debug',
                    set: (isCheked) => {
                        if (isCheked && this._debug == null) {
                            this._debug = new VisualDebugger()
                        } else {
                            // this._debug.dispose()
                            this._debug == null
                        }
                    },
                    get: () => this._debug !== null
                }
            ]
        }

    }
}
