export default class Counter
{
    public dom: HTMLElement;
    
    constructor()
    {
        this.createDom();
    }

    private createDom(): void
    {
        this.dom = document.createElement('div');
        this.dom.classList.add('counter');
        this.dom.setAttribute('id', 'mine-counter');
    }

    private count(): void
    {
        setInterval(() => {

        }, 1000)
    }
}