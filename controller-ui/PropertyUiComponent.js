export default class PropertyUiComponent {
    constructor(prop, storage) {
        this._name = prop.name
        this._prop = prop
        this._storage = storage
        this._elements = []
        this._elements.push(this._makeLabel())
        this._elements.push(this._makeNumber())
    }

    get dom() {
        let div = document.createElement('div') 
        div.innerText = `${this._name} not impl`
        return div
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
        let inputNumber = document.createElement('input')
        inputNumber.setAttribute('type', 'number')
        this._storage.load(this._prop)
        inputNumber.value = this._prop.get()
        inputNumber.onchange = () => {
            this._prop.set(inputNumber.value)
            this._storage.save(this._prop, this._storage)
        }
        return inputNumber
    }
}