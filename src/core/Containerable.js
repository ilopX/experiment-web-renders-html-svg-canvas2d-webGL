export default class Containerable {
    constructor(container) {
        this._container = container
    }
    /** @return {Number} */
    get width() {
        return this._container.clientWidth
    }

    /** @return {Number} */
    get height() {
        return this._container.clientHeight
    }

    /** @returns {HTMLElement} */
    get element() {
        return this._container
    }
}