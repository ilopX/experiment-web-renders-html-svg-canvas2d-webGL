import Storage from './../../lib/Storage.js'

const equal = chai.assert

describe('StorageTest', function () {
    it('save-load property', function () {
        let storage = new Storage('fakeId', true)

        let value = 'beginValue'
        const fakeProperty = {
            name: 'fakeName',
            get: () => value,
            set: (val) => value = val
        }
        storage.save(fakeProperty)
        value = 'changedValue'

        let storage2 = new Storage('fakeId', true)
        storage2.load(fakeProperty)
        let v = fakeProperty.get()
        equal(fakeProperty.get() == 'beginValue')

    })

})