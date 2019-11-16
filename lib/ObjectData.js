
export default class ObjectData {
    constructor(containerable) {
        this._get = []
        this._container = containerable
    }

    get get() {
        return this._get
    }

    create(len, width, height) {
        this._get = new Array(len)
        const rand256 = () => Math.floor(Math.random() * 255)
        const halfHeight = height / 2
        const halfWidth = width / 2
        for (let i = 0; i < len; i++) {
            this._get[i] = {
                x: Math.max(0, Math.random() * this._container.width - 10),
                y: Math.max(0, Math.random() * this._container.height - 10),
                height: Math.random() * height + halfHeight,
                width: Math.random() * width + halfWidth,
                color: `black`
                // type: randomType
            }
        }
    }

    remove(expresinCallback) {
        this._get = this._get.filter((obj) => !expresinCallback(obj))
    }
}