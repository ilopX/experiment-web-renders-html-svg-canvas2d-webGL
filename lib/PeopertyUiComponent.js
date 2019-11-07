export default class PropertyUiComponent {
    constructor(prop) {
        this._name = prop.name
    }

    get dom() {
        let div = document.createElement('div') 
        div.innerText = `${this._name} not impl`
        return div
    }
}