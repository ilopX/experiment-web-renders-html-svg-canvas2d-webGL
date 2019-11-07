export default class PropertyUiComponent {
    constructor(prop) {
        this._name = prop.name
        this._elements = []
        this._elements.push(this._makeLabel(prop.name))
        this._elements.push(this._makeNumber(prop))
    }

    get dom() {
        let div = document.createElement('div') 
        div.innerText = `${this._name} not impl`
        return div
    }

    get elements() {
        return this._elements
    }

    _makeLabel(name) {
        let label = document.createElement('label')
        label.innerText = name
        return label
    }

    _makeNumber(prop) {
        let inputNumber = document.createElement('input')
        inputNumber.setAttribute('type', 'number')
        inputNumber.value = prop.get()
        inputNumber.onchange = () => {
            prop.set(inputNumber.value)
        }
        return inputNumber
    }
}