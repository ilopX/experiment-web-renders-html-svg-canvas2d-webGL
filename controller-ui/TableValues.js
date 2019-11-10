export default class TableValues {
    constructor(parentElement) {
        this._parentElem = parentElement
        this._values = {}
    }

    initNames(...names) {
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
            this._values[name] = tdVal
        }
        this._parentElem.appendChild(tableElem)
    }

    setValues(values) {
        for (const key of Object.keys(values)) {
                const val = values[key]
                this._values[key].innerText = val.toFixed(2)
        }
    }
}