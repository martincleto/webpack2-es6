
import Greeting from '../../../src/js/modules/greeting'

let greetingConfig = {}
let mocks = {  // @TODO add a fixtures obj with shared mocks
    dom: {
        button: document.createElement('button'),
        input: document.createElement('input')
    },
    eventData: {
        detail: {
            domContext: null
        }
    },
    eventName: 'greeting'
}
let greeting

let setDomEls = () => {
    mocks.dom.button.id = 'btn-send'
    mocks.dom.input.id = 'user-name'

    for (let element in mocks.dom) {
        if (mocks.dom.hasOwnProperty(element)) {
            document.body.appendChild(mocks.dom[element])
        }
    }

    greetingConfig.button = document.getElementById('btn-send')
    greetingConfig.input = document.getElementById('user-name')

    greetingConfig.button.disabled = true
    greetingConfig.input.value = 'Mickey Mouse'
}

let fireEvent = (trigger, name) => {
    let event = new Event(name)

    trigger.dispatchEvent(event)
}

describe('greeting.js', () => {

    beforeAll(() => {
        setDomEls()

        greeting = new Greeting(greetingConfig)
        greeting.init()

        mocks.eventData.detail.domContext = greeting.modal.dom.contentWrapper
    })

    it('should clear the input value on load', () => {
        expect(greetingConfig.input.value).toBe('')
    })

    it('should not enable the button when a user enters an invalid value', () => {
        expect(greetingConfig.button.disabled).toBeTruthy()
    })

    it('should enable the button when a user enters a valid value', () => {
        greetingConfig.input.value = 'Jack Sparrow'

        fireEvent(greetingConfig.input, 'keyup')

        expect(greetingConfig.button.disabled).toBeFalsy()
    })

    it('should emit a `' + mocks.eventName + '` event with the dom node that contains the greeting message', () => {
        spyOn(greeting, 'emit')

        fireEvent(greetingConfig.button, 'click')

        let greetingEmitArgs = greeting.emit.calls.argsFor(0)

        expect(greetingEmitArgs[0]).toEqual(mocks.eventName)
        expect(greetingEmitArgs[1]).toEqual(mocks.eventData)
    })

    it('should show open a modal with content when the button is clicked', () => {
        spyOn(greeting.modal, 'show')

        fireEvent(greetingConfig.button, 'click')

        let actualModalContent = greeting.modal.content
        let expectedModalContent = '<p>Hello <strong>' + greetingConfig.input.value + '</strong>!</p>'

        expect(actualModalContent).toEqual(expectedModalContent)
        expect(greeting.modal.show).toHaveBeenCalled()
    })
})
