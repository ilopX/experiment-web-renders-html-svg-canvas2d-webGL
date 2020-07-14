import Containerable from "./Containerable.js"

export default class Objective {
    constructor(objectData, containerable) {
        this._objectData = objectData
        this._containable = containerable
    }

    /**@returns {Containerable} */
    get container() {
        return this._containable
    }

    get objects() {
        return this._objectData.get
    }

    get objectData() {
        return this._objectData
    }
}