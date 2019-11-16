export default class PropertyUiComponent {

    constructor(prop, storage) {
        this._name = prop.name
        this._prop = prop
        this._storage = storage
        this._elements = []
        this._elements.push(this._makeLabel())
        let methodName = 'type' in prop 
            ? prop.type
            : prop.get().constructor.name
        methodName = '_make' + methodName[0].toUpperCase() + methodName.substr(1)
        if (this[methodName]) {
            this._elements.push(this[methodName]())
        } else {
            throw new Error(`Method "${methodName}" not exist.`)
        }
    }

    get elements() {
        return this._elements
    }

    _makeLabel() {
        let label = document.createElement('label')
        label.innerText = this._prop.name
        return label
    }

    _makeNumber() {
        return this._createInput('number')
    }

    _makeString() {
        return this._createInput('text')
    }

    _makeBoolean() {
        let input = document.createElement('input')
        input.setAttribute('type', 'checkbox')
        this._storage.load(this._prop)
        input.checked = this._prop.get()
        input.onchange = () => {
            this._prop.set(input.checked)
            this._storage.save(this._prop, this._storage)
        }
        return input
    }

    _makeStringInfo() {
        let label = document.createElement('label')
        label.style.paddingLeft = '5px'
        label.innerText = this._prop.get()
        this._prop.onUpdate((val) => label.innerText = val)
        return label
    }

    _createInput(type) {
        let input = document.createElement('input')
        input.setAttribute('type', type)
        this._storage.load(this._prop)
        input.value = this._prop.get()
        input.onchange = () => {
            this._prop.set(input.value)
            this._storage.save(this._prop, this._storage)
        }
        return input
    }
}