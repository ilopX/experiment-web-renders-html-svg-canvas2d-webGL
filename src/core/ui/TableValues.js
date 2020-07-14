export default class TableValues {
    constructor(parentElement, names) {
        this._parentElem = parentElement
        this._names = names
        this._elementValues = {}
        this._isNameInit = false

    }

    _initNames(...names) {
        this._parentElem.innerHTML = ''
        let tableElem = document.createElement('table')
        for (const name of names) {
            let tr = document.createElement('tr')
            let td = document.createElement('td')
            let tdVal = document.createElement('td')
            td.innerText = name
            tr.appendChild(td)
            tr.appendChild(tdVal)
            tableElem.appendChild(tr)
            this._elementValues[name] = tdVal
        }
        this._parentElem.appendChild(tableElem)
        this._isNameInit = true
    }

    setValues(values) {
        if (this._isNameInit == false) {
            this._initNames(...this._names)
        }
        for (const key of Object.keys(values)) {
            const val = values[key]
            if (this._elementValues[key] === undefined) {
                throw new Error(`HTML element is undefined.\n` +
                    `Name "${key}" not found.\n` +
                    `Available names [${this._names
                        .map(name => `"${name}"`)
                        .join(', ')}]`)
            }
            this._elementValues[key].innerText = val.toFixed(2)
        }
    }
}