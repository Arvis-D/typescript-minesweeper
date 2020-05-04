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
        this.dom.innerHTML = this.getInnerHTML();
    }

    private count(): void
    {
        setInterval(() => {

        }, 1000)
    }

    private getInnerHTML(): string
    {
        return `
        <h5>Time elapsed:</h5>
        <div class="counter-number">12</div>`
    }
}