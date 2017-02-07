
import Modal from '../../../src/js/modules/modal'

let mocks = {
    content: '<strong>May the Force be with you.</strong>'
}
let modal
let modalDomNode
let modalDomParentNode
let modalVisible

let isVisible = (domNode) => {
    return domNode.getAttribute('aria-hidden') === 'false'
}

describe('modal.js', () => {

    beforeAll(() => {
        modal = new Modal(mocks.content)
        modalDomNode = document.getElementById(modal.id)
        modalDomParentNode = modalDomNode.parentNode
    })

    it('should insert the mark-up into DOM', () => {
        expect(modalDomNode).not.toBeNull()
    })

    it('should be visible when `show` method is executed', () => {
        modal.show()

        modalVisible = isVisible(modalDomParentNode)

        expect(modalVisible).toBeTruthy()
    })

    it('should be invisible when `hide` method is executed', () => {
        modal.hide()

        modalVisible = isVisible(modalDomParentNode)

        expect(modalVisible).toBeFalsy()
    })

    it('should update content', () => {
        modal.content = '<p>I\'m gonna make you an offer you can\'t refuse</p>'

        let actualDomContent = modalDomNode.children[0].innerHTML

        expect(actualDomContent).toEqual(modal.content)
    })
})
