import RenderInterface from './RenderInterface.js'

export default class Canvas2dRender extends RenderInterface {
    init() {
        this.canv = document.createElement('canvas')
        this.canv.setAttribute('width', this.container.clientWidth)
        this.canv.setAttribute('height', this.container.clientHeight)
        this.container.appendChild(this.canv)
        
    }

    render() {
        let ctx = this.canv.getContext('2d')
        ctx.clearRect(0, 0, this.canv.width, this.canv.height)
        // ctx.translate(-0.5, 0.5)
        ctx.imageSmoothingEnabled = false;
        this.objects.get.forEach(obj => {
            ctx.fillStyle = obj.color
            ctx.fillRect(obj.x, 
                    obj.y, 
                    obj.width, 
                    obj.height)        
        })       
    }

    dispose() {
        this.container.removeChild(this.canv)
    }
}