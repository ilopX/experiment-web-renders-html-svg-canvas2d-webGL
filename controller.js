import ObjectData from './ObjectData.js'
import Renders from './render/Renders.js'

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
}
export default controller