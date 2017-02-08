
class Modal {
    constructor(content) {
        this._id = 'modal-' + Date.now()
        this._content = content ? content : ''
        this._dom = {}
        this.setup()
    }

    get id() {
        return this._id
    }

    get content() {
        return this._content
    }

    set content(newContent) {
        if (newContent) {
            this._content = newContent
            this.dom.contentWrapper.innerHTML = this.content
        }
    }

    get dom() {
        return this._dom
    }

    setup() {
        document.body.insertAdjacentHTML(
            'beforeend',
            `<div class="modal__outer-wrapper"><div class="modal" id=${this.id}><div class="modal__content">${this.content}</div><button class="fa fa-times modal__btn-close">Close</button></div></div>`
        )

        let theModal = document.getElementById(this.id)

        this._dom.outerWrapper = theModal.parentNode
        this._dom.contentWrapper = theModal.children[0]
        this._dom.btnClose = theModal.children[1]

        let triggers = [this.dom.outerWrapper, this.dom.btnClose]

        this.hide()

        triggers.forEach((element) => {
            element.addEventListener('click', (evt) => {
                if (evt.target === element) {
                    this.hide()
                }

            }, false)
        })
    }

    show() {
        this.dom.outerWrapper.setAttribute('aria-hidden', 'false')
    }

    hide() {
        this.dom.outerWrapper.setAttribute('aria-hidden', 'true')
    }
}

export default Modal
