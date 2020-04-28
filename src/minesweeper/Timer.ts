export default class Timer
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
        this.dom.setAttribute('id', 'time-counter');
    }

    private count(): void
    {
        setInterval(() => {

        }, 1000)
    }
}