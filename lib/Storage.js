import { NotImplError } from './errors.js'

export default class Storage {
    constructor(id, isSaveAll) {
        this._id = id
        this._isSaveAll = isSaveAll
    }

    save(property) {
        if (this._isSaveAll) {
            throw new NotImplError()
        }
    }

    load(property) {
        // get value from db
        // property.set(value)
        throw new NotImplError()
    }
}