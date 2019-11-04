import ObjectData from './ObjectData.js'
import Renders from './render/Renders.js'
import Animators from './animator/Animators.js'
import Animator from './animator/Animator.js'

let objects = null
let render = null
let animator = null

let controller = {
    init(containerSize) {
        objects = new ObjectData(containerSize)
        animator = new Animator(objects, Animators.get('RandomAlgorithm'))
    },

    createObjects(len) {
        objects.create(len)
    },

    createRender(renderType, container){
        if (render) {
            render.dispose()
        }
        render = Renders.get(renderType)
                        .create(objects, container)   
    },

    rendering() {
        if (render) {
            render.render()
        }
    },

    play() {
        animator.isPlay = !animator.isPlay
    },

    rendersForEach(callback) {
        Object.keys(Renders.listOfRenders).forEach(callback)
    },

    onPlayEvent(callback) {
        animator.onPlayEvent = callback
    },

    onFrameRender(callback) {
        animator.onFrame = callback
    }
}
export default controller