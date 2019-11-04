export default  class RenderInterface {
    constructor(objects, container) {
        this.objects = objects
        this.container = container
        // this.init()
    }
    
    get containerSize() {
        return this.objects.containerSize
    }

    init() {
        throw new TypeError('not impl');
    }
    
    render() {
        throw new TypeError('not impl');
    }
    
    dispose() {
        throw new TypeError('not impl');
    }
}
