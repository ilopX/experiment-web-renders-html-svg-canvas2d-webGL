export class Property {
    /** 
    * @returns {String}
    */
    get name() { }

    /** 
    * @returns {Any}
    */
    get() { }

    /** 
     * @param {Any} value
     */
    set(value) { }
}

export class Properties {
    /**
     * @returns {Boolean}
     */
    get isSaveAll() { }

    /** 
    * @returns {String}
    */
    get id() { }

    /**
     * @returns {Array<Property>}
     */
    get properties() { }
}
