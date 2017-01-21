
import template from 'lodash/template'
import trim from 'lodash/trim'

class Greeting {
    constructor(config) {
        this.button = config.button
        this.input = config.input
        this.output = config.output
        this.template = '<p>Hello <strong><%= user %></strong>!</p>'
    }

    clear() {
        this.input.value = ''
    }

    enableButton() {
        this.button.disabled = trim(this.input.value).length === 0
    }

    emit(eventName, eventData) {
        let data = (typeof eventData !== 'undefined') ? eventData : {}
        let event = new CustomEvent(eventName, data) // @TODO add support for IE11

        document.dispatchEvent(event)
    }

    show() {
        let compiled = template(this.template)

        this.output.innerHTML = compiled({'user': this.input.value})
        this.emit('greeting', {detail: {
            domContext: this.output.children[0]
        }})
    }

    init() {
        this.clear()
        this.input.addEventListener('keyup', () => { this.enableButton() }, false)
        this.button.addEventListener('click', () => { this.show() }, false)
    }
}

export default Greeting
