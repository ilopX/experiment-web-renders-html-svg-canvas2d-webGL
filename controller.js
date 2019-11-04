import ObjectData from './ObjectData.js'
import Renders from './render/Renders.js'

let objects = null
let render = null

let controller = {
    initObjectData(containerSize) {
        objects = new ObjectData(containerSize)
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

    },
}
export default controller