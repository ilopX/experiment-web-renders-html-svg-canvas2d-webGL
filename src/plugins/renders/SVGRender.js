import RenderInterface from '../../core/plugins/RenderInterface.js'

export default class SVGRender extends RenderInterface {
    init() {
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        svg.setAttribute('width', this.container.width)
        svg.setAttribute('height', this.container.height)
        svg.setAttribute('version', '1.1')
        this.svg = svg
        this.container.element.appendChild(svg)

        this.objects.forEach(obj => {
            var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
            rect.setAttribute('fill', obj.color)
            rect.setAttribute('width', obj.width)
            rect.setAttribute('height', obj.height)
            this.svg.appendChild(rect)
            obj.SVGRenderBox = rect
        })
    }

    render() {
        this.objects.forEach(obj => {
            let rect = obj.SVGRenderBox
            rect.setAttribute('x', obj.x)
            rect.setAttribute('y', obj.y)
        })
    }

    dispose() {
        this.objects.forEach(obj => {
            delete obj.SVGRenderBox
        });
        this.container.element.removeChild(this.svg)
    }
}
