export default class Containerable {
    constructor(container) {
        this._container = container
    }

    get width() {
        return this._container.clientWidth
    }

    get height() {
        return this._container.clientHeight
    }

    get element() {
        return this._container
    }
}