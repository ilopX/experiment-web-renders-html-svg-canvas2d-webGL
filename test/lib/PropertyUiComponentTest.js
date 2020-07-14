import PropertyUiComponent from '../../src/core/PropertyUiComponent.js'

const equal = chai.assert

const makeIntProperty = () => new PropertyUiComponent({
    name: 'intProperty',
    get: () => 0,
    set: (val) => {}
})

describe('PropertyUiComponentTest', function () {
    describe('.constructor(property: int)', function () {
        it('component.elements.length must return 2 elements', function () {
            let component = makeIntProperty()
            equal(component.elements.length == 2)
        })

        it('component.elements[0] must return label element', function () {
            let component = makeIntProperty()
            let label = component.elements[0]
            equal(label.innerText == 'intProperty')
        })

        it(`component.elements[1] must return input number, aster
            after call onchange user value must equal 222`, function () {
            let userValue = 111
            let component = new PropertyUiComponent({
                name: 'intProperty',
                get: () => userValue,
                set: (val) => userValue = val
            })

            let input = component.elements[1]

            equal(input.type == 'number')
            equal(input.value == userValue)
            input.value = 222
            input.onchange(input)
            equal(userValue == 222)
        })
    })
})
