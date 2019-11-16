import { NotImplError } from './errors.js'

export default class Storage {
    constructor(id, isSaveAll) {
        this._id = id
        this._isSaveAll = isSaveAll
    }

    save(property) {
        if (this._isSaveAll) {
            let propName = this._getPropName(property)
            Storage._db[propName] = property.get()
        }
    }

    load(property) {
        let propName = this._getPropName(property)
        if (propName in Storage._db) {
            let value = Storage._db[propName]
            property.set(value)
        }
    }

    _getPropName(property) {
        return `${this._id}_${property.name}`
    }

}

Storage._db = Object.create(null)