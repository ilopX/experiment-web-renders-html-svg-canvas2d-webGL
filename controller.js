import ObjectData from './ObjectData.js'
import ui from './ui.js'

const sizeInterface = {
    get width() {
        return ui.container.clientWidth
    },
    get height() {
        return ui.container.clientHeight
    }
}

let objects = new ObjectData(sizeInterface)
let render = null

let controller = {
    createObjects() {
        objects.create(ui.length.value)
    },
    createRender(){
        if (render) {
            render.dispose()
        }
        render = Renders.get(ui.renderType.value)
                        .create(objects, ui.container)   
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