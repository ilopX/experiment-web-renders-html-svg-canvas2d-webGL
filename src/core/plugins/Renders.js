import RenderInterface from './RenderInterface.js'
import HTMLRender from '../../plugins/renders/HTMLRender.js'
import SVGRender from '../../plugins/renders/SVGRender.js'
import Canvas2dRender from '../../plugins/renders/Canvas2dRender.js'
import { RenderNotFound } from '../errors.js'

export default class Renders {
    static listOfRenders = {
        'HTML Render': HTMLRender,
        'SVG Render': SVGRender,
        'Canvas 2d Render': Canvas2dRender
        //'Other engine': RenderInterface
    }

    static getClass(name) {
        return (name in this.listOfRenders)
            ? this.listOfRenders[name]
            : null
    }

    static get(name) {
        return {
            create(objects, elem) {
                let RenderClass = Renders.getClass(name)
                if (!RenderClass) {
                    throw new RenderNotFound(name, Renders.listOfRenders)
                }
                let render = new RenderClass(objects, elem)
                render.init()
                return render
            }
        }
    }
}
