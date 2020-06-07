export default class Modal
{
    private close: HTMLElement;

    constructor(protected modal: HTMLElement)
    {
        this.modal.addEventListener('click', (e) => {this.closeModal(e)})
        this.close = this.modal.querySelector('.modal-close');
        this.close.addEventListener('click', (e) => {this.closeModal(e)});
    }

    protected openModal(): void
    {
        this.modal.classList.replace('closed', 'opened');
    }

    private closeModal(e: MouseEvent): void
    {
        if (e.target === this.modal || e.target === this.close) {
            this.modal.classList.replace('opened', 'closed');
        }
    }
}