
export default  class ObjectData {
    constructor(containerable) {
        this._get = []
        this._container = containerable
    }
    
    get get() {
        return this._get
    }

    create(len) {
        this._get = new Array(len)
        const rand256 = () => Math.floor(Math.random()*255)
        for (let i = 0; i < len; i++) {
            this._get[i] = {
                x: Math.max(0, Math.random() * this._container.width - 10),
                y: Math.max(0, Math.random() * this._container.height - 10),
                width: Math.random() * 5 + 5,
                height: Math.random() * 5 + 5,
                color: `rgb(${rand256()}, ${rand256()}, ${rand256()})`
                // type: randomType
            }
        }
    }
}