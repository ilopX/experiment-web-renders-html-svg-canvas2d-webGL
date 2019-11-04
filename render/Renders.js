import RenderInterface from './RenderInterface.js'
import HTMLRender from './HTMLRender.js'
import SVGRender from './SVGRender.js'
import Canvas2dRender from './Canvas2dRender.js'

export default class Renders {
    static listOfRenders = {
        'HTML Render': HTMLRender,
        'SVG Render': SVGRender,
        'Canvas 2d Render': Canvas2dRender,
        'Other engine': RenderInterface
    }

    static getClass(name) {
        name = name
        return (name in this.listOfRenders) 
            ? this.listOfRenders[name]
            : RenderInterface
    }

    static get(name) {
        return {
            create(objects, elem) {
                let RenderClass = Renders.getClass(name)
                let render = new RenderClass(objects, elem)
                render.init()
                render.render()
                return render
            }
        }
    }
}