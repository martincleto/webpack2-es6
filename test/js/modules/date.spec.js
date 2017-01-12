
import date from '../../../src/js/modules/date'

let domContext = document.createElement('div')
let mocks = {
    eventData: {
        detail: {
            domContext: domContext
        }
    }
}
let event = new CustomEvent('greeting', mocks.eventData)

beforeEach(() => {
    document.dispatchEvent(event)
})

describe('date.js', () => {
    it('should listen `greeting` custom event', () => {
        spyOn(document, 'addEventListener')

        console.log(document.addEventListener)

        expect(document.addEventListener).toHaveBeenCalled()
    })
})